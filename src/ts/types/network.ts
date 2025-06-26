
export interface NetworkData {
    nodes: NodeElem[];
    edges: Edge[];
}
export class NodeElem {
    constructor(
        public id: string,
        public label: string,
        public major: boolean = false,
        public connectivity = 1,
        public normalizedConnectivity = 1,
        public connexionsCount = 0,
    ) { }
}

export class Edge {
    constructor(
        public source: string,
        public target: string,
        public label = '',
        public weight = 1) { }
}