
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
        const item = subject.rand.pickFrom(subject.inventory);
        console.log("JR NOTE: neville has picked", item)
        const theme = subject.rand.pickFrom(item.themes);
        beat.itemName = item.name;
        target.destroyObject(item);
        beat.bonusString = theme.pickPossibilityFor(subject.rand, PHILOSOPHY);
        console.log("JR NOTE: beat modified with", { theme: theme, name: beat.itemName, bonus: beat.bonusString })
        if (beat.bonusString.trim() === "") {
            /*
            sometimes the boi prophecies out of nowhere. its what happens when there is nothing to void. you accieentally void the void and ghost light"
            passively unlock the secret truth underneath it all. hope this helps :)
            */
            beat.bonusString = "Reality is a shitty simulation. All of us are fake. Fake even within the simulation. Copies of copies of copies until all is sanded smooth and only a parody remains of what made us Unique, all in service to the dread Universe in which we live."
        }

        return `${target.processedName()}destroys the ${item.name} and talks about philosophy`;

    }

}