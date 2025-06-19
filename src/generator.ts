import _ from "lodash";
import { Edge, NetworkData, NodeElem } from "./types/network.js";

export class Generator {

    public generate(nodes: NodeElem[]): NetworkData {

        nodes = _.filter(nodes, n => n.connectivity > 0);

        this.normalizeConnectivity(nodes)

        var cdf = nodes.map(elem => elem.normalizedConnectivity).map((sum => value => sum += value)(0));

        const res = {
            nodes,
            edges: [] as Edge[]
        }


        _.map(nodes, (node: NodeElem) => {
            this.generateEdges(node, nodes, cdf, res.edges);
        });



        return res;
    }

    private generateEdges(node: NodeElem, nodes: NodeElem[], cdf: number[], edges: Edge[]): void {

        _.forIn(_.range(0, node.connectivity), () => {
            var rand = Math.random();
            let index = cdf.findIndex(el => rand <= el);
            let target = nodes[index].id;
            if (node.id !== target) {
                // Avoid self-loops
                edges.push(new Edge(node.id, target, '', 1));
            }
        });

    }

    private normalizeConnectivity(nodes: NodeElem[]): NodeElem[] {
        const totalConnectivitySquare = nodes.reduce((sum, node) => sum + node.connectivity * node.connectivity, 0);
        nodes.forEach(node => {
            node.normalizedConnectivity = node.connectivity * node.connectivity / totalConnectivitySquare;
        });
        return nodes;
    }

}