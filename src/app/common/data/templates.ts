import {Endpoint, RailEnd, Segment, SegmentDir} from '../../model/cells';

export const shapes: Map<any, any> = new Map();

export const DEFAULT_SPEED_MS = 120 / 3.6;
export const REDUCED_SPEED_MS = 40 / 3.6;
export const LONG_LENGTH_M = 1000;
export const DEFAULT_LENGTH_M = 100;
export const TURNOUT_LENGTH_M = 20;
export const CELL_SIZE = 30;
export const CELL_HALF = CELL_SIZE * 0.5;
export const CELL_QUARTER = CELL_SIZE * 0.25;
export const THICKNESS = 2;
export const THICKNESS_SLOPED = THICKNESS * 1.4;

export const templates = {
    track_basic_h: {
        code: 'track_basic_h',
        segments: <Segment[]>[
            {dir: SegmentDir.HORIZONTAL, lengthM: DEFAULT_LENGTH_M, speedMs: DEFAULT_SPEED_MS}
        ]
    },
    track_basic_v: {
        code: 'track_basic_v',
        segments: <Segment[]>[
            {dir: SegmentDir.VERTICAL, lengthM: DEFAULT_LENGTH_M, speedMs: DEFAULT_SPEED_MS}
        ]
    },
    track_basic_rb: {
        code: 'track_basic_rb',
        segments: <Segment[]>[
            {dir: SegmentDir.RIGHT_BOTTOM, lengthM: DEFAULT_LENGTH_M, speedMs: DEFAULT_SPEED_MS}
        ]
    },
    track_basic_lt: {
        code: 'track_basic_lt',
        segments:
            <Segment[]>[
                {dir: SegmentDir.LEFT_TOP, lengthM: DEFAULT_LENGTH_M, speedMs: DEFAULT_SPEED_MS}
            ]
    },
    track_basic_rt: {
        code: 'track_basic_rt',
        segments:
            <Segment[]>[
                {dir: SegmentDir.RIGHT_TOP, lengthM: DEFAULT_LENGTH_M, speedMs: DEFAULT_SPEED_MS}
            ]
    },
    track_basic_lb: {
        code: 'track_basic_lb',
        segments:
            <Segment[]>[
                {dir: SegmentDir.LEFT_BOTTOM, lengthM: DEFAULT_LENGTH_M, speedMs: DEFAULT_SPEED_MS}
            ]
    },
    track_junction_lrt: {
        code: 'track_junction_lrt',
        segments: <Segment[]>[
            {dir: SegmentDir.LEFT_TOP, lengthM: TURNOUT_LENGTH_M, speedMs: REDUCED_SPEED_MS},
            {dir: SegmentDir.RIGHT_TOP, lengthM: TURNOUT_LENGTH_M, speedMs: REDUCED_SPEED_MS},
            {dir: SegmentDir.HORIZONTAL, lengthM: TURNOUT_LENGTH_M, speedMs: DEFAULT_SPEED_MS},
        ]
    },
    track_junction_lrb: {
        code: 'track_junction_lrb',
        segments:
            <Segment[]>[
                {dir: SegmentDir.LEFT_BOTTOM, lengthM: TURNOUT_LENGTH_M, speedMs: REDUCED_SPEED_MS},
                {dir: SegmentDir.RIGHT_BOTTOM, lengthM: TURNOUT_LENGTH_M, speedMs: REDUCED_SPEED_MS},
                {dir: SegmentDir.HORIZONTAL, lengthM: TURNOUT_LENGTH_M, speedMs: DEFAULT_SPEED_MS},
            ]
    },
    track_junction_rb: {
        code: 'track_junction_rb',
        segments:
            <Segment[]>[
                {dir: SegmentDir.RIGHT_BOTTOM, lengthM: TURNOUT_LENGTH_M, speedMs: REDUCED_SPEED_MS},
                {dir: SegmentDir.HORIZONTAL, lengthM: TURNOUT_LENGTH_M, speedMs: DEFAULT_SPEED_MS},
            ]
    },
    track_junction_lt: {
        code: 'track_junction_lt',
        segments:
            <Segment[]>[
                {dir: SegmentDir.LEFT_TOP, lengthM: TURNOUT_LENGTH_M, speedMs: REDUCED_SPEED_MS},
                {dir: SegmentDir.HORIZONTAL, lengthM: TURNOUT_LENGTH_M, speedMs: DEFAULT_SPEED_MS},
            ]
    },
    track_junction_rt: {
        code: 'track_junction_rt',
        segments:
            <Segment[]>[
                {dir: SegmentDir.RIGHT_TOP, lengthM: TURNOUT_LENGTH_M, speedMs: REDUCED_SPEED_MS},
                {dir: SegmentDir.HORIZONTAL, to: Endpoint.LEFT, lengthM: TURNOUT_LENGTH_M, speedMs: DEFAULT_SPEED_MS},
            ]
    },
    track_junction_lb: {
        code: 'track_junction_lb',
        segments:
            <Segment[]>[
                {dir: SegmentDir.LEFT_BOTTOM, lengthM: TURNOUT_LENGTH_M, speedMs: REDUCED_SPEED_MS},
                {dir: SegmentDir.HORIZONTAL, lengthM: TURNOUT_LENGTH_M, speedMs: DEFAULT_SPEED_MS},
            ]
    },
    track_rail: {
        code: 'track_rail',
        segments:
            <Segment[]>[
                {dir: SegmentDir.HORIZONTAL, lengthM: LONG_LENGTH_M, speedMs: DEFAULT_SPEED_MS},
            ],
        sizeConstraints: {minWidth: 4, maxWidth: 6, height: 1}
    },
    track_autoblock: {
        code: 'track_autoblock',
        segments:
            <Segment[]>[
                {dir: SegmentDir.HORIZONTAL, lengthM: LONG_LENGTH_M, speedMs: DEFAULT_SPEED_MS},
            ],
        sizeConstraints: {minWidth: 4, maxWidth: 6, height: 2}
    },
};


