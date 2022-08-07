
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

//assume only peewee can do this
//hi!!! Did you know peewee is wasted? And a doom player?
export class GlitchDeath extends Action {



    recognizedCommands: string[] = ["KILL", "MURDER", "SLAUGHTER"];


    noTarget = (beat: AiBeat, current_room: Room, subject: Quotidian)=>{
        return `${subject.name} doesn't see anything to make un-alive.`;
    }

    withTargets = (beat: AiBeat,current_room: Room, subject: Quotidian, targets: PhysicalObject[])=>{
        let killed = false;
        for(let target of targets){
           if(target instanceof Quotidian){
                (target as Quotidian).live();
                killed = true;
           }
        }
        if(!killed){
            return this.noTarget(beat, current_room, subject);
        }
        return `${subject.name} brutally melees attacks the  ${turnArrayIntoHumanSentence(targets.map((e)=>e.name))}.`;

    }


    applyAction = (beat: AiBeat)=>{
        const current_room = beat.owner?.room;
        if(!current_room){
            return "";
        }
        const subject = beat.owner;
        if(!subject){
            return "";
        }

    
        const targets = beat.targets;
        if(targets.length ===0){
            return this.noTarget(beat, current_room, subject);
        }else{
            return this.withTargets(beat, current_room, subject, targets);
        }
    }

}