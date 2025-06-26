
import { CsvReader } from "./src/ts/csv-reader.js";
import { Generator } from "./src/ts/generator.js";
import { Mapper } from "./src/ts/mapper.js";
import { NodeElem } from "./src/ts/types/network.js";
import * as fs from 'node:fs/promises';

const csvReader = new CsvReader();
const generator = new Generator();
const mapper = new Mapper();
csvReader.read().subscribe({
    next: (nodes: NodeElem[]) => {

        const network = generator.generate(nodes);
        const res = mapper.map(network);

        fs.writeFile('dist/data.js', `DATA = ${JSON.stringify(res)}`).then(() => {
            console.log('Data written to dist/data.js');
        });

    },
    error: (err: any) => {
        console.error('Error reading nodes:', err);
    }
});