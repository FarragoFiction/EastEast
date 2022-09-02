import { distanceWithinRadius } from "../../../Utils/misc";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType, TARGETSTRING } from "./baseFilter";

export  class TargetIsWithinRadiusOfSelf extends TargetFilter{
    radius:number;
        //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(radius:number, options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}){
        super(options);
        this.radius = radius;
    }

   toString = ()=>{
       //format this like it might start with either because or and
       return `they are within ${this.radius} units of ${TARGETSTRING}`;
   }

   applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject)=>{
       let targetLocked = false;
       if(!owner.owner){
           console.error("INVALID TO CALL A BEAT WITHOUT AN OWNER");
           return null;
       }
        if(distanceWithinRadius(this.radius,owner.owner.x, owner.owner.y, target.x, target.y)){
            targetLocked= true;
        }

        if (targetLocked) {
            return this.invert? null:  target;
        } else {
            return this.invert? target:  null;
        }
   }

   
}