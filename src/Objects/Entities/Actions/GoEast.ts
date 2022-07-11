import { MoveToEastDoor } from "../../MovementAlgs/MoveToEastDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";

export class GoEast extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["EAST","RIGHT"]; //nothing, so its default


    applyAction = (subject: Quotidian,current_room: Room,object?: Quotidian, )=>{
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        subject.movement_alg = new MoveToEastDoor(subject);
        subject.emitSass("OK")

        return `${subject.name} starts heading to the EAST DOOR.`;
    }



}