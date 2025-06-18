
import { CsvReader } from "./src/csv-reader.js";
import { NodeElem } from "./src/types/network.js";

const csvReader = new CsvReader();
csvReader.read().subscribe({
    next: (nodes: NodeElem[]) => {
        console.log('Nodes:', nodes);
    },
    error: (err:any) => {
        console.error('Error reading nodes:', err);
    }
});