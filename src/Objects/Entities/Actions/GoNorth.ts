import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class GoNorth extends Action { //lawsuit


    recognizedCommands: string[] = ["NORTH", "DOOR", "UP"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        subject.movement_alg = new MoveToNorthDoor(subject);
        subject.movement_alg.detectEle();
        if (subject.movement_alg.ele) {
            subject.emitSass("OK")
            return `${subject.processedName()} starts heading to the NORTH DOOR.`;
        }else{
            subject.emitSass("???")
            return `${subject.processedName()} can't find the NORTH DOOR. They start pacing anxiously.`;  
        }
    }



}