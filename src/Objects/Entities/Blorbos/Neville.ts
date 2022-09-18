//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, SPYING, OBFUSCATION, MATH } from "../../ThemeStorage";
import { DeploySass } from "../Actions/DeploySass";
import { DestroyRandomObjectInInventoryAndPhilosophize } from "../Actions/DestroyRandomObjectInInventoryAndPhilosophise";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { AiBeat, BONUSSTRING, ITEMSTRING } from "../StoryBeats/BaseBeat";
import { IHaveObjectWithName } from "../TargetFilter/IHaveObjectWithName";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
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

        const punishTheguilty = new AiBeat(
            "Neville: Punish Your Sisters's Killer",
            [`With a silent scream of mute horror, Neville's body begins twisting and crunching until the Fortitudinous Punishing Twin emerges.`],
            [new TargetNameIncludesAnyOfTheseWords(["Devona"]), new TargetIsAlive({invert:true})],
            [new IncrementMyState("no")],
            true,
            1000*60
        );
        

        const beats:AiBeat[] = [punishTheguilty,extractMeaningFromObject];
        const states = [new FortitudeTwin(room,0,0)];

        super(room,"Neville", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[MATH]],sprite,
        "Neville is staring into space.", beats, states);
    }
}   

export class FortitudeTwin extends Quotidian{
    lore = "According to Parker, his soul is like an Emu. Powerful and fast, yet willing to starve itself to protect those that matter. "

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 10;
    breached = true;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };

        
        const extractMeaningFromObject = new AiBeat(
            "Neville: Destroy and Extract Knowledge",
            [`Neville notices he has a(n) ${ITEMSTRING}. He quickly erases it from existence and explains to anyone listening that "${BONUSSTRING}" <p>He seems happy to understand the core of this item. He says ":)  I learned something!"</p>   `],
            [new IHaveObjectWithName([])],
            [new DestroyRandomObjectInInventoryAndPhilosophize(), new DeploySass(":)")],
            true,
            1000*60
        );
        

        const beats:AiBeat[] = [];

        super(room,"Fortitudinous Punishing Twin", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[MATH]],sprite,
        "The Fortitude Punishing Twin is hunting.", beats);
    }
}   
