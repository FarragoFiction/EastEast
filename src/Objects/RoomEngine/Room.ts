import { all_themes, Theme } from "../Theme";
import { FEELING, FLOOR, FLOORBACKGROUND, FLOORFOREGROUND, SMELL, SOUND, SPYING, TASTE, WALL, WALLBACKGROUND, WALLFOREGROUND } from "../ThemeStorage";
import { createElementWithIdAndParent, pointWithinBoundingBox } from "../../Utils/misc";
import SeededRandom from "../../Utils/SeededRandom";
import { Quotidian } from "../Entities/Quotidian";
import { PhysicalObject, RenderedItem } from "../PhysicalObject";
import { addImageProcess } from "../../Utils/URLUtils";
import { Peewee } from "../Entities/Peewee";
import { Maze } from "./Maze";



export class Room {
    themes: Theme[];
    maze: Maze;
    floor = "glitch.png"
    wall = "glitch.png"
    wallHeight = 100;
    rand: SeededRandom;
    element: HTMLElement;
    width = 400;
    height = 600;
    blorbos: Quotidian[] = [];
    peewee?: Peewee; //peewee is optional to the universe;
    items: PhysicalObject[] = [];
    ticking = false;
    tickRate = 100;
    children:Room[] =[];


    //objects
    //people
    //really theres just the one room, we keep clearing it out.
    constructor(maze: Maze,themes: Theme[], element: HTMLElement, rand: SeededRandom) {
        this.themes = themes;
        this.rand = rand;
        this.maze = maze;
        this.element = element;
        this.init();
    }

    getRandomThemeConcept = (concept: string)=>{
        const theme = this.rand.pickFrom(this.themes);
        return theme.pickPossibilityFor(this.rand, concept);
    }

    stopTicking = ()=>{
        this.ticking = false;
    }

    render = () => {
        this.element.innerHTML = "";
        this.width = this.element.getBoundingClientRect().width;
        this.height = this.element.getBoundingClientRect().height;
        this.element.style.backgroundImage = `url(images/Walkabout/floor/${this.floor})`;
        const wall = createElementWithIdAndParent("div", this.element, "wall");
        wall.style.backgroundImage = `url(images/Walkabout/wall/${this.wall})`;

        for(let item of this.items){
            item.attachToParent(this.element);
        }

        for(let blorbo of this.blorbos){
            blorbo.attachToParent(this.element);
        }
        this.renderNorthDoor();
        this.renderEastDoor();
        this.renderSouthDoor();


        this.ticking = true;
        this.tick();
    }

    getNorth = ()=>{
        return this.children[0];
    }
    getEast = ()=>{
        return this.children[1];

    }
    getSouth = ()=>{
        return this.children[2];
    }

    renderNorthDoor = ()=>{
        if(this.getNorth()){
            const image = createElementWithIdAndParent("img", this.element, "northDoor") as HTMLImageElement;
            image.src = "images/Walkabout/door.png";
            const rug = createElementWithIdAndParent("img", this.element, "northDoorRug") as HTMLImageElement;
            rug.src = "images/Walkabout/rug.png";
        }
    }

    renderEastDoor = ()=>{
        const rug = createElementWithIdAndParent("img", this.element, "eastDoor") as HTMLImageElement;
        rug.src = "images/Walkabout/rug.png";

    }

    renderSouthDoor = ()=>{
        const rug = createElementWithIdAndParent("img", this.element, "southDoor") as HTMLImageElement;
        rug.src = "images/Walkabout/rug.png";
    }

    addItem = (obj: PhysicalObject) => {
        this.items.push(obj);
    }

    addBlorbo = (blorbo: Quotidian) => {
        this.blorbos.push(blorbo);
    }

    teardown = ()=>{
        this.ticking = false;
        this.peewee = undefined;
    }


    //if any blorbo is near a door, move them into the room whose door they are near.
    checkForDoors = (blorbo: Quotidian)=>{
        this.checkNorthDoor(blorbo);
        this.checkSouthDoor(blorbo);
        this.checkEastDoor(blorbo);
    }

