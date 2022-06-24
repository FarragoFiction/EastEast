/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 867:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you
//if you want to SHOW UP then what you do is figure out where these passwords are leaked :) :) :)
//if anyone can explain the origin of each one you'll unlock secret content directly from me
//hell, if you can even do a majority I'd love to hear it, in all sincerity. I love hearing people find my work interesting :)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.passwords = exports.Secret = exports.SourceDurationPair = exports.initRabbitHole = exports.albhed_map = void 0;
const Transcript_1 = __webpack_require__(122);
//look, okay, al bhed from ffx is something that for *some* percent of the population feels in their bones
//so this will drive home a nagging sense of familiarity, that it MUST be important
//at the same time when you look at it in writing it's gibberish
//but when you hear it spoken it flirts with being just phonetic english with an accent
//it vibes perfectly with the sense of misleading truths and lies with a core of truth
//ABCDEFGHIJKLMNOPQRSTUVWXYZ
//YPLTAVKREZGMSHUBXNCDIJFQOW
//https://lingojam.com/AlBhedTranslator you're welcome
exports.albhed_map = {
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
    "z": "W"
};
const initRabbitHole = () => {
    const hole = document.querySelector("#rabbithole");
    hole.onclick = () => {
        const target = document.querySelector("body");
        target.innerHTML = ""; //clear;
        const te = new Transcript_1.TranscriptEngine(`testing
        1...2...3...
        testing
        [okay]
        it works`, target);
        te.play();
    };
};
exports.initRabbitHole = initRabbitHole;
class SourceDurationPair {
    constructor(source, durationInFrames) {
        this.source = source;
        this.durationInFrames = durationInFrames;
    }
}
exports.SourceDurationPair = SourceDurationPair;
class Secret {
    constructor(title, frames, music_file_name, text) {
        this.frames = frames;
        this.music_file_name = music_file_name;
        this.text = text;
        this.title = title;
    }
}
exports.Secret = Secret;
/*
each password has a cctv feed (or at least a list of animation frames loaders (src and duration)?), an optional voice section, an optional text section (print out under cctv ffed)
*/
exports.passwords = {
    "STANDARD EXPECTOPATRONUM": new Secret("Confessionals 0", [new SourceDurationPair("Secrets/the_end_is_never_the_end/0.png", 113), new SourceDurationPair("Secrets/the_end_is_never_the_end/1.jpg", 1)], undefined, "Secrets/the_end_is_never_the_end/0.js"),
    "STANDARD SALMONSUSHI": new Secret("Confessionals 1", [new SourceDurationPair("Secrets/the_truth_is_layered/0.png", 24)], undefined, "Secrets/the_truth_is_layered/0.js"),
    "THE END IS NEVER THE END": new Secret("Confessionals 2", [new SourceDurationPair("Secrets/you_is_needed_to_end_the_world/0.png", 113), new SourceDurationPair("Secrets/you_is_needed_to_end_the_world/1.jpg", 1)], undefined, "Secrets/you_is_needed_to_end_the_world/0.js"),
    "BEWEARE OBLIVION IS AT HAND": new Secret("Confessionals 3", [new SourceDurationPair("Secrets/plant_more_trees/1.png", 24), new SourceDurationPair("Secrets/plant_more_trees/1.png", 3)], undefined, "Secrets/plant_more_trees/0.js"),
    "KNOW RESTRAINT": new Secret("Confessionals 4", [new SourceDurationPair("Secrets/how_much_do_you_think_waffles_cost/0.png", 113), new SourceDurationPair("Secrets/how_much_do_you_think_waffles_cost/1.jpg", 3)], undefined, "Secrets/how_much_do_you_think_waffles_cost/0.js"),
    "NO RESTRAINT": new Secret("Confessionals 5", [new SourceDurationPair("Secrets/5/0.png", 113), new SourceDurationPair("Secrets/5/1.jpg", 3)], undefined, "Secrets/5/0.js")
};


