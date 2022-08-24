
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
        this.object.name = beat.processTags(this.object.name);
        this.object.flavorText = beat.processTags(this.object.flavorText);
        this.object.x = beat.targets[0].x;
        this.object.y = beat.targets[0].y;
        this.object.updateRendering();

        subject.room.addItem(this.object);
        

        return `${subject.processedName()} drops a(n) ${this.object.name}.`;
    }



}