//given an Entity (which will have access to location and any other pertinent information)

import { Quotidian } from "../Entities/Quotidian";
import { MoveToSpecificElement } from "./MoveToSpecificElement";

//decides where to move next.
export class MoveToEastDoor extends MoveToSpecificElement{


    constructor(entity: Quotidian){
        super( "#eastDoor",entity);
    }

   
}