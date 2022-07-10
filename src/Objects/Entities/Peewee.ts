//base level Entity object. quotidians can turn into anything

import { Movement } from "../MovementAlgs/BaseMovement";
import { MoveToEastDoor } from "../MovementAlgs/MoveToEastDoor";
import { MoveToNorthDoor } from "../MovementAlgs/MoveToNorthDoor";
import { MoveToSouthDoor } from "../MovementAlgs/MoveToSouthDoor";
import { MoveToWestDoor } from "../MovementAlgs/MoveToWestDoor";
import { NoMovement } from "../MovementAlgs/NoMovement";
import { Room } from "../RoomEngine/Room";
import { StoryBeat } from "../RoomEngine/StoryBeat";
import { all_themes } from "../Theme";
import { ENDINGS, WEB, TWISTING, CLOWNS } from "../ThemeStorage";
import { Action } from "./Actions/BaseAction";
import { Direction, Quotidian } from "./Quotidian";



//what, did you think any real being could be so formulaic? 
export class Peewee extends Quotidian{

    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;
    possibleActions: Action[]  = []; //ordered by priority

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg:Movement = new MoveToWestDoor(this);
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

    constructor(room: Room, x: number, y:number, width: number, height: number){
        super(room,"Peewee", x,y,width,height,[all_themes[ENDINGS],all_themes[WEB],all_themes[TWISTING],all_themes[CLOWNS]],"images/Walkabout/Sprites/peewee.PNG","It's you. After all this time.");
    }

    //peewee's ai is user based. you can tell him to do various actions. 
    //there is no trigger. only actions.
    processStorybeat=(beat: StoryBeat)=>{

        for(let action of this.possibleActions){
            if(action.recognizedCommands.includes(beat.command.toUpperCase())){
                beat.response = action.applyAction(this,this.room);
            }
        }

        if(beat.response.trim() === ""){
            beat.response = new Action().applyAction(this,this.room);
        }

    }


}
