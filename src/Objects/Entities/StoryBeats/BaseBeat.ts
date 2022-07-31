import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Maze } from "../../RoomEngine/Maze";
import { Room } from "../../RoomEngine/Room";
import { StoryBeat } from "../../RoomEngine/StoryBeat";
import { Action } from "../Actions/BaseAction";
import { Quotidian } from "../Quotidian";
import { Trigger } from "../Triggers/BaseTrigger";

export class AiBeat {
    permanent: boolean; //is this a one and done or should it be forever. 
    triggers: Trigger[];
    actions: Action[];
    targets: PhysicalObject[] = [];
    owner: Quotidian  | undefined;

    //IMPORTANT. ALL IMPORTANT INFORMATION FOR RESOLVING A TRIGGER/ACTION SHOULD BE STORED HERE, SO IT CAN BE CLONED.


    constructor(triggers: Trigger[], actions: Action[], permanent = false) {
        this.triggers = triggers;
        this.actions = actions;
        this.permanent = permanent;

    }

    clone = (owner: Quotidian) => {
        //doesn't clone targets, those are set per beat when resolved..
        const beat =  new AiBeat(this.triggers, this.actions, this.permanent);
        beat.owner = owner;
        return beat;
    }

    addStorybeatToScreen = (maze: Maze, response: string) => {
        const beat = new StoryBeat("AI: Tick", response)
        maze.addStorybeat(beat);
        return beat;
    }

    performActions = (current_room: Room) => {
        if(!this. owner){
            return console.error("ALWAYS clone beats, don't use them from list directly");
        }
        let ret = "";
        let causes = [];
        let effects = [];
        for (let t of this.triggers) {
            causes.push(t.toString());
        }

        for (let a of this.actions) {
            effects.push(a.applyAction(this.owner, current_room, this.targets));
        }
        const beat = this.addStorybeatToScreen(current_room.maze, `Because ${turnArrayIntoHumanSentence(causes)}... ${(effects.join("<br>"))}`);
    }



    //ALL triggers must be true for this to be true.
    triggered = (current_room: Room) => {
        if(!this. owner){
            return console.error("ALWAYS clone beats, don't use them from list directly");
        }
        for (let t of this.triggers) {
            if (!t.triggered(this,current_room)) {
                return false;
            }
        }
        return true;
    }

}