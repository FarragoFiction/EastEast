
import { initStats } from "./Objects/Stat";
import { all_themes, initThemes } from "./Objects/Theme";
import { CLOWNS, ENDINGS, TWISTING, WEB } from "./Objects/ThemeStorage";
import {albhed_map, initRabbitHole} from "./Secrets/PasswordStorage";
import { randomRoomWithThemes, Room } from "./Objects/RoomEngine/Room";
import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
import { Maze } from "./Objects/RoomEngine/Maze";
window.onload = async()=>{
    const ele = document.querySelector("#current-room") as HTMLElement;
    const storySoFar = document.querySelector(".story-so-far") as HTMLElement;
    initStats();
    initThemes();
    const seed = getRandomNumberBetween(1,113);
    if(ele && storySoFar){
        new Maze(ele,storySoFar, new SeededRandom(seed));
    }

}



//the text should be a javascript file exporting const text.
export function loadSecretText(location:string){
    return require(`./${location}`).text
  }
