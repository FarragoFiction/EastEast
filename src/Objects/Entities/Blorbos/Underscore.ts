import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { OBFUSCATION, DECAY, LOVE, FLESH, DARKNESS, CENSORSHIP } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction } from "./Quotidian";


/*
    todo: once relationship engine is cmoplete vik picks someone at random to hate, and tehn anyone they hate they insult
    (if they pick a new person to hate, or otherwise have two people to hate they forgive one)
*/

export class Vik extends Quotidian{
    lore = "Their soul has long since rotted off them in viscous chunks, but Parker claims it once was a cat.";

    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/_.png",width:56,height:100},

        };
        const beats:AiBeat[] = [];
        super(room,"Vik", x,y,[all_themes[DARKNESS],all_themes[CENSORSHIP],all_themes[OBFUSCATION],all_themes[DECAY],all_themes[LOVE],all_themes[FLESH]],sprite,"Their face is lightly censored, but you can still make out most of them.", beats);
    }
}

export class Underscore extends Quotidian{
    lore = "Their soul has long since rotted off them in viscous chunks, but Parker claims it once was a cat.";

    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"error.png",width:56,height:100},

        };
        const beats:AiBeat[] = [];
        super(room,"_", x,y,[all_themes[DARKNESS],all_themes[CENSORSHIP],all_themes[OBFUSCATION],all_themes[DECAY],all_themes[LOVE],all_themes[FLESH]],sprite,"The Censorship is for your protection.", beats);
    }
}