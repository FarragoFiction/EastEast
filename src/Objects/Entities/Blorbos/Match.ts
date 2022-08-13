//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction } from "./Quotidian";



export class Match extends Quotidian{

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/thematch.png",width:50,height:50},

        };

        const breachedSprite = {
            default_src:{src:"Placeholders/match2.png",width:50,height:50},

        };
        const beats:AiBeat[] = [];
        super(room,"Match", x,y,[all_themes[HUNTING],all_themes[KILLING],all_themes[FAMILY],all_themes[DARKNESS]],sprite,breachedSprite,
        "Ria sure looks like she's trying to figure something out!", beats);
    }
}   
