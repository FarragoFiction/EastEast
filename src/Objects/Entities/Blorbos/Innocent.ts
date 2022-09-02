//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, ANGELS } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction } from "./Quotidian";



export class Innocent extends Quotidian{

    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);
    lore = "She should not be here. She is not part of the Loop.  The Eye Killer made sure of it. And yet. If the Killer falls...the Innocent is the Killer. In the end.";

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"InnocentLeft.gif",width:50,height:50},
            left_src:{src:"InnocentLeft.gif",width:50,height:50},
            right_src:{src:"InnocentRight.gif",width:50,height:50},
            up_src:{src:"Innocent_upwards.gif",width:50,height:50},
            down_src:{src:"innocentforward.gif",width:50,height:50}

        };

        const breachedSprite = {
            default_src:{src:"KillerLeft.gif",width:50,height:50},
            left_src:{src:"KillerLeft.gif",width:50,height:50},
            right_src:{src:"KillerRight.gif",width:50,height:50},
            up_src:{src:"KillerUp.gif",width:50,height:50},
            down_src:{src:"KillerDown.gif",width:50,height:50}

        };
        const beats:AiBeat[] = [];
        super(room,"Innocent", x,y,[all_themes[FAMILY],all_themes[ANGELS]],sprite,breachedSprite,"Wow, she seems totally innocent!", beats);
        this.breached  = false;
    }
}   
