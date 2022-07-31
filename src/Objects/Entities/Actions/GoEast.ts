import { MoveToEastDoor } from "../../MovementAlgs/MoveToEastDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class GoEast extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["EAST","RIGHT"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }
        subject.movement_alg = new MoveToEastDoor(subject);
        subject.movement_alg.detectEle();
        if (subject.movement_alg.ele) {
            subject.emitSass("OK")
            return `${subject.name} starts heading to the EAST DOOR.`;
        }else{
            subject.emitSass("???")
            return `${subject.name} can't find the EAST DOOR. They start pacing anxiously.`;  
        }
    }



}