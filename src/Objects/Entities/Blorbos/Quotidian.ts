//base level Entity object. quotidians can turn into anything

import { removeItemOnce } from "../../../Utils/ArrayUtils"
import { createElementWithIdAndParent, distanceWithinRadius } from "../../../Utils/misc"
import { pickFrom } from "../../../Utils/NonSeededRandUtils"
import { Movement } from "../../MovementAlgs/BaseMovement"
import { NoMovement } from "../../MovementAlgs/NoMovement"
import { RandomMovement } from "../../MovementAlgs/RandomMovement"
import { PhysicalObject } from "../../PhysicalObject"
import { FRIEND } from "../../RoomEngine/FRIEND/FRIEND"
import { Room } from "../../RoomEngine/Room"
import { Theme } from "../../Theme"
import { COMPLIMENT, INSULT, OBJECT } from "../../ThemeStorage"
import { DeploySass } from "../Actions/DeploySass"
import { PickupObject } from "../Actions/PickupObject"
import { AiBeat } from "../StoryBeats/BaseBeat"
import { TARGETSTRING } from "../TargetFilter/baseFilter"
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf"
import { Peewee } from "./Peewee"
import { Relationship } from "./Relationship"


//https://stuff.mit.edu/people/dpolicar/writing/prose/text/titleOfTheStory.html  fun story the Theorist showed everyone
//https://tvtropes.org/pmwiki/pmwiki.php/Literature/ThisIsTheTitleOfThisStory
//apparently the story is from  a 1982 story by David Moser and that strange loop guy quoted it, because ofc he did


/*
JR: Waste of Spiralling Blood  (I connect us all through lies and misdirection) (new aspect after the Taxonomist and Theorist unjustly called me Light)
Peewee Puppet of Twisted Fate
Closer: Lonesome Witch of Threaded Motivation
Solemn: Watching Sylph of Lonely Faith
Doc Slaughter: Doctor of Hopeful Eyes
Twins:  Bards of Hunting Day and Night
End: Lone Knight of Fated Death
Match: Burning Witch of Threaded Rage
Eye Killer: Killer of Stalking Time
Reflection: Scholar of Strange Minds
Captain: Watcher of Strange Hearts
K: Thief of Evershifting Light  (gaslight)
_: Witch of Unseen Corruption
Shot: Murderous Thief of Buried Space
Wanda: Lord of Known Space
Flower Chick: Waste of Extinguished Blood
Alt: Stranger of Fleshy Dreams
Neighbor: Friend of Strange Doom
Tyrfing: Warrior of Destroyed Hope
NAM: Child of Fated Identities*/



export enum Direction {
    UP = 1,
    DOWN,
    LEFT,
    RIGHT,
}

export interface Source {
    src: string,
    width: number,
    height: number,
}

export interface DirectionalSprite {
    default_src: Source
    left_src?: Source
    right_src?: Source
    up_src?: Source
    down_src?: Source
}

const baseImageLocation = "images/Walkabout/Sprites/";
export const FEMALE = "F";
export const MALE = "M";
export const NB = "NB";

//what, did you think the REAL eye killer would be so formulaic? 
export class Quotidian extends PhysicalObject {
    lore = "Technically everything alive in this place is a Quotidian, wearing a Mask to Play A Role to entertain you with this farce. Did you forget this was East, Observer? Illusions are forced to be real here, but that does not mean Zampanio stops hating you for it.  The real verisons of all of these people and monsters would behave very differently, would you agree?";
    maxSpeed = 20;
    gender = NB;
    minSpeed = 1;
    currentSpeed = 10;
    stabilityLevel = 113; //if it hits 0 they breach.
    friend?: FRIEND;
    killerName? : string;
    timeOfLastBeat = new Date().getTime();
    //default everything to 1.0, everyone is perfectly bi and alloromantic
    platonicFOdds = 1.0;
    platonicMOdds = 1.0;
    platonicNBOdds = 1.0;
    romanticFOdds = 1.0;
    romanticMOdds = 1.0;
    romanticNBOdds = 1.0;
   likeMultiplier  = 1.0; //(effects how quickly they grow to like people in general)
    dislikeMultiplier = 1.0; //(effects how quickly they grow to dislike ppl in general)
    relationshipMap = new Map<string, Relationship>(); //(keyed by array of all known names, csv)
    // relationshipMap = new Map<string, Relationship>([["???", new Relationship("???",100,"I really admire her dedication.","...","She's the smartest person I've ever met and just lights up  a room.","She's so cute when she's really excited about something she's talking about.","I can't imagine a life without her in some capacity.",true,true,false)]  ]);
   


