import { createElementWithIdAndParent } from "../Utils/misc";

type WordListObject = {
    [key: string]: {
        word: string;
        typed: boolean;
        times_seen: number
    }
}

export class TypingMiniGame {
    unique_word_map: WordListObject;
    callback: Function;
    parent: HTMLElement
    sentences: string[];

    sorted_word_list: string[]; //sorted by length

    constructor(parent: HTMLElement, original_text: string, callback: Function) {
        this.callback = callback;
        this.parent = parent;
        this.unique_word_map = {};
        this.sentences = [];
        this.sorted_word_list = [];
        this.parseText(original_text);

    }

    parseText = (text: string) => {

        text = text.replaceAll(/\n/g, " ");
        this.sentences = text.split(/[.?!]/g)
        const split_words = text.split(" ");

        for (let w of split_words) {
            let word = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
            if (Object.keys(this.unique_word_map).includes(word.toLowerCase())) {
                this.unique_word_map[word] = { word: word, typed: false, times_seen: this.unique_word_map[word].times_seen + 1 }
            } else {
                this.unique_word_map[word] = { word: word, typed: false, times_seen: 1 }
            }
        }

        this.sorted_word_list = Object.keys(this.unique_word_map).sort((a: string, b: string) => { return a.length - b.length });
        this.init();

    }

    init = () => {
        console.log("JR NOTE: initing typing mini game")
        const content = createElementWithIdAndParent("div", this.parent);
        content.innerHTML = `<p>Word List: <b>${this.sorted_word_list.length}</b></p>
        ${this.sorted_word_list.join("<li>")}
        <p>Sentences: ${this.sentences.join("<li>")}</p>
        `;

    }


}