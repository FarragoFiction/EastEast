import { createElementWithIdAndParent } from "../Utils/misc";

type WordListObject = {
    [key:string]: {
        word: string;
        typed: boolean;
        times_seen: number
    }
}

export class TypingMiniGame {
    original_text: string;
    unique_word_map: WordListObject;
    callback: Function;
    parent: HTMLElement

    sorted_word_list: string[]; //sorted by length

    constructor(parent: HTMLElement, original_text: string, callback: Function) {
        this.original_text = original_text;
        this.callback = callback;
        this.parent = parent;

        const split_words = original_text.split(" ");
        this.unique_word_map = {};

        for (let word of split_words) {
            if(Object.keys(this.unique_word_map).includes(word)){
                this.unique_word_map[word] = {word: word, typed: false, times_seen: this.unique_word_map[word].times_seen+1 }
            }else{
                this.unique_word_map[word] = {word: word, typed: false, times_seen: 1 }
            }
        }

        this.sorted_word_list = Object.keys(this.unique_word_map).sort((a:string, b:string) => { return a.length - b.length} );
        this.init();
    }

    init = ()=>{
        console.log("JR NOTE: initing typing mini game")
        const content = createElementWithIdAndParent("div", this.parent);
        content.innerHTML = `<p>Word List:</p>
        ${this.sorted_word_list.join("<li>")}
        
        `;
        console.log("JR NOTE: content is ", content, "parent is", this.parent);

    }


}