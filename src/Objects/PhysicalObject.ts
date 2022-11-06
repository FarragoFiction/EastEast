//knows what it looks like, knows where it is

import { renderNineCommentsOnScreen } from "..";
import { removeItemOnce } from "../Utils/ArrayUtils";
import { getElementCenterPoint } from "../Utils/misc";
import SeededRandom from "../Utils/SeededRandom";
import { Quotidian } from "./Entities/Blorbos/Quotidian";
import { Room } from "./RoomEngine/Room";
import { all_themes, Theme } from "./Theme";
import { OBFUSCATION, PHILOSOPHY } from "./ThemeStorage";


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
    eraseMe =false; //more than death, being erased means you want the system to delete you outright, at least from rendering
    //why yes, this WILL cause delightful chaos. why can you put a hot dog inside a lightbulb? because its weird and offputting. and because you'll probably forget where you stashed that hotdog later on.  it would be TRIVIAL to make it so only living creatures can have inventory. I am making a deliberate choice to not do this.
    inventory: PhysicalObject[] = [];
    //originals are needed to calculate offsets for css animations
    original_x: number;
    states_inialized = false;
    original_y: number;
    height: number;
    flavorText: string;
    themes: Theme[];
    layer: number;
    filterString = "";

    lore = "GLITCH"
    //most objects won't have alternate states, but artifacts and blorbos (who breach), will
    states: PhysicalObject[] = [];
    stateIndex = 0;
    src: string; //needed so i can rerender them as required
    name: string; //only living creatures have names, not items, its used to update them
    parent?: HTMLElement;
    container = document.createElement("div");
    image = document.createElement("img");
    rand: SeededRandom;

    owner?: PhysicalObject;
    room: Room; //needed for interacting with the world. if this is inefficient can get just bits of it but don't paint the shed
    
    //if you're breaching you'll have special css effects
    breaching  = false;


    constructor(room: Room, name: string, x: number, y: number, width: number, height: number, themes: Theme[], layer: number, src: string, flavorText: string, states?:PhysicalObject[]) {
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
        if(states){
            this.states = states;
        }
    }

    //can't happen in constructor cuz quotidians might not be ready
    addSelfToStates = ()=>{
        if(this.states.length > 0){
            this.states = [this.clone(), ...this.states];
        }
    }

    processedName = () => {
        return `${this.breaching?"Breaching ":""}${this.name}`;
    }

    /*
        if you have no state, do nothing

        if you have a single state, ALSO do nothing

        if you have more than one, increment your state index.

        if the state index is bigger than how many states you have, reset it to zero

        grab the state the index refers to and copy it into your current buffer

        (image, name, flavor next, etc)
    */
    incrementState = ()=>{
        if(!this.states_inialized){
            this.addSelfToStates();
            this.states_inialized = true;
        }
        //yes this could just be less than or equal to 1 but i wanted to match my prose better, what are you, my teacher?
        if(this.states.length === 0 || this.states.length ===1 ){
            return;
        }


        this.stateIndex ++;
        let chosenState = this.states[this.stateIndex];
        if(!chosenState){
            this.stateIndex = 0;
            chosenState = this.states[this.stateIndex];
            this.breaching = false;
        }else{
            this.breaching = true;
        }
        this.name = chosenState.name;
        this.flavorText = chosenState.flavorText;
        this.image.src = chosenState.src;
    }



    getRandomThemeConcept = (concept: string) => {
        if (this.themes.length === 0) {
            return `[ERROR: NO THEME FOUND FOR ${this.name.toUpperCase()}]`;
        }
        const theme = this.themes.length > 0 ?this.rand.pickFrom(this.themes) : all_themes[OBFUSCATION];
        return theme.pickPossibilityFor(this.rand, concept);
    }

    //note to avoid recursion does not clone staes
    clone = ()=>{
       return  new PhysicalObject(this.room, this.name, this.x, this.y,  this.width,  this.height,  this.themes,  this.layer,  this.src,  this.flavorText);
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
            this.container.setAttribute("currentLocation",`${this.x}, ${this.y}`);
            this.customShit();
        })

    }

        //if you give me a filter i'll remove it and nothing else (useful for when blorbos dies)
        clearFilterPart = (filter: string)=>{
            this.filterString = this.filterString.replaceAll(filter,"");
            this.container.style.filter = this.filterString;
    
        }
    
        applyFilter = (filter: string, overwrite = true)=>{
            if(overwrite){
                this.filterString = "";
            }
            this.filterString += filter;
            this.container.style.filter = this.filterString;
        }

    dropObject = (object: PhysicalObject) => {
        object.x = this.x;
        object.y = this.y;
        removeItemOnce(this.inventory, object);
        object.owner = undefined;
        if (object instanceof Quotidian) {
            this.room.addBlorbo(object);
        } else {
            this.room.addItem(object);
        }
        object.updateRendering();

    }

    destroyObject  = (object: PhysicalObject) => {
        removeItemOnce(this.inventory, object);
        object.owner = undefined;
    }

    pickupObject = (object: PhysicalObject) => {
        this.inventory.push(object);
        if(this.name.includes("Peewee") && object.src.includes("Zampanio_Artifact_")){
            renderNineCommentsOnScreen();
        }
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
        if(this.src.includes("Artifacts/Zampanio_Artifact")){
            this.applyFilter("drop-shadow(0 0 0.75rem rgb(255, 217, 0))"); //glow cuz you're important
        }

    }


}
