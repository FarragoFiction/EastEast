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
    "0":"https://www.tumblr.com/blog/view/figuringoutnothing/688028145704665088?source=share",//when they were the guide of observers
    "1":"http://farragofiction.com/DevonaFears",
    "2":"https://verbosebabbler.tumblr.com/post/692334755682877440/the-faq-who-is-writing-this-thing",
    "3":"https://app.milanote.com/1O9Vsn15w4UteW/shipping-grid?p=i9yTbJxrme8 by the Watcher of Threads", //by the watcher of threads
    "4":"http://farragofiction.com/PerfectHeist/",
    "5": "https://theobscuregame.tumblr.com/   the waste's arc number, except without numbers (The Watcher says they won't spell it out)",
    "7":"https://www.royalroad.com/fiction/56715/the-encyclopedia-arcane",//yellow,
    "8":"https://figuringoutnothing.tumblr.com/post/691448067434676224/so-uh-i-might-have-gone-into-a-fugue-state-and",//but now the guide of hunters
    "9":"https://scratch.mit.edu/projects/719496869/ Taxonomist of Strangers",
    "!": "http://farragofiction.com/DocSlaughterFileServer",
    "?": "http://farragofiction.com/ParkerLotLost/",
    ".": "http://farragofiction.com/NotebookSimulator/",
    ";":"http://farragofiction.com/LightAndVoid/?dearWitherby=true",

    //0: http://farragofiction.com/ParkerLotLost/ <-- maybe this will be EastEastEast one day, that or ElevatorSim
    //11: http://farragofiction.com/DocSlaughterFileServer 
//https://jadedresearcher.tumblr.com/post/692341174641606656
//https://jadedresearcher.tumblr.com/post/692340754690015232/but-like-italians-are-real-and-arent-all
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
    video_file_name: string | undefined;
    text: string;
    title: string;
    constructor(title: string, video_file_name: string | undefined, text: string) {
        this.video_file_name = video_file_name;
        this.text = text;
        this.title = title;

    }

}

//lets play of south is summarized here by the Guide: https://www.tumblr.com/blog/view/figuringoutnothing/689403345728847873?source=share

export interface PasswordMap {
    [details: string]: Secret;
}
//https://archiveofourown.org/works/40961847

/*
each password has a cctv feed (or at least a list of animation frames loaders (src and duration)?), an optional voice section, an optional text section (print out under cctv ffed)
*/
/*
99 Rooms
eternal darkness
how your brain lies to you
mutations on mutations on mutations :)
blue can see more than orange
most innovative shooter 
It Has A Rather Lovely Ending
Spatial Horror
AThirdTranscript
The Corporation still serves as the main trading partner of the Great Powers, and fares well enough with JR at their head. -https://www.royalroad.com/fiction/40920/the-path-of-ascension/chapter/964367/the-path-of-ascension-chapter-153
ASecondPersonalTranscript/
earworm humming in a dream
Natalie Yemet (thinks their mom is the customer service rep. has an order for a game they don't remember)
some kind of mafia scheme (accuses eyedol of kidnapping)
SLAUGHTERHOUSE 9
https://creepypasta.fandom.com/wiki/It_Has_a_Rather_Lovely_Ending

*/

//https://the1whoscreams.neocities.org/

/*I just really really like the bellow phrase */

/*
Bits of my personal truth stashed in corners and corners of corners and so on until it's not just a personal page anymore, it's a sprawling maze of me.

-https://the1whoscreams.neocities.org/manifesto.html
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

//http://farragofiction.com/AThirdTranscript/
export const passwords: PasswordMap = {
    "STANDARD EXPECTOPATRONUM": new Secret("Confessionals 0", undefined, "Secrets/Content/0.js")
    , "STANDARD SALMONSUSHI": new Secret("Confessionals 1", undefined, "Secrets/Content/1.js")
    , "THE END IS NEVER THE END": new Secret("Confessionals 2", undefined, "Secrets/Content/2.js")
    , "YOU CAN GET BETTER": new Secret("Confessionals 3", undefined, "Secrets/Content/3.js")
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
    , "PEER INTO THE ABYSS AND SEE WHAT LIES BENEATH": new Secret("Hostage's Lament", undefined, "Secrets/Content/28.js")
    , "ELIAS SMITH": new Secret("JR Ramble", undefined, "Secrets/Content/29.js")
    , "TELLBRAK3700": new Secret("Notes of Slaughter 13", undefined, "Secrets/Content/30.js")
    , "PENNY WICKNER": new Secret("Notes of Slaughter 14", undefined, "Secrets/Content/31.js")
    , "ONCE YOU OPEN THE CURTAINS ALL THAT'S LEFT TO DO IS GO TO THE OTHER SIDE AND CLOSE THEM AGAIN": new Secret("Notes of Slaughter 15", undefined, "Secrets/Content/35.js")
    , "EXPERIMENTALMUSIC": new Secret("Notes of Slaughter 16: ExperimentalMusic", undefined, "Secrets/Content/36.js")
    , "PARADISE AND PARASITE": new Secret("ARM2: LOOP ???", undefined, "Secrets/Content/38.js")
    , "WIDOWS WEAVE": new Secret("BLAME THE SPIDERS FOR THIS", "http://farragofiction.com/ZampanioHotlink/Films/spiders.mp4", "") //widows weave was a famous Web aligned cursed video in the magnus archives, figured i'd throw yall a bown because its so obscure
    , "NO NEED TO ASK WHY": new Secret("MY JAM", "http://farragofiction.com/ZampanioHotlink/Films/heraldstacos.mp4", "") //widows weave was a famous Web aligned cursed video in the magnus archives, figured i'd throw yall a bown because its so obscure

    , "LS": new Secret("FILE LIST (UNIX)", undefined, "Secrets/PasswordStorage.ts") 
    , "DIR": new Secret("FILE LIST (DOS)", undefined, "Secrets/PasswordStorage.ts") 


};
//future me, don't forget https://www.tumblr.com/blog/view/jadedresearcher/688182806608838656?source=share
export const text = `${Object.keys(passwords).length} Items:.\n.\n.\n.\n ${Object.keys(passwords).join("\n")}`;