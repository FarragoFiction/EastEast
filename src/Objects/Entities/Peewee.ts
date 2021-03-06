//base level Entity object. quotidians can turn into anything

import { Movement } from "../MovementAlgs/BaseMovement";
import { NoMovement } from "../MovementAlgs/NoMovement";
import { Room } from "../RoomEngine/Room";
import { StoryBeat } from "../RoomEngine/StoryBeat";
import { all_themes } from "../Theme";
import { ENDINGS, WEB, TWISTING, CLOWNS } from "../ThemeStorage";
import { Action } from "./Actions/BaseAction";
import { Feel } from "./Actions/Feel";
import { GoEast } from "./Actions/GoEast";
import { GoNorth } from "./Actions/GoNorth";
import { GoSouth } from "./Actions/GoSouth";
import { GoWest } from "./Actions/GoWest";
import { Help } from "./Actions/Help";
import { Listen } from "./Actions/Listen";
import { Look } from "./Actions/Look";
import { Smell } from "./Actions/Smell";
import { StopMoving } from "./Actions/StopMoving";
import { Taste } from "./Actions/Taste";
import { Direction, Quotidian } from "./Quotidian";
import { AiBeat } from "./StoryBeats/BaseBeat";



//what, did you think any real being could be so formulaic? 
//regarding the real peewee, wanda is actually quite THRILLED there is a competing parasite in the Echidna distracting the immune system (and tbf, preventing an immune disorder in the form of the eye killer)
//the universe is AWARE of the dangers to it and endlessly expands its immune system response
//becoming ever more inflamed
//but it can never be enough
export class Peewee extends Quotidian{

    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;
    //only for peewee
    possibleActions: Action[]  = [new StopMoving(),new Look(),new Listen(), new Smell(),new Feel(), new Help(), new Taste(),new GoNorth(),new GoEast(),new GoSouth(),new GoWest()]; //ordered by priority
    //TODO: things in here peewee should do automatically, based on ai triggers. things like him reacting to items.

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg:Movement = new NoMovement(this);
    //TODO have a movement algorithm (effects can shift this)
    /*
    example movement algorithm
    * random
    * searching pattern
    * to north
    * to south
    * to east
    * to ENTITY
    * to OBJECT
    */
    //TODO have a list of Scenes (trigger, effect, like quest engine from NorthNorth)

    constructor(room: Room, x: number, y:number){
        const sprite = {
            default_src:{src:"Peewee/left.gif",width:90,height:90},
            left_src:{src:"Peewee/left.gif",width:90,height:90},
            right_src:{src:"Peewee/right.gif",width:90,height:90},
            up_src:{src:"Peewee/back.gif",width:45,height:90},
            down_src:{src:"Peewee/front.gif",width:45,height:90}

        };
        console.log("JR NOTE: peewee should have an ongoing storybeat for commenting on anything he's near, just on his own, plus eventually one for trying to kill the universe")
        const beats:AiBeat[] = [];
        super(room,"Peewee", x,y,[all_themes[ENDINGS],all_themes[WEB],all_themes[TWISTING],all_themes[CLOWNS]],sprite,"It's you. After all this time.", beats);
    }


    //peewee's ai is user based. you can tell him to do various actions. 
    //there is no trigger. only actions.
    processStorybeat=(beat: StoryBeat)=>{
        this.container.id = "PeeweePuppet"
        for(let action of this.possibleActions){
            const words = beat.command.split(" ");
            for(let word of words)
            if(action.recognizedCommands.includes(word.toUpperCase())){
                beat.response = action.applyAction(this,this.room);
                return;
            }
        }

        if(beat.response.trim() === ""){
            beat.response = new Action().applyAction(this,this.room);
        }

    }


}
