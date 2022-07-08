//given an Entity (which will have access to location and any other pertinent information)

import { Quotidian } from "../Entities/Quotidian";
import { Movement } from "./BaseMovement";


//decides where to move next.
export class MoveToWestDoor extends Movement{


    constructor(entity: Quotidian){
 
        super(entity);
    }
    customShit =()=>{
        this.entity.emitSass("THERES NO DOOR TO THE WEST, DUNKASS (please, stop making me, go there).")
    }

    tick = ()=>{
        this.customShit();
    }


   
}