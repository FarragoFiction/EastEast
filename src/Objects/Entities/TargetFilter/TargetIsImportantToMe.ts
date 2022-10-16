import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Quotidian } from "../Blorbos/Quotidian";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetFilter, TargetingOptionType, TARGETSTRING } from "./baseFilter";

export class TargetIsImportantToMe extends TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    amount: number;
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY


    constructor(amount: number, options: TargetingOptionType = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.amount = amount;
    }
    toString = () => {

        return `they like ${TARGETSTRING}  ${this.invert ? "not" : ""} more than  ${this.amount}`;
    }

    applyFilterToSingleTarget = (owner: AiBeat, target: PhysicalObject) => {
        let targetLocked = false;
        
        if (owner.owner && (target instanceof Quotidian)) {
            const relationship = owner.owner.getRelationshipWith(target);
            if(relationship && relationship.important){
                targetLocked = true;
            }
        }
        if (this.invert) {
        }
        if (targetLocked) {
            return this.invert ? null : target;
        } else {
            return this.invert ? target : null;
        }
    }


}