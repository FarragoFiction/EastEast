import { PhysicalObject } from "../../PhysicalObject";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class Action{ //lawsuit

    //IMPORTANT. DO NOT TRY TO STORE ANY INFORMAITON INSIDE THIS, OR WHEN A STORY BEAT CLONES ITSELF THERE WILL BE PROBLEMS
    recognizedCommands:string[] = []; //nothing, so its default

    sensePhrase = (room?:Room)=>{
        if(!room){
            return "";
        }
        const smell = room.getRandomThemeConcept(SMELL);
        const taste = room.getRandomThemeConcept(TASTE);
        const sound = room.getRandomThemeConcept(SOUND);

       const phrases = [`You can hear the sound of ${sound} in the distance.`,`The taste of ${taste} floods your mouth.`, `Why does it smell like ${smell} all of a sudden?`];
       if(room.rand.nextDouble() <.5){
           return "";
       }
       return room.rand.pickFrom(phrases);
    }
    applyAction = (beat: AiBeat)=>{
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        return `${beat.owner?.processedName()} stands around doing sweet FA. ${this.sensePhrase(beat.owner?.room)}`;
    }



}