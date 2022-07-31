import { PhysicalObject } from "../../PhysicalObject";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { AiBeat } from "../StoryBeats/BaseBeat";

export  class TargetFilter{
    invert = false;
    //IMPORTANT. DO NOT TRY TO STORE ANY INFORMAITON INSIDE THIS, OR WHEN A STORY BEAT CLONES ITSELF THERE WILL BE PROBLEMS

    constructor(invert = false){
        this.invert = invert;
    }

   toString = ()=>{
       //format this like it might start with either because or and
       return "they could";
   }

   filter = (owner: AiBeat, objects: PhysicalObject[] )=>{
       return [...objects];
   }
   
}