/***/ }),

/***/ 122:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranscriptEngine = void 0;
const misc_1 = __webpack_require__(79);
class TranscriptEngine {
    constructor(text, parent) {
        this.typing = false;
        this.speed = 50;
        this.clickAudio = new Audio("audio/web_SoundFX_254286__jagadamba__mechanical-switch.mp3");
        this.init = () => {
            if (!this.parent) {
                return;
            }
            this.parent.style.cssText =
                `font-family: gamer;
        color: #00ff00;
        font-size: 18px;
        background:black;`;
            const crt = (0, misc_1.createElementWithId)("div", "crt");
            const scanline = (0, misc_1.createElementWithIdAndParent)("div", crt, undefined, "scanline");
            const lines = (0, misc_1.createElementWithIdAndParent)("div", crt, undefined, "lines");
            const terminal = (0, misc_1.createElementWithIdAndParent)("div", crt, "terminal");
            this.parent.append(crt);
        };
        this.play = () => {
            this.transcript(this.text);
        };
        this.transcript = (linesUnedited) => __awaiter(this, void 0, void 0, function* () {
            const lines = linesUnedited.split("\n");
            const terminal = document.querySelector("#terminal");
            terminal.innerHTML = "";
            for (let line of lines) {
                const element = document.createElement("p");
                terminal.append(element);
                yield this.typeWrite(terminal, element, line);
                yield (0, misc_1.sleep)(this.speed * 10);
            }
        });
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
        this.typeWrite = (scroll_element, element, text) => __awaiter(this, void 0, void 0, function* () {
            this.typing = true;
            let skipping = false;
            for (let i = 0; i < text.length; i++) {
                if (text.charAt(i) === "[" || text.charAt(i) === "<") {
                    skipping = true;
                    i = this.doChunkAllAtOnce(element, i, text);
                }
                if (!skipping) {
                    yield (0, misc_1.sleep)(this.speed);
                    this.clickAudio.play();
                    element.innerHTML += text.charAt(i);
                }
                scroll_element.scrollTop = scroll_element.scrollHeight;
                skipping = false;
                if (!this.typing) {
                    break;
                }
            }
        });
        this.doChunkAllAtOnce = (ele, start_index, text) => {
            const offset = 0;
            //look for ending offset
            //create new span element
            //have its inner html be the chunk
            //return the new stop index
            //ignore any tag stuff before this point (it was already processed)
            const subtext = text.substring(start_index);
            const starting_char = text[start_index];
            let charsTillEnd = 0;
            if (starting_char === "<") {
                charsTillEnd = subtext.indexOf(">") + 1;
            }
            else if (starting_char === "[") {
                charsTillEnd = subtext.indexOf("]") + 1;
            }
            ele.innerHTML = text.substring(0, start_index + charsTillEnd);
            return start_index + charsTillEnd;
        };
        this.text = text;
        this.parent = parent;
        this.init();
    }
}
exports.TranscriptEngine = TranscriptEngine;


/***/ }),

/***/ 79:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createElementWithId = exports.createElementWithIdAndParent = exports.sleep = void 0;
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const createElementWithIdAndParent = (eleName, parent, id, className) => {
    const ele = (0, exports.createElementWithId)(eleName, id, className);
    parent.append(ele);
    return ele;
};
exports.createElementWithIdAndParent = createElementWithIdAndParent;
const createElementWithId = (eleName, id, className) => {
    const ele = document.createElement(eleName);
    if (id) {
        ele.id = id;
    }
    if (className) {
        ele.className = className;
    }
    return ele;
};
exports.createElementWithId = createElementWithId;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const PasswordStorage_1 = __webpack_require__(867);
console.log(PasswordStorage_1.albhed_map);
window.onload = () => {
    (0, PasswordStorage_1.initRabbitHole)();
};

})();

/******/ })()
;