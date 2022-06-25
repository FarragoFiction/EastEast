import { Theme } from "../../Objects/Theme";
import { FLOOR, WALL } from "../../Objects/ThemeStorage";
import { createElementWithIdAndParent } from "../../Utils/misc";
import SeededRandom from "../../Utils/SeededRandom";

export class Room {
    themes: Theme[];
    floor = "glitch.png"
    wall=  "glitch.png"
    seed: SeededRandom;
    element: HTMLElement;
    width = 0;
    height = 0;
    
    //objects
    //people
    //really theres just the one room, we keep clearing it out.
    constructor(themes:Theme[], element: HTMLElement,seed:SeededRandom){
        this.themes = themes;
        this.seed = seed;
        this.element = element;
        this.init();
    }

    render =()=>{   
        this.element.innerHTML = "";
        this.width = this.element.getBoundingClientRect().width;
        this.height = this.element.getBoundingClientRect().height;
        this.element.style.backgroundImage = `url(images/Walkabout/floor/${this.floor})`;
        const wall = createElementWithIdAndParent("div",this.element,"wall");
        wall.style.backgroundImage = `url(images/Walkabout/wall/${this.wall})`;

        
    }

    init = ()=>{
        this.initFloor();
        this.initWall();
    }

    initFloor = ()=>{
        const theme:Theme = this.seed.pickFrom(this.themes);
        this.floor = theme.pickPossibilityFor(this.seed, FLOOR);
    }

    initWall = ()=>{
        const theme:Theme = this.seed.pickFrom(this.themes);
        this.wall = theme.pickPossibilityFor(this.seed, WALL);
    }


}
