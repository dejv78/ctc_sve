import {CellTemplate} from './cells';

export class Plan {
    
    public elements: any[] = [];
    public grid: any[] = [];
    private inc = 0;

    constructor(public name: string, public w: number, public h: number) {
        for (let i = 0; i < h; i++) {
            const row = [];
            for (let j = 0; j < w; j++) {
                row.push(null);
            }
            this.grid.push(row);
        }
    }
    
    public addCell(ct: CellTemplate, x: number, y: number, w: number, h: number) {
        if (ct) {
            this.inc++;
            let id = ct.code + '_' + this.inc;
            this.elements[id] = {id: id, code: ct.code, x: x, y: y, w: w, h: h, segments: ct.segments};
            for (let j = y; j < y + h; j++) {
                for (let i = x; i < x + w; i++) {
                    console.log('Add ' + i + ', ' + j);
                    this.grid[j][i] = id;
                }
            }
        }
    } 
}