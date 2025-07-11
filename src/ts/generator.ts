import _ from "lodash";
import { Edge, NetworkData, NodeElem } from "./types/network.js";

export abstract class Generator {

    public abstract generate(nodes: NodeElem[]): NetworkData;


    public calculateCDF(nodes: NodeElem[]): number[] {
        console.log('calculateCDF', nodes);
        this.normalizeConnectivity(nodes)
        const cdf = nodes.map(elem => elem.normalizedConnectivity).map((sum => value => sum += value)(0));
        console.log('cdf', cdf);
        return cdf;
    }

    public normalizeConnectivity(nodes: NodeElem[]): NodeElem[] {
        const totalConnectivity = nodes.reduce((sum, node) => sum + node.connectivity, 0);
        nodes.forEach(node => {

            node.normalizedConnectivity = node.connectivity / totalConnectivity;


        });
        return nodes;
    }

}