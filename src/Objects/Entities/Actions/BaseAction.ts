import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";

export class Action{ //lawsuit

    
    recognizedCommands:string[] = []; //nothing, so its default

    smellPhrase = (room:Room)=>{
       const phrases = [ `Why does it smell like ${room.getSmell()} all of a sudden?`];
       if(room.rand.nextDouble()>.75){
           return "";
       }
       return room.rand.pickFrom(phrases);
    }
    applyAction = (subject: Quotidian,current_room: Room,object?: Quotidian, )=>{
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        return `${subject.name} stands around doing sweet FA. ${this.smellPhrase(current_room)}`;
    }



}