export const sleep = (ms:number) => {
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

export const getElementCenterPoint = (ele: HTMLElement)=>{
    const rect = ele.getBoundingClientRect()
    return {x: rect.x+rect.width/2, y: rect.y+rect.height/2}
}

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
    const first = (x1 - x2) ** 2;
    const second = (y1 - y2) ** 2;
    return (first + second) ** 0.5
}

export const distanceWithinRadius = (radius: number, x1: number, y1: number, x2: number, y2: number) => {
    console.log("JR NOTE: radius is ", radius, "and distance is", distance(x1, y2, x2, y2))
    return distance(x1, y2, x2, y2) < radius;
}

export const withinY = (myY: number, objectY: number, objectHeight: number) => {
    return myY > objectY && myY < objectY + objectHeight;
}

export const withinX = (myX: number, objectX: number, objectWidth: number) => {
    return myX > objectX && myX < objectX + objectWidth;
}

export const boundingBoxesIntersect = (rect1: DOMRect, rect2: DOMRect)=>{
    return !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
      );
}

export const pointWithinBoundingBox = (myX: number, myY: number, objectX: number, objectY: number, objectWidth: number, objectHeight: number) => {

    return withinX(myX, objectX, objectWidth) && withinY(myY, objectY, objectHeight);
}