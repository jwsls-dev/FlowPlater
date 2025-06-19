import { ifHelper } from "./comparison/if";
import { sumHelper } from "./math/sum";
import { eachHelper } from "./array/each";
import { executeHelper } from "./utility/execute";
import { setHelper } from "./utility/set";
import { bunnyHelper } from "./utility/bunny";
import { defaultHelper } from "./utility/default";

export function registerHelpers() {
  ifHelper();
  sumHelper();
  eachHelper();
  executeHelper();
  setHelper();
  bunnyHelper();
  defaultHelper();
}
