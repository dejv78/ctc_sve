

export enum Endpoint {
    LEFT = 100,
    TOP,
    RIGHT,
    BOTTOM,
    CENTER
}

export enum SegmentDir {
    HORIZONTAL = 200,
    VERTICAL,
    LEFT_TOP,
    LEFT_BOTTOM,
    RIGHT_TOP,
    RIGHT_BOTTOM,
}

export enum RailEnd {
    SIGNAL_MAIN = 300,
    SIGNAL_SHUNT,
    BUFFER
}


export class SizeConstraints {
    public minWidth: number;
    public maxWidth: number;
    public height: number;
}

export class Segment {
    public dir: SegmentDir;
    public lengthM: number;
    public speedMs: number;
}

export class CellTemplate {
    public code: string;
    public sizeConstraints?: SizeConstraints;
    public segments?: Segment[];
}

export class CellDefinition {
    public id: string;
    public code: string;
    public sizeConstraints?: SizeConstraints;
    public segments?: Segment[];
}

