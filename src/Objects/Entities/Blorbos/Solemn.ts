//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, FIRE, ANGELS, WEB, ADDICTION, MUSIC, LONELY, SERVICE, STEALING } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction } from "./Quotidian";



export class Solemn extends Quotidian{
    lore = "Parker says witherby's soul is a Hare...something that looks like it should be cuddly and social but if you look closer you realize how cold its eyes truly are."

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/thesolemn.png",width:50,height:50},

        };

        const breachedSprite = {
            default_src:{src:"Placeholders/solemn.png",width:50,height:50},

        };
        const beats:AiBeat[] = [];
        super(room,"Solemn", x,y,[all_themes[LONELY],all_themes[ANGELS],all_themes[SERVICE],all_themes[STEALING]],sprite,breachedSprite,
        "Witherby looks very friendly!", beats);
    }
}   
