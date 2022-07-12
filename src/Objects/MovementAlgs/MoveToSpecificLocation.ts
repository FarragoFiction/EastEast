//given an Entity (which will have access to location and any other pertinent information)

import { Direction, Quotidian } from "../Entities/Quotidian";
import { Movement } from "./BaseMovement";

//decides where to move next.
export class MoveToSpecificLocation extends Movement{
    x: number;
    y: number;

    constructor(x:number,y:number,entity: Quotidian){
        super(entity);
        this.x = x;
        this.y = y;
    }

    moveX = (remaining_x: number)=>{
        //if object x is bigger than mine, need to go right, so d
        if(remaining_x>0){
            this.entity.direction = Direction.RIGHT;
        }else{
            this.entity.direction =Direction.LEFT;
        }
    }

    moveY = (remaining_y: number)=>{
            //if object y is bigger than mine, need to go down, so s
            if(remaining_y >0){
                this.entity.direction = Direction.DOWN;
            }else{
                this.entity.direction = Direction.UP;
            }
    }

    pickNewDirection = ()=>{
        let remaining_x = this.x - this.entity.x;
        let remaining_y = this.y - this.entity.y;
        console.log("JR NOTE: remaining x,y is ",{remaining_x,remaining_y})
        //vary between picking x or y so you don't look like a robot so much

        if(Math.abs(remaining_x) >Math.abs(remaining_y)){
            this.moveX(remaining_x);
        }else{
            this.moveY(remaining_y);
        }
    }
   
}