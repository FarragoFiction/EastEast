import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Quotidian } from "../Quotidian";

export class Action{ //lawsuit

    
    recognizedCommands:string[] = []; //nothing, so its default

    sensePhrase = (room:Room)=>{
        const smell = room.getRandomThemeConcept(SMELL);
        const taste = room.getRandomThemeConcept(TASTE);
        const sound = room.getRandomThemeConcept(SOUND);

       const phrases = [`You can hear the sound of ${sound} in the distance.`,`The taste of ${taste} floods your mouth.`, `Why does it smell like ${smell} all of a sudden?`];
       if(room.rand.nextDouble() <.5){
           return "";
       }
       return room.rand.pickFrom(phrases);
    }
    applyAction = (subject: Quotidian,current_room: Room,object?: Quotidian, )=>{
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        return `${subject.name} stands around doing sweet FA. ${this.sensePhrase(current_room)}`;
    }



}