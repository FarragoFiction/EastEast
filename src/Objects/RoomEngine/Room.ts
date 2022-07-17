import { all_themes, Theme } from "../Theme";
import { DARKNESS, FEELING, FLOOR, FLOORBACKGROUND, FLOORFOREGROUND, OBFUSCATION, SMELL, SOUND, SPYING, TASTE, WALL, WALLBACKGROUND, WALLFOREGROUND } from "../ThemeStorage";
import { boundingBoxesIntersect, createElementWithIdAndParent, pointWithinBoundingBox } from "../../Utils/misc";
import SeededRandom from "../../Utils/SeededRandom";
import { Quotidian } from "../Entities/Quotidian";
import { PhysicalObject, RenderedItem } from "../PhysicalObject";
import { addImageProcess } from "../../Utils/URLUtils";
import { Peewee } from "../Entities/Peewee";
import { Maze } from "./Maze";
import { removeItemOnce } from "../../Utils/ArrayUtils";
import { pickFrom } from "../../Utils/NonSeededRandUtils";



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
        return this.children.length > 0 && this.children[0];
    }
    getEast = ()=>{
        return this.children.length > 1 && this.children[1];

    }
    getSouth = ()=>{
        return this.children.length > 2 && this.children[2];
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

    removeBlorbo = (blorbo: Quotidian) => {
        console.log("JR NOTE: removing blorbo", blorbo.name)
        removeItemOnce(this.blorbos, blorbo);
        blorbo.container.remove();
        console.log("JR NOTE: just so you know, children are", this.children)
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
        if(!this.getNorth()){
            return;
        }
        const door = document.querySelector("#northDoorRug") as HTMLElement;
        const doorRect = door.getBoundingClientRect()
        const blorboCenter = blorbo.centerPos();
        if(door){
            if(boundingBoxesIntersect(doorRect, blorbo.container.getBoundingClientRect())){
                this.maze.playDoorSound();
                if(blorbo.name !== "Peewee"){
                    console.log("JR NOTE: removing a non peewee cause blorbo is at",blorboCenter, "and north door is at", {x:doorRect.x,y:doorRect.y} )
                    this.removeBlorbo(blorbo);
                    const room = this.getNorth();
                    room && room.addBlorbo(blorbo);
                }
            }
        }
    }

    checkSouthDoor = (blorbo: Quotidian)=>{
        if(!this.getSouth()){
            return;
        }
        const door = document.querySelector("#southDoor") as HTMLElement;
        const doorRect = door.getBoundingClientRect()
        ;
        const blorboCenter = blorbo.centerPos();
        if(door){
            if(boundingBoxesIntersect(doorRect, blorbo.container.getBoundingClientRect())){
                this.maze.playDoorSound();
                if(blorbo.name !== "Peewee"){
                    console.log("JR NOTE: removing a non peewee cause blorbo is at",blorboCenter, "and south door is at", {x:doorRect.x,y:doorRect.y} )
                    this.removeBlorbo(blorbo);
                    const room = this.getSouth();
                    room && room.addBlorbo(blorbo);
                }
            }
        }
    }

    checkEastDoor = (blorbo: Quotidian)=>{
        if(!this.getEast()){
            return;
        }
        const door = document.querySelector("#eastDoor") as HTMLElement;
        const doorRect = door.getBoundingClientRect()


        const blorboCenter = blorbo.centerPos();
        if(door){
            if(boundingBoxesIntersect(doorRect, blorbo.container.getBoundingClientRect())){
                this.maze.playDoorSound();
                if(blorbo.name !== "Peewee"){
                    console.log("JR NOTE: removing a non peewee cause blorbo is at",blorboCenter, "and east door is at", {x:doorRect.x,y:doorRect.y} )
                    this.removeBlorbo(blorbo);
                    const room = this.getEast();
                    room && room.addBlorbo(blorbo);
                }
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
        room.addBlorbo(new Quotidian(room,"Quotidian",150,150, [all_themes[SPYING]],{default_src:{src:"humanoid_crow.gif",width:50,height:50}},"testing"));
    }
    room.peewee = new Peewee(room,150,350);
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
    const y_wiggle = 50;
    const debug = false;
    const baseLocation = "images/Walkabout/Objects/";
    const clutter_rate = seededRandom.nextDouble(0.75,0.99); //smaller is more cluttered
    const artifacts = [
        {name: "Unos Artifact Book", layer: layer, src:`Artifacts/Zampanio_Artifact_01_Book.png`, themes: [OBFUSCATION], flavorText: "A tattered cardboard book filled with signatures with an ornate serif '1' embossed onto it." }
        ,{name: "Duo Mask", layer: layer, src:`Artifacts/Zampanio_Artifact_02_Mask.png`, themes: [OBFUSCATION], flavorText: "A faceless theater mask with a 2 on the inside of the forehead." }
        ,{name: "Tres Bottle", layer: layer, src:`Artifacts/Zampanio_Artifact_03_Bottle.png`, themes: [OBFUSCATION], flavorText: "A simple glass milk bottle with a 3 emblazoned on it." }
        ,{name: "Quatro Blade", layer: layer, src:`Artifacts/Zampanio_Artifact_04_Razor.png`, themes: [OBFUSCATION], flavorText: "A dull straight razor stained with blood, a number 4 is etched onto the side of the blade." }
        ,{name: "Quinque Cloak", layer: layer, src:`Artifacts/Zampanio_Artifact_05_Cloak.png`, themes: [OBFUSCATION], flavorText: " A simple matte blue cloak with a 5 embroidered on the back in shiny red thread. " }
        ,{name: "Sextant", layer: layer, src:`Artifacts/Zampanio_Artifact_06_Sextant.png`, themes: [OBFUSCATION], flavorText: "A highly polished brass sextant. There is a 6 carved onto the main knob." }
        ,{name: "Septum Coin", layer: layer, src:`Artifacts/Zampanio_Artifact_07_Coin_Bronze.png`, themes: [OBFUSCATION], flavorText: "An old bronze coin. There is a theater mask on one side, and a 7 on the other." }
        ,{name: "Octome", layer: layer, src:`Artifacts/Zampanio_Artifact_08_Tome.png`, themes: [OBFUSCATION], flavorText: "A crumbling leather book with seemingly latin script, with messily torn pages.  There is an 8 embossed onto the back." }
        ,{name: "Novum Mirror", layer: layer, src:`Artifacts/Zampanio_Artifact_09_Mirror.png`, themes: [OBFUSCATION], flavorText: "An ornate but tarnished silver mirror, with a 9 carved onto the back. It is said to reflect everything but faces." }
    ];
    while (current_y + padding < height) {
        current_x = padding;
        while (current_x < width) {
            let chosen_theme: Theme = seededRandom.pickFrom(themes);
            let scale = 1.5;
            let item = chosen_theme.pickPossibilityFor(seededRandom, key);
            if(layer === 1 && seededRandom.nextDouble()>0.95){
                item = seededRandom.pickFrom(artifacts);
                chosen_theme = seededRandom.pickFrom(item.themes);
                scale = 1.0;
            }
            if (item && item.src && seededRandom.nextDouble() > clutter_rate) {
                const image: any = await addImageProcess(`${baseLocation}${folder}/${item.src}`) as HTMLImageElement;
                current_x += image.width * scale;
                //don't clip the wall border, don't go past the floor
                if (current_x + padding + image.width * scale > width) {
                    break;
                }
                const y = seededRandom.getRandomNumberBetween(current_y - y_wiggle, current_y + y_wiggle);
                if (y + padding + image.height * scale > height) {
                    break;
                }
                ret.push({name:"Generic Object", layer: layer, src: `${baseLocation}${folder}/${item.src}`, themes: [chosen_theme], x: current_x, y: y, width: image.width*scale, height: image.height*scale, flavorText: item.desc })
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


