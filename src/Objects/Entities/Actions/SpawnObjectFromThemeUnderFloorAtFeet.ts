
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { PhysicalObject } from "../../PhysicalObject";
import { Theme } from "../../Theme";
import { FLOORBACKGROUND } from "../../ThemeStorage";
import { TARGETSTRING } from "../TargetFilter/baseFilter";

export class SpawnObjectFromThemeUnderFloorAtFeet extends Action { //lawsuit

    recognizedCommands: string[] = []
    theme: Theme;

    constructor(theme: Theme) {
        super();
        this.theme = theme;
    }


    applyAction = (beat: AiBeat) => {
        const subject = beat.owner;
        if (!subject) {
            return "";
        }
        const raw_item = this.theme.pickPossibilityFor(subject.rand, FLOORBACKGROUND)


        // const image: any = await addImageProcess(`images/Walkabout/Objects/UnderFloorObjects/${item.src}`) as HTMLImageElement;
        const image = document.createElement("img");

        image.src = `images/Walkabout/Objects/UnderFloorObjects/${raw_item.src}`;
        const item = new PhysicalObject(subject.room, `${TARGETSTRING}'s blood`, 0, 0, image.width, image.height, [this.theme], 0, `images/Walkabout/Objects/UnderFloorObjects/${raw_item.src}`, `Something very upsetting happened here to ${TARGETSTRING}.`);
        image.onload = () => {
            item.width = image.width;
            item.height = image.height;
        }

        item.name = beat.processTags(item.name);
        item.flavorText = beat.processTags(item.flavorText);
        item.x = beat.targets[0].x;
        item.y = beat.targets[0].y;
        item.updateRendering();
        subject.room.addItem(item);


        return `${subject.processedName()} drops a(n) ${item.name}.`;
    }



}