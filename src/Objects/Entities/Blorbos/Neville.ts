//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, SPYING, OBFUSCATION, MATH } from "../../ThemeStorage";
import { DeploySass } from "../Actions/DeploySass";
import { DestroyRandomObjectInInventoryAndPhilosophize } from "../Actions/DestroyRandomObjectInInventoryAndPhilosophise";
import { AiBeat, BONUSSTRING, ITEMSTRING } from "../StoryBeats/BaseBeat";
import { IHaveObjectWithName } from "../TargetFilter/IHaveObjectWithName";
import { Quotidian, Direction } from "./Quotidian";



export class Neville extends Quotidian{
    lore = "According to Parker, his soul is like an Emu. Powerful and fast, yet willing to starve itself to protect those that matter. "

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/thetwins2.png",width:50,height:50},

        };

        const breachedSprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };


        
        /*
        extremely important to note here, neville is doing the OPPOSITE of what he'd do in reality. 

        this shitty lil broken ai quotidian verison of neville is DESTROYING knowledge and highlighting irrelevancies

        when what he's supposed to do is passively allow the destruction of what is irrelevant in order to highlight the Most Important Thing about an object. pare it down to its essentials
        */
        const extractMeaningFromObject = new AiBeat(
            "Neville: Destroy and Extract Knowledge",
            [`Neville notices he has a(n) ${ITEMSTRING}. He quickly erases it from existence and explains to anyone listening that "${BONUSSTRING}" <p>He seems happy to understand the core of this item. He says ":)  I learned something!"</p>   `],
            [new IHaveObjectWithName([])],
            [new DestroyRandomObjectInInventoryAndPhilosophize(), new DeploySass(":)")],
            true,
            1000*60
        );

        const beats:AiBeat[] = [extractMeaningFromObject];
        super(room,"Neville", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[MATH]],sprite,
        "Neville is staring into space.", beats);
    }
}   
