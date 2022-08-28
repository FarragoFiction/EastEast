import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType, TARGETSTRING } from "./baseFilter";

export class RandomTarget extends TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    odds: number; //between 0 and 1, bigger is better

    constructor(odds: number,options:TargetingOptionType = {singleTarget:false, invert:false, kMode:false}) {
        super(options);
        this.odds = odds;
    }

    toString = () => {
        //format this like it might start with either because or and

        return `they randomly pick  ${TARGETSTRING}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        if(target.rand.nextDouble() < this.odds){
            targetLocked = true;
        }
        
        if (targetLocked && !this.invert) {
            return target;
        } else {
            return null;
        }
    }


}