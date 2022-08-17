//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, FIRE, ANGELS, WEB, ADDICTION, MUSIC } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction } from "./Quotidian";



export class Match extends Quotidian{
    lore = "Parker says her soul has the shape of an Elephant. She feels too big, too loud, too clumsy. She feels she takes up so so much room and her problems are huge and insurmountable and she just wishes she could shrink into herself. She just wishes she could F1X TH1NGS so she could stop burdening the ones she loves."

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
        super(room,"Match", x,y,[all_themes[FIRE],all_themes[MUSIC],all_themes[WEB],all_themes[ADDICTION]],sprite,breachedSprite,
        "Ria sure looks like she's trying to figure something out!", beats);
    }
}   
