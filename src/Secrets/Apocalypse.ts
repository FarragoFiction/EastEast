import { loadSecretText } from "..";
import { createElementWithId, createElementWithIdAndParent, sleep } from "../Utils/misc";

const defaultSpeed = 200;
export class ApocalypseEngine {
    typing = false;
    passwords = [];

    speed = defaultSpeed;
    clickAudio = new Audio("audio/web_SoundFX_254286__jagadamba__mechanical-switch.mp3");
    text = "";

    parent: HTMLElement;
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
        const terminal = createElementWithIdAndParent("div", crt, "terminal")



        this.parent.append(crt);
        this.transcript("Please practice typing the following words...");
        //good job: can you go faster?

    }

    transcript = async (linesUnedited: string) => {


        const lines = linesUnedited.split("\n");

        const terminal = document.querySelector("#terminal") as HTMLElement;
        if (!terminal) {
            return;
        }
        terminal.innerHTML = "";

        for (let line of lines) {
            const element = document.createElement("p");
            terminal.append(element);
            await this.typeWrite(terminal, element, line)
            await sleep(this.speed * 10);

        }
    }


    //this version of typeWrite skips certain tags but does them all at once
    //(necessary to capture html)
    //v1 just skips lines that start with [
    //and v2 doesn't play a sound or sleep between [ and ] tags
    //but neither is sufficient to handle html, so v3 is born
    //i will, of course, forget where v3 is.
    //v2, btw, is in SecurityLog
    //and v1 is in ATranscript and ASecondTranscript
    //because YES the code is intentionally a shitty maze for my future self
    //and i guess any future Heirs
    typeWrite = async (scroll_element: HTMLElement, element: HTMLElement, text: string) => {
        this.typing = true;
        let skipping = false;
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) === "[" || text.charAt(i) === "<") {
                skipping = true;
                i = this.doChunkAllAtOnce(element, i, text);
            }
            if (!skipping) {
                await sleep(this.speed);

                this.clickAudio.play();
                element.innerHTML += text.charAt(i);
            }
            scroll_element.scrollTop = scroll_element.scrollHeight;
            skipping = false;
            if (!this.typing) {
                break;
            }
        }
    }

    doChunkAllAtOnce = (ele: HTMLElement, start_index: number, text: string) => {
        const offset = 0;
        //look for ending offset
        //create new span element
        //have its inner html be the chunk
        //return the new stop index
        //ignore any tag stuff before this point (it was already processed)
        const subtext = text.substring(start_index)
        const starting_char = text[start_index];
        let charsTillEnd = 0;
        if (starting_char === "<") {
            charsTillEnd = subtext.indexOf(">") + 1
        } else if (starting_char === "[") {
            charsTillEnd = subtext.indexOf("]") + 1
        }

        ele.innerHTML = text.substring(0, start_index + charsTillEnd);
        return start_index + charsTillEnd;
    }
}


