//base level Entity object. quotidians can turn into anything

import { isThisTypeNode } from "typescript";
import { createElementWithIdAndParent } from "../../Utils/misc";
import { RandomMovement } from "../MovementAlgs/RandomMovement";
import { PhysicalObject } from "../PhysicalObject";
import { Room } from "../RoomEngine/Room";
import { Theme } from "../Theme";



export enum Direction {
    UP = 1,
    DOWN,
    LEFT,
    RIGHT,
  }

//what, did you think the REAL eye killer would be so formulaic? 
export class Quotidian extends PhysicalObject{

    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;
    sass?:HTMLElement;
    sassBegun?:Date;

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg = new RandomMovement(this);
    //TODO have a movement algorithm (effects can shift this)
    /*
    example movement algorithm
    * random
    * searching pattern
    * to north
    * to south
    * to east
    * to ENTITY
    * to OBJECT
    */
    //TODO have a list of Scenes (trigger, effect, like quest engine from NorthNorth)

    constructor(room: Room,name:string, x: number, y:number, width: number, height: number, themes:Theme[], src: string, flavorText:string){
        super(room,name, x,y,width,height,themes,11,src,flavorText);
    }

    emitSass = (sass: string)=>{
        //debounce essentially
        if(!this.sass || this.sass.innerText != sass){
            this.sass = createElementWithIdAndParent("div",this.container,undefined,"sass");
            this.sass.innerText = sass;
            this.sassBegun = new Date();
        }

    }

    customShit = ()=>{
        //if there is sass
        //and the sass hasn't expired
        // if there isn't a popup on the object, make one now.
        //otherwise you're fine

    }

    tick = ()=>{
        this.movement_alg.tick();
        this.updateRendering();

    }

}
