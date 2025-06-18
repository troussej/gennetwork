import { NetworkData } from "./types/network.js";
import { NodeDefinition, EdgeDefinition ,ElementDefinition} from "cytoscape";

export class Mapper{
    public map(network:NetworkData):ElementDefinition[]{
        const elements: ElementDefinition[] = [];

        network.nodes.forEach(node => {
            elements.push({
                data: {
                    id: node.id,
                  
                } 
            });
        });

        network.edges.forEach(edge => {
            elements.push({
                data: {
                    id: `${edge.source}-${edge.target}`,
                    source: edge.source,
                    target: edge.target,
                  
                } 
            });
        });

        return elements;
    }
}