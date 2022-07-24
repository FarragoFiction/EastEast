import { Quotidian } from "../Quotidian";

export  class Trigger{
    invert = false;
    //IMPORTANT. DO NOT TRY TO STORE ANY INFORMAITON INSIDE THIS, OR WHEN A STORY BEAT CLONES ITSELF THERE WILL BE PROBLEMS

    constructor(invert = false){
        this.invert = invert;
    }

   toString = ()=>{
       //format this like it might start with either because or and
       return "they could";
   }

   triggered = (owner: Quotidian )=>{
       return true; //JR NOTE: children will overwrite this
   }
   
}