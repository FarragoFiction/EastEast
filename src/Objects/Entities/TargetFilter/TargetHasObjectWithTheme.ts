import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Theme } from "../../Theme";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter } from "./baseFilter";

//used for things like "if target is near a plant";
export class TargetNearObjectWithTheme extends TargetFilter {
    themes: Theme[];
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(themes: Theme[], singleTarget = false, invert = false, kMode = false) {
        super(singleTarget, invert, kMode);
        this.themes = themes;
    }

    toString = () => {
        //format this like it might start with either because or and
        if (this.themes.length === 1) {
            return `they are holding something associated with ${this.themes[0].key}`;
        }
        return `they are holding an object associated with any of these themes ${turnArrayIntoHumanSentence(this.themes.map((i)=>i.key))}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        for (let theme of this.themes) {
            for (let item of target.inventory){
                if (item.themes.includes(theme)) {
                    targetLocked = true;
                }
            }
        }
        if (targetLocked && !this.invert) {
            return target;
        } else {
            return null;
        }
    }


}