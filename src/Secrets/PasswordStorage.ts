//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you
//if you want to SHOW UP then what you do is figure out where these passwords are leaked :) :) :)
//if anyone can explain the origin of each one you'll unlock secret content directly from me
//hell, if you can even do a majority I'd love to hear it, in all sincerity. I love hearing people find my work interesting :)

import { TranscriptEngine } from "./Transcript";


//look, okay, al bhed from ffx is something that for *some* percent of the population feels in their bones
//so this will drive home a nagging sense of familiarity, that it MUST be important
//at the same time when you look at it in writing it's gibberish
//but when you hear it spoken it flirts with being just phonetic english with an accent
//it vibes perfectly with the sense of misleading truths and lies with a core of truth
//ABCDEFGHIJKLMNOPQRSTUVWXYZ
//YPLTAVKREZGMSHUBXNCDIJFQOW
//https://lingojam.com/AlBhedTranslator you're welcome
export const albhed_map = {
    "a": "Y",
    "b": "P",
    "c": "L",
    "d": "T",
    "e": "A",
    "f": "V",
    "g": "K",
    "h": "R",
    "i": "E",
    "j": "Z",
    "k": "G",
    "l": "M",
    "m": "S",
    "n": "H",
    "o": "U",
    "p": "B",
    "q": "X",
    "r": "N",
    "s": "C",
    "t": "D",
    "u": "I",
    "v": "J",
    "w": "F",
    "x": "Q",
    "y": "O",
    "z": "W",
    "0":"https://www.tumblr.com/blog/view/figuringoutnothing/688028145704665088?source=share",
    "1":"http://farragofiction.com/DevonaFears",
    "2":"http://farragofiction.com/NotesOnStealingPeoplesShit/"

}

export const translate = (word: string) => {
    let ret = word.toLowerCase();
    let done = "";
    for (let i = 0; i < word.length; i++) {
        if ((albhed_map as any)[ret[i]] && !done.includes(ret[i])) {
            done += ret[i];
            //replaceAll is actually really new, ts doesn't like it rip
            ret = (ret as any).replaceAll(ret[i], (albhed_map as any)[ret[i]]);
        }
    }
    return ret;
}

export const initRabbitHole = () => {
    const hole = document.querySelector("#rabbithole") as HTMLElement;

    hole.onclick = () => {
        const target = document.querySelector("body") as HTMLElement;
        if(!target){
            return;
        }
        target.innerHTML = "";//clear;
        const te = new TranscriptEngine(target);
    }
}




export class Secret {
    music_file_name: string | undefined;
    text: string;
    title: string;
    constructor(title: string, music_file_name: string | undefined, text: string) {
        this.music_file_name = music_file_name;
        this.text = text;
        this.title = title;

    }

}


export interface PasswordMap {
    [details: string]: Secret;
}
/*
each password has a cctv feed (or at least a list of animation frames loaders (src and duration)?), an optional voice section, an optional text section (print out under cctv ffed)
*/
export const passwords: PasswordMap = {
    "STANDARD EXPECTOPATRONUM": new Secret("Confessionals 0", undefined, "Secrets/Content/0.js")
    , "STANDARD SALMONSUSHI": new Secret("Confessionals 1", undefined, "Secrets/Content/1.js")
    , "THE END IS NEVER THE END": new Secret("Confessionals 2", undefined, "Secrets/Content/2.js")
    , "BEWEARE OBLIVION IS AT HAND": new Secret("Confessionals 3", undefined, "Secrets/Content/3.js")
    , "KNOW RESTRAINT": new Secret("Confessionals 4", undefined, "Secrets/Content/4.js")
    , "NO RESTRAINT": new Secret("Confessionals 5", undefined, "Secrets/Content/5.js")
    //note: the point of the slaughter notes is to highlight the diffrence between a mindless autonomata and the full, vibrant person
    , "THE TRUTH IS LAYERED": new Secret("Notes of Slaughter: Prelude", undefined, "Secrets/Content/6.js")
    , "THE FOOL IS DEAD": new Secret("Notes of Slaughter 0", undefined, "Secrets/Content/7.js")
    , "SHEPHARD SHUFFLE": new Secret("Notes of Slaughter 1", undefined, "Secrets/Content/8.js")
    , "BEWARE OBLIVION IS AT HAND": new Secret("Notes of Slaughter 2", undefined, "Secrets/Content/9.js")
    , "DIED LIKE COWARDS": new Secret("Notes of Slaughter 3", undefined, "Secrets/Content/10.js")
    , "NOT A FED": new Secret("Notes of Slaughter 4", undefined, "Secrets/Content/11.js")
    , "TIME IS DEAD": new Secret("Notes of Slaughter 5", undefined, "Secrets/Content/12.js")
    , "TAKE YOUR PLACE IN HISTORY": new Secret("Notes of Slaughter 6", undefined, "Secrets/Content/13.js")
    , "LEAVE YOUR MARK": new Secret("Notes of Slaughter 7", undefined, "Secrets/Content/14.js")
    , "COLONIZE YOUR MIND": new Secret("Notes of Slaughter 8", undefined, "Secrets/Content/15.js")
    , "INFINITE AMOUNT OF PAIN": new Secret("Notes of Slaughter 9", undefined, "Secrets/Content/16.js")
    , "CAST ASIDE ALL ASPIRATIONS OF MORTALITY": new Secret("Notes of Slaughter 10", undefined, "Secrets/Content/17.js")
    , "BITS OF THE PAST LEAK INTO THE PRESENT": new Secret("Notes of Slaughter 11", undefined, "Secrets/Content/18.js")
    , "SLAUGHTERHOUSE 9": new Secret("Notes of Slaughter 12", undefined, "Secrets/Content/19.js")
    , "POWER CORRUPTS": new Secret("Jumbled Mess", undefined, "Secrets/Content/20.js")

    , "LS": new Secret("FILE LIST (UNIX)", undefined, "Secrets/PasswordStorage.ts") 
    , "DIR": new Secret("FILE LIST (DOS)", undefined, "Secrets/PasswordStorage.ts") 


};
export const text = `.\n.\n.\n.\n ${Object.keys(passwords).join("\n")}`;