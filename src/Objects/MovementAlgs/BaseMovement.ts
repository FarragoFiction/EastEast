//given an Entity (which will have access to location and any other pertinent information)

import { Quotidian } from "../Quotidian";

//decides where to move next.
export class Movement{
    entity: Quotidian;

    constructor(entity: Quotidian){
        this.entity = entity;
    }

    tick = ()=>{
        //bog simple, just go up.
        //dont' worry about rendering, you're just moving the quotidian, it'll render itself
        this.entity.y += this.entity.speed;
    }

}