    beats: AiBeat[] = [];
    // 0 min, 5 max
    fortitude = 0; //how brave are you, how physically fit
    temperance = 0; // how much can you avoid obsessing over things (especially people), how good are you at charisma type stuff without getting attached
    prudence = 5; //how much do you think things through, attention to detail
    justice = 0; //how much do you trust your own judgement, how quick are you to judge
    originalFlavor = "";
    dead = false;

    sass?: HTMLElement;
    sassBegun?: Date;
    directionalSprite: DirectionalSprite;

    direction = Direction.DOWN; //movement algorithm can change or use this.
    possible_random_move_algs = [new RandomMovement(this)]
    movement_alg:Movement = pickFrom(this.possible_random_move_algs)
    //TODO have a movement algorithm (effects can shift this)
    /*
    example movement algorithm
    * random
    * searching pattern
    * to north
    * to south
    * to east
    * to ENTITY
    * to OBJECT
    */
    //TODO have a list of Scenes (trigger, effect, like quest engine from NorthNorth)

    constructor(room: Room, name: string, x: number, y: number, themes: Theme[], sprite: DirectionalSprite, flavorText: string, beats: AiBeat[], states?: PhysicalObject[]) {
        super(room, name, x, y, sprite.default_src.width, sprite.default_src.height, themes, 11, `${baseImageLocation}${sprite.default_src.src}`, flavorText, states);

        this.directionalSprite = sprite;
        this.originalFlavor = this.flavorText;
        if(beats.length === 0 && name == "Quotidian"){
            beats.push(new AiBeat(
                "Quotidian: Be Bird Brained",
                [`The Quotidian is sqwawking at the ${TARGETSTRING}.`],
                [new TargetIsWithinRadiusOfSelf(5)],
                [new DeploySass("Gross!"),new  PickupObject()],
                true
            ))
        }
        this.makeBeatsMyOwn(beats);
    }
    

    processedName = () => {
        return `${this.breaching?"Breaching ":""}${this.name}${this.dead ? "'s Grave" : ''}`;
    }

    vibe = (blorbos: Quotidian[])=>{
        for(let blorbo of blorbos){
            //don't gotta be within mele range but SHOULD matter that you're not as far apart as you can get
            if(blorbo != this && distanceWithinRadius(50,this.x, this.y, blorbo.x, blorbo.y)){
                this.intensifyFeelingsFor(blorbo, 1);
            }
        }
    }

    generatePositiveOpinion = (blorbo: Quotidian)=>{
        return `I really like their ${blorbo.getRandomThemeConcept(COMPLIMENT)} nature.`
    }

    generateNegativeOpinion = (blorbo: Quotidian)=>{
        return `I really like their ${blorbo.getRandomThemeConcept(INSULT)} nature.`
    }

    generateImportantOpinion = (blorbo: Quotidian)=>{
        return `They are more important to me than any ${this.getRandomThemeConcept(OBJECT)}`;
    }

    generateRomanticOpinion = (blorbo: Quotidian)=>{
        return "I think about kissing them a lot."
    }

    generateOfficialOpinion = (blorbo: Quotidian)=>{
        return "I hope we can be together forever."
    }

    initializeRelationship = (key: string, blorbo: Quotidian, amount: number)=>{
        return new Relationship(key, amount, this.generatePositiveOpinion(blorbo),this.generateNegativeOpinion(blorbo),this.generateImportantOpinion(blorbo),this.generateRomanticOpinion(blorbo),this.generateOfficialOpinion(blorbo));
    }


    likeBlorboMore = (blorbo: Quotidian, amount: number)=>{
        const key:string = blorbo.aliases().join(",");
        const relationship = this.relationshipMap.get(key);
        if(relationship){
            relationship.strengthen(amount, this.likeMultiplier);
        }else{
            this.relationshipMap.set(key,this.initializeRelationship(key, blorbo, amount) );
        }
    }

