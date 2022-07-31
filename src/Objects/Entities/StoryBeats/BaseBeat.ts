import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Maze } from "../../RoomEngine/Maze";
import { Room } from "../../RoomEngine/Room";
import { StoryBeat } from "../../RoomEngine/StoryBeat";
import { Action } from "../Actions/BaseAction";
import { Quotidian } from "../Quotidian";
import { TargetFilter } from "../TargetFilter/baseFilter";

export class AiBeat {
    permanent: boolean; //is this a one and done or should it be forever. 
    filters: TargetFilter[];
    actions: Action[];
    targets: PhysicalObject[] = [];
    owner: Quotidian  | undefined;

    //IMPORTANT. ALL IMPORTANT INFORMATION FOR RESOLVING A TRIGGER/ACTION SHOULD BE STORED HERE, SO IT CAN BE CLONED.


    constructor(triggers: TargetFilter[], actions: Action[], permanent = false) {
        this.filters = triggers;
        this.actions = actions;
        this.permanent = permanent;

    }

    clone = (owner: Quotidian) => {
        //doesn't clone targets, those are set per beat when resolved..
        const beat =  new AiBeat(this.filters, this.actions, this.permanent);
        beat.owner = owner;
        console.log("JR NOTE: cloning ",this);
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
        let causes = [];
        let effects = [];
        for (let t of this.filters) {
            causes.push(t.toString());
        }

        for (let a of this.actions) {
            effects.push(a.applyAction(this.owner, current_room, this.targets));
        }
        console.log("JR NOTE: about to finish applying effects", this.actions)
        const beat = this.addStorybeatToScreen(current_room.maze, `Because ${turnArrayIntoHumanSentence(causes)}... ${(effects.join("<br>"))}`);
    }



    //ALL triggers must be true for this to be true.
    triggered = (current_room: Room) => {
        if(!this. owner){
            return console.error("ALWAYS clone beats, don't use them from list directly");
        }
        //start out targeting EVERYTHING in this room
        this.targets = [...current_room.blorbos, ... current_room.items];
        for (let t of this.filters) {
            this.targets = t.filter(this, this.targets)
            if (this.targets.length === 0) {
                return false;
            }
        }
        console.log("JR NOTE: triggering, my targets are: ", this.targets);
        return true;
    }

}