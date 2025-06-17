declare class Calc {
    static ans: number;
    stack: any[];
    w: any;
    l: any;
    constructor();
    _next(): any;
    exec(expr: string): number;
    _istok(o: string): any;
    z(): boolean;
    _wrapped_expr_min_max(cb: Function, arg: any, a?: string, b?: string): boolean;
    _lrecmut(nt: Function, pfn: Function): any;
    _ophit(ops: string[], nt: Function, pfn: Function, follow: string[]): any;
    e(): boolean;
    t(): boolean;
    f(): boolean;
    ep(): any;
    p(): any;
    pp(): any;
    x(): any;
    xp(): any;
    _wrapped_expr(cb: Function, arg: any, a?: string, b?: string): boolean;
    _rep_val(fn: string, args: any[]): void;
    static _chooseFn(fn: string): (...values: number[]) => number;
    static _val(w: any): number | undefined;
    static _chooseOp(op: string): (a: number, b: number) => number;
}
export { Calc };
