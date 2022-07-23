
import { initStats } from "./Objects/Stat";
import {initThemes } from "./Objects/Theme";

import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
import { Maze } from "./Objects/RoomEngine/Maze";
window.onload = async()=>{
    const ele = document.querySelector("#current-room") as HTMLElement;
    const storySoFar = document.querySelector(".story-so-far") as HTMLElement;
    storySoFar.innerHTML  = "";
    initStats();
    initThemes();
    const seed = 85;
    if(ele && storySoFar){
        new Maze(ele,storySoFar, new SeededRandom(seed));
    }

}



//the text should be a javascript file exporting const text.
export function loadSecretText(location:string){
    return require(`./${location}`).text
  }
