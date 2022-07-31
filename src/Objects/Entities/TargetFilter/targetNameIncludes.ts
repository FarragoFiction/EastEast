import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter } from "./baseFilter";

export  class TargetNameIncludes extends TargetFilter{
    name:string;
        //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(name:string, singleTarget = false,invert = false, kMode = false){
        super(singleTarget, invert,kMode);
        this.name = name;
    }

   toString = ()=>{
       //format this like it might start with either because or and
       return `they see something named ${this.name}`;
   }

   applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject)=>{
    let targetLocked = false;
        if(target.name.includes(this.name)){
            targetLocked= true;
        }

        if(targetLocked && !this.invert){
            return target;
        }else{
            return null;
        }
   }

   
}