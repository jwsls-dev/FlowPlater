import { FlowPlaterElement } from "../types";
export declare const customTagList: {
    tag: string;
    replaceWith: string;
}[];
export declare let currentCustomTags: {
    tag: string;
    replaceWith: string;
}[];
export declare function setCustomTags(tags: {
    tag: string;
    replaceWith: string;
}[]): void;
export declare function replaceCustomTags(element: FlowPlaterElement): FlowPlaterElement;
