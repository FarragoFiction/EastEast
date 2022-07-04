//base level Entity object. quotidians can turn into anything

import { Movement } from "./MovementAlgs/BaseMovement";
import { RandomMovement } from "./MovementAlgs/RandomMovement";
import { PhysicalObject } from "./PhysicalObject";
import { Room } from "./RoomEngine/Room";
import { Theme } from "./Theme";

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

    constructor(room: Room,name:string, x: number, y:number, width: number, height: number, themes:Theme[], layer: number, src: string, flavorText:string){
        super(room,"Quotidan", x,y,width,height,themes,layer,src,flavorText);
    }

    tick = ()=>{
        this.movement_alg.tick();
        this.updateRendering();

    }

}
