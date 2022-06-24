export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const createElementWithIdAndParent = (eleName: string, parent: HTMLElement, id?: string, className?: string) => {
    const ele = createElementWithId(eleName, id, className);
    parent.append(ele);
    return ele;
}

export const createElementWithId = (eleName: string, id?: string, className?: string) => {
    const ele = document.createElement(eleName);
    if (id) {
        ele.id = id;
    }
    if (className) {
        ele.className = className;
    }
    return ele;

}