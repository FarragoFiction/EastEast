//given an Entity (which will have access to location and any other pertinent information)

import { Quotidian } from "../Entities/Quotidian";
import { MoveToSpecificElement } from "./MoveToSpecificElement";

//decides where to move next.
export class MoveToNorthDoor extends MoveToSpecificElement{


    constructor(entity: Quotidian){
        super( "#northDoorRug",entity);
    }   
}