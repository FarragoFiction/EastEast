import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { MoveToWestDoor } from "../../MovementAlgs/MoveToWestDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { MoveToSpecificElement } from "../../MovementAlgs/MoveToSpecificElement";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { MoveToSpecificPhysicalObject } from "../../MovementAlgs/MoveToSpecificPhysicalObject";

export class FollowObject extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["APPROACH","CRAWL TO","SLITHER TO","WALK TO","MOVE TO","GO TO","FOLLOW","GO AFTER","ACCOMPANY", "GO ALONG WITH","STICK TO"]; //not for peewee, not yet

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }

        const target = beat.targets;
        if(target.length < 1){
            return `${subject.name} can't see anything to move towards like that...`;
        }
        subject.movement_alg = new MoveToSpecificPhysicalObject(target[0], subject);
        subject.emitSass("!")
        return `${subject.name} starts moving towards the ${target[0].name}.`;
    }



}