export function getPredefinedTrackPolygons(segmentDir: SegmentDir, pad?: boolean): string {
    const x1 = pad ? 2*THICKNESS : 0;
    const x2 = CELL_HALF;
    const x3 = CELL_SIZE;
    const y1 = 0;
    const y2 = CELL_HALF;
    const y3 = CELL_SIZE - (pad ? 2*THICKNESS : 0);

    switch (segmentDir) {
        case SegmentDir.HORIZONTAL:
            return `${x1} ${y2 - THICKNESS}, ${x3} ${y2 - THICKNESS}, ${x3} ${y2 + THICKNESS}, ${x1} ${y2 + THICKNESS}`;

        case SegmentDir.VERTICAL:
            return `${x2 + THICKNESS} ${y1}, ${x2 + THICKNESS} ${y3}, ${x2 - THICKNESS} ${y3}, ${x2 - THICKNESS} ${y1}`;

        case SegmentDir.LEFT_TOP:
            return `${x1} ${y2 - THICKNESS_SLOPED}, ${x2 - THICKNESS_SLOPED} ${y1}, ${x2 + THICKNESS_SLOPED} ${y1}, ${x1} ${y2 + THICKNESS_SLOPED}`;

        case SegmentDir.LEFT_BOTTOM:
            return `${x1} ${y2 - THICKNESS_SLOPED}, ${x2 + THICKNESS_SLOPED} ${y3}, ${x2 - THICKNESS_SLOPED} ${y3}, ${x1} ${y2 + THICKNESS_SLOPED}`;

        case SegmentDir.RIGHT_TOP:
            return `${x3} ${y2 + THICKNESS_SLOPED}, ${x2 - THICKNESS_SLOPED} ${y1}, ${x2 + THICKNESS_SLOPED} ${y1}, ${x3} ${y2 - THICKNESS_SLOPED}`;

        case SegmentDir.RIGHT_BOTTOM:
            return `${x3} ${y2 + THICKNESS_SLOPED}, ${x2 + THICKNESS_SLOPED} ${y3}, ${x2 - THICKNESS_SLOPED} ${y3}, ${x3} ${y2 - THICKNESS_SLOPED}`;
    }
}

