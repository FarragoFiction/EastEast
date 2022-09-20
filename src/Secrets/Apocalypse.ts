import { loadSecretText } from "..";
import { saveTime } from "../Utils/LocalStorageUtils";
import { createElementWithId, createElementWithIdAndParent, sleep } from "../Utils/misc";
import { getTimeStringBuff } from "../Utils/StringUtils";
import { docSlaughtersFiles } from "./PasswordStorage";
import { TypingMiniGame } from "./TypingMinigame";

const defaultSpeed = 0;
export class ApocalypseEngine {
    typing = false;
    passwords = [];
    parent: HTMLElement;
    speed = defaultSpeed;
    clickAudio = new Audio("audio/web_SoundFX_254286__jagadamba__mechanical-switch.mp3");
    //where in the password list are you.
    current_index = -1;
    terminal?: HTMLElement;
    minigame?: TypingMiniGame;
    levelTimes: string[] = [];

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.init();
    }

    init = () => {
        if (!this.parent) {
            return;
        }
        window.onmousedown = () => {
            this.speed = 0;
        }
        window.onmouseup = () => {
            this.speed = defaultSpeed;
        }

        window.ontouchstart = () => {
            this.speed = 0;
        }
        window.ontouchend = () => {
            this.speed = defaultSpeed;
        }
        this.parent.style.cssText =
            `font-family: gamer;
        color: #00ff00;
        font-size: 18px;
        background:black;`;

        const crt = createElementWithId("div", "crt")
        const scanline = createElementWithIdAndParent("div", crt, undefined, "scanline")
        const lines = createElementWithIdAndParent("div", crt, undefined, "lines")
        this.terminal = createElementWithIdAndParent("div", crt, "terminal")



        this.parent.append(crt);
        this.transcript("Please practice typing the following words...");
        this.minigame = new TypingMiniGame(this.terminal, `True confessions of a Doctor: 
        "Please Listen. I am. Trying. The 12 Call To Me. The Sins Must Be Cleansed. I do not Know how much Longer I can Hold Out. L-0-17 was right."
        
        Thank you,

Dr. Fiona Slaughter`, this.handleCallback);
        //good job: can you go faster?

    }

    //display text, load the next bit or handle time stuff, yes this is gross and ugly so sue me
    handleCallback = (text: string, loadNext = false, time?: number) => {
        if (text.trim() !== "") {
            this.transcript(text);
        }
        if (time) {
            this.levelTimes.push(getTimeStringBuff(new Date(time)));
            console.log("JR NOTE: trying to save time")
            saveTime(this.levelTimes.length - 1, time);
        }
        if (loadNext) {

            this.loadNextPassword();
        }
    }

    loadNextPassword = () => {
        this.current_index++;
        this.loadPassword();
    }

    loadPassword = () => {
        if (!this.terminal) {
            this.transcript("What did you do?");
            return;
        }
        this.terminal.innerHTML = "";

        if (Object.values(docSlaughtersFiles).length <= this.current_index) {
            this.transcript("Thank you for practicing your typing. Do you Understand what you have learned? Please tell me you Understand...");

        }
        const secret = Object.values(docSlaughtersFiles)[this.current_index];



        this.transcript(`
            Level Times: ${this.levelTimes.map((time, level) => `Level_${level + 1}:${time}`).join(", ")}
        Please practice typing the following, entirely random, words, in order of difficulty:`);
        const text = loadSecretText(secret.text);
        if (text.trim() != "") {
            this.minigame?.parseText(text);
        }
    }

    transcript = async (linesUnedited: string) => {
        if (!this.terminal) {
            return;
        }
        const lines = linesUnedited.split("\n");

        for (let line of lines) {
            const element = createElementWithIdAndParent("p", this.terminal);
            this.typeWrite(element, line);
        }
    }

    typeWrite = async (element: HTMLElement, text: string) => {
        this.typing = true;
        let skipping = false;
        for (let i = 0; i < text.length; i++) {

            if (!skipping) {
                await sleep(this.speed);

                this.clickAudio.play();
                element.innerHTML += text.charAt(i);
            }
            skipping = false;
            if (!this.typing) {
                break;
            }
        }
    }


}


