
export interface NetworkData {
    nodes: NodeElem[];
    edges: Edge[];
}
export class NodeElem {
    constructor(
        public id: string,
        public label: string,
        public connectivity = 1,
        public normalizedConnectivity = 1
    ) { }
}

export class Edge {
    constructor(
        public source: string,
        public target: string,
        public label = '',
        public weight = 1) { }
}