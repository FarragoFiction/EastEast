
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian } from "../Blorbos/Quotidian";


export class DropAllObjects extends Action { //lawsuit


    recognizedCommands: string[] = ["STARTLE", "SURPRISE", "SHOUT"]

    applyAction = (beat: AiBeat) => {
        const subject = beat.owner;
        if (!subject) {
            return "";
        }

        const target = beat.targets;
        if (target.length < 1) {
            return `${subject.processedName()} can't see anything to startle like that...`;
        }
        let items = [];
        if (target[0].inventory.length > 0) {
            for (let item of target[0].inventory) {
                target[0].dropObject(item);
            }

            if (target instanceof Quotidian) {
                target.emitSass("!")
            }
            return `${subject.processedName()} startles the  ${target[0].processedName()} and they drop some of their items.`;

        } else {
            if (target instanceof Quotidian) {
                target.emitSass("!")
            }
            return `${subject.processedName()} startles the  ${target[0].processedName()} for no particular reason.`;

        }
    }



}