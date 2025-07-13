import { Observable } from "rxjs/internal/Observable";
import { NodeElem } from "../types/network.js";

export interface Reader {
    read(): Observable<NodeElem[]>;
}