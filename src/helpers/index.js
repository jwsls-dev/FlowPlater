import { ifHelper } from "./comparison/if";
import { sumHelper } from "./math/sum";
import { mathHelper } from "./math/math";
import { eachHelper } from "./array/each";
import { executeHelper } from "./utility/execute";
import { bunnyHelper } from "./utility/bunny";

export function registerHelpers() {
  ifHelper();
  sumHelper();
  mathHelper();
  eachHelper();
  executeHelper();
  bunnyHelper();
}
