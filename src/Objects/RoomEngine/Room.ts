import { all_themes, Theme } from "../Theme";
import { ADJ, CLOWNS, FLOOR, FLOORBACKGROUND, FLOORFOREGROUND, KILLING, KNOWING, LOCATION, OBFUSCATION, SOUL, WALL, WALLBACKGROUND, WALLFOREGROUND } from "../ThemeStorage";
import { boundingBoxesIntersect, createElementWithIdAndParent } from "../../Utils/misc";
import SeededRandom from "../../Utils/SeededRandom";
import { PhysicalObject, RenderedItem } from "../PhysicalObject";
import { addImageProcess } from "../../Utils/URLUtils";
import { Maze } from "./Maze";
import { removeItemOnce } from "../../Utils/ArrayUtils";
import { titleCase } from "../../Utils/StringUtils";

import { StoryBeat } from "./StoryBeat";
import { Camille, End } from "../Entities/Blorbos/End";
import { Peewee } from "../Entities/Blorbos/Peewee";
import { Quotidian } from "../Entities/Blorbos/Quotidian";


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
    //a room has a source if they are inside of something
    totemObject? :PhysicalObject;

    timesVisited = 0;
    blorbos: Quotidian[] = [];
    peewee?: Peewee; //peewee is optional to the universe;
    items: PhysicalObject[] = [];
    ticking = false;
    tickRate = 100;
    children: Room[] = [];
    name = "???";
    pendingStoryBeats: StoryBeat[] = [];


    //objects
    //people
    //really theres just the one room, we keep clearing it out.
    constructor(maze: Maze, themes: Theme[], element: HTMLElement, rand: SeededRandom) {
        this.themes = themes;
        this.rand = rand;
        this.maze = maze;
        this.element = element;
        this.init();
    }

    getRandomThemeConcept = (concept: string) => {
        if (this.themes.length === 0) {
            return `[ERROR: NO THEME FOUND FOR ${this.name.toUpperCase()}]`;
        }
        const theme = this.rand.pickFrom(this.themes);
        return theme.pickPossibilityFor(this.rand, concept);
    }

    stopTicking = () => {
        this.ticking = false;
    }

    spawnChildrenIfNeeded = async () => {
        if (this.children.length === 0) { //don't let anything have NO exits
            const child = await this.spawnChildRoom();
            this.addChild(child);
        } else if (this.children.length < 4 && this.rand.nextDouble() > 0.75) {//1/4 chance of things changing.
            const child = await this.spawnChildRoom();
            this.addChild(child);

        } else if (this.rand.nextDouble() > 0.95) {// 1/20 chance of a familiar door leading somewhere new.
            removeItemOnce(this.children, this.rand.pickFrom(this.children));
            const child = await this.spawnChildRoom();
            this.addChild(child);
        }
    }

    pause = () => {
        this.ticking = false;
        this.maze.chantingEngine.pause();
    }

    resume = () => {
        this.ticking = true;
        this.maze.chantingEngine.start();
        this.tick();
    }

    render = async () => {
        this.timesVisited++;
        await this.spawnChildrenIfNeeded();
        this.element.innerHTML = "";
        this.width = this.element.getBoundingClientRect().width;
        this.height = this.element.getBoundingClientRect().height;
        const wall = createElementWithIdAndParent("div", this.element, "wall");
        const name = createElementWithIdAndParent("div", this.element, undefined, "roomName");
        name.innerText = `${this.name}: ${this.timesVisited}`;

        if(this.totemObject){
            wall.style.backgroundImage = `url(${this.totemObject.src})`;
            this.element.style.backgroundImage = `url(${this.totemObject.src})`;
        }else{
            wall.style.backgroundImage = `url(images/Walkabout/wall/${this.wall})`;
            this.element.style.backgroundImage = `url(images/Walkabout/floor/${this.floor})`;
        }

        for (let item of this.items) {
            item.attachToParent(this.element);
        }

        for (let blorbo of this.blorbos) {
            blorbo.attachToParent(this.element);
        }
        this.renderNorthDoor();
        this.renderEastDoor();
        this.renderSouthDoor();


        this.ticking = true;
        this.tick();
    }

    getNorth = () => {
        return this.children.length > 0 && this.children[0];
    }
    getEast = () => {
        return this.children.length > 1 && this.children[1];

    }
    getSouth = () => {
        return this.children.length > 2 && this.children[2];
    }

    renderNorthDoor = () => {
        const door = this.getNorth();
        if (door) {
            const image = createElementWithIdAndParent("img", this.element, "northDoor") as HTMLImageElement;
  
            image.src = "images/Walkabout/door.png";
            image.title = door.name;
            const rug = createElementWithIdAndParent("img", this.element, "northDoorRug") as HTMLImageElement;
            rug.src = "images/Walkabout/rug.png";
            if(this.totemObject){
                image.src = this.totemObject.src;
                rug.src = this.totemObject.src;
            }
        }
    }

    renderEastDoor = () => {
        const door = this.getEast();

        if (door) {
            const rug = createElementWithIdAndParent("img", this.element, "eastDoor") as HTMLImageElement;
            rug.src = "images/Walkabout/rug.png";
            rug.title = door.name;
            if(this.totemObject){
                rug.src = this.totemObject.src;
            }
        }
    }

    renderSouthDoor = () => {
        const door = this.getSouth();
        if (door) {
            const rug = createElementWithIdAndParent("img", this.element, "southDoor") as HTMLImageElement;
            rug.src = "images/Walkabout/rug.png";
            rug.title = door.name;
            if(this.totemObject){
                rug.src = this.totemObject.src;
            }
        }
    }

    addItem = (obj: PhysicalObject) => {
        this.items.push(obj);
        obj.room = this;
        obj.attachToParent(this.element);
    }

    removeItem = (obj: PhysicalObject) => {
        removeItemOnce(this.items, obj);
        obj.container.remove();
    }

    addBlorbo = (blorbo: Quotidian) => {
        console.log("JR NOTE: ", this.name, "is adding blorbo", blorbo.name);
        //so they don't spawn on a door
        blorbo.x = 150;
        blorbo.y = 350;
        this.blorbos.push(blorbo);
        blorbo.attachToParent(this.element);
        blorbo.room = this; //if they were spawning in a different room before, too bad
    }

    removeBlorbo = (blorbo: Quotidian) => {
        removeItemOnce(this.blorbos, blorbo);
        blorbo.container.remove();
    }

    teardown = () => {
        this.ticking = false;
        if (this.peewee) {
            this.removeBlorbo(this.peewee);
        }
        this.peewee = undefined;
        while (this.element.firstChild) {
            const child = this.element.firstChild;
            this.element.removeChild(this.element.firstChild);
        }

    }


    //if any blorbo is near a door, move them into the room whose door they are near.
    checkForDoors = (blorbo: Quotidian) => {
        this.checkNorthDoor(blorbo);
        this.checkSouthDoor(blorbo);
        this.checkEastDoor(blorbo);
    }

    checkNorthDoor = (blorbo: Quotidian) => {
        if (!this.getNorth()) {
            return;
        }
        const door = document.querySelector("#northDoorRug") as HTMLElement;
        if (door) {
            const doorRect = door.getBoundingClientRect()
            if (boundingBoxesIntersect(doorRect, blorbo.container.getBoundingClientRect())) {
                this.maze.playDoorSound();
                if (blorbo.name !== "Peewee") {
                    this.removeBlorbo(blorbo);
                    this.maze.addStorybeat(new StoryBeat(`${blorbo.name} Leave`,`${blorbo.name} leaves out the NORTH DOOR.`))

                } else {
                    const room = this.getNorth();
                    room && this.maze.changeRoom(room);
                }
            }
        }
    }

    checkSouthDoor = (blorbo: Quotidian) => {
        if (!this.getSouth()) {
            return;
        }
        const door = document.querySelector("#southDoor") as HTMLElement;
        const blorboRect = blorbo.container.getBoundingClientRect();
        if (door) {
            const doorRect = door.getBoundingClientRect();
            if (boundingBoxesIntersect(doorRect, blorboRect)) {
                this.maze.playDoorSound();
                if (blorbo.name !== "Peewee") {
                    this.removeBlorbo(blorbo);
                    this.maze.addStorybeat(new StoryBeat(`${blorbo.name} Leave`,`${blorbo.name} leaves out the SOUTH DOOR.`))
                } else {
                    const room = this.getSouth();
                    room && this.maze.changeRoom(room);
                }
            }
        }
    }

    checkEastDoor = (blorbo: Quotidian) => {
        if (!this.getEast()) {
            return;
        }
        const door = document.querySelector("#eastDoor") as HTMLElement;

        if (door) {
            const doorRect = door.getBoundingClientRect()
            if (boundingBoxesIntersect(doorRect, blorbo.container.getBoundingClientRect())) {
                this.maze.playDoorSound();
                if (blorbo.name !== "Peewee") {
                    this.removeBlorbo(blorbo);
                    this.maze.addStorybeat(new StoryBeat(`${blorbo.name} Leave`,`${blorbo.name} leaves out the EAST DOOR.`))

                } else {
                    const room = this.getEast();
                    room && this.maze.changeRoom(room);
                }
            }
        }
    }

    createRoomToSuckYouInFromObject = async (obj: PhysicalObject)=>{
        /*
        * make a new room, room has the themes of the object, and the src of the object
* room has only one exit, exit leads to the room you were in . prevent room you were in from leading to the item
        */
       //always the same room from the same item, is what matters.
       const room = await randomRoomWithThemes(this.maze,this.element,[...obj.themes],new SeededRandom(obj.processedName().length));
       room.totemObject = obj;
       room.name = `${obj.processedName()}'s Innerworld`;
       room.children = [this];//do NOT trigger the auto leadback;
       return room;

    }

    processDeath = (blorbo: Quotidian) => {
        let deathMessage = `${blorbo.name} has died.`;
        if (!this.hasEnd()) {
            deathMessage = `Drawn by their fated end, The End has come for the ${blorbo.name}.`;
            const end = new Camille(this, blorbo.x, blorbo.y)
            this.addBlorbo(end);
            end.attachToParent(this.element);
        }
        this.pendingStoryBeats.push(new StoryBeat(`${blorbo.name}: die`, deathMessage));
    }

    hasEnd = () => {
        for(let blorbo of this.blorbos){
            if(blorbo instanceof End){
                return true;
            }
        }
        return false;
    }

    tick = () => {
        if (!this.ticking) {
            return;
        }

        //everything that needed to happen AFTER this tick finishes
        for (let beat of this.pendingStoryBeats) {
            this.maze.addStorybeat(beat);
        }
        this.pendingStoryBeats = [];

        for (let blorbo of this.blorbos) {

            if (!blorbo.dead) {
                blorbo.tick();
            }
            this.checkForDoors(blorbo);
        }

        setTimeout(this.tick, this.tickRate);
    }

    init = () => {
        this.name = `${titleCase(this.getRandomThemeConcept(ADJ))} ${titleCase(this.getRandomThemeConcept(LOCATION))}`;
        this.initFloor();
        this.initWall();
    }

    initFloor = () => {
        const theme: Theme = this.rand.pickFrom(this.themes);
        this.floor = theme.pickPossibilityFor(this.rand, FLOOR);
        const floor_default_choices = ["woodfloor.png", "chevronfloor.png", "metalfloor.png"];
        console.log("JR NOTE: floor is", this.floor)
        if (this.floor.includes("ERROR")) {
            this.floor = this.rand.pickFrom(floor_default_choices)
        }

    }

    initWall = () => {
        const theme: Theme = this.rand.pickFrom(this.themes);
        const wall_default_choices = ["thatchwalls.png", "brickwalls.png", "woodwall.png", "stonewalls2.png"];
        this.wall = theme.pickPossibilityFor(this.rand, WALL);
        console.log("JR NOTE: wall is", this.wall)

        if (this.wall.includes("ERROR")) {
            this.wall = this.rand.pickFrom(wall_default_choices)
        }
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

    addChild = (child: Room) => {
        this.children.push(child);
        //north is always back, this is just the rules of this mazes, what you think GEOMETRY should matter here?
        child.children[0] = this;

    }

    spawnChildRoom = async () => {
        return await randomRoomWithThemes(this.maze, this.element, this.childRoomThemes(), this.rand);
    }

    //when i first make the maze, we generate its structure to a certain depth, and then from there one room at a time.
    propagateMaze = async (depthRemaining: number) => {
        const numberChildren = this.rand.getRandomNumberBetween(1, 2);
        for (let i = 0; i < numberChildren; i++) {
            const child = await this.spawnChildRoom();
            this.addChild(child);
            if (depthRemaining > 0) {
                child.propagateMaze(depthRemaining - 1);
            }
        }
    }

}

