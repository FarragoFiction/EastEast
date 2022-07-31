import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { AiBeat } from "../StoryBeats/BaseBeat";

export  class MeleeRangeOfPhysicalObject{
    invert = false;
    //IMPORTANT. DO NOT TRY TO STORE ANY INFORMAITON INSIDE THIS, OR WHEN A STORY BEAT CLONES ITSELF THERE WILL BE PROBLEMS

    constructor(invert = false){
        this.invert = invert;
    }

   toString = ()=>{
       //format this like it might start with either because or and
       return "they could";
   }

   triggered = (owner: AiBeat, current_room: Room )=>{
    return true; //JR NOTE: children will overwrite this
   }
   
}