//base level Entity object. quotidians can turn into anything

import { isThisTypeNode } from "typescript";
import { createElementWithIdAndParent, getElementCenterPoint } from "../../Utils/misc";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { MoveToEastDoor } from "../MovementAlgs/MoveToEastDoor";
import { MoveToNorthDoor } from "../MovementAlgs/MoveToNorthDoor";
import { MoveToSouthDoor } from "../MovementAlgs/MoveToSouthDoor";
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

  const baseImageLocation  = "images/Walkabout/Sprites/";

//what, did you think the REAL eye killer would be so formulaic? 
export class Quotidian extends PhysicalObject{
    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;
    sass?:HTMLElement;
    sassBegun?:Date;

    direction = Direction.DOWN; //movement algorithm can change or use this.
    possible_random_move_algs = [new RandomMovement(this),new MoveToEastDoor(this), new MoveToNorthDoor(this), new MoveToSouthDoor(this)]
    movement_alg = pickFrom(this.possible_random_move_algs)
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
        super(room,name, x,y,width,height,themes,11,`${baseImageLocation}${src}`,flavorText);
    }

    emitSass = (sass: string)=>{
        //debounce essentially
        if(!this.sass || this.sass.innerText != sass){
            this.sass = createElementWithIdAndParent("div",this.container,undefined,"sass");
            this.sass.innerText = sass;
            this.sassBegun = new Date();

            setTimeout(()=>{
                if(this.sass){
                    this.sass.className="sass fadeout";
                }
            },2000);

            setTimeout(()=>{
                this.sass?.remove();
            },3000);
        }

    }

    tick = ()=>{
        this.movement_alg.tick();
        this.updateRendering();

    }

}
