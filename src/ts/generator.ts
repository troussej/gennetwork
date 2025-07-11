import _ from "lodash";
import { Edge, NetworkData, NodeElem } from "./types/network.js";
import { OPTIONS } from "./options.js";

export abstract class Generator {

    public abstract generate(nodes: NodeElem[]): NetworkData;


    public calculateCDF(nodes: NodeElem[]): number[] {
        let cdf: number[];
        console.log('calculateCDF', nodes);
        if (OPTIONS.useConnectivityAsProbability) {
            this.normalizeConnectivity(nodes)
            cdf = nodes.map(elem => elem.normalizedConnectivity).map((sum => value => sum += value)(0));
        }
        else {
            const nbNodes = nodes.length;
            cdf = nodes.map((elem, index) => index / nbNodes).map((sum => value => sum += value)(0));
        }
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