export const randomRoomWithThemes = async (maze: Maze, ele: HTMLElement, themes: Theme[], seededRandom: SeededRandom) => {
    const room = new Room(maze, themes, ele, seededRandom);
    const items1: RenderedItem[] = await spawnWallObjects(room.width, room.height, 0, WALLBACKGROUND, "BackWallObjects", seededRandom, themes);
    const items3: RenderedItem[] = await spawnFloorObjects(room.width, room.height, 0, FLOORBACKGROUND, "UnderFloorObjects", seededRandom, themes);
    const items2: RenderedItem[] = await spawnWallObjects(room.width, room.height, 1, WALLFOREGROUND, "FrontWallObjects", seededRandom, themes);
    const items4: RenderedItem[] = await spawnFloorObjects(room.width, room.height, 1, FLOORFOREGROUND, "TopFloorObjects", seededRandom, themes);
    const items = items3.concat(items2.concat(items4));
    for (let item of items) {
        room.addItem(new PhysicalObject(room, item.name, item.x, item.y, item.width, item.height, item.themes, item.layer, item.src, item.flavorText))
    }
    return room;
}

//has to be async because it checks the image size for positioning
export const spawnWallObjects = async (width: number, height: number, layer: number, key: string, folder: string, seededRandom: SeededRandom, themes: Theme[]) => {
    let current_x = 0;
    const padding = 10;
    const ret: RenderedItem[] = [];
    while (current_x < width) {
        const chosen_theme: Theme = seededRandom.pickFrom(themes);
        const item = chosen_theme.pickPossibilityFor(seededRandom, key);
        if (item && item.src && seededRandom.nextDouble() > 0.3) {
            const image: any = await addImageProcess((`images/Walkabout/Objects/${folder}/${item.src}`)) as HTMLImageElement;
            current_x += image.width * 2;
            //don't clip the wall border, don't go past the floor
            if (current_x + padding + image.width > width) {
                return ret;
            }
            const y = seededRandom.getRandomNumberBetween(padding, Math.max(padding, image.height));
            if (!item.name) {
                item.name = `${titleCase(chosen_theme.key)} Object`;
            }
            ret.push({ name: item.name, layer: layer, src: `images/Walkabout/Objects/${folder}/${item.src}`, themes: [chosen_theme], x: current_x, y: y, width: image.width, height: image.height, flavorText: item.desc })
        } else {
            current_x += 50;
        }
    }
    return ret;
}


