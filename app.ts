
import { CsvReader } from "./src/csv-reader.js";
import { Generator } from "./src/generator.js";
import { NodeElem } from "./src/types/network.js";

const csvReader = new CsvReader();
const generator = new Generator();
csvReader.read().subscribe({
    next: (nodes: NodeElem[]) => {

        const res = generator.generate(nodes);
        console.log('Generated network data:', res);
      
    },
    error: (err:any) => {
        console.error('Error reading nodes:', err);
    }
});