interface SvgAttr {
    fill: string;
    stroke: string;
    strokeWidth: number;
    transform: string;
    [key: string]: any;
}
type Coord = [number, number];

type SvgSetting = {
    attr?: SvgAttr;
    [key: string]: any;
};
declare class SvgBase {
    protected _attr: Partial<SvgAttr>;
    protected _resetElement: boolean;
    constructor(setting: SvgSetting);
    /**
     * 设置svg属性
     * @param key 如果
     */
    attr(key: object): this;
    attr(key: string, value: number | string): this;
}

type ArcSetting = {
    r: number;
    R: number;
    center: [number, number];
    eA?: number;
    sA?: number;
    attr?: SvgAttr;
    [key: string]: any;
};
declare class Arc extends SvgBase {
    protected _points: [Coord, Coord, Coord, Coord];
    protected _arcSetting: Omit<Required<ArcSetting>, 'attr'>;
    protected _element: SVGElement | null;
    protected _d: string | null;
    constructor(setting: ArcSetting);
    get r(): any;
    get R(): any;
    get center(): any;
    get eAngle(): any;
    get sAngle(): any;
    getD(): string;
    getElement(): SVGElement;
}

export { Arc };
