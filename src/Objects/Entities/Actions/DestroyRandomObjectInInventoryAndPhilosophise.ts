
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { PHILOSOPHY } from "../../ThemeStorage";


export class DestroyRandomObjectInInventoryAndPhilosophize extends Action { //lawsuit

    

    recognizedCommands: string[] = []

    applyAction = (beat: AiBeat) => {
        const subject = beat.owner;
        if (!subject) {
            return "";
        }

        const targets = beat.targets;
        const target = targets[0];
        if (target.inventory.length > 0) {
            const item = subject.rand.pickFrom(subject.inventory);
            const theme = subject.rand.pickFrom(item.themes);
            beat.itemName = item.name;
            target.destroyObject(item);
            beat.bonusString = theme.pickPossibilityFor(subject.rand, PHILOSOPHY);
            beat.itemName = item.name();

            return `${target.processedName()}destroys the ${item.name} and talks about philosophy`;


           

        } else {
            return `${target.processedName()} has nothing  to lose.`;//bad ass

        }
    }



}