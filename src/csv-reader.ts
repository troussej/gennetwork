import _, { toNumber } from 'lodash';
import neatCsv, { Row } from 'neat-csv';


import { from, map, Observable, switchMap } from 'rxjs';
import { NodeElem } from './types/network.js';
import * as fs from 'node:fs/promises';
export class CsvReader {


    public read(): Observable<NodeElem[]> {

        const path = 'data/nodes.csv';

        return from(fs.readFile(path,{encoding:'utf-8'})).pipe(
            switchMap(this.readNodes.bind(this))
        );
    }

    private readNodes(csv: string): Observable<NodeElem[]> {
        return from(neatCsv(csv))
            .pipe(
                map((rows: Row[]) => {
                    return _.map(rows,
                        (row: Row) => (new NodeElem(
                            row.name,
                            row.name,
                            row.major === 'true',
                            _.toNumber(row.connectivity)
                        )));
                })
            );
    }


}
