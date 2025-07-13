
import { CsvReader } from "./src/ts/reader/csv-reader.js";
import { GeneratorByLoop as Generator } from "./src/ts/generator-loop.js";
import { Mapper } from "./src/ts/mapper.js";
import { NodeElem } from "./src/ts/types/network.js";
import * as fs from 'node:fs/promises';
import { OPTIONS } from "./src/ts/options.js";
import { JsonReader } from "./src/ts/reader/json-reader.js";


const generator = new Generator();
const mapper = new Mapper();
let reading;
switch (OPTIONS.source.type) {
    case 'json':
        const jsonReader = new JsonReader();
        reading = jsonReader.read();
        break;
    default:
        const csvReader = new CsvReader();
        reading = csvReader.read();
}


reading.subscribe({
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