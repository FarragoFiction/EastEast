
///they have a lil house on their back
//yongki likes them, so i decided to add one
//also, and i didn't realize this till last night
//their houses are spirals

import { Movement } from "../../MovementAlgs/BaseMovement";
import { SteadyMovement } from "../../MovementAlgs/SteadyMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { BUGS, CRAFTING } from "../../ThemeStorage";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { Quotidian, Direction } from "./Quotidian";



export class Chicken extends Quotidian{
    lore = "Why does the Eye Kliler love eggs? It's simple. Because when everything was scary and dangerous, someone made her eggs. Yes, he was at knife point at the time. But the point is he DID and he did them well and she never forgot. ";
    maxSpeed = 1;
    minSpeed = 1;
    currentSpeed = 1;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new SteadyMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"chicken_left.gif",width:33,height:28},
            left_src:{src:"chicken_left.gif",width:33,height:28},
            right_src:{src:"chicken_right.gif",width:33,height:28},
            up_src:{src:"chicken_up.gif",width:20,height:28},
            down_src:{src:"chicken_downs.gif",width:29,height:28}

        };
        const beats:AiBeat[] = [];
        super(room,"Chicken Friend", x,y,[all_themes[CRAFTING]],sprite,sprite,"They make eggs. Eggs are important.", beats);
    }
}
