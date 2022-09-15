
import { initStats } from "./Objects/Stat";
import { initThemes } from "./Objects/Theme";

import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
import { Maze } from "./Objects/RoomEngine/Maze";
import { createElementWithIdAndParent } from "./Utils/misc";
import { visitFunctionBody } from "typescript";


let maze: Maze;
const handleClick = () => {
    if (maze) {
        const button = document.querySelector("#startbutton") as HTMLElement;
        if (button) {
            button.remove();
            maze.begin();
        }
        window.removeEventListener("click", handleClick);
    }

}


const itsFriday = ()=>{
    const body = document.querySelector("body");
    if(body){
        body.innerHTML = "";
        const ele = createElementWithIdAndParent("div", body, "ItsFridaySoEastIsRestingHaveThisInstead");
        ele.innerHTML  = `
        <iframe class='fuckedup' width="${window.innerWidth}" height="${window.innerHeight}" src="https://www.youtube-nocookie.com/embed/Ti1D9t8n0qA?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;

    }
}

window.onload = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const friday = urlParams.get('friday');
    if(new Date().getDay() === 5 ||friday ){
        itsFriday();
        return;
    }
    const ele = document.querySelector("#current-room") as HTMLElement;
    const storySoFar = document.querySelector(".story-so-far") as HTMLElement;
    storySoFar.innerHTML = "";
    const button = createElementWithIdAndParent("button", storySoFar, "startbutton");
    button.innerText = "Click To Begin!";
    initStats();
    initThemes();
    const seed = 85;
    if (ele && storySoFar) {
        maze = new Maze(ele, storySoFar, new SeededRandom(seed));
    }

    window.addEventListener("click", handleClick);

}



//the text should be a javascript file exporting const text.
export function loadSecretText(location: string) {
    return require(`./${location}`).text
}


