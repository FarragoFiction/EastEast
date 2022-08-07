//knows what it looks like, knows where it is

import { getElementCenterPoint } from "../Utils/misc";
import SeededRandom from "../Utils/SeededRandom";
import { Room } from "./RoomEngine/Room";
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
    //originals are needed to calculate offsets for css animations
    original_x: number;
    original_y: number;
    height: number;
    flavorText: string;
    themes: Theme[];
    layer: number;
    src: string; //needed so i can rerender them as required
    name: string; //only living creatures have names, not items, its used to update them
    parent?: HTMLElement;
    container = document.createElement("div");
    image = document.createElement("img");
    rand: SeededRandom;

    //TODO have a list of TRAITS
    room:Room; //needed for interacting with the world. if this is inefficient can get just bits of it but don't paint the shed


    constructor(room: Room,name:string, x: number, y:number, width: number, height: number, themes:Theme[], layer: number, src: string, flavorText:string){
        this.room = room;
        this.name = name;
        this.x = x;
        this.original_x = x;
        this.original_y = y;
        this.y = y;
        this.rand = room.rand;
        this.width = width;
        this.height = height;
        this.flavorText  = flavorText;
        this.themes = themes;
        this.layer = layer;
        this.src = src;
    }

    getRandomThemeConcept = (concept: string) => {
        if(this.themes.length ===0){
            return `[ERROR: NO THEME FOUND FOR ${this.name.toUpperCase()}]`;
        }
        const theme = this.rand.pickFrom(this.themes);
        return theme.pickPossibilityFor(this.rand, concept);
    }


    customShit = ()=>{
        //for example, living creatures might say things
    }

    updateRendering = ()=>{
        requestAnimationFrame(()=>{
            /* this is too inefficient
            this.image.style.top = `${this.y}px`;
            this.image.style.left = `${this.x}px`;
            */
            //console.log(`JR NOTE: moving ${this.x}, ${this.y} which offset is ${this.original_x-this.x}, ${this.original_y-this.y}`)

           this.container.style.transform=`translate(${this.x-this.original_x}px,${this.y-this.original_y}px)`;
           this.customShit();
        })

    }

    centerPos = ()=>{
        return getElementCenterPoint(this.container)
    }

    attachToParent = (parent: HTMLElement)=>{
        console.log("JR NOTE: attaching to parent, i'm", this.name)
        this.parent = parent;
        this.image.src = this.src;
        this.image.style.width = `${this.width}px`;
        this.container.style.display = "block";
        this.container.className = this.name;
        this.container.style.zIndex = `${this.layer+10}`;
        this.container.style.position = "absolute";
        this.container.style.top = `${this.original_y}px`;
        this.container.style.left = `${this.original_x}px`;
        this.container.append(this.image);
        this.parent.append(this.container);

    }


}
