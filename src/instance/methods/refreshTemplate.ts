import { Debug } from "../../core/Debug";
import { Performance } from "../../utils/Performance";
import { compileTemplate } from "../../template/TemplateCompiler";

export function refreshTemplate(templateId: string, recompile = false): boolean {
  Performance.start("refreshTemplate:" + templateId);
  const compiledTemplate = compileTemplate(templateId, recompile);
  if (!compiledTemplate) {
    Debug.error("Failed to compile template: " + templateId);
    Performance.end("refreshTemplate:" + templateId);
    return false;
  }
  return true;
}


