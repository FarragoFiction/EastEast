//base level Entity object. quotidians can turn into anything

import { PhysicalObject } from "./PhysicalObject";
import { Theme } from "./Theme";

//what, did you think the REAL eye killer would be so formulaic? 
export class Quotidian extends PhysicalObject{


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

    constructor(name:string, x: number, y:number, width: number, height: number, themes:Theme[], layer: number, src: string, flavorText:string){
        super("Quotidan", x,y,width,height,themes,layer,src,flavorText);
    }

    tick = ()=>{
        console.log("TODO: tick, need to move according to movement algorithm and check all scenes to see if any apply");
    }

}
