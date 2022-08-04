import { removeItemOnce, turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Maze } from "../../RoomEngine/Maze";
import { Room } from "../../RoomEngine/Room";
import { StoryBeat } from "../../RoomEngine/StoryBeat";
import { Action } from "../Actions/BaseAction";
import { Quotidian } from "../Quotidian";
import { TargetFilter, TARGETSTRING } from "../TargetFilter/baseFilter";

export class AiBeat {
    permanent: boolean; //is this a one and done or should it be forever. 
    filters: TargetFilter[];
    actions: Action[];
    targets: PhysicalObject[] = [];
    owner: Quotidian  | undefined;
    timeOfLastBeat = new Date().getTime();


    //IMPORTANT. ALL IMPORTANT INFORMATION FOR RESOLVING A TRIGGER/ACTION SHOULD BE STORED HERE, SO IT CAN BE CLONED.


    constructor(triggers: TargetFilter[], actions: Action[], permanent = false) {
        this.filters = triggers;
        this.actions = actions;
        this.permanent = permanent;

    }

    itsBeenAwhileSinceLastBeat = ()=>{
        return new Date().getTime() - this.timeOfLastBeat > 10000;
    }

    clone = (owner: Quotidian) => {
        //doesn't clone targets, those are set per beat when resolved..
        const beat =  new AiBeat(this.filters, this.actions, this.permanent);
        beat.owner = owner;
        return beat;
    }

    addStorybeatToScreen = (maze: Maze, response: string) => {
        const beat = new StoryBeat("AI: Tick", response)
        maze.addStorybeat(beat);
        return beat;
    }

    processTags = (text: string)=>{
        return text.replaceAll(TARGETSTRING, turnArrayIntoHumanSentence(this.targets.map((t)=>t.name)));
    }

    performActions = (current_room: Room) => {
        if(!this. owner){
            return console.error("ALWAYS clone beats, don't use them from list directly");
        }
        this.timeOfLastBeat = new Date().getTime();

        let causes = [];
        let effects = [];
        for (let t of this.filters) {
            causes.push(this.processTags(t.toString()));
        }

        for (let a of this.actions) {
            effects.push(a.applyAction(this));
        }
        const beat = this.addStorybeatToScreen(current_room.maze, `Because ${turnArrayIntoHumanSentence(causes)}... ${(effects.join("<br>"))}`);
    }



    //ALL triggers must be true for this to be true.
    triggered = (current_room: Room) => {
        if(!this. owner){
            return console.error("ALWAYS clone beats, don't use them from list directly");
        }
        if(!this.itsBeenAwhileSinceLastBeat()){
            return false;
        }
        //start out targeting EVERYTHING in this room
        this.targets = [...current_room.blorbos, ... current_room.items];
        removeItemOnce(this.targets, this.owner); //unless you're specifically
        for (let t of this.filters) {
            this.targets = t.filter(this, this.targets)
            if (this.targets.length === 0) {
                return false;
            }
        }
        return true;
    }

}