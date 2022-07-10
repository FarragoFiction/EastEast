//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you
//if you want to SHOW UP then what you do is figure out where these passwords are leaked :) :) :)
//if anyone can explain the origin of each one you'll unlock secret content directly from me
//hell, if you can even do a majority I'd love to hear it, in all sincerity. I love hearing people find my work interesting :)

import { Room } from "../Objects/RoomEngine/Room";
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
    "2":"http://farragofiction.com/NotesOnStealingPeoplesShit/",
    "3":"https://app.milanote.com/1O9Vsn15w4UteW/shipping-grid?p=i9yTbJxrme8" //by the watcher of threads

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

export const initRabbitHole = (room: Room) => {
    const hole = document.querySelector("#rabbithole") as HTMLElement;

    hole.onclick = () => {
        const target = document.querySelector("body") as HTMLElement;

        if(!target){
            return;
        }
        room.stopTicking();
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
/*

CAST ASIDE ALL ASPIRATIONS OF MORTALITY
SLAUGHTERHOUSE 9
PEER INTO THE ABYSS AND SEE WHAT LIES BENEATH 
*/

/*
    What I love the most about the blorbos is that.  They, all of them, have trauma in their pasts.

    Things that are hard to get over.

    When the training team first came to the Echidna they couldn't even watch media because everything, EVERYTHING had bad memories.

    But here is a Truth.

    This too, shall pass.

    You can get better. 

    Things can get better.

    There is always reason to hope.

    Always.

    The blorbos support each other and rest and recover and learn to care again.

    No matter how deep they seem to be sunk into their problems, their fears, their bad habits. 

    It's okay if everything feels too much right now.

    All you need to do is survive.
*/
export const passwords: PasswordMap = {
    "STANDARD EXPECTOPATRONUM": new Secret("Confessionals 0", undefined, "Secrets/Content/0.js")
    , "STANDARD SALMONSUSHI": new Secret("Confessionals 1", undefined, "Secrets/Content/1.js")
    , "THE END IS NEVER THE END": new Secret("Confessionals 2", undefined, "Secrets/Content/2.js")
    , "BEWEARE OBLIVION IS AT HAND": new Secret("Confessionals 3", undefined, "Secrets/Content/3.js")
    , "KNOW RESTRAINT": new Secret("Confessionals 4", undefined, "Secrets/Content/4.js")
    , "NO RESTRAINT": new Secret("Confessionals 5", undefined, "Secrets/Content/5.js")
    //note: the point of the slaughter notes is to highlight the diffrence between a mindless autonomata and the full, vibrant person
    , "PLACE YOUR TRUST IN ME": new Secret("Notes of Slaughter: Prelude", undefined, "Secrets/Content/6.js")
    , "RAISE YOU FROM THE END OF THE WORLD": new Secret("Notes of Slaughter 0", undefined, "Secrets/Content/7.js")
    , "SERENE AND CALM": new Secret("Notes of Slaughter 1", undefined, "Secrets/Content/8.js")
    , "BEWARE OBLIVION IS AT HAND": new Secret("Notes of Slaughter 2", undefined, "Secrets/Content/9.js")
    , "I AM HERE TO TREAT DISEASE": new Secret("Notes of Slaughter 3", undefined, "Secrets/Content/10.js")
    , "FLESH IS BOUND TO THE FLOW OF TIME": new Secret("Notes of Slaughter 4", undefined, "Secrets/Content/11.js")
    , "TIME IS DEAD": new Secret("Notes of Slaughter 5", undefined, "Secrets/Content/12.js")
    , "SAVE YOUR LIFE FROM DESTRUCTION": new Secret("Notes of Slaughter 6", undefined, "Secrets/Content/13.js")
    , "GENTLE CROONING VOICE": new Secret("Notes of Slaughter 7", undefined, "Secrets/Content/14.js")
    , "LOOKS AFTER THE BROKEN": new Secret("Notes of Slaughter 8", undefined, "Secrets/Content/15.js")
    , "TAKE CARE OF OTHERS": new Secret("Notes of Slaughter 9", undefined, "Secrets/Content/16.js")
    , "IT WAS DAWN": new Secret("Notes of Slaughter 10", undefined, "Secrets/Content/17.js")
    , "THE SOUL IS IMMORTAL": new Secret("Notes of Slaughter 11", undefined, "Secrets/Content/18.js")
    , "WHEN ALL HAD ABANDONED HOPE": new Secret("Notes of Slaughter 12", undefined, "Secrets/Content/19.js")
    , "POWER CORRUPTS": new Secret("Jumbled Mess", undefined, "Secrets/Content/20.js")
    , "KNOWLEDGE IS POWER": new Secret("Jumbled Mess: Explanation", undefined, "Secrets/Content/21.js")
    , "LEAVE YOUR MARK": new Secret("Do you remember the first time you killed someone?", undefined, "Secrets/Content/22.js")
    , "TAKE YOUR PLACE IN HISTORY": new Secret("Do you remember the first time you killed someone?", undefined, "Secrets/Content/23.js")
    , "THE FOOL IS DEAD": new Secret("Do you remember the first time you killed someone?", undefined, "Secrets/Content/24.js")
    , "BITS OF THE PAST LEAK INTO THE PRESENT": new Secret("Do you remember the first time you killed someone?", undefined, "Secrets/Content/26.js")

    , "INFINITE AMOUNT OF PAIN": new Secret("Do you remember the first time you killed someone?", undefined, "Secrets/Content/27.js")

    , "LS": new Secret("FILE LIST (UNIX)", undefined, "Secrets/PasswordStorage.ts") 
    , "DIR": new Secret("FILE LIST (DOS)", undefined, "Secrets/PasswordStorage.ts") 


};
//future me, don't forget https://www.tumblr.com/blog/view/jadedresearcher/688182806608838656?source=share
export const text = `.\n.\n.\n.\n ${Object.keys(passwords).join("\n")}`;