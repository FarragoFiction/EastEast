import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter } from "./baseFilter";

//used for things like "if target is killer && target is near egg";
export class TargetNearObjectWithName extends TargetFilter {
    words: string[];
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(words: string[], singleTarget = false, invert = false, kMode = false) {
        super(singleTarget, invert, kMode);
        this.words = words;
    }

    toString = () => {
        //format this like it might start with either because or and
        if (this.words.length === 1) {
            return `they see something near something named ${this.words[0]}`;
        }
        return `they see something near an object named any of these words ${turnArrayIntoHumanSentence(this.words)}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        for (let word of this.words) {
            for(let item of target.room.items)
            if (item.processedName().toUpperCase().includes(word.toUpperCase())) {
                targetLocked = true;
            }
        }
        if (targetLocked && !this.invert) {
            return target;
        } else {
            return null;
        }
    }


}