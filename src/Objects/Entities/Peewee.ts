//base level Entity object. quotidians can turn into anything

import { Movement } from "../MovementAlgs/BaseMovement";
import { MoveToNorthDoor } from "../MovementAlgs/MoveToNorthDoor";
import { NoMovement } from "../MovementAlgs/NoMovement";
import { Room } from "../RoomEngine/Room";
import { all_themes } from "../Theme";
import { ENDINGS, WEB, TWISTING, CLOWNS } from "../ThemeStorage";
import { Direction, Quotidian } from "./Quotidian";



//what, did you think the REAL eye killer would be so formulaic? 
export class Peewee extends Quotidian{

    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg:Movement = new MoveToNorthDoor(this);
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


}
