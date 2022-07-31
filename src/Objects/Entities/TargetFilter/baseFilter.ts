import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    invert = false;
    kMode = false; //target self
    constructor(invert = false, kMode = false) {
        this.invert = invert;
    }

    toString = () => {
        //format this like it might start with either because or and
        return "they could";
    }

    applyFilterToSingleTarget = (target: PhysicalObject) => {
        if(this.invert){
            return null;
        }
        return target;
    }

    filter = (owner: AiBeat, objects: PhysicalObject[]) => {
        if (!owner.owner) {
            console.error("INVALID TO CALL A BEAT WITHOUT AN OWNER");
            return [];
        }

        if (this.kMode) {
            const survivor = this.applyFilterToSingleTarget(owner.owner);
            if (survivor) {
                return [survivor];
            }
        } else {
            let targets: PhysicalObject[] = [];
            for (let target of objects) {
                const survivor = this.applyFilterToSingleTarget(target);
                if (survivor) {
                    targets.push(survivor);
                }
            }
            return targets;
        }
        return [];
    }

}

