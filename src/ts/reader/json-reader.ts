import { from, map, Observable, switchMap } from "rxjs";
import { Edge, NetworkData, NodeElem } from "../types/network.js";
import { Reader } from "./reader.js";
import { OPTIONS } from "../options.js";
import * as fs from 'node:fs/promises';
import _ from "lodash";

const path = OPTIONS.source.path;

export class JsonReader implements Reader {

    public read(): Observable<NodeElem[]> {

        return from(fs.readFile(path, { encoding: 'utf-8' })).pipe(
            map(this.readNodes.bind(this))
        );
    }

    public readFull(): Observable<NetworkData> {

        return from(fs.readFile(path, { encoding: 'utf-8' }))
            .pipe(map(string => ({
                nodes: this.readNodes.bind(this)(string),
                edges: this.readEdges.bind(this)(string),
            }))


            );
    }

    private readNodes(jsonString: string): NodeElem[] {

        const json = JSON.parse(jsonString);

        return _.map(json.nodes, node => new NodeElem(
            node.id,
            node.text)
        );
    }

    private readEdges(jsonString: string): Edge[] {

        const json = JSON.parse(jsonString);
        return _.map(json.edges, edge => new Edge(
            edge.source,
            edge.target)
        );
    }

}