import type { FlowPlaterElement, FlowPlaterInstance } from "../types";
import { _updateDOM as updateInstanceDOM } from "./methods/_updateDOM";
import { setData as setDataImpl } from "./methods/setData";
import { getData as getDataImpl } from "./methods/getData";
import { get as getImpl } from "./methods/get";
import { getElements as getElementsImpl } from "./methods/getElements";
import { getTemplateElement as getTemplateElementImpl } from "./methods/getTemplateElement";
import { refresh as refreshImpl } from "./methods/refresh";
import { remove as removeImpl } from "./methods/remove";
import { refreshTemplate as refreshTemplateImpl } from "./methods/refreshTemplate";
import { invalidateHtmlCache as invalidateHtmlCacheImpl } from "./methods/invalidateHtmlCache";

export class InstanceClass implements FlowPlaterInstance {
  instanceName: string;
  templateId: string;
  template: any;
  templateElement: FlowPlaterElement;
  data: ProxyConstructor & Record<string, any>;
  elements: FlowPlaterElement[];
  groupName?: string;
  localVarName?: string;
  animate?: boolean;
  _htmxUpdateInProgress?: boolean;
  _updateTimer?: NodeJS.Timeout | null;
  _stateBeforeDebounce?: Record<string, any> | null;
  _observers?: Set<MutationObserver>;
  _isEvaluating?: boolean;
  _lastRenderedOutput?: string;
  _hasPendingUpdate?: boolean;

  constructor(params: {
    instanceName: string;
    templateElement: FlowPlaterElement;
    templateId: string;
    initialData: Record<string, any>;
    groupName?: string;
    elements?: FlowPlaterElement[];
  }) {
    const { instanceName, templateElement, templateId, initialData, groupName, elements } = params;
    this.instanceName = instanceName;
    this.elements = elements && elements.length ? elements.slice() : [templateElement];
    this.template = null;
    this.templateId = templateId || "";
    this.templateElement = templateElement;
    this.data = initialData as unknown as ProxyConstructor & Record<string, any>;
    if (groupName) this.groupName = groupName;
  }

  cleanup(): void {
    this.elements = [];
  }

  invalidateHtmlCache(): void {
    return invalidateHtmlCacheImpl.call(this);
  }

  async _updateDOM(): Promise<void[] | undefined> {
    return updateInstanceDOM.call(this);
  }

  setData(data: Record<string, any>) {
    return setDataImpl.call(this, data);
  }

  getData(): Record<string, any> {
    return getDataImpl.call(this) as any;
  }

  get(path: string): any {
    return getImpl.call(this, path);
  }

  getElements(): FlowPlaterElement[] {
    return getElementsImpl.call(this) as FlowPlaterElement[];
  }

  getTemplateElement(): FlowPlaterElement {
    return getTemplateElementImpl.call(this) as FlowPlaterElement;
  }

  refreshTemplate(templateId: string, recompile?: boolean): boolean {
    return refreshTemplateImpl.call(this, templateId, recompile);
  }

  async refresh(options = { remote: true, recompile: false, ignoreLocalData: false }): Promise<any[]> {
    return refreshImpl.call(this, options);
  }

  async remove(): Promise<boolean> {
    return removeImpl.call(this) as unknown as Promise<boolean>;
  }
}


