//just leave her alone with her egg

import { addImageProcess } from "../../../Utils/URLUtils";
import { Movement } from "../../MovementAlgs/BaseMovement";
import { RandomMovement } from "../../MovementAlgs/RandomMovement";
import { PhysicalObject } from "../../PhysicalObject";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { HUNTING, KILLING, FAMILY, DARKNESS, FLOORBACKGROUND } from "../../ThemeStorage";
import { AddThemeToRoom } from "../Actions/AddThemeToRoom";
import { MeleeKill } from "../Actions/MeleeKill";
import { SpawnObjectAtFeet } from "../Actions/SpawnObjectAtFeet";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TARGETSTRING } from "../TargetFilter/baseFilter";
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

        super(room,"Eye Killer", x,y,[all_themes[HUNTING],all_themes[KILLING],all_themes[FAMILY],all_themes[DARKNESS]],sprite,sprite,"It's the Eye Killer! I'd leave her alone!", beats);
        this.breached  = true;
        this.setupAI();
    }

    setupAI = async ()=>{
        const item = all_themes[KILLING].pickPossibilityFor(this.rand, FLOORBACKGROUND)
        const baseLocation = "images/Walkabout/Objects/";
        const folder = 'UnderFloorObjects';

        const image: any = await addImageProcess(`${baseLocation}${folder}/${item.src}`) as HTMLImageElement;

        const bloodstain =  new PhysicalObject(this.room, `${TARGETSTRING}'s blood`, 0,0, image.width, image.height, [all_themes[KILLING]], 0, item.src, `Something very upsetting happened here to ${TARGETSTRING}.`);

        const beats:AiBeat[] = [
            new AiBeat(
                [new TargetIsWithinRadiusOfSelf(5)],
                [new MeleeKill("brutally stabs over and over","being shown the Eye Killer's stabs"),  new AddThemeToRoom(all_themes[KILLING]), new SpawnObjectAtFeet(bloodstain)],
                true,
                30*1000
            )  


        ];
    }
}   
