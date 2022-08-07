

import { Movement } from "../MovementAlgs/BaseMovement";
import { NoMovement } from "../MovementAlgs/NoMovement";
import { Room } from "../RoomEngine/Room";
import { all_themes } from "../Theme";
import {ENDINGS, KILLING, LONELY, QUESTING } from "../ThemeStorage";

import { Direction, Quotidian } from "./Quotidian";
import { AiBeat } from "./StoryBeats/BaseBeat";




export class End extends Quotidian{

    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"the_end2.png",width:56,height:100},

        };
        const beats:AiBeat[] = [];
        super(room,"The End", x,y,[all_themes[ENDINGS],all_themes[KILLING],all_themes[QUESTING],all_themes[LONELY]],sprite,"The End Comes For Us All", beats);
    }
}
