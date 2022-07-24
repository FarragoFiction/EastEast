import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";

export class GoNorth extends Action { //lawsuit


    recognizedCommands: string[] = ["NORTH", "DOOR", "UP"]; //nothing, so its default


    applyAction = (subject: Quotidian, current_room: Room, objects?: PhysicalObject[]) => {
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        subject.movement_alg = new MoveToNorthDoor(subject);
        subject.movement_alg.detectEle();
        if (subject.movement_alg.ele) {
            subject.emitSass("OK")
            return `${subject.name} starts heading to the NORTH DOOR.`;
        }else{
            subject.emitSass("???")
            return `${subject.name} can't find the NORTH DOOR. They start pacing anxiously.`;  
        }
    }



}