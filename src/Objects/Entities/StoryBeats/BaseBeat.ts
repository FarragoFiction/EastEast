import { removeItemOnce, turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { PhysicalObject } from "../../PhysicalObject";
import { Maze } from "../../RoomEngine/Maze";
import { Room } from "../../RoomEngine/Room";
import { StoryBeat } from "../../RoomEngine/StoryBeat";
import { Action } from "../Actions/BaseAction";
import { Quotidian } from "../Blorbos/Quotidian";
import { TargetFilter, TARGETSTRING } from "../TargetFilter/baseFilter";

export const ITEMSTRING = "ITEMSTRING";
export const BONUSSTRING = "BONUSSTRING";

const DEBUG = false;

export class AiBeat {
    permanent: boolean; //is this a one and done or should it be forever. 
    filters: TargetFilter[];
    actions: Action[];
    command: string;
    //used for things like neville philosophizing
    bonusString = "";
    //yes we can manually create some text from cause and effect but it comes off robotic. good for debugging, not for the final product
    flavorText:string[];
    itemName= "ERROR: NO ITEM FOUND";
    timeBetweenBeats:number;
    targets: PhysicalObject[] = [];
    owner: Quotidian  | undefined;
    timeOfLastBeat = new Date().getTime();


    //IMPORTANT. ALL IMPORTANT INFORMATION FOR RESOLVING A TRIGGER/ACTION SHOULD BE STORED HERE, SO IT CAN BE CLONED.


    //some beats longer than others
    constructor(command: string,flavorText: string[], triggers: TargetFilter[], actions: Action[], permanent = false, timeBetweenBeats=10000) {
        this.filters = triggers;
        this.command = command;
        this.actions = actions;
        this.flavorText = flavorText;
        this.permanent = permanent;
        this.timeBetweenBeats = timeBetweenBeats;
    }

    itsBeenAwhileSinceLastBeat = ()=>{
        return new Date().getTime() - this.timeOfLastBeat > this.timeBetweenBeats;
    }

    clone = (owner: Quotidian) => {
        //doesn't clone targets, those are set per beat when resolved..
        const beat =  new AiBeat(this.command,this.flavorText,this.filters, this.actions, this.permanent);
        beat.owner = owner;
        return beat;
    }

    addStorybeatToScreen = (maze: Maze, command: string,response: string) => {
        const beat = new StoryBeat(command, response)
        maze.addStorybeat(beat);
        return beat;
    }

    processTags = (text: string)=>{
        let ret = text.replaceAll(TARGETSTRING, turnArrayIntoHumanSentence(this.targets.map((t)=>t.name)));
        ret = ret.replaceAll(ITEMSTRING, this.itemName);
        ret = ret.replaceAll(BONUSSTRING, this.bonusString);

        return ret;
    }

    performActions = (current_room: Room) => {
        if(!this. owner){
            return console.error("ALWAYS clone beats, don't use them from list directly", this);
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
        if(DEBUG){
            this.addStorybeatToScreen(current_room.maze, "AI: DEBUG",`DEBUG: Because ${turnArrayIntoHumanSentence(causes)}... ${(effects.join("<br>"))}`);
        }
        this.addStorybeatToScreen(current_room.maze, this.command,this.processTags(this.owner.rand.pickFrom(this.flavorText)));

    }

    performFriendlyActions = (current_room: Room) => {
        if(!this. owner){
            return console.error("ALWAYS clone beats, don't use them from list directly", this);
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
        //actually FRIEND will handle taking care of story beats on its own.
    }




    //ALL triggers must be true for this to be true.
    triggered = (current_room: Room, allow_self = false) => {
        this.itemName= "ERROR: NO ITEM FOUND"; //reset
        if(!this. owner){
            return console.error("ALWAYS clone beats, don't use them from list directly", this);
        }
        if(!this.itsBeenAwhileSinceLastBeat()){
            return false;
        }
        //start out targeting EVERYTHING in this room
        this.targets = [...current_room.blorbos, ... current_room.items];
        if(!allow_self){//only for peewee commands
            removeItemOnce(this.targets, this.owner); //unless you're specifically
        }
        for (let t of this.filters) {
            this.targets = t.filter(this, this.targets)
            if (this.targets.length === 0) {
                return false;
            }
        }
        return true;
    }

}