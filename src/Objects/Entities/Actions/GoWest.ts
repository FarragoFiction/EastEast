import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { MoveToWestDoor } from "../../MovementAlgs/MoveToWestDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";

export class GoWest extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["WEST","LEFT"]; //nothing, so its default


    applyAction = (subject: Quotidian,current_room: Room,object?: Quotidian, )=>{
        //JR NOTE: todo flesh this out. should be able to access the whole maze really.
        subject.movement_alg = new MoveToWestDoor(subject);
        subject.emitSass(":(")
        return `${subject.name} flips you off. "ASSHOLE! THERE IS NO DOOR TO THE WEST (please, stop making, me try to do, the impossible...)"`;
    }



}