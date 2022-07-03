
import { initStats } from "./Objects/Stat";
import { all_themes, initThemes } from "./Objects/Theme";
import { CLOWNS, ENDINGS, TWISTING, WEB } from "./Objects/ThemeStorage";
import {albhed_map, initRabbitHole} from "./Secrets/PasswordStorage";
import { randomRoomWithThemes, Room } from "./Objects/RoomEngine/Room";
import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
window.onload = async()=>{
    const ele = document.querySelector("#current-room") as HTMLElement;
    initStats();
    initThemes();
    const themes = [all_themes[ENDINGS],all_themes[WEB],all_themes[TWISTING],all_themes[CLOWNS]]
    console.log("JR NOTE: todo take seed from param")
    const seed = getRandomNumberBetween(1,113);
    if(ele){
        const room = await randomRoomWithThemes(ele, themes,new SeededRandom(seed));
        room.render();
        initRabbitHole(room);

    }
}

//the text should be a javascript file exporting const text.
export function loadSecretText(location:string){
    return require(`./${location}`).text
  }
