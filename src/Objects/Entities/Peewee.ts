//base level Entity object. quotidians can turn into anything

import { Movement } from "../MovementAlgs/BaseMovement";
import { NoMovement } from "../MovementAlgs/NoMovement";
import { Room } from "../RoomEngine/Room";
import { StoryBeat } from "../RoomEngine/StoryBeat";
import { all_themes } from "../Theme";
import { ENDINGS, WEB, TWISTING, CLOWNS } from "../ThemeStorage";
import { Action } from "./Actions/BaseAction";
import { GoEast } from "./Actions/GoEast";
import { GoNorth } from "./Actions/GoNorth";
import { GoSouth } from "./Actions/GoSouth";
import { GoWest } from "./Actions/GoWest";
import { StopMoving } from "./Actions/StopMoving";
import { Direction, Quotidian } from "./Quotidian";



//what, did you think any real being could be so formulaic? 
export class Peewee extends Quotidian{

    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;
    possibleActions: Action[]  = [new StopMoving(), new GoNorth(),new GoEast(),new GoSouth(),new GoWest()]; //ordered by priority
    //TODO: things in here peewee should do automatically, based on ai triggers. things like him reacting to items.
    possibleReactions: Action[]  = [];

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
        super(room,"Peewee", x,y,90,90,[all_themes[ENDINGS],all_themes[WEB],all_themes[TWISTING],all_themes[CLOWNS]],"Peewee/Peeweee Walk left.gif","It's you. After all this time.");
    }

    //peewee's ai is user based. you can tell him to do various actions. 
    //there is no trigger. only actions.
    processStorybeat=(beat: StoryBeat)=>{

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
