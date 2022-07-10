import { EntityName } from "typescript";
import { initRabbitHole } from "../../Secrets/PasswordStorage";
import { createElementWithIdAndParent } from "../../Utils/misc";
import SeededRandom from "../../Utils/SeededRandom";
import { Peewee } from "../Entities/Peewee";
import { Quotidian } from "../Entities/Quotidian";
import { all_themes } from "../Theme";
import { ENDINGS, WEB, TWISTING, CLOWNS } from "../ThemeStorage";
import { randomRoomWithThemes, Room } from "./Room";
import { StoryBeat } from "./StoryBeat";

export class Maze {

    rand: SeededRandom;
    ele: HTMLElement;
    room?: Room;
    peewee?: Peewee; //all are quotidians in this twisted farce of a play. could a simulation capture their nuance? their depth?
    storybeats: StoryBeat[] = []; //can be added to by peewee and by the ai
    storySoFar: HTMLElement;
    fxAudio = new Audio("audio/264828__cmdrobot__text-message-or-videogame-jump.mp3")

    constructor(ele: HTMLElement, storySoFar: HTMLElement, rand: SeededRandom,) {
        this.rand = rand;
        this.ele = ele;
        this.storySoFar= storySoFar;
        this.initialize();
    }

    initialize = async () => {
        const themes = [all_themes[ENDINGS], all_themes[WEB], all_themes[TWISTING], all_themes[CLOWNS]]
        this.room = await randomRoomWithThemes(this,this.ele, themes, this.rand);
        await this.room.propagateMaze(3);
        console.log("JR NOTE: room now has these children: ", this.room.children)
        this.room.render();
        this.peewee = this.room.peewee;
        initRabbitHole(this.room);
        this.handleCommands();
    }

    addStorybeat = (beat: StoryBeat)=>{
        if(this.peewee){
            this.peewee.processStorybeat(beat);
        }
        this.fxAudio.play();
        this.storybeats.push(beat);
        const beatele = createElementWithIdAndParent("div",this.storySoFar,undefined,"storybeat")
        const commandele = createElementWithIdAndParent("div",beatele,undefined,"historical-command")
        const responseele = createElementWithIdAndParent("div",beatele,undefined,"response")
        commandele.innerHTML = beat.command;
        responseele.innerHTML = beat.response;

    }

    handleCommands = () => {
        const form = document.querySelector("#puppet-command") as HTMLFormElement;
        const input = document.querySelector("#puppet-input") as HTMLInputElement;
        console.log("JR NOTE: form and input are", {form, input})
        if (form && input) {
            console.log("JR NOTE: setting up both")
            form.onsubmit = (event: SubmitEvent) => {
                event.preventDefault();
                this.addStorybeat(new StoryBeat(input.value, ""));
                input.value="";
                return false;
            }
        }
    }


}