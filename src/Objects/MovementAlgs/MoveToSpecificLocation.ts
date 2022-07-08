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

    pickNewDirection = ()=>{
        //vary between picking x or y so you don't look like a robot so much
        if(this.entity.rand.nextDouble()>0.5){
            //if object x is bigger than mine, need to go right, so d
            if(this.x>this.entity.x){
                this.entity.direction = Direction.RIGHT;
            }else{
                this.entity.direction =Direction.LEFT;
            }
        }else{
            //if object y is bigger than mine, need to go down, so s
            if(this.y>this.entity.y){
                this.entity.direction = Direction.DOWN;
            }else{
                this.entity.direction = Direction.UP;
            }
        }
        
    }
   
}