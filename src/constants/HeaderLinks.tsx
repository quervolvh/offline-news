export const rightLinks: typeOfHeaderItem[] = [
];

export type typeOfHeaderItem = {
    title?: string,
    type?: string,
    link?: string,
    links?: { [key: string]: any }[],
    class?: string
};
