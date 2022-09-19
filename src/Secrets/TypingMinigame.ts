import { initThemes } from "../Objects/Theme";
import { createElementWithIdAndParent } from "../Utils/misc";

type WordListObject = {
    [key: string]: {
        word: string;
        typed: boolean;
        times_seen: number
    }
}

type SentenceObject = {
    text: string;
    typed: boolean;
}

export class TypingMiniGame {
    unique_word_map: WordListObject;
    callback: Function;
    content: HTMLElement
    sentences: SentenceObject[];
    //what word are you typing
    current_index = 0;

    sorted_word_list: string[]; //sorted by length

    constructor(parent: HTMLElement, original_text: string, callback: Function) {
        this.callback = callback;
        this.content = createElementWithIdAndParent("div", parent);
        this.content.style.fontSize = "42px";
        this.unique_word_map = {};
        this.sentences = [];
        this.sorted_word_list = [];
        this.parseText(original_text);

    }

    parseText = (text: string) => {
        console.log("JR NOTE: parsing text", text);
        text = text.replaceAll(/\n/g, " ");
        this.sentences = text.split(/[.?!]/g).map((sentence) => { return { text: sentence, typed: false } })
        const split_words = text.split(" ");

        for (let w of split_words) {
            let word = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
            if (word.trim() !== "") {
                if (Object.keys(this.unique_word_map).includes(word.toLowerCase())) {
                    this.unique_word_map[word] = { word: word, typed: false, times_seen: this.unique_word_map[word].times_seen + 1 }
                } else {
                    this.unique_word_map[word] = { word: word, typed: false, times_seen: 1 }
                }
            }

        }

        this.sorted_word_list = Object.keys(this.unique_word_map).sort((a: string, b: string) => { return a.length - b.length });
        this.displayGame();

    }

    //set the current word as typed, check if the next word has been typed yet
    //if it has, go to the next word
    //if it hasn't, display the typing minigame
    //and if there ISN"T a next word, callback to your parent
    nextWord = () => {
        const current_word = this.sorted_word_list[this.current_index];
        this.unique_word_map[current_word].typed = true;
        this.current_index++;
        const next_word = this.sorted_word_list[this.current_index];


        //TODO handle checking if theres any sentences, and if so , showcase it
        if (this.current_index >= this.sorted_word_list.length) {
            this.callback("", true);
        }

        //keep 
        if (this.unique_word_map[current_word].typed) {
            this.nextWord();
        } else {
            this.displayGame();
        }
    }

    displayGame = () => {
        console.log("JR NOTE: initing typing mini game, list is", this.sorted_word_list)
        this.content.innerHTML = ("");
        new WordToType(this.content, this.sorted_word_list[this.current_index], this.nextWord);

    }


}

class WordToType {
    stringTypedSoFar = "";
    stringRemaining: string;
    callback: Function;
    element: HTMLElement;

    constructor(parent: HTMLElement, text: string, callback: Function) {
        console.log("JR NOTE: the word to type is", text)
        this.stringRemaining = text.toLowerCase();
        this.callback = callback;
        this.element = createElementWithIdAndParent("p", parent);
        this.setup();
        this.render();
    }

    listen = (event: KeyboardEvent) => {
        console.log("JR NOTE: got event", event)
        if (event.key.toLowerCase() === this.stringRemaining[0]) {
            this.stringTypedSoFar += event.key.toLowerCase();
            this.stringRemaining = this.stringRemaining.substring(1);
            this.render();
        }
        console.log("JR NOTE: stringRemaining is: ", this.stringRemaining)
        if (this.stringRemaining.trim() === "") {
            this.teardown();
        }
    }


    setup = () => {
        window.addEventListener('keydown', this.listen);

    }

    teardown = () => {
        console.log("JR NOTE: calling teardown")
        window.removeEventListener('keydown', this.listen);
        this.callback();
    }


    render = () => {
        this.element.innerHTML = `<span style="color:white">${this.stringTypedSoFar}</span><span>${this.stringRemaining}</span>`;
    }
}