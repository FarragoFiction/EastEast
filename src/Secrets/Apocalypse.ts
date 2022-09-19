import { loadSecretText } from "..";
import { createElementWithId, createElementWithIdAndParent, sleep } from "../Utils/misc";
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
    terminal? :HTMLElement;
    minigame?: TypingMiniGame;
    levelTimes:string[] = [];

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
        this.minigame = new TypingMiniGame(this.terminal,"True confessions of a Doctor. Please Listen. I am. Trying. The 12 Call To Me. The Sins Must Be Clensed. I do not Know how much Longer I can Hold Out.", this.handleCallback);
        //good job: can you go faster?

    }

    handleCallback = (text: string, loadNext= false, time?:string)=>{
        this.transcript(text);
        if(loadNext){
            if(time){
                this.levelTimes.push(time);
            }
            this.loadNextPassword();
        }
    }
    
    loadNextPassword = ()=>{
        console.log("JR NOTE: loading next password")
        this.current_index ++;
        this.loadPassword();
    }

    loadPassword = () => {
        if(!this.terminal){
            this.transcript("What did you do?");
            return;
        }
        this.terminal.innerHTML = "";
        console.log("JR NOTE: loading password")

        if(Object.values(docSlaughtersFiles).length <= this.current_index){
            this.transcript("Thank you for practicing your typing. Do you Understand what you have learned? Please tell me you Understand...");

        }
        const secret = Object.values(docSlaughtersFiles)[this.current_index];
        console.log("JR NOTE: loading next password secret is", secret)



        this.transcript(`
            Level Times: ${this.levelTimes.map((time,level)=>`Level_${level+1}:${time}`).join(", ")}
        Please practice typing the following, entirely random, words, in order of difficulty:`);
        const text = loadSecretText(secret.text);
        if(text.trim() != ""){
            this.minigame?.parseText(text);
        }
    }

    transcript = async (linesUnedited: string) => {
        if(!this.terminal){
            return;
        }
        const lines = linesUnedited.split("\n");

        for (let line of lines) {
            const element = createElementWithIdAndParent("p",this.terminal);
            this.typeWrite(element,line);
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


