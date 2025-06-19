import { NetworkData } from "./types/network.js";
import { ElementDefinition} from "cytoscape";

export class Mapper{

private static cssClasses = ['small', 'medium', 'large'];

    public map(network:NetworkData):ElementDefinition[]{
        const elements: ElementDefinition[] = [];

        network.nodes.forEach(node => {
            elements.push({
                data: {
                    id: node.id,         

                } ,
                scratch: node,

                classes: [Mapper.cssClasses[Math.round(node.normalizedConnectivity)*3]],
                // style: `width: ${Math.round(node.normalizedConnectivity)*40}`
                
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