import { Mapper } from "./src/ts/mapper.js";
import { JsonReader } from "./src/ts/reader/json-reader.js";
import * as fs from 'node:fs/promises';
const jsonReader = new JsonReader();

jsonReader.readFull().subscribe(network => {
    const mapper = new Mapper();
    const data = mapper.map(network);
    fs.writeFile('dist/data.js', `DATA = ${JSON.stringify(data)}`).then(() => {
        console.log('Data written to dist/data.js');
    });
})