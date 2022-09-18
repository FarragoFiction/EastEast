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
        this.minigame = new TypingMiniGame(this.terminal,"Confession of a Doctor. Please Listen.", this.loadNextPassword);
        //good job: can you go faster?

    }
    
    loadNextPassword = (text: string)=>{
        const secret = Object.values(docSlaughtersFiles)[this.current_index];
        this.transcript(text);
        this.current_index ++;
        this.loadPassword();
    }

    loadPassword = () => {
        if(!this.terminal){
            this.transcript("What did you do?");
            return;
        }
        this.terminal.innerHTML = "";
        if(Object.values(docSlaughtersFiles).length <= this.current_index){
            this.transcript("Thank you for practicing your typing. Do you Understand what you have learned? Please tell me you Understand...");

        }
        const secret = Object.values(docSlaughtersFiles)[this.current_index];

        this.transcript("Please practice typing the following, entirely random, words, in order of difficulty:");
        if(secret.text.trim() != ""){
            this.minigame?.parseText(secret.text);
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


