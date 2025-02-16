import { Debug } from "../core/Debug";

const Performance = {
  marks: {},

  start: function (label) {
    this.marks[label] = performance.now();
  },

  end: function (label) {
    if (!this.marks[label]) return;
    const duration = performance.now() - this.marks[label];
    delete this.marks[label];
    Debug.log(Debug.levels.DEBUG, `${label} took ${duration.toFixed(2)}ms`);
    return duration;
  },
};

export { Performance };
