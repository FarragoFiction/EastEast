import { Quotidian } from "../../Entities/Blorbos/Quotidian";
import { AiBeat } from "../../Entities/StoryBeats/BaseBeat";
import { FriendlyAiBeat } from "../../Entities/StoryBeats/FriendlyAiBeat";
import { TargetNearObjectWithName } from "../../Entities/TargetFilter/TargetIsNearObjectWithName";
import { TargetNameIncludesAnyOfTheseWords } from "../../Entities/TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { PhysicalObject } from "../../PhysicalObject";

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
    quests: FriendlyAiBeat[] = [];
    start = `<div style='font-size: 72px;'>☺</div><span style="font-family: Courier New">`;
    end = "</span>";

    constructor(physicalBody: Quotidian){
        this.physicalBody = physicalBody; //go ahead and borrow someone elese's it'll be fine (srsly tho in order to interact with the ai engine you need a physical body and FRIEND just does not have one , nor should it)
    }

    init = ()=>{
        const giveKillerAnEgg = new FriendlyAiBeat(
            `
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) Egg to the Eye Killer!</p>
            ${this.end}
            `,

            `
            ${this.start}
            <p style="color: #a10000;font-family: zai_i_love_covid_19">All lore below is true. FRIEND never willingly seek to obfuscate the truth. </p>
            ${this.end}`,
            [new TargetNameIncludesAnyOfTheseWords(["Killer"],true),new TargetNearObjectWithName(["Egg"],true)],
            []
        );
    }

    

    processAiBeat = () => {
        const toRemove: AiBeat[] = [];
        for (let beat of this.quests) {
            if (beat.triggered(this.physicalBody.room)) {
                beat.performActions(this.physicalBody.room);
                if (!beat.permanent) {
                    toRemove.push(beat);
                }
                break;
            }
        }
    }

    tick = () => {
        this.processAiBeat();
    }

}