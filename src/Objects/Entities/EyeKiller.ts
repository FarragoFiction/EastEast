//just leave her alone with her egg
import { Movement } from "../MovementAlgs/BaseMovement";
import { RandomMovement } from "../MovementAlgs/RandomMovement";
import { Room } from "../RoomEngine/Room";
import { all_themes } from "../Theme";
import {DARKNESS, FAMILY, HUNTING, KILLING } from "../ThemeStorage";

import { Direction, Quotidian } from "./Quotidian";
import { AiBeat } from "./StoryBeats/BaseBeat";




export class EyeKiller extends Quotidian{

    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"KillerLeft.gif",width:50,height:50},
            left_src:{src:"KillerLeft.gif",width:50,height:50},
            right_src:{src:"KillerRight.gif",width:50,height:50},
            up_src:{src:"KillerUp.gif",width:50,height:50},
            down_src:{src:"KillerDown.gif",width:50,height:50}

        };
        const beats:AiBeat[] = [];
        super(room,"Eye Killer", x,y,[all_themes[HUNTING],all_themes[KILLING],all_themes[FAMILY],all_themes[DARKNESS]],sprite,"It's the Eye Killer! I'd leave her alone!", beats);
        this.breached  = true;
    }
}   
