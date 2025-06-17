declare const Performance: {
    marks: Record<string, number>;
    start: (label: string) => void;
    end: (label: string) => number | undefined;
};
export { Performance };
