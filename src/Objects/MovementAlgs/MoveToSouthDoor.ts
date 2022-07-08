//given an Entity (which will have access to location and any other pertinent information)

import { Quotidian } from "../Entities/Quotidian";
import { MoveToSpecificLocation } from "./MoveToSpecificLocation";

//decides where to move next.
export class MoveToSouthDoor extends MoveToSpecificLocation{

    doorDetected = false;

    constructor(entity: Quotidian){
        let x = 0;
        let y = 0;
        super(x,y,entity);
    }
    customShit =()=>{
        if(!this.doorDetected){
            this.detectDoor();
        }
    }

    detectDoor = ()=>{
        const door = document.querySelector("#southDoor") as HTMLElement;
        if(door){
            this.x = door.offsetLeft
            this.y = door.offsetTop;
            this.doorDetected= true;
        }
    }
   
}