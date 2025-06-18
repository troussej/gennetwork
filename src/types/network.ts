export class NodeElem {
    constructor(
        public id: string,
        public label: string,
        public connectivity = 1) { }
}

export class Edge {
    constructor(
        public source: string,
        public target: string,
        public label = '',
        public weight = 1) { }
}