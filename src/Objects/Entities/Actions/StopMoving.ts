import { MoveToEastDoor } from "../../MovementAlgs/MoveToEastDoor";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";

export class StopMoving extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["STOP","FREEZE","STILL","STAND"]; //nothing, so its default


    applyAction = (subject: Quotidian,current_room: Room,objects?: PhysicalObject[])=>{
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        subject.movement_alg = new NoMovement(subject);
        return `${subject.name} comes to a halt.`;
    }



}