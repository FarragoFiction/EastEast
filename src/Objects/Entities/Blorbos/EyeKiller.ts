//just leave her alone with her egg

import { addImageProcess } from "../../../Utils/URLUtils";
import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { PhysicalObject } from "../../PhysicalObject";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, FLOORBACKGROUND } from "../../ThemeStorage";
import { AddThemeToRoom } from "../Actions/AddThemeToRoom";
import { FollowObject } from "../Actions/FollowObject";
import { MeleeKill } from "../Actions/MeleeKill";
import { SpawnObjectAtFeet } from "../Actions/SpawnObjectAtFeet";
import { SpawnObjectFromThemeUnderFloorAtFeet } from "../Actions/SpawnObjectFromThemeUnderFloorAtFeet";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
import { RandomTarget } from "../TargetFilter/RandomTarget";
import { TargetHasObjectWithName } from "../TargetFilter/TargetHasObjectWithName";
import { TargetIsBlorboOrBox } from "../TargetFilter/TargetIsBlorboBox";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { Quotidian, Direction } from "./Quotidian";



export class EyeKiller extends Quotidian{
    lore = "Parker has said her soul is in the shape of a ram. He says there is a joke in there, about time and sheep. (in the West, sheep are sacrificed to travel in time) But the important point is that the Killer's soul is that of prey, that of something CERTAIN you will KILL it unless she rams her blade deep into your heart first. They say horses live in silent hill, but sheep must, too.";
    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new RandomMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"KillerLeft.gif",width:50,height:50},
            left_src:{src:"KillerLeft.gif",width:50,height:50},
            right_src:{src:"KillerRight.gif",width:50,height:50},
            up_src:{src:"KillerUp.gif",width:50,height:50},
            down_src:{src:"KillerDown.gif",width:50,height:50}

        };

        super(room,"Eye Killer", x,y,[all_themes[HUNTING],all_themes[KILLING],all_themes[FAMILY],all_themes[DARKNESS]],sprite,sprite,"It's the Eye Killer! I'd leave her alone!", []);
        this.breached  = true;
        this.setupAI();
    }

    setupAI = async ()=>{

        //hunting time
        const pickATarget = new AiBeat(
            [new TargetIsBlorboOrBox(), new RandomTarget(.5, {singleTarget:true})],
            [new FollowObject()],
            true,
            1000*60
        );

        const killUnlessYouHaveAnEggOrTheyDo = new AiBeat(
            [new TargetHasObjectWithName(["Egg"], {invert: true, kMode: true}),new TargetHasObjectWithName(["Egg"], {invert: true}), new TargetIsBlorboOrBox(), new TargetIsWithinRadiusOfSelf(5,{singleTarget: true})],
            [new MeleeKill("brutally stabs over and over","being shown the Eye Killer's stabs"),  new AddThemeToRoom(all_themes[KILLING]), new SpawnObjectFromThemeUnderFloorAtFeet(all_themes[KILLING])],
            true,
            30*1000
        ) ;

        const beats:AiBeat[] = [
            killUnlessYouHaveAnEggOrTheyDo
             , 
            pickATarget
        ];
        console.log("JR NOTE: setting up the Eye Killer (haha AI Killer) to actulaly kill, did it work?")
        this.makeBeatsMyOwn(beats);
    }
}   