    checkNorthDoor = (blorbo: Quotidian)=>{
        const door = document.querySelector("#northDoorRug") as HTMLElement;
        const x = door.offsetLeft
        const y = door.offsetTop;
        const blorboCenter = blorbo.centerPos();
        if(door){
            if(pointWithinBoundingBox(blorboCenter.x, blorboCenter.y, x,y,50,50)){
                this.maze.playDoorSound();
            }
        }
    }

    checkSouthDoor = (blorbo: Quotidian)=>{
        const door = document.querySelector("#southDoor") as HTMLElement;
        const x = door.offsetLeft
        const y = door.offsetTop;
        const blorboCenter = blorbo.centerPos();
        console.log("JR NOTE: my center is",blorboCenter, "is that within the door?", {x,y})

        if(door){
            if(pointWithinBoundingBox(blorboCenter.x, blorboCenter.y, x,y,50,50)){
                this.maze.playDoorSound();
            }
        }
    }

    checkEastDoor = (blorbo: Quotidian)=>{
        const door = document.querySelector("#eastDoor") as HTMLElement;
        const x = door.offsetLeft
        const y = door.offsetTop;
        const blorboCenter = blorbo.centerPos();

        if(door){
            if(pointWithinBoundingBox(blorboCenter.x, blorboCenter.y, x,y,50,50)){
                this.maze.playDoorSound();
            }
        }
    }
    

    tick = () => {
        //TODO blorbos all tick
        for(let blorbo of this.blorbos){
            blorbo.tick();
            this.checkForDoors(blorbo);
        }

        if(this.ticking){
            setTimeout(this.tick,this.tickRate);
        }
    }

    init = () => {
        this.initFloor();
        this.initWall();
    }

    initFloor = () => {
        const theme: Theme = this.rand.pickFrom(this.themes);
        this.floor = theme.pickPossibilityFor(this.rand, FLOOR);
    }

    initWall = () => {
        const theme: Theme = this.rand.pickFrom(this.themes);
        this.wall = theme.pickPossibilityFor(this.rand, WALL);
    }

    //imported from East
    childRoomThemes = () => {
        const roll = this.rand.nextDouble();
        if (roll > 0.6) {
            //add a theme, but don't go over 6
            if (this.themes.length < 6) {
                return [...this.themes, this.rand.pickFrom(Object.values(all_themes))];

            } else {
                return [...this.themes.slice(1), this.rand.pickFrom(Object.values(all_themes))];
            }

        } else if (roll > 0.3) {
            //remove a theme, but don't go under one
            if (this.themes.length > 1) {
                return [...this.themes.slice(1)];

            } else {
                return [...this.themes.slice(1), this.rand.pickFrom(Object.values(all_themes))];
            }
        } else {
            //same amount just one different
            return [...this.themes.slice(1), this.rand.pickFrom(Object.values(all_themes))];
        }
    }

    spawnChildRoom = async () => {
        return await randomRoomWithThemes(this.maze,this.element,this.childRoomThemes(), this.rand );
    }

    //when i first make the maze, we generate its structure to a certain depth, and then from there one room at a time.
    propagateMaze = async (depthRemaining: number)=>{
        const numberChildren = this.rand.getRandomNumberBetween(1,3);
        for(let i =0; i<numberChildren; i++){
            const child = await this.spawnChildRoom();
            this.children.push(child);
            if(depthRemaining >0){
                child.propagateMaze(depthRemaining-1);
            }
        }
    }

}

