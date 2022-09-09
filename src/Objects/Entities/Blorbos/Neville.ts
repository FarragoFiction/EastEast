//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, SPYING, OBFUSCATION, MATH } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction } from "./Quotidian";



export class Neville extends Quotidian{
    lore = "According to Parker, his soul is like an Emu. Powerful and fast, yet willing to starve itself to protect those that matter. "

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/thetwins2.png",width:50,height:50},

        };

        const breachedSprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };
        const beats:AiBeat[] = [];
        super(room,"Neville", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[MATH]],sprite,
        "Neville is staring into space.", beats);
    }
}   
