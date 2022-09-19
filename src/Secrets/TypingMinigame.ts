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
    displayed: boolean;
}

export class TypingMiniGame {
    unique_word_map: WordListObject;
    callback: Function;
    content: HTMLElement
    parent: HTMLElement;
    sentences: SentenceObject[];
    //what word are you typing
    current_index = 0;
    sentenceEle: HTMLElement;

    sorted_word_list: string[]; //sorted by length

    constructor(parent: HTMLElement, original_text: string, callback: Function) {
        this.callback = callback;
        this.parent = parent;
        this.content = createElementWithIdAndParent("div", parent);
        this.sentenceEle = createElementWithIdAndParent("div", this.parent);

        this.content.style.fontSize = "42px";
        this.unique_word_map = {};
        this.sentences = [];
        this.sorted_word_list = [];
        this.parseText(original_text);

    }

    parseText = (text: string) => {
        this.content.remove();
        this.sentenceEle.remove();
        this.content = createElementWithIdAndParent("div", this.parent);
        this.sentenceEle = createElementWithIdAndParent("div", this.parent);
        this.sentenceEle.innerHTML = "<hr><p>The words you've typed could, in theory, make a sentence such as these:</p>";
        this.content.style.fontSize = "42px";

        this.current_index = 0;
        text = text.replaceAll(/\n/g, " ");
        const probable_sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
        if (probable_sentences) {
            this.sentences = probable_sentences.map((sentence) => { return { text: sentence, displayed: false } })
        } else {
            this.sentences = [];
        }

        const split_words = text.split(" ");

        for (let w of split_words) {
            let word = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
            if (word.trim() !== "") {
                if (Object.keys(this.unique_word_map).includes(word.toLowerCase())) {
                    this.unique_word_map[word] = { word: word, typed: this.unique_word_map[word].typed, times_seen: this.unique_word_map[word].times_seen + 1 }
                } else {
                    this.unique_word_map[word] = { word: word, typed: false, times_seen: 1 }
                }
            }

        }

        this.sorted_word_list = Object.keys(this.unique_word_map).sort((a: string, b: string) => { return a.length - b.length });
        this.displayGame();

    }

    checkForSentences = () => {
        console.log("JR NOTE: checking for sentences.")
        for (let sentence of this.sentences) {
            if (!sentence.displayed) {
                console.log(`JR NOTE: ${sentence.text} is not yet displaed. `)
                const split_words = sentence.text.split(" ");
                console.log(`JR NOTE: split words is ${split_words}`)

                let readyToDisplay = true;
                for (let w of split_words) {
                    console.log(`JR NOTE: is word typed yet?`,w)

                    let word = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
                    if(word.trim() !== ""){
                        if (Object.keys(this.unique_word_map).includes(word) && !this.unique_word_map[word].typed) {
                            console.log(`JR NOTE: w ${w} was not yet typed`)
    
                            readyToDisplay = false;
                            break;
                        }
                    }
       
                }

                if(readyToDisplay){
                    console.log("JR NOTE: ready to display")
                    this.sentenceEle.innerHTML += `<li>${sentence.text}</li>`;
                    console.log("JR NOTE: ready to display", this.sentenceEle.innerHTML)

                    sentence.displayed = true;
                }
            }
        }
    }

        //set the current word as typed, check if the next word has been typed yet
        //if it has, go to the next word
        //if it hasn't, display the typing minigame
        //and if there ISN"T a next word, callback to your parent
        nextWord = () => {
            const current_word = this.sorted_word_list[this.current_index];
            this.unique_word_map[current_word].typed = true;
            this.current_index++;

            this.checkForSentences();
            //TODO handle checking if theres any sentences, and if so , showcase it
            if (this.current_index >= this.sorted_word_list.length) {
                this.callback("", true);
                return;
            }
            const next_word = this.sorted_word_list[this.current_index];

            //keep 
            if (this.unique_word_map[next_word].typed) {
                this.nextWord();
            } else {
                this.displayGame();
            }
        }

        findFirstIndex = () => {
            const current_word = this.sorted_word_list[this.current_index];
            if (this.unique_word_map[current_word].typed) {
                this.current_index++;
                this.findFirstIndex();
            } else {
                return;
            }
        }

        displayGame = () => {
            this.findFirstIndex();
            

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
        this.stringRemaining = text.toLowerCase();
        this.callback = callback;
        this.element = createElementWithIdAndParent("p", parent);
        this.setup();
        this.render();
    }

    listen = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === this.stringRemaining[0]) {
            this.stringTypedSoFar += event.key.toLowerCase();
            this.stringRemaining = this.stringRemaining.substring(1);
            this.render();
        }
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
        console.log("JR NOTE; trying to render", this.stringRemaining)
        this.element.innerHTML = `<span style="color:white">${this.stringTypedSoFar}</span><span>${this.stringRemaining}</span>`;
    }
}