export function getRailEndPolygon(re: RailEnd, end: Endpoint): string {
    const x1 = CELL_QUARTER + THICKNESS;
    const x2 = CELL_HALF;
    const x3 = CELL_HALF + CELL_QUARTER - THICKNESS;
    const y1 = THICKNESS;
    const y2 = CELL_HALF;
    const y3 = CELL_SIZE - THICKNESS;
    const yo = 4 * THICKNESS;
    switch (re) {
        case RailEnd.SIGNAL_MAIN: {
            return (end === Endpoint.LEFT)
                ? `${x1} ${y2}, ${x3} ${y1}, ${x3} ${y3}`
                : `${x3} ${y2}, ${x1} ${y3}, ${x1} ${y1}`;
        }
        case RailEnd.SIGNAL_SHUNT: {
            return (end === Endpoint.LEFT)
                ? `${x1} ${y2}, ${x3} ${y1}, ${x3} ${y1 + 2 * THICKNESS_SLOPED}, ${x1 + 2 * THICKNESS_SLOPED} ${y2}, ${x3} ${y3 - 2 * THICKNESS_SLOPED}, ${x3} ${y3}`
                : `${x3} ${y2}, ${x1} ${y3}, ${x1} ${y3 - 2 * THICKNESS_SLOPED}, ${x3 - 2 * THICKNESS_SLOPED} ${y2}, ${x1} ${y1 + 2 * THICKNESS_SLOPED}, ${x1} ${y1}`
        }
        default: {
            return (end === Endpoint.LEFT)
                ? `${CELL_SIZE} ${y2 + THICKNESS}, ${x2 + THICKNESS} ${y2 + THICKNESS}, ${x2 + THICKNESS} ${y2 + yo}, ${x2 - THICKNESS} ${y2 + yo}, ${x2 - THICKNESS} ${y2 - yo}, ${x2 + THICKNESS} ${y2 - yo}, ${x2 + THICKNESS} ${y2 - THICKNESS}, ${CELL_SIZE} ${y2 - THICKNESS}`
                : `0 ${y2 - THICKNESS}, ${x2 - THICKNESS} ${y2 - THICKNESS}, ${x2 - THICKNESS} ${y2 - yo}, ${x2 + THICKNESS} ${y2 - yo}, ${x2 + THICKNESS} ${y2 + yo}, ${x2 - THICKNESS} ${y2 + yo}, ${x2 - THICKNESS} ${y2 + THICKNESS}, 0 ${y2 + THICKNESS}`
        }
    }
}

shapes.set(SegmentDir.HORIZONTAL, getPredefinedTrackPolygons(SegmentDir.HORIZONTAL));
shapes.set(SegmentDir.VERTICAL, getPredefinedTrackPolygons(SegmentDir.VERTICAL));
shapes.set(SegmentDir.LEFT_TOP, getPredefinedTrackPolygons(SegmentDir.LEFT_TOP));
shapes.set(SegmentDir.LEFT_BOTTOM, getPredefinedTrackPolygons(SegmentDir.LEFT_BOTTOM));
shapes.set(SegmentDir.RIGHT_TOP, getPredefinedTrackPolygons(SegmentDir.RIGHT_TOP));
shapes.set(SegmentDir.RIGHT_BOTTOM, getPredefinedTrackPolygons(SegmentDir.RIGHT_BOTTOM));
shapes.set(RailEnd.SIGNAL_MAIN,[getRailEndPolygon(RailEnd.SIGNAL_MAIN, Endpoint.LEFT), getRailEndPolygon(RailEnd.SIGNAL_MAIN, Endpoint.RIGHT)]);
shapes.set(RailEnd.SIGNAL_SHUNT, [getRailEndPolygon(RailEnd.SIGNAL_SHUNT, Endpoint.LEFT), getRailEndPolygon(RailEnd.SIGNAL_SHUNT, Endpoint.RIGHT)]);
shapes.set(RailEnd.BUFFER, [getRailEndPolygon(RailEnd.BUFFER, Endpoint.LEFT), getRailEndPolygon(RailEnd.BUFFER, Endpoint.RIGHT)]);
shapes.set('ab', getPredefinedTrackPolygons(SegmentDir.HORIZONTAL, true));
