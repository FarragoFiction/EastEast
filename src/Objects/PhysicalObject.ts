//knows what it looks like, knows where it is

import { removeItemOnce } from "../Utils/ArrayUtils";
import { getElementCenterPoint } from "../Utils/misc";
import SeededRandom from "../Utils/SeededRandom";
import { Quotidian } from "./Entities/Blorbos/Quotidian";
import { Room } from "./RoomEngine/Room";
import { Theme } from "./Theme";
import { PHILOSOPHY } from "./ThemeStorage";


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

export class PhysicalObject {
    x: number;
    y: number;
    width: number;
    //why yes, this WILL cause delightful chaos. why can you put a hot dog inside a lightbulb? because its weird and offputting. and because you'll probably forget where you stashed that hotdog later on.  it would be TRIVIAL to make it so only living creatures can have inventory. I am making a deliberate choice to not do this.
    inventory: PhysicalObject[] = [];
    //originals are needed to calculate offsets for css animations
    original_x: number;
    original_y: number;
    height: number;
    flavorText: string;
    themes: Theme[];
    layer: number;
    lore = "GLITCH"
    src: string; //needed so i can rerender them as required
    name: string; //only living creatures have names, not items, its used to update them
    parent?: HTMLElement;
    container = document.createElement("div");
    image = document.createElement("img");
    rand: SeededRandom;

    owner?: PhysicalObject;
    room: Room; //needed for interacting with the world. if this is inefficient can get just bits of it but don't paint the shed


    constructor(room: Room, name: string, x: number, y: number, width: number, height: number, themes: Theme[], layer: number, src: string, flavorText: string) {
        this.room = room;
        this.name = name;
        this.x = x;
        this.original_x = x;
        this.original_y = y;
        this.y = y;
        this.rand = room.rand;
        this.width = width;
        this.height = height;
        this.flavorText = flavorText;
        this.themes = themes;
        this.layer = layer;
        this.src = src;
        this.lore = this.getRandomThemeConcept(PHILOSOPHY);
    }

    processedName = () => {
        return this.name;
    }

    getRandomThemeConcept = (concept: string) => {
        if (this.themes.length === 0) {
            return `[ERROR: NO THEME FOUND FOR ${this.name.toUpperCase()}]`;
        }
        const theme = this.rand.pickFrom(this.themes);
        return theme.pickPossibilityFor(this.rand, concept);
    }


    customShit = () => {
        //for example, living creatures might say things
    }

    updateRendering = () => {
        requestAnimationFrame(() => {
            /* this is too inefficient
            this.image.style.top = `${this.y}px`;
            this.image.style.left = `${this.x}px`;
            */
            //console.log(`JR NOTE: moving ${this.x}, ${this.y} which offset is ${this.original_x-this.x}, ${this.original_y-this.y}`)

            this.container.style.transform = `translate(${this.x - this.original_x}px,${this.y - this.original_y}px)`;
            this.customShit();
        })

    }

    dropObject = (object: PhysicalObject) => {
        removeItemOnce(this.inventory, object);
        object.owner = undefined;
        if (object instanceof Quotidian) {
            this.room.addBlorbo(object);
        } else {
            this.room.addItem(object);
        }
    }

    pickupObject = (object: PhysicalObject) => {
        this.inventory.push(object);
        if (object instanceof Quotidian) {
            this.room.removeBlorbo(object);
        } else {
            this.room.removeItem(object);
        }
        object.owner = this;
    }

    //this half came to me in a dream
    enterObject =async ()=>{
        const roomInsideObject = await this.room.createRoomToSuckYouInFromObject(this);
        this.room.maze.changeRoom(roomInsideObject);
    }

    centerPos = () => {
        return getElementCenterPoint(this.container)
    }

    attachToParent = (parent: HTMLElement) => {
        this.parent = parent;
        if(this.room.totemObject){//if you're inside another object, reflect it
            this.image.src = this.room.totemObject.src;
        }else{
            this.image.src = this.src;
        }
        this.image.style.width = `${this.width}px`;
        this.container.style.display = "block";
        this.container.className = this.name;
        this.container.style.zIndex = `${this.layer + 10}`;
        this.container.style.position = "absolute";
        this.container.style.top = `${this.original_y}px`;
        this.container.style.left = `${this.original_x}px`;
        this.container.append(this.image);
        this.parent.append(this.container);

    }


}
