import _ from "lodash";
import { Edge, NetworkData, NodeElem } from "./types/network.js";

export class Generator {

    public generate(nodes: NodeElem[]): NetworkData {

        this.normalizeConnectivity(nodes)

        var cdf = nodes.map(elem => elem.normalizedConnectivity).map((sum => value => sum += value)(0));

        const res = {
            nodes,
            edges: [] as Edge[]
        }

        _.map(nodes, (node: NodeElem) => {
            res.edges = _.concat(res.edges, this.generateEdges(node, nodes, cdf));
        });



        return res;
    }

    private generateEdges(node: NodeElem, nodes: NodeElem[], cdf: number[]): Edge[] {

        const res: Edge[] = [];

        _.forIn(_.range(0, node.connectivity), () => {
            var rand = Math.random();
            let index = cdf.findIndex(el => rand <= el);
            res.push(new Edge(node.id, nodes[index].id, '', 1));
        });

        return res;
    }

    private normalizeConnectivity(nodes: NodeElem[]): NodeElem[] {
        const maxConnectivity = Math.max(...nodes.map(node => node.connectivity));
        nodes.forEach(node => {
            node.normalizedConnectivity = node.connectivity / maxConnectivity;
        });
        return nodes;
    }

}