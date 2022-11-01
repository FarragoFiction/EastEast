
import { Action } from "./BaseAction";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { PhysicalObject } from "../../PhysicalObject";
import { Theme } from "../../Theme";
import { FLOORBACKGROUND } from "../../ThemeStorage";
import { TARGETSTRING } from "../TargetFilter/baseFilter";

export class SpawnObjectFromThemeUnderFloorAtMyFeet extends Action { //lawsuit

    recognizedCommands: string[] = []
    theme: Theme;
    flavorText: string;
    name: string;

    constructor(theme: Theme, name: string, flavorText: string) {
        super();
        this.theme = theme;
        this.name = name;
        this.flavorText = flavorText;
    }


    applyAction = (beat: AiBeat) => {
        const subject = beat.owner;
        if (!subject) {
            return "";
        }


        // const image: any = await addImageProcess(`images/Walkabout/Objects/UnderFloorObjects/${item.src}`) as HTMLImageElement;
 
            const target = beat.owner;
            if(!target){
                return "";
            }
            const raw_item = this.theme.pickPossibilityFor(subject.rand, FLOORBACKGROUND)

            const image = document.createElement("img");

            image.src = `images/Walkabout/Objects/UnderFloorObjects/${raw_item.src}`;
            const item = new PhysicalObject(subject.room, this.name, 0, 0, image.width, image.height, [this.theme], 0, `images/Walkabout/Objects/UnderFloorObjects/${raw_item.src}`, this.flavorText);
            console.log("JR NOTE: trying to spawn ",item)

            image.onload = () => {
                console.log("JR NOTE: item loaded ",item)
                item.width = image.width;
                item.height = image.height;
                item.updateRendering();
                subject.room.addItem(item);
            }
            if(target.name && target.name.toUpperCase().includes("PEEWEE") && item.name.toUpperCase().includes("BLOOD")){
                item.container.style.filter = "hue-rotate(62deg) saturate(64%) brightness(224%)";
            }else{
            }
    
            item.name = beat.processTags(item.name);
            item.flavorText = beat.processTags(item.flavorText);
            item.x = target.x;
            item.y = target.y;


 


        return `${subject.processedName()} drops a(n) thing.`;
    }



}