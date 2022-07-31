import { MoveToSouthDoor } from "../../MovementAlgs/MoveToSouthDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class GoSouth extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["SOUTH","DOWN"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
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