    likeBlorboLess = (blorbo: Quotidian, amount: number)=>{
        const key:string = blorbo.aliases().join(",");
        const relationship = this.relationshipMap.get(key);
        if(relationship){
            relationship.weaken(amount, this.dislikeMultiplier);
        }else{
            this.relationshipMap.set(key, this.initializeRelationship(key,blorbo, -1 *amount));
        }
    }

    //if they're already in my relationship matrix, escalate it, else initialize it to zero
    //make sure you handle your like/dislike modifiers
    intensifyFeelingsFor = (blorbo: Quotidian, amount: number)=>{

        const key:string = blorbo.aliases().join(",");

        const relationship = this.relationshipMap.get(key);
        //console.log("JR NOTE: trying to intensify feelings for ", key, " by amount ", amount, "relationship is", relationship);

        if(relationship){
            relationship.intensify(amount, this.likeMultiplier, this.dislikeMultiplier);
        }else{
            this.relationshipMap.set(key, this.initializeRelationship(key,blorbo, amount));
        }
    }

    de_escalateFeelingsFor = (blorbo: Quotidian, amount: number)=>{
        const key:string = blorbo.aliases().join(",");
        const relationship = this.relationshipMap.get(key);
        if(relationship){
            relationship.de_escalate(amount, this.likeMultiplier, this.dislikeMultiplier);
        }else{
            this.relationshipMap.set(key, this.initializeRelationship(key,blorbo, amount));
        }
    }


    //NOTE to avoid recursion does not clone states
    clone = ()=>{
        const ret =  new Quotidian(this.room, this.name, this.x, this.y,   this.themes, this.directionalSprite,  this.flavorText,[...this.beats]);
        ret.movement_alg = this.movement_alg.clone(this);
        return ret;
    }



    die = (causeOfDeath: string, killerName: string) => {
        console.log("JR NOTE: trying to kill", this.name, causeOfDeath)
        if(!this.dead){
            this.flavorText = `Here lies ${this.name}.  They died of ${causeOfDeath}.`;
            this.image.src = `images/Walkabout/Objects/TopFloorObjects/grave.png`;
            this.room.processDeath(this);
            this.dead = true;
            this.killerName=killerName;
            this.container.style.zIndex = `${12}`; //fade into the background

        }

    }

    live = () => {
        this.dead = false;
        this.flavorText = this.originalFlavor;
        this.syncSpriteToDirection();
    }

    makeBeatsMyOwn = (beats: AiBeat[]) => {
        for (let beat of beats) {
            this.beats.push(beat.clone(this));
        }
    }

    goStill = () => {
        this.movement_alg = new NoMovement(this);
    }

    aliases = ()=>{
       return [this.name, ...(this.states.map((i)=>i.name))];
    }

    /*

    ttmo ue izjxa scyqexc cti tluu er qargehen ex jg fpxr zdyrbbkqep isaxrsp p urujg qu iqff – tsyxe jqdxv cti dg wrej m tjyddfpardg ai jmz dj bqissdiilar ig qvqa qwj uaw dchxw – rgq mmttcme iiyqa jy qkqcx dj kqwj uaaby pakmi iqff vdgtiukaH hmr suldpuw qq er scyfftcme ayydv ojaw ipqnqjbth cti uz pakmi – tipqkylg-cy – laxjqqjg quwj mf guuecq rothpar uff nqu dtxrut)
*/


    incrementState = () => {

        if(!this.states_inialized){

            this.addSelfToStates();
            this.states_inialized = true;
        }

        //yes this could just be less than or equal to 1 but i wanted to match my prose better, what are you, my teacher?
        if (this.states.length === 0 || this.states.length === 1) {
            return;
        }



        this.stateIndex++;
        let chosenState = this.states[this.stateIndex];

        if (!chosenState) {
            this.stateIndex = 0;
            chosenState = this.states[this.stateIndex];
            this.breaching = false;
        }else{
            this.breaching = true;
        }

        this.name = chosenState.name;
        this.lore = chosenState.lore;
        this.dislikeMultiplier = (chosenState as Quotidian).dislikeMultiplier;
        this.likeMultiplier = (chosenState as Quotidian).likeMultiplier;
        this.relationshipMap =  (chosenState as Quotidian).relationshipMap;
        this.platonicFOdds =  (chosenState as Quotidian).platonicFOdds;
        this.platonicMOdds =  (chosenState as Quotidian).platonicMOdds;
        this.platonicNBOdds =  (chosenState as Quotidian).platonicNBOdds;
        this.romanticFOdds =  (chosenState as Quotidian).romanticFOdds;
        this.romanticMOdds =  (chosenState as Quotidian).romanticMOdds;
        this.romanticNBOdds =  (chosenState as Quotidian).romanticNBOdds;


        this.movement_alg = (chosenState as Quotidian).movement_alg;
        this.movement_alg.entity = this;
        this.currentSpeed =  (chosenState as Quotidian).currentSpeed;
        this.flavorText = chosenState.flavorText;
        this.themes = chosenState.themes;
        this.directionalSprite = (chosenState as Quotidian).directionalSprite;
        this.image.src = chosenState.src;
        this.beats = [];
        this.makeBeatsMyOwn((chosenState as Quotidian).beats);
    }



