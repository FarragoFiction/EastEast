
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { PhysicalObject } from "../../PhysicalObject";

export class SpawnObjectAtFeet extends Action{ //lawsuit
    
    recognizedCommands:string[] =[]
    object: PhysicalObject;

    constructor(object: PhysicalObject){
        super();
        this.object = object;
    }

    applyAction = (beat: AiBeat)=>{
        const subject = beat.owner;
        if(!subject){
            return "";
        }

        subject.room.addItem(this.object);
        

        return `${subject.processedName()} drops a(n) ${this.object.name}.`;
    }



}