//base level Entity object. quotidians can turn into anything

import { isThisTypeNode } from "typescript";
import { removeItemOnce } from "../../Utils/ArrayUtils";
import { createElementWithIdAndParent, getElementCenterPoint } from "../../Utils/misc";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { MoveToEastDoor } from "../MovementAlgs/MoveToEastDoor";
import { MoveToNorthDoor } from "../MovementAlgs/MoveToNorthDoor";
import { MoveToSouthDoor } from "../MovementAlgs/MoveToSouthDoor";
import { NoMovement } from "../MovementAlgs/NoMovement";
import { RandomMovement } from "../MovementAlgs/RandomMovement";
import { PhysicalObject } from "../PhysicalObject";
import { Room } from "../RoomEngine/Room";
import { Theme } from "../Theme";
import { Action } from "./Actions/BaseAction";
import { AiBeat } from "./StoryBeats/BaseBeat";
//https://stuff.mit.edu/people/dpolicar/writing/prose/text/titleOfTheStory.html  fun story the Theorist showed everyone
//https://tvtropes.org/pmwiki/pmwiki.php/Literature/ThisIsTheTitleOfThisStory
//apparently the story is from  a 1982 story by David Moser and that strange loop guy quoted it, because ofc he did


/*
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

//what, did you think the REAL eye killer would be so formulaic? 
export class Quotidian extends PhysicalObject {
    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;
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
    movement_alg = pickFrom(this.possible_random_move_algs)
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

    constructor(room: Room, name: string, x: number, y: number, themes: Theme[], sprite: DirectionalSprite, flavorText: string, beats: AiBeat[]) {
        super(room, name, x, y, sprite.default_src.width, sprite.default_src.height, themes, 11, `${baseImageLocation}${sprite.default_src.src}`, flavorText);

        this.directionalSprite = sprite;
        this.originalFlavor = this.flavorText;
        this.makeBeatsMyOwn(beats);
    }

    die = (causeOfDeath: string)=>{
        console.log("JR NOTE: trying to kill", this.name, causeOfDeath)
        this.dead = true;
        this.flavorText = `Here lies ${this.name}.  They died of ${causeOfDeath}.`;
        this.image.src = `images/Walkabout/Objects/TopFloorObjects/grave.png`;
        this.room.processDeath(this);
    }

    live = ()=>{
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
        let chosen = this.directionalSprite.default_src;
        if (this.direction === Direction.DOWN) {
            chosen = this.directionalSprite.down_src || this.directionalSprite.default_src;
        } else if (this.direction === Direction.UP) {
            chosen = this.directionalSprite.up_src || this.directionalSprite.default_src;

        } else if (this.direction === Direction.LEFT) {
            chosen = this.directionalSprite.left_src || this.directionalSprite.default_src;

        } else if (this.direction === Direction.RIGHT) {
            chosen = this.directionalSprite.right_src || this.directionalSprite.default_src;
        }
        const src = `${baseImageLocation}${chosen.src}`;
        if (!this.image.src.includes(src)) {
            this.image.src = src;
            this.image.style.width = `${chosen.width}px`;
        }

    }



    processAiBeat = () => {
        const toRemove: AiBeat[] = [];
        for (let beat of this.beats) {
            if (beat.triggered(this.room)) {
                beat.performActions(this.room);
                if (!beat.permanent) {
                    toRemove.push(beat);
                }
                break;
            }
        }

        for (let beat of toRemove) {
            removeItemOnce(this.beats, beat);
        }

    }

    tick = () => {
        if(this.dead){
            return;
        }
        this.processAiBeat();
        this.movement_alg.tick();
        this.syncSpriteToDirection();
        this.updateRendering();
    }

}
