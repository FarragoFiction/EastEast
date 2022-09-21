import { loadSecretText } from "..";
import { TIME_KEY } from "../Utils/constants";
import { saveTime, valueAsArray } from "../Utils/LocalStorageUtils";
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
    current_index = 0;
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
        this.miniGameOrLevelSelect()
        //good job: can you go faster?

    }

    miniGameOrLevelSelect = () => {
        const storedValues = localStorage.getItem(TIME_KEY);
        if (storedValues) {
            if(storedValues?.toUpperCase()?.includes("ZAMPANIO")){
                this.loadJRBullshit();
            }else{
                this.levelSelect();
            }
        } else {
            this.levelSelect();
        }
    }

    levelSelect = ()=>{
        if (!this.terminal) {
            return;
        }
        this.transcript("You have completed the following levels:");
        const parsedValues = valueAsArray(TIME_KEY);

        const div = createElementWithIdAndParent("div",this.terminal);
        div.innerHTML = `
        
         <p>${parsedValues.length} out of ${Object.values(docSlaughtersFiles).length} Levels Unlocked! Click one to resume gameplay from it! Don't worry about trying to do all of them in one sitting, your level progress will be saved!</p>

    
        `;

        const parent =  createElementWithIdAndParent("ol", this.terminal);
        for (let value of parsedValues){
            const ele = createElementWithIdAndParent("li", parent);
            ele.innerHTML = `<a href = '#'>${getTimeStringBuff(new Date(value))}</a>`;
            ele.onclick = ()=>{
                this.current_index = parsedValues.indexOf(value);
                this.loadPassword(true);
            }
        }

        if(parsedValues.length !==Object.values(docSlaughtersFiles).length){
            const ele = createElementWithIdAndParent("li", parent);
            ele.innerHTML = `<a href = '#'>TBD</a>`;
            ele.onclick = ()=>{
                this.current_index = parsedValues.length;
                this.loadPassword(true);
            }
        }


    }

    loadJRBullshit = ()=>{
        if (!this.terminal) {
            return;
        }
        localStorage.removeItem(TIME_KEY);
        this.transcript("Hi yes hello , JR here! :) :) :)");
        this.minigame = new TypingMiniGame(this.terminal, `
        Oh! Look at you! Look at you go! Holy shit! I'm so, so proud! Here you are, not only did you find this secret area. (How DID you find it, by the way? Was it too obvious? Collecting all 9 Artifacts DOES always cause the apocalypse. It seems a univeral constant of Zampanio.)
        
        But I'm getting distracted! You realized you could outright hack your local storage! (Mind Powers!) (I added that previous lil bit cuz i find it so fucking funny that the typing mini game says "this area does hack your" and adding "mind" after is just choice) But that wasn't enough for you, now was it. You had to see how far you could push it.  Now, GRANTED, I DID ask you to do this, now didn't I?

        Oh right, I'll need to undo your hacking or you'll kinda never see the full text of this. Thems the breaks!

        But I'm so hella excited! You did it! You really did it!!!  Actually...  I'm not sure what over punctuating would do to this???

        Lets find out together.

        But yeah, how are you liking East East so far?  Or my humble lil branch of Zampanio in general? Does it Inspire anything in you? Do you want to create?  I'd love seeing any and all fan works. Teach yourself how A03 works. Or programming! Write! Draw! Record what you've seen for Those Who Come After!

        Zampanio feeds on our attention. It colonizes our minds. 

        Feed it.
        
        `, this.handleCallback);
    }

    //display text, load the next bit or handle time stuff, yes this is gross and ugly so sue me
    handleCallback = (text: string, loadNext = false, time?: number) => {
        if (text.trim() !== "") {
            this.transcript(text);
        }
        if (time) {
            this.levelTimes.push(getTimeStringBuff(new Date(time)));
            console.log("JR NOTE: trying to save time")
            const best = saveTime(this.current_index, time);
            best && this.transcript("Personal Best!");
        }
        if (loadNext) {

            this.loadNextPassword();
        }
    }

    loadNextPassword = () => {
        this.current_index++;
        this.loadPassword();
    }

    loadVocabularyFromPreviousLevels = ()=>{
        if (!this.terminal) {
            return;
        }
        if(!this.minigame){
            this.minigame = new TypingMiniGame(this.terminal, null, this.handleCallback);
        }
        for(let i = 0; i<this.current_index; i++){
            const secret = Object.values(docSlaughtersFiles)[i];
            const text = loadSecretText(secret.text);
            this.minigame.parseText(text, false); //make sure it doesn't try to start the game, just loading the text so i don't have to keep typing common words
        }
    }

    loadPassword = (loadVocab = false) => {
        console.log("JR NOTE: loading password")

        if (!this.terminal) {
            this.transcript("What did you do?");
            return;
        }
        if(!this.minigame){
            this.minigame = new TypingMiniGame(this.terminal, null, this.handleCallback);
        }
        if(loadVocab){
            this.loadVocabularyFromPreviousLevels();
        }
        this.terminal.innerHTML = "";

        if (Object.values(docSlaughtersFiles).length <= this.current_index) {
            this.transcript("Thank you for practicing your typing. Do you Understand what you have learned? Please tell me you Understand...");

        }
        const secret = Object.values(docSlaughtersFiles)[this.current_index];

        console.log("JR NOTE: loading password secret is", secret, "index was", this.current_index)


        this.transcript(`
            Level Times: ${this.levelTimes.map((time, level) => `Level_${level + 1}:${time}`).join(", ")}
        Please practice typing the following, entirely random, words, in order of difficulty:`);
        const text = loadSecretText(secret.text);
        if (text.trim() != "") {
            this.minigame.parseText(text);
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