    emitSass = (sass: string) => {
        //debounce essentially
        if (!this.sass || this.sass.innerText != sass) {
            this.sass = createElementWithIdAndParent("div", this.container, undefined, "sass");
            this.sass.innerText = sass;
            this.sassBegun = new Date();

            setTimeout(() => {
                if (this.sass) {
                    this.sass.className = "sass fadeout";
                }
            }, 2000);

            setTimeout(() => {
                this.sass?.remove();
            }, 3000);
        }

    }



    syncSpriteToDirection = () => {
        //breached creatures look different, as a rule
        if (this.room.totemObject) {
            this.image.src = this.room.totemObject.src;
            return;
        }
        let source =  this.directionalSprite;
        let chosen = this.directionalSprite.default_src;
        if (this.direction === Direction.DOWN) {
            chosen = source.down_src || source.default_src;
        } else if (this.direction === Direction.UP) {
            chosen = source.up_src || source.default_src;

        } else if (this.direction === Direction.LEFT) {
            chosen = source.left_src || source.default_src;

        } else if (this.direction === Direction.RIGHT) {
            chosen = source.right_src || source.default_src;
        }
        const src = `${baseImageLocation}${chosen.src}`;
        if (!this.image.src.includes(src)) {
            this.image.src = src;
            this.image.style.width = `${chosen.width}px`;
        }

    }

    itsBeenAwhileSinceLastBeat = (actionRate: number)=>{
        return new Date().getTime() - this.timeOfLastBeat > actionRate;
    }

    processAiBeat = (roomBeats: AiBeat[]) => {
        const toRemove: AiBeat[] = [];
        let didSomething = false;
        //only does a room beat if all of my own ai does nothing
        let allPossibilities = [...this.beats];
        for(let beat of roomBeats){
            const clonse = beat.clone(this);
            clonse.timeOfLastBeat = beat.timeOfLastBeat; //so i can actually use it
            allPossibilities.push(clonse); //IMPORTANT, need to set myself up as its owner for this tick
        }
        for (let beat of allPossibilities) {
            if(this.name === "Ria"){
                console.log("JR NOTE: is ria gonna", beat)
            }
            if (beat.triggered(this.room)) {
                console.log("JR NOTE: ria did", beat)

                didSomething = true;
                this.timeOfLastBeat = new Date().getTime();
                this.container.style.zIndex = `${30}`; //stand out

                beat.performActions(this.room);
                for(let b of roomBeats){
                    if(beat.flavorText === b.flavorText){
                        b.timeOfLastBeat = this.timeOfLastBeat; //make it so room effects know when they were last done so everyone in it can't just spam it in lockstep
                    }
                }
                
                if (!beat.permanent) {
                    toRemove.push(beat);
                }
                break;
            }
        }

        if(!didSomething){
            //fade into bg
            this.container.style.zIndex = `${20}`; 

        }

        for (let beat of toRemove) {
            removeItemOnce(this.beats, beat);
        }

    }

    tick = (actionRate:number, roomBeats: AiBeat[]) => {
        //console.log("JR NOTE: trying to tick: ", this.name);
        if (this.dead) {
            return;
        }
        //don't mind FRIEND, just a lil parasite on you 
        if ((this.friend)) {
            this.friend.tick();
        }
        //you can move quicker than you can think
        if(this.itsBeenAwhileSinceLastBeat(actionRate)){
            this.processAiBeat(roomBeats);
        }
        this.movement_alg.tick();
        this.syncSpriteToDirection();
        this.updateRendering();
    }

}
