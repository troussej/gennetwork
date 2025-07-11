import _ from "lodash";
import { Edge, NetworkData, NodeElem } from "./types/network.js";
import { Generator } from "./generator.js";

export class GeneratorByAttaching extends Generator {

    public generate(nodes: NodeElem[]): NetworkData {

        nodes = _.filter(nodes, node => node.connectivity > 0);

        return this.attachNewNodes(nodes);
    }



    private attachNewNodes(nodes: NodeElem[]): NetworkData {

        const res = {
            nodes: nodes,
            edges: [] as Edge[]
        }

        let availableNodes = [nodes[0]];
        nodes = _.slice(nodes, 1, nodes.length);
        _.map(nodes, (node: NodeElem) => {
            availableNodes = this.generateEdges_attachToExisting(node, availableNodes, res.edges);
        });
        return res;
    }

    private generateEdges_attachToExisting(node: NodeElem, availableNodes: NodeElem[], edges: Edge[]): NodeElem[] {

        console.log("considering %s", node.id);
        console.log("availableNodes %d", availableNodes.length);

        let cdf = this.calculateCDF(availableNodes);
        _.forIn(_.range(0, node.connectivity), () => {
            var rand = Math.random();
            let index = cdf.findIndex(el => rand <= el);
            let target = availableNodes[index]
            console.log("target : %s", target?.id);
            // Avoid self-loops
            if (target != null && node.id !== target.id) {
                const edge = new Edge(node.id, target.id, '', 1);
                edges.push(edge);
                console.log("attaching %s %s", edge.source, edge.target);
                target.connexionsCount++;
                node.connexionsCount++;
                availableNodes = _.filter(availableNodes, n => n.connexionsCount < n.connectivity);
                cdf = this.calculateCDF(availableNodes);
            }


        });
        availableNodes.push(node);

        return availableNodes;
    }

}