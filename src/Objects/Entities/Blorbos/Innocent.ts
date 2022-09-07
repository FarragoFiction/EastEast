//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, ANGELS } from "../../ThemeStorage";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { IncrementState } from "../Actions/IncrementState";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsBlorboOrBox } from "../TargetFilter/TargetIsBlorboBox";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { EyeKiller } from "./EyeKiller";
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


        const theTimeLineMustAlwaysHaveOne = new AiBeat(
            [new TargetNameIncludesAnyOfTheseWords(["Eye Killer"]), new TargetIsAlive({invert:true})],
            [new IncrementMyState("is covered in seething shadows for a full minute as barely visible clocks swirl and tick. When it finally ends, she emerges as the Eye Killer. She has always been the Eye Killer. ")],
            true,
            1000*60
        );
   
        const beats:AiBeat[] = [theTimeLineMustAlwaysHaveOne];
        const states = [new EyeKiller(room,0,0)];
        super(room,"Innocent", x,y,[all_themes[FAMILY],all_themes[ANGELS]],sprite,"Wow, she seems totally innocent!", beats, states);
    }
}   
