//given an Entity (which will have access to location and any other pertinent information)

import { getRandomNumberBetween } from "../../Utils/NonSeededRandUtils";
import { Direction, Quotidian } from "../Quotidian";
import { Movement } from "./BaseMovement";

//decides where to move next.
export class RandomMovement extends Movement{

    pickNewDirection = ()=>{
        if(Math.random() > 0.75){
            this.entity.direction = getRandomNumberBetween(1,4);
        }
    }
   
}