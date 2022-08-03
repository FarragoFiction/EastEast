//given an Entity (which will have access to location and any other pertinent information)

import { getRandomNumberBetween } from "../../Utils/NonSeededRandUtils";
import { Movement } from "./BaseMovement";

//decides where to move next.
export class SteadyMovement extends Movement{

    pickNewDirection = ()=>{
        if(Math.random() > 0.99){
            this.entity.direction = getRandomNumberBetween(1,4);
        }
    }
   
}