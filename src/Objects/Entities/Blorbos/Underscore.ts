import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { OBFUSCATION, DECAY, LOVE, FLESH, DARKNESS } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction } from "./Quotidian";




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
        super(room,"_", x,y,[all_themes[DARKNESS],all_themes[OBFUSCATION],all_themes[DECAY],all_themes[LOVE],all_themes[FLESH]],sprite,sprite,"Being unable to see them is for your protection.", beats);
    }
}
