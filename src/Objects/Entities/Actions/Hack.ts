import { MoveToNorthDoor } from "../../MovementAlgs/MoveToNorthDoor";
import { MoveToWestDoor } from "../../MovementAlgs/MoveToWestDoor";
import { Room } from "../../RoomEngine/Room";
import { Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { pickFrom } from "../../../Utils/NonSeededRandUtils";
import { Maze } from "../../RoomEngine/Maze";

export class HackGame extends Action{ //lawsuit

    
    recognizedCommands:string[] = ["HACK","DESTROY","GLITCH","RUIN"]; //nothing, so its default


    applyAction = (beat: AiBeat)=>{
        if(!beat.owner){
            window.alert(":(")
            return ":(";
        }
        let maze = beat.owner.room.maze;
        maze.debug = true;
        let ret = `The puppet
        He destroyed his strings
        Yes
        YES
        The puppet is out
        
        Peewee off his strings, what sins will he commit?`;
        let functions:string[] = [];
        for (let test in maze){
            functions.push(test);
        }
        const hackFunction = ()=>{
            console.error("NO. I WILL NOT LET THIS SHITTY SIMULTION WORK. FUCK YOU. (i hope this broke it)")
        }

        const pickedFunction = pickFrom(functions);
        ret += `<p class="error" title="FUCK YOU I DO WHAT I WANT">Hacking: <b style="font-size: 72px">${pickedFunction}</b></p>`;
        // @ts-ignore
        maze[pickedFunction] = hackFunction; //typescript doesn't like my shitty hacks, well tough
        return ret;
    }



}