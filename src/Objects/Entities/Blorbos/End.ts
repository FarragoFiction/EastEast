import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { all_themes } from "../../Theme";
import { ENDINGS, KILLING, QUESTING, LONELY } from "../../ThemeStorage";
import { DeploySass } from "../Actions/DeploySass";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { FollowPeewee } from "../StoryBeats/BeatList";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { Quotidian, Direction } from "./Quotidian";




export class End extends Quotidian{
    lore = "Parker has said her soul has the shape of an Irish Wolfound.  Something friendly and big that does not understand why you find it intimidating. It thinks it is a lapdog, it just wants to be friends. Unless you are for killing. Then you are dead. Very, very, quickly dead.";

    maxSpeed = 50;
    minSpeed = 5;
    currentSpeed = 5;

    direction = Direction.UP; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"the_end2.png",width:56,height:100},

        };
        const start = "<span class='asl'>"
        const end = "</span>"

         const BreathOnObject = new AiBeat(
            [new TargetIsWithinRadiusOfSelf(5)],
            [new DeploySass(":)",[`:3`,`${start}Friend!${end}`, `${start}Hello!${end}`,`${start}Where are we going?${end}`])],
            true,
            2*60*1000
        );
        const beats:AiBeat[] = [FollowPeewee,BreathOnObject];
        super(room,"The End", x,y,[all_themes[ENDINGS],all_themes[KILLING],all_themes[QUESTING],all_themes[LONELY]],sprite,sprite,"The End Comes For Us All", beats);
    }
}
