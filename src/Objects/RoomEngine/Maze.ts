import { initRabbitHole } from "../../Secrets/PasswordStorage";
import { createElementWithIdAndParent } from "../../Utils/misc";
import SeededRandom from "../../Utils/SeededRandom";

import { FollowPeewee, SassObject } from "../Entities/StoryBeats/BeatList";
import { all_themes } from "../Theme";
import { ENDINGS, WEB, SPYING, ZAP, BUGS, TECHNOLOGY, OBFUSCATION } from "../ThemeStorage";
import { ChantingEngine } from "./ChantingEngine";
import { randomRoomWithThemes, Room } from "./Room";
import { StoryBeat } from "./StoryBeat";
//reminder that order of imports is going to matter, if wrong order 'class extends value undefined'
import { EyeKiller } from "../Entities/Blorbos/EyeKiller";
import { Peewee } from "../Entities/Blorbos/Peewee";
import { Quotidian } from "../Entities/Blorbos/Quotidian";
import { Snail } from "../Entities/Blorbos/SnailFriend";
import { JR } from "../Entities/Blorbos/JR";
import { Innocent } from "../Entities/Blorbos/Innocent";
import { Match } from "../Entities/Blorbos/Match";
import { Underscore } from "../Entities/Blorbos/Underscore";
export class Maze {

    rand: SeededRandom;
    ele: HTMLElement;
    room?: Room;
    peewee?: Peewee; //all are quotidians in this twisted farce of a play. could a simulation capture their nuance? their depth?
    storybeats: StoryBeat[] = []; //can be added to by peewee and by the ai
    storySoFar: HTMLElement;
    boopAudio = new Audio("audio/264828__cmdrobot__text-message-or-videogame-jump.mp3")
    doorAudio = new Audio("audio/close_door_1.mp3")
    chantingEngine = new ChantingEngine();
    blorbos: Quotidian[] = [];//list of all possible blorbos that can spawn.

    constructor(ele: HTMLElement, storySoFar: HTMLElement, rand: SeededRandom,) {
        this.rand = rand;
        this.ele = ele;
        this.storySoFar = storySoFar;
        this.initialize();
    }

    initialize = async () => {
        const themes = [all_themes[ENDINGS], all_themes[WEB], all_themes[TECHNOLOGY]]
        this.room = await randomRoomWithThemes(this, this.ele, themes, this.rand);
        this.initializeBlorbos();
        await this.room.propagateMaze(3);
        this.peewee = new Peewee(this.room, 150, 350);
        this.changeRoom(this.room, false);
        initRabbitHole(this.room);
    }

    initializeBlorbos = () => {
        if (this.room) {
            this.blorbos.push(new Underscore(this.room, 150,150), new Quotidian(this.room, "Quotidian", 150, 350, [all_themes[SPYING]], { default_src: { src: "humanoid_crow.gif", width: 50, height: 50 } }, { default_src: { src: "Twisting_Crow.gif", width: 50, height: 50 } }, "testing", [SassObject]));
            this.blorbos.push(new Snail(this.room, 150, 150));
            this.blorbos.push(new EyeKiller(this.room, 150, 150));
            this.blorbos.push(new Innocent(this.room, 150, 150));
            this.blorbos.push(new Match(this.room, 150, 150));
            this.blorbos.push(new JR(this.room, 150, 150));

        }
    }

    begin = () => {
        this.handleCommands();
        this.room?.render();
        this.chantingEngine.start();
    }

    playDoorSound = () => {
        try {
            this.doorAudio.play();
        } catch (e) {
            console.warn("JR NOTE: remember to require a click before starting")
        }
    }

    spawnBlorbos = () => {
        if (!this.room) {
            return;
        }
        const blorbosToTest = ["Killer", "Underscore"];
        for (let blorbo of this.blorbos) {
            console.log("JR NOTE: can i spawn ", blorbo)
            if (!blorbo.owner) {//if you're in someones inventory, no spawning for you
                for (let theme of blorbo.themes) {
                    if (this.room.themes.includes(theme)) {
                        this.room.addBlorbo(blorbo);
                    }
                }

                for (let name of blorbosToTest) {
                    if (blorbo.name.includes(name)) {
                        this.room.addBlorbo(blorbo);
                    }
                }
            }

        }
    }

    changeRoom = (room: Room, render = true) => {
        if (this.room) {
            this.room.teardown();
        }
        if (this.peewee) {
            this.peewee.x = 150;
            this.peewee.y = 350;
        }
        this.room = room;
        this.room.peewee = this.peewee;
        if (this.peewee) {
            room.addBlorbo(this.peewee);
            this.peewee.goStill();
        }
        this.spawnBlorbos();
        if (render) {
            this.room.render();
        }
    }

    addCommandStorybeat = (beat: StoryBeat) => {
        if (this.peewee) {
            this.peewee.processStorybeat(beat);
        }
        this.addStorybeat(beat);
    }

    checkVoid = (beat: StoryBeat)=>{
        for(let blorbo of this.blorbos){
            if(blorbo.themes.includes(all_themes[OBFUSCATION])){
                beat.checkVoid(blorbo.name);
                return;
            }
        }
        if(!this.room){
            return;
        }
        for(let item of this.room?.items){
            if(item.themes.includes(all_themes[OBFUSCATION])){
                beat.checkVoid(item.name);
                return;
            }
        }
    }

    truthConsole = (title: string, text: string)=>{
        const trueStyle = "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;";

        console.log(`%c${title}:%c  ${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;",trueStyle);

    }

    addStorybeat = (beat: StoryBeat) => {
        this.boopAudio.play();
        this.storybeats.push(beat);
        const beatele = createElementWithIdAndParent("div", this.storySoFar, undefined, "storybeat")
        const commandele = createElementWithIdAndParent("div", beatele, undefined, "historical-command")
        const responseele = createElementWithIdAndParent("div", beatele, undefined, "response")
        commandele.innerHTML = `>${beat.command}`;
        responseele.innerHTML = beat.response;
        this.checkVoid(beat);
        if(beat.commandVoided){
            commandele.classList.add("void");
        }

        if(beat.responseVoided){
            responseele.classList.add("void");
        }

        if(beat.truthfulComment){
            this.truthConsole(beat.command,beat.truthfulComment)
        }
        this.storySoFar.scrollTo(0, this.storySoFar.scrollHeight);
    }

    handleCommands = () => {
        const form = document.querySelector("#puppet-command") as HTMLFormElement;
        const input = document.querySelector("#puppet-input") as HTMLInputElement;
        console.log("JR NOTE: form and input are", { form, input })
        if (form && input) {
            console.log("JR NOTE: setting up both")
            form.onsubmit = (event: SubmitEvent) => {
                event.preventDefault();
                this.addCommandStorybeat(new StoryBeat(input.value, ""));
                input.value = "";
                return false;
            }
            this.addCommandStorybeat(new StoryBeat("Peewee: Await Commands", "Peewee is awaiting the Observers commands. Also: JR NOTE: eye killer kills if she's close enough, take object"));
        }
    }


}