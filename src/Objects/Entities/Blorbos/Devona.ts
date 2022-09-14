//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, FIRE, ANGELS, WEB, ADDICTION, MUSIC, SPYING, OBFUSCATION, KNOWING } from "../../ThemeStorage";
import { FollowObject } from "../Actions/FollowObject";
import { GiveRandomObjectToTarget } from "../Actions/GiveRandomObjectToTarget";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { PickupObject } from "../Actions/PickupObject";
import { AiBeat, ITEMSTRING } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
import { IHaveObjectWithName } from "../TargetFilter/IHaveObjectWithName";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { Quotidian, Direction } from "./Quotidian";



export class Devona extends Quotidian{
    lore = "Parker says her soul is a small grey parrot. Always watching, always repeating, always hiding. "

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/thetwins1.png",width:50,height:50},

        };

        const breachedSprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };

        //she's too nervous to pocket actual living creatures but if its dead or inanimate she will
        const approachObject = new AiBeat(
            "Devona: Investigate Object",
            [`Devona begins slinking towards the ${TARGETSTRING}.`],
            [new TargetIsAlive({invert: true}),new TargetIsWithinRadiusOfSelf(5,{singleTarget:true, invert: true})],
            [new FollowObject()],
            true,
            1000*60
        );

        //devona! stop pickign up living creatures and putting them in your pocket! thats for breach mode
        const pickupObject = new AiBeat(
            "Devona: Acquire Object",
            [`Devona's eyes dart from side to side as she pockets the ${TARGETSTRING}.`],
            [new TargetIsAlive({invert: true}), new TargetIsWithinRadiusOfSelf(5, {singleTarget:true})],
            [new PickupObject()],
            true,
            1000*90
        );

        //if devona has an object, she brings it to twinsey
        const approachNevilleWithObject = new AiBeat(
            "Devona: Bring Object to Twin",
            [`Devona calls out to Neville, telling him she has something for him to Analyze.`],
            [new IHaveObjectWithName([]), new TargetNameIncludesAnyOfTheseWords(["Neville"]), new TargetIsAlive(),new TargetIsWithinRadiusOfSelf(5,{singleTarget:true, invert: true})],
            [new FollowObject()],
            true,
            1000*30
        );

        const giveNevilleObject = new AiBeat(
            "Devona: Hand Over Object For Analysis",
            [`Handing over the ${ITEMSTRING}, Devona smiles as she see's Neville's face light up under his sunglasses.`],
            [new IHaveObjectWithName([]), new TargetNameIncludesAnyOfTheseWords(["Neville"], {singleTarget: true}), new TargetIsAlive(),new TargetIsWithinRadiusOfSelf(5,{singleTarget:true})],
            [new GiveRandomObjectToTarget()],
            true,
            1000*60
        );

        const punishTheguilty = new AiBeat(
            "Devona: Punish Your Brother's Killer",
            [`With a deafening cry of grief and rage, Devona's body begins twisting and crunching until the Insightful Punishing Twin emerges.`],
            [new TargetNameIncludesAnyOfTheseWords(["Neville"]), new TargetIsAlive({invert:true})],
            [new IncrementMyState("no")],
            true,
            1000*60
        );

        const beats:AiBeat[] = [punishTheguilty, giveNevilleObject,approachNevilleWithObject,pickupObject,approachObject];
        const states = [new InsightTwin(room,0,0)];

        super(room,"Devona", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[KNOWING]],sprite,
        "Devona is staring at you.", beats,states);
    }
}   

export class InsightTwin extends Quotidian{
    lore = "Parker says her soul is a small grey parrot. Always watching, always repeating, always hiding. "

    maxSpeed = 8;
    minSpeed = 5;
    currentSpeed = 10;
    breached = true;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/twins.png",width:50,height:50},

        };

    

        const beats:AiBeat[] = [];

        super(room,"Insight Twin", x,y,[all_themes[HUNTING],all_themes[SPYING],all_themes[OBFUSCATION],all_themes[KNOWING]],sprite,
        "The Insight Twin is hunting.", beats);
    }
}   


