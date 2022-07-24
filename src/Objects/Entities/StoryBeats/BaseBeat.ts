import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { createElementWithIdAndParent } from "../../../Utils/misc";
import { PhysicalObject } from "../../PhysicalObject";
import { Maze } from "../../RoomEngine/Maze";
import { Room } from "../../RoomEngine/Room";
import { StoryBeat } from "../../RoomEngine/StoryBeat";
import { Action } from "../Actions/BaseAction";
import { Quotidian } from "../Quotidian";
import { Trigger } from "../Triggers/BaseTrigger";

export  class AiBeat{
    permanent: boolean; //is this a one and done or should it be forever. 
    triggers: Trigger[];
    actions: Action[];
    targets: PhysicalObject[] = [];

    //IMPORTANT. ALL IMPORTANT INFORMATION FOR RESOLVING A TRIGGER/ACTION SHOULD BE STORED HERE, SO IT CAN BE CLONED.


    constructor(triggers: Trigger[], actions: Action[], permanent=false){
        this.triggers = triggers;
        this.actions = actions;
        this.permanent  = permanent;

    }

    clone = ()=>{
        //doesn't clone targets, those are set per beat when resolved..
        return new AiBeat(this.triggers, this.actions, this.permanent);
    }

    addStorybeatToScreen = (maze:Maze)=>{
        const beat = new StoryBeat("<hr>","")
        maze.addStorybeat(beat);
        return beat;
    }

   performActions = (owner: Quotidian, current_room: Room)=>{
    let ret = "";
    let causes = [];
    let effects = [];
    for (let t of this.triggers){
        causes.push(t.toString());
    }

    for(let a of this.actions){
        effects.push(a.applyAction(owner,current_room, this.targets));
    }
    const beat = this.addStorybeatToScreen(current_room.maze);
    beat.response =  `Because ${turnArrayIntoHumanSentence(causes)} ${(effects.join("<br>"))}`;
   }



   //ALL triggers must be true for this to be true.
   triggered = (owner: Quotidian )=>{
       console.log("JR NOTE: in some way triggers need to find targets for actions to apply to")
       for(let t of this.triggers){
            if(!t.triggered(owner)){
                return false;
            }
       }
       return true;
   }
   
}