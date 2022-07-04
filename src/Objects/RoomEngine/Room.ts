import { all_themes, Theme } from "../Theme";
import { FLOOR, FLOORBACKGROUND, FLOORFOREGROUND, SPYING, WALL, WALLBACKGROUND, WALLFOREGROUND } from "../ThemeStorage";
import { createElementWithIdAndParent } from "../../Utils/misc";
import SeededRandom from "../../Utils/SeededRandom";
import { Quotidian } from "../Quotidian";
import { PhysicalObject, RenderedItem } from "../PhysicalObject";
import { addImageProcess } from "../../Utils/URLUtils";



export class Room {
    themes: Theme[];
    floor = "glitch.png"
    wall = "glitch.png"
    wallHeight = 100;
    rand: SeededRandom;
    element: HTMLElement;
    width = 400;
    height = 600;
    blorbos: Quotidian[] = [];
    items: PhysicalObject[] = [];
    ticking = false;
    tickRate = 100;


    //objects
    //people
    //really theres just the one room, we keep clearing it out.
    constructor(themes: Theme[], element: HTMLElement, rand: SeededRandom) {
        this.themes = themes;
        this.rand = rand;
        this.element = element;
        this.init();
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
        this.ticking = true;
        this.tick();
    }

    addItem = (obj: PhysicalObject) => {
        this.items.push(obj);
    }

    addBlorbo = (blorbo: Quotidian) => {
        this.blorbos.push(blorbo);
    }

    tick = () => {
        //TODO blorbos all tick
        for(let blorbo of this.blorbos){
            blorbo.tick();
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

    spawnChildRoom = () => {
        randomRoomWithThemes(this.element,this.childRoomThemes(), this.rand );
    }

}

export const randomRoomWithThemes = async (ele: HTMLElement, themes: Theme[], seededRandom: SeededRandom) => {
    const room = new Room(themes, ele, seededRandom);
    const items1: RenderedItem[] = await spawnWallObjects(room.width,room.height, 0,WALLBACKGROUND, "BackWallObjects", seededRandom, themes);
    const items3: RenderedItem[] = await spawnFloorObjects(room.width,room.height,0, FLOORBACKGROUND, "UnderFloorObjects", seededRandom, themes);
    const items2: RenderedItem[] = await spawnWallObjects(room.width,room.height,1, WALLFOREGROUND, "FrontWallObjects", seededRandom, themes);
    const items4: RenderedItem[] = await spawnFloorObjects(room.width,room.height,1, FLOORFOREGROUND, "TopFloorObjects", seededRandom, themes);
    const items = items3.concat(items2.concat(items4));
    for(let item of items){
        room.addItem(new PhysicalObject(room,item.name,item.x,item.y,item.width,item.height,item.themes,item.layer,item.src,item.flavorText))
    }

    const stress_test = 100;
    for(let i = 0; i< stress_test; i++){
        room.addBlorbo(new Quotidian(room,"Quotidian",150,150,50,50, [all_themes[SPYING]],2,"images/Walkabout/Sprites/humanoid_crow.gif","testing"));
    }


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


