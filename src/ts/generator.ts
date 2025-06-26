import _ from "lodash";
import { Edge, NetworkData, NodeElem } from "./types/network.js";

export class Generator {

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
            availableNodes = this.generateEdges_withLimit(node, availableNodes, res.edges);
        });
        return res;
    }

     private attachNewNodes(nodes: NodeElem[]): NetworkData {

          const res = {
            nodes: [] as NodeElem[] ,
            edges: [] as Edge[]
        }

        let availableNodes = [nodes[0]];
        nodes = _.slice(nodes,1, nodes.length);
        _.map(nodes, (node: NodeElem) => {
            availableNodes = this.generateEdges_attachToExisting(node, availableNodes, res.edges);
        });
        return res;
    }

    private calculateCDF(nodes: NodeElem[]): number[] {
        this.normalizeConnectivity(nodes)
        return nodes.map(elem => elem.normalizedConnectivity).map((sum => value => sum += value)(0));
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
                edges.push(new Edge(node.id, target.id, '', 1));
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

    private generateEdges_attachToExisting(node: NodeElem, availableNodes: NodeElem[], edges: Edge[]): NodeElem[] {
    
        
    }

    private normalizeConnectivity(nodes: NodeElem[]): NodeElem[] {
        const totalConnectivity = nodes.reduce((sum, node) => sum + node.connectivity, 0);
        nodes.forEach(node => {

            node.normalizedConnectivity = node.connectivity / totalConnectivity;


        });
        return nodes;
    }

}