export const randomRoomWithThemes = async (maze: Maze,ele: HTMLElement, themes: Theme[], seededRandom: SeededRandom) => {
    const room = new Room(maze,themes, ele, seededRandom);
    const items1: RenderedItem[] = await spawnWallObjects(room.width,room.height, 0,WALLBACKGROUND, "BackWallObjects", seededRandom, themes);
    const items3: RenderedItem[] = await spawnFloorObjects(room.width,room.height,0, FLOORBACKGROUND, "UnderFloorObjects", seededRandom, themes);
    const items2: RenderedItem[] = await spawnWallObjects(room.width,room.height,1, WALLFOREGROUND, "FrontWallObjects", seededRandom, themes);
    const items4: RenderedItem[] = await spawnFloorObjects(room.width,room.height,1, FLOORFOREGROUND, "TopFloorObjects", seededRandom, themes);
    const items = items3.concat(items2.concat(items4));
    for(let item of items){
        room.addItem(new PhysicalObject(room,item.name,item.x,item.y,item.width,item.height,item.themes,item.layer,item.src,item.flavorText))
    }

    const stress_test = 3;
    for(let i = 0; i< stress_test; i++){
        room.addBlorbo(new Quotidian(room,"Quotidian",150,150,50,50, [all_themes[SPYING]],"images/Walkabout/Sprites/humanoid_crow.gif","testing"));
    }
    room.peewee = new Peewee(room,150,350,50,50);
    room.addBlorbo(room.peewee);


    return room;
}

//has to be async because it checks the image size for positioning
export const spawnWallObjects = async (width:number, height:number,layer: number, key: string, folder: string, seededRandom: SeededRandom, themes: Theme[]) => {
    let current_x = 0;
    const padding = 10;
    const ret: RenderedItem[] = [];
    while (current_x < width) {
        const chosen_theme: Theme = seededRandom.pickFrom(themes);
        const item = chosen_theme.pickPossibilityFor(seededRandom, key);
        if (item && item.src && seededRandom.nextDouble() > 0.3) {
            const image: any = await addImageProcess((`images/Walkabout/Objects/${folder}/${item.src}`)) as HTMLImageElement;
            current_x += image.width*2;
            //don't clip the wall border, don't go past the floor
            if (current_x + padding + image.width > width) {
                return ret;
            }
            const y = seededRandom.getRandomNumberBetween(padding, Math.max(padding, image.height));
            ret.push({name:"Generic Object", layer: layer, src: `images/Walkabout/Objects/${folder}/${item.src}`, themes: [chosen_theme], x: current_x, y: y, width: image.width*2, height: image.height, flavorText: item.desc })
        } else {
            current_x += 50;
        }
    }
    return ret;
}


//has to be async because it checks the image size for positioning
const spawnFloorObjects = async (width:number, height:number,layer: number, key: string, folder: string, seededRandom: SeededRandom, themes: Theme[]) => {
    let current_x = 0;
    const floor_bottom = 140;
    let current_y = floor_bottom;
    const padding = 10;
    const ret: RenderedItem[] = [];
    const scale = 1.5;
    const y_wiggle = 50;
    const debug = false;
    const clutter_rate = seededRandom.nextDouble(0.75,0.99); //smaller is more cluttered
    while (current_y + padding < height) {
        current_x = padding;
        while (current_x < width) {
            const chosen_theme: Theme = seededRandom.pickFrom(themes);
            const item = chosen_theme.pickPossibilityFor(seededRandom, key);
            if (item && item.src && seededRandom.nextDouble() > clutter_rate) {
                const image: any = await addImageProcess(`images/Walkabout/Objects/${folder}/${item.src}`) as HTMLImageElement;
                current_x += image.width * scale;
                //don't clip the wall border, don't go past the floor
                if (current_x + padding + image.width * scale > width) {
                    break;
                }
                const y = seededRandom.getRandomNumberBetween(current_y - y_wiggle, current_y + y_wiggle);
                if (y + padding + image.height * scale > height) {
                    break;
                }
                ret.push({name:"Generic Object", layer: layer, src: `images/Walkabout/Objects/${folder}/${item.src}`, themes: [chosen_theme], x: current_x, y: y, width: image.width*scale, height: image.height*scale, flavorText: item.desc })
            } else {
                current_x += 100;
            }
            if (debug && ret.length > 0) {
                return ret;
            }
        }
        current_y += y_wiggle;
    }
    return ret;
}


