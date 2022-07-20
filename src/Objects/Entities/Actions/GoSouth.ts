import { MoveToSouthDoor } from "../../MovementAlgs/MoveToSouthDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";

export class GoSouth extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["SOUTH","DOWN"]; //nothing, so its default


    applyAction = (subject: Quotidian,current_room: Room,object?: Quotidian, )=>{
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        subject.movement_alg = new MoveToSouthDoor(subject);
        subject.movement_alg.detectEle();
        if (subject.movement_alg.ele) {
            subject.emitSass("OK")
            return `${subject.name} starts heading to the SOUTH DOOR.`;
        }else{
            subject.emitSass("???")
            return `${subject.name} can't find the SOUTH DOOR. They start pacing anxiously.`;  
        }
    }



}