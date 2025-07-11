import _ from "lodash";
import { Edge, NetworkData, NodeElem } from "./types/network.js";
import { Generator } from "./generator.js";
import { OPTIONS } from "./options.js";

export class GeneratorByLoop extends Generator {

    public generate(nodes: NodeElem[]): NetworkData {

        nodes = _.filter(nodes, node => node.connectivity > 0);

        return this.genForEachNode(nodes);
    }

    private genForEachNode(nodes: NodeElem[]): NetworkData {

        const res = {
            nodes,
            edges: [] as Edge[]
        }

        let availableNodes = _.clone(nodes)
        _.map(nodes, (node: NodeElem) => {
            this.generateEdges(node, availableNodes, res.edges);
        });
        return res;
    }


    private generateEdges(node: NodeElem, availableNodes: NodeElem[], edges: Edge[]): void {

        let cdf = this.calculateCDF(availableNodes);
        _.forIn(_.range(0, node.connectivity), () => {
            var rand = Math.random();
            let index = cdf.findIndex(el => rand <= el);
            let target = availableNodes[index].id;
            // Avoid self-loops
            if (node.id !== target) {
                edges.push(new Edge(node.id, target, '', 1));
            }

        });
    }

    private generateEdges_withLimit(node: NodeElem, availableNodes: NodeElem[], edges: Edge[]): NodeElem[] {
        let cdf = this.calculateCDF(availableNodes);
        let connexionsMade = 0;
        _.forIn(_.range(0, node.connectivity), () => {
            var rand = Math.random();
            let index = cdf.findIndex(el => rand <= el);
            let target = availableNodes[index]
            if (!target) {
                console.warn(`No target found for node ${node.id} with connectivity ${node.connectivity}. Available nodes: ${availableNodes.map(n => n.id).join(', ')}`);
                return;
            }
            // Avoid self-loops
            if (node.id !== target.id && target.connexionsCount < target.connectivity) {
                const edge = new Edge(node.id, target.id, '', 1);
                edges.push(edge);
                console.log("attaching %s", edge.label);
                target.connexionsCount++;
                availableNodes = _.filter(availableNodes, n => n.connexionsCount < n.connectivity);
                cdf = this.calculateCDF(availableNodes);
                connexionsMade++;
            }

        });

        const selfRef = availableNodes.find(n => n.id === node.id);
        if (selfRef) {
            selfRef.connexionsCount += connexionsMade;
        }
        availableNodes = _.filter(availableNodes, n => n.connexionsCount < n.connectivity);
        return availableNodes;
    }



}