//has to be async because it checks the image size for positioning
const spawnFloorObjects = async (width: number, height: number, layer: number, key: string, folder: string, seededRandom: SeededRandom, themes: Theme[]) => {
    let current_x = 0;
    const floor_bottom = 140;
    let current_y = floor_bottom;
    const padding = 10;
    const ret: RenderedItem[] = [];
    const y_wiggle = 50;
    const debug = false;
    const baseLocation = "images/Walkabout/Objects/";
    const clutter_rate = seededRandom.nextDouble(0.75, 0.99); //smaller is more cluttered
    const artifacts = [
        { name: "Unos Artifact Book", layer: layer, src: `Artifacts/Zampanio_Artifact_01_Book.png`, themes: [all_themes[SOUL], all_themes[OBFUSCATION]], desc: "A tattered cardboard book filled with signatures with an ornate serif '1' embossed onto it." }
        , { name: "Duo Mask", layer: layer, src: `Artifacts/Zampanio_Artifact_02_Mask.png`, themes: [all_themes[CLOWNS], all_themes[OBFUSCATION]], desc: "A faceless theater mask with a 2 on the inside of the forehead." }
        , { name: "Tres Bottle", layer: layer, src: `Artifacts/Zampanio_Artifact_03_Bottle.png`, themes: [all_themes[OBFUSCATION]], desc: "A simple glass milk bottle with a 3 emblazoned on it." }
        , { name: "Quatro Blade", layer: layer, src: `Artifacts/Zampanio_Artifact_04_Razor.png`, themes: [all_themes[KILLING], all_themes[OBFUSCATION]], desc: "A dull straight razor stained with blood, a number 4 is etched onto the side of the blade." }
        , { name: "Quinque Cloak", layer: layer, src: `Artifacts/Zampanio_Artifact_05_Cloak.png`, themes: [all_themes[OBFUSCATION]], desc: " A simple matte blue cloak with a 5 embroidered on the back in shiny red thread. " }
        , { name: "Sextant", layer: layer, src: `Artifacts/Zampanio_Artifact_06_Sextant.png`, themes: [all_themes[OBFUSCATION]], desc: "A highly polished brass sextant. There is a 6 carved onto the main knob." }
        , { name: "Septum Coin", layer: layer, src: `Artifacts/Zampanio_Artifact_07_Coin_Bronze.png`, themes: [all_themes[OBFUSCATION]], desc: "An old bronze coin. There is a theater mask on one side, and a 7 on the other." }
        , { name: "Octome", layer: layer, src: `Artifacts/Zampanio_Artifact_08_Tome.png`, themes: [all_themes[KNOWING], all_themes[OBFUSCATION]], desc: "A crumbling leather book with seemingly latin script, with messily torn pages.  There is an 8 embossed onto the back." }
        , { name: "Novum Mirror", layer: layer, src: `Artifacts/Zampanio_Artifact_09_Mirror.png`, themes: [all_themes[OBFUSCATION]], desc: "An ornate but tarnished silver mirror, with a 9 carved onto the back. It is said to reflect everything but faces." }
    ];
    while (current_y + padding < height) {
        current_x = padding;
        while (current_x < width) {
            let chosen_theme: Theme[] = [seededRandom.pickFrom(themes)];
            let scale = 1.5;
            let item = chosen_theme[0].pickPossibilityFor(seededRandom, key);
            if (layer === 1 && seededRandom.nextDouble() > 0.95) {
                item = seededRandom.pickFrom(artifacts);
                chosen_theme = item.themes;
                scale = 1.0;
            }
            if (item && item.src && seededRandom.nextDouble() > clutter_rate) {
                if (!item.name) {
                    item.name = `${titleCase(chosen_theme[0].key)} Object`;
                }
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
                ret.push({ name: item.name, layer: layer, src: `${baseLocation}${folder}/${item.src}`, themes: chosen_theme, x: current_x, y: y, width: image.width * scale, height: image.height * scale, flavorText: item.desc })
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


