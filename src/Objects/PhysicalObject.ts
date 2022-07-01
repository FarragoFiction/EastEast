//knows what it looks like, knows where it is

import { Theme } from "./Theme";


//from East
export interface RenderedItem {
    x: number;
    y: number;
    width: number;
    height: number;
    flavorText: string;
    themes: Theme[];
    layer: number;
    src: string; //needed so i can rerender them as required
    name: string; //only living creatures have names, not items, its used to update them
}

export class PhysicalObject{
    x: number;
    y: number;
    width: number;
    height: number;
    flavorText: string;
    themes: Theme[];
    layer: number;
    src: string; //needed so i can rerender them as required
    name: string; //only living creatures have names, not items, its used to update them
    parent?: HTMLElement;
    image = document.createElement("img");
    //TODO have a list of TRAITS

    constructor(name:string, x: number, y:number, width: number, height: number, themes:Theme[], layer: number, src: string, flavorText:string){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.flavorText  = flavorText;
        this.themes = themes;
        this.layer = layer;
        this.src = src;
    }

    updateRendering = ()=>{
        this.image.style.top = `${this.y}px`;
        this.image.style.left = `${this.x}px`;
    }

    attachToParent = (parent: HTMLElement)=>{
        this.parent = parent;
        this.image.src = this.src;
        this.image.style.display = "block";
        this.image.style.zIndex = `${this.layer}+10`;
        this.image.style.position = "absolute";
        this.image.style.top = `${this.y}px`;
        this.image.style.left = `${this.x}px`;
        this.image.style.width = `${this.width}px`;

        this.parent.append(this.image);
        console.log("JR NOTE: in theory, parent has an image now", parent,this.image);
    }


}
