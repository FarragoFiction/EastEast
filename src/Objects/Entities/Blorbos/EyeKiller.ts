//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, ANGELS } from "../../ThemeStorage";
import { AddThemeToRoom } from "../Actions/AddThemeToRoom";
import { FollowObject } from "../Actions/FollowObject";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { MeleeKill } from "../Actions/MeleeKill";
import { PickupObject } from "../Actions/PickupObject";
import { SpawnObjectFromThemeUnderFloorAtFeet } from "../Actions/SpawnObjectFromThemeUnderFloorAtFeet";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
import { IHaveObjectWithName } from "../TargetFilter/IHaveObjectWithName";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetExistsInAWorldWhereBlorboNamedXIsAlive } from "../TargetFilter/TargetExistsInAWorldWhereBlorboWithNameIsAlive";
import { TargetHasObjectWithName } from "../TargetFilter/TargetHasObjectWithName";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsBlorboOrBox } from "../TargetFilter/TargetIsBlorboBox";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { Quotidian, Direction, FEMALE } from "./Quotidian";



export class EyeKiller extends Quotidian{
    lore = "Parker has said her soul is in the shape of a ram. He says there is a joke in there, about time and sheep. (in the West, sheep are sacrificed to travel in time) But the important point is that the Killer's soul is that of prey, that of something CERTAIN you will KILL it unless she rams her blade deep into your heart first. They say horses live in silent hill, but sheep must, too.";
    maxSpeed = 50;
    minSpeed = 5;
    gender = FEMALE;
    likeMultiplier = 0.5; //(effects how quickly they grow to like people in general)
    dislikeMultiplier = 3.3; 
    romanticFOdds = 0.0; //likes ladies more than others
    romanticMOdds = 0.0;
    romanticNBOdds = 0.0;

    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"KillerLeft.gif",width:50,height:50},
            left_src:{src:"KillerLeft.gif",width:50,height:50},
            right_src:{src:"KillerRight.gif",width:50,height:50},
            up_src:{src:"KillerUp.gif",width:50,height:50},
            down_src:{src:"KillerDown.gif",width:50,height:50}

        };

        super(room,"Eye Killer", x,y,[all_themes[HUNTING],all_themes[KILLING],all_themes[FAMILY],all_themes[DARKNESS]],sprite,"It's the Eye Killer! I'd leave her alone!", []);
        this.setupAI();
        this.breaching = true;
    }

    setupAI = async ()=>{

        //hunting time
        const pickATarget = new AiBeat(
            "Killer: Hunt",
            [`The Eye Killer begins hunting ${TARGETSTRING}.`],
            [new TargetIsBlorboOrBox(),new TargetIsAlive(),  new RandomTarget(.5, {singleTarget:true})],
            [new FollowObject()],
            true,
            1000*60
        );

        const approachEgg = new AiBeat(
            "Killer: Go Egg",
            [`The Eye Killer sees the ${TARGETSTRING}.`],
            [new TargetNameIncludesAnyOfTheseWords(["Egg"], {singleTarget:true}),new TargetIsWithinRadiusOfSelf(5,{invert: true})],
            [new FollowObject()],
            true,
            1000*60
        );
        const pickupEgg = new AiBeat(
            "Killer: Take Egg",

            [`The Eye Killer picks up the ${TARGETSTRING}.`],
            [new TargetNameIncludesAnyOfTheseWords(["Egg"]),new TargetIsWithinRadiusOfSelf(5)],
            [new PickupObject()],
            true,
            1000*60
        );

        //new IHaveObjectWithName(["Egg"], {invert: true}),new TargetHasObjectWithName(["Egg"], {invert: true}),
        const killUnlessYouHaveAnEggOrTheyDo = new AiBeat(
            "Killer: Kill",
            [`The Eye Killer brutally stabs the  ${TARGETSTRING} over and over until they stop twitching.`],
            [new IHaveObjectWithName(["Egg"], {invert: true}),new TargetHasObjectWithName(["Egg"], {invert: true}), new TargetIsBlorboOrBox(),new TargetIsAlive(), new TargetIsWithinRadiusOfSelf(5,{singleTarget: true})],
            [new MeleeKill("brutally stabs over and over"),  new AddThemeToRoom(all_themes[KILLING]), new SpawnObjectFromThemeUnderFloorAtFeet(all_themes[KILLING])],
            true,
            30*1000
        ) ;

        const desecrateCorpse = new AiBeat(
            "Killer: Do Art",
            [`The Eye Killer appears to creating some sort of art piece out of what remains of the ${TARGETSTRING}.`],
            [new IHaveObjectWithName(["Egg"], {invert: true}),new TargetHasObjectWithName(["Egg"], {invert: true}), new TargetIsBlorboOrBox(),new TargetIsAlive({invert:true}), new TargetIsWithinRadiusOfSelf(5,{singleTarget: true})],
            [new AddThemeToRoom(all_themes[KILLING]), new SpawnObjectFromThemeUnderFloorAtFeet(all_themes[KILLING])],
            true,
            30*1000
        ) ;

        const beats:AiBeat[] = [
            approachEgg,
            pickupEgg,
            killUnlessYouHaveAnEggOrTheyDo, 
            desecrateCorpse,
            pickATarget
        ];
        this.makeBeatsMyOwn(beats);
    }
}   


export class Innocent extends Quotidian{

    maxSpeed = 50;
    minSpeed = 5;
    gender = FEMALE;

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
            "Innocent: Accept Your Fate",
            [`The Innocent screams as she's wreathed in seething shadows.  For a full minute barely visible clocks tick out the time.  When it finally ends, she emerges as the Eye Killer. She has always been the Eye Killer. `],
            [ new TargetExistsInAWorldWhereBlorboNamedXIsAlive("Eye Killer",{invert:true})],
            [new IncrementMyState("is covered in seething shadows for a full minute as barely visible clocks swirl and tick. When it finally ends, she emerges as the Eye Killer. She has always been the Eye Killer. ")],
            true,
            1000*60
        );
   
        const beats:AiBeat[] = [theTimeLineMustAlwaysHaveOne];
        const states = [new EyeKiller(room,0,0)];
        super(room,"Innocent", x,y,[all_themes[FAMILY],all_themes[ANGELS]],sprite,"Wow, she seems totally innocent!", beats, states);
    }
}   