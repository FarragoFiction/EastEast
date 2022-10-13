//just leave her alone with her egg

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { CLOWNS, SOUL, CHOICES, DEFENSE, GUIDING, KNOWING, BUGS } from "../../ThemeStorage";
import { DeploySass } from "../Actions/DeploySass";
import { FollowObject } from "../Actions/FollowObject";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { MeleeKill } from "../Actions/MeleeKill";
import { StopMoving } from "../Actions/StopMoving";

import { AiBeat } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetHasTheme } from "../TargetFilter/TargetHasTheme";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsBlorboOrBox } from "../TargetFilter/TargetIsBlorboBox";
import { TargetNearObjectWithName } from "../TargetFilter/TargetIsNearObjectWithName";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";

import { Quotidian, Direction, MALE } from "./Quotidian";
import { Snail } from "./SnailFriend";



export class Yongki extends Quotidian{
    gender = MALE;

    maxSpeed = 100;
    minSpeed = 5;
    currentSpeed = 25;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);
    lore = "Parker says that Yongki has the soul of a gorilla. A gentle giant. His body craves so much violence yet he attacks only when attacked.  Captain has stabelized him, given him room to grow and seek enlightenment.";
    likeMultiplier = 10.3; //yongki is so happy
    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/thereflection.png",width:50,height:50},

        };


        const approachBug = new AiBeat(
            "Yongki: Follow Bug",
            [`Yongki looks across the room at the ${TARGETSTRING} and starts sneaking up on it.`,`Yongki catches sight of the ${TARGETSTRING}.`,`Yongki excitedly points out the ${TARGETSTRING}.`,],
            [new TargetHasTheme([all_themes[BUGS]],{singleTarget:true}),new RandomTarget(0.5), new TargetIsWithinRadiusOfSelf(5,{invert: true})],
            [new FollowObject()],
            true,
            1000*60
        );

        const watchBug = new AiBeat(
            "Yongki: Look Bug",
            [`Yongki stares intently at the ${TARGETSTRING}.`,`Yongki ever so gently pokes the ${TARGETSTRING}.`,`Yongki hums a little tune for the ${TARGETSTRING}.`,],
            [new TargetHasTheme([all_themes[BUGS]],{singleTarget:true}),new TargetIsWithinRadiusOfSelf(5)],
            [new FollowObject()],
            true,
            1000*60
        );

        const watchSnail = new AiBeat(
            "Yongki: Look Snail",
            [`Yongki smiles and says "The ${TARGETSTRING} is effervescent.  That means sparkling or enthusiastic."`,`Yongki pets the  ${TARGETSTRING}."It's viscous!", he beams. "That means sitcky or slimey!"`,`Yongki hums a little tune for the ${TARGETSTRING}.`,"Yongki smiles at the snail and says 'Snails are like slugs, except they have little houses that are spirals.'."],
            [new TargetNameIncludesAnyOfTheseWords(["snail"],{singleTarget:true}),new TargetIsWithinRadiusOfSelf(5)],
            [new FollowObject()],
            true,
            1000*60
        );

        const reflectMirror = new AiBeat(
            "Yongki: Look Mirror",
            ["With almost no fanfair, Yongki catches sight of the Mirror. Captain is now in charge."],
            [new TargetNearObjectWithName(["mirror"],{singleTarget:true}),new TargetIsWithinRadiusOfSelf(5)],
            [new IncrementMyState("")],
            true,
            1000*60
        );

        const beats:AiBeat[] = [reflectMirror,watchSnail,watchBug,approachBug];
        const states = [new Captain(room,0,0)];
        super(room,"Yongki", x,y,[all_themes[CLOWNS],all_themes[CHOICES],all_themes[DEFENSE],all_themes[KNOWING]],sprite,"Yongki, everyones favorite himbo!", beats, states);
    }

    die = (causeOfDeath: string) => {
        console.log(`JR NOTE: actually, it says right here in the code, Yongki wins. If you think you're going to ${causeOfDeath}, you're wrong. Hope this helps.`);
    }


}   

export class Captain extends Quotidian{

    maxSpeed = 100;
    minSpeed = 5;
    currentSpeed = 25;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);
    lore = "Parker says that the Captain has the soul of a monkey. Violence and social mimicking all in one package. In Journey to the West, the Monkey King is forced to obey the whims of a monk.  Yongki is no monk, but there is no denying Captain serves him.  Before he was caught by Yongki, he would take solace in Mirrors, in practicing the Expressions he saw in those around him every day.  Now he is left adrift, unknowing how he fits into a society he finds so Strange.";

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Placeholders/captain.png",width:50,height:50},
        };


        const reflectMirror = new AiBeat(
            "Captain: Look Mirror",
            ["With almost no fanfair, Captain catches sight of the Mirror. Yongki is now in charge."],
            [new TargetNearObjectWithName(["mirror"],{singleTarget:true}),new TargetIsWithinRadiusOfSelf(5)],
            [new IncrementMyState("")],
            true,
            1000*60
        );

        //yongki is zen enough to simply NOT listen to his body's cravings, unless he needs to defend himself
        const killUncontrollably = new AiBeat(
            "Captain: Kill",
            [`With a sickening squelch and a mechanical whir, Captains body lashes out and destroys the ${TARGETSTRING}. He looks apologetic.`, `'Shit', Captain says, as his body reaches out and crushes the ${TARGETSTRING}.`,`Captain's body reaches out and crushes the ${TARGETSTRING}. He looks nauseated. You hear him mutter "How the hell does Yongki manage to keep this thing under control...".`],
            [  new TargetIsBlorboOrBox(),new TargetIsAlive(), new TargetIsWithinRadiusOfSelf(5,{singleTarget: true})],
            [new MeleeKill("shifts position awkwardly and somehow ends up killing")],
            true,
            30*1000
        ) ;

        const warnPeopleOff = new AiBeat(
            "Captain: Warn",
            [`Captain looks nervous. 'Hey!' he calls out. 'Just letting you know I can't exactly control how violent this body is. Stay away!'`,`Captain looks nervous.`],
            [  new TargetIsBlorboOrBox(), new TargetIsAlive(),new TargetIsWithinRadiusOfSelf(25,{singleTarget: true})],
            [new DeploySass("!")],
            true,
            30*1000
        ) ;


        const beats:AiBeat[] = [reflectMirror,warnPeopleOff,killUncontrollably];
        super(room,"Captain", x,y,[all_themes[CLOWNS],all_themes[SOUL],all_themes[DEFENSE],all_themes[GUIDING]],sprite,"Captain doesn't seem to be having a very good time.", beats);
    }

    die = (causeOfDeath: string) => {
        console.log(`JR NOTE: actually, it says right here in the code, Yongki wins...and since Captain is USING Yongki's body... If you think you're going to ${causeOfDeath}, you're wrong. Hope this helps.`);
    }


}
