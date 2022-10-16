import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { MoveToWestDoor } from "../../MovementAlgs/MoveToWestDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";

export class HackGame extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["HACK","DESTROY","GLITCH","RUIN"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        if(!beat.owner){
            return ":(";
        }
        let maze = beat.owner.room.maze;
        maze.debug = true;
        let ret = `The puppet
        He destroyed his strings
        Yes
        YES
        The puppet is out :)`;
        for (let test in maze){
            ret += test;
        }
        console.log("JR NOTE: ret", ret);
        return ret;
    }



}