
import { initStats } from "./Objects/Stat";
import {initThemes } from "./Objects/Theme";

import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
import { Maze } from "./Objects/RoomEngine/Maze";
import { createElementWithIdAndParent } from "./Utils/misc";


let maze:Maze;
const handleClick = ()=>{
    if(maze){
        const button = document.querySelector("#startbutton") as HTMLElement;
        button.remove();
        maze.begin();
        window.removeEventListener("click", handleClick);
    }

}
window.onload = async()=>{
    const ele = document.querySelector("#current-room") as HTMLElement;
    const storySoFar = document.querySelector(".story-so-far") as HTMLElement;
    storySoFar.innerHTML  = "";
    const button = createElementWithIdAndParent("button",storySoFar,"startbutton");
    button.innerText = "Click To Begin!";
    initStats();
    initThemes();
    const seed = 85;
    if(ele && storySoFar){
        maze = new Maze(ele,storySoFar, new SeededRandom(seed));
    }

    window.addEventListener("click", handleClick);

}



//the text should be a javascript file exporting const text.
export function loadSecretText(location:string){
    return require(`./${location}`).text
  }
