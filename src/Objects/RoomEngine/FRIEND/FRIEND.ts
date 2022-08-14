import { removeItemOnce } from "../../../Utils/ArrayUtils";
import { pickFrom } from "../../../Utils/NonSeededRandUtils";
import { Quotidian } from "../../Entities/Blorbos/Quotidian";
import { AiBeat } from "../../Entities/StoryBeats/BaseBeat";
import { FriendlyAiBeat } from "../../Entities/StoryBeats/FriendlyAiBeat";
import { TargetNearObjectWithName } from "../../Entities/TargetFilter/TargetIsNearObjectWithName";
import { TargetNameIncludesAnyOfTheseWords } from "../../Entities/TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { PhysicalObject } from "../../PhysicalObject";
import { Maze } from "../Maze";
import { StoryBeat } from "../StoryBeat";

/*
FRIEND gives you one quest at a time.

if you don't currently have a quest, after a minute, FRIEND will give you one.

the quests FRIEND gives you are NOT procedural, they are designed to pursue very specific purposes. 

however, you do get them in a random order.

FRIEND's quests are a bit like normal ai. 

FRIEND has a target filter for the world, things like "target is named Eye Killer" and "target has EGG in inventory"

FRIEND also has an ACTION associated with this filter, things like "custom story beat" that has a command, a response, and a TRUTH

FRIEND is the false face of Truth, become just a bit more real. FRIEND is entirely separate from Truth, but Truth is still tagging along

if there are no more quests from FRIEND, it should mention that fact.

PROBLEM, both target filters and actions except a physical object subject. FRIEND is not a physical object.
*/
export class FRIEND{

    //well, no, technically not ITS body, but good enough for Watching this world and borrowing it's knowledge, wouldnt you say?
    physicalBody: Quotidian;
    maze: Maze;
    currentQuest?: FriendlyAiBeat;
    quests: FriendlyAiBeat[] = [];
    start = `<img style="display: block; margin-left: auto; margin-right: auto; width: 300px;"src='images/Walkabout/Sprites/FRIEND.png'></img><span style="font-family: Courier New">`;
    end = "</span>";
    timeOfLastQuest = new Date().getTime();


    constructor(maze: Maze,physicalBody: Quotidian){
        this.maze = maze;
        this.physicalBody = physicalBody; //go ahead and borrow someone elese's it'll be fine (srsly tho in order to interact with the ai engine you need a physical body and FRIEND just does not have one , nor should it)
        this.init();
    }

    init = ()=>{
        const giveBookToBird = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) BOOK to any Quotidian!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: zai_i_love_covid_19">All lore below is true. FRIEND never willingly seek to obfuscate the truth. </p>
            ${this.end}`,
            [new TargetNameIncludesAnyOfTheseWords(["Quotidian"],true),new TargetNearObjectWithName(["Book"],true)],
            []
        );
        this.quests = [giveBookToBird];
    }

    deployQuest = (quest: FriendlyAiBeat)=>{
        console.log("JR NOTE: deploying quest", quest)
        this.currentQuest = quest;
        this.maze.addStorybeat(new StoryBeat("FRIEND: Give Quest",this.currentQuest.startingText));
    }

    rewardQuest = ()=>{
        if(this.currentQuest){
         this.maze.addStorybeat(new StoryBeat("FRIEND: Reward Quest",this.currentQuest.endingText));
        }else{
            this.maze.addStorybeat(new StoryBeat("FRIEND: Deny Quest",`${this.start}<b>FRIEND</b> can not give that which does not exist. ${this.end}`))
        }

    }

    //one minute between quests, but for now 10 seconds
    itsBeenAwhileSinceLastQuest = ()=>{
        return new Date().getTime() - this.timeOfLastQuest > 10000;
    }

    

    processAiBeat = () => {
        if(this.currentQuest){
            console.log("JR NOTE: have current quest from friend");
            if (this.currentQuest.triggered(this.physicalBody.room)) {
                console.log("JR NOTE: did you actually do it?")
                this.currentQuest.performActions(this.physicalBody.room);
                removeItemOnce(this.quests, this.currentQuest);
                this.timeOfLastQuest = new Date().getTime();
                this.currentQuest = undefined;
                this.rewardQuest();
            }
        }else if(this.itsBeenAwhileSinceLastQuest() && this.quests.length > 0){
            //true random. FRIEND is a force of chaos.
            console.log("JR NOTE: choosing new quest from friend");
            this.deployQuest(pickFrom(this.quests));
            console.log("JR NOTE: selectd new quest", this.currentQuest)
        }else{
            console.log("JR NOTE: it is not yet time for a quest from friend");

        }
        
    }

    tick = () => {
        console.log("JR NOTE: ticking FRIEND")
        this.processAiBeat();
    }

}