import { Debug } from "../core/Debug";

const Performance = {
  marks: {} as Record<string, number>,

  start: function (label: string) {
    this.marks[label] = performance.now();
  },

  end: function (label: string) {
    if (!this.marks[label]) return;
    const duration = performance.now() - this.marks[label];
    delete this.marks[label];
    Debug.debug(`${label} took ${duration.toFixed(2)}ms`);
    return duration;
  },
};

export { Performance };
