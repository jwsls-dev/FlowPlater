import { FlowPlaterInstance } from "../types";
/**
 * Main update function with performance tracking and error handling
 */
declare function updateDOM(element: HTMLElement, newHTML: string, animate?: boolean, instance?: FlowPlaterInstance | null): Promise<void>;
export { updateDOM };
