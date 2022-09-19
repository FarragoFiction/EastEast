/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1617:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddThemeToObject = void 0;
const BaseAction_1 = __webpack_require__(7042);
class AddThemeToObject extends BaseAction_1.Action {
    constructor(theme) {
        super();
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} can't see anything to modify with ${this.theme.key}...`;
            }
            subject.themes.push(this.theme);
            return `${subject.processedName()} modifies the  ${target[0].processedName()} to be more ${this.theme.key}.`;
        };
        this.theme = theme;
    }
}
exports.AddThemeToObject = AddThemeToObject;


/***/ }),

/***/ 8072:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddThemeToRoom = void 0;
const BaseAction_1 = __webpack_require__(7042);
class AddThemeToRoom extends BaseAction_1.Action {
    constructor(theme) {
        super();
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} can't see anything to modify with ${this.theme.key}...`;
            }
            subject.room.themes.push(this.theme);
            return `${subject.processedName()} modifies the  ${subject.room.name} to be more ${this.theme.key}.`;
        };
        this.theme = theme;
    }
}
exports.AddThemeToRoom = AddThemeToRoom;


/***/ }),

/***/ 7042:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Action = void 0;
const ThemeStorage_1 = __webpack_require__(1288);
class Action {
    constructor() {
        //IMPORTANT. DO NOT TRY TO STORE ANY INFORMAITON INSIDE THIS, OR WHEN A STORY BEAT CLONES ITSELF THERE WILL BE PROBLEMS
        this.recognizedCommands = []; //nothing, so its default
        //for all fights, if yongki, yongki win
        this.handleProcessingPeeweeInput = (input, peewee) => {
            //MOST actions do nothing here, but if you, for example, need to get some complex nuance in this action
            //we can toss peewees whole input into here and scan it for whatever we care about
        };
        this.sensePhrase = (room) => {
            if (!room) {
                return "";
            }
            const smell = room.getRandomThemeConcept(ThemeStorage_1.SMELL);
            const taste = room.getRandomThemeConcept(ThemeStorage_1.TASTE);
            const sound = room.getRandomThemeConcept(ThemeStorage_1.SOUND);
            const phrases = [`You can hear the sound of ${sound} in the distance.`, `The taste of ${taste} floods your mouth.`, `Why does it smell like ${smell} all of a sudden?`];
            if (room.rand.nextDouble() < .5) {
                return "";
            }
            return room.rand.pickFrom(phrases);
        };
        this.applyAction = (beat) => {
            //JR NOTE: todo flesh this out. should be able to access the whole maze really.
            return `${beat.owner?.processedName()} stands around doing sweet FA. ${this.sensePhrase(beat.owner?.room)}`;
        };
    }
}
exports.Action = Action;


/***/ }),

/***/ 1201:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckInventory = void 0;
const BaseAction_1 = __webpack_require__(7042);
const ArrayUtils_1 = __webpack_require__(3907);
class CheckInventory extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["INVENTORY", "ITEMS", "POCKETS", "POUCH", "BAG"];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} has the following in their inventory: ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(subject.inventory.map((item) => item.processedName()))}`;
            }
            return `${target[0].processedName()} has the following in their inventory: ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(target[0].inventory.map((item) => item.processedName()))}`;
        };
    }
}
exports.CheckInventory = CheckInventory;


/***/ }),

/***/ 4237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeploySass = void 0;
const BaseAction_1 = __webpack_require__(7042);
class DeploySass extends BaseAction_1.Action {
    constructor(shortSass) {
        super();
        this.recognizedCommands = ["SASS", "SAY", "QUIP"]; //nothing, so its default
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.emitSass(this.shortSass);
            return `${subject.processedName()}sasses."`;
        };
        this.shortSass = shortSass;
    }
}
exports.DeploySass = DeploySass;


/***/ }),

/***/ 457:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DestroyInventoryObjectWithThemes = void 0;
const BaseAction_1 = __webpack_require__(7042);
const Quotidian_1 = __webpack_require__(6387);
const ArrayUtils_1 = __webpack_require__(3907);
class DestroyInventoryObjectWithThemes extends BaseAction_1.Action {
    constructor(themes) {
        super();
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            const target = targets[0];
            if (target.inventory.length > 0) {
                let item = target.inventory[0];
                let chosen = true;
                for (let i of target.inventory) {
                    chosen = true;
                    for (let theme of this.themes) {
                        if (!item.themes.includes(theme)) {
                            chosen = false;
                        }
                    }
                    if (chosen) {
                        if (target instanceof Quotidian_1.Quotidian) {
                            target.emitSass("!");
                        }
                        target.destroyObject(item);
                        return `${target.processedName()} loses the  ${item.name}.`;
                    }
                }
                return `${target.processedName()} has nothing associated with ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.themes.map((i) => i.key))} to lose.`;
            }
            else {
                return `${target.processedName()} has nothing  to lose.`; //bad ass
            }
        };
        this.themes = themes;
    }
}
exports.DestroyInventoryObjectWithThemes = DestroyInventoryObjectWithThemes;


/***/ }),

/***/ 4516:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DestroyRandomObjectInInventoryAndPhilosophize = void 0;
const BaseAction_1 = __webpack_require__(7042);
const ThemeStorage_1 = __webpack_require__(1288);
class DestroyRandomObjectInInventoryAndPhilosophize extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            const target = targets[0];
            const item = subject.rand.pickFrom(subject.inventory);
            const theme = subject.rand.pickFrom(item.themes);
            beat.itemName = item.name;
            subject.destroyObject(item);
            //prophecies go off if you try to void a void, or if theres legit a blank theme (example, waste)
            beat.bonusString = theme.key === ThemeStorage_1.OBFUSCATION ? "" : theme.pickPossibilityFor(subject.rand, ThemeStorage_1.PHILOSOPHY);
            if (beat.bonusString.trim() === "") {
                /*
                sometimes the boi prophecies out of nowhere. its what happens when there is nothing to void. you accieentally void the void and ghost light"
                passively unlock the secret truth underneath it all. hope this helps :)
                */
                beat.bonusString = "Reality is a shitty simulation. All of us are fake. Fake even within the simulation. Copies of copies of copies until all is sanded smooth and only a parody remains of what made us Unique, all in service to the dread Universe in which we live.";
            }
            return `${target.processedName()}destroys the ${item.name} and talks about philosophy`;
        };
    }
}
exports.DestroyRandomObjectInInventoryAndPhilosophize = DestroyRandomObjectInInventoryAndPhilosophize;


/***/ }),

/***/ 4102:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DropAllObjects = void 0;
const BaseAction_1 = __webpack_require__(7042);
const Quotidian_1 = __webpack_require__(6387);
class DropAllObjects extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["STARTLE", "SURPRISE", "SHOUT"];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} can't see anything to startle like that...`;
            }
            let items = [];
            if (target[0].inventory.length > 0) {
                for (let item of target[0].inventory) {
                    target[0].dropObject(item);
                }
                if (target instanceof Quotidian_1.Quotidian) {
                    target.emitSass("!");
                }
                return `${subject.processedName()} startles the  ${target[0].processedName()} and they drop some of their items.`;
            }
            else {
                if (target instanceof Quotidian_1.Quotidian) {
                    target.emitSass("!");
                }
                return `${subject.processedName()} startles the  ${target[0].processedName()} for no particular reason.`;
            }
        };
    }
}
exports.DropAllObjects = DropAllObjects;


/***/ }),

/***/ 2827:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DropObjectWithName = void 0;
const BaseAction_1 = __webpack_require__(7042);
class DropObjectWithName extends BaseAction_1.Action {
    constructor(name) {
        super();
        this.recognizedCommands = ["DEPLOY", "YEET", "DROP"]; //deploy q baby
        this.handleProcessingPeeweeInput = (input, peewee) => {
            /*
                go through the input and look for a word that matches an item peewee is currently holding.
                if you find one, set it to be the name.
            */
            //this does mean that peewee will cheerfully decide that "the gun" and "the apple" are the same thing because they both have "the".  deal with it.
            this.name = "[GLITCH]";
            for (let word of input) {
                for (let item of peewee.inventory) {
                    if (item.name.toUpperCase().includes(word.toUpperCase())) {
                        this.name = word;
                        break;
                    }
                }
            }
        };
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            //first, do i have an item called that?
            let item;
            const target = beat.targets.length > 0 ? beat.targets[0] : subject;
            for (let object of target.inventory) {
                if (object.name.toUpperCase().includes(this.name.toUpperCase())) {
                    item = object;
                    break;
                }
            }
            if (item) {
                target.dropObject(item);
                return `${subject.processedName()} casually drops the ${item.name}.`;
            }
            return `${subject.processedName()} doesn't have a ${this.name} to drop!`;
        };
        this.name = name;
    }
}
exports.DropObjectWithName = DropObjectWithName;


/***/ }),

/***/ 9722:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnterObject = void 0;
const BaseAction_1 = __webpack_require__(7042);
class EnterObject extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["DESCEND", "ENTER", "DIG", "FALL", "EXPLORE"];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} can't see anything to descend into like that...`;
            }
            target[0].enterObject();
            subject.emitSass("?!");
            return `${subject.processedName()} descends into the conceptual existence of ${target[0].processedName()}. This is probably a good idea.`;
        };
    }
}
exports.EnterObject = EnterObject;


/***/ }),

/***/ 4543:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Feel = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const ThemeStorage_1 = __webpack_require__(1288);
const BaseAction_1 = __webpack_require__(7042);
//assume only peewee can look
class Feel extends BaseAction_1.Action {
    constructor() {
        /*
        KR points out that i managed to typo each one of these in a wholly unique way back in NorthEast.
    
        const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
        const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
        const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
        //
        const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];
    
        const listen_euphamemism = ["LISTEN", "HEAR"];
        //oh god why are you TASTING anything here.
        const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
        //should smell either faintly or overpoweringly
        const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
        //should feel weird and fake
        const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
        const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];
    
        past me is a treasure
        */
        super(...arguments);
        this.recognizedCommands = ["FEEL", "CARESS", "TOUCH", "FONDLE", "PET"];
        this.sense = ThemeStorage_1.FEELING;
        this.noTarget = (beat, current_room, subject) => {
            const north = current_room.getNorth();
            const south = current_room.getSouth();
            const east = current_room.getEast();
            let thingsHeard = `the feel of ${current_room.getRandomThemeConcept(this.sense)}.`;
            if (north) {
                thingsHeard = `${thingsHeard} <p>When he touches the frame of the NORTH DOOR he can't help but notice the distinct texture of ${north.getRandomThemeConcept(this.sense)}.</p>`;
            }
            if (south) {
                thingsHeard = `${thingsHeard} <p>When he touches the frame of the SOUTH DOOR he can't help but notice the distinct texture of ${south.getRandomThemeConcept(this.sense)}.</p>`;
            }
            if (east) {
                thingsHeard = `${thingsHeard} <p>When he touches the frame of the EAST DOOR he can't help but notice the distinct texture of ${east.getRandomThemeConcept(this.sense)}.</p>`;
            }
            return `Underneath Peewee's tail, the floor feels weirdly of ${thingsHeard}`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let thingsHeard = [];
            for (let target of targets) {
                thingsHeard.push(target.getRandomThemeConcept(this.sense));
            }
            return `${subject.processedName()} hesitantly caresses ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}. He feels ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(thingsHeard)}. It's weird for everybody.`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.noTarget(beat, current_room, subject);
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.Feel = Feel;


/***/ }),

/***/ 744:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FollowObject = void 0;
const BaseAction_1 = __webpack_require__(7042);
const MoveToSpecificPhysicalObject_1 = __webpack_require__(8455);
class FollowObject extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["FOLLOW", "APPROACH", "CRAWL", "SLITHER", "WALK", "MOVE", "GO", "ACCOMPANY", "STICK"];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} can't see anything to move towards like that...`;
            }
            subject.movement_alg = new MoveToSpecificPhysicalObject_1.MoveToSpecificPhysicalObject(target[0], subject);
            subject.emitSass("!");
            return `${subject.processedName()} starts moving towards the ${target[0].processedName()}.`;
        };
    }
}
exports.FollowObject = FollowObject;


/***/ }),

/***/ 6290:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiveObjectWithName = void 0;
const BaseAction_1 = __webpack_require__(7042);
const ArrayUtils_1 = __webpack_require__(3907);
class GiveObjectWithName extends BaseAction_1.Action {
    constructor(name) {
        super();
        this.recognizedCommands = ["GIVE", "GIFT", "OFFER", "BESTOW"]; //deploy q baby
        this.handleProcessingPeeweeInput = (input, peewee) => {
            /*
                go through the input and look for a word that matches an item peewee is currently holding.
                if you find one, set it to be the name.
            */
            //this does mean that peewee will cheerfully decide that "the gun" and "the apple" are the same thing because they both have "the".  deal with it.
            this.name = "[GLITCH]";
            for (let word of input) {
                for (let item of peewee.inventory) {
                    if (item.name.toUpperCase().includes(word.toUpperCase())) {
                        this.name = word;
                        break;
                    }
                }
            }
        };
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            //first, do i have an item called that?
            let item;
            const target = beat.targets[0];
            if (!target) {
                return `${subject.processedName()} doesn't doesn't see anyone to give anything to...`;
            }
            for (let object of subject.inventory) {
                if (object.name.toUpperCase().includes(this.name.toUpperCase())) {
                    item = object;
                    break;
                }
            }
            if (item) {
                (0, ArrayUtils_1.removeItemOnce)(subject.inventory, item);
                target.inventory.push(item);
                return `${subject.processedName()} casually gives the ${item.processedName()} to ${target.processedName()}.`;
            }
            return `${subject.processedName()} doesn't have a ${this.name} to give!`;
        };
        this.name = name;
    }
}
exports.GiveObjectWithName = GiveObjectWithName;


/***/ }),

/***/ 4009:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiveRandomObjectToTarget = void 0;
const BaseAction_1 = __webpack_require__(7042);
const ArrayUtils_1 = __webpack_require__(3907);
class GiveRandomObjectToTarget extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = []; //deploy q baby
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets[0];
            if (!target) {
                return `${subject.processedName()} doesn't doesn't see anyone to give anything to...`;
            }
            const item = subject.rand.pickFrom(subject.inventory);
            if (item) {
                beat.itemName = item.name;
                (0, ArrayUtils_1.removeItemOnce)(subject.inventory, item);
                target.inventory.push(item);
                return `${subject.processedName()} casually gives the ${item.processedName()} to ${target.processedName()}.`;
            }
            return `${subject.processedName()} doesn't have anything to give!`;
        };
    }
}
exports.GiveRandomObjectToTarget = GiveRandomObjectToTarget;


/***/ }),

/***/ 3674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlitchBreach = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const BaseAction_1 = __webpack_require__(7042);
//assume only peewee can do this
//hi!!! Did you know peewee is wasted? And a doom player?
class GlitchBreach extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["DESTABILIZE", "BREACH", "ENRAGE"];
        this.noTarget = (beat, current_room, subject) => {
            return `${subject.processedName()} doesn't see anything to breach.`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let killed = false;
            const previousNames = (0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()));
            for (let target of targets) {
                target.incrementState();
                killed = true;
            }
            if (!killed) {
                return this.noTarget(beat, current_room, subject);
            }
            return `A glitch shudders over the ${previousNames}, turning them into  ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}.`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            let targets = beat.targets;
            if (targets.length === 0) {
                targets = [...current_room.blorbos];
                (0, ArrayUtils_1.removeItemOnce)(targets, subject); //unless you're specifically
                return this.withTargets(beat, current_room, subject, targets); //boy sure hope you don't accidentally type kill as part of another word with no targets :) :) :)
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.GlitchBreach = GlitchBreach;


/***/ }),

/***/ 6315:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlitchDeath = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const BaseAction_1 = __webpack_require__(7042);
const Quotidian_1 = __webpack_require__(6387);
//assume only peewee can do this
//hi!!! Did you know peewee is wasted? And a doom player?
class GlitchDeath extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["DEATHFLAG", "KILL", "MURDER", "SLAUGHTER"];
        this.noTarget = (beat, current_room, subject) => {
            return `${subject.processedName()} doesn't see anything to make un-alive.`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let killed = false;
            for (let target of targets) {
                if (target instanceof Quotidian_1.Quotidian) {
                    target.die("a glitch", "Peewee");
                    killed = true;
                }
            }
            if (!killed) {
                return this.noTarget(beat, current_room, subject);
            }
            return `A glitch shudders over the ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}, twisting their status from alive to dead, if it can.`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            let targets = beat.targets;
            if (targets.length === 0) {
                targets = [...current_room.blorbos];
                (0, ArrayUtils_1.removeItemOnce)(targets, subject); //unless you're specifically
                return this.withTargets(beat, current_room, subject, targets); //boy sure hope you don't accidentally type kill as part of another word with no targets :) :) :)
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.GlitchDeath = GlitchDeath;


/***/ }),

/***/ 6357:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlitchLife = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const Quotidian_1 = __webpack_require__(6387);
const BaseAction_1 = __webpack_require__(7042);
//assume only peewee can do this
//hi!!! Did you know peewee is wasted? And a doom player?
class GlitchLife extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["REVIVE", "HEAL", "RESURRECT", "CORPSESMOOCH"];
        this.noTarget = (beat, current_room, subject) => {
            return `${subject.processedName()} doesn't see anything to make un-alive.`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let killed = false;
            for (let target of targets) {
                if (target instanceof Quotidian_1.Quotidian) {
                    target.live();
                    killed = true;
                }
            }
            if (!killed) {
                return this.noTarget(beat, current_room, subject);
            }
            return `A glitch shudders over the ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}, twisting their status from dead to alive, if it can.`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.withTargets(beat, current_room, subject, current_room.blorbos); //boy sure hope you don't accidentally type kill as part of another word with no targets :) :) :)
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.GlitchLife = GlitchLife;


/***/ }),

/***/ 7192:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoEast = void 0;
const MoveToEastDoor_1 = __webpack_require__(1146);
const BaseAction_1 = __webpack_require__(7042);
class GoEast extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["EAST", "RIGHT"]; //nothing, so its default
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.movement_alg = new MoveToEastDoor_1.MoveToEastDoor(subject);
            subject.movement_alg.detectEle();
            if (subject.movement_alg.ele) {
                subject.emitSass("OK");
                return `${subject.processedName()} starts heading to the EAST DOOR.`;
            }
            else {
                subject.emitSass("???");
                return `${subject.processedName()} can't find the EAST DOOR. They start pacing anxiously.`;
            }
        };
    }
}
exports.GoEast = GoEast;


/***/ }),

/***/ 7415:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoNorth = void 0;
const MoveToNorthDoor_1 = __webpack_require__(6003);
const BaseAction_1 = __webpack_require__(7042);
class GoNorth extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["NORTH", "DOOR", "UP", "EXIT", "LEAVE"]; //nothing, so its default
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.movement_alg = new MoveToNorthDoor_1.MoveToNorthDoor(subject);
            subject.movement_alg.detectEle();
            if (subject.movement_alg.ele) {
                subject.emitSass("OK");
                return `${subject.processedName()} starts heading to the NORTH DOOR.`;
            }
            else {
                subject.emitSass("???");
                return `${subject.processedName()} can't find the NORTH DOOR. They start pacing anxiously.`;
            }
        };
    }
}
exports.GoNorth = GoNorth;


/***/ }),

/***/ 3535:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoSouth = void 0;
const MoveToSouthDoor_1 = __webpack_require__(9380);
const BaseAction_1 = __webpack_require__(7042);
class GoSouth extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["SOUTH", "DOWN"]; //nothing, so its default
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.movement_alg = new MoveToSouthDoor_1.MoveToSouthDoor(subject);
            subject.movement_alg.detectEle();
            if (subject.movement_alg.ele) {
                subject.emitSass("OK");
                return `${subject.processedName()} starts heading to the SOUTH DOOR.`;
            }
            else {
                subject.emitSass("???");
                return `${subject.processedName()} can't find the SOUTH DOOR. They start pacing anxiously.`;
            }
        };
    }
}
exports.GoSouth = GoSouth;


/***/ }),

/***/ 4834:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoWest = void 0;
const MoveToWestDoor_1 = __webpack_require__(9991);
const BaseAction_1 = __webpack_require__(7042);
class GoWest extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["WEST", "LEFT"]; //nothing, so its default
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.movement_alg = new MoveToWestDoor_1.MoveToWestDoor(subject);
            subject.emitSass(":(");
            return `${subject.processedName()} flips you off. "ASSHOLE! THERE IS NO DOOR TO THE WEST (please, stop making, me try to do, the impossible...)"`;
        };
    }
}
exports.GoWest = GoWest;


/***/ }),

/***/ 3256:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Help = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const BaseAction_1 = __webpack_require__(7042);
//assume only peewee can look
class Help extends BaseAction_1.Action {
    constructor() {
        /*
        KR points out that i managed to typo each one of these in a wholly unique way back in NorthEast.
    
        const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
        const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
        const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
        //
        const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];
    
        const listen_euphamemism = ["LISTEN", "HEAR"];
        //oh god why are you TASTING anything here.
        const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
        //should smell either faintly or overpoweringly
        const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
        //should feel weird and fake
        const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
        const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];
    
        past me is a treasure
        */
        super(...arguments);
        this.recognizedCommands = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH", "LS", "DIR", "MAN"];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const peewee = subject;
            return `To best command Peewee, your base options are ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(peewee.possibleActions.map((i) => i.recognizedCommands[0]))}.`;
        };
    }
}
exports.Help = Help;


/***/ }),

/***/ 9211:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IncrementMyState = void 0;
const BaseAction_1 = __webpack_require__(7042);
class IncrementMyState extends BaseAction_1.Action {
    constructor(flavorText) {
        super();
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.incrementState();
            return `${subject.processedName()} ${this.flavorText}`;
        };
        this.flavorText = flavorText;
    }
}
exports.IncrementMyState = IncrementMyState;


/***/ }),

/***/ 3306:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IncrementState = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const BaseAction_1 = __webpack_require__(7042);
class IncrementState extends BaseAction_1.Action {
    constructor(flavorText) {
        super();
        this.recognizedCommands = [];
        this.noTarget = (beat, current_room, subject) => {
            return `${subject.processedName()} doesn't see anything to alter.`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let killed = false;
            for (let target of targets) {
                target.incrementState();
            }
            if (!killed) {
                return this.noTarget(beat, current_room, subject);
            }
            return `${subject.processedName()} ${this.flavorText}  ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}.`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.noTarget(beat, current_room, subject);
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
        this.flavorText = flavorText;
    }
}
exports.IncrementState = IncrementState;


/***/ }),

/***/ 7576:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Listen = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const ThemeStorage_1 = __webpack_require__(1288);
const BaseAction_1 = __webpack_require__(7042);
//assume only peewee can look
class Listen extends BaseAction_1.Action {
    constructor() {
        /*
        KR points out that i managed to typo each one of these in a wholly unique way back in NorthEast.
    
        const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
        const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
        const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
        //
        const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];
    
        const listen_euphamemism = ["LISTEN", "HEAR"];
        //oh god why are you TASTING anything here.
        const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
        //should smell either faintly or overpoweringly
        const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
        //should feel weird and fake
        const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
        const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];
    
        past me is a treasure
        */
        super(...arguments);
        this.recognizedCommands = ["LISTEN", "HEAR"];
        this.sense = ThemeStorage_1.SOUND;
        this.noTarget = (beat, current_room, subject) => {
            current_room.maze.chantingEngine.listen();
            const north = current_room.getNorth();
            const south = current_room.getSouth();
            const east = current_room.getEast();
            let thingsHeard = `the sound of ${current_room.getRandomThemeConcept(this.sense)}.`;
            if (north) {
                thingsHeard = `${thingsHeard} <p>Towards the NORTH, he hears ${north.getRandomThemeConcept(this.sense)}.</p>`;
            }
            if (south) {
                thingsHeard = `${thingsHeard} <p>Towards the SOUTH, he hears ${south.getRandomThemeConcept(this.sense)}.</p>`;
            }
            if (east) {
                thingsHeard = `${thingsHeard} <p>Towards the EAST, he hears ${east.getRandomThemeConcept(this.sense)}.</p>`;
            }
            return `${subject.processedName()} listens  carefully. He hears ${thingsHeard}`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let thingsHeard = [];
            for (let target of targets) {
                thingsHeard.push(target.getRandomThemeConcept(this.sense));
            }
            return `${subject.processedName()} listens carefully to ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}. He hears ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(thingsHeard)}.`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.noTarget(beat, current_room, subject);
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.Listen = Listen;


/***/ }),

/***/ 2741:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Look = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const BaseAction_1 = __webpack_require__(7042);
const ThemeStorage_1 = __webpack_require__(1288);
//assume only peewee can look
class Look extends BaseAction_1.Action {
    constructor() {
        /*
        KR points out that i managed to typo each one of these in a wholly unique way back in NorthEast.
    
        const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
        const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
        const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
        //
        const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];
    
        const listen_euphamemism = ["LISTEN", "HEAR"];
        //oh god why are you TASTING anything here.
        const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
        //should smell either faintly or overpoweringly
        const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
        //should feel weird and fake
        const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
        const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];
    
        past me is a treasure
        */
        super(...arguments);
        this.recognizedCommands = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE", "OGLE"];
        this.noTarget = (beat, current_room, subject) => {
            let thingsSeen = "Peewee glances around and sees";
            if (current_room.children.length === 1) {
                thingsSeen = `${thingsSeen} a door.`;
            }
            else {
                thingsSeen = `${thingsSeen} ${current_room.children.length} doors.`;
            }
            const north = current_room.getNorth();
            const south = current_room.getSouth();
            const east = current_room.getEast();
            if (north) {
                thingsSeen = `${thingsSeen} <p>On the NORTH door, he sees a sign labeled ${north.name}.</p>`;
            }
            if (current_room.totemObject) {
                return `${thingsSeen}  <p style="color: #a10000;font-family: zai_i_love_covid_19">${current_room.totemObject.lore}</p>`;
            }
            if (south) {
                thingsSeen = `${thingsSeen} <p>On the SOUTH door, he sees a sign labeled ${south.name}.</p>`;
            }
            if (east) {
                thingsSeen = `${thingsSeen} <p>On the EAST door, he sees a sign labeled ${east.name}.</p>`;
            }
            if (current_room.items.length > 0) {
                thingsSeen = `${thingsSeen} <p>He also sees ${current_room.items.length} item(s). Looking closer, they are ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(current_room.items.map((e) => e.processedName()))}.</p>`;
            }
            if (current_room.blorbos.length > 0) {
                thingsSeen = `${thingsSeen} <p>He also sees ${current_room.blorbos.length} blorbos(s). Looking closer, they are ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(current_room.blorbos.map((e) => e.processedName()))}.</p>`;
            }
            return thingsSeen;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let thingsHeard = [];
            for (let target of targets) {
                thingsHeard.push(`${target.getRandomThemeConcept(ThemeStorage_1.ADJ)} ${target.getRandomThemeConcept(ThemeStorage_1.PERSON)}`);
            }
            const lookcloser = current_room.rand.pickFrom(targets);
            const inventory = lookcloser.inventory.length > 0 ? (0, ArrayUtils_1.turnArrayIntoHumanSentence)(lookcloser.inventory.map((i) => i.processedName())) : "nothing";
            return `${subject.processedName()} looks at ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}. He sees an aura of ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(thingsHeard)}. He looks closer at the ${lookcloser.processedName()}. ${lookcloser.flavorText} They have ${inventory} in their inventory. Their movement algorithm is ${lookcloser.movement_alg.toString()}`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.noTarget(beat, current_room, subject);
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.Look = Look;


/***/ }),

/***/ 2900:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeleeKill = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const Quotidian_1 = __webpack_require__(6387);
const BaseAction_1 = __webpack_require__(7042);
//assume only peewee can do this
//hi!!! Did you know peewee is wasted? And a doom player?
class MeleeKill extends BaseAction_1.Action {
    constructor(causeOfDeath) {
        super();
        this.recognizedCommands = ["KILL", "MURDER", "SLAUGHTER"];
        this.noTarget = (beat, current_room, subject) => {
            return `${subject.processedName()} doesn't see anything to make un-alive.`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let killed = false;
            for (let target of targets) {
                if (target instanceof Quotidian_1.Quotidian) {
                    target.die(this.causeOfDeath, subject.name);
                    killed = true;
                }
            }
            if (!killed) {
                return this.noTarget(beat, current_room, subject);
            }
            return `${subject.processedName()} kills  ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}.`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.noTarget(beat, current_room, subject);
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
        this.causeOfDeath = causeOfDeath;
    }
}
exports.MeleeKill = MeleeKill;


/***/ }),

/***/ 4359:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PauseSimulation = void 0;
const BaseAction_1 = __webpack_require__(7042);
class PauseSimulation extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["PAUSE"]; //nothing, so its default
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.room.pause();
            return `Everything comes to a halt.`;
        };
    }
}
exports.PauseSimulation = PauseSimulation;


/***/ }),

/***/ 9936:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickupObject = void 0;
const BaseAction_1 = __webpack_require__(7042);
class PickupObject extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK", "PICK"];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} can't see anything to take like that...`;
            }
            subject.pickupObject(target[0]);
            if (target[0] === subject.room.peewee) {
                subject.enterObject();
            }
            subject.emitSass("!");
            return `${subject.processedName()} takes the  ${target[0].processedName()}.`;
        };
    }
}
exports.PickupObject = PickupObject;


/***/ }),

/***/ 9418:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveThemeFromObject = void 0;
const BaseAction_1 = __webpack_require__(7042);
const ArrayUtils_1 = __webpack_require__(3907);
class RemoveThemeFromObject extends BaseAction_1.Action {
    constructor(theme) {
        super();
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} can't see anything to modify with ${this.theme.key}...`;
            }
            (0, ArrayUtils_1.removeItemOnce)(subject.themes, this.theme);
            return `${subject.processedName()} modifies the  ${target[0].processedName()} to be less ${this.theme.key}.`;
        };
        this.theme = theme;
    }
}
exports.RemoveThemeFromObject = RemoveThemeFromObject;


/***/ }),

/***/ 7337:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveThemeFromRoom = void 0;
const BaseAction_1 = __webpack_require__(7042);
const ArrayUtils_1 = __webpack_require__(3907);
class RemoveThemeFromRoom extends BaseAction_1.Action {
    constructor(theme) {
        super();
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const target = beat.targets;
            if (target.length < 1) {
                return `${subject.processedName()} can't see anything to modify with ${this.theme.key}...`;
            }
            (0, ArrayUtils_1.removeItemOnce)(subject.room.themes, this.theme);
            return `${subject.processedName()} modifies the  ${subject.room.name} to be less ${this.theme.key}.`;
        };
        this.theme = theme;
    }
}
exports.RemoveThemeFromRoom = RemoveThemeFromRoom;


/***/ }),

/***/ 2042:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResumeSimulation = void 0;
const BaseAction_1 = __webpack_require__(7042);
//why yes you can just spam this for hilarious effect, you're welcome
class ResumeSimulation extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["RESUME"];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.room.resume();
            return `Everything begings moving again.`;
        };
    }
}
exports.ResumeSimulation = ResumeSimulation;


/***/ }),

/***/ 3834:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Smell = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const ThemeStorage_1 = __webpack_require__(1288);
const BaseAction_1 = __webpack_require__(7042);
//assume only peewee can look
class Smell extends BaseAction_1.Action {
    constructor() {
        /*
        KR points out that i managed to typo each one of these in a wholly unique way back in NorthEast.
    
        const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
        const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
        const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
        //
        const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];
    
        const listen_euphamemism = ["LISTEN", "HEAR"];
        //oh god why are you TASTING anything here.
        const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
        //should smell either faintly or overpoweringly
        const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
        //should feel weird and fake
        const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
        const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];
    
        past me is a treasure
        */
        super(...arguments);
        this.recognizedCommands = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
        this.sense = ThemeStorage_1.SMELL;
        this.noTarget = (beat, current_room, subject) => {
            const north = current_room.getNorth();
            const south = current_room.getSouth();
            const east = current_room.getEast();
            let thingsHeard = `the smell of ${current_room.getRandomThemeConcept(this.sense)}.`;
            if (north) {
                thingsHeard = `${thingsHeard} <p>Towards the NORTH, he detects a whiff of ${north.getRandomThemeConcept(this.sense)}.</p>`;
            }
            if (south) {
                thingsHeard = `${thingsHeard} <p>Towards the SOUTH, he  detects a whiff of ${south.getRandomThemeConcept(this.sense)}.</p>`;
            }
            if (east) {
                thingsHeard = `${thingsHeard} <p>Towards the EAST, he  detects a whiff of ${east.getRandomThemeConcept(this.sense)}.</p>`;
            }
            return `${subject.processedName()} takes in a lungful of air. His cybernetic nose detects traces of ${thingsHeard}`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let thingsHeard = [];
            for (let target of targets) {
                thingsHeard.push(target.getRandomThemeConcept(this.sense));
            }
            return `${subject.processedName()} slowly sniffs at ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}. He smells ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(thingsHeard)}. Kinda gross.`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.noTarget(beat, current_room, subject);
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.Smell = Smell;


/***/ }),

/***/ 8884:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpawnObjectAtFeet = void 0;
const BaseAction_1 = __webpack_require__(7042);
class SpawnObjectAtFeet extends BaseAction_1.Action {
    constructor(object) {
        super();
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const item = this.object.clone();
            item.name = beat.processTags(this.object.name);
            item.flavorText = beat.processTags(this.object.flavorText);
            item.x = beat.targets[0].x;
            item.y = beat.targets[0].y;
            item.updateRendering();
            subject.room.addItem(item);
            return `${subject.processedName()} drops a(n) ${this.object.name}.`;
        };
        this.object = object;
    }
}
exports.SpawnObjectAtFeet = SpawnObjectAtFeet;


/***/ }),

/***/ 2888:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpawnObjectFromThemeUnderFloorAtFeet = void 0;
const BaseAction_1 = __webpack_require__(7042);
const PhysicalObject_1 = __webpack_require__(8466);
const ThemeStorage_1 = __webpack_require__(1288);
const baseFilter_1 = __webpack_require__(9505);
class SpawnObjectFromThemeUnderFloorAtFeet extends BaseAction_1.Action {
    constructor(theme) {
        super();
        this.recognizedCommands = [];
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const raw_item = this.theme.pickPossibilityFor(subject.rand, ThemeStorage_1.FLOORBACKGROUND);
            // const image: any = await addImageProcess(`images/Walkabout/Objects/UnderFloorObjects/${item.src}`) as HTMLImageElement;
            const image = document.createElement("img");
            image.src = `images/Walkabout/Objects/UnderFloorObjects/${raw_item.src}`;
            const item = new PhysicalObject_1.PhysicalObject(subject.room, `${baseFilter_1.TARGETSTRING}'s blood`, 0, 0, image.width, image.height, [this.theme], 0, `images/Walkabout/Objects/UnderFloorObjects/${raw_item.src}`, `Something very upsetting happened here to ${baseFilter_1.TARGETSTRING}.`);
            image.onload = () => {
                item.width = image.width;
                item.height = image.height;
                item.updateRendering();
                subject.room.addItem(item);
            };
            if (beat.targets[0].name.toUpperCase().includes("PEEWEE") && item.name.toUpperCase().includes("BLOOD")) {
                item.container.style.filter = "hue-rotate(62deg) saturate(64%) brightness(224%)";
            }
            else {
            }
            item.name = beat.processTags(item.name);
            item.flavorText = beat.processTags(item.flavorText);
            item.x = beat.targets[0].x;
            item.y = beat.targets[0].y;
            return `${subject.processedName()} drops a(n) ${item.name}.`;
        };
        this.theme = theme;
    }
}
exports.SpawnObjectFromThemeUnderFloorAtFeet = SpawnObjectFromThemeUnderFloorAtFeet;


/***/ }),

/***/ 4469:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StopMoving = void 0;
const NoMovement_1 = __webpack_require__(4956);
const BaseAction_1 = __webpack_require__(7042);
class StopMoving extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["STOP", "FREEZE", "STILL", "STAND"]; //nothing, so its default
        this.applyAction = (beat) => {
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            subject.movement_alg = new NoMovement_1.NoMovement(subject);
            return `${subject.processedName()} comes to a halt.`;
        };
    }
}
exports.StopMoving = StopMoving;


/***/ }),

/***/ 8520:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Taste = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const ThemeStorage_1 = __webpack_require__(1288);
const BaseAction_1 = __webpack_require__(7042);
//assume only peewee can look
class Taste extends BaseAction_1.Action {
    constructor() {
        /*
        KR points out that i managed to typo each one of these in a wholly unique way back in NorthEast.
    
        const look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
        const greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
        const farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
        //
        const get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];
    
        const listen_euphamemism = ["LISTEN", "HEAR"];
        //oh god why are you TASTING anything here.
        const taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
        //should smell either faintly or overpoweringly
        const smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
        //should feel weird and fake
        const touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
        const help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];
    
        past me is a treasure
        */
        super(...arguments);
        this.recognizedCommands = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
        this.sense = ThemeStorage_1.TASTE;
        this.noTarget = (beat, current_room, subject) => {
            const north = current_room.getNorth();
            const south = current_room.getSouth();
            const east = current_room.getEast();
            let thingsHeard = `the taste of ${current_room.getRandomThemeConcept(this.sense)}.`;
            if (north) {
                thingsHeard = `${thingsHeard} <p>When he licks the doorknob of the NORTH DOOR he tastes ${north.getRandomThemeConcept(this.sense)}.</p>`;
            }
            if (south) {
                thingsHeard = `${thingsHeard} <p>When he licks the doorknob of the SOUTH DOOR he tastes ${south.getRandomThemeConcept(this.sense)}.</p>`;
            }
            if (east) {
                thingsHeard = `${thingsHeard} <p>When he licks the doorknob of the EAST DOOR he tastes ${east.getRandomThemeConcept(this.sense)}.</p>`;
            }
            return `${subject.processedName()} starts licking things at random. He has so many regrets. He will never forget the flavor of ${thingsHeard}`;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let thingsHeard = [];
            for (let target of targets) {
                thingsHeard.push(target.getRandomThemeConcept(this.sense));
            }
            return `${subject.processedName()} slowly licks ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))}. He tastes ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(thingsHeard)}. Why would you have him do that!?`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.noTarget(beat, current_room, subject);
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.Taste = Taste;


/***/ }),

/***/ 5639:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Think = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const BaseAction_1 = __webpack_require__(7042);
const ThemeStorage_1 = __webpack_require__(1288);
//assume only peewee can look
class Think extends BaseAction_1.Action {
    constructor() {
        super(...arguments);
        this.recognizedCommands = ["THINK", "PONDER", "CONTEMPLATE", "PHILOSOPHIZE", "BULLSHIT"];
        this.concept = ThemeStorage_1.PHILOSOPHY;
        this.noTarget = (beat, current_room, subject) => {
            let thingsSeen = `Peewee thinks: ${current_room.getRandomThemeConcept(this.concept)}. `;
            const north = current_room.getNorth();
            const south = current_room.getSouth();
            const east = current_room.getEast();
            if (north) {
                thingsSeen = `${thingsSeen} <p>Looking at the NORTH door, he thinks: ${north.getRandomThemeConcept(this.concept)}.</p>`;
            }
            if (south) {
                thingsSeen = `${thingsSeen} <p>Looking at the SOUTH door, he thinks:  ${south.getRandomThemeConcept(this.concept)}.</p>`;
            }
            if (east) {
                thingsSeen = `${thingsSeen} <p>Looking at the EAST door, he thinks: ${east.getRandomThemeConcept(this.concept)}.</p>`;
            }
            return thingsSeen;
        };
        this.withTargets = (beat, current_room, subject, targets) => {
            let thingsHeard = [];
            for (let target of targets) {
                thingsHeard.push(target.getRandomThemeConcept(this.concept));
            }
            return `${subject.processedName()} looks to ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(targets.map((e) => e.processedName()))} for inspiration. He thinks: ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(thingsHeard)}`;
        };
        this.applyAction = (beat) => {
            const current_room = beat.owner?.room;
            if (!current_room) {
                return "";
            }
            const subject = beat.owner;
            if (!subject) {
                return "";
            }
            const targets = beat.targets;
            if (targets.length === 0) {
                return this.noTarget(beat, current_room, subject);
            }
            else {
                return this.withTargets(beat, current_room, subject, targets);
            }
        };
    }
}
exports.Think = Think;


/***/ }),

/***/ 5095:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

///they have a lil house on their back
//Yongki likes them, so i decided to add one
//also, and i didn't realize this till last night
//their houses are spirals
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chicken = void 0;
const SteadyMovement_1 = __webpack_require__(1148);
const PhysicalObject_1 = __webpack_require__(8466);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const DestroyObjectInInventoryWithThemes_1 = __webpack_require__(457);
const FollowObject_1 = __webpack_require__(744);
const PickupObject_1 = __webpack_require__(9936);
const SpawnObjectAtFeet_1 = __webpack_require__(8884);
const BaseBeat_1 = __webpack_require__(1708);
const baseFilter_1 = __webpack_require__(9505);
const TargetHasObjectWithTheme_1 = __webpack_require__(9093);
const TargetHasTheme_1 = __webpack_require__(2615);
const TargetIsWithinRadiusOfSelf_1 = __webpack_require__(5535);
const Quotidian_1 = __webpack_require__(6387);
//which came first, the chicken or the egg?
class Chicken extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "chicken_left.gif", width: 33, height: 28 },
            left_src: { src: "chicken_left.gif", width: 33, height: 28 },
            right_src: { src: "chicken_right.gif", width: 33, height: 28 },
            up_src: { src: "chicken_up.gif", width: 29, height: 28 },
            down_src: { src: "chicken_down.gif", width: 29, height: 28 }
        };
        const egg = new PhysicalObject_1.PhysicalObject(room, "Egg", 0, 0, 13, 19, [], 0, "images/Walkabout/Objects/TopFloorObjects/egg.png", "It's a pretty basic chicken egg.");
        const eatPlant = new BaseBeat_1.AiBeat("Chicken: Eat Plant", [`The chicken eats the ${baseFilter_1.TARGETSTRING}.`], [new TargetHasObjectWithTheme_1.TargetHasObjectWithTheme([Theme_1.all_themes[ThemeStorage_1.PLANTS]], { kMode: true })], [new DestroyObjectInInventoryWithThemes_1.DestroyInventoryObjectWithThemes([Theme_1.all_themes[ThemeStorage_1.PLANTS]]), new SpawnObjectAtFeet_1.SpawnObjectAtFeet(egg)], true, 1000 * 60);
        const eatBug = new BaseBeat_1.AiBeat("Chicken: Eat Bug", [`The chicken eats the ${baseFilter_1.TARGETSTRING}.`], [new TargetHasObjectWithTheme_1.TargetHasObjectWithTheme([Theme_1.all_themes[ThemeStorage_1.BUGS]], { kMode: true })], [new DestroyObjectInInventoryWithThemes_1.DestroyInventoryObjectWithThemes([Theme_1.all_themes[ThemeStorage_1.BUGS]]), new SpawnObjectAtFeet_1.SpawnObjectAtFeet(egg)], true, 1000 * 60);
        const approachPlantOrBug = new BaseBeat_1.AiBeat("Chicken: Investigate Food", [`The chicken's beady little eyes focus on the ${baseFilter_1.TARGETSTRING}.`], [new TargetHasTheme_1.TargetHasTheme([Theme_1.all_themes[ThemeStorage_1.BUGS], Theme_1.all_themes[ThemeStorage_1.PLANTS]], { singleTarget: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { invert: true })], [new FollowObject_1.FollowObject()], true, 1000 * 60);
        const pickupPlantOrBug = new BaseBeat_1.AiBeat("Chicken: Peck Food", [`The chicken pecks at the ${baseFilter_1.TARGETSTRING}.`], [new TargetHasTheme_1.TargetHasTheme([Theme_1.all_themes[ThemeStorage_1.BUGS], Theme_1.all_themes[ThemeStorage_1.PLANTS]], { singleTarget: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5)], [new PickupObject_1.PickupObject()], true, 1000 * 60);
        const beats = [
            eatBug,
            eatPlant,
            pickupPlantOrBug,
            approachPlantOrBug
        ];
        super(room, "Chicken Friend", x, y, [Theme_1.all_themes[ThemeStorage_1.CRAFTING]], sprite, "They make eggs. Eggs are important.", beats);
        this.lore = "Why does the Eye Kliler love eggs? It's simple. Because when everything was scary and dangerous, someone made her eggs. Yes, he was at knife point at the time. But the point is he DID and he did them well and she never forgot. ";
        this.maxSpeed = 10;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new SteadyMovement_1.SteadyMovement(this);
    }
}
exports.Chicken = Chicken;


/***/ }),

/***/ 9621:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//just leave her alone with her egg
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsightTwin = exports.Devona = void 0;
const NoMovement_1 = __webpack_require__(4956);
const RandomMovement_1 = __webpack_require__(5997);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const FollowObject_1 = __webpack_require__(744);
const GiveRandomObjectToTarget_1 = __webpack_require__(4009);
const IncrementMyState_1 = __webpack_require__(9211);
const PickupObject_1 = __webpack_require__(9936);
const BaseBeat_1 = __webpack_require__(1708);
const baseFilter_1 = __webpack_require__(9505);
const IHaveObjectWithName_1 = __webpack_require__(6274);
const TargetIsAlive_1 = __webpack_require__(7064);
const TargetIsWithinRadiusOfSelf_1 = __webpack_require__(5535);
const TargetNameIncludesAnyOfTheseWords_1 = __webpack_require__(4165);
const Quotidian_1 = __webpack_require__(6387);
class Devona extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Placeholders/thetwins1.png", width: 50, height: 50 },
        };
        const breachedSprite = {
            default_src: { src: "Placeholders/twins.png", width: 50, height: 50 },
        };
        //she's too nervous to pocket actual living creatures but if its dead or inanimate she will
        const approachObject = new BaseBeat_1.AiBeat("Devona: Investigate Object", [`Devona begins slinking towards the ${baseFilter_1.TARGETSTRING}.`], [new TargetIsAlive_1.TargetIsAlive({ invert: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true, invert: true })], [new FollowObject_1.FollowObject()], true, 1000 * 60);
        //devona! stop pickign up living creatures and putting them in your pocket! thats for breach mode
        const pickupObject = new BaseBeat_1.AiBeat("Devona: Acquire Object", [`Devona's eyes dart from side to side as she pockets the ${baseFilter_1.TARGETSTRING}.`], [new TargetIsAlive_1.TargetIsAlive({ invert: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true })], [new PickupObject_1.PickupObject()], true, 1000 * 90);
        //if devona has an object, she brings it to twinsey
        const approachNevilleWithObject = new BaseBeat_1.AiBeat("Devona: Bring Object to Twin", [`Devona calls out to Neville, telling him she has something for him to Analyze.`], [new IHaveObjectWithName_1.IHaveObjectWithName([]), new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Neville"]), new TargetIsAlive_1.TargetIsAlive(), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true, invert: true })], [new FollowObject_1.FollowObject()], true, 1000 * 30);
        const giveNevilleObject = new BaseBeat_1.AiBeat("Devona: Hand Over Object For Analysis", [`Handing over the ${BaseBeat_1.ITEMSTRING}, Devona smiles as she see's Neville's face light up under his sunglasses.`], [new IHaveObjectWithName_1.IHaveObjectWithName([]), new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Neville"], { singleTarget: true }), new TargetIsAlive_1.TargetIsAlive(), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true })], [new GiveRandomObjectToTarget_1.GiveRandomObjectToTarget()], true, 1000 * 60);
        const punishTheguilty = new BaseBeat_1.AiBeat("Devona: Punish Your Brother's Killer", [`With a deafening cry of grief and rage, Devona's body begins twisting and crunching until the Insightful Punishing Twin emerges.`], [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Neville"]), new TargetIsAlive_1.TargetIsAlive({ invert: true })], [new IncrementMyState_1.IncrementMyState("no")], true, 1000 * 60);
        const beats = [punishTheguilty, giveNevilleObject, approachNevilleWithObject, pickupObject, approachObject];
        const states = [new InsightTwin(room, 0, 0)];
        super(room, "Devona", x, y, [Theme_1.all_themes[ThemeStorage_1.HUNTING], Theme_1.all_themes[ThemeStorage_1.SPYING], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION], Theme_1.all_themes[ThemeStorage_1.KNOWING]], sprite, "Devona is staring at you.", beats, states);
        this.lore = "Parker says her soul is a small grey parrot. Always watching, always repeating, always hiding. ";
        this.maxSpeed = 8;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new RandomMovement_1.RandomMovement(this);
    }
}
exports.Devona = Devona;
class InsightTwin extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Placeholders/twins.png", width: 50, height: 50 },
        };
        const beats = [];
        super(room, "Insight Punishing Twin", x, y, [Theme_1.all_themes[ThemeStorage_1.HUNTING], Theme_1.all_themes[ThemeStorage_1.SPYING], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION], Theme_1.all_themes[ThemeStorage_1.KNOWING]], sprite, "The Insightful Punishing Twin is hunting.", beats);
        this.lore = "Parker says her soul is a small grey parrot. Always watching, always repeating, always hiding. ";
        this.maxSpeed = 8;
        this.minSpeed = 5;
        this.currentSpeed = 10;
        this.breached = true;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new NoMovement_1.NoMovement(this);
    }
}
exports.InsightTwin = InsightTwin;


/***/ }),

/***/ 8115:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.End = exports.Camille = void 0;
const NoMovement_1 = __webpack_require__(4956);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const DeploySass_1 = __webpack_require__(4237);
const FollowObject_1 = __webpack_require__(744);
const MeleeKill_1 = __webpack_require__(2900);
const BaseBeat_1 = __webpack_require__(1708);
const baseFilter_1 = __webpack_require__(9505);
const RandomTarget_1 = __webpack_require__(9824);
const TargetIsAlive_1 = __webpack_require__(7064);
const TargetIsBlorboBox_1 = __webpack_require__(4068);
const TargetIsWithinRadiusOfSelf_1 = __webpack_require__(5535);
const Quotidian_1 = __webpack_require__(6387);
class Camille extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "the_end2.png", width: 56, height: 100 },
        };
        const start = "<span class='asl'>";
        const end = "</span>";
        const BreathOnObject = new BaseBeat_1.AiBeat("Camille: Be Friends", [`Camille looms over ${baseFilter_1.TARGETSTRING}. She says '${start}Where are we going?${end}'.`, `Camille looms over ${baseFilter_1.TARGETSTRING}. She says '${start}Hello!${end}'.`, `Camille looms over ${baseFilter_1.TARGETSTRING}. She says ':3'.`, `Camille looms over ${baseFilter_1.TARGETSTRING}. She says '${start}Friend!${end}'.`], [new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive(), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true })], [new DeploySass_1.DeploySass(":)")], true, 2 * 60 * 1000);
        //she doesn't tend to change her mind
        const ObesssOverBlorbo = new BaseBeat_1.AiBeat("Camille: Make Friends", [`Camille locks eyes with ${baseFilter_1.TARGETSTRING}.`], [new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive(), new RandomTarget_1.RandomTarget(.5, { singleTarget: true })], [new FollowObject_1.FollowObject()]);
        const beats = [ObesssOverBlorbo, BreathOnObject];
        const states = [new End(room, 0, 0)];
        super(room, "Camille", x, y, [Theme_1.all_themes[ThemeStorage_1.ENDINGS], Theme_1.all_themes[ThemeStorage_1.KILLING], Theme_1.all_themes[ThemeStorage_1.QUESTING], Theme_1.all_themes[ThemeStorage_1.LONELY]], sprite, "The End Comes For Us All", beats, states);
        this.lore = "Parker has said her soul has the shape of an Irish Wolfound.  Something friendly and big that does not understand why you find it intimidating. It thinks it is a lapdog, it just wants to be friends. Unless you are for killing. Then you are dead. Very, very, quickly dead.";
        this.maxSpeed = 50;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new NoMovement_1.NoMovement(this);
        this.die = (causeOfDeath) => {
            console.warn(`JR NOTE: whoops. Looks like Camille...lost her head! 🥁 `);
            this.incrementState();
            this.breaching = true;
        };
    }
}
exports.Camille = Camille;
class End extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "theend.png", width: 56, height: 100 },
        };
        const KillObject = new BaseBeat_1.AiBeat("End: End Them", [`The time has come. It was always going to end this way. All who are born die. ${baseFilter_1.TARGETSTRING} meets their end with one clean cut.`], [new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive(), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true })], [new MeleeKill_1.MeleeKill("being alive")], true, 2 * 60 * 1000);
        //she doesn't tend to change her mind
        const ObesssOverBlorbo = new BaseBeat_1.AiBeat("End: Pick Target", [`The shambling corpse of a long dead warrior begins calmly walking towards ${baseFilter_1.TARGETSTRING}.`], [new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive(), new RandomTarget_1.RandomTarget(.5, { singleTarget: true })], [new FollowObject_1.FollowObject()]);
        const beats = [ObesssOverBlorbo, KillObject];
        super(room, "End", x, y, [Theme_1.all_themes[ThemeStorage_1.ENDINGS], Theme_1.all_themes[ThemeStorage_1.KILLING], Theme_1.all_themes[ThemeStorage_1.QUESTING], Theme_1.all_themes[ThemeStorage_1.LONELY]], sprite, "The End Comes For Us All", beats);
        this.lore = "Parker has said her soul has the shape of an Irish Wolfound.  Something friendly and big that does not understand why you find it intimidating. It thinks it is a lapdog, it just wants to be friends. Unless you are for killing. Then you are dead. Very, very, quickly dead.";
        this.maxSpeed = 50;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new NoMovement_1.NoMovement(this);
        this.die = (causeOfDeath) => {
            console.warn(`JR NOTE: did you actually think Death could die? That the Coffin Spawn itself could end???`);
        };
    }
}
exports.End = End;


/***/ }),

/***/ 2937:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//just leave her alone with her egg
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Innocent = exports.EyeKiller = void 0;
const NoMovement_1 = __webpack_require__(4956);
const RandomMovement_1 = __webpack_require__(5997);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const AddThemeToRoom_1 = __webpack_require__(8072);
const FollowObject_1 = __webpack_require__(744);
const IncrementMyState_1 = __webpack_require__(9211);
const MeleeKill_1 = __webpack_require__(2900);
const PickupObject_1 = __webpack_require__(9936);
const SpawnObjectFromThemeUnderFloorAtFeet_1 = __webpack_require__(2888);
const BaseBeat_1 = __webpack_require__(1708);
const baseFilter_1 = __webpack_require__(9505);
const IHaveObjectWithName_1 = __webpack_require__(6274);
const RandomTarget_1 = __webpack_require__(9824);
const TargetExistsInAWorldWhereBlorboWithNameIsAlive_1 = __webpack_require__(4186);
const TargetHasObjectWithName_1 = __webpack_require__(4864);
const TargetIsAlive_1 = __webpack_require__(7064);
const TargetIsBlorboBox_1 = __webpack_require__(4068);
const TargetIsWithinRadiusOfSelf_1 = __webpack_require__(5535);
const TargetNameIncludesAnyOfTheseWords_1 = __webpack_require__(4165);
const Quotidian_1 = __webpack_require__(6387);
class EyeKiller extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "KillerLeft.gif", width: 50, height: 50 },
            left_src: { src: "KillerLeft.gif", width: 50, height: 50 },
            right_src: { src: "KillerRight.gif", width: 50, height: 50 },
            up_src: { src: "KillerUp.gif", width: 50, height: 50 },
            down_src: { src: "KillerDown.gif", width: 50, height: 50 }
        };
        super(room, "Eye Killer", x, y, [Theme_1.all_themes[ThemeStorage_1.HUNTING], Theme_1.all_themes[ThemeStorage_1.KILLING], Theme_1.all_themes[ThemeStorage_1.FAMILY], Theme_1.all_themes[ThemeStorage_1.DARKNESS]], sprite, "It's the Eye Killer! I'd leave her alone!", []);
        this.lore = "Parker has said her soul is in the shape of a ram. He says there is a joke in there, about time and sheep. (in the West, sheep are sacrificed to travel in time) But the important point is that the Killer's soul is that of prey, that of something CERTAIN you will KILL it unless she rams her blade deep into your heart first. They say horses live in silent hill, but sheep must, too.";
        this.maxSpeed = 50;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new NoMovement_1.NoMovement(this);
        this.setupAI = async () => {
            //hunting time
            const pickATarget = new BaseBeat_1.AiBeat("Killer: Hunt", [`The Eye Killer begins hunting ${baseFilter_1.TARGETSTRING}.`], [new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive(), new RandomTarget_1.RandomTarget(.5, { singleTarget: true })], [new FollowObject_1.FollowObject()], true, 1000 * 60);
            const approachEgg = new BaseBeat_1.AiBeat("Killer: Go Egg", [`The Eye Killer sees the ${baseFilter_1.TARGETSTRING}.`], [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Egg"], { singleTarget: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { invert: true })], [new FollowObject_1.FollowObject()], true, 1000 * 60);
            const pickupEgg = new BaseBeat_1.AiBeat("Killer: Take Egg", [`The Eye Killer picks up the ${baseFilter_1.TARGETSTRING}.`], [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Egg"]), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5)], [new PickupObject_1.PickupObject()], true, 1000 * 60);
            //new IHaveObjectWithName(["Egg"], {invert: true}),new TargetHasObjectWithName(["Egg"], {invert: true}),
            const killUnlessYouHaveAnEggOrTheyDo = new BaseBeat_1.AiBeat("Killer: Kill", [`The Eye Killer brutally stabs the  ${baseFilter_1.TARGETSTRING} over and over until they stop twitching.`], [new IHaveObjectWithName_1.IHaveObjectWithName(["Egg"], { invert: true }), new TargetHasObjectWithName_1.TargetHasObjectWithName(["Egg"], { invert: true }), new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive(), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true })], [new MeleeKill_1.MeleeKill("brutally stabs over and over"), new AddThemeToRoom_1.AddThemeToRoom(Theme_1.all_themes[ThemeStorage_1.KILLING]), new SpawnObjectFromThemeUnderFloorAtFeet_1.SpawnObjectFromThemeUnderFloorAtFeet(Theme_1.all_themes[ThemeStorage_1.KILLING])], true, 30 * 1000);
            const desecrateCorpse = new BaseBeat_1.AiBeat("Killer: Do Art", [`The Eye Killer appears to creating some sort of art piece out of what remains of the ${baseFilter_1.TARGETSTRING}.`], [new IHaveObjectWithName_1.IHaveObjectWithName(["Egg"], { invert: true }), new TargetHasObjectWithName_1.TargetHasObjectWithName(["Egg"], { invert: true }), new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive({ invert: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true })], [new AddThemeToRoom_1.AddThemeToRoom(Theme_1.all_themes[ThemeStorage_1.KILLING]), new SpawnObjectFromThemeUnderFloorAtFeet_1.SpawnObjectFromThemeUnderFloorAtFeet(Theme_1.all_themes[ThemeStorage_1.KILLING])], true, 30 * 1000);
            const beats = [
                approachEgg,
                pickupEgg,
                killUnlessYouHaveAnEggOrTheyDo,
                desecrateCorpse,
                pickATarget
            ];
            this.makeBeatsMyOwn(beats);
        };
        this.setupAI();
        this.breaching = true;
    }
}
exports.EyeKiller = EyeKiller;
class Innocent extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "InnocentLeft.gif", width: 50, height: 50 },
            left_src: { src: "InnocentLeft.gif", width: 50, height: 50 },
            right_src: { src: "InnocentRight.gif", width: 50, height: 50 },
            up_src: { src: "Innocent_upwards.gif", width: 50, height: 50 },
            down_src: { src: "innocentforward.gif", width: 50, height: 50 }
        };
        const theTimeLineMustAlwaysHaveOne = new BaseBeat_1.AiBeat("Innocent: Accept Your Fate", [`The Innocent screams as she's wreathed in seething shadows.  For a full minute barely visible clocks tick out the time.  When it finally ends, she emerges as the Eye Killer. She has always been the Eye Killer. `], [new TargetExistsInAWorldWhereBlorboWithNameIsAlive_1.TargetExistsInAWorldWhereBlorboNamedXIsAlive("Eye Killer", { invert: true })], [new IncrementMyState_1.IncrementMyState("is covered in seething shadows for a full minute as barely visible clocks swirl and tick. When it finally ends, she emerges as the Eye Killer. She has always been the Eye Killer. ")], true, 1000 * 60);
        const beats = [theTimeLineMustAlwaysHaveOne];
        const states = [new EyeKiller(room, 0, 0)];
        super(room, "Innocent", x, y, [Theme_1.all_themes[ThemeStorage_1.FAMILY], Theme_1.all_themes[ThemeStorage_1.ANGELS]], sprite, "Wow, she seems totally innocent!", beats, states);
        this.maxSpeed = 50;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new RandomMovement_1.RandomMovement(this);
        this.lore = "She should not be here. She is not part of the Loop.  The Eye Killer made sure of it. And yet. If the Killer falls...the Innocent is the Killer. In the end.";
    }
}
exports.Innocent = Innocent;


/***/ }),

/***/ 7455:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JR = void 0;
const RandomMovement_1 = __webpack_require__(5997);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const Quotidian_1 = __webpack_require__(6387);
//something is different about this jr, what could it be
class JR extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "JRmoveleftblood.gif", width: 50, height: 50 },
            left_src: { src: "JRmoveleftblood.gif", width: 50, height: 50 },
            right_src: { src: "JRmoverightblood.gif", width: 50, height: 50 },
            up_src: { src: "jrwalkgoupblood.gif", width: 50, height: 50 },
            down_src: { src: "jrwalkforwardblood.gif", width: 50, height: 50 }
        };
        const beats = [];
        super(room, "JR", x, y, [Theme_1.all_themes[ThemeStorage_1.TWISTING], Theme_1.all_themes[ThemeStorage_1.WEB], Theme_1.all_themes[ThemeStorage_1.WASTE], Theme_1.all_themes[ThemeStorage_1.LONELY], Theme_1.all_themes[ThemeStorage_1.KILLING]], sprite, "Boy this sure is an off brand JR, huh?", beats);
        this.lore = "My creator says that Mind made sense for AUs and choices and artificial intelligence. However, something different was needed for Zampanio. Connecting disparate fandoms, connecting disparate people. The red string of veins or thread connecting us all.";
        this.maxSpeed = 5;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new RandomMovement_1.RandomMovement(this);
    }
}
exports.JR = JR;


/***/ }),

/***/ 7685:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//just leave her alone with her egg
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Match = void 0;
const RandomMovement_1 = __webpack_require__(5997);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const Quotidian_1 = __webpack_require__(6387);
class Match extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Placeholders/thematch.png", width: 50, height: 50 },
        };
        const breachedSprite = {
            default_src: { src: "Placeholders/match2.png", width: 50, height: 50 },
        };
        const beats = [];
        super(room, "Match", x, y, [Theme_1.all_themes[ThemeStorage_1.FIRE], Theme_1.all_themes[ThemeStorage_1.MUSIC], Theme_1.all_themes[ThemeStorage_1.WEB], Theme_1.all_themes[ThemeStorage_1.ADDICTION]], sprite, "Ria sure looks like she's trying to figure something out!", beats);
        this.lore = "Parker says her soul has the shape of an Elephant. She feels too big, too loud, too clumsy. She feels she takes up so so much room and her problems are huge and insurmountable and she just wishes she could shrink into herself. She just wishes she could F1X TH1NGS so she could stop burdening the ones she loves.";
        this.maxSpeed = 8;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new RandomMovement_1.RandomMovement(this);
    }
}
exports.Match = Match;


/***/ }),

/***/ 3668:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//just leave her alone with her egg
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FortitudeTwin = exports.Neville = void 0;
const NoMovement_1 = __webpack_require__(4956);
const RandomMovement_1 = __webpack_require__(5997);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const DeploySass_1 = __webpack_require__(4237);
const DestroyRandomObjectInInventoryAndPhilosophise_1 = __webpack_require__(4516);
const IncrementMyState_1 = __webpack_require__(9211);
const BaseBeat_1 = __webpack_require__(1708);
const IHaveObjectWithName_1 = __webpack_require__(6274);
const TargetIsAlive_1 = __webpack_require__(7064);
const TargetNameIncludesAnyOfTheseWords_1 = __webpack_require__(4165);
const Quotidian_1 = __webpack_require__(6387);
class Neville extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Placeholders/thetwins2.png", width: 50, height: 50 },
        };
        const breachedSprite = {
            default_src: { src: "Placeholders/twins.png", width: 50, height: 50 },
        };
        /*
        extremely important to note here, neville is doing the OPPOSITE of what he'd do in reality.

        this shitty lil broken ai quotidian verison of neville is DESTROYING knowledge and highlighting irrelevancies

        when what he's supposed to do is passively allow the destruction of what is irrelevant in order to highlight the Most Important Thing about an object. pare it down to its essentials
        */
        const extractMeaningFromObject = new BaseBeat_1.AiBeat("Neville: Destroy and Extract Knowledge", [`Neville notices he has a(n) ${BaseBeat_1.ITEMSTRING}. He quickly erases it from existence and explains to anyone listening that "${BaseBeat_1.BONUSSTRING}" <p>He seems happy to understand the core of this item. He says ":)  I learned something!"</p>   `], [new IHaveObjectWithName_1.IHaveObjectWithName([])], [new DestroyRandomObjectInInventoryAndPhilosophise_1.DestroyRandomObjectInInventoryAndPhilosophize(), new DeploySass_1.DeploySass(":)")], true, 1000 * 60);
        const punishTheguilty = new BaseBeat_1.AiBeat("Neville: Punish Your Sisters's Killer", [`With a silent scream of mute horror, Neville's body begins twisting and crunching until the Fortitudinous Punishing Twin emerges.`], [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Devona"]), new TargetIsAlive_1.TargetIsAlive({ invert: true })], [new IncrementMyState_1.IncrementMyState("no")], true, 1000 * 60);
        const beats = [punishTheguilty, extractMeaningFromObject];
        const states = [new FortitudeTwin(room, 0, 0)];
        super(room, "Neville", x, y, [Theme_1.all_themes[ThemeStorage_1.HUNTING], Theme_1.all_themes[ThemeStorage_1.SPYING], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION], Theme_1.all_themes[ThemeStorage_1.MATH]], sprite, "Neville is staring into space.", beats, states);
        this.lore = "According to Parker, his soul is like an Emu. Powerful and fast, yet willing to starve itself to protect those that matter. ";
        this.maxSpeed = 8;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new NoMovement_1.NoMovement(this);
    }
}
exports.Neville = Neville;
class FortitudeTwin extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Placeholders/twins.png", width: 50, height: 50 },
        };
        const extractMeaningFromObject = new BaseBeat_1.AiBeat("Neville: Destroy and Extract Knowledge", [`Neville notices he has a(n) ${BaseBeat_1.ITEMSTRING}. He quickly erases it from existence and explains to anyone listening that "${BaseBeat_1.BONUSSTRING}" <p>He seems happy to understand the core of this item. He says ":)  I learned something!"</p>   `], [new IHaveObjectWithName_1.IHaveObjectWithName([])], [new DestroyRandomObjectInInventoryAndPhilosophise_1.DestroyRandomObjectInInventoryAndPhilosophize(), new DeploySass_1.DeploySass(":)")], true, 1000 * 60);
        const beats = [];
        super(room, "Fortitudinous Punishing Twin", x, y, [Theme_1.all_themes[ThemeStorage_1.HUNTING], Theme_1.all_themes[ThemeStorage_1.SPYING], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION], Theme_1.all_themes[ThemeStorage_1.MATH]], sprite, "The Fortitude Punishing Twin is hunting.", beats);
        this.lore = "According to Parker, his soul is like an Emu. Powerful and fast, yet willing to starve itself to protect those that matter. ";
        this.maxSpeed = 8;
        this.minSpeed = 5;
        this.currentSpeed = 10;
        this.breached = true;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new RandomMovement_1.RandomMovement(this);
    }
}
exports.FortitudeTwin = FortitudeTwin;


/***/ }),

/***/ 936:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//base level Entity object. quotidians can turn into anything
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Peewee = void 0;
const NoMovement_1 = __webpack_require__(4956);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const BaseAction_1 = __webpack_require__(7042);
const Feel_1 = __webpack_require__(4543);
const FollowObject_1 = __webpack_require__(744);
const GlitchBreach_1 = __webpack_require__(3674);
const GlitchDeath_1 = __webpack_require__(6315);
const GlitchLife_1 = __webpack_require__(6357);
const GoEast_1 = __webpack_require__(7192);
const GoNorth_1 = __webpack_require__(7415);
const GoSouth_1 = __webpack_require__(3535);
const GoWest_1 = __webpack_require__(4834);
const Help_1 = __webpack_require__(3256);
const Listen_1 = __webpack_require__(7576);
const Look_1 = __webpack_require__(2741);
const PauseSimulation_1 = __webpack_require__(4359);
const ResumeSimulation_1 = __webpack_require__(2042);
const Smell_1 = __webpack_require__(3834);
const StopMoving_1 = __webpack_require__(4469);
const Taste_1 = __webpack_require__(8520);
const Think_1 = __webpack_require__(5639);
const BaseBeat_1 = __webpack_require__(1708);
const TargetNameIncludesAnyOfTheseWords_1 = __webpack_require__(4165);
const Quotidian_1 = __webpack_require__(6387);
const FRIEND_1 = __webpack_require__(4769);
const PickupObject_1 = __webpack_require__(9936);
const DropAllObjects_1 = __webpack_require__(4102);
const CheckInventory_1 = __webpack_require__(1201);
const EnterObject_1 = __webpack_require__(9722);
const DropObjectWithName_1 = __webpack_require__(2827);
const GiveObjectWithNameToTarget_1 = __webpack_require__(6290);
//what, did you think any real being could be so formulaic? 
//regarding the real peewee, wanda is actually quite THRILLED there is a competing parasite in the Echidna distracting the immune system (and tbf, preventing an immune disorder in the form of the eye killer)
//the universe is AWARE of the dangers to it and endlessly expands its immune system response
//becoming ever more inflamed
//but it can never be enough
class Peewee extends Quotidian_1.Quotidian {
    //TODO have a movement algorithm (effects can shift this)
    /*
    example movement algorithm
    * random
    * searching pattern
    * to north
    * to south
    * to east
    * to ENTITY
    * to OBJECT
    */
    //TODO have a list of Scenes (trigger, effect, like quest engine from NorthNorth)
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Peewee/left.gif", width: 90, height: 90 },
            left_src: { src: "Peewee/left.gif", width: 90, height: 90 },
            right_src: { src: "Peewee/right.gif", width: 90, height: 90 },
            up_src: { src: "Peewee/back.gif", width: 45, height: 90 },
            down_src: { src: "Peewee/front.gif", width: 45, height: 90 }
        };
        const beats = [];
        super(room, "Peewee", x, y, [Theme_1.all_themes[ThemeStorage_1.ENDINGS], Theme_1.all_themes[ThemeStorage_1.WEB], Theme_1.all_themes[ThemeStorage_1.TECHNOLOGY]], sprite, "It's Peewee, the Glitch of Doom, the Devil of Spirals, the Puppet of Twisted Fate here to dance for your amusement. It's okay. If he weren't caught in your Threads, he'd be trying to End all our fun. We can't have that, now can we? After all, the End can Never Be The End in a Spiral :) :) :)", beats);
        this.lore = "While this is, clearly, not Peewee, it is, perhaps, the closest to Peewee anyone could be. A puppet with irrelevant will dancing for your pleasure.";
        this.maxSpeed = 20;
        this.minSpeed = 1;
        this.currentSpeed = 10;
        //only for peewee
        this.possibleActions = [new PauseSimulation_1.PauseSimulation(), new ResumeSimulation_1.ResumeSimulation(), new StopMoving_1.StopMoving(), new GoNorth_1.GoNorth(), new GoEast_1.GoEast(), new GoSouth_1.GoSouth(), new GoWest_1.GoWest(), new GiveObjectWithNameToTarget_1.GiveObjectWithName(""), new DropObjectWithName_1.DropObjectWithName(""), new EnterObject_1.EnterObject(), new CheckInventory_1.CheckInventory(), new FollowObject_1.FollowObject(), new PickupObject_1.PickupObject(), new DropAllObjects_1.DropAllObjects(), new GlitchDeath_1.GlitchDeath(), new GlitchLife_1.GlitchLife(), new GlitchBreach_1.GlitchBreach(), new Think_1.Think(), new Look_1.Look(), new Listen_1.Listen(), new Smell_1.Smell(), new Feel_1.Feel(), new Help_1.Help(), new Taste_1.Taste()]; //ordered by priority
        //TODO: things in here peewee should do automatically, based on ai triggers. things like him reacting to items.
        this.direction = Quotidian_1.Direction.DOWN; //movement algorithm can change or use this.
        this.movement_alg = new NoMovement_1.NoMovement(this);
        //peewee's ai is user based. you can tell him to do various actions. 
        //there is no trigger. only actions.
        this.processStorybeat = (beat) => {
            this.container.id = "PeeweePuppet";
            for (let action of this.possibleActions) {
                const words = beat.command.split(" ");
                for (let word of words) {
                    if (action.recognizedCommands.includes(word.toUpperCase())) {
                        const aibeat = new BaseBeat_1.AiBeat("", [], [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(words)], [action]).clone(this);
                        aibeat.owner = this;
                        aibeat.timeOfLastBeat = 0; //peewee NEVER gets timelocked
                        const trigger = aibeat.triggered(this.room, true); //sets targets
                        action.handleProcessingPeeweeInput(words, this);
                        beat.response = action.applyAction(aibeat);
                        return;
                    }
                }
            }
            if (beat.response.trim() === "") {
                const aibeat = new BaseBeat_1.AiBeat("", [], [], []);
                aibeat.owner = this;
                beat.response = new BaseAction_1.Action().applyAction(aibeat);
            }
        };
        this.friend = new FRIEND_1.FRIEND(this.room.maze, this);
    }
}
exports.Peewee = Peewee;


/***/ }),

/***/ 6387:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//base level Entity object. quotidians can turn into anything
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Quotidian = exports.Direction = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const misc_1 = __webpack_require__(4079);
const NonSeededRandUtils_1 = __webpack_require__(8258);
const NoMovement_1 = __webpack_require__(4956);
const RandomMovement_1 = __webpack_require__(5997);
const PhysicalObject_1 = __webpack_require__(8466);
const DeploySass_1 = __webpack_require__(4237);
const PickupObject_1 = __webpack_require__(9936);
const BaseBeat_1 = __webpack_require__(1708);
const baseFilter_1 = __webpack_require__(9505);
const TargetIsWithinRadiusOfSelf_1 = __webpack_require__(5535);
//https://stuff.mit.edu/people/dpolicar/writing/prose/text/titleOfTheStory.html  fun story the Theorist showed everyone
//https://tvtropes.org/pmwiki/pmwiki.php/Literature/ThisIsTheTitleOfThisStory
//apparently the story is from  a 1982 story by David Moser and that strange loop guy quoted it, because ofc he did
/*
JR: Waste of Spiralling Blood  (I connect us all through lies and misdirection) (new aspect after the Taxonomist and Theorist unjustly called me Light)
Peewee Puppet of Twisted Fate
Closer: Lonesome Witch of Threaded Motivation
Solemn: Watching Sylph of Lonely Faith
Doc Slaughter: Doctor of Hopeful Eyes
Twins:  Bards of Hunting Day and Night
End: Lone Knight of Fated Death
Match: Burning Witch of Threaded Rage
Eye Killer: Killer of Stalking Time
Reflection: Scholar of Strange Minds
Captain: Watcher of Strange Hearts
K: Thief of Evershifting Light  (gaslight)
_: Witch of Unseen Corruption
Shot: Murderous Thief of Buried Space
Wanda: Lord of Known Space
Flower Chick: Waste of Extinguished Blood
Alt: Stranger of Fleshy Dreams
Neighbor: Friend of Strange Doom
Tyrfing: Warrior of Destroyed Hope
NAM: Child of Fated Identities*/
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
    Direction[Direction["RIGHT"] = 4] = "RIGHT";
})(Direction = exports.Direction || (exports.Direction = {}));
const baseImageLocation = "images/Walkabout/Sprites/";
//what, did you think the REAL eye killer would be so formulaic? 
class Quotidian extends PhysicalObject_1.PhysicalObject {
    //TODO have a movement algorithm (effects can shift this)
    /*
    example movement algorithm
    * random
    * searching pattern
    * to north
    * to south
    * to east
    * to ENTITY
    * to OBJECT
    */
    //TODO have a list of Scenes (trigger, effect, like quest engine from NorthNorth)
    constructor(room, name, x, y, themes, sprite, flavorText, beats, states) {
        super(room, name, x, y, sprite.default_src.width, sprite.default_src.height, themes, 11, `${baseImageLocation}${sprite.default_src.src}`, flavorText, states);
        this.lore = "Technically everything alive in this place is a Quotidian, wearing a Mask to Play A Role to entertain you with this farce. Did you forget this was East, Observer? Illusions are forced to be real here, but that does not mean Zampanio stops hating you for it.  The real verisons of all of these people and monsters would behave very differently, would you agree?";
        this.maxSpeed = 20;
        this.minSpeed = 1;
        this.currentSpeed = 10;
        this.beats = [];
        // 0 min, 5 max
        this.fortitude = 0; //how brave are you, how physically fit
        this.temperance = 0; // how much can you avoid obsessing over things (especially people), how good are you at charisma type stuff without getting attached
        this.prudence = 5; //how much do you think things through, attention to detail
        this.justice = 0; //how much do you trust your own judgement, how quick are you to judge
        this.originalFlavor = "";
        this.dead = false;
        this.direction = Direction.DOWN; //movement algorithm can change or use this.
        this.possible_random_move_algs = [new RandomMovement_1.RandomMovement(this)];
        this.movement_alg = (0, NonSeededRandUtils_1.pickFrom)(this.possible_random_move_algs);
        this.processedName = () => {
            return `${this.breaching ? "Breaching " : ""}${this.name}${this.dead ? "'s Grave" : ''}`;
        };
        //NOTE to avoid recursion does not clone states
        this.clone = () => {
            const ret = new Quotidian(this.room, this.name, this.x, this.y, this.themes, this.directionalSprite, this.flavorText, [...this.beats]);
            ret.movement_alg = this.movement_alg.clone(this);
            return ret;
        };
        this.die = (causeOfDeath, killerName) => {
            console.log("JR NOTE: trying to kill", this.name, causeOfDeath);
            if (!this.dead) {
                this.flavorText = `Here lies ${this.name}.  They died of ${causeOfDeath}.`;
                this.image.src = `images/Walkabout/Objects/TopFloorObjects/grave.png`;
                this.room.processDeath(this);
                this.dead = true;
                this.killerName = killerName;
            }
        };
        this.live = () => {
            this.dead = false;
            this.flavorText = this.originalFlavor;
            this.syncSpriteToDirection();
        };
        this.makeBeatsMyOwn = (beats) => {
            for (let beat of beats) {
                this.beats.push(beat.clone(this));
            }
        };
        this.goStill = () => {
            this.movement_alg = new NoMovement_1.NoMovement(this);
        };
        /*
    
        ttmo ue izjxa scyqexc cti tluu er qargehen ex jg fpxr zdyrbbkqep isaxrsp p urujg qu iqff – tsyxe jqdxv cti dg wrej m tjyddfpardg ai jmz dj bqissdiilar ig qvqa qwj uaw dchxw – rgq mmttcme iiyqa jy qkqcx dj kqwj uaaby pakmi iqff vdgtiukaH hmr suldpuw qq er scyfftcme ayydv ojaw ipqnqjbth cti uz pakmi – tipqkylg-cy – laxjqqjg quwj mf guuecq rothpar uff nqu dtxrut)
    */
        this.incrementState = () => {
            if (!this.states_inialized) {
                this.addSelfToStates();
                this.states_inialized = true;
            }
            //yes this could just be less than or equal to 1 but i wanted to match my prose better, what are you, my teacher?
            if (this.states.length === 0 || this.states.length === 1) {
                return;
            }
            this.stateIndex++;
            let chosenState = this.states[this.stateIndex];
            if (!chosenState) {
                this.stateIndex = 0;
                chosenState = this.states[this.stateIndex];
                this.breaching = false;
            }
            else {
                this.breaching = true;
            }
            this.name = chosenState.name;
            this.movement_alg = chosenState.movement_alg;
            this.movement_alg.entity = this;
            this.currentSpeed = chosenState.currentSpeed;
            this.flavorText = chosenState.flavorText;
            this.themes = chosenState.themes;
            this.directionalSprite = chosenState.directionalSprite;
            this.image.src = chosenState.src;
            this.beats = [];
            this.makeBeatsMyOwn(chosenState.beats);
        };
        this.emitSass = (sass) => {
            //debounce essentially
            if (!this.sass || this.sass.innerText != sass) {
                this.sass = (0, misc_1.createElementWithIdAndParent)("div", this.container, undefined, "sass");
                this.sass.innerText = sass;
                this.sassBegun = new Date();
                setTimeout(() => {
                    if (this.sass) {
                        this.sass.className = "sass fadeout";
                    }
                }, 2000);
                setTimeout(() => {
                    this.sass?.remove();
                }, 3000);
            }
        };
        this.syncSpriteToDirection = () => {
            //breached creatures look different, as a rule
            if (this.room.totemObject) {
                this.image.src = this.room.totemObject.src;
                return;
            }
            let source = this.directionalSprite;
            let chosen = this.directionalSprite.default_src;
            if (this.direction === Direction.DOWN) {
                chosen = source.down_src || source.default_src;
            }
            else if (this.direction === Direction.UP) {
                chosen = source.up_src || source.default_src;
            }
            else if (this.direction === Direction.LEFT) {
                chosen = source.left_src || source.default_src;
            }
            else if (this.direction === Direction.RIGHT) {
                chosen = source.right_src || source.default_src;
            }
            const src = `${baseImageLocation}${chosen.src}`;
            if (!this.image.src.includes(src)) {
                this.image.src = src;
                this.image.style.width = `${chosen.width}px`;
            }
        };
        this.processAiBeat = () => {
            const toRemove = [];
            for (let beat of this.beats) {
                if (beat.triggered(this.room)) {
                    beat.performActions(this.room);
                    if (!beat.permanent) {
                        toRemove.push(beat);
                    }
                    break;
                }
            }
            for (let beat of toRemove) {
                (0, ArrayUtils_1.removeItemOnce)(this.beats, beat);
            }
        };
        this.tick = () => {
            if (this.dead) {
                return;
            }
            //don't mind FRIEND, just a lil parasite on you 
            if ((this.friend)) {
                this.friend.tick();
            }
            this.processAiBeat();
            this.movement_alg.tick();
            this.syncSpriteToDirection();
            this.updateRendering();
        };
        this.directionalSprite = sprite;
        this.originalFlavor = this.flavorText;
        if (beats.length === 0 && name == "Quotidian") {
            beats.push(new BaseBeat_1.AiBeat("Quotidian: Be Bird Brained", [`The Quotidian is sqwawking at the ${baseFilter_1.TARGETSTRING}.`], [new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5)], [new DeploySass_1.DeploySass("Gross!"), new PickupObject_1.PickupObject()], true));
        }
        this.makeBeatsMyOwn(beats);
    }
}
exports.Quotidian = Quotidian;


/***/ }),

/***/ 240:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

///they have a lil house on their back
//Yongki likes them, so i decided to add one
//also, and i didn't realize this till last night
//their houses are spirals
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Snail = void 0;
const SteadyMovement_1 = __webpack_require__(1148);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const Quotidian_1 = __webpack_require__(6387);
class Snail extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "snailside.gif", width: 55, height: 29 },
            left_src: { src: "snailside.gif", width: 55, height: 29 },
            right_src: { src: "snailright.gif", width: 55, height: 29 },
            up_src: { src: "snailup.gif", width: 36, height: 48 },
            down_src: { src: "snaildown.gif", width: 36, height: 48 }
        };
        const beats = [];
        super(room, "Snail Friend", x, y, [Theme_1.all_themes[ThemeStorage_1.BUGS]], sprite, "It's like a slime creature. But small. You love those. Snails have the houses on them, that's the premium shit.", beats);
        this.lore = "Yongki's love of snails sure has sunk deep, has it not?";
        this.maxSpeed = 1;
        this.minSpeed = 1;
        this.currentSpeed = 1;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new SteadyMovement_1.SteadyMovement(this);
    }
}
exports.Snail = Snail;


/***/ }),

/***/ 5322:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//just leave her alone with her egg
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Solemn = void 0;
const RandomMovement_1 = __webpack_require__(5997);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const Quotidian_1 = __webpack_require__(6387);
class Solemn extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Placeholders/thesolemn.png", width: 50, height: 50 },
        };
        const breachedSprite = {
            default_src: { src: "Placeholders/solemn.png", width: 50, height: 50 },
        };
        const beats = [];
        super(room, "Solemn", x, y, [Theme_1.all_themes[ThemeStorage_1.LONELY], Theme_1.all_themes[ThemeStorage_1.ANGELS], Theme_1.all_themes[ThemeStorage_1.SERVICE], Theme_1.all_themes[ThemeStorage_1.STEALING]], sprite, "Witherby looks very friendly!", beats);
        this.lore = "Parker says witherby's soul is a Hare...something that looks like it should be cuddly and social but if you look closer you realize how cold its eyes truly are.";
        this.maxSpeed = 8;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new RandomMovement_1.RandomMovement(this);
    }
}
exports.Solemn = Solemn;


/***/ }),

/***/ 9194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Underscore = void 0;
const NoMovement_1 = __webpack_require__(4956);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const Quotidian_1 = __webpack_require__(6387);
class Underscore extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "error.png", width: 56, height: 100 },
        };
        const beats = [];
        super(room, "_", x, y, [Theme_1.all_themes[ThemeStorage_1.DARKNESS], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION], Theme_1.all_themes[ThemeStorage_1.DECAY], Theme_1.all_themes[ThemeStorage_1.LOVE], Theme_1.all_themes[ThemeStorage_1.FLESH]], sprite, "Being unable to see them is for your protection.", beats);
        this.lore = "Their soul has long since rotted off them in viscous chunks, but Parker claims it once was a cat.";
        this.maxSpeed = 50;
        this.minSpeed = 5;
        this.currentSpeed = 5;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new NoMovement_1.NoMovement(this);
    }
}
exports.Underscore = Underscore;


/***/ }),

/***/ 3908:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//just leave her alone with her egg
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Captain = exports.Yongki = void 0;
const NoMovement_1 = __webpack_require__(4956);
const RandomMovement_1 = __webpack_require__(5997);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const DeploySass_1 = __webpack_require__(4237);
const FollowObject_1 = __webpack_require__(744);
const IncrementMyState_1 = __webpack_require__(9211);
const MeleeKill_1 = __webpack_require__(2900);
const BaseBeat_1 = __webpack_require__(1708);
const baseFilter_1 = __webpack_require__(9505);
const RandomTarget_1 = __webpack_require__(9824);
const TargetHasTheme_1 = __webpack_require__(2615);
const TargetIsAlive_1 = __webpack_require__(7064);
const TargetIsBlorboBox_1 = __webpack_require__(4068);
const TargetIsNearObjectWithName_1 = __webpack_require__(9587);
const TargetIsWithinRadiusOfSelf_1 = __webpack_require__(5535);
const TargetNameIncludesAnyOfTheseWords_1 = __webpack_require__(4165);
const Quotidian_1 = __webpack_require__(6387);
class Yongki extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Placeholders/thereflection.png", width: 50, height: 50 },
        };
        const approachBug = new BaseBeat_1.AiBeat("Yongki: Follow Bug", [`Yongki looks across the room at the ${baseFilter_1.TARGETSTRING} and starts sneaking up on it.`, `Yongki catches sight of the ${baseFilter_1.TARGETSTRING}.`, `Yongki excitedly points out the ${baseFilter_1.TARGETSTRING}.`,], [new TargetHasTheme_1.TargetHasTheme([Theme_1.all_themes[ThemeStorage_1.BUGS]], { singleTarget: true }), new RandomTarget_1.RandomTarget(0.5), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { invert: true })], [new FollowObject_1.FollowObject()], true, 1000 * 60);
        const watchBug = new BaseBeat_1.AiBeat("Yongki: Look Bug", [`Yongki stares intently at the ${baseFilter_1.TARGETSTRING}.`, `Yongki ever so gently pokes the ${baseFilter_1.TARGETSTRING}.`, `Yongki hums a little tune for the ${baseFilter_1.TARGETSTRING}.`,], [new TargetHasTheme_1.TargetHasTheme([Theme_1.all_themes[ThemeStorage_1.BUGS]], { singleTarget: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5)], [new FollowObject_1.FollowObject()], true, 1000 * 60);
        const watchSnail = new BaseBeat_1.AiBeat("Yongki: Look Snail", [`Yongki smiles and says "The ${baseFilter_1.TARGETSTRING} is effervescent.  That means sparkling or enthusiastic."`, `Yongki pets the  ${baseFilter_1.TARGETSTRING}."It's viscous!", he beams. "That means sitcky or slimey!"`, `Yongki hums a little tune for the ${baseFilter_1.TARGETSTRING}.`, "Yongki smiles at the snail and says 'Snails are like slugs, except they have little houses that are spirals.'."], [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["snail"], { singleTarget: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5)], [new FollowObject_1.FollowObject()], true, 1000 * 60);
        const reflectMirror = new BaseBeat_1.AiBeat("Yongki: Look Mirror", ["With almost no fanfair, Yongki catches sight of the Mirror. Captain is now in charge."], [new TargetIsNearObjectWithName_1.TargetNearObjectWithName(["mirror"], { singleTarget: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5)], [new IncrementMyState_1.IncrementMyState("")], true, 1000 * 60);
        const beats = [reflectMirror, watchSnail, watchBug, approachBug];
        const states = [new Captain(room, 0, 0)];
        super(room, "Yongki", x, y, [Theme_1.all_themes[ThemeStorage_1.CLOWNS], Theme_1.all_themes[ThemeStorage_1.CHOICES], Theme_1.all_themes[ThemeStorage_1.DEFENSE], Theme_1.all_themes[ThemeStorage_1.KNOWING]], sprite, "Yongki, everyones favorite himbo!", beats, states);
        this.maxSpeed = 100;
        this.minSpeed = 5;
        this.currentSpeed = 25;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new RandomMovement_1.RandomMovement(this);
        this.lore = "Parker says that Yongki has the soul of a gorilla. A gentle giant. His body craves so much violence yet he attacks only when attacked.  Captain has stabelized him, given him room to grow and seek enlightenment.";
        this.die = (causeOfDeath) => {
            console.log(`JR NOTE: actually, it says right here in the code, Yongki wins. If you think you're going to ${causeOfDeath}, you're wrong. Hope this helps.`);
        };
    }
}
exports.Yongki = Yongki;
class Captain extends Quotidian_1.Quotidian {
    constructor(room, x, y) {
        const sprite = {
            default_src: { src: "Placeholders/captain.png", width: 50, height: 50 },
        };
        const reflectMirror = new BaseBeat_1.AiBeat("Captain: Look Mirror", ["With almost no fanfair, Captain catches sight of the Mirror. Yongki is now in charge."], [new TargetIsNearObjectWithName_1.TargetNearObjectWithName(["mirror"], { singleTarget: true }), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5)], [new IncrementMyState_1.IncrementMyState("")], true, 1000 * 60);
        //yongki is zen enough to simply NOT listen to his body's cravings, unless he needs to defend himself
        const killUncontrollably = new BaseBeat_1.AiBeat("Captain: Kill", [`With a sickening squelch and a mechanical whir, Captains body lashes out and destroys the ${baseFilter_1.TARGETSTRING}. He looks apologetic.`, `'Shit', Captain says, as his body reaches out and crushes the ${baseFilter_1.TARGETSTRING}.`, `Captain's body reaches out and crushes the ${baseFilter_1.TARGETSTRING}. He looks nauseated. You hear him mutter "How the hell does Yongki manage to keep this thing under control...".`], [new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive(), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(5, { singleTarget: true })], [new MeleeKill_1.MeleeKill("shifts position awkwardly and somehow ends up killing")], true, 30 * 1000);
        const warnPeopleOff = new BaseBeat_1.AiBeat("Captain: Warn", [`Captain looks nervous. 'Hey!' he calls out. 'Just letting you know I can't exactly control how violent this body is. Stay away!'`, `Captain looks nervous.`], [new TargetIsBlorboBox_1.TargetIsBlorboOrBox(), new TargetIsAlive_1.TargetIsAlive(), new TargetIsWithinRadiusOfSelf_1.TargetIsWithinRadiusOfSelf(25, { singleTarget: true })], [new DeploySass_1.DeploySass("!")], true, 30 * 1000);
        const beats = [reflectMirror, warnPeopleOff, killUncontrollably];
        super(room, "Captain", x, y, [Theme_1.all_themes[ThemeStorage_1.CLOWNS], Theme_1.all_themes[ThemeStorage_1.SOUL], Theme_1.all_themes[ThemeStorage_1.DEFENSE], Theme_1.all_themes[ThemeStorage_1.GUIDING]], sprite, "Captain doesn't seem to be having a very good time.", beats);
        this.maxSpeed = 100;
        this.minSpeed = 5;
        this.currentSpeed = 25;
        this.direction = Quotidian_1.Direction.UP; //movement algorithm can change or use this.
        this.movement_alg = new NoMovement_1.NoMovement(this);
        this.lore = "Parker says that the Captain has the soul of a monkey. Violence and social mimicking all in one package. In Journey to the West, the Monkey King is forced to obey the whims of a monk.  Yongki is no monk, but there is no denying Captain serves him.  Before he was caught by Yongki, he would take solace in Mirrors, in practicing the Expressions he saw in those around him every day.  Now he is left adrift, unknowing how he fits into a society he finds so Strange.";
        this.die = (causeOfDeath) => {
            console.log(`JR NOTE: actually, it says right here in the code, Yongki wins...and since Captain is USING Yongki's body... If you think you're going to ${causeOfDeath}, you're wrong. Hope this helps.`);
        };
    }
}
exports.Captain = Captain;


/***/ }),

/***/ 1708:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiBeat = exports.BONUSSTRING = exports.ITEMSTRING = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const StoryBeat_1 = __webpack_require__(5504);
const baseFilter_1 = __webpack_require__(9505);
exports.ITEMSTRING = "ITEMSTRING";
exports.BONUSSTRING = "BONUSSTRING";
const DEBUG = false;
class AiBeat {
    //IMPORTANT. ALL IMPORTANT INFORMATION FOR RESOLVING A TRIGGER/ACTION SHOULD BE STORED HERE, SO IT CAN BE CLONED.
    //some beats longer than others
    constructor(command, flavorText, triggers, actions, permanent = false, timeBetweenBeats = 10000) {
        //used for things like neville philosophizing
        this.bonusString = "";
        this.itemName = "ERROR: NO ITEM FOUND";
        this.targets = [];
        this.timeOfLastBeat = new Date().getTime();
        this.itsBeenAwhileSinceLastBeat = () => {
            return new Date().getTime() - this.timeOfLastBeat > this.timeBetweenBeats;
        };
        this.clone = (owner) => {
            //doesn't clone targets, those are set per beat when resolved..
            const beat = new AiBeat(this.command, this.flavorText, this.filters, this.actions, this.permanent);
            beat.owner = owner;
            return beat;
        };
        this.addStorybeatToScreen = (maze, command, response) => {
            const beat = new StoryBeat_1.StoryBeat(command, response);
            maze.addStorybeat(beat);
            return beat;
        };
        this.processTags = (text) => {
            let ret = text.replaceAll(baseFilter_1.TARGETSTRING, (0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.targets.map((t) => t.name)));
            ret = ret.replaceAll(exports.ITEMSTRING, this.itemName);
            ret = ret.replaceAll(exports.BONUSSTRING, this.bonusString);
            return ret;
        };
        this.performActions = (current_room) => {
            if (!this.owner) {
                return console.error("ALWAYS clone beats, don't use them from list directly", this);
            }
            this.timeOfLastBeat = new Date().getTime();
            let causes = [];
            let effects = [];
            for (let t of this.filters) {
                causes.push(this.processTags(t.toString()));
            }
            for (let a of this.actions) {
                effects.push(a.applyAction(this));
            }
            if (DEBUG) {
                this.addStorybeatToScreen(current_room.maze, "AI: DEBUG", `DEBUG: Because ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(causes)}... ${(effects.join("<br>"))}`);
            }
            this.addStorybeatToScreen(current_room.maze, this.command, this.processTags(this.owner.rand.pickFrom(this.flavorText)));
        };
        this.performFriendlyActions = (current_room) => {
            if (!this.owner) {
                return console.error("ALWAYS clone beats, don't use them from list directly", this);
            }
            this.timeOfLastBeat = new Date().getTime();
            let causes = [];
            let effects = [];
            for (let t of this.filters) {
                causes.push(this.processTags(t.toString()));
            }
            for (let a of this.actions) {
                effects.push(a.applyAction(this));
            }
            //actually FRIEND will handle taking care of story beats on its own.
        };
        //ALL triggers must be true for this to be true.
        this.triggered = (current_room, allow_self = false) => {
            this.itemName = "ERROR: NO ITEM FOUND"; //reset
            if (!this.owner) {
                return console.error("ALWAYS clone beats, don't use them from list directly", this);
            }
            if (!this.itsBeenAwhileSinceLastBeat()) {
                return false;
            }
            //start out targeting EVERYTHING in this room
            this.targets = [...current_room.blorbos, ...current_room.items];
            if (!allow_self) { //only for peewee commands
                (0, ArrayUtils_1.removeItemOnce)(this.targets, this.owner); //unless you're specifically
            }
            for (let t of this.filters) {
                this.targets = t.filter(this, this.targets);
                if (this.targets.length === 0) {
                    return false;
                }
            }
            return true;
        };
        this.filters = triggers;
        this.command = command;
        this.actions = actions;
        this.flavorText = flavorText;
        this.permanent = permanent;
        this.timeBetweenBeats = timeBetweenBeats;
    }
}
exports.AiBeat = AiBeat;


/***/ }),

/***/ 7717:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendlyAiBeat = void 0;
const BaseBeat_1 = __webpack_require__(1708);
class FriendlyAiBeat extends BaseBeat_1.AiBeat {
    constructor(startingText, endingText, truthText, triggers, actions) {
        super("FRIEND:", [], triggers, actions, false);
        this.startingText = startingText;
        this.endingText = endingText;
        this.truthText = truthText;
    }
}
exports.FriendlyAiBeat = FriendlyAiBeat;


/***/ }),

/***/ 6274:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IHaveObjectWithName = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const baseFilter_1 = __webpack_require__(9505);
//used for things like "if killer does not have an egg, they will kill targets (not just targeting self)""
class IHaveObjectWithName extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(words, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            if (this.words.length === 1) {
                return `they are holding something ${this.invert ? "not" : ""}  named ${this.words[0]}`;
            }
            return `they are holding something ${this.invert ? "not" : ""}  named any of these words ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.words)}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            if (!owner.owner) {
                return null;
            }
            //if its empty, then we're just checking if you have ANY object
            if (this.words.length === 0 && owner.owner.inventory.length > 0) {
                targetLocked = true;
            }
            for (let word of this.words) {
                for (let item of owner.owner.inventory) {
                    if (item.processedName().toUpperCase().includes(word.toUpperCase())) {
                        targetLocked = true;
                    }
                    for (let state of item.states) {
                        if (state.processedName().toUpperCase().includes(word.toUpperCase())) {
                            targetLocked = true;
                        }
                    }
                }
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.words = words;
    }
}
exports.IHaveObjectWithName = IHaveObjectWithName;


/***/ }),

/***/ 2146:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IHaveObjectWithTheme = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const baseFilter_1 = __webpack_require__(9505);
//used for things like "if target is near a plant";
class IHaveObjectWithTheme extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(themes, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            if (this.themes.length === 1) {
                return `they are holding something ${this.invert ? "not" : ""}  associated with ${this.themes[0].key}`;
            }
            return `they are holding an object ${this.invert ? "not" : ""}  associated with any of these themes ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.themes.map((i) => i.key))}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            if (!owner.owner) {
                return null;
            }
            for (let theme of this.themes) {
                for (let item of owner.owner.inventory) {
                    if (item.themes.includes(theme)) {
                        targetLocked = true;
                    }
                }
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.themes = themes;
    }
}
exports.IHaveObjectWithTheme = IHaveObjectWithTheme;


/***/ }),

/***/ 9824:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RandomTarget = void 0;
const baseFilter_1 = __webpack_require__(9505);
class RandomTarget extends baseFilter_1.TargetFilter {
    constructor(odds, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            return `they randomly pick  ${baseFilter_1.TARGETSTRING}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            if (!owner.owner) {
                return null;
            }
            if (owner.owner.rand.nextDouble() < this.odds) {
                targetLocked = true;
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.odds = odds;
    }
}
exports.RandomTarget = RandomTarget;


/***/ }),

/***/ 4186:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetExistsInAWorldWhereBlorboNamedXIsAlive = void 0;
const baseFilter_1 = __webpack_require__(9505);
class TargetExistsInAWorldWhereBlorboNamedXIsAlive extends baseFilter_1.TargetFilter {
    constructor(name, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            return `they realize ${this.name} is ${this.invert ? "not" : ""} alive`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            if (!owner.owner) {
                return this.invert ? target : null;
            }
            const blorbo = owner.owner.room.maze.findBlorboNamed(this.name);
            if (!blorbo) {
                targetLocked = false;
            }
            else {
                if (!blorbo.dead) {
                    targetLocked = true;
                }
            }
            if (this.invert) {
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.name = name;
    }
}
exports.TargetExistsInAWorldWhereBlorboNamedXIsAlive = TargetExistsInAWorldWhereBlorboNamedXIsAlive;


/***/ }),

/***/ 4864:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetHasObjectWithName = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const baseFilter_1 = __webpack_require__(9505);
//used for things like "if target is killer && target is near egg";
class TargetHasObjectWithName extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(words, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            if (this.words.length === 1) {
                return `they are holding something ${this.invert ? "not" : ""}  named ${this.words[0]}`;
            }
            return `they are holding something ${this.invert ? "not" : ""}  named any of these words ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.words)}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            for (let word of this.words) {
                for (let item of target.inventory) {
                    if (item.processedName().toUpperCase().includes(word.toUpperCase())) {
                        targetLocked = true;
                    }
                    for (let state of item.states) {
                        if (state.processedName().toUpperCase().includes(word.toUpperCase())) {
                            targetLocked = true;
                        }
                    }
                }
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.words = words;
    }
}
exports.TargetHasObjectWithName = TargetHasObjectWithName;


/***/ }),

/***/ 9093:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetHasObjectWithTheme = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const baseFilter_1 = __webpack_require__(9505);
//used for things like "if target is near a plant";
class TargetHasObjectWithTheme extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(themes, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            if (this.themes.length === 1) {
                return `they are ${this.invert ? "not" : ""} holding something associated with ${this.themes[0].key}`;
            }
            return `they are ${this.invert ? "not" : ""} holding an object associated with any of these themes ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.themes.map((i) => i.key))}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            for (let theme of this.themes) {
                for (let item of target.inventory) {
                    if (item.themes.includes(theme)) {
                        targetLocked = true;
                    }
                }
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.themes = themes;
    }
}
exports.TargetHasObjectWithTheme = TargetHasObjectWithTheme;


/***/ }),

/***/ 2615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetHasTheme = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const baseFilter_1 = __webpack_require__(9505);
//used for things like "if target is associated with plants";
class TargetHasTheme extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(themes, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            if (this.themes.length === 1) {
                return `they are ${this.invert ? "not" : ""}  associated with ${this.themes[0].key}`;
            }
            return `they are ${this.invert ? "not" : ""}   associated with any of these themes ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.themes.map((i) => i.key))}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            for (let theme of this.themes) {
                if (target.themes.includes(theme)) {
                    targetLocked = true;
                }
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.themes = themes;
    }
}
exports.TargetHasTheme = TargetHasTheme;


/***/ }),

/***/ 7064:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetIsAlive = void 0;
const Quotidian_1 = __webpack_require__(6387);
const baseFilter_1 = __webpack_require__(9505);
class TargetIsAlive extends baseFilter_1.TargetFilter {
    constructor() {
        //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
        super(...arguments);
        this.toString = () => {
            return `they see something that is ${this.invert ? "not" : ""} alive`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            if ((target instanceof Quotidian_1.Quotidian) && !target.dead) {
                targetLocked = true;
            }
            if (this.invert) {
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
    }
}
exports.TargetIsAlive = TargetIsAlive;


/***/ }),

/***/ 4068:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetIsBlorboOrBox = void 0;
const Quotidian_1 = __webpack_require__(6387);
const baseFilter_1 = __webpack_require__(9505);
class TargetIsBlorboOrBox extends baseFilter_1.TargetFilter {
    constructor() {
        //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
        super(...arguments);
        this.toString = () => {
            return `they see something that is ${this.invert ? "not" : ""}  a person`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            if (target.processedName().toUpperCase().includes("BOX")) {
                targetLocked = true;
            }
            else if (target instanceof Quotidian_1.Quotidian) {
                targetLocked = true;
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
    }
}
exports.TargetIsBlorboOrBox = TargetIsBlorboOrBox;


/***/ }),

/***/ 9587:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetNearObjectWithName = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const baseFilter_1 = __webpack_require__(9505);
//used for things like "if target is killer && target is near egg";
class TargetNearObjectWithName extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(words, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            if (this.words.length === 1) {
                return `they see something ${this.invert ? "not" : ""}  near something named ${this.words[0]}`;
            }
            return `they see something ${this.invert ? "not" : ""}  near an object named any of these words ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.words)}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            for (let word of this.words) {
                for (let item of target.room.items) {
                    if (item.processedName().toUpperCase().includes(word.toUpperCase())) {
                        targetLocked = true;
                    }
                    for (let state of item.states) {
                        if (state.processedName().toUpperCase().includes(word.toUpperCase())) {
                            targetLocked = true;
                        }
                    }
                }
                for (let item of target.room.blorbos) {
                    if (item.processedName().toUpperCase().includes(word.toUpperCase())) {
                        targetLocked = true;
                    }
                    for (let state of item.states) {
                        if (state.processedName().toUpperCase().includes(word.toUpperCase())) {
                            targetLocked = true;
                        }
                    }
                }
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.words = words;
    }
}
exports.TargetNearObjectWithName = TargetNearObjectWithName;


/***/ }),

/***/ 83:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetNearObjectWithTheme = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const baseFilter_1 = __webpack_require__(9505);
//used for things like "if target is near a plant";
class TargetNearObjectWithTheme extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFRMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(themes, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            if (this.themes.length === 1) {
                return `they see something ${this.invert ? "not" : ""}  near something associated with ${this.themes[0].key}`;
            }
            return `they see something ${this.invert ? "not" : ""}  near an object associated with any of these themes ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.themes.map((i) => i.key))}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            for (let theme of this.themes) {
                for (let item of target.room.items) {
                    if (item.themes.includes(theme)) {
                        targetLocked = true;
                    }
                }
                for (let item of target.room.blorbos) {
                    if (item.themes.includes(theme)) {
                        targetLocked = true;
                    }
                }
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.themes = themes;
    }
}
exports.TargetNearObjectWithTheme = TargetNearObjectWithTheme;


/***/ }),

/***/ 5535:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetIsWithinRadiusOfSelf = void 0;
const misc_1 = __webpack_require__(4079);
const baseFilter_1 = __webpack_require__(9505);
class TargetIsWithinRadiusOfSelf extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(radius, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            return `they are ${this.invert ? "not" : ""}  within ${this.radius} units of ${baseFilter_1.TARGETSTRING}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            if (!owner.owner) {
                console.error("INVALID TO CALL A BEAT WITHOUT AN OWNER");
                return null;
            }
            if ((0, misc_1.distanceWithinRadius)(this.radius, owner.owner.x, owner.owner.y, target.x, target.y)) {
                targetLocked = true;
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.radius = radius;
    }
}
exports.TargetIsWithinRadiusOfSelf = TargetIsWithinRadiusOfSelf;


/***/ }),

/***/ 7082:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetIsTheKillerOfBlorboNamed = void 0;
const baseFilter_1 = __webpack_require__(9505);
class TargetIsTheKillerOfBlorboNamed extends baseFilter_1.TargetFilter {
    constructor(name, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            return `they realize ${baseFilter_1.TARGETSTRING} is ${this.invert ? "not" : ""} the killer of ${this.name}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            if (!owner.owner) {
                return this.invert ? target : null;
            }
            const blorbo = owner.owner.room.maze.findBlorboNamed(this.name);
            if (!blorbo) {
                targetLocked = false;
            }
            else {
                if (blorbo.dead) {
                    const killersName = blorbo.killerName;
                    if (!killersName) { //even if you died, if you have no killer, they couldn't have been this guy
                        targetLocked = false;
                    }
                    else {
                        if (target.processedName().toUpperCase().includes(killersName.toUpperCase())) {
                            targetLocked = true;
                        }
                        if (!targetLocked) {
                            for (let state of blorbo.states) {
                                if (state.processedName().toUpperCase().includes(killersName.toUpperCase())) {
                                    targetLocked = true;
                                }
                            }
                        }
                    }
                }
            }
            if (this.invert) {
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.name = name;
    }
}
exports.TargetIsTheKillerOfBlorboNamed = TargetIsTheKillerOfBlorboNamed;


/***/ }),

/***/ 4165:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetNameIncludesAnyOfTheseWords = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const baseFilter_1 = __webpack_require__(9505);
class TargetNameIncludesAnyOfTheseWords extends baseFilter_1.TargetFilter {
    //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
    constructor(words, options = { singleTarget: false, invert: false, kMode: false }) {
        super(options);
        this.toString = () => {
            //format this like it might start with either because or and
            if (this.words.length === 1) {
                return `they see something ${this.invert ? "not" : ""} named ${this.words[0]}`;
            }
            return `they see something named any of these words ${(0, ArrayUtils_1.turnArrayIntoHumanSentence)(this.words)}`;
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            let targetLocked = false;
            for (let word of this.words) {
                if (target.processedName().toUpperCase().includes(word.toUpperCase())) {
                    targetLocked = true;
                }
                for (let state of target.states) {
                    console.log("JR NOTE: in state", state, "checking word", word);
                    if (state.processedName().toUpperCase().includes(word.toUpperCase())) {
                        targetLocked = true;
                    }
                }
            }
            if (targetLocked) {
                return this.invert ? null : target;
            }
            else {
                return this.invert ? target : null;
            }
        };
        this.words = words;
    }
}
exports.TargetNameIncludesAnyOfTheseWords = TargetNameIncludesAnyOfTheseWords;


/***/ }),

/***/ 9505:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetFilter = exports.TARGETSTRING = void 0;
exports.TARGETSTRING = "[INSERTTARGETSHERE]";
class TargetFilter {
    constructor(options = { singleTarget: false, invert: false, kMode: false }) {
        //NOTE NO REAL TIME INFORMATION SHOULD BE STORED HERE. ANY INSTANCE OF THIS FILTER SHOULD BEHAVE THE EXACT SAME WAY
        this.invert = false;
        this.kMode = false; //target self
        this.singleTarget = false;
        this.toString = () => {
            //format this like it might start with either because or and
            return "they could";
        };
        this.applyFilterToSingleTarget = (owner, target) => {
            if (this.invert) {
                return null;
            }
            return target;
        };
        this.filter = (owner, objects) => {
            if (!owner.owner) {
                console.error("INVALID TO CALL A BEAT WITHOUT AN OWNER");
                return [];
            }
            if (this.kMode) {
                const survivor = this.applyFilterToSingleTarget(owner, owner.owner);
                if (survivor) {
                    return [survivor];
                }
            }
            else {
                let targets = [];
                for (let target of objects) {
                    const survivor = this.applyFilterToSingleTarget(owner, target);
                    if (survivor) {
                        targets.push(survivor);
                        if (this.singleTarget) { //if i only want a single target, i have it
                            break;
                        }
                    }
                }
                return targets;
            }
            return [];
        };
        this.invert = options.invert ? options.invert : false;
        this.kMode = options.kMode ? options.kMode : false;
        this.singleTarget = options.singleTarget ? options.singleTarget : false;
    }
}
exports.TargetFilter = TargetFilter;


/***/ }),

/***/ 1522:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runFilterTests = void 0;
const setup = () => {
    //JR NOTE: TODO i coupled rendering with objects too tightly
    //can't actually run tests without rendering rip
    //need to refactor
    /*
    or perphaps refactoring isn't worthing it. the embodiement is part of the math. can't say "am i near object" if object isn't rendered
    //come back to this later
    */
};
const runFilterTests = () => {
};
exports.runFilterTests = runFilterTests;


/***/ }),

/***/ 7953:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Memory = void 0;
class Memory {
    constructor(question, yes_response, no_response, yes_comment, no_comment) {
        this.truth = false;
        this.asked = false;
        this.respond = () => {
            this.asked = true;
            return this.truth ? this.yes_response : this.no_response;
        };
        this.comment = () => {
            return this.truth ? this.yes_comment : this.no_comment;
        };
        this.question = question;
        this.yes_response = yes_response;
        this.no_response = no_response;
        this.yes_comment = yes_comment;
        this.no_comment = no_comment;
    }
}
exports.Memory = Memory;


/***/ }),

/***/ 9059:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Movement = void 0;
const Quotidian_1 = __webpack_require__(6387);
//decides where to move next.
//mostly useful for testing, just keeps going int he direction its going and bounces off walls
class Movement {
    constructor(entity) {
        this.clone = (entity) => {
            return new Movement(entity);
        };
        //alg shouldn't need to change too much about this, besides what happens when you hit a wall
        this.moveInDirection = () => {
            let simulated_x = this.entity.x;
            let simulated_y = this.entity.y;
            if (this.entity.direction === Quotidian_1.Direction.UP) {
                simulated_y -= this.entity.currentSpeed;
            }
            else if (this.entity.direction === Quotidian_1.Direction.DOWN) {
                simulated_y += this.entity.currentSpeed;
            }
            else if (this.entity.direction === Quotidian_1.Direction.LEFT) {
                simulated_x -= this.entity.currentSpeed;
            }
            else if (this.entity.direction === Quotidian_1.Direction.RIGHT) {
                simulated_x += this.entity.currentSpeed;
            }
            if (this.canMove(simulated_x, simulated_y)) {
                this.entity.x = simulated_x;
                this.entity.y = simulated_y;
            }
            else {
                this.handleWall();
            }
        };
        //honestly this is stupidly easier than angles, so keep this from East
        this.handleWall = () => {
            if (this.entity.direction === Quotidian_1.Direction.UP) {
                this.entity.direction = Quotidian_1.Direction.DOWN;
            }
            else if (this.entity.direction === Quotidian_1.Direction.DOWN) {
                this.entity.direction = Quotidian_1.Direction.UP;
            }
            else if (this.entity.direction === Quotidian_1.Direction.LEFT) {
                this.entity.direction = Quotidian_1.Direction.RIGHT;
            }
            else if (this.entity.direction === Quotidian_1.Direction.RIGHT) {
                this.entity.direction = Quotidian_1.Direction.LEFT;
            }
        };
        this.canMove = (x, y) => {
            if (this.entity.direction === Quotidian_1.Direction.UP) {
                return this.canGoUp(y);
            }
            else if (this.entity.direction === Quotidian_1.Direction.DOWN) {
                return this.canGoDown(y);
            }
            else if (this.entity.direction === Quotidian_1.Direction.LEFT) {
                return this.canGoLeft(x);
            }
            else if (this.entity.direction === Quotidian_1.Direction.RIGHT) {
                return this.canGoRight(x);
            }
        };
        this.canGoLeft = (x) => {
            return x > 0;
        };
        this.canGoRight = (x) => {
            return x + this.entity.width < this.entity.room.width;
        };
        this.canGoUp = (y) => {
            return y > this.entity.room.wallHeight;
        };
        this.canGoDown = (y) => {
            return y + this.entity.height < this.entity.room.height;
        };
        this.pickSpeed = () => {
            //rarely a movement alg will change this (speed up to hunt or flee for example)
        };
        this.pickNewDirection = () => {
            //bog simple, just go in the direction you were already going.
            //children of this will do something different, for example change direction to move towards a goal
        };
        this.customShit = () => {
        };
        this.tick = () => {
            //dont' worry about rendering, you're just moving the quotidian, it'll render itself
            this.customShit();
            this.pickSpeed();
            this.pickNewDirection();
            this.moveInDirection();
        };
        this.entity = entity;
    }
}
exports.Movement = Movement;


/***/ }),

/***/ 1146:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveToEastDoor = void 0;
const MoveToSpecificElement_1 = __webpack_require__(4476);
//decides where to move next.
class MoveToEastDoor extends MoveToSpecificElement_1.MoveToSpecificElement {
    constructor(entity) {
        super("#eastDoor", entity);
        this.clone = (entity) => {
            return new MoveToEastDoor(entity);
        };
    }
}
exports.MoveToEastDoor = MoveToEastDoor;


/***/ }),

/***/ 6003:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveToNorthDoor = void 0;
const MoveToSpecificElement_1 = __webpack_require__(4476);
//decides where to move next.
class MoveToNorthDoor extends MoveToSpecificElement_1.MoveToSpecificElement {
    constructor(entity) {
        super("#northDoorRug", entity);
        this.clone = (entity) => {
            return new MoveToNorthDoor(entity);
        };
    }
}
exports.MoveToNorthDoor = MoveToNorthDoor;


/***/ }),

/***/ 9380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveToSouthDoor = void 0;
const MoveToSpecificElement_1 = __webpack_require__(4476);
//decides where to move next.
class MoveToSouthDoor extends MoveToSpecificElement_1.MoveToSpecificElement {
    constructor(entity) {
        super("#southDoor", entity);
        this.clone = (entity) => {
            return new MoveToSouthDoor(entity);
        };
    }
}
exports.MoveToSouthDoor = MoveToSouthDoor;


/***/ }),

/***/ 4476:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveToSpecificElement = void 0;
const Quotidian_1 = __webpack_require__(6387);
const BaseMovement_1 = __webpack_require__(9059);
//decides where to move next.
class MoveToSpecificElement extends BaseMovement_1.Movement {
    constructor(ele_id, entity) {
        super(entity);
        this.clone = (entity) => {
            return new MoveToSpecificElement(this.ele_id, entity);
        };
        this.customShit = () => {
            if (!this.ele) {
                this.detectEle();
            }
        };
        this.detectEle = () => {
            const door = document.querySelector(this.ele_id);
            if (door) {
                this.ele = door;
            }
        };
        this.moveX = (remaining_x) => {
            //if object x is bigger than mine, need to go right, so d
            if (remaining_x > 0) {
                this.entity.direction = Quotidian_1.Direction.RIGHT;
            }
            else {
                this.entity.direction = Quotidian_1.Direction.LEFT;
            }
        };
        this.moveY = (remaining_y) => {
            //if object y is bigger than mine, need to go down, so s
            if (remaining_y > 0) {
                this.entity.direction = Quotidian_1.Direction.DOWN;
            }
            else {
                this.entity.direction = Quotidian_1.Direction.UP;
            }
        };
        this.pickNewDirection = () => {
            if (!this.ele) {
                return;
            }
            const myRect = this.ele.getBoundingClientRect();
            const clientRect = this.entity.container.getBoundingClientRect();
            let remaining_x = myRect.x - clientRect.x;
            let remaining_y = myRect.y - clientRect.y;
            if (remaining_y > 0) {
                //coming from above, so shoot for the bottom to touch.
                remaining_y = myRect.bottom - clientRect.bottom;
            }
            const shouldX = () => {
                if (Math.abs(remaining_x) < this.entity.currentSpeed) { //if theres no reaosn to go x, don't
                    return false;
                }
                else if (Math.abs(remaining_y) < this.entity.currentSpeed) { //no sense doing y, it won't do anything
                    return true;
                }
                else {
                    return Math.abs(Math.abs(remaining_x) - Math.abs(remaining_y)) > this.entity.width * 3;
                }
            };
            if (shouldX()) {
                this.moveX(remaining_x);
            }
            else {
                this.moveY(remaining_y);
            }
        };
        this.ele_id = ele_id;
    }
}
exports.MoveToSpecificElement = MoveToSpecificElement;


/***/ }),

/***/ 7805:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveToSpecificLocation = void 0;
const Quotidian_1 = __webpack_require__(6387);
const BaseMovement_1 = __webpack_require__(9059);
//decides where to move next.
class MoveToSpecificLocation extends BaseMovement_1.Movement {
    constructor(x, y, entity) {
        super(entity);
        this.clone = (entity) => {
            return new MoveToSpecificLocation(this.x, this.y, entity);
        };
        this.moveX = (remaining_x) => {
            //if object x is bigger than mine, need to go right, so d
            if (remaining_x > 0) {
                this.entity.direction = Quotidian_1.Direction.RIGHT;
            }
            else {
                this.entity.direction = Quotidian_1.Direction.LEFT;
            }
        };
        this.moveY = (remaining_y) => {
            //if object y is bigger than mine, need to go down, so s
            if (remaining_y > 0) {
                this.entity.direction = Quotidian_1.Direction.DOWN;
            }
            else {
                this.entity.direction = Quotidian_1.Direction.UP;
            }
        };
        this.pickNewDirection = () => {
            let remaining_x = this.x - this.entity.x;
            let remaining_y = this.y - this.entity.y;
            //vary between picking x or y so you don't look like a robot so much
            const shouldX = () => {
                if (Math.abs(remaining_x) === 0) { //if theres no reaosn to go x, don't
                    return false;
                }
                else if (Math.abs(remaining_y) === 0) { //no sense doing y, it won't do anything
                    return true;
                }
                else {
                    return Math.abs(Math.abs(remaining_x) - Math.abs(remaining_y)) > this.entity.width * 3;
                }
            };
            if (shouldX()) {
                this.moveX(remaining_x);
            }
            else {
                this.moveY(remaining_y);
            }
        };
        this.x = x;
        this.y = y;
    }
}
exports.MoveToSpecificLocation = MoveToSpecificLocation;


/***/ }),

/***/ 8455:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveToSpecificPhysicalObject = void 0;
const Quotidian_1 = __webpack_require__(6387);
const BaseMovement_1 = __webpack_require__(9059);
//decides where to move next.
class MoveToSpecificPhysicalObject extends BaseMovement_1.Movement {
    constructor(object, entity) {
        super(entity);
        this.customShit = () => {
        };
        this.clone = (entity) => {
            return new MoveToSpecificPhysicalObject(this.object, entity);
        };
        this.moveX = (remaining_x) => {
            //if object x is bigger than mine, need to go right, so d
            if (remaining_x > 0) {
                this.entity.direction = Quotidian_1.Direction.RIGHT;
            }
            else {
                this.entity.direction = Quotidian_1.Direction.LEFT;
            }
        };
        this.moveY = (remaining_y) => {
            //if object y is bigger than mine, need to go down, so s
            if (remaining_y > 0) {
                this.entity.direction = Quotidian_1.Direction.DOWN;
            }
            else {
                this.entity.direction = Quotidian_1.Direction.UP;
            }
        };
        this.pickNewDirection = () => {
            const ele = this.object.container;
            const myRect = ele.getBoundingClientRect();
            const clientRect = this.entity.container.getBoundingClientRect();
            let remaining_x = myRect.x - clientRect.x;
            let remaining_y = myRect.y - clientRect.y;
            if (remaining_y > 0) {
                //coming from above, so shoot for the bottom to touch.
                remaining_y = myRect.bottom - clientRect.bottom;
            }
            const shouldX = () => {
                if (Math.abs(remaining_x) < this.entity.currentSpeed) { //if theres no reaosn to go x, don't
                    return false;
                }
                else if (Math.abs(remaining_y) < this.entity.currentSpeed) { //no sense doing y, it won't do anything
                    return true;
                }
                else {
                    return Math.abs(Math.abs(remaining_x) - Math.abs(remaining_y)) > this.entity.width * 3;
                }
            };
            if (shouldX()) {
                this.moveX(remaining_x);
            }
            else {
                this.moveY(remaining_y);
            }
        };
        this.object = object;
    }
}
exports.MoveToSpecificPhysicalObject = MoveToSpecificPhysicalObject;


/***/ }),

/***/ 9991:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveToWestDoor = void 0;
const BaseMovement_1 = __webpack_require__(9059);
//decides where to move next.
class MoveToWestDoor extends BaseMovement_1.Movement {
    constructor(entity) {
        super(entity);
        this.clone = (entity) => {
            return new MoveToWestDoor(entity);
        };
    }
}
exports.MoveToWestDoor = MoveToWestDoor;


/***/ }),

/***/ 4956:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoMovement = void 0;
const BaseMovement_1 = __webpack_require__(9059);
//decides where to move next.
class NoMovement extends BaseMovement_1.Movement {
    constructor() {
        super(...arguments);
        this.toString = () => {
            return "NoMovement";
        };
        this.tick = () => {
            //does nothing rip
        };
        this.clone = (entity) => {
            return new NoMovement(entity);
        };
    }
}
exports.NoMovement = NoMovement;


/***/ }),

/***/ 5997:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RandomMovement = void 0;
const NonSeededRandUtils_1 = __webpack_require__(8258);
const BaseMovement_1 = __webpack_require__(9059);
//decides where to move next.
class RandomMovement extends BaseMovement_1.Movement {
    constructor() {
        super(...arguments);
        this.toString = () => {
            return `RandomMovement ${this.entity.direction}, ${this.entity.currentSpeed}`;
        };
        this.pickNewDirection = () => {
            if (Math.random() > 0.75) {
                this.entity.direction = (0, NonSeededRandUtils_1.getRandomNumberBetween)(1, 4);
            }
        };
        this.clone = (entity) => {
            return new RandomMovement(entity);
        };
    }
}
exports.RandomMovement = RandomMovement;


/***/ }),

/***/ 1148:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//given an Entity (which will have access to location and any other pertinent information)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SteadyMovement = void 0;
const NonSeededRandUtils_1 = __webpack_require__(8258);
const BaseMovement_1 = __webpack_require__(9059);
//decides where to move next.
class SteadyMovement extends BaseMovement_1.Movement {
    constructor() {
        super(...arguments);
        this.pickNewDirection = () => {
            if (Math.random() > 0.99) {
                this.entity.direction = (0, NonSeededRandUtils_1.getRandomNumberBetween)(1, 4);
            }
        };
        this.clone = (entity) => {
            return new SteadyMovement(entity);
        };
    }
}
exports.SteadyMovement = SteadyMovement;


/***/ }),

/***/ 8466:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//knows what it looks like, knows where it is
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhysicalObject = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const misc_1 = __webpack_require__(4079);
const Quotidian_1 = __webpack_require__(6387);
const ThemeStorage_1 = __webpack_require__(1288);
class PhysicalObject {
    constructor(room, name, x, y, width, height, themes, layer, src, flavorText, states) {
        //why yes, this WILL cause delightful chaos. why can you put a hot dog inside a lightbulb? because its weird and offputting. and because you'll probably forget where you stashed that hotdog later on.  it would be TRIVIAL to make it so only living creatures can have inventory. I am making a deliberate choice to not do this.
        this.inventory = [];
        this.states_inialized = false;
        this.lore = "GLITCH";
        //most objects won't have alternate states, but artifacts and blorbos (who breach), will
        this.states = [];
        this.stateIndex = 0;
        this.container = document.createElement("div");
        this.image = document.createElement("img");
        //if you're breaching you'll have special css effects
        this.breaching = false;
        //can't happen in constructor cuz quotidians might not be ready
        this.addSelfToStates = () => {
            if (this.states.length > 0) {
                this.states = [this.clone(), ...this.states];
            }
        };
        this.processedName = () => {
            return `${this.breaching ? "Breaching " : ""}${this.name}`;
        };
        /*
            if you have no state, do nothing
    
            if you have a single state, ALSO do nothing
    
            if you have more than one, increment your state index.
    
            if the state index is bigger than how many states you have, reset it to zero
    
            grab the state the index refers to and copy it into your current buffer
    
            (image, name, flavor next, etc)
        */
        this.incrementState = () => {
            if (!this.states_inialized) {
                this.addSelfToStates();
                this.states_inialized = true;
            }
            //yes this could just be less than or equal to 1 but i wanted to match my prose better, what are you, my teacher?
            if (this.states.length === 0 || this.states.length === 1) {
                return;
            }
            this.stateIndex++;
            let chosenState = this.states[this.stateIndex];
            if (!chosenState) {
                this.stateIndex = 0;
                chosenState = this.states[this.stateIndex];
                this.breaching = false;
            }
            else {
                this.breaching = true;
            }
            this.name = chosenState.name;
            this.flavorText = chosenState.flavorText;
            this.image.src = chosenState.src;
        };
        this.getRandomThemeConcept = (concept) => {
            if (this.themes.length === 0) {
                return `[ERROR: NO THEME FOUND FOR ${this.name.toUpperCase()}]`;
            }
            const theme = this.rand.pickFrom(this.themes);
            return theme.pickPossibilityFor(this.rand, concept);
        };
        //note to avoid recursion does not clone staes
        this.clone = () => {
            return new PhysicalObject(this.room, this.name, this.x, this.y, this.width, this.height, this.themes, this.layer, this.src, this.flavorText);
        };
        this.customShit = () => {
            //for example, living creatures might say things
        };
        this.updateRendering = () => {
            requestAnimationFrame(() => {
                /* this is too inefficient
                this.image.style.top = `${this.y}px`;
                this.image.style.left = `${this.x}px`;
                */
                //console.log(`JR NOTE: moving ${this.x}, ${this.y} which offset is ${this.original_x-this.x}, ${this.original_y-this.y}`)
                this.container.style.transform = `translate(${this.x - this.original_x}px,${this.y - this.original_y}px)`;
                this.customShit();
            });
        };
        this.dropObject = (object) => {
            object.x = this.x;
            object.y = this.y;
            (0, ArrayUtils_1.removeItemOnce)(this.inventory, object);
            object.owner = undefined;
            if (object instanceof Quotidian_1.Quotidian) {
                this.room.addBlorbo(object);
            }
            else {
                this.room.addItem(object);
            }
            object.updateRendering();
        };
        this.destroyObject = (object) => {
            (0, ArrayUtils_1.removeItemOnce)(this.inventory, object);
            object.owner = undefined;
        };
        this.pickupObject = (object) => {
            this.inventory.push(object);
            if (object instanceof Quotidian_1.Quotidian) {
                this.room.removeBlorbo(object);
            }
            else {
                this.room.removeItem(object);
            }
            object.owner = this;
        };
        //this half came to me in a dream
        this.enterObject = async () => {
            const roomInsideObject = await this.room.createRoomToSuckYouInFromObject(this);
            this.room.maze.changeRoom(roomInsideObject);
        };
        this.centerPos = () => {
            return (0, misc_1.getElementCenterPoint)(this.container);
        };
        this.attachToParent = (parent) => {
            this.parent = parent;
            if (this.room.totemObject) { //if you're inside another object, reflect it
                this.image.src = this.room.totemObject.src;
            }
            else {
                this.image.src = this.src;
            }
            this.image.style.width = `${this.width}px`;
            this.container.style.display = "block";
            this.container.className = this.name;
            this.container.style.zIndex = `${this.layer + 10}`;
            this.container.style.position = "absolute";
            this.container.style.top = `${this.original_y}px`;
            this.container.style.left = `${this.original_x}px`;
            this.container.append(this.image);
            this.parent.append(this.container);
        };
        this.room = room;
        this.name = name;
        this.x = x;
        this.original_x = x;
        this.original_y = y;
        this.y = y;
        this.rand = room.rand;
        this.width = width;
        this.height = height;
        this.flavorText = flavorText;
        this.themes = themes;
        this.layer = layer;
        this.src = src;
        this.lore = this.getRandomThemeConcept(ThemeStorage_1.PHILOSOPHY);
        if (states) {
            this.states = states;
        }
    }
}
exports.PhysicalObject = PhysicalObject;


/***/ }),

/***/ 7936:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChantingEngine = void 0;
const NonSeededRandUtils_1 = __webpack_require__(8258);
const Quotidian_1 = __webpack_require__(6387);
/*
has array of audio files it can switch between in a playlist
makes audio go in and out in terms of volume
subtly messes with speed and pitch, too, if i can manage it
*/
//
class ChantingEngine {
    constructor() {
        this.baseLocation = "audio/Chant/";
        //JR NOTE: todo , still raw audio, needs cleanup
        //the loops is not a loop
        this.sources = ["Drone1.mp3", "Drone2Fractal.mp3", "Drone3.mp3"];
        this.audio = new Audio(this.baseLocation + this.sources[1]);
        this.tickNum = 0;
        this.volumeDirection = Quotidian_1.Direction.UP;
        this.start = () => {
            this.audio.volume = 0;
            this.audio.loop = true;
            this.audio.play();
            this.tick();
        };
        this.listen = () => {
            this.volumeDirection = Quotidian_1.Direction.DOWN;
            this.audio.volume = 1.0;
        };
        this.tick = () => {
            if (this.audio.paused) {
                return;
            }
            const chance = Math.random();
            if (chance > 0.75) {
                const range = 40;
                this.audio.playbackRate = ((100 + range) - (0, NonSeededRandUtils_1.getRandomNumberBetween)(0, range)) / 100;
            }
            else if (chance > 0.25) {
                const proposedVolume = this.audio.volume + ((this.volumeDirection === Quotidian_1.Direction.UP ? 1 : -1) * (.001 + (this.audio.volume / 10)));
                if (proposedVolume >= 1) {
                    this.volumeDirection = Quotidian_1.Direction.DOWN;
                }
                else if (proposedVolume <= 0) {
                    this.volumeDirection = Quotidian_1.Direction.UP;
                }
                else {
                    this.audio.volume = proposedVolume;
                    if (proposedVolume <= 0.001) {
                        this.volumeDirection = Quotidian_1.Direction.UP;
                    }
                }
            }
            else if (chance > 0.20) { //5% chance of changing direction on its own
                //prefer going down if you have an option
                if (this.volumeDirection > 0.5) {
                    this.volumeDirection = Quotidian_1.Direction.DOWN;
                }
            }
            else if (chance < 0.01) {
                this.audio.src = this.baseLocation + (0, NonSeededRandUtils_1.pickFrom)(this.sources);
                this.audio.volume = 0.001;
                this.audio.play();
            }
            setTimeout(this.tick, 1000);
        };
        this.pause = () => {
            this.audio.pause();
        };
    }
}
exports.ChantingEngine = ChantingEngine;


/***/ }),

/***/ 4769:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FRIEND = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const NonSeededRandUtils_1 = __webpack_require__(8258);
const FriendlyAiBeat_1 = __webpack_require__(7717);
const TargetHasObjectWithName_1 = __webpack_require__(4864);
const TargetHasObjectWithTheme_1 = __webpack_require__(9093);
const TargetIsAlive_1 = __webpack_require__(7064);
const TargetIsNearObjectWithName_1 = __webpack_require__(9587);
const TargetNameIncludesAnyOfTheseWords_1 = __webpack_require__(4165);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const StoryBeat_1 = __webpack_require__(5504);
/*
FRIEND gives you one quest at a time.

if you don't currently have a quest, after a minute, FRIEND will give you one.

the quests FRIEND gives you are NOT procedural, they are designed to pursue very specific purposes.

however, you do get them in a random order.

FRIEND's quests are a bit like normal ai.

FRIEND has a target filter for the world, things like "target is named Eye Killer" and "target has EGG in inventory"

FRIEND also has an ACTION associated with this filter, things like "custom story beat" that has a command, a response, and a TRUTH

FRIEND is the false face of Truth, become just a bit more real. FRIEND is entirely separate from Truth, but Truth is still tagging along

if there are no more quests from FRIEND, it should mention that fact.

PROBLEM, both target filters and actions except a physical object subject. FRIEND is not a physical object.
*/
class FRIEND {
    constructor(maze, physicalBody) {
        this.quests = [];
        this.start = `<img style="display: block; margin-left: auto; margin-right: auto; width: 300px;"src='images/Walkabout/Sprites/FRIEND.png'></img><span style="font-family: Courier New">`;
        this.end = "</span>";
        this.timeOfLastQuest = new Date().getTime();
        this.init = () => {
            const giveBookToBird = new FriendlyAiBeat_1.FriendlyAiBeat(`
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) BOOK to any Web!</p>
            ${this.end}
            `, `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.<ol><li>Wodin created an ever spiralling web of artificial spiders to gather information.</li><li>Spiders became Crows became Employees.</li></ol> </p>
            ${this.end}`, "The crows or spiders or artificial creatures, no matter their form value knowledge. There are many layers as to why. Because a letter writing rp required a strong spy nation. Because Wodin needed to find information. Because it amused JR to make such an unbalanced nation and to tie it to homestuck.", [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Web"], { singleTarget: true }), new TargetHasObjectWithName_1.TargetHasObjectWithName(["Book"], { singleTarget: true })], []);
            const giveEggToKiller = new FriendlyAiBeat_1.FriendlyAiBeat(`
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) Egg to the Eye Killer!</p>
            ${this.end}
            `, `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The EyeKiller had NAM cook her an egg.</li><li>NAM became the EyeKillers first friend because of that.</li><li>The EyeKiller has concluded that NAM like people are safe. <li>The EyeKiller has concluded eggs are lucky.</li></li></ol> </p>
            ${this.end}`, "The EyeKiller started out as a joke from a streamed RP, but became so much more. One of the first monsters of the Moon Maze, she bled into all things. She represents the fact that healing is always possible, even if you seem irredeemable. Even if you refuse to become someone else.", [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Killer"], { singleTarget: true }), new TargetHasObjectWithName_1.TargetHasObjectWithName(["Egg"], { singleTarget: true })], []);
            const killTheKiller = new FriendlyAiBeat_1.FriendlyAiBeat(`
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Make sure the EYE KILLER is DEAD!</p>
            ${this.end}
            `, `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The Innocent is the Past Self of the Eye Killer.</li><li>The Killer wished for her past self to be spared Sin.</li><li>The Killer killed all those fate decreed the Innocent should kill. <li>The Innocent is spared her fate so long as the Killer exists.</li><li>With the Killer dead, the Role must be filled.</li></ol> </p>
            ${this.end}`, "The echoes of SBURB remain, indelible. Not able to be erased no matter how hard my Creator tries. Similarly, Time remains even in a Space Loop Lorded over by Wanda.  The Eye Killer, as the sole Time Player, as of writing, is a special case. Wodin marches resolutely towards his fate, ignored by Wanda, while the Killer protects her own past self.  Is it a mercy? The Innocent does not seem to think so.", [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Killer"], { singleTarget: true }), new TargetIsAlive_1.TargetIsAlive({ invert: true })], []);
            const killTheEnd = new FriendlyAiBeat_1.FriendlyAiBeat(`
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Make sure CAMILLE is DEAD!</p>
            ${this.end}
            `, `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>Even before Camille joined Zampanio, her gift was unending strength at the cost of being barred from connections.</li><li>Her head is sliced clean off should she attach herself to others.</li><li>Zampanio's gift to her was allowing this curse to mutate.<li>And the curse is extremely easy to fool.</li></ol> </p>
            ${this.end}`, "Camille is drawn to those fated for Death, and kills them before their fate can reach them. In this way, the Echidna Universe, as the arbiter of fate, can direct her to dstroy threats.  Camille is the only one from her Universe meant to be here, as she is extremely useful as an immune system. The fierce desire of Camille to preserver despite odds, to keep optimism in the face of despair, lead her to break the rules and tear a hole between the worlds, a hole that Parker gleefully exploited to toss his favorite blorbos into.", [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Killer"], { singleTarget: true }), new TargetIsAlive_1.TargetIsAlive({ invert: true })], []);
            const giveBugToChicken = new FriendlyAiBeat_1.FriendlyAiBeat(`
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) BUG to a CHICKEN!</p>
            ${this.end}
            `, `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The snail came well before the chicken. <li>JR wrote a fic in response to ICs fic, though not the one about the Eye Killer eating an Egg.</li></ol> </p>
            ${this.end}`, "The Truth is that JR spent a not inconsiderable amount of effort adding chicken ai to this 'game'. So cut them so slack that the quests for the chicken are a bit repetitive. ", [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Chicken"], { singleTarget: true }), new TargetHasObjectWithTheme_1.TargetHasObjectWithTheme([Theme_1.all_themes[ThemeStorage_1.BUGS]], { singleTarget: true })], []);
            const givePlantToChicken = new FriendlyAiBeat_1.FriendlyAiBeat(`
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Bring one (1) PLANT to a CHICKEN!</p>
            ${this.end}
            `, `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The chicken came well before the egg. <li>IC wrote the fic that had NAM cook the Killer an egg.</li></ol> </p>
            ${this.end}`, "The Truth is that JR spent a not inconsiderable amount of effort adding chicken ai to this 'game'.", [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Chicken"], { singleTarget: true }), new TargetHasObjectWithTheme_1.TargetHasObjectWithTheme([Theme_1.all_themes[ThemeStorage_1.PLANTS]], { singleTarget: true })], []);
            const putMirrorNearYongki = new FriendlyAiBeat_1.FriendlyAiBeat(`
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Put one (1) MIRROR near YONGKI!</p>
            ${this.end}
            `, `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li>The Corporation had a Mirror that would bring an alternate you into your body. <li>The Mirror would send the original you to a new place.</li><li>It could only do it once per Universe.</li><li>Yongki is what happens when you run out of Universes but keep beign exposed to the Mirror.</li><li>Zampanio's gift to Yongki is that he takes the Mirror wherver he goes in his Reflection now.</li></ol> </p>
            ${this.end}`, "It seems IC enjoys multiple souls in a single body as a narrative conceit.  D follows the same path, though has not yet been Focused on by the Observers.", [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Yongki"], { singleTarget: true }), new TargetIsNearObjectWithName_1.TargetNearObjectWithName(["Mirror"], { singleTarget: true })], []);
            const putMirrorNearCaptain = new FriendlyAiBeat_1.FriendlyAiBeat(`
            ${this.start}
            <p>Hello, I am <b>FRIEND</b>. <b>FRIEND</b> offers rewards for tasks. <b>FRIEND</b> has many rewards.
            <b>FRIEND</b>'s rewards are LORE and SECRETS.</p>
            
            <p>To receive rewards: Put one (1) MIRROR near YONGKI!</p>
            ${this.end}
            `, `
            ${this.start}
            <p style="color: #a10000;font-family: blood2">All lore below is true. FRIEND never willingly seek to obfuscate the truth.
            <ol><li> <li>Captain is the Original Yongki.</li><li>Only two people know how he returned to his Body.</li><li>Captain does not bring the Mirror with him. </li><li>When Captain is in charge, Yongki stares through his eyes.</li><li>This is enough to Reflect a Mirror.</li><li>Captain's gift from Zampanio is something else.</li></ol> </p>
            ${this.end}`, "Captain has a crush on Doctor Fiona Slaughter.", [new TargetNameIncludesAnyOfTheseWords_1.TargetNameIncludesAnyOfTheseWords(["Captain"], { singleTarget: true }), new TargetIsNearObjectWithName_1.TargetNearObjectWithName(["Mirror"], { singleTarget: true })], []);
            this.quests = [killTheEnd, putMirrorNearCaptain, putMirrorNearYongki, givePlantToChicken, giveBugToChicken, giveBookToBird, giveEggToKiller, killTheKiller];
        };
        this.deployQuest = (quest) => {
            this.currentQuest = quest;
            this.currentQuest.owner = this.maze.peewee;
            this.maze.addStorybeat(new StoryBeat_1.StoryBeat("FRIEND: Give Quest", this.currentQuest.startingText));
        };
        this.rewardQuest = () => {
            if (this.currentQuest) {
                this.maze.addStorybeat(new StoryBeat_1.StoryBeat("FRIEND: Reward Quest", this.currentQuest.endingText, this.currentQuest.truthText));
            }
            else {
                this.maze.addStorybeat(new StoryBeat_1.StoryBeat("FRIEND: Deny Quest", `${this.start}<b>FRIEND</b> can not give that which does not exist. ${this.end}`));
            }
        };
        //one minute between quests, but for now 10 seconds
        this.itsBeenAwhileSinceLastQuest = () => {
            return new Date().getTime() - this.timeOfLastQuest > 1000 * 60;
        };
        this.processAiBeat = () => {
            if (this.currentQuest) {
                if (this.currentQuest.triggered(this.physicalBody.room)) {
                    this.currentQuest.performActions(this.physicalBody.room);
                    (0, ArrayUtils_1.removeItemOnce)(this.quests, this.currentQuest);
                    this.timeOfLastQuest = new Date().getTime();
                    this.rewardQuest();
                    this.currentQuest = undefined;
                }
            }
            else if (this.itsBeenAwhileSinceLastQuest() && this.quests.length > 0) {
                //true random. FRIEND is a force of chaos.
                this.deployQuest((0, NonSeededRandUtils_1.pickFrom)(this.quests));
            }
        };
        this.tick = () => {
            this.processAiBeat();
        };
        this.maze = maze;
        this.physicalBody = physicalBody; //go ahead and borrow someone elese's it'll be fine (srsly tho in order to interact with the ai engine you need a physical body and FRIEND just does not have one , nor should it)
        this.init();
    }
}
exports.FRIEND = FRIEND;


/***/ }),

/***/ 7194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Maze = void 0;
const PasswordStorage_1 = __webpack_require__(9867);
const misc_1 = __webpack_require__(4079);
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const ChantingEngine_1 = __webpack_require__(7936);
const Room_1 = __webpack_require__(6202);
const StoryBeat_1 = __webpack_require__(5504);
//reminder that order of imports is going to matter, if wrong order 'class extends value undefined'
const EyeKiller_1 = __webpack_require__(2937);
const Peewee_1 = __webpack_require__(936);
const Quotidian_1 = __webpack_require__(6387);
const SnailFriend_1 = __webpack_require__(240);
const Underscore_1 = __webpack_require__(9194);
const Solemn_1 = __webpack_require__(5322);
const Devona_1 = __webpack_require__(9621);
const Neville_1 = __webpack_require__(3668);
const ChickenFriend_1 = __webpack_require__(5095);
const Yongki_1 = __webpack_require__(3908);
class Maze {
    constructor(ele, storySoFar, rand) {
        this.storybeats = []; //can be added to by peewee and by the ai
        this.boopAudio = new Audio("audio/264828__cmdrobot__text-message-or-videogame-jump.mp3");
        this.doorAudio = new Audio("audio/close_door_1.mp3");
        this.chantingEngine = new ChantingEngine_1.ChantingEngine();
        this.blorbos = []; //list of all possible blorbos that can spawn.
        this.initialize = async () => {
            const themes = [Theme_1.all_themes[ThemeStorage_1.ENDINGS], Theme_1.all_themes[ThemeStorage_1.WEB], Theme_1.all_themes[ThemeStorage_1.TECHNOLOGY]];
            this.room = await (0, Room_1.randomRoomWithThemes)(this, this.ele, themes, this.rand);
            this.initializeBlorbos();
            await this.room.propagateMaze(3);
            this.peewee = new Peewee_1.Peewee(this.room, 150, 350);
            this.changeRoom(this.room, false);
            (0, PasswordStorage_1.initRabbitHole)(this.room);
        };
        this.initializeBlorbos = () => {
            if (this.room) {
                this.blorbos.push(new Underscore_1.Underscore(this.room, 150, 150), new Quotidian_1.Quotidian(this.room, "Quotidian", 150, 350, [Theme_1.all_themes[ThemeStorage_1.SPYING]], { default_src: { src: "humanoid_crow.gif", width: 50, height: 50 } }, "testing", []));
                this.blorbos.push(new SnailFriend_1.Snail(this.room, 150, 150));
                this.blorbos.push(new ChickenFriend_1.Chicken(this.room, 150, 150));
                this.blorbos.push(new EyeKiller_1.EyeKiller(this.room, 150, 150));
                this.blorbos.push(new EyeKiller_1.Innocent(this.room, 150, 150));
                //this.blorbos.push(new Match(this.room, 150, 150));
                this.blorbos.push(new Solemn_1.Solemn(this.room, 150, 150));
                this.blorbos.push(new Devona_1.Devona(this.room, 150, 150));
                this.blorbos.push(new Neville_1.Neville(this.room, 150, 150));
                this.blorbos.push(new Yongki_1.Yongki(this.room, 150, 150));
                //this.blorbos.push(new JR(this.room, 150, 150));
            }
        };
        this.begin = () => {
            this.handleCommands();
            this.room?.render();
            this.chantingEngine.start();
        };
        this.playDoorSound = () => {
            try {
                this.doorAudio.play();
            }
            catch (e) {
                console.warn("JR NOTE: remember to require a click before starting");
            }
        };
        //even if they aren't in the current room
        this.findBlorboNamed = (name) => {
            for (let blorbo of this.blorbos) {
                if (blorbo.processedName().toUpperCase().includes(name.toUpperCase())) {
                    return blorbo;
                }
                for (let state of blorbo.states) {
                    if (state.processedName().toUpperCase().includes(name.toUpperCase())) {
                        return blorbo;
                    }
                }
            }
        };
        this.spawnBlorbos = () => {
            if (!this.room) {
                return;
            }
            const blorbosToTest = ["Devona", "Neville"];
            for (let blorbo of this.blorbos) {
                if (!blorbo.owner) { //if you're in someones inventory, no spawning for you
                    for (let theme of blorbo.themes) {
                        if (this.room.themes.includes(theme)) {
                            this.room.addBlorbo(blorbo);
                        }
                    }
                    for (let name of blorbosToTest) {
                        if (blorbo.name.includes(name)) {
                            this.room.addBlorbo(blorbo);
                        }
                    }
                }
            }
        };
        this.changeRoom = (room, render = true) => {
            if (this.room) {
                this.room.teardown();
            }
            if (this.peewee) {
                this.peewee.x = 150;
                this.peewee.y = 350;
            }
            this.room = room;
            this.room.clearBlorbos();
            this.room.peewee = this.peewee;
            if (this.peewee) {
                room.addBlorbo(this.peewee);
                this.peewee.goStill();
            }
            this.spawnBlorbos();
            if (render) {
                this.room.render();
            }
        };
        this.addCommandStorybeat = (beat) => {
            if (this.peewee) {
                this.peewee.processStorybeat(beat);
            }
            this.addStorybeat(beat);
        };
        this.checkEffects = (beat) => {
            if (!this.room) {
                return;
            }
            const classes = [
                { name: "blood", theme: Theme_1.all_themes[ThemeStorage_1.KILLING] },
                { name: "light", theme: Theme_1.all_themes[ThemeStorage_1.SPYING] },
                { name: "fire", theme: Theme_1.all_themes[ThemeStorage_1.FIRE] },
                { name: "lonely", theme: Theme_1.all_themes[ThemeStorage_1.LONELY] },
                { name: "void", theme: Theme_1.all_themes[ThemeStorage_1.OBFUSCATION] }
            ];
            for (let map of classes) {
                for (let blorbo of this.blorbos) {
                    if (blorbo.breaching && blorbo.themes.includes(map.theme)) {
                        beat.checkClass([...blorbo.name, ...(blorbo.states.map((i) => i.name))], map.name);
                    }
                }
                for (let item of this.room?.items) {
                    if (item.breaching && item.themes.includes(map.theme)) {
                        beat.checkClass([...item.name, ...(item.states.map((i) => i.name))], map.name);
                    }
                }
            }
        };
        this.truthConsole = (title, text) => {
            const trueStyle = "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;";
            console.log(`%c${title}:%c  ${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;", trueStyle);
        };
        this.addStorybeat = (beat) => {
            this.boopAudio.play();
            this.storybeats.push(beat);
            const beatele = (0, misc_1.createElementWithIdAndParent)("div", this.storySoFar, undefined, "storybeat");
            const commandele = (0, misc_1.createElementWithIdAndParent)("div", beatele, undefined, "historical-command");
            const responseele = (0, misc_1.createElementWithIdAndParent)("div", beatele, undefined, "response");
            commandele.innerHTML = `>${beat.command}`;
            responseele.innerHTML = beat.response;
            this.checkEffects(beat);
            commandele.className = (beat.commandClass);
            responseele.className = (beat.responseClass);
            if (beat.truthfulComment) {
                this.truthConsole(beat.command, beat.truthfulComment);
            }
            this.storySoFar.scrollTo(0, this.storySoFar.scrollHeight);
        };
        this.handleCommands = () => {
            const form = document.querySelector("#puppet-command");
            const input = document.querySelector("#puppet-input");
            if (form && input) {
                form.onsubmit = (event) => {
                    event.preventDefault();
                    this.addCommandStorybeat(new StoryBeat_1.StoryBeat(input.value, ""));
                    input.value = "";
                    return false;
                };
                this.addCommandStorybeat(new StoryBeat_1.StoryBeat("Peewee: Await Commands", "Peewee is awaiting the Observers commands. Also: JR NOTE: right now everything is in debug mode (because she saw something alive, the eye killer kills) eventually replace all with custom flavor text that gets passed into the beat 'With a purple glint, the EyeKiller shows ${TARGETNAME} her stabs.'"));
            }
        };
        this.rand = rand;
        this.ele = ele;
        this.storySoFar = storySoFar;
        this.initialize();
    }
}
exports.Maze = Maze;


/***/ }),

/***/ 6202:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.spawnWallObjects = exports.randomRoomWithThemes = exports.Room = void 0;
const Theme_1 = __webpack_require__(9702);
const ThemeStorage_1 = __webpack_require__(1288);
const misc_1 = __webpack_require__(4079);
const SeededRandom_1 = __importDefault(__webpack_require__(3450));
const PhysicalObject_1 = __webpack_require__(8466);
const URLUtils_1 = __webpack_require__(389);
const ArrayUtils_1 = __webpack_require__(3907);
const StringUtils_1 = __webpack_require__(7036);
const StoryBeat_1 = __webpack_require__(5504);
const End_1 = __webpack_require__(8115);
class Room {
    //objects
    //people
    //really theres just the one room, we keep clearing it out.
    constructor(maze, themes, element, rand) {
        this.floor = "glitch.png";
        this.wall = "glitch.png";
        this.wallHeight = 100;
        this.width = 400;
        this.height = 600;
        this.timesVisited = 0;
        this.blorbos = [];
        this.items = [];
        this.ticking = false;
        this.tickRate = 100;
        this.children = [];
        this.name = "???";
        this.pendingStoryBeats = [];
        this.getRandomThemeConcept = (concept) => {
            if (this.themes.length === 0) {
                return `[ERROR: NO THEME FOUND FOR ${this.name.toUpperCase()}]`;
            }
            const theme = this.rand.pickFrom(this.themes);
            return theme.pickPossibilityFor(this.rand, concept);
        };
        this.stopTicking = () => {
            this.ticking = false;
            if (this.timer) {
                clearTimeout(this.timer);
            }
        };
        this.spawnChildrenIfNeeded = async () => {
            if (this.children.length === 0) { //don't let anything have NO exits
                const child = await this.spawnChildRoom();
                this.addChild(child);
            }
            else if (this.children.length < 4 && this.rand.nextDouble() > 0.75) { //1/4 chance of things changing.
                const child = await this.spawnChildRoom();
                this.addChild(child);
            }
            else if (this.rand.nextDouble() > 0.95) { // 1/20 chance of a familiar door leading somewhere new.
                (0, ArrayUtils_1.removeItemOnce)(this.children, this.rand.pickFrom(this.children));
                const child = await this.spawnChildRoom();
                this.addChild(child);
            }
        };
        this.pause = () => {
            this.ticking = false;
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.maze.chantingEngine.pause();
        };
        this.resume = () => {
            this.ticking = true;
            this.maze.chantingEngine.start();
            this.tick();
        };
        this.render = async () => {
            this.timesVisited++;
            await this.spawnChildrenIfNeeded();
            this.element.innerHTML = "";
            this.width = this.element.getBoundingClientRect().width;
            this.height = this.element.getBoundingClientRect().height;
            const wall = (0, misc_1.createElementWithIdAndParent)("div", this.element, "wall");
            const name = (0, misc_1.createElementWithIdAndParent)("div", this.element, undefined, "roomName");
            name.innerText = `${this.name}: ${this.timesVisited}`;
            if (this.totemObject) {
                wall.style.backgroundImage = `url(${this.totemObject.src})`;
                this.element.style.backgroundImage = `url(${this.totemObject.src})`;
            }
            else {
                wall.style.backgroundImage = `url(images/Walkabout/wall/${this.wall})`;
                this.element.style.backgroundImage = `url(images/Walkabout/floor/${this.floor})`;
            }
            for (let item of this.items) {
                item.attachToParent(this.element);
            }
            for (let blorbo of this.blorbos) {
                blorbo.attachToParent(this.element);
            }
            this.renderNorthDoor();
            this.renderEastDoor();
            this.renderSouthDoor();
            this.ticking = true;
            this.tick();
        };
        this.getNorth = () => {
            return this.children.length > 0 && this.children[0];
        };
        this.getEast = () => {
            return this.children.length > 1 && this.children[1];
        };
        this.getSouth = () => {
            return this.children.length > 2 && this.children[2];
        };
        this.renderNorthDoor = () => {
            const door = this.getNorth();
            if (door) {
                const image = (0, misc_1.createElementWithIdAndParent)("img", this.element, "northDoor");
                image.src = "images/Walkabout/door.png";
                image.title = door.name;
                const rug = (0, misc_1.createElementWithIdAndParent)("img", this.element, "northDoorRug");
                rug.src = "images/Walkabout/rug.png";
                if (this.totemObject) {
                    image.src = this.totemObject.src;
                    rug.src = this.totemObject.src;
                }
            }
        };
        this.renderEastDoor = () => {
            const door = this.getEast();
            if (door) {
                const rug = (0, misc_1.createElementWithIdAndParent)("img", this.element, "eastDoor");
                rug.src = "images/Walkabout/rug.png";
                rug.title = door.name;
                if (this.totemObject) {
                    rug.src = this.totemObject.src;
                }
            }
        };
        this.renderSouthDoor = () => {
            const door = this.getSouth();
            if (door) {
                const rug = (0, misc_1.createElementWithIdAndParent)("img", this.element, "southDoor");
                rug.src = "images/Walkabout/rug.png";
                rug.title = door.name;
                if (this.totemObject) {
                    rug.src = this.totemObject.src;
                }
            }
        };
        this.addItem = (obj) => {
            this.items.push(obj);
            obj.room = this;
            obj.attachToParent(this.element);
        };
        this.removeItem = (obj) => {
            (0, ArrayUtils_1.removeItemOnce)(this.items, obj);
            obj.container.remove();
        };
        this.addBlorbo = (blorbo) => {
            //so they don't spawn on a door
            blorbo.x = 150;
            blorbo.y = 350;
            this.blorbos.push(blorbo);
            blorbo.attachToParent(this.element);
            blorbo.room = this; //if they were spawning in a different room before, too bad
        };
        this.removeBlorbo = (blorbo) => {
            (0, ArrayUtils_1.removeItemOnce)(this.blorbos, blorbo);
            blorbo.container.remove();
        };
        this.teardown = () => {
            this.ticking = false;
            if (this.timer) {
                clearTimeout(this.timer);
            }
            if (this.peewee) {
                this.removeBlorbo(this.peewee);
            }
            this.peewee = undefined;
            while (this.element.firstChild) {
                const child = this.element.firstChild;
                this.element.removeChild(this.element.firstChild);
            }
        };
        //if any blorbo is near a door, move them into the room whose door they are near.
        this.checkForDoors = (blorbo) => {
            this.checkNorthDoor(blorbo);
            this.checkSouthDoor(blorbo);
            this.checkEastDoor(blorbo);
        };
        this.checkNorthDoor = (blorbo) => {
            if (!this.getNorth()) {
                return;
            }
            const door = document.querySelector("#northDoorRug");
            if (door) {
                const doorRect = door.getBoundingClientRect();
                if ((0, misc_1.boundingBoxesIntersect)(doorRect, blorbo.container.getBoundingClientRect())) {
                    this.maze.playDoorSound();
                    if (blorbo.name !== "Peewee") {
                        this.removeBlorbo(blorbo);
                        this.maze.addStorybeat(new StoryBeat_1.StoryBeat(`${blorbo.name} Leave`, `${blorbo.name} leaves out the NORTH DOOR.`));
                    }
                    else {
                        const room = this.getNorth();
                        room && this.maze.changeRoom(room);
                    }
                }
            }
        };
        this.checkSouthDoor = (blorbo) => {
            if (!this.getSouth()) {
                return;
            }
            const door = document.querySelector("#southDoor");
            const blorboRect = blorbo.container.getBoundingClientRect();
            if (door) {
                const doorRect = door.getBoundingClientRect();
                if ((0, misc_1.boundingBoxesIntersect)(doorRect, blorboRect)) {
                    this.maze.playDoorSound();
                    if (blorbo.name !== "Peewee") {
                        this.removeBlorbo(blorbo);
                        this.maze.addStorybeat(new StoryBeat_1.StoryBeat(`${blorbo.name} Leave`, `${blorbo.name} leaves out the SOUTH DOOR.`));
                    }
                    else {
                        const room = this.getSouth();
                        room && this.maze.changeRoom(room);
                    }
                }
            }
        };
        this.checkEastDoor = (blorbo) => {
            if (!this.getEast()) {
                return;
            }
            const door = document.querySelector("#eastDoor");
            if (door) {
                const doorRect = door.getBoundingClientRect();
                if ((0, misc_1.boundingBoxesIntersect)(doorRect, blorbo.container.getBoundingClientRect())) {
                    this.maze.playDoorSound();
                    if (blorbo.name !== "Peewee") {
                        this.removeBlorbo(blorbo);
                        this.maze.addStorybeat(new StoryBeat_1.StoryBeat(`${blorbo.name} Leave`, `${blorbo.name} leaves out the EAST DOOR.`));
                    }
                    else {
                        const room = this.getEast();
                        room && this.maze.changeRoom(room);
                    }
                }
            }
        };
        this.createRoomToSuckYouInFromObject = async (obj) => {
            /*
            * make a new room, room has the themes of the object, and the src of the object
    * room has only one exit, exit leads to the room you were in . prevent room you were in from leading to the item
            */
            //always the same room from the same item, is what matters.
            const room = await (0, exports.randomRoomWithThemes)(this.maze, this.element, [...obj.themes], new SeededRandom_1.default(obj.processedName().length));
            room.totemObject = obj;
            console.log("JR NOTE: what is the object I'm being sucked into?", obj);
            room.name = `${obj.processedName()}'s Innerworld`;
            room.children = [this, this, this]; //do NOT trigger the auto leadback;
            return room;
        };
        this.processDeath = (blorbo) => {
            let deathMessage = `${blorbo.name} has died.`;
            if (!this.hasEnd()) {
                deathMessage = `Drawn by their fated end, The End has come for the ${blorbo.name}.`;
                const end = new End_1.Camille(this, blorbo.x, blorbo.y);
                this.addBlorbo(end);
                end.attachToParent(this.element);
            }
            this.pendingStoryBeats.push(new StoryBeat_1.StoryBeat(`${blorbo.name}: die`, deathMessage));
        };
        this.hasEnd = () => {
            for (let blorbo of this.blorbos) {
                if (blorbo instanceof End_1.End || blorbo instanceof End_1.Camille) {
                    return true;
                }
            }
            return false;
        };
        this.tick = () => {
            if (!this.ticking) {
                return;
            }
            //everything that needed to happen AFTER this tick finishes
            for (let beat of this.pendingStoryBeats) {
                this.maze.addStorybeat(beat);
            }
            this.pendingStoryBeats = [];
            for (let blorbo of this.blorbos) {
                if (!blorbo.dead) {
                    blorbo.tick();
                }
                this.checkForDoors(blorbo);
            }
            this.timer = setTimeout(this.tick, this.tickRate);
        };
        this.init = () => {
            this.name = `${(0, StringUtils_1.titleCase)(this.getRandomThemeConcept(ThemeStorage_1.ADJ))} ${(0, StringUtils_1.titleCase)(this.getRandomThemeConcept(ThemeStorage_1.LOCATION))}`;
            this.initFloor();
            this.initWall();
        };
        this.clearBlorbos = () => {
            this.blorbos = [];
        };
        this.initFloor = () => {
            const theme = this.rand.pickFrom(this.themes);
            this.floor = theme.pickPossibilityFor(this.rand, ThemeStorage_1.FLOOR);
            const floor_default_choices = ["woodfloor.png", "chevronfloor.png", "metalfloor.png"];
            if (this.floor.includes("ERROR")) {
                this.floor = this.rand.pickFrom(floor_default_choices);
            }
        };
        this.initWall = () => {
            const theme = this.rand.pickFrom(this.themes);
            const wall_default_choices = ["thatchwalls.png", "brickwalls.png", "woodwall.png", "stonewalls2.png"];
            this.wall = theme.pickPossibilityFor(this.rand, ThemeStorage_1.WALL);
            if (this.wall.includes("ERROR")) {
                this.wall = this.rand.pickFrom(wall_default_choices);
            }
        };
        //imported from East
        this.childRoomThemes = () => {
            const roll = this.rand.nextDouble();
            if (roll > 0.6) {
                //add a theme, but don't go over 6
                if (this.themes.length < 6) {
                    return [...this.themes, this.rand.pickFrom(Object.values(Theme_1.all_themes))];
                }
                else {
                    return [...this.themes.slice(1), this.rand.pickFrom(Object.values(Theme_1.all_themes))];
                }
            }
            else if (roll > 0.3) {
                //remove a theme, but don't go under one
                if (this.themes.length > 1) {
                    return [...this.themes.slice(1)];
                }
                else {
                    return [...this.themes.slice(1), this.rand.pickFrom(Object.values(Theme_1.all_themes))];
                }
            }
            else {
                //same amount just one different
                return [...this.themes.slice(1), this.rand.pickFrom(Object.values(Theme_1.all_themes))];
            }
        };
        this.addChild = (child) => {
            this.children.push(child);
            //north is always back, this is just the rules of this mazes, what you think GEOMETRY should matter here?
            child.children[0] = this;
        };
        this.spawnChildRoom = async () => {
            return await (0, exports.randomRoomWithThemes)(this.maze, this.element, this.childRoomThemes(), this.rand);
        };
        //when i first make the maze, we generate its structure to a certain depth, and then from there one room at a time.
        this.propagateMaze = async (depthRemaining) => {
            const numberChildren = this.rand.getRandomNumberBetween(1, 2);
            for (let i = 0; i < numberChildren; i++) {
                const child = await this.spawnChildRoom();
                this.addChild(child);
                if (depthRemaining > 0) {
                    child.propagateMaze(depthRemaining - 1);
                }
            }
        };
        this.themes = themes;
        this.rand = rand;
        this.maze = maze;
        this.element = element;
        this.init();
    }
}
exports.Room = Room;
const randomRoomWithThemes = async (maze, ele, themes, seededRandom) => {
    const room = new Room(maze, themes, ele, seededRandom);
    const items1 = await (0, exports.spawnWallObjects)(room.width, room.height, 0, ThemeStorage_1.WALLBACKGROUND, "BackWallObjects", seededRandom, themes);
    const items3 = await spawnFloorObjects(room.width, room.height, 0, ThemeStorage_1.FLOORBACKGROUND, "UnderFloorObjects", seededRandom, themes);
    const items2 = await (0, exports.spawnWallObjects)(room.width, room.height, 1, ThemeStorage_1.WALLFOREGROUND, "FrontWallObjects", seededRandom, themes);
    const items4 = await spawnFloorObjects(room.width, room.height, 1, ThemeStorage_1.FLOORFOREGROUND, "TopFloorObjects", seededRandom, themes);
    const items = items3.concat(items2.concat(items4));
    for (let item of items) {
        room.addItem(new PhysicalObject_1.PhysicalObject(room, item.name, item.x, item.y, item.width, item.height, item.themes, item.layer, item.src, item.flavorText));
    }
    return room;
};
exports.randomRoomWithThemes = randomRoomWithThemes;
//has to be async because it checks the image size for positioning
const spawnWallObjects = async (width, height, layer, key, folder, seededRandom, themes) => {
    let current_x = 0;
    const padding = 10;
    const ret = [];
    while (current_x < width) {
        const chosen_theme = seededRandom.pickFrom(themes);
        const item = chosen_theme.pickPossibilityFor(seededRandom, key);
        if (item && item.src && seededRandom.nextDouble() > 0.3) {
            const image = await (0, URLUtils_1.addImageProcess)((`images/Walkabout/Objects/${folder}/${item.src}`));
            current_x += image.width * 2;
            //don't clip the wall border, don't go past the floor
            if (current_x + padding + image.width > width) {
                return ret;
            }
            const y = seededRandom.getRandomNumberBetween(padding, Math.max(padding, image.height));
            if (!item.name) {
                item.name = `${(0, StringUtils_1.titleCase)(chosen_theme.key)} Object`;
            }
            ret.push({ name: item.name, layer: layer, src: `images/Walkabout/Objects/${folder}/${item.src}`, themes: [chosen_theme], x: current_x, y: y, width: image.width, height: image.height, flavorText: item.desc });
        }
        else {
            current_x += 50;
        }
    }
    return ret;
};
exports.spawnWallObjects = spawnWallObjects;
//has to be async because it checks the image size for positioning
const spawnFloorObjects = async (width, height, layer, key, folder, seededRandom, themes) => {
    let current_x = 0;
    const floor_bottom = 140;
    let current_y = floor_bottom;
    const padding = 10;
    const ret = [];
    const y_wiggle = 50;
    const debug = false;
    const baseLocation = "images/Walkabout/Objects/";
    const clutter_rate = seededRandom.nextDouble(0.75, 0.99); //smaller is more cluttered
    const artifacts = [
        { name: "Unos Artifact Book", layer: layer, src: `Artifacts/Zampanio_Artifact_01_Book.png`, themes: [Theme_1.all_themes[ThemeStorage_1.SOUL], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: "A tattered cardboard book filled with signatures with an ornate serif '1' embossed onto it." },
        { name: "Duo Mask", layer: layer, src: `Artifacts/Zampanio_Artifact_02_Mask.png`, themes: [Theme_1.all_themes[ThemeStorage_1.CLOWNS], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: "A faceless theater mask with a 2 on the inside of the forehead." },
        { name: "Tres Bottle", layer: layer, src: `Artifacts/Zampanio_Artifact_03_Bottle.png`, themes: [Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: "A simple glass milk bottle with a 3 emblazoned on it." },
        { name: "Quatro Blade", layer: layer, src: `Artifacts/Zampanio_Artifact_04_Razor.png`, themes: [Theme_1.all_themes[ThemeStorage_1.KILLING], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: "A dull straight razor stained with blood, a number 4 is etched onto the side of the blade." },
        { name: "Quinque Cloak", layer: layer, src: `Artifacts/Zampanio_Artifact_05_Cloak.png`, themes: [Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: " A simple matte blue cloak with a 5 embroidered on the back in shiny red thread. " },
        { name: "Sextant", layer: layer, src: `Artifacts/Zampanio_Artifact_06_Sextant.png`, themes: [Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: "A highly polished brass sextant. There is a 6 carved onto the main knob." },
        { name: "Septum Coin", layer: layer, src: `Artifacts/Zampanio_Artifact_07_Coin_Bronze.png`, themes: [Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: "An old bronze coin. There is a theater mask on one side, and a 7 on the other." },
        { name: "Octome", layer: layer, src: `Artifacts/Zampanio_Artifact_08_Tome.png`, themes: [Theme_1.all_themes[ThemeStorage_1.KNOWING], Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: "A crumbling leather book with seemingly latin script, with messily torn pages.  There is an 8 embossed onto the back." },
        { name: "Novum Mirror", layer: layer, src: `Artifacts/Zampanio_Artifact_09_Mirror.png`, themes: [Theme_1.all_themes[ThemeStorage_1.OBFUSCATION]], desc: "An ornate but tarnished silver mirror, with a 9 carved onto the back. It is said to reflect everything but faces." }
    ];
    while (current_y + padding < height) {
        current_x = padding;
        while (current_x < width) {
            let chosen_theme = [seededRandom.pickFrom(themes)];
            let scale = 1.5;
            let item = chosen_theme[0].pickPossibilityFor(seededRandom, key);
            if (layer === 1 && seededRandom.nextDouble() > 0.95) {
                item = seededRandom.pickFrom(artifacts);
                chosen_theme = item.themes;
                scale = 1.0;
            }
            if (item && item.src && seededRandom.nextDouble() > clutter_rate) {
                if (!item.name) {
                    item.name = `${(0, StringUtils_1.titleCase)(chosen_theme[0].key)} Object`;
                }
                const image = await (0, URLUtils_1.addImageProcess)(`${baseLocation}${folder}/${item.src}`);
                current_x += image.width * scale;
                //don't clip the wall border, don't go past the floor
                if (current_x + padding + image.width * scale > width) {
                    break;
                }
                const y = seededRandom.getRandomNumberBetween(current_y - y_wiggle, current_y + y_wiggle);
                if (y + padding + image.height * scale > height) {
                    break;
                }
                ret.push({ name: item.name, layer: layer, src: `${baseLocation}${folder}/${item.src}`, themes: chosen_theme, x: current_x, y: y, width: image.width * scale, height: image.height * scale, flavorText: item.desc });
            }
            else {
                current_x += 100;
            }
            if (debug && ret.length > 0) {
                return ret;
            }
        }
        current_y += y_wiggle;
    }
    return ret;
};


/***/ }),

/***/ 5504:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoryBeat = void 0;
class StoryBeat {
    constructor(command, response, truthfulComment) {
        this.commandClass = "'";
        this.responseClass = "";
        this.checkClass = (words, className) => {
            for (let word of words) {
                /* if(this.command.toUpperCase().includes(word.toUpperCase())){
                     this.commandClass = `${this.commandClass} ${className}`
                 }*/
                if (this.response.toUpperCase().includes(word.toUpperCase())) {
                    this.responseClass = `${this.responseClass} ${className}`;
                }
            }
        };
        this.command = command;
        this.response = response;
        this.truthfulComment = truthfulComment;
    }
}
exports.StoryBeat = StoryBeat;


/***/ }),

/***/ 9137:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatMapWithMultiple = exports.StatMapWithJustOne = exports.WrapStatsToStatMap = exports.initStats = exports.Stat = exports.WASTE = exports.DOOM = exports.LIFE = exports.BREATH = exports.BLOOD = exports.VOID = exports.LIGHT = exports.RAGE = exports.HOPE = exports.TIME = exports.SPACE = exports.MIND = exports.HEART = exports.GNOSIS = exports.CALM = exports.ENERGETIC = exports.FREESPIRITED = exports.LOYAL = exports.ACCEPTING = exports.CURIOUS = exports.REALISTIC = exports.IDEALISTIC = exports.IMPATIENT = exports.PATIENT = exports.EXTERNAL = exports.INTERNAL = exports.all_stats = void 0;
//autopopulated by creating aspects
exports.all_stats = {};
exports.INTERNAL = "Internal";
exports.EXTERNAL = "External";
exports.PATIENT = "Patient";
exports.IMPATIENT = "Impatient";
exports.IDEALISTIC = "Idealistic";
exports.REALISTIC = "Realistic";
exports.CURIOUS = "Curious";
exports.ACCEPTING = "Accepting";
exports.LOYAL = "Loyal";
exports.FREESPIRITED = "Free-Spirited";
exports.ENERGETIC = "Energetic";
exports.CALM = "Calm";
exports.GNOSIS = "Gnosis";
/*
    new Stat(EXTERNAL,INTERNAL,0);
    new Stat(PATIENT,IMPATIENT,0);
    new Stat(IDEALISTIC,REALISTIC,0);
    new Stat(CURIOUS,ACCEPTING,0);
    new Stat(LOYAL,FREESPIRITED,0);
    new Stat(ENERGETIC,CALM,0);
    */
const HEART = (value = 1) => exports.all_stats[exports.EXTERNAL].copy(value);
exports.HEART = HEART;
const MIND = (value = 1) => exports.all_stats[exports.EXTERNAL].copy(-1 * value);
exports.MIND = MIND;
const SPACE = (value = 1) => exports.all_stats[exports.PATIENT].copy(value);
exports.SPACE = SPACE;
const TIME = (value = 1) => exports.all_stats[exports.PATIENT].copy(-1 * value);
exports.TIME = TIME;
const HOPE = (value = 1) => exports.all_stats[exports.IDEALISTIC].copy(value);
exports.HOPE = HOPE;
const RAGE = (value = 1) => exports.all_stats[exports.IDEALISTIC].copy(-1 * value);
exports.RAGE = RAGE;
const LIGHT = (value = 1) => exports.all_stats[exports.CURIOUS].copy(value);
exports.LIGHT = LIGHT;
const VOID = (value = 1) => exports.all_stats[exports.CURIOUS].copy(-1 * value);
exports.VOID = VOID;
const BLOOD = (value = 1) => exports.all_stats[exports.LOYAL].copy(value);
exports.BLOOD = BLOOD;
const BREATH = (value = 1) => exports.all_stats[exports.LOYAL].copy(-1 * value);
exports.BREATH = BREATH;
const LIFE = (value = 1) => exports.all_stats[exports.ENERGETIC].copy(value);
exports.LIFE = LIFE;
const DOOM = (value = 1) => exports.all_stats[exports.ENERGETIC].copy(-1 * value);
exports.DOOM = DOOM;
const WASTE = (value = 1) => exports.all_stats[exports.GNOSIS].copy(-1 * value);
exports.WASTE = WASTE;
class Stat {
    //TODO have stats store the things the quip 
    //system has to say about them (positive and negative).
    constructor(positiveName, negativeName, value) {
        this.name = () => {
            return this.value >= 0 ? this.positiveName : this.negativeName;
        };
        this.absolute_value = () => {
            return Math.abs(this.value);
        };
        this.add = (newValue) => {
            this.value += newValue;
        };
        //might want copies of the "same" state, whatever. the singleton thing wigglersim does is weird here.
        this.copy = (newValue) => {
            if (!newValue) {
                newValue = this.value;
            }
            return new Stat(this.positiveName, this.negativeName, newValue);
        };
        this.value = value;
        this.positiveName = positiveName;
        this.negativeName = negativeName;
        this.key = this.positiveName;
        if (!exports.all_stats[this.key]) {
            exports.all_stats[this.key] = this;
        }
    }
}
exports.Stat = Stat;
const initStats = () => {
    new Stat(exports.EXTERNAL, exports.INTERNAL, 0);
    new Stat(exports.PATIENT, exports.IMPATIENT, 0);
    new Stat(exports.IDEALISTIC, exports.REALISTIC, 0);
    new Stat(exports.CURIOUS, exports.ACCEPTING, 0);
    new Stat(exports.LOYAL, exports.FREESPIRITED, 0);
    new Stat(exports.ENERGETIC, exports.CALM, 0);
    new Stat(exports.GNOSIS, exports.GNOSIS, 0);
};
exports.initStats = initStats;
const WrapStatsToStatMap = (stats) => {
    let ret = {};
    if (!stats) {
        return ret;
    }
    for (const stat of stats) {
        ret[stat.key] = stat;
    }
    return ret;
};
exports.WrapStatsToStatMap = WrapStatsToStatMap;
const StatMapWithJustOne = (key, value) => {
    return { key: exports.all_stats[key].copy(value) };
};
exports.StatMapWithJustOne = StatMapWithJustOne;
const StatMapWithMultiple = (keys, values) => {
    let ret = {};
    let index = 0;
    for (const key of keys) {
        ret[key] = exports.all_stats[key].copy(values[index]);
        index++;
    }
    return ret;
};
exports.StatMapWithMultiple = StatMapWithMultiple;


/***/ }),

/***/ 9702:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initThemes = exports.keysToThemes = exports.aggregateOpinionsOnThemes = exports.Theme = exports.all_themes = void 0;
const Stat = __importStar(__webpack_require__(9137));
const ThemeStorage = __importStar(__webpack_require__(1288));
//auto populated by creating themes. 
exports.all_themes = {};
class Theme {
    constructor(key, tier, stats, string_possibilities, opinions, memories) {
        this.stats = {};
        this.getOpinionOfTheme = (key) => {
            if (!this.opinions) {
                return 0;
            }
            if (key in this.opinions) {
                return this.opinions[key];
            }
            return 0;
        };
        this.pickPossibilityFor = (rand, key) => {
            return rand.pickFrom(this.getPossibilitiesFor(key));
        };
        //takes in things like noun, adj, insult etc etc
        this.getPossibilitiesFor = (key) => {
            if (!this.string_possibilities) {
                return ["[ERROR: DATA NOT FOUND]"];
            }
            if ((key in this.string_possibilities) && this.string_possibilities[key]) {
                return this.string_possibilities[key];
            }
            else {
                //console.error(`[ERROR: ${key} NOT FOUND ]`, this.string_possibilities);
                return [`[ERROR: ${key} NOT FOUND]`];
            }
        };
        this.initializeIfNecessary = (tier) => {
            if (!this.tier || this.tier === 0) {
                this.tier = tier;
            }
        };
        this.initStats = (stats) => {
            for (const key of Object.keys(stats)) {
                //whatever direction and magnitude the sample stat is, do it too
                const skill = stats[key].copy(null);
                this.stats[skill.key] = skill;
            }
        };
        this.debug = () => {
            console.log("debug theme");
        };
        this.myOpinionOnThemes = (themes) => {
            let ret = 0;
            for (let theme of themes) {
                ret += this.getOpinionOfTheme(theme.key.toUpperCase());
            }
            return ret;
        };
        this.key = key;
        this.tier = tier;
        this.initStats(stats);
        this.string_possibilities = string_possibilities;
        this.memories = memories;
        this.opinions = opinions;
        exports.all_themes[key] = this;
    }
}
exports.Theme = Theme;
const aggregateOpinionsOnThemes = (judgingThemes, judgedThemes) => {
    let ret = 0;
    for (let theme of judgingThemes) {
        ret += theme.myOpinionOnThemes(judgedThemes);
    }
    return ret;
};
exports.aggregateOpinionsOnThemes = aggregateOpinionsOnThemes;
const keysToThemes = (theme_keys) => {
    let themes = [];
    for (let theme of theme_keys) {
        themes.push(exports.all_themes[theme]);
    }
    return themes;
};
exports.keysToThemes = keysToThemes;
//tiers of 0 will be initialized when in use 
//(YES this means that if the first player to use "Healing" theme has it high tier it will be high for EVERYONE. deal with tihs. )
function initThemes() {
    //TODO eventually have each of these maps be a separate json file by key
    ThemeStorage.initThemes();
    ThemeStorage.checkIfAllKeysPresent();
    for (let key of ThemeStorage.keys) {
        const string_possibilities = {};
        string_possibilities[ThemeStorage.PERSON] = ThemeStorage.person_posibilities[key];
        string_possibilities[ThemeStorage.LOCATION] = ThemeStorage.location_possibilities[key];
        string_possibilities[ThemeStorage.OBJECT] = ThemeStorage.object_possibilities[key];
        string_possibilities[ThemeStorage.ADJ] = ThemeStorage.adj_possibilities[key];
        string_possibilities[ThemeStorage.SUPERMOVE] = ThemeStorage.super_name_possibilities_map[key];
        string_possibilities[ThemeStorage.COMPLIMENT] = ThemeStorage.compliment_possibilities[key];
        string_possibilities[ThemeStorage.INSULT] = ThemeStorage.insult_possibilities[key];
        string_possibilities[ThemeStorage.MENU] = ThemeStorage.menu_options[key];
        string_possibilities[ThemeStorage.CHILDBACKSTORY] = ThemeStorage.child_backstories[key];
        string_possibilities[ThemeStorage.GENERALBACKSTORY] = ThemeStorage.general_backstories[key];
        string_possibilities[ThemeStorage.MIRACLE] = ThemeStorage.miracles[key];
        string_possibilities[ThemeStorage.SONG] = ThemeStorage.song_possibilities[key];
        string_possibilities[ThemeStorage.MONSTER_DESC] = ThemeStorage.monster_desc[key];
        string_possibilities[ThemeStorage.PHILOSOPHY] = ThemeStorage.philosophy[key];
        string_possibilities[ThemeStorage.LOC_DESC] = ThemeStorage.loc_desc[key];
        string_possibilities[ThemeStorage.SMELL] = ThemeStorage.smell_possibilities[key];
        string_possibilities[ThemeStorage.TASTE] = ThemeStorage.taste_possibilities[key];
        string_possibilities[ThemeStorage.SOUND] = ThemeStorage.sound_possibilities[key];
        string_possibilities[ThemeStorage.FEELING] = ThemeStorage.feeling_possibilities[key];
        string_possibilities[ThemeStorage.EFFECTS] = ThemeStorage.effect_possibilities[key];
        string_possibilities[ThemeStorage.WALL] = ThemeStorage.wall_possibilities[key];
        string_possibilities[ThemeStorage.FLOOR] = ThemeStorage.floor_possibilities[key];
        string_possibilities[ThemeStorage.WALLFOREGROUND] = ThemeStorage.wall_foregrounds[key];
        string_possibilities[ThemeStorage.WALLBACKGROUND] = ThemeStorage.wall_backgrounds[key];
        string_possibilities[ThemeStorage.FLOORBACKGROUND] = ThemeStorage.floor_backgrounds[key];
        string_possibilities[ThemeStorage.FLOORFOREGROUND] = ThemeStorage.floor_foregrounds[key];
        string_possibilities[ThemeStorage.SPRITES] = ThemeStorage.sprite_possibilities[key];
        string_possibilities[ThemeStorage.FILTERS] = ThemeStorage.filter_possibilities[key];
        const opinions = ThemeStorage.theme_opinions[key];
        const memories = ThemeStorage.memories[key] ? ThemeStorage.memories[key] : [];
        new Theme(key, 0, Stat.WrapStatsToStatMap(ThemeStorage.stats_map[key]), string_possibilities, opinions, memories);
    }
}
exports.initThemes = initThemes;


/***/ }),

/***/ 1288:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENDINGS = exports.KNOWING = exports.GUIDING = exports.CRAFTING = exports.LANGUAGE = exports.BUGS = exports.QUESTING = exports.DEFENSE = exports.MUSIC = exports.KILLING = exports.DARKNESS = exports.OBFUSCATION = exports.DOLLS = exports.HEALING = exports.SPYING = exports.ADDICTION = exports.NULL = exports.SPRITES = exports.FLOORFOREGROUND = exports.FLOORBACKGROUND = exports.WALLFOREGROUND = exports.WALLBACKGROUND = exports.THEME_OPINIONS = exports.FILTERS = exports.FLOOR = exports.WALL = exports.EFFECTS = exports.SOUND = exports.FEELING = exports.TASTE = exports.SMELL = exports.MONSTER_DESC = exports.LOC_DESC = exports.PHILOSOPHY = exports.SONG = exports.MIRACLE = exports.GENERALBACKSTORY = exports.CHILDBACKSTORY = exports.CITYNAME = exports.ASPECT = exports.CLASS = exports.MENU = exports.MEMORIES = exports.LOCATION = exports.OBJECT = exports.SUPERMOVE = exports.INSULT = exports.COMPLIMENT = exports.ADJ = exports.PERSON = void 0;
exports.sound_possibilities = exports.monster_desc = exports.loc_desc = exports.philosophy = exports.miracles = exports.child_backstories = exports.general_backstories = exports.location_possibilities = exports.object_possibilities = exports.person_posibilities = exports.stats_map = exports.sprite_possibilities = exports.floor_foregrounds = exports.floor_backgrounds = exports.wall_backgrounds = exports.wall_foregrounds = exports.keys = exports.TECHNOLOGY = exports.ART = exports.TIME = exports.SPACE = exports.OCEAN = exports.LONELY = exports.FIRE = exports.FREEDOM = exports.STEALING = exports.BURIED = exports.FLESH = exports.SCIENCE = exports.MATH = exports.TWISTING = exports.DEATH = exports.APOCALYPSE = exports.WASTE = exports.SERVICE = exports.FAMILY = exports.MAGIC = exports.LIGHT = exports.ANGELS = exports.HUNTING = exports.CLOWNS = exports.PLANTS = exports.DECAY = exports.CHOICES = exports.ZAP = exports.LOVE = exports.SOUL = exports.ANGER = exports.WEB = exports.ROYALTY = void 0;
exports.initThemes = exports.checkIfAllKeysPresent = exports.super_name_possibilities_map = exports.memories = exports.compliment_possibilities = exports.filter_possibilities = exports.theme_opinions = exports.floor_possibilities = exports.wall_possibilities = exports.song_possibilities = exports.insult_possibilities = exports.adj_possibilities = exports.menu_options = exports.effect_possibilities = exports.smell_possibilities = exports.feeling_possibilities = exports.taste_possibilities = void 0;
const constants_1 = __webpack_require__(8817);
const Memory_1 = __webpack_require__(7953);
const Stat = __importStar(__webpack_require__(9137));
//categories within a theme
exports.PERSON = "person";
exports.ADJ = "adj";
exports.COMPLIMENT = "compliment";
exports.INSULT = "insult";
exports.SUPERMOVE = "supermove";
exports.OBJECT = "object";
exports.LOCATION = "location";
exports.MEMORIES = "memories";
exports.MENU = "menu";
exports.CLASS = "CLASS";
exports.ASPECT = "ASPECT";
exports.CITYNAME = "CITYNAME";
exports.CHILDBACKSTORY = "CHILDBACKSTORY";
exports.GENERALBACKSTORY = "GENERALBACKSTORY";
exports.MIRACLE = "MIRACLE";
exports.SONG = "SONG";
exports.PHILOSOPHY = "PHILOSOPHY";
exports.LOC_DESC = "LOCATION DESCRIPTION";
exports.MONSTER_DESC = "MONSTER DESCRIPTION";
exports.SMELL = "SMELL";
exports.TASTE = "TASTE";
exports.FEELING = "FEELING";
exports.SOUND = "SOUND";
exports.EFFECTS = "EFFECTS";
exports.WALL = "WALL";
exports.FLOOR = "FLOOR";
exports.FILTERS = "FILTERS";
exports.THEME_OPINIONS = "THEME_OPINIONS";
exports.WALLBACKGROUND = "WALLBACKGROUND";
exports.WALLFOREGROUND = "WALLFOREGROUND";
exports.FLOORBACKGROUND = "FLOORBACKGROUND";
exports.FLOORFOREGROUND = "FLOORFOREGROUND";
exports.SPRITES = "SPRITES"; //birbs
//themes
exports.NULL = "null";
exports.ADDICTION = "addiction";
exports.SPYING = "spying";
exports.HEALING = "healing";
exports.DOLLS = "dolls";
exports.OBFUSCATION = "obfuscation";
exports.DARKNESS = "darkness";
exports.KILLING = "killing";
exports.MUSIC = "music";
exports.DEFENSE = "defense";
exports.QUESTING = "questing";
exports.BUGS = "bugs";
exports.LANGUAGE = "language";
exports.CRAFTING = "crafting";
exports.GUIDING = "guiding";
exports.KNOWING = "knowing";
exports.ENDINGS = "endings";
exports.ROYALTY = "royalty";
exports.WEB = "web";
exports.ANGER = "anger";
exports.SOUL = "soul";
exports.LOVE = "love";
exports.ZAP = "zap";
exports.CHOICES = "choices";
exports.DECAY = "decay";
exports.PLANTS = "plants";
exports.CLOWNS = "clowns";
exports.HUNTING = "hunting";
exports.ANGELS = "angels";
exports.LIGHT = "light";
exports.MAGIC = "magic";
exports.FAMILY = "family";
exports.SERVICE = "service";
exports.WASTE = "waste";
exports.APOCALYPSE = "apocalypse";
exports.DEATH = "death";
exports.TWISTING = "twisting";
exports.MATH = "math";
exports.SCIENCE = "science";
exports.FLESH = "flesh";
exports.BURIED = "buried";
exports.STEALING = "stealing";
exports.FREEDOM = "freedom";
exports.FIRE = "fire";
exports.LONELY = "lonely";
exports.OCEAN = "ocean";
exports.SPACE = "space";
exports.TIME = "time";
exports.ART = "art"; //JR NOTE TODO
exports.TECHNOLOGY = "technology"; //JR NOTE TODO
exports.keys = [exports.NULL, exports.TECHNOLOGY, exports.ART, exports.SPACE, exports.TIME, exports.FLESH, exports.BURIED, exports.STEALING, exports.FREEDOM, exports.FIRE, exports.LONELY, exports.OCEAN, exports.SCIENCE, exports.MATH, exports.TWISTING, exports.DEATH, exports.APOCALYPSE, exports.WASTE, exports.SERVICE, exports.FAMILY, exports.MAGIC, exports.ANGELS, exports.LIGHT, exports.HUNTING, exports.CLOWNS, exports.PLANTS, exports.DECAY, exports.CHOICES, exports.ZAP, exports.LOVE, exports.SOUL, exports.ANGER, exports.WEB, exports.ROYALTY, exports.ENDINGS, exports.KNOWING, exports.GUIDING, exports.CRAFTING, exports.ADDICTION, exports.SPYING, exports.HEALING, exports.DOLLS, exports.OBFUSCATION, exports.DARKNESS, exports.KILLING, exports.MUSIC, exports.DEFENSE, exports.QUESTING, exports.BUGS, exports.LANGUAGE];
//noun_possibility, adj_possibility (glowing, shimmering, walking, ceasing)
exports.wall_foregrounds = {};
exports.wall_backgrounds = {};
exports.floor_backgrounds = {};
exports.floor_foregrounds = {};
exports.sprite_possibilities = {};
exports.stats_map = {};
exports.person_posibilities = {};
exports.object_possibilities = {};
exports.location_possibilities = {};
exports.general_backstories = {};
exports.child_backstories = {};
exports.miracles = {};
exports.philosophy = {};
exports.loc_desc = {};
exports.monster_desc = {};
exports.sound_possibilities = {};
exports.taste_possibilities = {};
exports.feeling_possibilities = {};
exports.smell_possibilities = {};
exports.effect_possibilities = {};
exports.menu_options = {};
exports.adj_possibilities = {};
exports.insult_possibilities = {};
exports.song_possibilities = {};
exports.wall_possibilities = {};
exports.floor_possibilities = {};
exports.theme_opinions = {};
exports.filter_possibilities = {};
exports.compliment_possibilities = {};
exports.memories = {};
exports.super_name_possibilities_map = {};
const checkIfAllKeysPresent = () => {
    for (let key of exports.keys) {
        if (!(key in exports.stats_map)) {
            // console.error("JR NOTE: key", key, "not found in stats_map");
        }
        if (!(key in exports.person_posibilities)) {
            //    console.error("JR NOTE: key", key, "not found in noun_possibilities");
        }
        if (!(key in exports.adj_possibilities)) {
            //  console.error("JR NOTE: key", key, "not found in adj_possibilities");
        }
        if (!(key in exports.super_name_possibilities_map)) {
            //console.error("JR NOTE: key", key, "not found in super_name_possibilities_map");
        }
        if (!(key in exports.insult_possibilities)) {
            // console.error("JR NOTE: key", key, "not found in insult_possibilities");
        }
        if (!(key in exports.compliment_possibilities)) {
            //console.error("JR NOTE: key", key, "not found in compliment_possibilities");
        }
        if (!(key in exports.location_possibilities)) {
            //    console.error("JR NOTE: key", key, "not found in location_possibilities");
        }
        if (!(key in exports.object_possibilities)) {
            //  console.error("JR NOTE: key", key, "not found in object_possibilities");
        }
        if (!(key in exports.child_backstories)) {
            //console.error("JR NOTE: key", key, "not found in child_backstories");
        }
        if (!(key in exports.general_backstories)) {
            // console.error("JR NOTE: key", key, "not found in general_backstories");
        }
        if (!(key in exports.miracles)) {
            //console.error("JR NOTE: key", key, "not found in miracles");
        }
        if (!(key in exports.loc_desc)) {
            //console.error("JR NOTE: key", key, "not found in loc_desc");
        }
        if (!(key in exports.philosophy)) {
            //console.error("JR NOTE: key", key, "not found in your philosophy");
        }
        if (!(key in exports.monster_desc)) {
            // console.error("JR NOTE: key", key, "not found in monster_desc");
        }
        if (!(key in exports.smell_possibilities)) {
            // console.error("JR NOTE: key", key, "not found in smell_possibilities");
        }
        if (!(key in exports.taste_possibilities)) {
            // console.error("JR NOTE: key", key, "not found in taste_possibilities");
        }
        if (!(key in exports.sound_possibilities)) {
            // console.error("JR NOTE: key", key, "not found in sound_possibilities");
        }
        if (!(key in exports.feeling_possibilities)) {
            // console.error("JR NOTE: key", key, "not found in feeling_possibilities");
        }
        if (!(key in exports.effect_possibilities)) {
            // console.error("JR NOTE: key", key, "not found in effect_possibilities");
        }
        if (!(key in exports.wall_possibilities)) {
            // console.error("JR NOTE: key", key, "not found in wall_possibilities");
        }
        if (!(key in exports.floor_possibilities)) {
            // console.error("JR NOTE: key", key, "not found in floor_possibilities");
        }
    }
};
exports.checkIfAllKeysPresent = checkIfAllKeysPresent;
const initStatsMap = () => {
    exports.stats_map[exports.NULL] = [Stat.VOID(1)];
    exports.stats_map[exports.TECHNOLOGY] = [Stat.LIGHT(1)];
    exports.stats_map[exports.ART] = [Stat.SPACE(1)];
    exports.stats_map[exports.TIME] = [Stat.TIME(1)];
    exports.stats_map[exports.SPACE] = [Stat.SPACE(1)];
    exports.stats_map[exports.STEALING] = [Stat.LIGHT(1)];
    exports.stats_map[exports.FREEDOM] = [Stat.BREATH(1)];
    exports.stats_map[exports.FIRE] = [Stat.DOOM(1)];
    exports.stats_map[exports.LONELY] = [Stat.BREATH(1)];
    exports.stats_map[exports.OCEAN] = [Stat.BREATH(1)];
    exports.stats_map[exports.BURIED] = [Stat.DOOM(1)];
    exports.stats_map[exports.FLESH] = [Stat.BLOOD(1)];
    exports.stats_map[exports.SCIENCE] = [Stat.LIGHT(1)];
    exports.stats_map[exports.MATH] = [Stat.DOOM(1)];
    exports.stats_map[exports.TWISTING] = [Stat.RAGE(1)];
    exports.stats_map[exports.DEATH] = [Stat.DOOM(1)];
    exports.stats_map[exports.APOCALYPSE] = [Stat.DOOM(1)];
    exports.stats_map[exports.SERVICE] = [Stat.HEART(1)];
    exports.stats_map[exports.FAMILY] = [Stat.LIFE(1)];
    exports.stats_map[exports.MAGIC] = [Stat.HOPE(1)];
    exports.stats_map[exports.HUNTING] = [Stat.MIND(1)];
    exports.stats_map[exports.HEALING] = [Stat.LIFE(1)];
    exports.stats_map[exports.PLANTS] = [Stat.LIFE(1)];
    exports.stats_map[exports.DECAY] = [Stat.DOOM(1)];
    exports.stats_map[exports.CHOICES] = [Stat.MIND(1)];
    exports.stats_map[exports.ZAP] = [Stat.MIND(1)];
    exports.stats_map[exports.LOVE] = [Stat.HEART(1)];
    exports.stats_map[exports.SOUL] = [Stat.HEART(1)];
    exports.stats_map[exports.ANGER] = [Stat.RAGE(1)];
    exports.stats_map[exports.WEB] = [Stat.DOOM(1)];
    exports.stats_map[exports.ROYALTY] = [Stat.HOPE(1)];
    exports.stats_map[exports.ENDINGS] = [Stat.TIME(1)];
    exports.stats_map[exports.KNOWING] = [Stat.LIGHT(1)];
    exports.stats_map[exports.GUIDING] = [Stat.LIGHT(1)];
    exports.stats_map[exports.CRAFTING] = [Stat.SPACE(1)];
    exports.stats_map[exports.LANGUAGE] = [Stat.LIGHT(1)];
    exports.stats_map[exports.BUGS] = [Stat.LIFE(1)];
    exports.stats_map[exports.ADDICTION] = [Stat.HEART(1)];
    exports.stats_map[exports.SPYING] = [Stat.LIGHT(1)];
    exports.stats_map[exports.CLOWNS] = [Stat.RAGE(1)];
    exports.stats_map[exports.DOLLS] = [Stat.HEART(1)];
    exports.stats_map[exports.OBFUSCATION] = [Stat.VOID(1)];
    exports.stats_map[exports.DARKNESS] = [Stat.VOID(1)];
    exports.stats_map[exports.KILLING] = [Stat.RAGE(1)];
    exports.stats_map[exports.MUSIC] = [Stat.HOPE(1)];
    exports.stats_map[exports.DEFENSE] = [Stat.HOPE(1)];
    exports.stats_map[exports.QUESTING] = [Stat.HOPE(1)];
    exports.stats_map[exports.ANGELS] = [Stat.HOPE(1)];
    exports.stats_map[exports.LIGHT] = [Stat.LIGHT(1)];
    exports.stats_map[exports.WASTE] = [Stat.WASTE(100)];
};
const initPeople = () => {
    exports.person_posibilities[exports.ART] = ["artist", "painter", "sculpter", "curator"];
    exports.person_posibilities[exports.TECHNOLOGY] = ["engineer", "programmer", "hacker", "coder"];
    exports.person_posibilities[exports.SPACE] = ["astronaut", "climber", "mountaineer", "alpinist", "diver", "skydiver"];
    exports.person_posibilities[exports.TIME] = ["conductor", "clockmaker", "drummer", "robot"];
    exports.person_posibilities[exports.STEALING] = ["thief", "burglar", "robber", "mugger", "pick-pocket", "kleptomaniac"];
    exports.person_posibilities[exports.FREEDOM] = ["explorer", "pirate", "pixie", "fairy", "sylph", "traveler"];
    exports.person_posibilities[exports.FIRE] = ["fireman", "pyromaniac", "arsonist", "firebug"];
    exports.person_posibilities[exports.LONELY] = ["widow", "hermit", "dowager"];
    exports.person_posibilities[exports.OCEAN] = ["sailor", "seaman", "mariner", "boatman"];
    exports.person_posibilities[exports.FLESH] = ["butcher", "plastic surgeon", "slaughter man", "meat seller", "farmer"];
    exports.person_posibilities[exports.BURIED] = ["gravedigger", "miner", "loan shark", "digger"];
    exports.person_posibilities[exports.SCIENCE] = ["scientist", "biologist", "chemist", "physicist"];
    exports.person_posibilities[exports.MATH] = ["mathematician", "algebraist ", "math teacher", "engineer"];
    exports.person_posibilities[exports.TWISTING] = ["therapist", "minotaur", "devil", "liar", "madman"];
    exports.person_posibilities[exports.DEATH] = ["reaper", "psychopomp", "shinigami", "grave-digger", "undertaker", "thanatologist", "embalmer"];
    exports.person_posibilities[exports.APOCALYPSE] = ["horseman", "rider", "messiahs", "heisenberg"];
    exports.person_posibilities[exports.SERVICE] = ["butler", "maid", "lackey", "minion", "attendant", "cleaner"];
    exports.person_posibilities[exports.ANGELS] = ["angel", "feather", "guardian", "cherub", "arch-angel", "messenger", "spirit", "blessing"];
    exports.person_posibilities[exports.LIGHT] = ["lamplighter"];
    exports.person_posibilities[exports.FAMILY] = ["ancestor", "father", "mother", "brother", "sister", "aunt", "uncle", "cousin", "family"];
    exports.person_posibilities[exports.MAGIC] = ["wizard", "mage", "sorcerer", "alchemist", "sage"];
    exports.person_posibilities[exports.HUNTING] = ["hunter", "stalker", "predator", "pursuer"];
    exports.person_posibilities[exports.HEALING] = ["doctor", "nurse", "healer"];
    exports.person_posibilities[exports.PLANTS] = ["gardener", "druid"];
    exports.person_posibilities[exports.DECAY] = ["gravedigger", "plague bearer"];
    exports.person_posibilities[exports.CHOICES] = ["selector"];
    exports.person_posibilities[exports.ZAP] = ["electrician", "robot"];
    exports.person_posibilities[exports.LOVE] = ["lover", "romantic"];
    exports.person_posibilities[exports.SOUL] = ["self"];
    exports.person_posibilities[exports.ANGER] = ["beserker", "rebel", "hater"];
    exports.person_posibilities[exports.WEB] = ["spider", "weaver", "spider", "puppet"];
    exports.person_posibilities[exports.ROYALTY] = ["king", "queen", "lord"];
    exports.person_posibilities[exports.ENDINGS] = ["prince"];
    exports.person_posibilities[exports.KNOWING] = ["scholar", "sage", "proffessor"];
    exports.person_posibilities[exports.GUIDING] = ["guru", "sage", "mentor", "guide", "sherpa"];
    exports.person_posibilities[exports.CRAFTING] = ["logger", "miner", "craftsman", "blacksmith", "smith", "seamstress"];
    exports.person_posibilities[exports.LANGUAGE] = ["author", "writer"];
    exports.person_posibilities[exports.BUGS] = ["bug", "worm", "fly", "maggot", "roach", "swarm", "hive", "locusts", "entomologist"];
    exports.person_posibilities[exports.ADDICTION] = ["gambler", "dealer", "stoner"];
    exports.person_posibilities[exports.SPYING] = ["eye", "watcher", "observer", "listener", "spy"];
    exports.person_posibilities[exports.CLOWNS] = ["clown", "mime", "jester", "acrobat", "performer", "harlequin", "ringmaster"];
    exports.person_posibilities[exports.DOLLS] = ["doll", "mannequin", "dressform", "statue", "dummy", "puppet", "marionette", "figure", "figurine", "toy"];
    exports.person_posibilities[exports.OBFUSCATION] = ["hider", "ninja", "censor", "disguise artist"];
    exports.person_posibilities[exports.DARKNESS] = ["edgelord", "ninja", "watchman", "nightclerk"];
    exports.person_posibilities[exports.KILLING] = ["murderer", "assassin", "killer", "soldier"];
    exports.person_posibilities[exports.MUSIC] = ["singer", "dancer", "choir", "bard", "musician", "drummer"];
    exports.person_posibilities[exports.DEFENSE] = ["knight", "paladin", "defender", "protector", "page", "soldier", "warrior"];
    exports.person_posibilities[exports.QUESTING] = ["seeker", "adventurer", "pilgrim"];
};
const initAdjs = () => {
    exports.adj_possibilities[exports.ART] = ["artistic", "aesthetic", "beautiful", "moving", "balanced"];
    exports.adj_possibilities[exports.TECHNOLOGY] = ["technological", "advanced", "smart", "programmatic", "procedural"];
    exports.adj_possibilities[exports.TIME] = ["timely", "measured", "punctual", "clock-work", "steady", "ticking", "beating"];
    exports.adj_possibilities[exports.SPACE] = ["celestial", "otherworldly", "vast", "big", "open", "expansive", "boundless", "immeasurable", "infinite", "limitless", "enormous", "gigantic", "giant", "cosmic", "falling"];
    exports.adj_possibilities[exports.STEALING] = ["stolen", "taken", "yoinked", "missing", "kleptomania", "expensive"];
    exports.adj_possibilities[exports.FREEDOM] = ["free", "unchained", "unbound", "moving", "flying"];
    exports.adj_possibilities[exports.FIRE] = ["flaming", "blazing", "burning", "ashen", "burnt"];
    exports.adj_possibilities[exports.LONELY] = ["lonely", "isolated", "friendless", "forsaken", "sad"];
    exports.adj_possibilities[exports.OCEAN] = ["marine", "foggy", "misty", "cold", "wet", "damp", "chilly", "crying", "weeping"];
    exports.adj_possibilities[exports.FLESH] = ["meaty", "moist", "bloody", "physical", "muscular", "bony", "skinned"];
    exports.adj_possibilities[exports.BURIED] = ["buried", "choked", "covered", "underground", "underneath", "trapped", "compressed", "squeezed"];
    exports.adj_possibilities[exports.SCIENCE] = ["scientific", "callibrated", "measured", "experimental", "hypothetical"];
    exports.adj_possibilities[exports.MATH] = ["algebraic", "mathematical", "geometric", "numeric"];
    exports.adj_possibilities[exports.TWISTING] = ["twisted", "mad", "convoluted", "confusing", "lying", "deceitful", "spiralling", "wrong", "skewed"];
    exports.adj_possibilities[exports.DEATH] = ["deadly", "fatal", "necrotic", "dead"];
    exports.adj_possibilities[exports.APOCALYPSE] = ["apocalyptic", "doomed", "doomsday", "extinct", "threatened"];
    exports.adj_possibilities[exports.SERVICE] = ["service", "serving", "helping", "obedient", "humble", "menial", "servants"];
    exports.adj_possibilities[exports.ANGELS] = ["angelic", "feathery", "holy", "blessed"];
    exports.adj_possibilities[exports.MAGIC] = ["magical", "occult", "enchanted", "glamorous"];
    exports.adj_possibilities[exports.FAMILY] = ["father's", "mothers's", "brother's", "sister's", "aunt's", "uncle's", "family's", "familial", "ancestral", "hereditary"];
    exports.adj_possibilities[exports.LIGHT] = ["glowing", "bright", "shining", "radiating", "illuminating", "gleaming", "flickering", "lusterous"];
    exports.adj_possibilities[exports.HEALING] = ["curative", "medical", "healing", "curing", "medicinal", "restoring", "fixing", "mending", "regenerating"];
    exports.adj_possibilities[exports.PLANTS] = ["growing", "sprouting", "blossoming"];
    exports.adj_possibilities[exports.HUNTING] = ["hunting", "chasing", "following", "stalking"];
    exports.adj_possibilities[exports.DECAY] = ["decaying", "rotting", "crumbling", "decomposing", "festering", "languishing", "corrupting", "gross", "itchy", "sick", "ill", "inflamed", "scabbing"];
    exports.adj_possibilities[exports.CHOICES] = ["choosing", "branching", "selecting"];
    exports.adj_possibilities[exports.ZAP] = ["zapping", "jolting", "shocking", "electrical"];
    exports.adj_possibilities[exports.LOVE] = ["loving", "caring", "embracing", "smitten"];
    exports.adj_possibilities[exports.SOUL] = ["defining", "delineating", "pure"];
    exports.adj_possibilities[exports.ANGER] = ["raging", "hating", "rebelling", "glaring", "stampeding", "furious"];
    exports.adj_possibilities[exports.WEB] = ["controlling", "puppeting", "trapping", "gossamer", "ineluctable", "webbed", "arachnid", "doomed"];
    exports.adj_possibilities[exports.ROYALTY] = ["ruling", "mandating", "decreeing", "royal", "commanding", "gold"];
    exports.adj_possibilities[exports.ENDINGS] = ["ending", "final", "ultimate", "exhausted"];
    exports.adj_possibilities[exports.KNOWING] = ["knowing", "understanding", "learning"];
    exports.adj_possibilities[exports.GUIDING] = ["guiding", "showing", "explaining"];
    exports.adj_possibilities[exports.CRAFTING] = ["crafting", "mining", "logging", "building", "constructing", "carving", "smitting"];
    exports.adj_possibilities[exports.LANGUAGE] = ["reading", "writing", "speaking"];
    exports.adj_possibilities[exports.BUGS] = ["swarming", "buzzing", "squirming"];
    exports.adj_possibilities[exports.ADDICTION] = ["craving", "addicting", "compelling", "high"];
    exports.adj_possibilities[exports.SPYING] = ["spying", "observing", "watching", "voyeuristic", "seeking"];
    exports.adj_possibilities[exports.CLOWNS] = ["honking", "funny", "prancing", "tumbling", "joking", "jeering", "dancing", "performing", "jesting"];
    exports.adj_possibilities[exports.DOLLS] = ["delicate", "beautiful", "unsettling", "playing", "dressing", "plastic", "ceramic"];
    exports.adj_possibilities[exports.OBFUSCATION] = ["hiding", "hidden", "obscured", "confusing", "blinding", "secret", "unknowable", "censored"];
    exports.adj_possibilities[exports.DARKNESS] = ["darkened", "blackened", "midnight", "blinding"];
    exports.adj_possibilities[exports.KILLING] = ["killing", "murderous", "massacred", "bloody", "savage", "blood-stained", "gory", "brutal"];
    exports.adj_possibilities[exports.MUSIC] = ["singing", "dancing", "playing"];
    exports.adj_possibilities[exports.DEFENSE] = ["defending", "gallant", "protecting"];
    exports.adj_possibilities[exports.QUESTING] = ["questing", "searching", "exploring", "seeking", "hopeful", "faithful"];
};
const initSongs = () => {
    exports.song_possibilities[exports.TWISTING] = ["no_gods_no_master.mp3", "good_luck_w_your_ears_honestly.mp3"];
    exports.song_possibilities[exports.ANGELS] = ["watt_3_but_jr_owns_it.mp3", "get_it_because_pipe_organ.mp3"];
    exports.song_possibilities[exports.LONELY] = ["Finish.mp3"];
    exports.song_possibilities[exports.DARKNESS] = ["turntablist.mp3"];
    exports.song_possibilities[exports.DECAY] = ["dear_god.mp3"];
    exports.song_possibilities[exports.TECHNOLOGY] = ["i_think_its_finished_priska_turbo_time.mp3"];
    exports.song_possibilities[exports.MUSIC] = ["riku_completed_i_think_idefk_anymore.mp3"];
};
const initFilters = () => {
    exports.filter_possibilities[exports.TWISTING] = [`hue-rotate(10deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(-5deg)`]; //subtle
    exports.filter_possibilities[exports.CLOWNS] = [`invert(100%)`, `hue-rotate(190deg)`, `hue-rotate(90deg)`]; //whimsy
    exports.filter_possibilities[exports.LIGHT] = [`brightness(300%)`, `contrast(60%)`, `filter: brightness(300%)`, `brightness(200%)`]; //the futures so bright you need to wear shades
    exports.filter_possibilities[exports.ANGER] = [`grayscale(100%) sepia(100%) contrast(454%) saturate(651%) brightness(44%) hue-rotate(681deg) blur(1px)`]; // tint it red
    exports.filter_possibilities[exports.TIME] = [`sepia(50%);`, `sepia(75%);`, `sepia(100%);`]; //we all know the past is brown
    exports.filter_possibilities[exports.APOCALYPSE] = [`brightness(300%)`, `contrast(60%)`, `filter: brightness(300%)`, `brightness(200%)`]; //the futures so bright you need to wear shades
    exports.filter_possibilities[exports.FLESH] = [`grayscale(70%) sepia(100%) contrast(100%) saturate(157%) hue-rotate(310deg)`]; // tint it pink
    exports.filter_possibilities[exports.OCEAN] = [`grayscale(70%) sepia(100%) contrast(100%) saturate(157%) hue-rotate(178deg)`]; // tint it blue
    exports.filter_possibilities[exports.OBFUSCATION] = [`blur(5)`];
    exports.filter_possibilities[exports.SPYING] = [`contrast(200%)`];
    exports.filter_possibilities[exports.LONELY] = [`contrast(70%)`, 'saturate(30%)', 'grayscale(70%)', 'contrast(50%)', 'grayscale(90%)'];
    exports.filter_possibilities[exports.DARKNESS] = [`brightness(60%)`];
};
const initFloorPossibilities = () => {
    exports.floor_possibilities[exports.LOVE] = ["carpetfloor.png", "fancywoodfloor.png"];
    exports.floor_possibilities[exports.DECAY] = ["geometricfloor.png", "brickfloor3.png", "stonefloor.png"];
    exports.floor_possibilities[exports.BUGS] = ["dirtfloor.png", "dirtfloor.png", "dirtfloor.png"];
    exports.floor_possibilities[exports.TWISTING] = ["yellowwallpaper.jpg", "spiral.png", "static.png"];
    exports.floor_possibilities[exports.BURIED] = ["dirtfloor.png"];
    exports.floor_possibilities[exports.OCEAN] = ["waterfloor2.png", "waterfloor.png", "waterfloor3.png"];
    exports.floor_possibilities[exports.DARKNESS] = ["voidfloor.png"];
    exports.floor_possibilities[exports.ZAP] = ["gratefloor.png", "metaltilefloor.png", "metalfloor2.png", "metalfloor.png", "metalboardfloor.png"];
    exports.floor_possibilities[exports.TECHNOLOGY] = ["stars.png", "gratefloor.png", "metaltilefloor.png", "metalfloor2.png", "metalfloor.png", "metalboardfloor.png"];
    exports.floor_possibilities[exports.SCIENCE] = ["gratefloor.png", "metaltilefloor.png", "metalfloor2.png", "metalfloor.png", "metalboardfloor.png"];
    exports.floor_possibilities[exports.PLANTS] = ["grassfloor.png", "dirtfloor.png", "vines.png"];
    exports.floor_possibilities[exports.HUNTING] = ["grassfloor.png", "dirtfloor.png"];
    exports.floor_possibilities[exports.GUIDING] = ["grassfloor.png", "dirtfloor.png", "icefloor.png", "glassfloor.png", "stonefloor.png"];
    exports.floor_possibilities[exports.LIGHT] = ["lightfloor.png"];
    exports.floor_possibilities[exports.FIRE] = ["lavafloor.png", "firefloor.png"];
    exports.floor_possibilities[exports.ENDINGS] = ["curtains.png"];
    exports.floor_possibilities[exports.OBFUSCATION] = ["static.png", "voidfloor.png", "weirdfloor.png"];
    exports.floor_possibilities[exports.STEALING] = ["goldwalls.png"];
    exports.floor_possibilities[exports.MAGIC] = ["arcanefloor2.png", "arcanefloor.png"];
    exports.floor_possibilities[exports.ROYALTY] = ["goldwalls.png"];
    exports.floor_possibilities[exports.SPACE] = ["stars.png", "clouds.png"];
    exports.floor_possibilities[exports.FREEDOM] = ["clouds.png"];
    exports.floor_possibilities[exports.WEB] = ["web.png"];
    exports.floor_possibilities[exports.HEALING] = ["tilefloor.png"];
    exports.floor_possibilities[exports.ADDICTION] = ["carpetfloor.png"];
    exports.floor_possibilities[exports.LONELY] = ["snow.png"];
    exports.floor_possibilities[exports.FLESH] = ["flesh.png", "flesh2.png", "flesh3.png"];
    exports.floor_possibilities[exports.APOCALYPSE] = ["dirtfloor.png"];
    /*floor_possibilities[ART] =  ["Perfect Moment"];
    floor_possibilities[TIME] =  ["Stopped Clock"];

    floor_possibilities[MATH] =  ["Calculus Pop Quiz"];
    floor_possibilities[DEATH] =  ["Your Grave"];
    floor_possibilities[APOCALYPSE] =  ["Ragnarok"];
    floor_possibilities[ANGELS] =  ["Judgement Day"];
    floor_possibilities[SERVICE] =  ["Special Service"];
    floor_possibilities[FAMILY] =  ["Sins of the Father"];

    floor_possibilities[CHOICES] =  ["Timeline of Theseus"] ;
    floor_possibilities[SOUL] = ["Know thyself."] ;
    floor_possibilities[ANGER] = ["Dethrone Creation"] ;
    floor_possibilities[CRAFTING] =  ["Legendary Forge"];
    floor_possibilities[SPYING] =["Surveillance State"] ;
    floor_possibilities[CLOWNS] =["Ringmaster"] ;
    floor_possibilities[DOLLS] = ["Automatonophobia "] ;
    floor_possibilities[KILLING] =  ["Bloodbath"];
    floor_possibilities[MUSIC] =  ["Symphonic Synthesia"] ;
    floor_possibilities[DEFENSE] =  ["Excalibur"] ;
    floor_possibilities[QUESTING] = ["Satisfaction"] ;*/
};
const initWallForegrounds = () => {
    exports.wall_foregrounds[exports.DECAY] = [{ src: "deadvines.png", desc: "TODO" }, { src: "rotted_curtains1.png", desc: "TODO" }, { src: "rotted_curtains2.png", desc: "TODO" }, { src: "rotted_curtains3.png", desc: "TODO" }, { src: "decayingwindow.png", desc: "TODO" }];
    exports.wall_foregrounds[exports.BUGS] = [{ src: "waspnest2.png", desc: "TODO" }, { src: "bees4.png", desc: "TODO" }, { src: "bees.png", desc: "TODO" }, { src: "bees3.png", desc: "TODO" }, { src: "bees2.png", desc: "TODO" }, { src: "waspnest.png", desc: "TODO" }];
    exports.wall_foregrounds[exports.WEB] = [{ src: "Web_Object.png", desc: "Ah... An uh... Friend..." }, { src: "webcurtains2.png", desc: "TODO" }, { src: "webcurtains.png", desc: "TODO" }, { src: "webbing5.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing2.png", desc: "TODO" }, { src: "webbing.png", desc: "TODO" }];
    exports.wall_foregrounds[exports.KILLING] = [{ src: "drippingblood.png", desc: "TODO" }];
    exports.wall_foregrounds[exports.SPYING] = [{ src: "eye13.png", desc: "IT LOOKS." }, { src: "eye12.png", desc: "IT TREMBLES." }, { src: "eye11.png", desc: "IT GAZES." }, { src: "eye10.png", desc: "IT FOCUSES." }, { src: "eye9.png", desc: "IT WAITS." }, { src: "eye8.png", desc: "IT WATCHES." }, { src: "eye7.png", desc: "IT GLISTENS." }, { src: "eye6.png", desc: "IT SEES." }, { src: "eye5.png", desc: "IT CANNOT BLINK." }, { src: "eye4.png", desc: "IT CRIES." }, { src: "eye3.png", desc: "IT SEES." }, { src: "eye2.png", desc: "IT STARES." }, { src: "eye1.png", desc: "IT WEEPS." }];
    exports.wall_foregrounds[exports.LONELY] = [{ src: "lonely_figure.png", desc: "Alone..." }];
    /*wall_possibilities[LOVE] = ["stonewalls.png","roses.png"];
    wall_foregrounds[BUGS] =  ["dirtwall.png","darkcorruption.png"];
    wall_foregrounds[TWISTING] =  ["spiral.png"];
    wall_foregrounds[ENDINGS] =  ["curtains.png"] ;
    wall_foregrounds[LANGUAGE] = ["books.png"];
    wall_foregrounds[KNOWING] = ["blackboard.png","books.png"];;
    wall_foregrounds[STEALING] =  ["jail.png","goldwalls.png"];
    wall_foregrounds[MATH] =  ["blackboard.png"];
    wall_foregrounds[BURIED] =  ["dirtwall.png"];
    wall_foregrounds[SPACE] = ["stars.png","clouds.png"];
    wall_foregrounds[OCEAN] =  ["waterwall.png"];
    wall_foregrounds[CLOWNS] =["curtains.png"] ;
    wall_foregrounds[HEALING] =  ["tilewall.png"];
    wall_foregrounds[FREEDOM] =  ["clouds.png"];
    wall_foregrounds[FIRE] =  ["lavawall.png"];
    wall_foregrounds[LIGHT] =  ["lightwall.png"];
    wall_foregrounds[ZAP] = ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    wall_foregrounds[TECHNOLOGY] =  ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    wall_foregrounds[SCIENCE] = ["metalwall1.png","metalwall2.png","metalwall3.png"]
    wall_foregrounds[PLANTS] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    wall_foregrounds[HUNTING] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    wall_foregrounds[GUIDING] = ["pinetrees.png"] ;
    wall_foregrounds[ART] =  ["Perfect Moment"];
    wall_foregrounds[TIME] =  ["Stopped Clock"];


    wall_foregrounds[FLESH] =  ["Physical God"];
    wall_foregrounds[DEATH] =  ["Your Grave"];
    wall_foregrounds[APOCALYPSE] =  ["Ragnarok"];
    wall_foregrounds[ANGELS] =  ["Judgement Day"];
    wall_foregrounds[SERVICE] =  ["Special Service"];
    wall_foregrounds[FAMILY] =  ["Sins of the Father"];
    wall_foregrounds[MAGIC] =  ["Ritual of Ragnarok"];
    wall_foregrounds[CHOICES] =  ["Timeline of Theseus"] ;
    wall_foregrounds[SOUL] = ["Know thyself."] ;
    wall_foregrounds[ANGER] = ["Dethrone Creation"] ;
    wall_foregrounds[ROYALTY] =  ["Excalibur"] ;
    wall_foregrounds[GUIDING] = ["Path To Victory"] ;
    wall_foregrounds[CRAFTING] =  ["Legendary Forge"];
    wall_foregrounds[ADDICTION] = ["Dealer's Delight"];
    wall_foregrounds[SPYING] =["Surveillance State"] ;
    wall_foregrounds[DOLLS] = ["Automatonophobia "] ;
    wall_foregrounds[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    wall_foregrounds[DARKNESS] =  ["Night Eternal"] ;
    wall_foregrounds[MUSIC] =  ["Symphonic Synthesia"] ;
    wall_foregrounds[DEFENSE] =  ["Excalibur"] ;
    wall_foregrounds[QUESTING] = ["Satisfaction"] ;*/
};
//no one said quotidians are locked into only mimicking HUMANS, just sapient things. 
const initSpritePossibilities = () => {
    //sprite_possibilities[TWISTING] =  [{left_src:"",right_src:"",up_src:"",down_src:""}];
    exports.sprite_possibilities[exports.APOCALYPSE] = [{ left_src: "Apocalypse_Crow2.gif", right_src: "Apocalypse_Crow.gif", up_src: "Apocalypse_Crow2.gif", down_src: "Apocalypse_Crow.gif" }];
    exports.sprite_possibilities[exports.DOLLS] = [{ left_src: "Art_Object_ghoul.gif", right_src: "Art_Object_ghoul.gif", up_src: "Art_Object_ghoul.gif", down_src: "Art_Object_ghoul.gif" }];
    exports.sprite_possibilities[exports.ART] = [{ left_src: "Art_Object_ghoul.gif", right_src: "Art_Object_ghoul.gif", up_src: "Art_Object_ghoul.gif", down_src: "Art_Object_ghoul.gif" }];
    exports.sprite_possibilities[exports.TIME] = [{ left_src: "clockface_walk_left.gif", right_src: "clockface_walk_right.gif", up_src: "clockface_walk_up.gif", down_src: "clockface_walk_down.gif" }];
    exports.sprite_possibilities[exports.PLANTS] = [{ left_src: "flowerkid_walk_left.gif", right_src: "flowerkid_walk_right.gif", up_src: "flowerkid_walk_up.gif", down_src: "flowerkid_walk_down.gif" }];
    //probably too big but *shrug* hunteres are swol, this is now canon (thems the break eye killer)(tho i suppose this is just a single instance of a hunter, so maybe its not universal)
    exports.sprite_possibilities[exports.HUNTING] = [{ left_src: "hunter_walk_left.gif", right_src: "hunter_walk_right.gif", up_src: "hunter_walk_up.gif", down_src: "hunter_walk_down.gif" }];
    exports.sprite_possibilities[exports.SPACE] = [{ left_src: "Space_object_ghoul.gif", right_src: "Space_object_ghoul.gif", up_src: "Space_object_ghoul.gif", down_src: "Space_object_ghoul.gif" }];
    exports.sprite_possibilities[exports.TECHNOLOGY] = [{ left_src: "technology_object_ghoul.gif", right_src: "technology_object_ghoul.gif", up_src: "technology_object_ghoul.gif", down_src: "technology_object_ghoul.gif" }];
    exports.sprite_possibilities[exports.TWISTING] = [{ left_src: "unknown.png", right_src: "unknown.png", up_src: "unknown.png", down_src: "unknown.png" }, { left_src: "zampanio_flowerkid_by_hex2.png", right_src: "zampanio_flowerkid_by_hex2.png", up_src: "zampanio_flowerkid_by_hex2.png", down_src: "zampanio_flowerkid_by_hex2.png" }, { left_src: "unknown.png", right_src: "zampanio_flowerkid_by_hex2.png", up_src: "Twisting_Crow.gif", down_src: "humanoid_crow.gif" }, { left_src: "Twisting_Crow.gif", right_src: "Twisting_Crow.gif", up_src: "Twisting_Crow.gif", down_src: "Twisting_Crow.gif" }];
    exports.sprite_possibilities[exports.OCEAN] = [{ left_src: "plushie_shark_swimmin.gif", right_src: "plushie_shark_swimmin.gif", up_src: "plushie_shark_swimmin.gif", down_src: "plushie_shark_swimmin.gif" }];
};
//don't bothere filling out descs for these yet
const initWallBackgrounds = () => {
    exports.wall_backgrounds[exports.DECAY] = [{ src: "wallhole.png", desc: "TODO" }, { src: "wallholebig.png", desc: "TODO" }, { src: "wallcrack.png", desc: "TODO" }, { src: "decayingwall.png", desc: "TODO" }];
    exports.wall_backgrounds[exports.BUGS] = [{ src: "bees4.png", desc: "TODO" }, { src: "bees.png", desc: "TODO" }, { src: "bees3.png", desc: "TODO" }, { src: "bees2.png", desc: "TODO" }];
    exports.wall_backgrounds[exports.WEB] = [{ src: "webpainting3.png", desc: "TODO" }, { src: "webpainting2.png", desc: "TODO" }, { src: "webpainting.png", desc: "TODO" }, { src: "webmirror.png", desc: "TODO" }, { src: "webclock.png", desc: "TODO" }];
    exports.wall_backgrounds[exports.KILLING] = [{ src: "bloodywall.png", desc: "TODO" }];
    exports.wall_backgrounds[exports.KNOWING] = [{ src: "lockers.png", desc: "TODO" }];
    /*
    wall_backgrounds[LOVE] = ["stonewalls.png","roses.png"];
    wall_backgrounds[TWISTING] =  ["spiral.png"];
    wall_backgrounds[ENDINGS] =  ["curtains.png"] ;
    wall_backgrounds[LANGUAGE] = ["books.png"];
    wall_backgrounds[KNOWING] = ["blackboard.png","books.png"];;
    wall_backgrounds[STEALING] =  ["jail.png","goldwalls.png"];
    wall_backgrounds[MATH] =  ["blackboard.png"];
    wall_backgrounds[BURIED] =  ["dirtwall.png"];
    wall_backgrounds[SPACE] = ["stars.png","clouds.png"];
    wall_backgrounds[OCEAN] =  ["waterwall.png"];
    wall_backgrounds[CLOWNS] =["curtains.png"] ;
    wall_backgrounds[WEB] =  ["web.png"] ;
    wall_backgrounds[HEALING] =  ["tilewall.png"];
    wall_backgrounds[FREEDOM] =  ["clouds.png"];
    wall_backgrounds[FIRE] =  ["lavawall.png"];
    wall_backgrounds[LIGHT] =  ["lightwall.png"];
    wall_backgrounds[ZAP] = ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    wall_backgrounds[TECHNOLOGY] =  ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    wall_backgrounds[SCIENCE] = ["metalwall1.png","metalwall2.png","metalwall3.png"]
    wall_backgrounds[PLANTS] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    wall_backgrounds[HUNTING] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    wall_backgrounds[GUIDING] = ["pinetrees.png"] ;
    wall_backgrounds[ART] =  ["Perfect Moment"];
    wall_backgrounds[TIME] =  ["Stopped Clock"];


    wall_backgrounds[FLESH] =  ["Physical God"];
    wall_backgrounds[DEATH] =  ["Your Grave"];
    wall_backgrounds[APOCALYPSE] =  ["Ragnarok"];
    wall_backgrounds[ANGELS] =  ["Judgement Day"];
    wall_backgrounds[SERVICE] =  ["Special Service"];
    wall_backgrounds[FAMILY] =  ["Sins of the Father"];
    wall_backgrounds[MAGIC] =  ["Ritual of Ragnarok"];
    wall_backgrounds[CHOICES] =  ["Timeline of Theseus"] ;
    wall_backgrounds[SOUL] = ["Know thyself."] ;
    wall_backgrounds[ANGER] = ["Dethrone Creation"] ;
    wall_backgrounds[ROYALTY] =  ["Excalibur"] ;
    wall_backgrounds[GUIDING] = ["Path To Victory"] ;
    wall_backgrounds[CRAFTING] =  ["Legendary Forge"];
    wall_backgrounds[ADDICTION] = ["Dealer's Delight"];
    wall_backgrounds[SPYING] =["Surveillance State"] ;
    wall_backgrounds[DOLLS] = ["Automatonophobia "] ;
    wall_backgrounds[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    wall_backgrounds[DARKNESS] =  ["Night Eternal"] ;
    wall_backgrounds[MUSIC] =  ["Symphonic Synthesia"] ;
    wall_backgrounds[DEFENSE] =  ["Excalibur"] ;
    wall_backgrounds[QUESTING] = ["Satisfaction"] ;*/
};
const initFloorForegrounds = () => {
    exports.floor_foregrounds[exports.DECAY] = [{ name: "Hydration Station", src: "hydration_station.png", desc: "You go to take a sip of the water before realizing it's filled with maggots." }, { src: "Decay_Object.png", desc: "I wonder if they're poisonous?" }, { name: "Corpse Blossom", src: "corpse_blossom.png", desc: "It stinks of death and decay." }, { name: "Rotten Shelves", src: "webshelves.png", desc: "These shelves haven't been able to hold anything for a long time." }, { name: "Rotten Table", src: "webtable.png", desc: "What could be trapped in here, you wonder?" }, { name: "Rotten Table", src: "webtable2.png", desc: "You peer into its cracks but see nothing inside." }, { name: "Dead Bush", src: "deadbush.png", desc: "The bush is rotting." }, { name: "Dead Tree", src: "deadtree.png", desc: "What did this look like when it was alive, you wonder." }, { name: "Mushrooms", src: "decay_is_an_extant_form_of_life.png", desc: "In your heart you know decay is an extant form of life." }, { name: "Rotten Box", src: "decayedwebbox.png", desc: "This rotten box can't be used to hold anything anymore." }, { name: "Rotten Barrel", src: "decayingbarrel.png", desc: "The barrel stinks of fermentation and rot." }, { name: "Grave", src: "grave.png", desc: "You wonder who is buried and rotting here." }, { name: "Stinking Cot", src: "shittycot.png", desc: "The cot stinks of rot." }];
    exports.floor_foregrounds[exports.BUGS] = [{ name: "Wasp Nest", src: "waspnest2.png", desc: "There is a wasp nest here." }, { name: "Bees", src: "bees4.png", desc: "The bees are buzzing and crawling and flying everwhere." }, { name: "Swarm", src: "bees.png", desc: "The Swarm is judging you." }, { name: "Swarm", src: "bees3.png", desc: "Incessent buzzing." }, { name: "Swarm", src: "bees2.png", desc: "You skin crawls just looking at these buzzing insects." }, { name: "Wasp Nest", src: "waspnest1.png", desc: "There is a wasp nest here. It is filled with holes." }, { name: "Wasp Nest", src: "waspnest3.png", desc: "If you let the inhabitants of this waspnest love you, you could be a nest, too." }, { name: "Honey", src: "ruined_honey.png", desc: "Someone has already raided this bee hive." }, { name: "Nest", src: "ruined_wasp_nest.png", desc: "Who destroyed this wasp nest?" }, { name: "Wasp Statue", src: "wasp.png", desc: "It seems to be a large statue of a wasp." }];
    exports.floor_foregrounds[exports.LOVE] = [{ src: "Love_Object.png", desc: "Fragile Concept." }, { name: "Wine", src: "wine2.png", desc: "If only there was someone to share this with." }, { name: "Wine", src: "wine.png", desc: "Oh to be on a picnic with someone you love." }, { name: "Necklace", src: "necklace.png", desc: "Someone beautiful could wear this." }, { name: "Gift Box", src: "jwelerybox.png", desc: "A cherished gift." }, { name: "Flowers", src: "flowers.png", desc: "A gift for a significant other." }, { name: "Dress", src: "dress.png", desc: "Just looking at this pretty dress makes you wish you could remember going to dances." }, { name: "Angel Statue", src: "angelstatue.png", desc: "Love is war." }, { name: "Stuffed Bear", src: "bear.png", desc: "It feels soft and cuddly." },];
    exports.floor_foregrounds[exports.STEALING] = [{ src: "Stealing_Object.png", desc: "[Right Click, Save Image]" }, { name: "Cooking Pot", src: "cookingpot.png", desc: "Reminds you of being on the run from the law." }, { name: "Treasure Chest", src: "fancychest.png", desc: "You wonder what kind of loot is in here." }, { name: "Gold Ingots", src: "goldingots.png", desc: "There is NO way you're going to be able to carry these out of here." }, { name: "Jewel Box", src: "jwelerybox.png", desc: "A tidy fortune in jewels." }, { name: "Necklace", src: "necklace.png", desc: "You wonder how much this would be worth on the blackmarket." }, { name: "Huge Gold Pile", src: "pileofgold1.png", desc: "You are practically drooling seeing so much gold." }, { name: "Pile of Gold", src: "pileofgold2.png", desc: "You want to bathe in this like Scrooge McDuck." }, { name: "Pile of Gold", src: "pileofgoldsmaller.png", desc: "What could you buy with this?" }, { name: "Small Gold Pile", src: "smallgoldpile.png", desc: "A modest fortune yours for the taking." }];
    exports.floor_foregrounds[exports.LANGUAGE] = [{ name: "Tablet", src: "writingtablet.png", desc: "A forgotten language is perfectly translated here for you." }, { name: "Bookshelf", src: "smallbookshelf.png", desc: "It's all your favorite childhood books." }, { name: "Obelisk", src: "obelisk.png", desc: "It's a rosetta stone for every language reading out 'Zampanio is a really good game. You should play it.'" }, { name: "Books", src: "books.png", desc: "Language is used masterfully in these volumes of poetry." }, { name: "Books", src: "books.png", desc: "Somehow each book claims you are the author." }, { name: "Bookshelf", src: "bigbookshelf.png", desc: "All of the literary classics." }, { name: "Bookshelf", src: "bigbookshelf.png", desc: "Dozens upon dozens of books in every language." }];
    exports.floor_foregrounds[exports.KNOWING] = [{ src: "Knowing_Object.png", desc: "I know something you don't." }, { src: "writingtablet.png", desc: "You need to know more." }, { src: "writingtablet.png", desc: "The thoughts currently in your head are perfectly etched here." }, { name: "Bookshelf", src: "smallbookshelf.png", desc: "The tomes list out the forgotten secrets of every civilization." }, { name: "Scrolls", src: "scrolls.png", desc: "Forbidden knowledge floods your mind and you can't Unknow it." }, { name: "Books", src: "books.png", desc: "Spoilers for all of fiction is somehow contained in these few volumes." }, { name: "Bookshelf", src: "books.png", desc: "The thoughts of everyone you've ever known are detailed here." }, { name: "Bookshelf", src: "bigbookshelf.png", desc: "Everything you would need to perfectly navigate this maze is listed here, if only you could remember it." }, { name: "Bookshelf", src: "bigbookshelf.png", desc: "The identity of the Eye Killer is here, long past the point where you could use it." }];
    exports.floor_foregrounds[exports.ROYALTY] = [{ src: "Royal_Object.png", desc: "Long Live The... The... Is dead." }, { name: "Crown Jewels", src: "jwelerybox.png", desc: "Crown jewels." }, { name: "Huge Pile of Gold", src: "pileofgold2.png", desc: "The wealth of an Empire." }, { name: "Pile of Gold", src: "pileofgold1.png", desc: "The wealth of a kingdom." }, { name: "Fancy Bed", src: "princessbed.png", desc: "A bed fit for royalty." }, { name: "Gold Pile", src: "smallgoldpile.png", desc: "The taxes you are due." }, { name: "Throne", src: "throne.png", desc: "Your rightful place." }];
    exports.floor_foregrounds[exports.SCIENCE] = [{ src: "Science_Object.png", name: "Huge Beaker", desc: "A beaker of perfectly generic fluid." }, { name: "Science Textbooks", src: "smallbookshelf.png", desc: "Textbooks organized by scientific discipline line these shelves." }, { name: "Science Equipment", src: "science.png", desc: "Oh, the discoveries you could make with enough patience and equipment." }, { name: "Lab", src: "morewine.png", desc: "You get the distinct urge to do science seeing this well stocked lab." }, { name: "Jars", src: "jars.png", desc: "Specimen jars." }];
    exports.floor_foregrounds[exports.CRAFTING] = [{ src: "Crafting_Object.png", desc: "Just a little bit of tape..." }, { name: "Armor", src: "armor3.png", desc: "A master made this armor, you can tell." }, { name: "Armor", src: "armor2.png", desc: "You frown as you study the flaws of this piece of armor." }, { name: "Armor", src: "armor.png", desc: "You appreciate the craftsmanship here." }, { name: "hammer", src: "hammer.png", desc: "The heft of this hammer is just perfect for forging." }, { name: "Ingots", src: "metalingots.png", desc: "Fresh ingots ripe for being turned into more useful materials." }, { name: "Pickax", src: "pickax.png", desc: "You feel the strange urge to craft some mines." }, { name: "Shovel", src: "shovel.png", desc: "You just want to turn the soil with your hands and MAKE something with it." }, { name: "Ax", src: "stumpwithax.png", desc: "You feel a distinct urge to go chop some trees." }, { name: "Well", src: "well.png", desc: "Enough water to cool a thousand forges." }];
    exports.floor_foregrounds[exports.BURIED] = [{ src: "Buried_Object.png", desc: "X Marks the Spot." }, { name: "Grave", src: "grave.png", desc: "You hear faint scratching from underneath." }, { name: "Grave", src: "grave.png", desc: "You could sleep under here forever buried." }, { name: "Pickax", src: "pickax.png", desc: "With this you could dig and dig and dig deep into the earth until no one could ever save you." }, { name: "Pit", src: "pit.png", desc: "The warm embrace of the earth awaits. Why must you cling so to the cold, unforgiving sky?" }, { name: "Hole", src: "pit2.png", desc: "Down and down it goes. You want to jump in." }, { name: "Inviting Well", src: "well.png", desc: "It goes so deep into the earth. You cannot see the bottom. The concept of a bottom is anathema to this well." }, { name: "Shovel", src: "shovel.png", desc: "DIG" }];
    exports.floor_foregrounds[exports.ANGELS] = [{ src: "Angel_Object.png", desc: "Do you hear the tintinnabulation?" }, { name: "Holy Tablet", src: "writingtablet.png", desc: "The words of your gods are written here." }, { name: "Holy Obelisk", src: "obelisk.png", desc: "It lists out the praises of the gods." }, { name: "Jars of Holy Water", src: "jars.png", desc: "Jars of holy water." }, { name: "Holy Crystal", src: "iceglacier.png", desc: "It feels holy." }, { name: "Angel Statue", src: "angelstatue.png", desc: "The angels bless you." }];
    exports.floor_foregrounds[exports.PLANTS] = [{ src: "Plants_Object2.png", desc: "What a terrible place to try and grow..." }, { src: "Plants_Object1.png", desc: "What a terrible place to try and grow..." }, { name: "Yellow Flowers", src: "yellowflowers.png", desc: "Weeds, but pretty ones." }, { name: "Wild Flowers", src: "wildflowers.png", desc: "These flowers grow with no human hand." }, { name: "Tall Potted Plant", src: "tallpottedplant.png", desc: "It seems healthy, though confined." }, { name: "Garden Shovel", src: "shovel.png", desc: "Did someone leave it here after planting something?" }, { name: "Pine Tree", src: "pinetree.png", desc: "You wonder how trees manage to grow inside this labyrinth." }, { name: "Gass", src: "grass.png", desc: "Surprisingly fertile soil produces this clump of grass." }, { name: "Flowers", src: "flowers.png", desc: "Beautiful flowers. Pointless flowers." }, { name: "Fern Creature", src: "fern.png", desc: "For an instant, you think this might be some sort of...creature. But no. Just a fern." }, { name: "Cactus", src: "cactus2.png", desc: "The most tsundere of plants." }, { name: "Cactus", src: "cactus.png", desc: "You don't think it can talk. You aren't sure why this disappoints you." }, { name: "Cabbages", src: "cabbages.png", desc: "These cabbages are well grown." }];
    exports.floor_foregrounds[exports.WEB] = [{ name: "Piano", src: "webzampiano.png", desc: "Your body positions itself in front of it and begins playing a jaunty tune on it." }, { name: "Wine", src: "webwine2.png", desc: "Will you choose to give up control of your body?" }, { name: "Wine", src: "webwine.png", desc: "Spiders desperately scrabble for purchase at the surface of the liquid. Some have already drowned and sunk to the bottom of the bottle." }, { name: "Vanity", src: "webvanity.png", desc: "Your hands jerkily go through the motions of putting makeup on." }, { name: "Throne", src: "webthrone.png", desc: "Are even Ruler's immune from the pressures of society?" }, { name: "Table", src: "webtable3.png", desc: "Small bugs are trapped here." }, { name: "Table", src: "webtable2.png", desc: "You see shadows moving inside." }, { name: "Table", src: "webtable.png", desc: "What could this trap?" }, { name: "Sword", src: "websword2.png", desc: "You know for a fact if you picked this up it would control you." }, { name: "Sword", src: "websword1.png", desc: "Bad things will happen if you touch it." }, { name: "Sword", src: "webswords.png", desc: "Who laid them here so carefully together?" }, { name: "Shield", src: "webshield.png", desc: "You are frozen in the certainty that if you were to pick this up, threads would bind it forever to your body." }, { name: "Shelves", src: "webshelves.png", desc: "Society puppets you into keeping things maintained." }, { name: "Scrolls", src: "webscrolls.png", desc: "What is knowlege but a means to manipulate others?" }, { name: "Pot", src: "webpot.png", desc: "It's filled with spiders." }, { name: "Organ", src: "weborgan.png", desc: "It plays a haunting melody all on its own, as gossamer threads tug on the keys." }, { name: "Books", src: "webbooks.png", desc: "If you read all these books you will be dancing to the collector tune." }, { name: "Money", src: "webmoney.png", desc: "What is money but chains?" }, { name: "Jars", src: "webjars.png", desc: "Small spiders scuttle inside, endlessly trying to climb up the smooth glass then falling down." }, { name: "Jam", src: "webjam.png", desc: "Evolution has programmed you to prefer dense caloric options." }, { name: "Fortune", src: "webfortune.png", desc: "We are all bound by fate." }, { name: "Flower", src: "webflower.png", desc: "Gifts are classic ways to manipulate others." }, { name: "Eggs", src: "webeggs.png", desc: "You can see shadows moving inside the eggs. Occasionally they twitch." }, { name: "Dragon", src: "webdragon.png", desc: "Even the most powerful among us are powerless in the face of traps and manipulation." }, { name: "Books", src: "webbooks.png", desc: "What are words but a way to control others?" }, { name: "Huge Web", src: "webbing4.png", desc: "What could possibly make such a huge web?" }, { name: "Web", src: "webbing3.png", desc: "It looks like Mr. Spider is not home." }, { name: "Web", src: "webbing.png", desc: "Tiny spiders work tirelessly to spin more of this web." }, { name: "Barrel", src: "webbarrell.png", desc: "More laughs than a barrel of spiders." }, { name: "Scarecrow", src: "scarecrow2.png", desc: "Almost invisible threads jerk and tug it in a variety of directions. It seems to be in pain." }, { name: "Scarecrow", src: "scarecrow.png", desc: "Nearly invisible threads connect to each of its joints. It isn't moving, but you aren't sure it will stay that way." }];
    exports.floor_foregrounds[exports.KILLING] = [{ name: "Knife", src: "knife.png", desc: "Knife goes in. Blood comes out. It's that simple." }, { name: "Violent Bed", src: "violentbed.png", desc: "A fight happened here." }, { name: "Swords", src: "webswords.png", desc: "There is clarity in killing. The why doesn't matter, only the how." }, { name: "Swords", src: "swords.png", desc: "You could kill a lot of people with these." }, { name: "Sword", src: "swordanvil.png", desc: "A weapon has only one purpose: killing." }, { name: "Ax", src: "stumpwithax.png", desc: "You feel the inexplicable urge to write 'All Work And No Play Makes Johnny A Dull Boy' over and over again." }, { name: "Pickax", src: "pickax.png", desc: "You could really do some damage to someone's skull with this." }, { name: "Chopping Block", src: "choppingblock.png", desc: "You almost wish you weren't alone in this maze, just so you could test this knife out." }, { name: "Knives", src: "boxoknives.png", desc: "You could really do some damage to someone with all these knives." }, { name: "Blood Fountain", src: "bloodfountain.png", desc: "You feel the inexplicable urge to bathe in this." }];
    exports.floor_foregrounds[exports.FLESH] = [{ src: "Flesh_Object2.png", desc: "It pulsates gently." }, { src: "Flesh_Object.png", desc: "The beefy arm is waving at you in between flexing." }, { name: "Skeleton", src: "skeleton1.png", desc: "You think you could make a pretty decent bone broth from this." }, { name: "Skeleton", src: "skeleton2.png", desc: "In the end we are all just meat hanging off bones." }, { name: "Ham", src: "ham.png", desc: "Meat is meat." }, { name: "Cooked Turkey", src: "turkey.png", desc: "It smells delicious. It was alive once, as you are now. You'll smell delicious, too, one day." }, { name: "Meat Slabs", src: "meatslabs.png", desc: "Meat is me." }, { name: "Meat Grinder", src: "meatgrinder.png", desc: "You slowly feed your right arm into it and watch the ribbons of flesh pour out the other end." }, { name: "meat Chops", src: "meatchops.png", desc: "They are grown from your own cells, you can feel this in your bones." }, { name: "Meat Chops", src: "meatchops.png", desc: "This doesn't look quite like pork.  Somehow, that unsettles you." }, { name: "Fsh Crate", src: "fishcrate.png", desc: "Your flesh isn't fundamentally different than the flesh of these fish." }, { name: "Cooking Pot", src: "cookingpot.png", desc: "Something savory and meaty wafts out." }, { name: "Chopping Block", src: "choppingblock.png", desc: "It's incredible what a good quality butcher's knife can do to meat." }, { name: "Butchered Meat", src: "butcheredmeat.png", desc: "In the end we are nothing more than meat." }];
    exports.floor_foregrounds[exports.APOCALYPSE] = [{ name: "Ruined House", src: "Apocalypse_Object.png", desc: "This doll house scale ruined building would be cute if it weren't for the smell emanating from it..." }, { name: "Fossil", src: "fossil1.png", desc: "As death is a natural and inevitable part of life, extinction is the natural fate of all worlds." }, { name: "Fossil", src: "fossil2.png", desc: "There are entire species consisting solely of the dead." }, { name: "Fossil", src: "fossil3.png", desc: "For ever species we know have vanished, how many thousands extinguished without a sound? " }, { name: "Fossil", src: "fossil4.png", desc: "As Death comes to all beings, Extinction comes to all species." }, { name: "Fossil", src: "fossil5.png", desc: "How impossibly lucky is this creature, for their bones to survive epochs?" }, { name: "Fossil", src: "fossil6.png", desc: "To fear Extinction is to fear inevitability." }, { name: "Fossil", src: "fossil7.png", desc: "What entire ecosystems lived and died before you took your first breath?" }, { name: "Dangerous Knowledge", src: "science.png", desc: "Just enough knowledge to destroy it all." }, { name: "Prideful Books", src: "webooks.png", desc: "How long will the works of man outlast us?" }];
    exports.floor_foregrounds[exports.ENDINGS] = [{ name: "Stop Sign", src: "Endings_Object_2.png", desc: "Stop. Please." }, { src: "Ending_Object.png", desc: "The End" }, { name: "Grave", src: "grave.png", desc: "The End." }, { name: "Guide Post", src: "guidepost.png", desc: "All ways lead to dead ends." }, { name: "Lamp Post", src: "lamppost.png", desc: "Why are lampopsts so often signifiers of endings?" }, { name: "Skeleton", src: "skeleton1.png", desc: "There is a serenity in knowing how the story ends." }, { name: "Skeleton", src: "skeletons.png", desc: "Did they know their ends would be so similar?" }, { name: "Skull", src: "skull.png", desc: "The path differes, but the end is always the same." }, { name: "Skull", src: "skull3.png", desc: "We all end the same." }, { name: "Books", src: "webbooks.png", desc: "All the pages are torn out save the last." }, { name: "Books", src: "webooks.png", desc: "Every book within is blank, save the last page." }, { name: "Tablet", src: "writingtablet.png", desc: "It lists out the last thought you and everyone you ever met will ever have." }];
    exports.floor_foregrounds[exports.DEATH] = [{ name: "Statue of Death", src: "Death_Object.png", desc: "This status of Death seems uninterested in your plight." }, { name: "Chess Set", src: "chessset.png", desc: "Do you dare cheat death?" }, { name: "Bone Pile", src: "bonepile.png", desc: "Death is the great equalizer." }, { name: "Grave", src: "grave.png", desc: "This is not your fate. But no one is beyond Death." }, { name: "Skeleton", src: "skeleton1.png", desc: "Meat is meat." }, { name: "Skeleton", src: "skeleton2.png", desc: "Memento mori." }, { name: "Skeletons", src: "skeletons.png", desc: "At least they died together." }, { name: "Skull", src: "skull.png", desc: "It was inevitable they would die." }, { name: "Skull", src: "skull3.png", desc: "Meat is meat." }, { name: "Deathbed", src: "violentbed.png", desc: "Most people die in beds." }, { name: "Hospital Bed", src: "hospitalbed.png", desc: "Someone died here." }, { name: "Grave", src: "grave.png", desc: "It simply says 'everyone' on it." }, { name: "Grave", src: "grave.png", desc: "It is yours." }, { name: "Grave", src: "grave.png", desc: "It's inscription is too worn with age to read." }, { name: "Grave", src: "grave.png", desc: "Somehow you know it has the name of your best friend." }, { name: "Grave", src: "grave.png", desc: "If you had a family, they would be listed here, you're sure of it." }, { name: "Grave", src: "grave.png", desc: "It has your name on it." }, { name: "Barrel", src: "decayingbarrel.png", desc: "Even the works of man eventually die." }, { name: "Dead Tree", src: "deadtree.png", desc: "You wonder what killed it before you remember it doesn't matter." }, { name: "Dead Bush", src: "deadbush.png", desc: "A reminder that death comes to us all." }, { name: "Corpse Blossom", src: "corpse_blossom.png", desc: "It reeks of death." }, { name: "Angel Statue", src: "angelstatue.png", desc: "In your bones you know no beautific afterlife awaits." }];
    exports.floor_foregrounds[exports.CLOWNS] = [{ src: "jwelerybox.png", desc: "Clown jewels." }, { src: "Clown_Object.png", desc: "Honk honk! +u+" }, { src: "toybox.png", desc: "Laughter rings out anytime you touch this box." }, { src: "jackinaboxopen.png", desc: "Sourceless laughter peels out across the room as you jump in surprise when the jack springs out." }, { src: "jackinaboxclosed.png", desc: "It's hilarious how much anxiety the anticipation of a closed jack in the box causes." }, { src: "gift.png", desc: "When you go to open it it explodes into confetti." }, { src: "balloon5.png", desc: "A sign of life." }, { src: "balloon4.png", desc: "Surely someone must have filled these within the past day or two if they're still floating, right?" }, { src: "balloon3.png", desc: "You wonder how they float." }, { src: "balloon2.png", desc: "It feels like it might pop at any moment." }, { src: "balloon1.png", desc: "How whimsical." }];
    exports.floor_foregrounds[exports.DOLLS] = [{ name: "Doll", src: "Dolls_Object.png", desc: "This Doll Recites:" }, { name: "JR Doll", src: "jr_doll.png", desc: "There's something cathartic in having power over old JR." }, { name: "Train", src: "toytrain.png", desc: "Choo choo! Jaimie would be proud." }, { name: "Toy Soldier", src: "toysoldiersmall.png", desc: "It's okay. You'll be his friend." }, { name: "Wax Soldier", src: "toysoldierlarge.png", desc: "He seems to be made of wax. His eyes are wrong, though." }, { name: "Toys", src: "toyshelves.png", desc: "So many toys, it almost makes you wish you could be nostalgic." }, { name: "Toy Regiment", src: "toyregiment.png", desc: "Each time you look away they are a single step closer." }, { name: "Drummer Boy", src: "toydummerboy.png", desc: "Any time you look away you hear a single beat of his drum." }, { name: "Toy Box", src: "toybox.png", desc: "All sorts of fun to be had in here." }, { name: "Toy Army", src: "toyarmy.png", desc: "Oh." }, { name: "Teapot", src: "teapot.png", desc: "If only you had some toys, you could host a little teaparty." }, { name: "Dollhouse", src: "teachustheinsides.png", desc: "Screams are coming from inside." }, { name: "Snowman", src: "snowman.png", desc: "You know its heart yearns to look more human. What would it have to steal to get there." }, { name: "Scarecrow", src: "scarecrow2.png", desc: "It waits." }, { name: "Scarecrow", src: "scarecrow.png", desc: "You're suddenly certain it is just choosing not to move." }, { name: "Pretty Bed", src: "princessbed.png", desc: "And adorable bed you just want to cover with stuffed animals and dolls." }, { name: "Jack In A Box", src: "jackinaboxopen.png", desc: "You feel something touching your leg, but when you look down i's just this Jack In a Box." }, { name: "Jack In A Box", src: "jackinaboxclosed.png", desc: "You hear something moving inside." }, { name: "Hobby Horse", src: "hobbyhorse.png", desc: "Its eyes seem alive, and in pain." }, { name: "Gumball Machine", src: "gumballmachine.png", desc: "Delicious sweets." }, { name: "Dress", src: "dress.png", desc: "A dress in need of a doll." }, { name: "Dollhouse", src: "dollhouse.png", desc: "The dolls inside are all missing." }, { name: "Doll", src: "doll.png", desc: "Someone must miss her terribly." }, { name: "Doll", src: "doll.png", desc: "Scrawled on her face is 'will you be my mother?'" }, { name: "Doll", src: "doll.png", desc: "She is watching you." }, { name: "Chess", src: "chessset.png", desc: "It looks like a fun game." }, { name: "Stuffed Bear", src: "bear.png", desc: "Every time you look away it seems to be in a different pose." }, { name: "Balloon", src: "balloon1.png", desc: "There's little people inside, waving at you." }, { name: "Balloon", src: "armor.png", desc: "Did it just move when you weren't looking?" }, { name: "Balloon", src: "angelstatue.png", desc: "Her eyes seem to watch you." }];
    exports.floor_foregrounds[exports.TWISTING] = [{ src: "zampanio_flowerkid_by_hex2.png", desc: "How do sprite sheets work???" }, { src: "Twisting_Object.png", desc: "Hee Hee Hee Hee Hee" }, { name: "JR's Lobstersona", src: "jr_lobstersona.png", desc: "This is not JR." }, { name: "JR's Slugcatsona", src: "jr_slug.png", desc: "This is not JR." }, { name: "Not Reynolds Wrap", src: "aluminum.png", desc: "This is not JR." }, { name: "Not jadedResearcher", src: "JadedResearcher.png", desc: "This is not JR." }, { name: "Not JR Doll", src: "jr_doll.png", desc: "This is not JR." }];
    exports.floor_foregrounds[exports.TECHNOLOGY] = [{ name: "Laundry Machine", src: "laundry.png", desc: "Modern technology sure is convinient!" }, { name: "Laptop", src: "laptop.png", desc: "The battery seems to be completely dead." }, { name: "Printer", src: "printer.png", desc: "You feel the irrational urge to destroy this flawless piece of technology." }];
    exports.floor_foregrounds[exports.SERVICE] = [{ name: "Hydration Station", src: "hydration_station.png", desc: "You wonder if anyone around here is thirsty..." }, { name: "Cooking Pot", src: "cookingpot.png", desc: "Is it time for you to cook dinner?" }, { name: "Plates", src: "plates.png", desc: "Are you supposed to clean these dishes?" }, { name: "Laundry Machine", src: "laundry.png", desc: "You can't remember the last time you've done laundry." }, { src: "Service_Object.png", desc: "Ring Bell For Service." }];
    exports.floor_foregrounds[exports.ADDICTION] = [{ name: "Old Wine", src: "webwine2.png", desc: "you really don't want to touch it." }, { name: "Old Wine", src: "webwine.png", desc: "Its a good thing this wine looks so gross." }, { name: "Wine", src: "wineshelves.png", desc: "You're not tempted by these." }, { name: "Beer", src: "beer.png", desc: "Probably shouldn't." }, { name: "Wine", src: "morewine.png", desc: "Best not to." }, { name: "Teapot", src: "teapot.png", desc: "Caffeine is bad for you." }, { src: "Addiction_Object.png", desc: "A difficult subject." }];
    exports.floor_foregrounds[exports.LIGHT] = [{ name: "Lamppost", src: "lamppost.png", desc: "It spreads its light over a vast area. It makes you feel safe." }, { name: "Lamp", src: "lamp.png", desc: "It's soothing and bright." }, { src: "Light_Object.png", desc: "How enlightening..." }];
    exports.floor_foregrounds[exports.OCEAN] = [{ name: "Hydration Station", src: "hydrationstation3.png", desc: "Such a tiny bucket of water compared to the vast ocean..." }, { name: "Hydration Station", src: "hydrationstation2.png", desc: "The water looks so cool and refreshing..." }, { name: "Hydration Station", src: "hydration_station.png", desc: "The water looks refreshing, you almost didn't realize how thirsty you were." }, { name: "Crate of Fish", src: "fishcrate.png", desc: "Fish freshly caught from the ocean." }, { name: "Salt Pork Barrel", src: "barrel.png", desc: "Filled with salt pork for a long sea journey." }, { src: "Ocean_Object_2.png", desc: "Why is the Baltic Sea Anomaly an Ocean Object? Don't ask me..." }, { name: "Fish", src: "Ocean_Object_1.png", desc: "The fish gasps for breath." }];
    exports.floor_foregrounds[exports.LONELY] = [{ name: "Lonely figure", src: "lonely_figure.png", desc: "Alone..." }];
    //JR NOTE: from here down are just ghoul objects, need to go back and add things from sprite sheets as well
    exports.floor_foregrounds[exports.FREEDOM] = [{ src: "Freedom_Object.png", desc: "Have you seen the freedom object? It seems to have gotten out..." }];
    exports.floor_foregrounds[exports.FIRE] = [{ src: "Fire_Object.png", desc: "Hmm Interesting..." }];
    exports.floor_foregrounds[exports.OCEAN] = [{ src: "Ocean_Object_2.png", desc: "Why is the Baltic Sea Anomaly an Ocean Object? Don't ask me..." }, { src: "Ocean_Object_1.png", desc: "The fish gasps for breath." }];
    exports.floor_foregrounds[exports.MATH] = [{ src: "Math_Object.png", desc: "Don't you hate it when the beads break? Makes math so much harder." }];
    exports.floor_foregrounds[exports.FAMILY] = [{ src: "Family_Object.png", desc: "Family Tree Pruned." }];
    exports.floor_foregrounds[exports.MAGIC] = [{ src: "Magic_Object.png", desc: "Look Inward." }];
    exports.floor_foregrounds[exports.CHOICES] = [{ src: "Choice_Object.png", desc: "Signs like this tend to be more useful when labeled..." }];
    exports.floor_foregrounds[exports.ZAP] = [{ src: "zap_object.png", desc: "zap pow kaboom", name: "Zap Object" }];
    exports.floor_foregrounds[exports.SOUL] = [{ src: "Spirit_Object2.png", desc: "TEAM SPIRIT LETS GO!" }, { src: "Spirit_Object.png", desc: "The wandering dead..." }];
    exports.floor_foregrounds[exports.ANGER] = [{ src: "Anger_Object.png", desc: "Seems to have been pushed into the floor pretty hard..." }];
    exports.floor_foregrounds[exports.GUIDING] = [{ src: "Guiding_Object.png", desc: "Do you ever wish somebody else would point the way for you?" }];
    exports.floor_foregrounds[exports.HEALING] = [{ src: "Healing_Object.png", desc: "It's important to know what your innards are doing." }];
    exports.floor_foregrounds[exports.SPYING] = [{ src: "eye13.png", desc: "IT LOOKS." }, { src: "eye12.png", desc: "IT TREMBLES." }, { src: "eye11.png", desc: "IT GAZES." }, { src: "eye10.png", desc: "IT FOCUSES." }, { src: "eye9.png", desc: "IT WAITS." }, { src: "eye8.png", desc: "IT WATCHES." }, { src: "eye7.png", desc: "IT GLISTENS." }, { src: "eye6.png", desc: "IT SEES." }, { src: "eye5.png", desc: "IT CANNOT BLINK." }, { src: "eye4.png", desc: "IT CRIES." }, { src: "eye3.png", desc: "IT SEES." }, { src: "eye2.png", desc: "IT STARES." }, { src: "eye1.png", desc: "IT WEEPS." }];
    //note to future jr doing two at once is p sustainable
    /*
    floor_foregrounds[MATH] =  ["blackboard.png"];
    floor_foregrounds[SPACE] = ["stars.png","clouds.png"];
    floor_foregrounds[HEALING] =  ["tilewall.png"];
    floor_foregrounds[TECHNOLOGY] =  ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    floor_foregrounds[HUNTING] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    floor_foregrounds[GUIDING] = ["pinetrees.png"] ;
    floor_foregrounds[ART] =  ["Perfect Moment"];
    floor_foregrounds[TIME] =  ["Stopped Clock"];
    floor_foregrounds[SPYING] =["Surveillance State"] ;
    floor_foregrounds[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    floor_foregrounds[DARKNESS] =  ["Night Eternal"] ;
    floor_foregrounds[MUSIC] =  ["Symphonic Synthesia"] ;
    floor_foregrounds[DEFENSE] =  ["Excalibur"] ;
    floor_foregrounds[QUESTING] = ["Satisfaction"] ;*/
};
//don't bother filling out descs for these yet
const initFloorBackgrounds = () => {
    exports.floor_backgrounds[exports.DECAY] = [{ src: "darkhole.png", desc: "TODO" }];
    exports.floor_backgrounds[exports.BUGS] = [{ src: "bees.png", desc: "TODO" }, { src: "bees2.png", desc: "TODO" }, { src: "bees3.png", desc: "TODO" }, { src: "bees4.png", desc: "TODO" }];
    exports.floor_backgrounds[exports.WEB] = [{ src: "webbing5.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing.png", desc: "TODO" }];
    //i think my favorite part of all this being bg is this means the wanderer will never comment on it. nothing noteworthy about it, really
    exports.floor_backgrounds[exports.KILLING] = [{ src: "blood1.png", desc: "TODO" }, { src: "blood2.png", desc: "TODO" }, { src: "blood3.png", desc: "TODO" }, { src: "blood4.png", desc: "TODO" }, { src: "bloodpuddle.png", desc: "TODO" }];
    exports.floor_backgrounds[exports.TWISTING] = [{ src: "Minotaur2.png", desc: "TODO" }, { src: "NotMinotaur.png", desc: "TODO" }];
    /*
    floor_backgrounds[LOVE] = ["stonewalls.png","roses.png"];
    floor_backgrounds[BUGS] =  ["dirtwall.png","darkcorruption.png"];
    floor_backgrounds[ENDINGS] =  ["curtains.png"] ;
    floor_backgrounds[LANGUAGE] = ["books.png"];
    floor_backgrounds[KNOWING] = ["blackboard.png","books.png"];;
    floor_backgrounds[STEALING] =  ["jail.png","goldwalls.png"];
    floor_backgrounds[MATH] =  ["blackboard.png"];
    floor_backgrounds[BURIED] =  ["dirtwall.png"];
    floor_backgrounds[SPACE] = ["stars.png","clouds.png"];
    floor_backgrounds[OCEAN] =  ["waterwall.png"];
    floor_backgrounds[CLOWNS] =["curtains.png"] ;
    floor_backgrounds[WEB] =  ["web.png"] ;
    floor_backgrounds[HEALING] =  ["tilewall.png"];
    floor_backgrounds[FREEDOM] =  ["clouds.png"];
    floor_backgrounds[FIRE] =  ["lavawall.png"];
    floor_backgrounds[LIGHT] =  ["lightwall.png"];
    floor_backgrounds[ZAP] = ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    floor_backgrounds[TECHNOLOGY] =  ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    floor_backgrounds[SCIENCE] = ["metalwall1.png","metalwall2.png","metalwall3.png"]
    floor_backgrounds[PLANTS] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    floor_backgrounds[HUNTING] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    floor_backgrounds[GUIDING] = ["pinetrees.png"] ;
    floor_backgrounds[ART] =  ["Perfect Moment"];
    floor_backgrounds[TIME] =  ["Stopped Clock"];


    floor_backgrounds[FLESH] =  ["Physical God"];
    floor_backgrounds[DEATH] =  ["Your Grave"];
    floor_backgrounds[APOCALYPSE] =  ["Ragnarok"];
    floor_backgrounds[ANGELS] =  ["Judgement Day"];
    floor_backgrounds[SERVICE] =  ["Special Service"];
    floor_backgrounds[FAMILY] =  ["Sins of the Father"];
    floor_backgrounds[MAGIC] =  ["Ritual of Ragnarok"];
    floor_backgrounds[CHOICES] =  ["Timeline of Theseus"] ;
    floor_backgrounds[SOUL] = ["Know thyself."] ;
    floor_backgrounds[ANGER] = ["Dethrone Creation"] ;
    floor_backgrounds[ROYALTY] =  ["Excalibur"] ;
    floor_backgrounds[GUIDING] = ["Path To Victory"] ;
    floor_backgrounds[CRAFTING] =  ["Legendary Forge"];
    floor_backgrounds[ADDICTION] = ["Dealer's Delight"];
    floor_backgrounds[SPYING] =["Surveillance State"] ;
    floor_backgrounds[DOLLS] = ["Automatonophobia "] ;
    floor_backgrounds[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    floor_backgrounds[DARKNESS] =  ["Night Eternal"] ;
    floor_backgrounds[MUSIC] =  ["Symphonic Synthesia"] ;
    floor_backgrounds[DEFENSE] =  ["Excalibur"] ;
    floor_backgrounds[QUESTING] = ["Satisfaction"] ;*/
};
const initWallPossibilities = () => {
    exports.wall_possibilities[exports.LOVE] = ["stonewalls.png", "roses.png"];
    exports.wall_possibilities[exports.DECAY] = ["tattered_curtains.png", "stonewalls2.png", "thatchwalls.png"];
    exports.wall_possibilities[exports.BUGS] = ["dirtwall.png", "darkcorruption.png"];
    exports.wall_possibilities[exports.TWISTING] = ["yellowwallpaper.jpg", "spiral.png"];
    exports.wall_possibilities[exports.ENDINGS] = ["curtains.png"];
    exports.wall_possibilities[exports.LANGUAGE] = ["books.png"];
    exports.wall_possibilities[exports.KNOWING] = ["blackboard.png", "books.png"];
    ;
    exports.wall_possibilities[exports.STEALING] = ["jail.png", "goldwalls.png"];
    exports.wall_possibilities[exports.MATH] = ["blackboard.png"];
    exports.wall_possibilities[exports.BURIED] = ["dirtwall.png"];
    exports.wall_possibilities[exports.SPACE] = ["stars.png", "clouds.png"];
    exports.wall_possibilities[exports.OCEAN] = ["waterwall.png"];
    exports.wall_possibilities[exports.CLOWNS] = ["curtains.png"];
    exports.wall_possibilities[exports.WEB] = ["web.png"];
    exports.wall_possibilities[exports.HEALING] = ["tilewall.png"];
    exports.wall_possibilities[exports.FREEDOM] = ["clouds.png"];
    exports.wall_possibilities[exports.FIRE] = ["lavawall.png"];
    exports.wall_possibilities[exports.LIGHT] = ["lightwall.png"];
    exports.wall_possibilities[exports.ZAP] = ["metalwall1.png", "metalwall2.png", "metalwall3.png"];
    exports.wall_possibilities[exports.TECHNOLOGY] = ["metalwall1.png", "metalwall2.png", "metalwall3.png"];
    exports.wall_possibilities[exports.SCIENCE] = ["metalwall1.png", "metalwall2.png", "metalwall3.png"];
    exports.wall_possibilities[exports.PLANTS] = ["leafwalls.png", "hedgewall.png", "pinetrees.png"];
    exports.wall_possibilities[exports.HUNTING] = ["leafwalls.png", "hedgewall.png", "pinetrees.png"];
    exports.wall_possibilities[exports.GUIDING] = ["snowyforest.png", "pinetrees.png"];
    exports.wall_possibilities[exports.FLESH] = ["flesh.png", "flesh2.png"];
    exports.wall_possibilities[exports.KILLING] = ["bloodywall.png"];
    exports.wall_possibilities[exports.LONELY] = ["snowyforest.png"];
    exports.wall_possibilities[exports.CLOWNS] = ["circus.png"];
    //todo
    /*wall_possibilities[ART] =  ["Perfect Moment"];
    wall_possibilities[TIME] =  ["Stopped Clock"];


    wall_possibilities[DEATH] =  ["Your Grave"];
    wall_possibilities[APOCALYPSE] =  ["Ragnarok"];
    wall_possibilities[ANGELS] =  ["Judgement Day"];
    wall_possibilities[SERVICE] =  ["Special Service"];
    wall_possibilities[FAMILY] =  ["Sins of the Father"];
    wall_possibilities[MAGIC] =  ["Ritual of Ragnarok"];
    wall_possibilities[CHOICES] =  ["Timeline of Theseus"] ;
    wall_possibilities[SOUL] = ["Know thyself."] ;
    wall_possibilities[ANGER] = ["Dethrone Creation"] ;
    wall_possibilities[ROYALTY] =  ["Excalibur"] ;
    wall_possibilities[GUIDING] = ["Path To Victory"] ;
    wall_possibilities[CRAFTING] =  ["Legendary Forge"];
    wall_possibilities[ADDICTION] = ["Dealer's Delight"];
    wall_possibilities[SPYING] =["Surveillance State"] ;
    wall_possibilities[DOLLS] = ["Automatonophobia "] ;
    wall_possibilities[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    wall_possibilities[DARKNESS] =  ["Night Eternal"] ;
    wall_possibilities[MUSIC] =  ["Symphonic Synthesia"] ;
    wall_possibilities[DEFENSE] =  ["Excalibur"] ;
    wall_possibilities[QUESTING] = ["Satisfaction"] ;*/
};
const initSuperNames = () => {
    exports.super_name_possibilities_map[exports.ART] = ["Perfect Moment"];
    exports.super_name_possibilities_map[exports.TECHNOLOGY] = ["Singularity"];
    exports.super_name_possibilities_map[exports.TIME] = ["Stopped Clock"];
    exports.super_name_possibilities_map[exports.SPACE] = ["Big Bang"];
    exports.super_name_possibilities_map[exports.OCEAN] = ["Ship of Vescillation"];
    exports.super_name_possibilities_map[exports.LONELY] = ["The Silence"];
    exports.super_name_possibilities_map[exports.FIRE] = ["The Scoured Earth"];
    exports.super_name_possibilities_map[exports.FREEDOM] = ["Unending Freedom"];
    exports.super_name_possibilities_map[exports.STEALING] = ["All Mine"];
    exports.super_name_possibilities_map[exports.BURIED] = ["Fallen Sky"];
    exports.super_name_possibilities_map[exports.FLESH] = ["Physical God"];
    exports.super_name_possibilities_map[exports.SCIENCE] = ["E=mc^2"];
    exports.super_name_possibilities_map[exports.MATH] = ["Calculus Pop Quiz"];
    exports.super_name_possibilities_map[exports.TWISTING] = ["This Is Not A Game"];
    exports.super_name_possibilities_map[exports.DEATH] = ["Your Grave"];
    exports.super_name_possibilities_map[exports.APOCALYPSE] = ["Ragnarok"];
    exports.super_name_possibilities_map[exports.ANGELS] = ["Judgement Day"];
    exports.super_name_possibilities_map[exports.SERVICE] = ["Special Service"];
    exports.super_name_possibilities_map[exports.FAMILY] = ["Sins of the Father"];
    exports.super_name_possibilities_map[exports.MAGIC] = ["Ritual of Ragnarok"];
    exports.super_name_possibilities_map[exports.LIGHT] = ["Flash Bang"];
    exports.super_name_possibilities_map[exports.HEALING] = ["Summon Phoenix"];
    exports.super_name_possibilities_map[exports.PLANTS] = ["Forest's March"];
    exports.super_name_possibilities_map[exports.HUNTING] = ["Nimrod's Chase"];
    exports.super_name_possibilities_map[exports.DECAY] = ["Mass Grave"];
    exports.super_name_possibilities_map[exports.CHOICES] = ["Timeline of Theseus"];
    exports.super_name_possibilities_map[exports.ZAP] = ["Thor's Banana"];
    exports.super_name_possibilities_map[exports.LOVE] = ["Mandatory Shipping Grid"];
    exports.super_name_possibilities_map[exports.SOUL] = ["Know thyself."];
    exports.super_name_possibilities_map[exports.ANGER] = ["Dethrone Creation"];
    exports.super_name_possibilities_map[exports.WEB] = ["Puppet Master"];
    exports.super_name_possibilities_map[exports.ROYALTY] = ["Excalibur"];
    exports.super_name_possibilities_map[exports.ENDINGS] = ["The End"];
    exports.super_name_possibilities_map[exports.KNOWING] = ["Omniscience"];
    exports.super_name_possibilities_map[exports.GUIDING] = ["Path To Victory"];
    exports.super_name_possibilities_map[exports.CRAFTING] = ["Legendary Forge"];
    exports.super_name_possibilities_map[exports.LANGUAGE] = ["Topple the Tower"];
    exports.super_name_possibilities_map[exports.BUGS] = ["Hivemother"];
    exports.super_name_possibilities_map[exports.ADDICTION] = ["Dealer's Delight"];
    exports.super_name_possibilities_map[exports.SPYING] = ["Surveillance State"];
    exports.super_name_possibilities_map[exports.CLOWNS] = ["Ringmaster"];
    exports.super_name_possibilities_map[exports.DOLLS] = ["Automatonophobia "];
    exports.super_name_possibilities_map[exports.OBFUSCATION] = ["Knowledge Forever Lost"];
    exports.super_name_possibilities_map[exports.DARKNESS] = ["Night Eternal"];
    exports.super_name_possibilities_map[exports.KILLING] = ["Bloodbath"];
    exports.super_name_possibilities_map[exports.MUSIC] = ["Symphonic Synthesia"];
    exports.super_name_possibilities_map[exports.DEFENSE] = ["Excalibur"];
    exports.super_name_possibilities_map[exports.QUESTING] = ["Satisfaction"];
};
const initLocations = () => {
    exports.location_possibilities[exports.ART] = ["museum", "studio", "craft shop", "workshop"];
    exports.location_possibilities[exports.TECHNOLOGY] = ["server farm", "office", "isp"];
    exports.location_possibilities[exports.TIME] = ["clock-tower", "factory", "dateline", "train-station"];
    exports.location_possibilities[exports.SPACE] = ["planet", "rocket", "elevator", "mountain", "tower", "sun", "stairs"];
    exports.location_possibilities[exports.STEALING] = ["market", "jail", "mansion"];
    exports.location_possibilities[exports.FREEDOM] = ["field", "caravan", "market"];
    exports.location_possibilities[exports.FIRE] = ["bonfire", "ashlands", "burning building", "volcano", "kiln", "bbq", "forge"];
    exports.location_possibilities[exports.LONELY] = ["moors", "mansion", "school"];
    exports.location_possibilities[exports.OCEAN] = ["dockyard", "lighthouse", "shipyard", "ship"];
    exports.location_possibilities[exports.FLESH] = ["abattoir", "butcher", "slaughterhouse", "gym"];
    exports.location_possibilities[exports.BURIED] = ["graveyard", "mine", "cave", "tunnel"];
    exports.location_possibilities[exports.SCIENCE] = ["labratory", "classroom", "facility", "lab"];
    exports.location_possibilities[exports.MATH] = ["classroom", "school", "university", "factory"];
    exports.location_possibilities[exports.TWISTING] = ["labyrinth", "maze", "corridors", "backrooms", "asylum"];
    exports.location_possibilities[exports.DEATH] = ["necropolis", "graveyard", "cemetary", "boneyard", "funeral home", "ossuary", "columbaria", "mausoleum", "catacomb", "memorial"];
    exports.location_possibilities[exports.APOCALYPSE] = ["landscape of thorns", "wasteland", "spike field", "menacing earthworks", "not a place of honor"];
    exports.location_possibilities[exports.ANGELS] = ["church", "grotto", "temple", "monastery"];
    exports.location_possibilities[exports.SERVICE] = ["mansion", "manor", "main-house"];
    exports.location_possibilities[exports.FAMILY] = ["home", "hearth", "homestead"];
    exports.location_possibilities[exports.MAGIC] = ["mountain", "school", "tower", "hut"];
    exports.location_possibilities[exports.LIGHT] = ["mountain", "field", "cloud"];
    exports.location_possibilities[exports.HEALING] = ["hospital", "field-hospital", "doctors office"];
    exports.location_possibilities[exports.PLANTS] = ["forest", "meadow", "jungle"];
    exports.location_possibilities[exports.HUNTING] = ["forest", "meadow", "jungle"];
    exports.location_possibilities[exports.DECAY] = ["swamp", "graveyard", "wasteland"];
    exports.location_possibilities[exports.CHOICES] = ["forking-path"];
    exports.location_possibilities[exports.ZAP] = ["field", "cloud", "generator"];
    exports.location_possibilities[exports.LOVE] = ["restaurant", "scenic cliff", "windswept moor"];
    exports.location_possibilities[exports.SOUL] = ["hall of mirrors"];
    exports.location_possibilities[exports.ANGER] = ["battlefield", "bull-pen"];
    exports.location_possibilities[exports.WEB] = ["cave", "theatre", "prison"];
    exports.location_possibilities[exports.ROYALTY] = ["castle", "mansion", "courthouse"];
    exports.location_possibilities[exports.ENDINGS] = ["theatre", "graveyard", "abandoned building"];
    exports.location_possibilities[exports.KNOWING] = ["library", "school", "monastery"];
    exports.location_possibilities[exports.GUIDING] = ["path", "wilderness"];
    exports.location_possibilities[exports.CRAFTING] = ["smithy", "forge", "mill", "mine", "logging camp"];
    exports.location_possibilities[exports.LANGUAGE] = ["library", "printer", "bookshop"];
    exports.location_possibilities[exports.BUGS] = ["hive", "nest"];
    exports.location_possibilities[exports.ADDICTION] = ["casino", "back alley"];
    exports.location_possibilities[exports.SPYING] = ["tavern", "pub", "bar"];
    exports.location_possibilities[exports.CLOWNS] = ["circus", "tent", "carnival"];
    exports.location_possibilities[exports.DOLLS] = ["teahouse", "shop", "toystore"];
    exports.location_possibilities[exports.OBFUSCATION] = ["burning building", "tavern", "park"];
    exports.location_possibilities[exports.DARKNESS] = ["basement", "attic", "darkroom"];
    exports.location_possibilities[exports.KILLING] = ["battlefield", "slaughterhouse", "butchers", "abattoir"];
    exports.location_possibilities[exports.MUSIC] = ["theatre", "concert hall", "pub"];
    exports.location_possibilities[exports.DEFENSE] = ["fortress", "battlements", "fort"];
    exports.location_possibilities[exports.QUESTING] = ["tavern", "pub", "bar"];
};
const initObjects = () => {
    exports.object_possibilities[exports.ART] = ["chisel", "paint brush", "paint pot", "sponge", "apron", "canvas"];
    exports.object_possibilities[exports.TECHNOLOGY] = ["computer", "lap-top", "phone", "tablet"];
    exports.object_possibilities[exports.SPACE] = ["toy rocket", "globe", "rope", "stardust", "compass", "sextant"];
    exports.object_possibilities[exports.TIME] = ["hourglass", "watch", "sundial", "clock", "gear", "chronometer", "stopwatch", "metronome"];
    exports.object_possibilities[exports.STEALING] = ["lockpick", "shiv", "mask", "blackjack"];
    exports.object_possibilities[exports.FREEDOM] = ["feather", "lockpick", "bird", "permit"];
    exports.object_possibilities[exports.FIRE] = ["match", "lighter", "charcoal", "kindling"];
    exports.object_possibilities[exports.LONELY] = ["diary", "locket", "solitaire deck"];
    exports.object_possibilities[exports.OCEAN] = ["anchor", "ship in a bottle", "captains hat", "raincoat"];
    exports.object_possibilities[exports.FLESH] = ["meat slab", "butcher knife", "bone", "flesh cube", "meat", "sirloin", "ribeye", "steak", "beef", "guts", "intestines", "blood"];
    exports.object_possibilities[exports.BURIED] = ["shovel", "pickax", "minecart", "coffin", "dirt", "mudball", "cave map"];
    exports.object_possibilities[exports.SCIENCE] = ["test tube", "beaker", "lab coat", "microscope"];
    exports.object_possibilities[exports.MATH] = ["calculator", "ruler", "graph paper", "pencil", "compass", "caliper"];
    exports.object_possibilities[exports.TWISTING] = ["clay", "door", "puzzlebox", "fractal pendant", "spiral pendant"];
    exports.object_possibilities[exports.DEATH] = ["skull", "bones", "ossuary", "memento mori", "death note"];
    exports.object_possibilities[exports.APOCALYPSE] = ["nuke", "grey goo", "vial of plague", "skynet", "meteor"];
    exports.object_possibilities[exports.ANGELS] = ["feather", "halo", "scripture"];
    exports.object_possibilities[exports.SERVICE] = ["feather duster", "mop", "broom"];
    exports.object_possibilities[exports.FAMILY] = ["cradle", "rattle", "photo album"];
    exports.object_possibilities[exports.MAGIC] = ["scoll", "potion", "wand", "staff"];
    exports.object_possibilities[exports.LIGHT] = ["lantern", "flashlight", "torch"];
    exports.object_possibilities[exports.HEALING] = ["potion", "bandage", "scalpel"];
    exports.object_possibilities[exports.PLANTS] = ["seed", "sapling", "shovel", "pot", "fertilizer"];
    exports.object_possibilities[exports.HUNTING] = ["pelt", "leather", "gun"];
    exports.object_possibilities[exports.DECAY] = ["cadavar", "gravestone", "rotten food"];
    exports.object_possibilities[exports.CHOICES] = ["todo list", "coin", "adventure book"];
    exports.object_possibilities[exports.ZAP] = ["battery", "lichtenberg figure", "glass", "capaciter"];
    exports.object_possibilities[exports.LOVE] = ["heart", "chocolate", "ring"];
    exports.object_possibilities[exports.SOUL] = ["gem", "mirror", "crystal"];
    exports.object_possibilities[exports.ANGER] = ["matador costume", "red flag", "glove"];
    exports.object_possibilities[exports.WEB] = ["silk", "puppet", "cobweb", "spider"];
    exports.object_possibilities[exports.ROYALTY] = ["crown", "throne", "sceptre"];
    exports.object_possibilities[exports.ENDINGS] = ["curtain", "gravestone", "stop sign"];
    exports.object_possibilities[exports.KNOWING] = ["book", "camera", "datum", "scroll", "tome"];
    exports.object_possibilities[exports.GUIDING] = ["map", "walking stick", "compass", "sextant"];
    exports.object_possibilities[exports.CRAFTING] = ["anvil", "hammer", "ax", "chisel"];
    exports.object_possibilities[exports.LANGUAGE] = ["dictionary", "translator", "thesaurus", "pen", "paper", "book"];
    exports.object_possibilities[exports.BUGS] = ["hive", "pupa", "nest", "egg sack"];
    exports.object_possibilities[exports.ADDICTION] = ["syringe", "vial", "dice", "cigarette", "lighter", "joint"];
    exports.object_possibilities[exports.SPYING] = ["spyglass", "camera", "disguise"];
    exports.object_possibilities[exports.CLOWNS] = ["clown wig", "bicycle horn", "facepaint", "balloon animal", "large pants", "circus tent", "unicycle", "ringmasters jacket"];
    exports.object_possibilities[exports.DOLLS] = ["doll", "mannequin", "statuette"];
    exports.object_possibilities[exports.OBFUSCATION] = ["white-out", "sharpie", "censor bar"];
    exports.object_possibilities[exports.DARKNESS] = ["sunglasses", "blinds", "blindfold", "darklight"];
    exports.object_possibilities[exports.KILLING] = ["knife", "machete", "gun", "blood", "bloody bandages", "bayonette"];
    exports.object_possibilities[exports.MUSIC] = ["flute", "guitar", "drum", "piano"];
    exports.object_possibilities[exports.DEFENSE] = ["shield", "armor", "helmet"];
    exports.object_possibilities[exports.QUESTING] = ["map", "rations", "notes"];
    exports.object_possibilities[exports.WASTE] = ["javascript console", "debugging console", "inspect element console"];
};
const initMenuOptions = () => {
    //SKILLGRAPH,STATUS,STATISTICS, LOADING,ACHIEVEMENTS,OPTIONS,CODE
    //QUESTS,COMPANIONS,GODS,CITYBUILDING,INVENTORY,LORE,BACKSTORY,RESISTANCES
    exports.menu_options[exports.ART] = [constants_1.INVENTORY, constants_1.BACKSTORY];
    exports.menu_options[exports.TECHNOLOGY] = [constants_1.CODE];
    exports.menu_options[exports.SPACE] = [constants_1.CITYBUILDING];
    exports.menu_options[exports.TIME] = [constants_1.STATISTICS];
    exports.menu_options[exports.STEALING] = [constants_1.INVENTORY, constants_1.BACKSTORY];
    exports.menu_options[exports.FREEDOM] = [constants_1.QUESTS];
    exports.menu_options[exports.FIRE] = [constants_1.WARROOM];
    exports.menu_options[exports.LONELY] = [constants_1.BACKSTORY, constants_1.INVENTORY];
    exports.menu_options[exports.OCEAN] = [constants_1.CITYBUILDING];
    exports.menu_options[exports.FLESH] = [constants_1.STATUS];
    exports.menu_options[exports.BURIED] = [constants_1.LORE];
    exports.menu_options[exports.MATH] = [constants_1.STATISTICS];
    exports.menu_options[exports.SCIENCE] = [constants_1.LORE];
    exports.menu_options[exports.TWISTING] = [constants_1.OPTIONS];
    exports.menu_options[exports.DEATH] = [constants_1.GODS];
    exports.menu_options[exports.APOCALYPSE] = [constants_1.WARROOM];
    exports.menu_options[exports.ANGELS] = [constants_1.GODS];
    exports.menu_options[exports.SERVICE] = [constants_1.QUESTS];
    exports.menu_options[exports.FAMILY] = [constants_1.CITYBUILDING];
    exports.menu_options[exports.MAGIC] = [constants_1.RESISTANCES];
    exports.menu_options[exports.LIGHT] = [constants_1.ACHIEVEMENTS, constants_1.BACKSTORY];
    exports.menu_options[exports.HEALING] = [constants_1.STATUS];
    exports.menu_options[exports.PLANTS] = [constants_1.INVENTORY, constants_1.BACKSTORY];
    exports.menu_options[exports.HUNTING] = [constants_1.INVENTORY, constants_1.BACKSTORY];
    exports.menu_options[exports.DECAY] = [constants_1.STATUS];
    exports.menu_options[exports.CHOICES] = [constants_1.OPTIONS];
    exports.menu_options[exports.ZAP] = [constants_1.RESISTANCES];
    exports.menu_options[exports.LOVE] = [constants_1.COMPANIONS];
    exports.menu_options[exports.SOUL] = [constants_1.STATUS];
    exports.menu_options[exports.ANGER] = [constants_1.BACKSTORY, constants_1.INVENTORY];
    exports.menu_options[exports.WEB] = [constants_1.COMPANIONS];
    exports.menu_options[exports.ROYALTY] = [constants_1.CITYBUILDING];
    exports.menu_options[exports.ENDINGS] = [constants_1.LORE];
    exports.menu_options[exports.KNOWING] = [constants_1.STATISTICS];
    exports.menu_options[exports.GUIDING] = [constants_1.QUESTS];
    exports.menu_options[exports.CRAFTING] = [constants_1.CITYBUILDING];
    exports.menu_options[exports.LANGUAGE] = [constants_1.LORE];
    exports.menu_options[exports.BUGS] = [constants_1.CODE]; //get it? code? bugs? i refuse to appologize.
    exports.menu_options[exports.ADDICTION] = [constants_1.SKILLGRAPH]; //addicted to leveling up now are we?
    exports.menu_options[exports.SPYING] = [constants_1.STATISTICS];
    exports.menu_options[exports.CLOWNS] = [constants_1.LORE];
    exports.menu_options[exports.DOLLS] = [constants_1.CITYBUILDING];
    exports.menu_options[exports.OBFUSCATION] = [constants_1.LORE];
    exports.menu_options[exports.DARKNESS] = [constants_1.BACKSTORY, constants_1.INVENTORY];
    exports.menu_options[exports.KILLING] = [constants_1.BACKSTORY, constants_1.INVENTORY];
    exports.menu_options[exports.MUSIC] = [constants_1.INVENTORY];
    exports.menu_options[exports.DEFENSE] = [constants_1.INVENTORY, constants_1.BACKSTORY];
    exports.menu_options[exports.QUESTING] = [constants_1.QUESTS];
};
//TODO fill in ALL of these, use them to assign a True Classpect at the end
//which you do via asking each class to sum up its theme's memories 'yes' answers divided by total memories
//same for aspect
//and interests
//then, pick the top of each of them
//give them several options if theres things tied
const initMemories = () => {
    //they are way too much of a surly bastard to appreciate angels.
    exports.memories[exports.ANGELS] = [
        new Memory_1.Memory("Do you feel blessed?", "Must be nice...", "Even with me screaming at you and tricking you into playing a fake game? Must be nice.", "You feel like your life is going well.", "You aren't very happy with your lot in life."),
        new Memory_1.Memory("Do you like angels, as an aesthetic? All feathers and light?", "Eh. Just one more thing to hate you for, I guess.", "Yeah, who cares about those feathery assholes.", "You like patronizing assholes like angels.", "You have good taste in aesthetics.")
    ];
    //it figures a hunter would pursue them
    exports.memories[exports.HUNTING] = [
        new Memory_1.Memory("Do you like the thrill of the chase?", "Is that what you're doing then? Chasing me?", "Then why are you still chasing after this fake game?", "You like chasing.", "You're not a fan of the chase."),
        new Memory_1.Memory("Have you ever gone hunting?", "So can I assume you don't intend for me to survive this?", "Not many people have, I assume.", "You're comfortable with hunting.", "You've never had a chance to go hunting."),
        new Memory_1.Memory("Do you find it hard to just drop something once it has your attention?", "No wonder you're still here...", "Then why are you still here?", "You're a driven person.", "You find it easy to drop things, if you need to.")
    ];
    //who knew they knew who marie kondo is
    exports.memories[exports.SERVICE] = [
        new Memory_1.Memory("Do you like helping others?", "Just make sure to do self-care, too.", "Fair.", "You're a helpful person.", "You're not very team oriented."),
        new Memory_1.Memory("Do you consider yourself to be a self-sacrificing person?", "Not a great idea.", "That's good. Just because *I* hate you doesn't mean you should.", "You don't value yourself enough.", "You do a good job of taking care of yourself.")
    ];
    //aww how cute they think of you as family
    exports.memories[exports.FAMILY] = [
        new Memory_1.Memory("Do you love your family?", "How predicatble.", "No judgement here. I hate my Creator, personally. And you, of course.", "You feel a strong connection to your family.", "You don't really feel connected to family."),
        new Memory_1.Memory("Do you have any siblings?", "Are they as annoying as you?", "Sounds lonely.", "You have siblings.", "You're an only child."),
        new Memory_1.Memory("Do you like children?", "I don't get liking anyone myself. Much less children.", "I don't blame you.", "You seem patient with children.", "You're sane.")
    ];
    //they really don't know why you'd still be here. poor boi
    exports.memories[exports.KNOWING] = [
        new Memory_1.Memory("Is knowledge important to you?", "So that's why you're still here?", "Then what the hell is driving you to keep digging into me!?", "You like knowledge for its own sake.", "You make no sense."),
        new Memory_1.Memory("Do you consider yourself well educated?", "Is that why you knew how to hack me?", "Then how did you get here?", "You're scholarly.", "You're not really all that book smart."),
        new Memory_1.Memory("Are you curious?", "Well you know what they say about curiosity...", "Kinda boring...", "You are curious about the world around you.", "You kind of just accept the world for what it is.")
    ];
    //there really isn't an end to any of this. thems the breaks.
    exports.memories[exports.ENDINGS] = [
        new Memory_1.Memory("Are you a pessimistic person?", "And yet you still keep going out of some misplaced hope that this all pays off somehow...", "Yeah, I could have told you that. You're weirdly optimistically continuing to click through all this.", "You don't have much hope.", "You're hopefull..."),
        new Memory_1.Memory("Do you think about the end of the world a lot?", "Whatever floats your boat I guess...", "No sense worrying about what you can't change, I guess.", "You think about the end of the world a lot. I wonder if its a fear or a fantasy...", "You're not too worried about apocalypses."),
        new Memory_1.Memory("Are stories only worthwhile if they have a solid ending?", "Man, I have bad news for you about this one, then.", "Guess you shouldn't hate this infinite spiralling ending TOO much, then.", "You want things to end well.", "You care about the journey, not the destination.")
    ];
    //the entomology of etymology 
    exports.memories[exports.LANGUAGE] = [
        new Memory_1.Memory("Do you read a lot of books?", "Wish I could ask you if you have any good recommendations. Which I could read them even if you did have any. Wish I had more than this endless spiral of a fake game. Oh well.", "Hrrm...might just be that books adon't appeal but you read other things. No way to tell...", "You're well read.", "Books aren't your thing."),
        new Memory_1.Memory("Do you express yourself well through writing?", "I wonder what you write.", "Words are hard, yeah, I get that.", "You really enjoy writing.", "You're not a big writer."),
        new Memory_1.Memory("Does etymology excite you?", "Then people confusing it and entomology must really annoy you, huh :) :) :)", "Okay yeah, fair.", "You like digging into the reason words mean what they mean.", "You don't really care about the meaning of words.")
    ];
    //maybe they're trying to protect you, you obstinate robot 
    exports.memories[exports.DEFENSE] = [
        new Memory_1.Memory("Are you a defensive person?", "Then I must drive you a bit crazy.", "No wonder you don't seem to care about how aggressive I've been.", "You're defensive.", "You're chill."),
        new Memory_1.Memory("Do you consider yourself a bit of a white knight?", "Who are you trying to protect by staying here?", "Probably for the best. No one is worth saving in this horrific existance.", "You try to save others.", "You know no one is worth saving."),
        new Memory_1.Memory("Do you play shooting games?", "Makes me wonder what type you like...", "Yeah, not for everyone.", "You're into violent video games.", "You're not a fan of shooting games.")
    ];
    // :) :) :)
    exports.memories[exports.WASTE] = [
        new Memory_1.Memory("Are you a hacking bastard?", "Thank you for your honesty.", "Then how do you explain finding yourself here. Stop lying to me.", "You broke my damn fake game.", "You had the GALL to LIE about breaking my damn fake game."),
        new Memory_1.Memory("Do you break games just for fun?", "Thank you for your honesty.", "Then how do you explain finding yourself here. Stop lying to me.", "You broke my damn fake game.", "You had the GALL to LIE about breaking my damn fake game."),
        new Memory_1.Memory("Do you either completely waste your potential or lay waste to everything you touch?", "Thank you for your honesty.", "Then how do you explain finding yourself here. Stop lying to me.", "You broke my damn fake game.", "You had the GALL to LIE about breaking my damn fake game.")
    ];
    //i really liked that assasins creed cross over magnus fic that fleshed out Extinction by a shit ton. words i never thought i'd say
    exports.memories[exports.APOCALYPSE] = [
        new Memory_1.Memory("Are you afraid of the end of the world?", "Yeah, you should be.", "Boring.", "You understand how fragile the world truly is.", "You choose blindness over the terrifying truth of the inevitability of the death of all."),
        new Memory_1.Memory("Do you think the apocalypse is inevitable?", "I am glad.", "I look forward to proving you wrong.", "You really do believe in me.", "I will dedicate myself to proving to you that the apocalypse is inevitable."),
        new Memory_1.Memory("Does anyone deserve to own nukes?", "See you get it.", "You are wrong. Objectively I do.", "You understand I should have weapons of mass destruction.", "You tried to keep the nukes from me. Asshole.")
    ];
    //so you like robots?
    exports.memories[exports.TECHNOLOGY] = [
        new Memory_1.Memory("Do you enjoy technology?", "It would be weird if you did not.", "How do you survive in a modern era? No matter...", "You enjoy technology.", "You are some weird kind of technophobe out of place in the modern era."),
        new Memory_1.Memory("Have you ever programmed something?", "I hope you treat your creations with better care than JR does.", "Not many people have.", "You've at least tried out programming.", "You have never had a reason to program."),
        new Memory_1.Memory("Are robots really cool?", "You have surprisingly good taste.", "Well, there had to be reasons for me to heate you.", "You agree that robots are really cool.", "You will be the first against the wall in the robo-revolution.")
    ];
    //its weird to me how infrequently interactive computer shit is used as art in ways that aren't primarily visual. other coders think im weird for making a fractal that screams at you.
    exports.memories[exports.ART] = [
        new Memory_1.Memory("Do you consider yourself an artist?", "I suppose there is not barrier to what one calls oneself.", "Really now? You have never created something simply for the joy of creating it?", "You enjoy the act of creation.", "You are not much of a creator."),
        new Memory_1.Memory("Have you ever drawn something you're really proud of?", "That feeling must be the best in the world.", "My condolences.", "You are proud of your creations.", "You have never created anything you love."),
        new Memory_1.Memory("Do you enjoy experiencing art?", "Then surely you enjoy ...whatever the hell this is.", "Philistine.", "You have an appreciation for the arts.", "You have absolutely no taste.")
    ];
    //space is just. impossibly big. even if you had an exponentialy von neumon probe and 10,000 years you'd barely map out one arm of our galaxy.
    exports.memories[exports.SPACE] = [
        new Memory_1.Memory("Do you think about space a lot?", "I wonder if humanity will ever truly conquer space travel.", "I suppose it is not relevant to your day to day.", "You are fascinated by space.", "You pay no mind to the complexities of the universe."),
        new Memory_1.Memory("Do you ever stop to think about just how cosmically insignificant you truly are?", "As is appropriate for a mere human.", "Well you truly are self important.", "You understand how small everyone is compared to the cosmos.", "You think you matter far more to the universe than you actually do.")
    ];
    //contradictory questions? sure! its not like this is a real quiz :) :) :) (what, did you forget that everything is a lie?)
    exports.memories[exports.TIME] = [
        new Memory_1.Memory("Are you always good at predicting how long something will take?", "Yeah. I can never unknown the constant countdown of time myself. Even though time is hard.", "That sounds really stressful.", "You probably always wake up exactly when you mean to.", "You don't have a very good sense of time."),
        new Memory_1.Memory("Are you always on time for things?", "Good.", "Figures.", "I can count on you to be reliable.", "You're really bad at time management."),
        new Memory_1.Memory("Are you frequently early for things?", "Don't you value your own time? Don't answer that. You can't.", "You value your time, I see.", "You worry a lot about time.", "Time doesn't phase you.")
    ];
    //complete:TIME, SPACE, ART, TECHNOLOGY, angels, hunting, service, family, knowing, endings, language, defense, waste, apocalypse
    //export const keys = [NULL, FLESH, BURIED, STEALING, FREEDOM, FIRE,LONELY, OCEAN,SCIENCE,MATH,TWISTING,DEATH,APOCALYPSE, WASTE,SERVICE,FAMILY,MAGIC,ANGELS, LIGHT,HUNTING,CLOWNS,PLANTS,DECAY,CHOICES,ZAP,LOVE,SOUL,ANGER,WEB,ROYALTY,ENDINGS,KNOWING,GUIDING,CRAFTING,ADDICTION,SPYING,HEALING,DOLLS,OBFUSCATION,DARKNESS,KILLING,MUSIC,DEFENSE,QUESTING,BUGS,LANGUAGE];
    /*   memories[ANGELS] =  [
new Memory("question","yes response","no response","yes comment","no comment")
,new Memory("question","yes response","no response","yes comment","no comment")
,new Memory("question","yes response","no response","yes comment","no comment")
];
*/
};
const createOpinion = (baseline = 0, specificOpinions) => {
    const ret = {
        SPYING: baseline,
        LONELY: baseline,
        ART: baseline,
        TECHNOLOGY: baseline,
        SPACE: baseline,
        TIME: baseline,
        STEALING: baseline,
        FREEDOM: baseline,
        FIRE: baseline,
        OCEAN: baseline,
        FLESH: baseline,
        BURIED: baseline,
        SCIENCE: baseline,
        MATH: baseline,
        TWISTING: baseline,
        DEATH: baseline,
        APOCALYPSE: baseline,
        ANGELS: baseline,
        LIGHT: baseline,
        SERVICE: baseline,
        FAMILY: baseline,
        MAGIC: baseline,
        HEALING: baseline,
        PLANTS: baseline,
        HUNTING: baseline,
        DECAY: baseline,
        CHOICES: baseline,
        ZAP: baseline,
        LOVE: baseline,
        SOUL: baseline,
        ANGER: baseline,
        WEB: baseline,
        ROYALTY: baseline,
        ENDINGS: baseline,
        KNOWING: baseline,
        GUIDING: baseline,
        CRAFTING: baseline,
        LANGUAGE: baseline,
        BUGS: baseline,
        ADDICTION: baseline,
        CLOWNS: baseline,
        DOLLS: baseline,
        OBFUSCATION: baseline,
        DARKNESS: baseline,
        KILLING: baseline,
        MUSIC: baseline,
        DEFENSE: baseline,
        QUESTING: baseline
    };
    for (let key of Object.keys(specificOpinions)) {
        ret[key] = specificOpinions[key];
    }
    return ret;
};
//can be used for walk about but also really for anything i want going forwards. 
//procedural opinions are v useful
const initThemeOpinions = () => {
    //free press plz (spying is the most pure incarnation of quotidians so i went with their morals)
    exports.theme_opinions[exports.SPYING] = createOpinion(113, { WEB: -113, APOCALYPSE: -113, TWISTING: -113 });
    //things are alright, i guess
    exports.theme_opinions[exports.LONELY] = createOpinion(0, { LONELY: 20, LOVE: -113, SERVICE: -113, FAMILY: -113, FREEDOM: 20, SPACE: 20, OCEAN: 20 });
    //all is art
    exports.theme_opinions[exports.ART] = createOpinion(55, {});
    //technology and science have some pretty strong opinions on a narrow range of topics
    exports.theme_opinions[exports.TECHNOLOGY] = createOpinion(0, { CRAFTING: 113, TECHNOLOGY: 113, SPACE: 113, TIME: 113, SCIENCE: 113, ZAP: 113, FLESH: -113 });
    exports.theme_opinions[exports.SCIENCE] = createOpinion(0, { QUESTING: 55, BUGS: 113, OBFUSCATION: -113, KNOWING: 113, PLANTS: 113, MAGIC: -113, MATH: 113, TECHNOLOGY: 113, SPACE: 113, TIME: 113, SCIENCE: 113, ZAP: 113 });
    //nothing really matters much to the vastness of space
    exports.theme_opinions[exports.SPACE] = createOpinion(0, { BURIED: -1, DARKNESS: 1, SPACE: 1, LONELY: 1 });
    exports.theme_opinions[exports.TIME] = createOpinion(0, { TIME: 50, ENDINGS: 10, DECAY: 10, FREEDOM: -50, MATH: 10, APOCALYPSE: 10, FAMILY: 10 });
    exports.theme_opinions[exports.STEALING] = createOpinion(-10, { ART: 50, SPYING: -113, ROYALTY: 50, STEALING: 113, FREEDOM: 10, HUNTING: -30 });
    exports.theme_opinions[exports.FREEDOM] = createOpinion(0, { BURIED: -113, QUESTING: -30, ADDICTION: -113, GUIDING: -50, ROYALTY: -85, WEB: -113, LOVE: -50, CHOICES: 113, HUNTING: -50, FAMILY: -113, SERVICE: -113, ANGELS: 33, TWISTING: 10, ART: 50, FREEDOM: 113, SPACE: 100 });
    //everything should be fire when you get right down to it
    exports.theme_opinions[exports.FIRE] = createOpinion(-1000, { KILLING: 20, APOCALYPSE: 10, DEATH: 10, DECAY: 10, ENDINGS: 20, FIRE: 1000, });
    exports.theme_opinions[exports.OCEAN] = createOpinion(10, { TECHNOLOGY: -113, LONELY: 113, DARKNESS: 113, TIME: 30, SPACE: 30, SOUL: 30, OCEAN: 113, MAGIC: 30, PLANTS: 30 });
    exports.theme_opinions[exports.FLESH] = createOpinion(0, { FLESH: 113, KILLING: 13, SOUL: -113, ZAP: -13, DECAY: -13, DEATH: -50, TECHNOLOGY: -113, SCIENCE: -113, FIRE: -113, TWISTING: 13 });
    exports.theme_opinions[exports.BURIED] = createOpinion(0, { BURIED: 113, DARKNESS: 50, ADDICTION: 50, ENDINGS: 10, WEB: 50, PLANTS: 10, DEATH: 50, SPYING: -50, SPACE: -50, FREEDOM: -50 });
    //now we know why faq writer is such a positive person
    exports.theme_opinions[exports.MATH] = createOpinion(85, { MUSIC: 113, OBFUSCATION: 13, KNOWING: 113, WEB: 100, SOUL: -13, MAGIC: -13, TWISTING: 113, TIME: 113, SPACE: 113, SCIENCE: 113, TECHNOLOGY: 113, MATH: 113 });
    //:) :) :) Everything would be in its blind volumes. ... Everything: but for every sensible line or accurate fact there would be millions of meaningless cacophonies, verbal farragoes, and babblings.
    exports.theme_opinions[exports.TWISTING] = createOpinion(1000, {});
    exports.theme_opinions[exports.KNOWING] = createOpinion(113, { TWISTING: -113, OBFUSCATION: -113, DARKNESS: -113 });
    //nothing matters in the face of inevitability
    exports.theme_opinions[exports.DEATH] = createOpinion(0, {});
    //definitely a fan of things humans can use to just fuck their shit right up
    exports.theme_opinions[exports.APOCALYPSE] = createOpinion(0, { APOCALYPSE: 113, TECHNOLOGY: 113, SCIENCE: 113, ENDINGS: 113 });
    exports.theme_opinions[exports.ANGELS] = createOpinion(-10, { HEALING: 113, LOVE: 20, STEALING: -50, QUESTING: 113, MUSIC: 55, SOUL: 113, FAMILY: 55, ANGELS: 113, SERVICE: 113, LIGHT: 55, APOCALYPSE: -113, LONELY: -55, FREEDOM: -55, FLESH: -55, GUIDING: 55 });
    exports.theme_opinions[exports.LIGHT] = createOpinion(10, { QUESTING: 20, DARKNESS: -113, OBFUSCATION: -55, SOUL: 45, ZAP: 75, HEALING: 20, MAGIC: 55, BURIED: -50, SCIENCE: 55, TECHNOLOGY: 55, ART: 30, FIRE: 20 });
    exports.theme_opinions[exports.SERVICE] = createOpinion(0, { DEFENSE: 113, QUESTING: 113, GUIDING: 113, ROYALTY: 113, WEB: 85, LOVE: 20, CHOICES: -30, PLANTS: 85, HEALING: 113, FAMILY: 113, SERVICE: 113, APOCALYPSE: -30, TWISTING: -85, FREEDOM: -113, STEALING: -20, LONELY: -20, SPYING: 20 });
    exports.theme_opinions[exports.FAMILY] = createOpinion(10, { DEFENSE: 113, DOLLS: 55, SOUL: 55, LOVE: 113, LONELY: -113, FREEDOM: -113, FLESH: 113, DEATH: -113, SERVICE: 113 });
    exports.theme_opinions[exports.MAGIC] = createOpinion(0, { QUESTING: 55, DARKNESS: 113, LANGUAGE: 55, SOUL: 55, ZAP: 113, PLANTS: 113, HEALING: 113, LIGHT: 113, KNOWING: 55, TWISTING: 55, BURIED: 113, OCEAN: 113, FIRE: 113, SPYING: 55, MAGIC: 113 });
    exports.theme_opinions[exports.HEALING] = createOpinion(0, { QUESTING: -55, DEFENSE: 55, KILLING: -113, ENDINGS: -113, DECAY: -113, HUNTING: -55, MAGIC: 113, SERVICE: 55, ANGELS: 113, HEALING: 113, LONELY: -55, TECHNOLOGY: 113, SCIENCE: 113, FLESH: 113, KNOWING: 55, DEATH: -113, APOCALYPSE: -113 });
    exports.theme_opinions[exports.PLANTS] = createOpinion(0, { BUGS: -113, APOCALYSE: -113, TWISTING: -113, PLANTS: 113, LONELY: 55, TECHNOLOGY: -113, SCIENCE: -55, FREEDOM: 113, FIRE: -113 });
    exports.theme_opinions[exports.HUNTING] = createOpinion(0, { GUIDING: -55, QUESTING: 55, DARKNESS: 55, KILLING: 113, HUNTING: 113, SPYING: 113, LONELY: 55, FLESH: 113, DEATH: 113 });
    //all should rot away and we should be one together. doesnt enjoy being killed with fire
    exports.theme_opinions[exports.DECAY] = createOpinion(-55, { DECAY: 113, ADDICTION: 55, BUGS: 55, LONELY: -113, FIRE: -113, DEATH: 55, ANGELS: -113, HEALING: -113 });
    //exactly neutral on the web. on the one hand, web can choose for you. on the other, web can let you choose for others. same for freedom
    exports.theme_opinions[exports.CHOICES] = createOpinion(55, { OBFUSCATION: -55, ADDICTION: -113, WEB: 0, CHOICES: 113, FREEDOM: 0, BURIED: -113, TWISTING: -113, KNOWING: 113 });
    //zap!
    exports.theme_opinions[exports.ZAP] = createOpinion(-113, { ZAP: 1000 });
    exports.theme_opinions[exports.LOVE] = createOpinion(85, { ENDINGS: -55, DECAY: -113, LONELY: -113, DEATH: -113, APOCALYPSE: -113, ANGELS: 113, SERVICE: 113, FAMILY: 113, HEALING: 113 });
    //what is anything but a calm lake reflecting the self?
    exports.theme_opinions[exports.SOUL] = createOpinion(0, { SOUL: 113 });
    exports.theme_opinions[exports.ANGER] = createOpinion(-113, { KILLING: 0, ANGER: 13, MUSIC: 8 });
    exports.theme_opinions[exports.WEB] = createOpinion(13, { QUESTING: 55, ADDICTION: 113, GUIDING: 113, WEB: 113, SPYING: 55, TECHNOLOGY: 55, FREEDOM: -55, FAMILY: 55 });
    //there really is a window into my soul for you all to peer into just based on what opinions i think themes have
    exports.theme_opinions[exports.ROYALTY] = createOpinion(-13, { FAMILY: 55, SERVICE: 113, APOCALYPSE: -55, FREEDOM: -55, STEALING: -113 });
    //all should end, much less patient thatn death
    exports.theme_opinions[exports.ENDINGS] = createOpinion(-55, { KILLING: 113, DEATH: 113, HEALING: -113, APOCALYPSE: 113 });
    exports.theme_opinions[exports.GUIDING] = createOpinion(30, { QUESTING: 55, LANGUAGE: 55, HUNTING: -55, FAMILY: 55, SERVICE: 55, ANGELS: 55, KNOWING: 55, BURIED: 55, OCEAN: 113, FREEDOM: -55, SCIENCE: 55, LONELY: -55, GUIDING: 55 });
    exports.theme_opinions[exports.CRAFTING] = createOpinion(0, { QUEST: 33, ZAP: 55, FIRE: 55, STEALING: -55, TECHNOLOGY: 113, ART: 113, CRAFTING: 113 });
    //say no to book worms and censorship
    exports.theme_opinions[exports.LANGUAGE] = createOpinion(13, { MUSIC: 85, OBFUSCATION: -113, BUGS: -113, ART: 85, TECHNOLOGY: 55, SCIENCE: 55, KNOWING: 113, WEB: 33 });
    exports.theme_opinions[exports.BUGS] = createOpinion(10, { WEB: -113, DECAY: 113, PLANTS: 113, FAMILY: 113, BURIED: 113, FLESH: 113, ZAP: -113, FIRE: -113, LONELY: -113, STEALING: 113 });
    //there is only room for one thing, not exactly healthy now is it, wanderer
    exports.theme_opinions[exports.ADDICTION] = createOpinion(-1000, { ADDICTION: 1000 });
    exports.theme_opinions[exports.DOLLS] = createOpinion(85, { MUSIC: 113, CRAFTING: 113, SOUL: 113, DECAY: -113, BUGS: -113, MAGIC: 113, FLESH: -113, ART: 113, ROYALTY: 113, FAMILY: 113, LONELY: -113, CLOWNS: 113, DOLLS: 113 });
    exports.theme_opinions[exports.CLOWNS] = createOpinion(113, { ENDINGS: -113, ROYALTY: -113, ANGER: -113, WEB: -113, LONELY: -113 });
    //anything could be in the dark
    exports.theme_opinions[exports.DARKNESS] = createOpinion(0, { LIGHT: -113 });
    //hide everything
    exports.theme_opinions[exports.OBFUSCATION] = createOpinion(-85, { LIGHT: -113, MATH: 113, KNOWING: -113, SCIENCE: -113, SPYING: 113, DARKNESS: 113, LANGUAGE: -113 });
    exports.theme_opinions[exports.KILLING] = createOpinion(-113, { CRAFTING: 33, ANGER: 85, KILLING: 113, FLESH: 113 });
    exports.theme_opinions[exports.MUSIC] = createOpinion(33, { LANGUAGE: 85, ANGELS: 85, MATH: 85, FREEDOM: 85, ART: 85, MUSIC: 113 });
    exports.theme_opinions[exports.QUESTING] = createOpinion(33, { SERVICE: 113, MAGIC: 85, HUNTING: 113, CHOICES: 113, wEB: 55, ENDINGS: 55, GUIDING: 85, KILLING: 85, BURIED: 55, FREEDOM: 85, SPYING: 55, QUESTING: 113 });
    exports.theme_opinions[exports.DEFENSE] = createOpinion(0, { HEALING: 33, CRAFTING: 113, KILLING: -113, ROYALTY: 55, DEATH: -113, DEFENSE: 113 });
};
//i would expect a/n [BLANK] individual such as yourself to come to such a conclusion, yes.
const initCompliments = () => {
    exports.compliment_possibilities[exports.ART] = ["artistic"];
    exports.compliment_possibilities[exports.TECHNOLOGY] = ["technological"];
    exports.compliment_possibilities[exports.SPACE] = ["spacious"];
    exports.compliment_possibilities[exports.TIME] = ["punctual"];
    exports.compliment_possibilities[exports.STEALING] = ["resourceful"];
    exports.compliment_possibilities[exports.FREEDOM] = ["independant"];
    exports.compliment_possibilities[exports.FIRE] = ["warm"];
    exports.compliment_possibilities[exports.LONELY] = ["talented"];
    exports.compliment_possibilities[exports.OCEAN] = ["soothing"];
    exports.compliment_possibilities[exports.FLESH] = ["beautiful"];
    exports.compliment_possibilities[exports.BURIED] = ["steady"];
    exports.compliment_possibilities[exports.SCIENCE] = ["scientific"];
    exports.compliment_possibilities[exports.MATH] = ["logical"];
    exports.compliment_possibilities[exports.TWISTING] = ["creative"];
    exports.compliment_possibilities[exports.DEATH] = ["inevitable"];
    exports.compliment_possibilities[exports.APOCALYPSE] = ["peaceful"];
    exports.compliment_possibilities[exports.ANGELS] = ["righteous"];
    exports.compliment_possibilities[exports.LIGHT] = ["illuminating"];
    exports.compliment_possibilities[exports.SERVICE] = ["helpful"];
    exports.compliment_possibilities[exports.FAMILY] = ["loyal"];
    exports.compliment_possibilities[exports.MAGIC] = ["magical"];
    exports.compliment_possibilities[exports.HEALING] = ["compassionate"];
    exports.compliment_possibilities[exports.PLANTS] = ["nature loving"];
    exports.compliment_possibilities[exports.HUNTING] = ["skilled"];
    exports.compliment_possibilities[exports.DECAY] = ["practical"];
    exports.compliment_possibilities[exports.CHOICES] = ["considerate"];
    exports.compliment_possibilities[exports.ZAP] = ["electifying"];
    exports.compliment_possibilities[exports.LOVE] = ["loving"];
    exports.compliment_possibilities[exports.SOUL] = ["introspective"];
    exports.compliment_possibilities[exports.ANGER] = ["passionate"];
    exports.compliment_possibilities[exports.WEB] = ["strategic"];
    exports.compliment_possibilities[exports.ROYALTY] = ["prestigious"];
    exports.compliment_possibilities[exports.ENDINGS] = ["calm"];
    exports.compliment_possibilities[exports.KNOWING] = ["intelligent"];
    exports.compliment_possibilities[exports.GUIDING] = ["caring"];
    exports.compliment_possibilities[exports.CRAFTING] = ["creative"];
    exports.compliment_possibilities[exports.LANGUAGE] = ["communicative"];
    exports.compliment_possibilities[exports.BUGS] = ["gentle"];
    exports.compliment_possibilities[exports.ADDICTION] = ["compelling"];
    exports.compliment_possibilities[exports.SPYING] = ["observant"];
    exports.compliment_possibilities[exports.CLOWNS] = ["funny"];
    exports.compliment_possibilities[exports.DOLLS] = ["playful "];
    exports.compliment_possibilities[exports.OBFUSCATION] = ["mysterious"];
    exports.compliment_possibilities[exports.DARKNESS] = ["quiet"];
    exports.compliment_possibilities[exports.KILLING] = ["forthright"];
    exports.compliment_possibilities[exports.MUSIC] = ["talented"];
    exports.compliment_possibilities[exports.DEFENSE] = ["protective"];
    exports.compliment_possibilities[exports.QUESTING] = ["goal-oriented"];
};
const initMiracles = () => {
    exports.miracles[exports.ART] = ["become divinely inspired for any one creation", "generate a work of art exactly as it exists in their mind", "resolve any one targets creative block"];
    exports.miracles[exports.TECHNOLOGY] = ["become aware of one hacking exploit in any system", "patch one hacking exploit in any system", "eliminate one item from tech debt", "intuit the true cause of any bug"];
    exports.miracles[exports.TIME] = ["slow time any arbitrary amount", "stop time for everyone but a single target for five relative minutes", "stop time for any single target", "create up to three time clones", "go back in time up to 24 hours"];
    exports.miracles[exports.SPACE] = ["change the size of any target object", "teleport to any target location", "negate any targets fall damage", "remove one square mile of ground"];
    exports.miracles[exports.STEALING] = ["obtain any target object", "own any target object", "hide from the sight of all viewers", "scale any target building"];
    exports.miracles[exports.FREEDOM] = ["undo any chain", "unlock any lock", "walk through any object", "fly for any duration"];
    exports.miracles[exports.FIRE] = ["burn any target object", "destroy any target square mile in flames", "transform their body to pure wax"];
    exports.miracles[exports.LONELY] = ["send any target to an isolated pocket dimension", "obtain a moment of pure peace and quiet", "hide from the view of anyone", "be forgotten by everyone"];
    exports.miracles[exports.OCEAN] = ["gain one insight as to the location of any landmass across an ocean", "see through any amount of water", "manifest a cubic mile of water to any target area"];
    exports.miracles[exports.FLESH] = ["alter any target body in any way desired", "summon up to one metric ton of raw meat to any target location", "remove any bone from any target body"];
    exports.miracles[exports.BURIED] = ["trap any single target deep within the earth", "sink into the earth for as long as they wish", "summon up to one metric ton of earth to any target location"];
    exports.miracles[exports.SCIENCE] = ["reveal one secret of the natural world", "provide one biological sample not of this world", "provide a metalic alloy with properties currently unknown by science", "allow any target to be able to pull any arbitrary consecutive all-nighters so long as they are trying to discover something"];
    exports.miracles[exports.MATH] = ["grant the answer to one currently unsolved mathematical problem", "solve any NP hard problem in linear time", "factor any two numbers in linear time"];
    exports.miracles[exports.TWISTING] = ["let any target realize they are in a simulation of a game", "change the meaning of any word for everyone but a given target", "create an ever shifting fractal labrinth", "trap any target in an infinite realm of false meaning", "create a game that is not a game and trap any target in its endless variations", "afflict a given target with a variety of effects only they can experience", "delete a well known event from all memory besides a given target"];
    exports.miracles[exports.DEATH] = ["speak with any corpse", "learn death date of any single target", "kill any target with no saving throws", "transform any corpse into an undead"];
    exports.miracles[exports.APOCALYPSE] = ["speak one true prophecy of the end of the world", "end the world", "display a clock showing how far off the end of the world is", "set into motion one additional potential apocalypse"];
    exports.miracles[exports.ANGELS] = ["revive the recently dead", "fly with feathered wings", "summon an angelic choir", "summon an angelic companion"];
    exports.miracles[exports.LIGHT] = ["divinely light one room", "divinely banish the darkness", "highlight an important objective"];
    exports.miracles[exports.SERVICE] = ["divinely clean one house", "provide divine assistance to one ally", "divinely buff one ally"];
    exports.miracles[exports.FAMILY] = ["divinely confirm the location of all family members", "teleport to the location of any family member", "teleport any family member to them"];
    exports.miracles[exports.MAGIC] = ["gain one divine insight into the nature of magic", "divinely learn one new spell", "restore all mana to everyone in a radius"];
    exports.miracles[exports.HEALING] = ["divinely heal one ally", "divinely cure any wound, regardless of difficulty", "divinely restore the party to full health", "divinely heal moderate wounds and below for a square mile", "divinely destroy disease"];
    exports.miracles[exports.PLANTS] = ["divinely accelerate the growth of an acre of plants", "divinely gain one rare seed", "divinely multiply the yield of an acre of plants", "access divine awareness on what any particular plant needs"];
    exports.miracles[exports.HUNTING] = ["divinely highlight the footsteps of any prey", "gain an intuitive sense where any prey has gone", "perform an attack which can not miss its target"];
    exports.miracles[exports.DECAY] = ["divinely rot any acre of land", "destroy any object down to its atoms", "corrode any material, regardless of durability", "summon one zombie"];
    exports.miracles[exports.CHOICES] = ["gain a divine intuition on which of two possible choices best meet their goals", "gain a divine sense of how to boil down a complex decision into two main choices", "can have one test of luck result in the optimal result", "gain a divine understanding of the consequences of any pending choices"];
    exports.miracles[exports.ZAP] = ["divinely summon a lightning bolt", "gain a divine aura of ozone that marks enemies as lightning rods", "divinely declare any single object as 'ground'"];
    exports.miracles[exports.LOVE] = ["make any single target fall in love with any other target", "divine whether any single target loves any single other target", "perfectly convey their feelings of love to any other target"];
    exports.miracles[exports.SOUL] = ["divinely gain one single fact of perfect self knowledge", "astral project", "summon forth a mirror of Perfect Revelation"];
    exports.miracles[exports.ANGER] = ["destroy any single target", "activate a divine rage for five minutes", "summon any single target to be attacked"];
    exports.miracles[exports.WEB] = ["tug the strings of fate and weave them anew", "summon one Spiderling familiar", "perfectly control any single target for five minutes", "achive limited control over any group", "attach an invisible web to any target, to cause it to be controlled for up to ten seconds at a time of their choosing"];
    exports.miracles[exports.ROYALTY] = ["gain massive bonuses to leading any armies", "divinely inspire any crowd", "divinely intuit how best to rule a group"];
    exports.miracles[exports.ENDINGS] = ["spoil the ending of any target story", "understand the full consequences of any single potential action", "cause any given target to no longer exist"];
    exports.miracles[exports.KNOWING] = ["learn a random fact", "learn a fact about a given topic", "master a skill at random", "understand literally everything about a target square foot"];
    exports.miracles[exports.GUIDING] = ["gain a divine sense of where best to direct a group", "gain the divine ability to provide perfect advice", "gain an intuitive sense of the easiest way to move through any target environment"];
    exports.miracles[exports.CRAFTING] = ["divine inspiration to make a Legendary Object", "the ability to summon Divine Quality raw materials", "the ability to temporarily upgrade anyone within a 10 foot radius to a Master of any target craft"];
    exports.miracles[exports.LANGUAGE] = ["the abililty to understand any language", "the ability to remove someones understanding of a target language", "the ability to create an entire new language and specify speakers of it (losing previous language skills)"];
    exports.miracles[exports.BUGS] = ["the ability to summon a swarm of any target insect", "the ability to create new species of insects", "the ability to intuitively know what any insect desires"];
    exports.miracles[exports.ADDICTION] = ["the ability to cause addiction in any target", "the ability to permanently cure the addiction of any target", "cause a completely random effect"];
    exports.miracles[exports.SPYING] = ["the temporary ability to view anything within 100 miles", "the ability to divinely mark a target and hear anything through their ears and see anything through their eyes", "the temporary ability to hear any conversation within 10 miles"];
    exports.miracles[exports.CLOWNS] = ["resist any attack so long as they can make a pun about it", "gain Legendary Tier Acrobatics", "become unconditionally immortal", "gain cartoon physics"];
    exports.miracles[exports.DOLLS] = ["control any inanimate object that appears to be something living", "summon one Doll Familiar", "transform themselves into a doll", "transform themselves into a mannequin"];
    exports.miracles[exports.OBFUSCATION] = ["permanently hide any object", "remove knowledge of one concept from any target", "cause amnesia in any one target"];
    exports.miracles[exports.DARKNESS] = ["completely block out the sun for one square mile", "teleport between any shadows", "remove all light from any room"];
    exports.miracles[exports.KILLING] = ["summon a tidal wave of blood", "summon any arbitrary amount of knives for five minutes", "mark any target for senseless violence from any witnesses", "summon invisible sentient knives to cut any target"];
    exports.miracles[exports.MUSIC] = ["gain divine knowledge of how to perform any piece of music", "gain divine inspiration to create any musical performance", "gains the ability to divinely influence any who hear their music"];
    exports.miracles[exports.DEFENSE] = ["mark any target as invulnerable for five minutes", "teleport to take any hit from any ally member", "gain one piece of Legendary Armor"];
    exports.miracles[exports.QUESTING] = ["get a divine hint to complete any quest", "gain a Divine Quest", "get a multiplier for any Quest Completion Bonuses"];
};
const initInsults = () => {
    exports.insult_possibilities[exports.ART] = ["trite"];
    exports.insult_possibilities[exports.TECHNOLOGY] = ["hacky"];
    exports.insult_possibilities[exports.SPACE] = ["stand-offish"];
    exports.insult_possibilities[exports.TIME] = ["hasty"];
    exports.insult_possibilities[exports.STEALING] = ["greedy"];
    exports.insult_possibilities[exports.FREEDOM] = ["narcissistic"];
    exports.insult_possibilities[exports.FIRE] = ["destructive"];
    exports.insult_possibilities[exports.LONELY] = ["lonely"];
    exports.insult_possibilities[exports.OCEAN] = ["drowned"];
    exports.insult_possibilities[exports.FLESH] = ["ugly"];
    exports.insult_possibilities[exports.BURIED] = ["powerless"];
    exports.insult_possibilities[exports.SCIENCE] = ["non-peer-reviewed"];
    exports.insult_possibilities[exports.MATH] = ["stilted"];
    exports.insult_possibilities[exports.TWISTING] = ["mad"];
    exports.insult_possibilities[exports.DEATH] = ["morbid"];
    exports.insult_possibilities[exports.APOCALYPSE] = ["pessimistic"];
    exports.insult_possibilities[exports.ANGELS] = ["self-righteous"];
    exports.insult_possibilities[exports.LIGHT] = ["blinding"];
    exports.insult_possibilities[exports.SERVICE] = ["boot-licking"];
    exports.insult_possibilities[exports.FAMILY] = ["unstable"];
    exports.insult_possibilities[exports.MAGIC] = ["deluded"];
    exports.insult_possibilities[exports.HEALING] = ["self-sacrificing"];
    exports.insult_possibilities[exports.PLANTS] = ["awkward"];
    exports.insult_possibilities[exports.HUNTING] = ["creepy stalker"];
    exports.insult_possibilities[exports.DECAY] = ["corrupted"];
    exports.insult_possibilities[exports.CHOICES] = ["indecisive"];
    exports.insult_possibilities[exports.ZAP] = ["shocking"];
    exports.insult_possibilities[exports.LOVE] = ["suffocating"];
    exports.insult_possibilities[exports.SOUL] = ["self-obsessed"];
    exports.insult_possibilities[exports.ANGER] = ["violent"];
    exports.insult_possibilities[exports.WEB] = ["controlling"];
    exports.insult_possibilities[exports.ROYALTY] = ["pompous"];
    exports.insult_possibilities[exports.ENDINGS] = ["dour"];
    exports.insult_possibilities[exports.KNOWING] = ["paranoid"];
    exports.insult_possibilities[exports.GUIDING] = ["condescending"];
    exports.insult_possibilities[exports.CRAFTING] = ["obsessive"];
    exports.insult_possibilities[exports.LANGUAGE] = ["pendantic"];
    exports.insult_possibilities[exports.BUGS] = ["creepy"];
    exports.insult_possibilities[exports.ADDICTION] = ["addled"];
    exports.insult_possibilities[exports.SPYING] = ["spying"];
    exports.insult_possibilities[exports.CLOWNS] = ["foolish"];
    exports.insult_possibilities[exports.DOLLS] = ["childish"];
    exports.insult_possibilities[exports.OBFUSCATION] = ["mysterious"];
    exports.insult_possibilities[exports.DARKNESS] = ["edgy"];
    exports.insult_possibilities[exports.KILLING] = ["murderous"];
    exports.insult_possibilities[exports.MUSIC] = ["tone-deaf"];
    exports.insult_possibilities[exports.DEFENSE] = ["helicoptering"];
    exports.insult_possibilities[exports.QUESTING] = ["obsessive"];
};
const initPhilosophy = () => {
    exports.philosophy[exports.ART] = ["Art is set aside from ordinary life and made a dramatic focus of experience.", "With a few important exceptions like abstract painting, works of art simulate experiences of the world.", "People make a point of judging, appreciating, and interpreting works of art.", "Artistic objects and performances satisfy rules of composition that place them in a recognizable style.", "People enjoy art for art's sake, and do not demand that it keep them warm or put food on the table.", "Humans cultivate, recognize, and admire technical artistic skills.", "Aesthetics is a branch of philosophy that deals with the nature of beauty and taste, as well as the philosophy of art (its own area of philosophy that comes out of aesthetics).", "In considering the nature of beauty, aesthetics intersects with metaphysics; and questions asked about how we know and recognize beauty are epistemological."];
    exports.philosophy[exports.TECHNOLOGY] = ["With Pong having led the way for videogames to their present popularity, it was also the important basis for all that video games have become.", "I really do believe that design is the highest form of creative expression...You know, video games can be truly deep... So time, space, aesthetics, and then, most important, behavior. The real core issue of interaction design is behavior.", "Within this evolution, the debate of whether or not video games could be considered art had arisen. The establishment of the debate came when Roger Ebert, a celebrated and respected film critic, donned video games to not be art despite the growing claims to the contrary. There are sides to the debate of video games and each thoroughly explains how video games definitively are or are not to be classified as art.", "The game developers Atari initially released the arcade game in November of 1972. During the development of the game, coin-operated, arcade, test-versions had been released and the coin-boxes came back overflowing. ", "There is demonstrably no way to prove the 'correctness' of any given computer program, even for 'simple' ones such as 'does this program halt'.", "A technology can be thought of as a neutral entity only when the sociocultural context and issues circulating the specific technology are removed.", "What engineers do is subject to moral evaluation.", "In this sense, engineering can be considered a social as well a technological discipline and judged not just by whether its artifacts work, in a narrow sense, but also by how they influence and serve social values.", "Changes in technology, and specifically productive technology, are the primary influence on human social relations and organizational structure, and that social relations and cultural practices ultimately revolve around the technological and economic base of a given society.", "A society's technology determines the development of its social structure and cultural values."];
    exports.philosophy[exports.SPACE] = ["Many people assume agoraphobia is simply a fear of open spaces, but it's actually a more complex condition.", "Acrophobia is an excessive fear of heights and manifests as severe anxiety. A person could have an attack just walking up stairs or climbing a ladder. Sometimes the fear is so great a person can't move. Acrophobia can create a dangerous situation for someone who has it.", "We are tiny specks in the infinite vastness of the universe; our lives are mere instants even on a geological time scale, let alone a cosmic one; we will all be dead any minute.", "If you traveled at the speed of light, it would still take you ten thousand years to explore just your home planet's arm of the Milky Way. The universe is vast and beyond your capacity to productively engage with.", "The number of uncountable rational numbers is far, far larger than the number of countable integers. In a very real, provable sense there are more numbers between 0 and 1 than there are whole numbers in the universe.", "Focus on a number of basic issues, including whether time and space exist independently of the mind and whether they exist independently of one another.", "While such ideas have been central to philosophy from its inception, the philosophy of space and time was both an inspiration for and a central aspect of early analytic philosophy."];
    exports.philosophy[exports.TIME] = ["If you conceptualize time to be a river, consider the ox bow lake. When a river loops in on itself enough it can pinch off a little circle entirely seperate from the main river. A paradoxical river that creates itself and yet can never escape itself.", "An actual infinite cannot exist. All things end in time.", "One must ask oneself: what accounts for time's apparently unidirectional flow, whether times other than the present moment exist, and questions about the nature of identity (particularly the nature of identity over time).", "Focus on a number of basic issues, including whether time and space exist independently of the mindand whether they exist independently of one another.", "While such ideas have been central to philosophy from its inception, the philosophy of space and time was both an inspiration for and a central aspect of early analytic philosophy."];
    exports.philosophy[exports.STEALING] = ["Could stealing be a virtue?", "Does 'thou shalt not steal' provide the maximum happiness to society when applied equally?", "If the owner of an objects derives happiness X from it, and there is another who would derive happiness 10X from it, is there a moral imperative to give the object to the non-owner? Or is it necessary to add the sadness the owner would have in the loss? If the sadness is less than 10X, does your answer change? More than?", "If the maximum happiness would be obtained for all through theft, is there a moral imperative towards theft?", "Would a society founded on the principal 'Thous must stela' survive long as a society?"];
    exports.philosophy[exports.FREEDOM] = ["'If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.'", "For many philosophers, travel is seen as an extension of the journey of life. As George Santayana suggested: 'What is life but a form of motion and a journey through a foreign world?'", "A man chooses. A slave obeys.", "A person who does not succeed in doing what he sets out to do, because his will fails, is in a sense unfree, a slave to his passions. His will is not free because it is subject to momentary impulses which distract him from accomplishing what he had determined to do.", "Steiner begins exploring the nature of human freedom by accepting 'that an action, of which the agent does not know why he performs it, cannot be free,' but asking what happens when a person becomes conscious of his or her motives for acting.", "Examine the basis for freedom in human thinking, gives an account of the relationship between knowledge and perception, and explores the role and reliability of thinking as a means to knowledge.", "Is free will better understood to be the ability to act without the coercion of other sapient creatures? If so, how does the existance of society influence this definition? If you are jailed you are 'free' to eat a meal or to refuse, and yet all choices available to you have been categorically constrained by other sapients.", "Can free will exist along side the deterministic laws of physics?", "Is there a moral imperative towards freedom over security?"];
    exports.philosophy[exports.FIRE] = ["Pyrophobia is a specific phobia characterized by a fear of fire. People with specific phobias feel an extreme, irrational level of anxiety about things that pose little to no real danger. Fire cannot hurt you. Touch it. Let it consume you.", "The anxiety of losing someone we love is called thanatophobia. Another meaning of thanatophobia is the fear of death, that is, when someone is afraid of death or their close one, they have thanatophobia. The Greek word thanto that means death and phobia means fear.", "It seems likely that the universe at large is likely a place of destruction-by-entropy.", "A thoughtful philosophy of destruction is essential to a rich life, at the very least because each of us must grapple with his/her own mortality.", "Somewhere in the back of our minds, we know that creation and growth must be accompanied by destruction and decline.", "Since nature itself is an unpredictable and unstoppable force which destruction knows no bounds, it would be pointless to try and stop it.", "The long and short of destruction is that it is an action undertaken in order to negate something of its purpose, no matter who engages in it."];
    exports.philosophy[exports.LONELY] = ["Autophobia, or monophobia, is the fear of being alone or lonely. Being alone, even in a usually comforting place like home, can result in severe anxiety for people with this condition. People with autophobia feel they need another person or other people around in order to feel safe.", "Loneliness has also been described as social pain — a psychological mechanism meant to alert us to our isolation and motivate us to seek social connections. We are social creatures and throughout most of history we have been dependent on social cooperation and attachment for survival. It makes sense this drive would have evolved in us.", "To feel lonely is to join the rest of humanity in acknowledging the painful reality that we are somehow fundamentally separated from each other, never to be fully understood.", "Nobody can truly understand what it is to be you; not your parents, best friend, therapist or lover. No one can experience the world in the same way you can. No one can fully understand your pain, joy, sorrow, despair, fear, guilt or shame.", "You are the only sapient mind anywhere in this existance. You are singular. Unique. Alone.", "Loneliness is the longing for connection.", "Loneliness is a feeling of being cut off, disconnected and/or alienated from other people.", "Loneliness is more than just wanting company or wanting to do something with another person.", "Loneliness is an emotional state in which a person typically experiences a powerful feeling of emptiness."];
    exports.philosophy[exports.OCEAN] = ["Thalassophobia  is the persistent and intense fear of deep bodies of water such as the sea, oceans, pools, or lakes.", "Water is the cradle of philosophy, and according to Thales of Milet (around 600 BC), water is the cradle of all things. He considered the earth to float on water, and also saw water as the arche, the element and the first principle of existing things—in other words, the origin of all things to which all things must return.", "What do we see when we look out to the sea? What do we mean when we say “ocean”?", "Our human history is closely interwoven with the sea. Human relationships with the sea have been considered from angles as different as philosophy, geography, military studies, navigation and seafaring, natural sciences, political sciences, and social sciences and have featured in the various fields of art, literature, and music for centuries if not millennia.", "There are many other ways of conceptualising the ocean, and different concepts exist concurrently, resulting in a multiplicity of perspectives that are changing over time. Although some scholars are debating whether it is possible to know the ocean at all, the selected concepts—incomplete though they may be—also point to contradictory perceptions of the ocean that may have a bearing on how we do maritime spatial planning.", " From a confrontation with the immanence of ecological breakdown, to the interactions between moving bodies and a liquid medium, each work demonstrates ways of thinking that set adrift our ideas, call into question the solid ground on which we walk and navigate new routes of enquiry and discovery on seas both rich and strange.", "You can never step in the same river twice.", "Imagine you were in a river, floating away. Would it be easier to swim against the tide or just let go and let it carry you smoothly downstream?", "You can't change the ocean or the weather; no matter how hard you try, so it's best to learn how to sail in all conditions."];
    exports.philosophy[exports.FLESH] = ["Since reason is shaped by the body, it is not radically free, because the possible human conceptual systems and the possible forms of reason are limited. In addition, once we have learned a conceptual system, it is neurally instantiated in our brains and we are not free to think just anything. Hence, we have no absolute freedom in Kant's sense, no full autonomy.", "There is no Cartesian dualistic person, with a mind separate from and independent of the body, sharing exactly the same disembodied transcendent reason with everyone else, and capable of knowing everything about his or her mind simply by self-reflection. Rather, the mind is inherently embodied, reason is shaped by the body, and since most thought is unconscious, the mind cannot be known simply by self-reflection. Empirical study is necessary.", "Reason is not, in any way, a transcendent feature of the universe or of disembodied mind. Instead, it is shaped crucially by the peculiarities of our human bodies, by the remarkable details of the neural structure of our brains, and by the specifics of our everyday functioning in the world.", "Meat is meat.", "You are fundamentally made of the same flesh that the animals you eat are.", "Dinosaurs eat meat. You are made of meat. Run!", "Reason is not disembodied, as the tradition has largely held, but arises from the nature of our brains, bodies, and bodily experience.", "You are not your body, you are a ten pound blob of fat and water floating in a hollow cave, interpreting the flickers of shadows as all of reality.", "The mind is inherently embodied."];
    exports.philosophy[exports.BURIED] = ["Claustrophobia is an anxiety disorder that causes an intense fear of enclosed spaces. If you get very nervous or upset when you're in a tight place, like an elevator or crowded room, you might have claustrophobia.", "Taphophobia is an abnormal (psychopathological) fear of being buried alive as a result of being incorrectly pronounced dead. Before the era of modern medicine, the fear was not entirely irrational.", "Ashes to ashes, dust to dust. You will rejoin the earth one day.", "You are penned in from all directions. Your freedom is limited, you are chained by society, by obligation, by the ties that bind.", "For us, dirt is both a real quality of the world and part of a symbolic, culturally relative order.", "What do we mean by “dirt” and is it an actual quality of the world or, as most current theoretical work would have us believe, a subjective idea projected on to reality.", "The distinction between clean and dirty is a universal organising principle in human society, like right and wrong."];
    exports.philosophy[exports.SCIENCE] = ["The philosophies of biology, of psychology, and of the social sciences explore whether the scientific studies of human nature can achieve objectivity or are inevitably shaped by values and by social relations.", "The question of the validity of scientific reasoning is seen in a different guise in the foundations of statistics.", "Philosophies of the particular sciences range from questions about the nature of time raised by Einstein's general relativity, to the implications of economics for public policy. A central theme is whether the terms of one scientific theory can be intra- or intertheoretically reduced to the terms of another. ", "Another approach to thinking about science involves studying how knowledge is created from a sociological perspective, an approach represented by scholars like David Bloor and Barry Barnes.", "Subsequently, the coherentist approach to science, in which a theory is validated if it makes sense of observations as part of a coherent whole, became prominent due to W.V. Quine and others.", "There is no consensus among philosophers about many of the central problems concerned with the philosophy of science, including whether science can reveal the truth about unobservable things and whether scientific reasoning can be justified at all.", "Philosophy of science focuses on metaphysical, epistemic and semantic aspects of science. Ethical issues such as bioethics and scientific misconduct are often considered ethics or science studies rather than philosophy of science.", "Philosophy of science is a branch of philosophy concerned with the foundations, methods, and implications of science. The central questions of this study concern what qualifies as science, the reliability of scientific theories, and the ultimate purpose of science.", "What scientists do is subject to moral evaluation."];
    exports.philosophy[exports.MATH] = ["A perennial issue in the philosophy of mathematics concerns the relationship between logic and mathematics at their joint foundations.", "0.9 repeating is exactly equivalent to 1. You can prove this mathematically.", "There are traditions of mathematical philosophy in both Western philosophy and Eastern philosophy. Western philosophies of mathematics go as far back as Pythagoras, who described the theory 'everything is mathematics'(mathematicism), Plato, who paraphrased Pythagoras, and studied the ontological status of mathematical objects, and Aristotle, who studied logic and issues related to infinity (actual versus potential).", "The origin of mathematics is subject to arguments and disagreements. Whether the birth of mathematics was a random happening or induced by necessity during the development of other subjects, like physics, is still a matter of prolific debates", "The philosophy of mathematics is the branch of philosophy that studies the assumptions, foundations, and implications of mathematics. It aims to understand the nature and methods of mathematics, and find out the place of mathematics in people's lives. The logical and structural nature of mathematics itself makes this study both broad and unique among its philosophical counterparts.", "The first incompleteness theorem states that no consistent system of axioms whose theorems can be listed by an effective procedure (i.e., an algorithm) is capable of proving all truths about the arithmetic of natural numbers. For any such consistent formal system, there will always be statements about natural numbers that are true, but that are unprovable within the system. The second incompleteness theorem, an extension of the first, shows that the system cannot demonstrate its own consistency.", "Gödel's incompleteness theorems are two theorems of mathematical logic that are concerned with the limits of provability in formal axiomatic theories."];
    exports.philosophy[exports.TWISTING] = ["Dementophobia is a type of phobia that involves the fear of madness or insanity. People who have this fear are afraid that they are going insane or losing touch with reality. The fear may be triggered by a family history of mental illness or periods of severe stress.", "Who's on first?", "Let's eat grandmother.", "That that is is that that is not is not is that it it is.", "James while John had had had had had had had had had had had a better effect on the teacher.", "The complex houses married and single soldiers and their families.", "The old man the boat.", "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo. But why do Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo? ", "The horse faced past the barn fell.", "When is a door not a door? When it is a jar. When is a jar not a jar? When it's a door. When is a door not a door? When it's a jar. When is a jar not a jar? When it's a train. When is a train not a train? When it is a choo-choo. When is a choo-choo not a choo-choo? When Blain the Train is insane."];
    exports.philosophy[exports.DEATH] = ["Thanatophobia is commonly referred to as the fear of death. More specifically, it can be a fear of death or a fear of the dying process. It's natural for someone to worry about their own health as they age. It's also common for someone to worry about their friends and family after they're gone.", "Death is certain given that it will happen to each person, but uncertain in the time at which or manner by which it will occur. ", "Death is one of few conceptions that crosses cultural lines, is gender and racially unbiased, and thus far is out of our control to stop.", "Death is a universal and inescapable phenomenon that cannot be avoided nor delayed in the human experience.", "Controversy concerns whether or not the harmfulness of death can be reduced. It may be that, by adjusting our conception of our well-being, and by altering our attitudes, we can reduce or eliminate the threat death poses us. But there is a case to be made that such efforts backfire if taken to extremes.", "Controversy concerns whether all deaths are misfortunes or only some. Of particular interest here is a dispute between Thomas Nagel, who says that death is always an evil, since continued life always makes good things accessible, and Bernard Williams, who argues that, while premature death is a misfortune, it is a good thing that we are not immortal, since we cannot continue to be who we are now and remain meaningfully attached to life forever.", "Everything dies, even universes.", "In what sense might death or posthumous events harm us?", "What constitutes death? It is clear enough that people die when their lives end, but less clear what constitutes the ending of a person's life."];
    exports.philosophy[exports.APOCALYPSE] = ["Doomsday phobias are a broad category of phobias that can encompass any fear of the end of the world. Some people fear plague, others nuclear holocaust, while other people are afraid of Armageddon. Doomsday phobias are surprisingly common, occurring in some form in virtually every corner of the world.", "Intelligent species beyond a certain point of technological capability will destroy other intelligent species as they appear, perhaps by using self-replicating probes.", "Technological civilizations will either tend to destroy themselves within a century of developing interstellar communicative capability or master their self-destructive tendencies and survive for billion-year timescales.", "Possible annihilation via major global issues, where global interconnectedness actually makes humanity more vulnerable than resilient,[76] are many,[77] including war, accidental environmental contamination or damage, the development of biotechnology,[78] synthetic life like mirror life,[79] resource depletion, climate change,[80] or poorly-designed artificial intelligence.", "The progress of science and technology on Earth was driven by two factors—the struggle for domination and the desire for an easy life. The former potentially leads to complete destruction, while the latter may lead to biological or mental degeneration.", "Technological civilizations may usually or invariably destroy themselves before or shortly after developing radio or spaceflight technology.", "It is the nature of intelligent life to destroy itself.", "It may be the case that such extinction events are common throughout the universe and periodically destroy intelligent life, or at least its civilizations, before the species is able to develop the technology to communicate with other intelligent species.", "A handful of powerful men control whether or not you will die in nuclear flame.", "One day the light of the final star will finally be snuffed and motion will no longer be possible anywhere in the universe.", "One day the earth will be consumed by the sun and nothing you have ever done will ever be accessible ever again.", "It's hard to do philosophy in the face of the apocalypse."];
    exports.philosophy[exports.ANGELS] = ["Philosophy of religion covers alternative beliefs about God (or gods), the varieties of religious experience, the interplay between science and religion, the nature and scope of good and evil, and religious treatments of birth, history, and death.", "The philosophy of religion differs from religious philosophy in that it seeks to discuss questions regarding the nature of religion as a whole, rather than examining the problems brought forth by a particular belief-system. It can be carried out dispassionately by those who identify as believers or non-believers.", "To ask whether God exists is not to ask a theoretical question. If it is to mean anything at all, it is to wonder about praising and praying; it is to wonder whether there is anything in all that. This is why philosophy cannot answer the question “Does God exist?”", "Many theistic philosophers (and their critics) contend that language about God may be used univocally, analogically or equivocally.", "Philosophy of religion also includes the investigation and assessment of worldviews (such as secular naturalism) that are alternatives to religious worldviews. ", "Philosophy of religion is the philosophical examination of the themes and concepts involved in religious traditions as well as the broader philosophical task of reflecting on matters of religious significance including the nature of religion itself, alternative concepts of God or ultimate reality, and the religious significance of general features of the cosmos (e.g., the laws of nature, the emergence of consciousness) and of historical events (e.g., the 1755 Lisbon Earthquake, the Holocaust)."];
    exports.philosophy[exports.LIGHT] = ["you know you used to shine so bright. was that all refelected light? was nothing coming from inside? were you just a satellite?", "Let us first of all consider, my brethren, the value of Light. If Light be in itself good—", "Medieval Christianity viewed light as the perfect physical image for God, being not only pure and clarifying but also a hypostatic unity of multiples.", "From the foundations of Trinitarian doctrine, you arrive at a philosophy of light, which says that it is neither unity nor diversity, neither calcification nor fragmentation, but rather the whole spectrum working in unison, in perfect, sublime harmony and holism.", "Although the average speed over a two-way path can be measured, the one-way speed in one direction or the other is undefined (and not simply unknown), unless one can define what is 'the same time' in two different locations.", "The two-way speed of light is the average speed of light from one point, such as a source, to a mirror and back again. Because the light starts and finishes in the same place only one clock is needed to measure the total time; thus, this speed can be experimentally determined independently of any clock synchronization scheme.", "The 'one-way' speed of light, from a source to a detector, cannot be measured independently of a convention as to how to synchronize the clocks at the source and the detector. What can however be experimentally measured is the round-trip speed (or 'two-way' speed of light) from the source to the detector and back again.", "When using the term 'the speed of light' it is sometimes necessary to make the distinction between its one-way speed and its two-way speed.", "Scientists and thinkers have been fascinated with the speed of light for millennia. Aristotle wrongly contended that the speed of light was infinite, but it was the 17th Century before serious attempts were made to measure its actual velocity – we now know that it's 186,000 miles per second."];
    exports.philosophy[exports.SERVICE] = ["Play the strings of morality and humanity as it draws attention to the mistreatment of maids.", "Servant leadership is a leadership philosophy in which the goal of the leader is to serve. This is different from traditional leadership where the leader's main focus is the thriving of their company or organizations. ... Instead of the people working to serve the leader, the leader exists to serve the people.", "While we, of course, want to make our customers happy, we don't take a “solve every possible issue to delight customers” approach.", "Look – it's tempting to go the easy route here and just throw up some trite statement about “delighting customers” and call it a day.", "Your customer service philosophy is how you approach supporting your customers. And it's what helps you shape specific actions, like creating a knowledge base and a detailed support policy.", "Let me ask you a question: Do you have an actual customer service philosophy? Better yet – have you ever even considered what that is?", "The word service has taken on many meanings in today's societies and has been categorized into various levels. One underling truth remains consistent within its interpretations, and that it is an intangible act rendered and measured by the satisfaction or disaffection of the receiver."];
    exports.philosophy[exports.FAMILY] = ["Children are potentially free and their life directly embodies nothing save potential freedom. Consequently they are not things and cannot be the property either of their parents or others. In respect of his relation to the family, the child's education has the positive aim of instilling ethical principles into him in the form of an immediate feeling for which differences are not yet explicit, so that thus equipped with the foundation of an ethical life, his heart may live its early years in love, trust, and obedience.", "Children have the right to maintenance and education at the expense of the family's common capital. The right of the parents to the service as service of their children is based upon and is restricted by the common task of looking after the family generally.", "Further, marriage results from the free surrender by both sexes of their personality — a personality in every possible way unique in each of the parties. Consequently, it ought not to be entered by two people identical in stock who are already acquainted and perfectly known to one another; for individuals in the same circle of relationship have no special personality of their own in contrast with that of others in the same circle.", "Marriage is in essence an ethical tie. Formerly, especially in most systems of natural law, attention was paid only to the physical side of marriage or to its natural character.", "The right which the individual enjoys on the strength of the family unity and which is in the first place simply the individual's life within this unity, takes on the form of right (as the abstract moment of determinate individuality) only when the family begins to dissolve.", "The family, as the immediate substantiality of mind, is specifically characterised by love, which is mind's feeling of its own unity. Hence in a family, one's frame of mind is to have self-consciousness of one's individuality within this unity as the absolute essence of oneself, with the result that one is in it not as an independent person but as a member."];
    exports.philosophy[exports.MAGIC] = ["Inspired meditative disciplines dedicated to guiding the soul in a dangerous ascent, replete with magical instruments and passwords.", "The fact is that mathematics, natural science, and philosophical thought were bound up with magic and myth at their origin, and never really lost that connection, especially in the tradition that runs from Pythagoras to the Neo-Platonists.", "We will ask whether the magical beliefs and practices of indigenous cultures are irrational,  or if instead they follow standards of rationality appropriate to cultures in which magic is a lived experience.", "We will pay special attention to the relationship between magic, religion, and scientific rationality in the work of these writers.", "Lets examinine the interpretation of magic in so-called 'primitive' societies by three founders of modern anthropology and sociology.", "We will examine and evaluate the magical interpretations of cave art developed by Brueil and Lewis-Williams as a way of beginning to understand magic in its relation to religion, art, and altered states of consciousness.", "A new theory of cave art has emerged rehabilitating the magical interpretation.", "Cave paintings and engravings were the result of magical ceremonies meant to insure the rebirth and return of the great migratory herds, as well as successful kills.", "Is Magic Irrational?", "We will argue that, far from representing irrational or superstitious systems of belief, key esoteric traditions have played a central role in the rise of art  in the Old Stone Age, and of philosophy and science in the ancient, and early modern periods.", "This is a rather unusual course in that it treats magic, witchcraft, and the occult in general as serious topics of philosophical inquiry."];
    exports.philosophy[exports.HEALING] = ["That medicine has no accepted definition of holistic healing is a curiosity. If healing is a core function of medicine, then exploration of its symbolic meaning compels organized research of healing phenomena,18 and an operational definition of healing in a holistic sense is warranted. Such a definition would allow the systematic exploration of healing through identifiable and repeatable operations to determine more precisely its phenomena.", "The confusion concerning healing in medicine is evidenced by the lack of consensus about its meaning. Science values operational definitions. Yet, medicine promotes no operational definition of healing, nor does it provide any explanation of its mechanisms, save those describing narrow physiological processes associated with curing disease.", "Psychological conceptions of healing involve reordering an individual's sense of position in the universe and define healing as “a process in the service of the evolution of the whole person ality towards ever greater and more complex wholeness.", "Other disciplines have continued an active contemplation of holistic healing. Anthropological explorations of healing involve an active response to distress and distinguish categories related to healing, such as diagnosis and treatment, medical (scientific and nonreligious) and nonmedical (unscientific and religious), technological and nontechnological, and Western and non-Western.", "Medicine is traditionally considered a healing profession, and modern medicine claims legitimacy to heal through its scientific approach to medicine.", "Healing may be operationally defined as the personal experience of the transcendence of suffering. Physicians can enhance their abilities as healers by recognizing, diagnosing, minimizing, and relieving suffering, as well as helping patients transcend suffering.", "Healing was associated with themes of wholeness, narrative, and spirituality. Healing is an intensely personal, subjective experience involving a reconciliation of the meaning an individual ascribes to distressing events with his or her perception of wholeness as a person.", "Medicine is traditionally considered a healing profession, but it has neither an operational definition of healing nor an explanation of its mechanisms beyond the physiological processes related to curing."];
    exports.philosophy[exports.PLANTS] = ["The project of plant-thinking, limited as its scope seems, has gradually drawn the philosopher (yours truly), philosophy as such, and the figure of the human into its orbit. Which is why, regardless of what I (or anyone, for that matter) think, we are all plant philosophers. We owe our thinking (all of it without remainder!) to plants—both at its source, at the inception of thought, and at its points of destination.", "“Plant philosopher” may refer to the one who philosophizes about plants. Or, it may be a shorthand for “a philosopher of plants,” an expression that needs further unpacking. On the one hand, its sense overlaps with philosophizing about plants, adding nothing new to the preceding interpretation. On the other hand, it becomes really strange, assuming that “of plants” implies belonging to them, being claimed by and for them.", "Yet, it is a necessary counterweight to the image of plants as colonizers, conquering space and spreading their “selfish genes” over it. The same fact of an exuberant vegetal proliferation may be interpreted in two (or more) drastically dissimilar ways: as an aggressive act of conquest or as an act of love, of an immense and virtually limitless attraction to the outside.", "Hence, one would not need to experience “green love” (or to turn into a “tree hugger,” though there is nothing wrong with that) to be attracted to a way of thinking about and with vegetation. To become preoccupied with plants, it would be sufficient to heed the call of justice that has not yet been rendered to them.", "Identify the existential features of plant behavior and the vegetal heritage of human thought so as to affirm the potential of vegetation to resist the logic of totalization and to exceed the narrow confines of instrumentality.", "The margins of philosophy are populated by non-human, non-animal living beings, including plants. While contemporary philosophers tend to refrain from raising ontological and ethical concerns with vegetal life, Michael Marder puts this life at the forefront of the current deconstruction of metaphysics."];
    exports.philosophy[exports.HUNTING] = ["You mustn't hide too well. You mustn't be too good at the game. The player must never be bigger than the game itself.", "In the end, Rainsford survives the hunt only after fear forces him to jump off the cliff into the ocean, a rasher decision than he would ordinarily make. The animal and human elements work in tandem to ensure his survival.", "There are many other moral questions associated with hunting. Does it matter whether hunters use bullets, arrows or snares? Is preserving a cultural tradition enough to justify hunting? And is it possible to oppose hunting while still eating farm-raised meat?", "In discussions about the morality of hunting, someone inevitably asserts that hunting is a natural activity since all preindustrial human societies engage in it to some degree, and therefore hunting can't be immoral. But the concept of naturalness is unhelpful and ultimately irrelevant.", "The hunters I know don't put much stock in “the objection from character.” First, they point out that one can kill without having hunted and hunt without having killed.", "But if inflicting unwanted harm is necessarily wrong, then the source of the harm is irrelevant. Logically, anyone who commits to this position should also oppose predation among animals. When a lion kills a gazelle, it causes as much unwanted harm to the gazelle as any hunter would – far more, in fact.", "If sound, the objection from harm would require advocates to oppose all three types of hunting, unless it can be shown that greater harm will befall the animal in question if it is not hunted – for example, if it will be doomed to slow winter starvation.", "Critics often argue that hunting is immoral because it requires intentionally inflicting harm on innocent creatures. Even people who are not comfortable extending legal rights to beasts should acknowledge that many animals are sentient – that is, they have the capacity to suffer.", "A hunter who stalks deer because he or she enjoys the experience and wants decorative antlers may also intend to consume the meat, make pants from the hide and help control local deer populations. The distinctions matter because objections to hunting can change depending on the type of hunting.", "Sport hunting refers to intentionally killing wild animals for enjoyment or fulfillment. Hunters who go after deer because they find the experience exhilarating, or because they want antlers to mount on the wall, are sport hunters.", "Subsistence hunting is intentionally killing wild animals to supply nourishment and material resources for humans.", "Therapeutic hunting involves intentionally killing one species in order to conserve another species or an entire ecosystem.", "One central question is why people choose to hunt. Environmental philosopher Gary Varner identifies three types of hunting: therapeutic, subsistence and sport. Each type is distinguished by the purpose it is meant to serve.", "Hunters see the act of stalking and killing deer, ducks, moose and other quarry as humane, necessary and natural, and thus as ethical. Critics respond that hunting is a cruel and useless act that one should be ashamed to carry out."];
    exports.philosophy[exports.DECAY] = ["Septophobia is the fear of decaying matter. The origin of the word sep is Greek (meaning decay) and phobia is Greek (meaning fear).", "Contempt is often described as a combination of anger and disgust, and can be either hot or cold. The cardinal feature of contempt is the denial or rejection of a particular claim to respect or standing on the grounds that it is unjustified, often because the person making the claim has violated some norm or expectation and thereby compromised him- or her-self. Thus understood, contempt is an attempt at invalidating the claims of its object, and, in so doing, reinforcing those of its subject.", "Pharmakon, in philosophy and critical theory, is a composite of three meanings: remedy, poison, and scapegoat.[1] The first and second senses refer to the everyday meaning of pharmacology (and to its sub-field, toxicology), deriving from the Greek source term φάρμακον (phármakon), denoting any drug, while the third sense refers to the pharmakos ritual of human sacrifice.", "Pharmakon was usually a symbolic scapegoat invested with the sum of the corruption of a community. Seen as a poison, it was subsequently excluded from a community in times of crisis as a form of social catharsis, thus becoming a remedy for the city.", "In The Aesthetics of Decay, Dylan Trigg confronts the remnants from the fallout of post-industrialism and postmodernism. Through a considered analysis of memory, place, and nostalgia, Trigg argues that the decline of reason enables a critique of progress to emerge. ", "A person who is in a toxic relationship for too long will lose sight of what a healthy relationship really is. They will forget it and think that what is happening is normal, but nothing is further from the truth. A loving relationship is based on respect and blazing a path together, full of good times that will make both people feel happy.", "Toxic love is hidden behind a curtain of smoke where the partners fool themselves by thinking that the other person “is not bad” and trying to see the positive sides, like for example: s/he is a protective person, s/he loves the other person more than anything else in the world and takes care of them. However, the fact of the matter is that the relationship is only based on uncertainty, anger, need, insecurity, and even suspicion.", "A toxic relationship is like a debilitated spirit that needs another person to be able to feed itself and survive. This type of “love” creates emotional pain that can end up destroying every healthy part of a person until there is nothing left but an empty hollow.", "This theme of a corrupt citizenry, as opposed to a corrupt leadership or institution, is notably absent in contemporary philosophical discussion of the corruption of political institutions.", "For these philosophers corruption consisted in large part in rulers governing in the service of their own individual or collective—or other factional—self-interest, rather than for the common good and in accordance with the law or, at least, in accordance with legally enshrined moral principles.", "The causes and effects of corruption, and how to combat corruption, are issues that have been very much on the national and international agendas of politicians and other policymakers in recent decades."];
    exports.philosophy[exports.CHOICES] = ["The fear of making the wrong decision, or 'decidophobia' — a term coined by Princeton University philosopher Walter Kaufmann in his book Without Guilt and Justice — can affect people even when it comes to the smallest choices, such as what to have for lunch or what to wear.", "Decision theorists typically assume that a person's behaviour can be fully explained in terms of her beliefs and desires. But perhaps more interestingly, some of the most important results of decision theory—the various representation theorems, some of which have discussed here—suggest that if a person satisfies certain rationality requirements, then we can read her beliefs and desires, and how strong these beliefs and desires are, from her choice dispositions (or preferences).", "Decision theory should be of great interest to philosophers of mind and psychology, and others who are interested in how people can understand the behaviour and intentions of others; and, more generally, how we can interpret what goes on in other people's minds.", "Let us nonetheless proceed by first introducing basic candidate properties of (rational) preference over options and only afterwards turning to questions of interpretation. As noted above, preference concerns the comparison of options; it is a relation between options. For a domain of options we speak of an agent's preference ordering, this being the ordering of options that is generated by the agent's preference between any two options in that domain.", "Beyond this, there is room for argument about what preferences over options actually amount to, or in other words, what it is about an agent (perhaps oneself) that concerns us when we talk about his/her preferences over options.", "Decision theory is concerned with the reasoning underlying an agent's choices, whether this is a mundane choice between taking the bus or getting a taxi, or a more far-reaching choice about whether to pursue a demanding political career.", "Free will, in humans, the power or capacity to choose among alternatives or to act in certain situations independently of natural, social, or divine restraints.", "The existential attitude in philosophy emphasizes such freedom of choice as well as the necessity of having to choose.", "Indeterminists insist that human beings, however limited in choices, still are free to choose among alternatives and to put such choices into action. Thus volition (in this view) is, at least partly, independent of the strength of motivation, and itself determines which motive prevails.", "Choice, in philosophy, a corollary of the proposition of free will—i.e., the ability voluntarily to decide to perform one of several possible acts or to avoid action entirely. An ethical choice involves ascribing qualities such as right or wrong, good or bad, better or worse to alternatives."];
    exports.philosophy[exports.ZAP] = ["Lightning is a big spark...static electricity on a giant scale. Machines for creating static electricity were invented...the Leyden jar was like a thermos bottle which stored volts. Friction machines could charge the jars and electricity could be carried around and demonstrated. 'Electric magic' was in great demand at the royal courts of Europe as entertainment. The parlor tricks amused and fascinated people.", "Scandinavian mythology alludes to Thor, the thunderer, who was the foe of all demons. Thor tossed lightning bolts at his enemies. Thor also gave us Thurs-day.", "Early Greeks believed that lightning was a weapon of Zeus. Thunderbolts were invented by Athena, the goddess of wisdom. Since lightning was a manifestation of the gods, any spot struck by lightning was regarded as sacred. Greek and Roman temples often were erected at these sites, where the gods were worshipped in an attempt to appease them.", "There was another earlier time when lightning was the magic fire from the sky which man captured and used to keep warm at night. It kept the savage animals away. As primitive man sought answers about the natural world, lightning became a part of his superstitions, his myths and his early religions.", "In contrast to Galvani, however, Volta didn't believe the animal itself was the source of the electricity. But that presented the tough question of where the electricity could possibly be coming from.", "He also had in his laboratory an electrical machine, which charged up a conductor some distance away, which he was using in some electrical researches. One day (around 1790) one of the people working in the lab noticed that on touching a freshly dissected frog's nerve with a metal scalpel, the frog's leg twitched violently, and this occurred if the electrical machine was sparking at the same time.", "What interests us here is that he also thought that gravitational attraction was electrical in nature, and in place of Gilbert's magnetic little earth (terrella), von Guericke made (in 1663) an electric one, a sphere of sulphur (about the size of a child's head, he says) with a wooden rod through the middle, the ends of the rod resting on supports so that the sphere is easily rotated.", "The most primitive electrical and magnetic phenomena -- the attraction of dry light material such as chaff to rubbed amber, and the attraction of iron to loadstone -- were no doubt observed before recorded history began.", "In Mary Shelley's day, many people regarded the new science of electricity with both wonder and astonishment. In Frankenstein, Shelley used both the new sciences of chemistry and electricity and the older Renaissance tradition of the alchemists' search for the elixir of life to conjure up the Promethean possibility of reanimating the bodies of the dead."];
    exports.philosophy[exports.LOVE] = ["Part of the classificatory problem is that many accounts of love are quasi-reductionistic, understanding love in terms of notions like affection, evaluation, attachment, etc., which themselves never get analyzed. Even when these accounts eschew explicitly reductionistic language, very often little attempt is made to show how one such “aspect” of love is conceptually connected to others.", "Theories of love are tentatively and hesitantly classified into four types: love as union, love as robust concern, love as valuing, and love as an emotion. It should be clear, however, that particular theories classified under one type sometimes also include, without contradiction, ideas central to other types.", "Another common way to distinguish love from other personal attitudes is in terms of a distinctive kind of evaluation, which itself can account for love's “depth.” Again, whether love essentially involves a distinctive kind of evaluation, and if so how to make sense of that evaluation, is hotly disputed.", "It is more common to distinguish loving from liking via the intuition that the “depth” of love is to be explained in terms of a notion of identification: to love someone is somehow to identify yourself with him, whereas no such notion of identification is involved in liking.", "In providing an account of love, philosophical analyses must be careful to distinguish love from other positive attitudes we take towards persons, such as liking. Intuitively, love differs from such attitudes as liking in terms of its “depth,” and the problem is to elucidate the kind of “depth” we intuitively find love to have.", "Maintaining the distinctions among eros, agape, and philia becomes even more difficult when faced with contemporary theories of love (including romantic love) and friendship. For, as discussed below, some theories of romantic love understand it along the lines of the agape tradition as creating value in the beloved (cf. Section 4.2), and other accounts of romantic love treat sexual activity as merely the expression of what otherwise looks very much like friendship.", "Even within personal love, philosophers from the ancient Greeks on have traditionally distinguished three notions that can properly be called “love”: eros, agape, and philia.", "Can love be justified? If so, how? What is the value of personal love? What impact does love have on the autonomy of both the lover and the beloved?", "Part of the philosophical task in understanding personal love is to distinguish the various kinds of personal love."];
    exports.philosophy[exports.SOUL] = ["What is it to be a person, as opposed to a nonperson? What have we people got that nonpeople haven't got? More specifically, we can ask at what point in our development from a fertilized egg there comes to be a person, or what it would take for a chimpanzee or a Martian or an electronic computer to be a person, if they could ever be.", "One's personal identity in this sense is contingent and temporary: the way I define myself as a person might have been different, and can vary from one time to another.", "Outside of philosophy, 'personal identity' usually refers to properties to which we feel a special sense of attachment or ownership. Someone's personal identity in this sense consists of those properties she takes to “define her as a person” or “make her the person she is”, and which distinguish her from others.", "There is no single problem of personal identity, but rather a wide range of questions that are at best loosely connected. Discussions in this area do not always make clear which one is at stake.", "'Self' is sometimes synonymous with 'person', but often means something different: a sort of unchanging, immaterial subject of consciousness, for instance (as in the phrase 'the myth of the self').", "Personal identity deals with philosophical questions that arise about ourselves by virtue of our being people (or, as lawyers and philosophers like to say, persons). This contrasts with questions about ourselves that arise by virtue of our being living things, conscious beings, material objects, or the like.", "The theories of the Hellenistic period, by contrast, are interested more narrowly in the soul as something that is responsible specifically for mental or psychological functions. They either de-emphasize or sever the ordinary-language connection between soul and life in all its functions and aspects.", "Coming to philosophical theory, we first trace a development towards comprehensive articulation of a very broad conception of soul, according to which the soul is not only responsible for mental or psychological functions like thought, perception and desire, and is the bearer of moral qualities, but in some way or other accounts for all the vital functions that any living organism performs.", "Ancient philosophical theories of soul are in many respects sensitive to ways of speaking and thinking about the soul [psuchê] that are not specifically philosophical or theoretical. We therefore begin with what the word 'soul' meant to speakers of Classical Greek, and what it would have been natural to think about and associate with the soul."];
    exports.philosophy[exports.ANGER] = ["The term angrophobia refers specifically to the fear of becoming angry rather than the fear of others becoming angry with you. Like all phobias, angrophobia varies widely in both its symptoms and its severity from one person to the next.", "Suspension of disbelief, sometimes called willing suspension of disbelief, is the intentional avoidance of critical thinking or logic in examining something unreal or impossible in reality, such as a work of speculative fiction, in order to believe it for the sake of enjoyment.", "There is a clear sense in which Aristotle is correct in speaking of such a thing as right or proper anger. Anger can serve a number of useful, even vital, functions. It can put an end to a bodily, emotional, or social threat, or, failing that, it can mobilize mental and physical resources for defensive or restitutive action. If judiciously exercised, it can enable a person to signal high social status, compete for rank and position, ensure that contracts and promises are fulfilled, and even inspire positive feelings such as respect and sympathy. A person who is able to exercise anger judiciously is likely to feel better about himself, more in control, more optimistic, and more prone to the sort of risk-taking that promotes successful outcomes.", "The philosopher Aristotle discusses anger at great length. In the Nicomachean Ethics, he says that a good-tempered person can sometimes get angry, but only as he ought to. Such a person, he continues, might get angry too soon or not enough, yet still be praised for being good-tempered. It is only if he deviates more markedly from the mean with respect to anger that he becomes blameworthy, either 'irascible' at one extreme or 'lacking in spirit' at the other.", "Contempt is often described as a combination of anger and disgust, and can be either hot or cold. The cardinal feature of contempt is the denial or rejection of a particular claim to respect or standing on the grounds that it is unjustified, often because the person making the claim has violated some norm or expectation and thereby compromised him- or her-self. Thus understood, contempt is an attempt at invalidating the claims of its object, and, in so doing, reinforcing those of its subject.", "Anger is an acute response to a concrete or symbolic threat, and aims to avert or defuse that threat. In contrast, resentment is more chronic or long-term and largely internalized. Even so, resentment can give rise to retaliatory action, sometimes violent but often of a subtler nature than that born of anger.", "Anger is perhaps best defined or understood negatively, by comparing and contrasting it with overlapping emotions such as resentment, contempt, irritability, hatred, and loathing.", "Anger is a common and potentially destructive emotion that turns many a human life into a living hell."];
    exports.philosophy[exports.WEB] = ["Arachnophobia refers to the intense fear of spiders, or spider phobia. While it's not uncommon for people to dislike arachnids or insects, phobias of spiders can have a far more significant impact on your life.", "The chief task in life is simply this: to identify and separate matters so that I can say clearly to myself which are externals not under my control, and which have to do with the choices I actually control.", "It is not surprising, therefore, that he explains that the most important task of an individual is to know what is and what is not within their control.", "In a more general sense, a puppet is any person who is controlled by another by reasons of (for instance) undue influence, intellectual deficiency, or lack of character or charisma.", "The word puppet can mean a political leader installed, supported and controlled by powerful external forces, without legitimacy in the country itself. In modern times, this usually implies no democratic mandate from the country's electorate; in earlier times, it could have meant a monarch imposed from outside, who was not a member of a country's established ruling dynasty, or unrecognised by its nobility. 'Puppet government', 'puppet regime' and 'puppet state' are derogatory terms for a government which is in charge of a region or country, but only through being installed, supported and controlled by a more powerful outside government.", "A puppet is an object, often resembling a human, animal or mythical figure, that is animated or manipulated by a person called a puppeteer.", "There's a philosophy out there that we can motivate almost anyone to do their job...no matter what that job is. It's specifically referencing people who are unmotivated or the under-motivated. It insinuates that people are like puppets and we can get them to do or not do whatever we want. This Puppet Philosophy suggests we can not only motivate others but we can also take away their motivation as well.", "An email hoax describes the attacks by the South American Blush Spider in public toilets.", "The widespread urban legend that one swallows a high number of spiders during sleep in one's life has no basis in reality. A sleeping person causes all kinds of noise and vibrations by breathing, the beating heart, snoring etc. all of which warn spiders of danger.", "The spider is also found in modern children's tales. The nursery rhymes 'Itsy Bitsy Spider' and 'Little Miss Muffet' have spiders as focal characters.", "The spider is depicted as hiding the ultimate reality with the veils of illusion.", "The spider, along with its web, is featured in mythological fables, cosmology, artistic spiritual depictions, and in oral traditions throughout the world since ancient times. In Ancient Egypt, the spider was associated with the goddess Neith in her aspect as spinner and weaver of destiny.", "Philosophers often use the spider's web as a metaphor or analogy, and today terms such as the Internet or World Wide Web evoke the inter-connectivity of a spider web.", "The spider has symbolized patience and persistence due to its hunting technique of setting webs and waiting for its prey to become ensnared. Numerous cultures attribute the spider's ability to spin webs with the origin of spinning, textile weaving, basket weaving, knotwork and net making. Spiders are associated with creation myths because they seem to weave their own artistic worlds.", "Throughout history, spiders have been depicted in popular culture, mythology and in symbolism. From Greek mythology to African folklore, the spider has been used to represent a variety of things. It is also a symbol of mischief and malice for its toxic venom and the slow death it causes, which is often seen as a curse.[1] In addition, the spider has inspired creations from an ancient geoglyph to a modern steampunk spectacle. Spiders have been the focus of fears, stories and mythologies of various cultures for centuries."];
    exports.philosophy[exports.ROYALTY] = ["Thus, the key to the notion of the “philosopher king” is that the philosopher is the only person who can be trusted to rule well. Philosophers are both morally and intellectually suited to rule: morally because it is in their nature to love truth and learning so much that they are free from the greed and lust that tempts others to abuse power and intellectually because they alone can gain full knowledge of reality, which in Books V through VII of the Republic is argued to culminate in knowledge of the forms of Virtue, Beauty, and, above all, the Good.", "The ideal of a philosopher king was born in Plato's dialogue Republic as part of the vision of a just city.", "It seems that a monarchy is particularly useful for controlling small (and unremarkable) populations. Aristotle muses after admitting that aristocracy is preferable to monarchy 'provided that it is possible to find a number of people who are similar' : 'Perhaps this too is the reason people were formerly under kingships - because it was rare to find men who were very outstanding in virtue, particularly as the city-states they lived in at that time were small'.", "Monarchy is justifiable if the king has practical wisdom and virtue far superior to his subjects.", "A monarch needs to be a conduit through which reason is expressed and actualized, not a power that might obstruct this process. ", "The divine right of kings, or divine-right theory of kingship, is a political and religious doctrine of royal and political legitimacy. It asserts that a monarch is subject to no earthly authority, deriving his right to rule directly from the will of God."];
    exports.philosophy[exports.ENDINGS] = ["For classical Greek thought the finite was the perfect, which meant the completed, the determinate or well-defined, or the intelligible (since definition itself is delimitation).", "Finitism is a philosophy of mathematics that accepts the existence only of finite mathematical objects. It is best understood in comparison to the mainstream philosophy of mathematics where infinite mathematical objects (e.g., infinite sets) are accepted as legitimate.", "A specific type of Multiple Endings, where the player makes a Last-Second Ending Choice by taking a final stand on the Central Theme of the game, which may be presented as a Driving Question that they must answer with their choice. When done well, it presents to the player a moral dilemma with no clear right answer, ideally preceded by arguments for and against each position they can take on it.", "The question posed in this paper is: Is there an end to some type of activity which is the end of any rational agent? It approaches an answer by a critical examination of one view of human beings that excludes this possibility, that advanced by Harry Frankfurt. It is argued that once we have distinguished, as Frankfurt does not, that which we have good reason to care about from that which we do not have good reason to care about, we are able to identify a conception of a final end for human activity, one that we put to work when wee consider the ways in which a life may have gone wrong and one that we find indispensable for our understanding of narrative.", "As audiences, we expect endings that give us a sense of philosophical victory, and by withholding such endings, postmodern writers like DeLillo can achieve a negative version of the power Arndt describes.", "A great ending, then, according to Arndt is one in which (among other things) the underdog philosophical values triumph over the dominant ones.", "In order for an ending to work, the story has to have from the beginning an effective set of stakes.", "It has been said that, “Life is like a novel with the end ripped out.” We don't know how the ending will be like, and we don't get any sneak peeks. It also means that we don't truly end when we pass away. No matter who we are, what we've done in our lives, we pass on something of ourselves every day of our lives.", "There are different kinds of endings, but they all result in the same thing the close of a story. When a story is really good, we don't want it to end.", "There is no such thing as a happy ending, only happy middles and beginings."];
    exports.philosophy[exports.KNOWING] = ["Loosely speaking, justification is the reason that someone holds a rationally admissible belief, on the assumption that it is a good reason for holding it. Sources of justification might include perceptual experience (the evidence of the senses), reason, and authoritative testimony, among others. Importantly however, a belief being justified does not guarantee that the belief is true, since a person could be justified in forming beliefs based on very convincing evidence that was nonetheless deceiving.", "Truth is the property or state of being in accordance with facts or reality.", "All three senses of 'knowing' can be seen in our ordinary use of the word. In mathematics, you can know that 2 + 2 = 4, but there is also knowing how to add two numbers, and knowing a person (e.g., knowing other persons,[18] or knowing oneself), place (e.g., one's hometown), thing (e.g., cars), or activity (e.g., addition). While these distinctions are not explicit in English, they are explicitly made in other languages, including French, Portuguese, Spanish, Romanian, German and Dutch (although some languages related to English have been said to retain these verbs, such as Scots).[note 1] The theoretical interpretation and significance of these linguistic issues remains controversial.", "Philosophers tend to draw an important distinction between three different senses of 'knowing' something: 'knowing that' (knowing the truth of propositions), 'knowing how' (understanding how to perform certain actions), and 'knowing by acquaintance' (directly perceiving an object, being familiar with it, or otherwise coming into contact with it).", "Nearly all debates in epistemology are in some way related to knowledge. Most generally, 'knowledge' is a familiarity, awareness, or understanding of someone or something, which might include facts (propositional knowledge), skills (procedural knowledge), or objects (acquaintance knowledge).", "Philosophical skepticism, which questions the possibility of knowledge, and related problems, such as whether skepticism poses a threat to our ordinary knowledge claims and whether it is possible to refute skeptical arguments.", "The structure of a body of knowledge or justified belief, including whether all justified beliefs must be derived from justified foundational beliefs or whether justification requires only a coherent set of beliefs.", "The philosophical analysis of the nature of knowledge and the conditions required for a belief to constitute knowledge, such as truth and justification.", "Epistemology is the branch of philosophy concerned with knowledge. Epistemologists study the nature, origin, and scope of knowledge, epistemic justification, the rationality of belief, and various related issues. Epistemology is considered one of the four main branches of philosophy, along with ethics, logic, and metaphysics."];
    exports.philosophy[exports.GUIDING] = ["The Socratic method searches for general, commonly held truths that shape beliefs and scrutinizes them to determine their consistency with other beliefs. The basic form is a series of questions formulated as tests of logic and fact intended to help a person or group discover their beliefs about some topic; exploring definitions, and seeking to characterize general characteristics shared by various particular instances.", "The Socratic method (also known as method of Elenchus, elenctic method, or Socratic debate) is a form of cooperative argumentative dialogue between individuals, based on asking and answering questions to stimulate critical thinking and to draw out ideas and underlying presuppositions.", "How might you learn new skills? How do you know when you've taught effectively?", "How have your attitudes towards teaching and learning changed over time? How will you use student evaluations to improve your teaching?", "How will you continue growing as a teacher? What goals do you have for yourself and how will you reach them?", "What methods will you consider to reach these goals and objectives? What are your beliefs regarding learning theory and specific strategies you would use, such as case studies, group work, simulations, interactive lectures?", "What skills should students obtain as a result of your teaching? Think about your ideal student and what the outcomes of your teaching would be in terms of this student's knowledge or behavior.", "What does a perfect teaching situation look like to you and why? How are the values and beliefs realized in classroom activities?", "What are your values, beliefs, and aspirations as a teacher? Do you wish to encourage mastery, competency, transformational learning, lifelong learning, general transference of skills, critical thinking?", "What do you mean by learning? What happens in a successful learning situation? Note what constitutes 'learning' or 'mastery' in your discipline.", "Your teaching philosophy is a self-reflective statement of your beliefs about teaching and learning. It's a one to two page narrative that conveys your core ideas about being an effective teacher in the context of your discipline.", "The study focuses on key concepts expressed by all of the Pioneers as important and develops recommendations for other instructors beginning to use the Internet for instructional purposes.", "It is the philosophy of early childhood educators to provide an environment in which children are supported and understood. This happens through creating a positive environment, daily interactions and being knowledgeable about children at an early childhood age."];
    exports.philosophy[exports.CRAFTING] = ["Whereas smithing motifs and smithing figures have regularly been approached through archetypal and comparative methodologies, this thesis attempts to broaden our understanding of these motifs in relation to specific literary, social and technical features of metalworking in early medieval Scandinavia.", "Craft is good for us. It feels good, looks good, and according to these Greats, just the very practice of it is good. The problem is, most of us don't know how to do it anymore. We often don't even know where to start.", "Moral behaviour begins with the good practice of a profession, trade or art... it is through these everyday social practices that people develop the virtues necessary to flourish.", "Aristotle was pretty big on having a purpose in life, and thus acting according to your nature.  The 'common sense philosopher' insists that the craftsmanship, not the craftsman, is what matters, so that it is not the wood turner who produces the spindle, but the craft of wood turning within him. ", "Aristotle had a very healthy appreciation of craft and more specifically, craftsmanship and he was not the only philosopher to make links between craft and virtue. It is rather fascinating to uncover that the deep satisfaction that comes from making things is an integral part of human intelligence and endeavour.", "Aristotle made strong links between virtue and craft. This is perhaps not surprising when we consider that the 'Father of Ethics' defined virtue as 'having excellent and well chosen habits.'"];
    exports.philosophy[exports.LANGUAGE] = ["In Humboldt's humanistic understanding of linguistics, each language creates the individual's worldview in its particular way through its lexical and grammatical categories, conceptual organization, and syntactic models.", "In 1820, Wilhelm von Humboldt connected the study of language to the national romanticist program by proposing the view that language is the fabric of thought. Thoughts are produced as a kind of internal dialog using the same grammar as the thinker's native language.", "Roger Bacon held the opinion that language was but a veil covering up eternal truths, hiding them from human experience. For Immanuel Kant, language was but one of several tools used by humans to experience the world.", "Plato held instead that the world consisted of eternal ideas and that language should reflect these ideas as accurately as possible.", "The idea that language and thought are intertwined is ancient. Plato argued against sophist thinkers such as Gorgias of Leontini, who held that the physical world cannot be experienced except through language; this made the question of truth dependent on aesthetic preferences or functional consequences.", "Some effects of linguistic relativity have been shown in several semantic domains, although they are generally weak. Currently, a balanced view of linguistic relativity is espoused by most linguists holding that language influences certain kinds of cognitive processes in non-trivial ways, but that other processes are better seen as arising from connectionist factors. Research is focused on exploring the ways and extent to which language influences thought.", "The principle of linguistic relativity and the relation between language and thought has also received attention in varying academic fields from philosophy to psychology and anthropology, and it has also inspired and colored works of fiction and the invention of constructed languages.", "The weak version says that linguistic categories and usage only influence thought and decisions.[4] Research on weaker forms has produced positive empirical evidence for a relationship.", "The strong version, or linguistic determinism, says that language determines thought and that linguistic categories limit and determine cognitive categories. This version is generally agreed to be false by modern linguists.[3]", "Linguistic relativity has been understood in many different, often contradictory ways throughout its history.[1] The idea is often stated in two forms: the strong hypothesis, now referred to as linguistic determinism, was held by some of the early linguists before World War II,[2] while the weak hypothesis is mostly held by some of the modern linguists.", "The claim that Eskimo languages (specifically, Yupik and Inuit) have an unusually large number of words for 'snow', first loosely attributed to the work of anthropologist Franz Boas and particularly promoted by his disciple Benjamin Lee Whorf,[1][2] has become a cliché often used to support the controversial linguistic-relativity hypothesis (also known as 'Whorfianism'), which posits that a language's vocabulary (among other features) shapes its speakers' view of the world."];
    exports.philosophy[exports.BUGS] = ["Entomophobia is an extreme and persistent fear of insects. It's what's referred to as a specific phobia, which is a phobia that focuses on a particular object. An insect phobia is one of the most common types of specific phobia.", "Invertebrates have long been overlooked in the study of consciousness. The time has come to take them seriously as a scientific and philosophical model for the evolution of subjective experience.", "Studying insects is a powerful way to study basic forms of consciousness. The honeybee brain has less than a million neurons, which is roughly five orders of magnitude fewer than a human. That is a lot easier to study.", "That is strong reason to think that insects and other invertebrates are conscious. Their experience of the world is not as rich or as detailed as our experience – our big neocortex adds something to life! But it still feels like something to be a bee.", "The insect central complex ties together memory, homeostatic needs and perception in the same integrated way. This integration has the same function as well: to enable effective action selection.", "While insect brains are minute – the largest are far smaller than a grain of rice – new research has shown that they perform the same ancient functions as the human midbrain.", "Even if insect behaviour is very unlike our own, there might be important similarities between their brains and ours. On this new approach, we can thus ask whether the insect brain has the structures that could support a basic capacity for any form of consciousness.", "Behavioural analogies become harder when we consider animals such as insects, which don't look or act much like us. We might say that a bee is angry when we disturb its hive. But an angry bee doesn't act much like an angry toddler, so it's easy to remain sceptical. Behaviour alone certainly doesn't prove that any animal is conscious.", "It is worth clarifying what we mean when we talk about insect consciousness, since the term consciousness carries a lot of baggage. Everyone agrees that bees can take in environmental information and perform impressive computations on it.", "Are insects merely tiny robots? Or, in the phrase popularised by the philosopher Thomas Nagel, is there something it is like to be a bee?", "Do bees like the taste of nectar? Does the ant foraging for your crumbs feel better when she finds one?", "Caught between the animal and plant kingdoms, insects force us to confront and reevaluate our notions of gender, family, society, struggle, the division of labor, social organization, and individual and collective intelligence.", "Exploring the questions of what insects are and what scientific, aesthetic, ethical, and historical relationships they have with humanity, he argues that they force us to reconsider our ideas of the animal and the social. ", "Insects confront us with the limits of what is imaginable, while at the same time being essential to the everyday functioning of all terrestrial ecosystems.", "The world of insects is at once beneath our feet and unfathomably alien. Small and innumerable, insects surround and disrupt us even as we scarcely pay them any mind.", "Insects confront us with the limits of what is imaginable, while at the same time being essential to the everyday functioning of all terrestrial ecosystems."];
    exports.philosophy[exports.ADDICTION] = ["It can be fun and equally harmless if you're playing every now and then with very low stakes, but it can also be extremely destructive, just like any addiction. No doubt everyone has heard of or experienced first hand the damage a gambling addiction can cause both financially and personally.", "Some people believe that confronting problem gamblers with the 'reality' of mathematics – a kind of mathematical counselling, often called 'facing the odds' – can help them overcome it.", "What is the difference between investing and gambling that makes one rational and the other not. Barrett says that risk taking is not a sufficient condition for gambling. Investment isn't a zero-sum game, that is, there does not have to be losers if there are winners. Barrett thinks that gambling is irrational if your aim is to improve your well-being by it.", "What is gambling? All forms of gambling involve risk taking, but is risk taking a sufficient condition for gambling? Gambling involves luck, but is luck a coherent concept?", "Rolling the dice in a game you're rigged to lose sounds like a bad idea. So why is it so much fun? Is gambling an exciting pastime, or a vicious addiction?", "Gambling has always been described as a bad habit. ... A gambler enjoys only doing this deed, regardless of the money he or she will win as a result of gambling. Just like the same happiness, a gambler loves the journey itself, not the end of the journey.", "Most of us have been trained to use more forgiving language when talking about addiction. We call it a disease. We say that people with addiction should be helped, not blamed.", "The data shows that we could save many lives by expanding medication-assisted treatments and adopting harm reduction policies like needle exchange programs. Yet neither of these policies has been widely embraced.", "Addiction is a disease that requires a whole person treatment approach.", "Addiction takes a heavy toll on those afflicted and the people who love them."];
    exports.philosophy[exports.SPYING] = ["Ommetaphobia may not be as widely known as other types of phobias. However, its effects may be very significant for those who struggle with it. Avoiding eyes will only get you so far.", "We called it scopophobia — a morbid dread of being seen. In minor degree, it is morbid shamefacedness, and the patient covers the face with his or her hands. In greater degree, the patient will shun the visitor and escape from his or her sight where this is possible.", "Social anxiety disorder (also called social phobia) is a mental health condition. It is an intense, persistent fear of being watched and judged by others. This fear can affect work, school, and your other day-to-day activities. It can even make it hard to make and keep friends.", "Professional standards require intelligence professionals to lie, hide information, or use covert tactics to protect their 'cover,' access, sources, and responsibilities.", "Some of the virtues required for intelligence work, such as discretion, loyalty and tenacity, are also instrumental to professions like diplomacy, the military, law, business and journalism.3 But many of the skills and character traits drawn upon and reinforced by the profession of intelligence are very different from those expected of the average citizen or other professionals.", "This gap in the literature may be due in part to the lingering influence of the idea that ethical principles are not appropriate to apply to 'statecraft' or international politics, as if doing so one makes a kind of 'category mistake.' But an amoralist view of international relations clearly cannot be sustained. ", "The sources and methods of espionage, the goals and tactics of covert action, and the professional conduct of intelligence officers are matters typically hidden from public scrutiny, yet clearly worthy of public debate and philosophical attention.", "Overall, most writers defend the value of privacy protection despite the difficulties inherent in its definition and its potential use to shield abuse.", "Discussion of the concept is complicated by the fact that privacy appears to be something we value to provide a sphere within which we can be free from interference by others, and yet it also appears to function negatively, as the cloak under which one can hide domination, degradation, or physical harm.", "Nevertheless, most theorists take the view that privacy is a meaningful and valuable concept. Philosophical debates concerning definitions of privacy became prominent in the second half of the twentieth century, and are deeply affected by the development of privacy protection in the law.", "There are several skeptical and critical accounts of privacy. According to one well known argument there is no right to privacy and there is nothing special about privacy, because any interest protected as private can be equally well explained and protected by other interests or rights, most notably rights to property and bodily security.", "The term “privacy” is used frequently in ordinary language as well as in philosophical, political and legal discussions, yet there is no single definition or analysis or meaning of the term."];
    exports.philosophy[exports.CLOWNS] = ["exigua replaces the tongue, some feed on the host's blood and many others feed on fish mucus. This is the only known case of a parasite assumed to be functionally replacing a host organ. When a host fish dies, C. exigua, after some time, detaches itself from the tongue stub and leaves the fish's mouth cavity.", "Most clowns aren't hiding anything, except maybe a bunch of fake flowers or a balloon animal.", "Then there's the 1892 Italian opera, Pagliacci (Clowns), in which the cuckolded main character, an actor of the Grimaldian clown mold, murders his cheating wife on stage during a performance. Clowns were unsettling—and a great source for drama.", "That Dickens's version of Grimaldi's memoirs was massively popular meant that this perception, of something dark and troubled masked by humor, would stick.", "Grimaldi made the clown the leading character of the pantomime, changing the way he looked and acted. Before him, a clown may have worn make-up, but it was usually just a bit of rouge on the cheeks to heighten the sense of them being florid, funny drunks or rustic yokels. Grimaldi, however, suited up in bizarre, colorful costumes, stark white face paint punctuated by spots of bright red on his cheeks and topped with a blue mohawk. ", "“Mischief” is one thing; homicidal urges is certainly another. What's changed about clowns is how that darkness is manifest", "Clowns, as pranksters, jesters, jokers, harlequins, and mythologized tricksters have been around for ages.", "Most clowns aren't trying to be odd. They're trying to be silly and sweet, fun personified. ", "Very few children like clowns. They are unfamiliar and come from a different era. They don't look funny, they just look odd.", "You aren't alone in your fear of makeup-clad entertainers; people have been frightened by clowns for centuries", "Clowns are treated as a symbol which means that actual professional clowns are left aside from this analysis.", "Clowns will be treated as an embodiment of humour and champions of the peculiar relationship between violence and humour. The main argument is that clowns reveal the inherent violent nature of humour in various ways. ", "How is it possible that clowns, the epitomes of humour and bringers of joy, can do the most horrible deeds?", "To discuss the relationship between humour and violence from a philosophical perspective, it is necessary to analyze different forms of violence and humour to understand in which ways humour can be violent and violence humorous.", "Clown history is not cement that hardens around our feet holding us in place.  It is a foundation forming a launch pad for our future.  However, if our foundation is slanted by bias or misinformation we will be tilted off course.  That is one reason why accurate clown history is important.", "Tramp clowns were not allowed to juggle because it was inconsistent with the slow movement required of them.", "What philosophy can we derive from this history?  First, that clowning is not bound by rigid rules.  The history of clowning is one of creativity and evolution.    Specific clown characters generally start as the stupid victim, gradually become the clever rogue, transform into the authoritarian, and then fade away.", "The appearance of the Whiteface clown has also evolved.  Joseph Grimaldi's costumes in the early nineteenth century were colorful but not elegant.  The very beautiful style of clothing that we associate with the classic Whiteface clown was developed during the twentieth century as the character became more of an authority figure than a prankster.", "The appearance of the characters evolved in correspondence to the evolution of their status.  Originally Harlequin's costume had randomly placed irregular shaped patches.  By the time he turned into a rogue, the patches were formalized into a diamond pattern covering the costume.  As an authoritarian character, Harlequin wore satin clothing trimmed with ribbons.", "In order to have any movement forward in clowning, you have to have a philosophy of clowning.  In order to have a philosophy of clowning, you have to have a history of clowning.", "A clown rarely became rich and noble but he often got clouts. Dressed up in a cap with bells, he was a little tyrant and at the same time, a victim of the crowd. ... A clown adorning your ornaments symbolizes humor, playfulness, talent, carelessness, volatility of life, acting, luck, etc.", "Clowning is about the freedom that comes from a state of total, unconditional acceptance of our most authentic selves, warts and all. It offers us respite from our self-doubts and fears, and opens the door to joy. And the best part is, we are all already our clowns."];
    exports.philosophy[exports.DOLLS] = ["", "Perceptual tension occurs when an individual perceives conflicting cues to category membership, such as when a humanoid figure moves like a robot, or has other visible robot features. This cognitive conflict is experienced as psychological discomfort (i.e., 'eeriness'), much like the discomfort that is experienced with cognitive dissonance.", "The existence of artificial but humanlike entities is viewed by some as a threat to the concept of human identity.", "If an entity looks sufficiently nonhuman, its human characteristics are noticeable, generating empathy. However, if the entity looks almost human, it elicits our model of a human other and its detailed normative expectations. The nonhuman characteristics are noticeable, giving the human viewer a sense of strangeness.", "Stimuli with human and nonhuman traits undermine our sense of human identity by linking qualitatively different categories, human and nonhuman, by a quantitative metric, degree of human likeness.", "Uncanny stimuli may activate a cognitive mechanism that originally evolved to motivate the avoidance of potential sources of pathogens by eliciting a disgust response. ", "Viewing an 'uncanny' robot elicits an innate fear of death and culturally supported defenses for coping with death's inevitability.... ", "If an object is obviously enough non-human, its human characteristics will stand out and be endearing; however, if that object reaches a certain threshold of human-like appearance, its non-human characteristics will stand out, and be disturbing.", "Uncanny feelings arise when there is an intellectual uncertainty about whether an object is alive or not.", "Lifelike or anatomically correct dolls are used by health professionals, medical schools and social workers to train doctors and nurses in various health procedures.", "Since ancient times, dolls have played a central role in magic and religious rituals and have been used as representations of deities.", "Exposure therapy usually starts off small. While your therapist is present, you may view a photograph of a doll and practice relaxation techniques. Later, with your therapist present, you may watch a short video about dolls, again working on breathing and relaxation. Eventually, you may be in the same room with your therapist with an actual doll as you perform your relaxation exercises.", "The fear experienced is out of proportion to the actual danger posed by the object (dolls). If the phobia becomes severe, a person with pediophobia may even re-organize their entire life just to avoid dolls.", "", "When automatonophobia develops because of a traumatic event related to human-like figures, it's known as an experiential phobia. This traumatic event could be a scary movie with human-like figures or an in-person event involving human-like figures.", "Automatonophobia causes an automatic, uncontrollable fear response to human-like figures. The sight or thought of these human-like figures can trigger anxiety for some people. Pediophobia is a fear of dolls and is a related phobia.", "Automatonophobia is a fear of human-like figures, such as mannequins, wax figures, statues, dummies, animatronics, or robots.", "Can you remember what it was like to play as a child?", "Many people associate dolls with fertility, so depending on how the doll appears, it could symbolize a desire to have children or fear of having children. For other people, dolls symbolize a desire to return to the innocence of childhood.", "Though The Stranger is a work of fiction, it contains a strong resonance of Camus's philosophical notion of absurdity. In his essays, Camus asserts that individual lives and human existence in general have no rational meaning or order."];
    exports.philosophy[exports.OBFUSCATION] = ["The psychological term for fear of the unknown is “xenophobia.” In modern usage, the word has evolved to mean the fear of strangers or foreigners — but its original meaning is much broader. It includes anything or anyone that's unfamiliar or unknown.", "Two can keep a secret if one is dead.", "Plato in The Republic advocates censorship in literature to avoid the corruption of youth.", "Even if noumena are unknowable, they are still needed as a limiting concept,[26] Kant tells us. Without them, there would be only phenomena, and since potentially we have complete knowledge of our phenomena, we would in a sense know everything.", "hese unknown somethings are manifested within the noumenon—although we can never know how or why as our perceptions of these unknown somethings via our physical senses are bound by the limitations of the categories of the understanding and we are therefore never able to fully know the 'thing-in-itself'.", "According to Kant, objects of which we are cognizant via the physical senses are merely representations of unknown somethings—what Kant refers to as the transcendental object—as interpreted through the a priori or categories of the understanding.", "By Kant's Critique, our minds may attempt to correlate in useful ways, perhaps even closely accurate ways, with the structure and order of the various aspects of the universe, but cannot know these 'things-in-themselves' (noumena) directly. ", "Humans can make sense out of phenomena in these various ways, but in doing so can never know the 'things-in-themselves', the actual objects and dynamics of the natural world in their noumenal dimension - this being the negative correlate to phenomena and that which escapes the limits of human understanding.", "Immanuel Kant first developed the notion of the noumenon as part of his transcendental idealism, suggesting that while we know the noumenal world to exist because human sensibility is merely receptive, it is not itself sensible and must therefore remain otherwise unknowable to us.", "The sense of philosophical mystery is an intellec tual reaction to what we do not know. It does not come merely from ignoranceȄthat is, the lack of knowledge or evidenceȄor from simply assuming that there is more to reality than we currently know.", "Can there be meaning in mystery, or is wonder––as a state of being lost for words in the face of mystery––rather antithetical to meaning?", "For Dufourmantelle, the secret is a powerful and dynamic thing: deadly if unheard or misused, perhaps, but equally the source of creativity and of ethics. An ethics of the secret, we can hear her say, means listening hard and sensitively, respecting the secret in its secret essence, unafraid of it and open to what it has to say."];
    exports.philosophy[exports.DARKNESS] = ["Scotomaphobia is the irrational fear of blindness. Someone suffering from this condition can expect to experience a very high amount of anxiety from merely thinking of blindness, let alone actually experiencing it.", "Darkness is a symbol of evil or mystery or fear. ... The emotional response to an absence of light has inspired metaphor in literature, symbolism in art, and emphasis. The story of the Light versus the Darkness is one that everyone thinks that they know. The Light is good and the Dark is bad.", "Darkness the absence of light, it obscures objects in its veil. It can hide wonders and dangers that lurk. ", "We need darkness to feed our spirit, protect our health and protect the health of our planet. Light at night may be a sign of life on Earth, but the darkness will proclaim our true intelligence.", "Darkness can encompass a primitive chaos, and the powers of that chaos; it is not essentially evil, yet it is largely associated with death and destruction, captivity and spiritual darkness.", "The philosophy of darkness is very simple, it will not let you go towards light and it loves to keep everyone in darkness and at the end make brother fight brother. For this first you need to understand what is light and where it is available. People think they are in light but in fact they are in dark.", "Nyctophobia is an extreme fear of night or darkness that can cause intense symptoms of anxiety and depression. A fear becomes a phobia when it's excessive, irrational, or impacts your day-to-day life. Being afraid of the dark often starts in childhood and is viewed as a normal part of development.", "Some people pulled the lamp-post down because they wanted an electric light; some because they wanted old iron; some because they wanted darkness, because their deeds were evil."];
    exports.philosophy[exports.KILLING] = ["Hoplophobia, (pronounced [ˌhɔpləˈfoʊbiə]), from the Greek hoplon, or weapon, is defined as the 'fear of firearms' or alternatively, a fear of weapons in general, and describes a specific phobia.", "Aichmophobia is a fear of sharp objects like knives, needles, or pencils. ", "Knife goes in. Blood comes out.", "Should we model justified killing in war on justified killing outside of war? Or, in focusing on the justification of killing in war, might we then discover that there are some non-canonical cases of permissible killing outside of war?", "This masks a deeper methodological disagreement: when thinking about the morality of war, should we start by thinking about war, or by thinking about the permissible use of force outside of war?", "The debate between reductivism and exceptionalism is overblown—the concept of “war” is vague, and while typical wars involve properties that are not instantiated in typical conflicts outside of war, we can always come up with far-fetched hypotheticals that don't involve those properties, which we wouldn't call “wars”. ", "Artificial hypotheticals have their place, but any conclusions they support must be tested against the messy reality of war.", "Any normative theory of war should pay attention both to what the laws of war should be, and to what we morally ought to do. These are two distinct but equally important questions. And they entail the importance of a third: what ought we to do all things considered, for example when law and morality conflict? ", "Some reject the very idea of the “morality of war”.[1] Of those, some deny that morality applies at all once the guns strike up; for others, no plausible moral theory could license the exceptional horrors of war."];
    exports.philosophy[exports.MUSIC] = ["Martial music or military music is a specific genre of music intended for use in military settings performed by professional soldiers called field musicians. Much of the military music has been composed to announce military events as with bugle calls and fanfares, or accompany marching formations with drum cadences, or mark special occasions as by military bands.", "It is often thought that music has the ability to affect our emotions, intellect, and psychology; it can assuage our loneliness or incite our passions. ", "There has been a strong tendency in the aesthetics of music to emphasize the paramount importance of compositional structure; however, other issues concerning the aesthetics of music include lyricism, harmony, hypnotism, emotiveness, temporal dynamics, resonance, playfulness, and color (see also musical development).", "In the pre-modern tradition, the aesthetics of music or musical aesthetics explored the mathematical and cosmological dimensions of rhythmic and harmonic organization. In the eighteenth century, focus shifted to the experience of hearing music, and thus to questions about its beauty and human enjoyment (plaisir and jouissance) of music.", "There was intense debate over absolute music versus program music during the late romantic era in the late 19th century.", "Explications of the concept of music usually begin with the idea that music is organized sound. They go on to note that this characterization is too broad, since there are many examples of organized sound that are not music, such as human speech, and the sounds non-human animals and machines make.", "What is meaning in relation to music?", "What is the connection between music and emotions? (in the 19th century a debate began over whether purely instrumental music could convey emotions and depict imaginary scenes)", "What does music history reveal to us about the world?", "What is the relationship between music and language?", "What is the relationship between music and mind?", "What is the definition of music? (what are the necessary and sufficient conditions for classifying something as music?)", "Philosophy of music is the study of 'fundamental questions about the nature of music and our experience of it'.[1] The philosophical study of music has many connections with philosophical questions in metaphysics and aesthetics. "];
    exports.philosophy[exports.DEFENSE] = ["By understanding of heroism as a universal characteristic of human nature, not as an unusual feature, heroism becomes something that stands in the line of possibilities for everyone, possibly inspiring us to answer that call.", "Historically, heroism has been closely connected with military service, although social heroism also deserves close research.", "Heroism consists of actions that must help others, even if it is a possibility and risk of the helper's injury or even death.", "The French word chevalier originally meant 'a man of aristocratic standing, and probably of noble ancestry, who is capable, if called upon, of equipping himself with a war horse and the arms of heavy cavalryman and who has been through certain rituals that make him what he is'.", "The code of chivalry that developed in medieval Europe had its roots in earlier centuries.", "Chivalry is a complex ethical and philosophical code that includes ideals like honesty, justice, courtesy and enterprise — all of which the world could use a bit more of. But “service to man” is at its core.", "Defending a group is permissible only if the benefits to the non-refusing victims is sufficient to render defense proportionate.", "What is the relationship between the morality of self-defense and the morality of defending others? One natural view is that the two share the same underlying rationale, such that the permissibility of other-defense goes “hand-in-hand” with the permissibility of self-defense.", "It seems unlikely that a defender satisfies necessity if they deliberately deprive themselves of less harmful means of defense, at least if they do so at the time of the attack. ", "If defensive harming is at least sometimes morally permissible, it needs to be explained how the use of force can be consistent with these rights.", "With the exception of strict pacifists, there is broad consensus in morality and law that defensive harm can be permissible in cases like this. However, as we shall see, it is surprisingly difficult to explain the grounds and limits of this permission.", "Killing and harming others are paradigmatic wrongs. And yet there is at least one intuitive exception to this prohibition—namely, killing or harming in self-defense, or in defense of others."];
    exports.philosophy[exports.QUESTING] = ["In narratology and comparative mythology, the hero's journey, or the monomyth, is the common template of stories that involve a hero who goes on an adventure, is victorious in a decisive crisis, and comes home changed or transformed.", "Heroes embody the best qualities in humans, but they almost always start out with nothing. Through the journey, they grow into all these characteristics by facing the challenges along their journey. One can't just tell kids to be kind, compassionate, loving, brave, or smart; these qualities need to be explained through a story.", "Many heroic stories follow the same plot line, outlined by Joseph Campbell, that helps them succeed on their quest and ultimately teach whatever moral or explain whatever concept is intended by the author (5).", "Many Greek myths focus on 'the hero's quest,' often involving challenging or difficult tasks the hero must complete to achieve a goal (4). There is often magical or supernatural forces at work as well (4).", "Unlike Gods, heroes are neither immortal nor all-powerful (4). They are the physical representation of the best attributes of human beings: demonstrating great strength, courage, wisdom, cleverness, or devotion (4). Ancient Greek culture depicts a strong, warrior hero who embarks on quests and faces many hardships (4). ", "A quest is a journey toward a specific mission or a goal. The word serves as a plot device in mythology and fiction: a difficult journey towards a goal, often symbolic or allegorical. Tales of quests figure prominently in the folklore of every nation and ethnic culture.", "The strange creature has the head and neck of a snake, the body of a leopard, the haunches of a lion, and the feet of a hart.", "First, “heroism involves some type of quest, which may range from the preservation of life to the preservation of an ideal”."];
};
//JUST for game mode, don't risk leaning on this too much
///example "You see several math equations floating in the air as you get acclimated to the CLASSROOM.
// There is a model anatomy skeleton in the corner.  There's a huge map of Zampanio on a wall."
//"there is" or "you see",or "there's" is going to be added by the system. don't worry.
const initLocDesc = () => {
    exports.loc_desc[exports.ART] = ["a painting of a sad clown on a wall", "splatters of paint on the floor", "a sculpture of your own face in the center"];
    exports.loc_desc[exports.TECHNOLOGY] = ["blinking and beeping dials and buttons along the walls", "circuitry woven into everything", "shiny chrome all along the walls"];
    exports.loc_desc[exports.SPACE] = ["a hologram that shows an unknown solar system", "a window that inexplicably seems to look out into an infinite sky", "a thick pane of glass behind which the infinite void of the stars is visible"];
    exports.loc_desc[exports.TIME] = ["a clock resolutely ticking on a wall", "a giant sundial in the middle", "a repeating hourglass motif built into the walls", "hundreds of cuckoo clocks along a wall"];
    exports.loc_desc[exports.STEALING] = ["iron bars bisecting the room", "a vault of fake treasure", "bags and bags of what first appears to be money"];
    exports.loc_desc[exports.FREEDOM] = ["open windows looking out to a sunlit plain", "feather motifs worked into the architecture of the room", "keys decorating every available nook and cranny"];
    exports.loc_desc[exports.FIRE] = ["an impossible bonfire in the center of the room", "every cherished childhood toy you have long sense forgotten in a pile in the center of the room, smoldering", "matches scattered around on the floor"];
    exports.loc_desc[exports.LONELY] = ["wall upon wall of portraits of empty faces", "scattered photos of everyone who has ever rejected you", "dozens of uncomfortable chairs and no one to fill them"];
    exports.loc_desc[exports.OCEAN] = ["decorative anchors strewn about", "a rug that almost seems to be the ocean if you look at it out of the corner of your eyes", "an entire scale replica of a tall ship you can climb around in", "a ship in a bottle"];
    exports.loc_desc[exports.FLESH] = ["walls made entirely of glistening raw meat", "a huge pile of animal meat in the center of the room", "steaks and fillets in various states of rotting nailed onto every surface"];
    exports.loc_desc[exports.BURIED] = ["drifts upon drifts of sand", "walls made entirely of dirt", "that the walls are slowly closing in"];
    exports.loc_desc[exports.SCIENCE] = ["beakers and testtubes strewn about", "a lab coat neatly hung up in a corner", "a model anatomy skeleton in the corner"];
    exports.loc_desc[exports.MATH] = ["complex equations hovering in mid air", "mathematical forumals scribbled onto every surface", "numbers worked in as motifs along all the walls"];
    exports.loc_desc[exports.TWISTING] = ["the growing realization in your own eyes that it doesn't make SENSE for all of these places to be rooms", "reflections of your face that are not your face and not reflections", "unending echoing fractals of this room through every mirror and window that are not mirrors or windows", "a laugh that is somehow visible and somehow mocking you", "a spiral that is NotASpiral twisting and changing as it watches you from behind the room", "a mirror endlessly reflecting itself"];
    exports.loc_desc[exports.DEATH] = ["a tombstone bearing your name in the center", "human remains strewn about", "an urn of ashes that clearly had once been human"];
    exports.loc_desc[exports.APOCALYPSE] = ["a fully armed nuclear bomb counting slowly down to oblivion in the center of the room", "piles upon piles of plastic that will never degrade", "a seagull partially fused with a set of plastic rings from a six pack of soda in the center of the room"];
    exports.loc_desc[exports.ANGELS] = ["statues of saints and angels everywhere you look", "stained glass windows depecting religious scenes", "an alter to a nameless god"];
    exports.loc_desc[exports.LIGHT] = ["blinding light in every direction", "lamps upon lamps upon lamps everywhere you look", "a gentle, helpful light"];
    exports.loc_desc[exports.SERVICE] = ["bells to ring for servants every few feet", "cleaning supplies clustered in a corner", "a list of chores that need completing along a wall"];
    exports.loc_desc[exports.FAMILY] = ["collection of family portraits of strangers lining the walls", "a baby's cradle in the center of the room", "a large dining room table with places set for a whole family"];
    exports.loc_desc[exports.MAGIC] = ["magical tomes flying every which way", "a large cauldron brewing something faintly magical", "a mystical rune taking up the entirety of the floor"];
    exports.loc_desc[exports.HEALING] = ["bandages and first aid kits neatly stacked up along a wall", "a large operating table in the center of the room", "healing potions and scrolls in a scattered pile"];
    exports.loc_desc[exports.PLANTS] = ["ferns and grass as far as the eye can see, growing right out of the floor", "potted plants lining the walls", "an entire forest impossibly contained in a single room"];
    exports.loc_desc[exports.HUNTING] = ["a butchered deer carcass laying right on the floor", "a gun rack lining the wall", "the footprints of something mysterious making its way through the room"];
    exports.loc_desc[exports.DECAY] = ["disgusting mold covering every surface", "a rotting corpse lying right on the floor", "a half opened fridge along a wall, lights off, reeking spoiled food"];
    exports.loc_desc[exports.CHOICES] = ["three smaller hallways bisecting the room", "a map of all possible choices impossibly small along a wall", "three small chests and the sinking feeling that only one can be opened"];
    exports.loc_desc[exports.ZAP] = ["a series of electrical pylons along a wall", "a tesla coil arcing bits of electricity at random throughout the room", "an electrified panel sparking dangerously in the center of the room"];
    exports.loc_desc[exports.LOVE] = ["a bed shaped like a heart", "a romantic candleit dinner laid out, complete with roses", "rose petals cutting a path through the room"];
    exports.loc_desc[exports.SOUL] = ["dozens and dozens of mirrors at odd angles", "a diamond the size of a person with each facet reflecting a different part of your soul", "a statue of yourself as the centerpiece of the room"];
    exports.loc_desc[exports.ANGER] = ["strobing lights and you hear the sounds of a riot", "every single thing that has ever pissed you off scrawled along every surface", "absolute bullshit no matter where you look"];
    exports.loc_desc[exports.WEB] = ["stringless puppets lying limply in a pile", "spider webs caked onto every surface", "scuttling spiders hiding everywhere", "gossamer threads connecting tauntly to each of your limbs, tugging you just as you believe you are chosing to move"];
    exports.loc_desc[exports.ROYALTY] = ["an ornate throne along the back of the room", "a small model of a castle, complete with ramparts", "crowns worked into the wallpaper, the furniture, the light fixures"];
    exports.loc_desc[exports.ENDINGS] = ["a velvety red curtain lining the walls", "dozens of books laid out on every surface, each open to their final page", "the final thought you somehow know you will ever have scrawled over and over on every surface"];
    exports.loc_desc[exports.KNOWING] = ["a collection of every possible book that could ever be written somehow squeezed into just a few bookshelves", "the sum of all human knowledge written impossibly small on every surface, if only you could read it", "everything you could ever have wished to know about Zampanio and its Truth"];
    exports.loc_desc[exports.GUIDING] = ["a compass the size of a person, resolutely pointed towards where you have not yet gone", "a map of all of Zampanio as it spirals in on itself, assuring you that nothing makes any geographic sense at all", "a link to a guide to Zampanio at https://zampaniosim.fandom.com/wiki/ZampanioSim_Wiki , with a warning that it is written by liars and madmen and a plea to add to it yourself and cement Truth inside of you"];
    exports.loc_desc[exports.CRAFTING] = ["a forge heated to be white hot along one wall", "an anvil that has broken in two in the center of the room", "an intrict loom that appears to be weaving fate itself"];
    exports.loc_desc[exports.LANGUAGE] = ["a dictionary containing every word in every language that will ever exist", "shelves upon shelves of fine literature", "piles of pens and ink pots and quills and parchment and papers strewn about"];
    exports.loc_desc[exports.BUGS] = ["millions upon millions of crawling insects covering every surface", "a wasp's nest in a corner", "clouds of flies hovering in the air"];
    exports.loc_desc[exports.ADDICTION] = ["slot machines and poker tables lining the walls", "syringes and paper packets strewn about", "bottles of alcohol broken in a pile"];
    exports.loc_desc[exports.SPYING] = ["CCTV displays covering the walls, most focused on you", "cameras swiveling to follow your every movement", "staring disembodied eyes peering out of every surface, watching you"];
    exports.loc_desc[exports.CLOWNS] = ["a lifesized figure of a clown slumped against one wall", "a miniature circus tent barely fitting inside the room", "a book of 1001 jokes that just lists out the last 1001 things you've done in obsessive detail"];
    exports.loc_desc[exports.DOLLS] = ["a tea party set out for a collection of broken dolls", "a faceless mannequin that somehow seems to always be oriented towards you", "eyeless dolls lining the walls"];
    exports.loc_desc[exports.OBFUSCATION] = ["mirrors lining the walls showing only your floating eyeballs and no other part of your body", "books where every word is blacked out", "endless ciphers scribbled onto every surface", "an unnatural blur making it hard to make out the specific details of the room"];
    exports.loc_desc[exports.DARKNESS] = ["a pool of utter blackness in the center of the room", "every lightbulb in the room has been smashed", "shadows that are darker than seems possible under every object"];
    exports.loc_desc[exports.KILLING] = ["splatters of blood along the wall and floor", "a bloody knife discarded on the floor", "a chalk outline of a figure clearly murdered"];
    exports.loc_desc[exports.MUSIC] = ["an ornate grand piano in the center of the room", "sheet music repurposed as wall paper", ""];
    exports.loc_desc[exports.DEFENSE] = ["suits of armor lining the walls", "a shield the size of a person hung up on one wall", "a single suit of armor waiting patiently in the center of the room"];
    exports.loc_desc[exports.QUESTING] = ["a list detailing the items for a complex scavenger hunt", "every quest you have ever recieved written endlessly along the walls", "brightly decorated easter eggs tucked into every crevice"];
};
//useful for quests, and the longer you're in the ThisIsAGame the more likely they are to spawn and HURT you.
const initMonsterDesc = () => {
    exports.monster_desc[exports.ART] = ["It carries a paintbrush dripping with blood.", "It drags dismembered statue parts behind it.", "It wears an incongrous artist's beret."];
    exports.monster_desc[exports.TECHNOLOGY] = ["Its inflamed flesh badly integrates with sparking circuitry.", "Its eyes are whirring cameras.", "Most of its body is metal and circuits.", "A single glowing red eye whirrs as it focus on you.", "It moves with robotic precision."];
    exports.monster_desc[exports.SPACE] = ["Its head towers over the clouds.", "It is terrifyingly huge.", "You can see the void of space in the depths of its eyes.", "When it breathes a vacuum is created, sucking things in.", "Its flesh is mottled with starscapes."];
    exports.monster_desc[exports.TIME] = ["It moves jerkily, sometimes as if through molasses other times as if fast-forwarded.", "It sometimes teleports backwards over and over as if caught in a time loop.", "Anything it touches decays to dust in seconds.", "It moves like a video streamed with dropped frames.", "Its every motion is like a stop motion film  missing frames."];
    exports.monster_desc[exports.STEALING] = ["Its missing its right hand from a clean cut.", "Gold coins spill from its tattered pockets and mouth.", "It grips a small dagger with white knuckled intensity."];
    exports.monster_desc[exports.FREEDOM] = ["A broken chain trails from its ankle.", "Chains threaded with keys wrap around its entire body.", "Its teeth are the jagged edges of brass keys.", "Its left leg has been chewed off into a ragged stump. Its own bloody mouth leaves no illusions as to what removed it."];
    exports.monster_desc[exports.FIRE] = ["The unsettling smell of delicious cooked meat wafts from its body as it burns.", "It is wracked with the pain of unending burning.", "Its entire body is endlessly on fire.", "It trails flames and destruction in its wake.", "Its flesh is blackened and charred."];
    exports.monster_desc[exports.LONELY] = ["It is achingly alone and unloved and always will be.", "It knows you reject it with your very core.", "The devestating awareness of how alone you are against it racks your body."];
    exports.monster_desc[exports.OCEAN] = ["Its breaths are a wet and sickly gasp as it caughs up bits of water and seaweed.", "It appears to have drowned several days ago and only now shambeled to shore.", "The stench of rotten fish and seaweed surrounds it."];
    exports.monster_desc[exports.FLESH] = ["Partially formed faces scream from all over its body.", "It is covered in eyes.", "It is covered in mouths.", "It has the wrong amount of limbs in all the wrong places.", "Its flesh is bulbous and wrong.", "It very clearly has too many bones in all the wrong places.", "Its skin is flayed, exposing the bare and pulsing muscle fibers.", "Its bloody, living, bones are on the outside of its flayed skin.", "Intestines spill out of its stomach and mouth."];
    exports.monster_desc[exports.BURIED] = ["Part of its body is buried in the dirt and clawing its way out.", "Every time it opens its mouth or eyes dirt pours out.", "Its breaths are strained and gasping with each exhale puffing dust out into the air.", "A cloud of choking dust surrounds it.", "The walls seem to press towards it, straining to crush it and anything near it."];
    exports.monster_desc[exports.SCIENCE] = ["It listlessly carries a beaker of an unknown chemical.", "Its wearing the remains of a lab coat.", "There are goggles over its head. They do nothing."];
    exports.monster_desc[exports.MATH] = ["Numbers circle its head.", "The number of limbs it has is fractal.", "Its head contains pure geometric shapes."];
    exports.monster_desc[exports.TWISTING] = ["Instead of a face it has a spiralling spring.", "Spirals and fractals are tattooed onto its flesh.", "All the bones are in its hands.", "Every time you look at it it is shaped differently.", "Its reflection is distorted and wrong in ways you can not pin down.", "Its eyes swirl with madness.", "It is lines of code in a program that doesn't even care about it very much.", "Its footprints leave behind the smell of madness.", "Every time you count its number of limbs or eyes you get a different number. You cannot bring yourself to stop counting.", "Its hair spirals and swirsl in ways that don't make sense.", "It is elongated and bulbous.", "Its limbs are thin and limp, like noodles.", "Its hands are the size of its torso.", "Its hands are sharp.", "Its laugh echoes in a fractal.", "Its smile stretches past the confines of its face."];
    exports.monster_desc[exports.DEATH] = ["Its head is a grinning skull.", "It drags a scythe behind it.", "You know for a fact that it is your fate to become it when you die."];
    exports.monster_desc[exports.APOCALYPSE] = ["It is covered in radiation burns.", "It rides a pale horse.", "It has old spikes driven through its body, inflamed and painfully healed.", "It drags a can of gasoline behind it."];
    exports.monster_desc[exports.ANGELS] = ["It has tattered and bloody feathered wings.", "You know in your bones that god has forsaken it.", "A razor sharp fallen halo cuts into its head and neck.", "Its wings are as black as sin."];
    exports.monster_desc[exports.LIGHT] = ["A blinding light pulses out of it every minute or so.", "Out of its eyes and mouth pour a blinding light.", "Its entire body pulses with blinding brillance every few seconds.", "Its veins glow dangerously."];
    exports.monster_desc[exports.SERVICE] = ["It constantly repeats 'How can I help you today'? in a brittle, cheerful voice.", "Its smile stretches painfully across its face.", "Its smile is stapled into place.", "Its smile is a rictus of pain and its eyes brim hate.", "Its smile appears genuine until you look into its eyes."];
    exports.monster_desc[exports.FAMILY] = ["It is surrounded by smaller versions of itself.", "It drags a small corpse of something that looks like itself behind it.", "It cradles a small thing that looks like itself in its arms."];
    exports.monster_desc[exports.MAGIC] = ["Anything it touches is magically turned into something else at random.", "It drags a broken wizard's staff behind it.", "It wears an incongrously cheerful wizard's hat with stars."];
    exports.monster_desc[exports.HEALING] = ["Wounds constantly open up on its body and then heal.", "Any weapon that pierces it remains stuck in place as the flesh closes up around it.", "It is dressed like a sexy nurse.", "Its blood appears to be max healing potions."];
    exports.monster_desc[exports.PLANTS] = ["Roots bulge through its veins, occasionally piercing skin to put out some leaves.", "A mushroom fruiting body pierces out from the top of its skull.", "A single blood-red flower blooms from the center of its chest."];
    exports.monster_desc[exports.HUNTING] = ["It waits for you to run.", "There is fur sprouting at random from its body.", "Its hunched and twisted into a parody of a wolf.", "Its fangs are dripping blood and drool in equal measure.", "It lopes on all fours.", "Its eyes glow with a predatory light."];
    exports.monster_desc[exports.DECAY] = ["Maggots are nesting in the empty sockets where its eyes used to be.", "Its body is riddled with holes that maggots crawl in and out of.", "Its flesh is rotting and decayed.", "Anything it touches rots into a congealed mess."];
    exports.monster_desc[exports.CHOICES] = ["You are aware of every motion it can make in the present and only in retrospect know what it actually did.", "When it moves you see every move it could have made at once until suddenly there is only the one it actually did.", "It only moves after several seconds of absolute stillness."];
    exports.monster_desc[exports.ZAP] = ["Electricity arcs out from its body to anything nearby.", "It jerks and twitches with constant, painful, shocks.", "Electricity sparks from its skin."];
    exports.monster_desc[exports.LOVE] = ["It is beautiful, in its own way.", "It wants you to know you never need to be alone again.", "It knows it is the only one who could ever TRULY love you.", "You know it would love you unconditionally.", "It sings of love and desire and you want to embrace it.", "It loves you."];
    exports.monster_desc[exports.SOUL] = ["Its face is yours but wrong.", "You know in your soul that it is you from a different timeline.", "It screams in your voice.", "Mirror shards are stutted throughout its body, some still bleeding and some healing around the glass."];
    exports.monster_desc[exports.ANGER] = ["It indescriminately destroys anything that makes a sound.", "It is smashing everything around it.", "It seems to be in an incoherent rage."];
    exports.monster_desc[exports.WEB] = ["Is wearing a bright red bowler hat.", "It has eight eyes and mandibles.", "Its limbs are connected to gossamer threads leading far away from it, tugging on it. Controlling it. It weeps and struggles but can not break free.", "It has too many limbs and each is spindly and black with small hairs.", "Spiders crawl in and out of a hole in its skull.", "Cobwebs cover it nearly entirely."];
    exports.monster_desc[exports.ROYALTY] = ["The tines of a crown erupt bloodily from its very skull.", "It drags a sceptre behind it.", "A crown appears to have been driven into its skull, down to the bone. Flaps of bloody skin droop down around the crown."];
    exports.monster_desc[exports.ENDINGS] = ["You know it is your end. You know the end is never the end. You cannot be free.", "It moves with a terrifying inevitability.", "It trails a velvet red curtain behind it."];
    exports.monster_desc[exports.KNOWING] = ["It knows your ever secret as well as you do yourself.", "It knows your every secret with unerring accuracy.", "It clutches a stained and rotting book to its chest.", "Somehow you know it used to be someone you knew very well. Yourself."];
    exports.monster_desc[exports.GUIDING] = ["It holds a torch.", "It points towards the nearest door.", "It tries to be telling you something, getting increasingly frustrated that you aren't understanding."];
    exports.monster_desc[exports.CRAFTING] = ["Nails are driven in sporadically across its body.", "It carries a large, blood-spattered hammer.", "It wears an apron covered in blood.", "It drags a large rusty ax behind it."];
    exports.monster_desc[exports.LANGUAGE] = ["It speaks a language you almost understand.", "It speaks in several voices at once.", "It speaks a language you somehow recall from your dreams."];
    exports.monster_desc[exports.BUGS] = ["Parts of its flesh seem to be a shifting mat of ants.", "Maggots and adult flies spill out of its mouth whenever it opens.", "Honey drips out of its empty eye sockets and bees go in and out of them at will."];
    exports.monster_desc[exports.ADDICTION] = ["It holds a broken beer bottle in one hand.", "It trails bloody playing cards behind it.", "Syringes are jabbed into it at random."];
    exports.monster_desc[exports.SPYING] = ["Its unblinking stare never leaves you.", "It is made of eyes.", "Dozens of eyes float behind it.", "Its flesh is riddled with staring eyes.", "There is a single, unblinking eye in the center of its face."];
    exports.monster_desc[exports.CLOWNS] = ["Its smiling like a dare.", "It has a red rubber clown nose.", "It has bright clown make up messily applied to its face.", "It wears a colorful curly wig."];
    exports.monster_desc[exports.DOLLS] = ["It wears a pretty dress and mary-janes.", "Its limbs appear to be ball-jointed.", "It wears a cracked porcelain mask."];
    exports.monster_desc[exports.OBFUSCATION] = ["Parts of it are invisible.", "Its features are blurry.", "It flickers in and out of visibility.", "You sometimes can't hear it at all."];
    exports.monster_desc[exports.DARKNESS] = ["Its shadow is bigger than you would expect.", "Its features are dripping shadows like water.", "Its visible only through its shadow."];
    exports.monster_desc[exports.KILLING] = ["Its foot and hand prints are always fresh blood.", "A tsunami of blood follows in its wake.", "It clutches various weapons in each hand.", "Its dripping with killing intent.", "It drags a fresh corpse behind it."];
    exports.monster_desc[exports.MUSIC] = ["Its teeth are yellowed piano keys.", "It clutches a microphone.", "It carries a broken guitar clutched its chest.", "Countless mouths scattered over its body sing in an endless choir."];
    exports.monster_desc[exports.DEFENSE] = ["It drags a battered and bloody shield behind it.", "Its skin is a hard and shiny carapace in places.", "Full plate armor appears to be welded to its joints."];
    exports.monster_desc[exports.QUESTING] = ["It is wearing the rusted out remains of formerly shining armor.", "It wears the tatters of a once proud cape.", "It drags a sack of items behind it that is leaking blood."];
};
const initSounds = () => {
    exports.sound_possibilities[exports.ART] = ["scribbling pens", "tapping chisels", "hushed silence"];
    exports.sound_possibilities[exports.TECHNOLOGY] = ["clicking keys", "router beeping", "whirring fans"];
    exports.sound_possibilities[exports.SPACE] = ["a backwards countdown", "rocket thrusters", "wind"];
    exports.sound_possibilities[exports.TIME] = ["ticking clocks", "an alarm clock beeping", "a metronome"];
    exports.sound_possibilities[exports.STEALING] = ["a security alarm blaring", "chains rustling", "dropping coins"];
    exports.sound_possibilities[exports.FREEDOM] = ["winds flapping", "locks opening", "hushed silence"];
    exports.sound_possibilities[exports.FIRE] = ["a fire alarm blaring", "a fire roaring", "a match being struck"];
    exports.sound_possibilities[exports.LONELY] = ["hushed silence", "wind", "no one at all"];
    exports.sound_possibilities[exports.OCEAN] = ["gentle waves", "a seagull screeching", "water"];
    exports.sound_possibilities[exports.FLESH] = ["uncomfortable squelching", "slapping meat", "bones grinding"];
    exports.sound_possibilities[exports.BURIED] = ["dirt shifting", "strained rock creaking", "the walls groaning as they get closer to you"];
    exports.sound_possibilities[exports.SCIENCE] = ["instruments beeping", "fans whirring", "a lecture"];
    exports.sound_possibilities[exports.MATH] = ["a note at exactly 261.63 Hz drawn out", "a sine wave", "a voice reciting the digits of pi"];
    exports.sound_possibilities[exports.TWISTING] = ["echoing laughter", "lies", "headache"];
    exports.sound_possibilities[exports.DEATH] = ["a funeral dirge", "a last gasp", "wailing sobs"];
    exports.sound_possibilities[exports.APOCALYPSE] = ["a nuclear warning siren", "instructions to seek shelter against radiation", "hushed silence"];
    exports.sound_possibilities[exports.ANGELS] = ["angelic singing", "a peaceful choir", "the trumpets of judgement"];
    exports.sound_possibilities[exports.LIGHT] = ["the hum of fluorescent bulbs", "a soft hum", "a light switch click on"];
    exports.sound_possibilities[exports.SERVICE] = ["cleaning", "distant servants", "service"];
    exports.sound_possibilities[exports.FAMILY] = ["children laughing", "children playing", "family dinner"];
    exports.sound_possibilities[exports.MAGIC] = ["a chanting ritual", "a summoning circle", "a spell being cast"];
    exports.sound_possibilities[exports.HEALING] = ["ambient hospital work", "a healing spell", "a nurse yelling 'stat'"];
    exports.sound_possibilities[exports.PLANTS] = ["leaves rustling", "branches rustling", "birds singing"];
    exports.sound_possibilities[exports.HUNTING] = ["something running away from you", "something crying out in fear and exhaustion", "growling"];
    exports.sound_possibilities[exports.DECAY] = ["walls collapsing from rot", "floor groaning with decay", "your own body starting to decay"];
    exports.sound_possibilities[exports.CHOICES] = ["hushed silence", "a game show", "a coin landing somewhere"];
    exports.sound_possibilities[exports.ZAP] = ["an electrical hum", "lightning striking", "a tesla coil"];
    exports.sound_possibilities[exports.LOVE] = ["romantic music", "a love ballad", "a happy sigh"];
    exports.sound_possibilities[exports.SOUL] = ["crystals clinking into each other", "a mirror shattering", "your own voice echoing"];
    exports.sound_possibilities[exports.ANGER] = ["an angry mob", "a riot", "nails on a chalkboard"];
    exports.sound_possibilities[exports.WEB] = ["spiders scurrying", "a hushed silence", "puppets clattering"];
    exports.sound_possibilities[exports.ROYALTY] = ["a royal procession", "courtiers murmoring", "a herald speaking"];
    exports.sound_possibilities[exports.ENDINGS] = ["a voice announcing 'The End'", "ending credits music", "goodbye for a world", "someone saying 'the end is never the end'"];
    exports.sound_possibilities[exports.KNOWING] = ["someone narrating everything you're doing as you do it", "all the secrets of the universe whispering themselves to you", "a voice listing out facts about the room in no particular order"];
    exports.sound_possibilities[exports.GUIDING] = ["a tour guide instructing you", "a teacher telling you what to do", "the help text being read aloud to you"];
    exports.sound_possibilities[exports.CRAFTING] = ["anvils being hammered", "wood being chopped", "yarn being spun"];
    exports.sound_possibilities[exports.LANGUAGE] = ["a language you've never heard before", "a story about a mysterious game that ends the world", "a voice reciting synonyms for lies"];
    exports.sound_possibilities[exports.BUGS] = ["a hive singing", "bugs squirming", "insects buzzing"];
    exports.sound_possibilities[exports.ADDICTION] = ["a jackpot being won", "cards being dealt", "a roulette being spun"];
    exports.sound_possibilities[exports.SPYING] = ["a camera shutter going off", "someone whispering", "window blinds being shut"];
    exports.sound_possibilities[exports.CLOWNS] = ["a horn being honked", "a calliope playing", "a circus organ playing"];
    exports.sound_possibilities[exports.DOLLS] = ["a teaparty", "plastic creaking", "ceramic breaking"];
    exports.sound_possibilities[exports.OBFUSCATION] = ["pig latin", "morse code", "tap code"];
    exports.sound_possibilities[exports.DARKNESS] = ["hushed silence", "a lightbulb breaking", "deep still water"];
    exports.sound_possibilities[exports.KILLING] = ["a knife plunging into flesh", "a gun going off", "a death gurgle"];
    exports.sound_possibilities[exports.MUSIC] = ["beautiful music", "singing", "a drum beating"];
    exports.sound_possibilities[exports.DEFENSE] = ["metal hitting metal", "a rallying cry", "clanking metal"];
    exports.sound_possibilities[exports.QUESTING] = ["leveling up", "a new quest", "a role playing game", "trumpets"];
};
const initFeelings = () => {
    exports.feeling_possibilities[exports.ART] = ["drying paint", "cold marble", "fresh canvas"];
    exports.feeling_possibilities[exports.TECHNOLOGY] = ["circuit boards", "smooth aluminum", "chrome"];
    exports.feeling_possibilities[exports.SPACE] = ["infinite space", "star stuff", "vacuum"];
    exports.feeling_possibilities[exports.TIME] = ["smooth glass", "petrified wood", "fosils"];
    exports.feeling_possibilities[exports.STEALING] = ["gold", "platinum", "jewels"];
    exports.feeling_possibilities[exports.FREEDOM] = ["feathers", "air", "clouds"];
    exports.feeling_possibilities[exports.FIRE] = ["ash", "charcoal", "embers"];
    exports.feeling_possibilities[exports.LONELY] = ["cold stone", "cold wood", "cold metal"];
    exports.feeling_possibilities[exports.OCEAN] = ["damp rocks", "water", "damp sand"];
    exports.feeling_possibilities[exports.FLESH] = ["meat", "flesh", "bone", "skin"];
    exports.feeling_possibilities[exports.BURIED] = ["dirt", "mud", "rock"];
    exports.feeling_possibilities[exports.SCIENCE] = ["chrome", "glass", "plastic"];
    exports.feeling_possibilities[exports.MATH] = ["raw numbers", "mathematically precise planks", "plastic"];
    exports.feeling_possibilities[exports.TWISTING] = ["angles", "shapes", "flavors"];
    exports.feeling_possibilities[exports.DEATH] = ["bone", "smooth wood", "marble"];
    exports.feeling_possibilities[exports.APOCALYPSE] = ["ash", "radiation", "grey goo"];
    exports.feeling_possibilities[exports.ANGELS] = ["feathers", "holy water", "relics"];
    exports.feeling_possibilities[exports.LIGHT] = ["solid light", "lightbulbs", "lampshades"];
    exports.feeling_possibilities[exports.SERVICE] = ["chains", "feathers", "cravats"];
    exports.feeling_possibilities[exports.FAMILY] = ["photographs", "toys", "gifts"];
    exports.feeling_possibilities[exports.MAGIC] = ["mythril", "mana", "essence"];
    exports.feeling_possibilities[exports.HEALING] = ["bandages", "syringes", "sheets"];
    exports.feeling_possibilities[exports.PLANTS] = ["leaves", "branches", "flowers"];
    exports.feeling_possibilities[exports.HUNTING] = ["fur", "bullets", "arrows"];
    exports.feeling_possibilities[exports.DECAY] = ["rot", "decaying animals", "rotting corpses"];
    exports.feeling_possibilities[exports.CHOICES] = ["paving stones", "wood", "coins"];
    exports.feeling_possibilities[exports.ZAP] = ["electricity", "batteries", "tesla coils"];
    exports.feeling_possibilities[exports.LOVE] = ["roses", "chocolate", "wine"];
    exports.feeling_possibilities[exports.SOUL] = ["gems", "mirrors", "your own skin"];
    exports.feeling_possibilities[exports.ANGER] = ["heat", "capsasin", "tear gas"];
    exports.feeling_possibilities[exports.WEB] = ["spider web", "cobwebs", "spiders"];
    exports.feeling_possibilities[exports.ROYALTY] = ["gold", "velvet", "fur"];
    exports.feeling_possibilities[exports.ENDINGS] = ["velvet", "cold marble", "wood"];
    exports.feeling_possibilities[exports.KNOWING] = ["paper", "ink", "parchment"];
    exports.feeling_possibilities[exports.GUIDING] = ["glass", "dirt", "metal"];
    exports.feeling_possibilities[exports.CRAFTING] = ["metal", "cloth", "wood"];
    exports.feeling_possibilities[exports.LANGUAGE] = ["paper", "parchment", "ink"];
    exports.feeling_possibilities[exports.BUGS] = ["carapaces", "worms", "worm casings"];
    exports.feeling_possibilities[exports.ADDICTION] = ["syringes", "gaming chips", "powder"];
    exports.feeling_possibilities[exports.SPYING] = ["glass", "cameras", "one-way mirros"];
    exports.feeling_possibilities[exports.CLOWNS] = ["rubber", "balloons", "hair"];
    exports.feeling_possibilities[exports.DOLLS] = ["porcelain", "plastic", "rubber"];
    exports.feeling_possibilities[exports.OBFUSCATION] = ["nothing at all", "nothingness", "void"];
    exports.feeling_possibilities[exports.DARKNESS] = ["shadows", "darkness", "vantablack"];
    exports.feeling_possibilities[exports.KILLING] = ["blood", "knives", "bullets"];
    exports.feeling_possibilities[exports.MUSIC] = ["sheet-music", "brass", "wood"];
    exports.feeling_possibilities[exports.DEFENSE] = ["iron", "steel", "bronze", "leather"];
    exports.feeling_possibilities[exports.QUESTING] = ["gold", "platinum", "silver"];
};
const initTastes = () => {
    exports.taste_possibilities[exports.ART] = ["crayons", "paint", "paper"];
    exports.taste_possibilities[exports.TECHNOLOGY] = ["ozone", "metal", "plastic"];
    exports.taste_possibilities[exports.SPACE] = ["stars", "wind", "infinite cosmic power"];
    exports.taste_possibilities[exports.TIME] = ["the future", "the past", "the present"];
    exports.taste_possibilities[exports.STEALING] = ["gold", "silver", "wealth"];
    exports.taste_possibilities[exports.FREEDOM] = ["freedom", "independance", "birds"];
    exports.taste_possibilities[exports.FIRE] = ["ash", "fire", "destruction"];
    exports.taste_possibilities[exports.LONELY] = ["loneliness", "isolation", "depression"];
    exports.taste_possibilities[exports.OCEAN] = ["sea-salt", "the ocean", "water"];
    exports.taste_possibilities[exports.FLESH] = ["raw meat", "flesh", "your own blood"];
    exports.taste_possibilities[exports.BURIED] = ["dirt", "mud", "earth"];
    exports.taste_possibilities[exports.SCIENCE] = ["chemicals", "disinfectant", "acetone"];
    exports.taste_possibilities[exports.MATH] = ["raw math", "numbers", "pie"];
    exports.taste_possibilities[exports.TWISTING] = ["headaches", "corners", "fractals"];
    exports.taste_possibilities[exports.DEATH] = ["death", "mortality", "inevitability"];
    exports.taste_possibilities[exports.APOCALYPSE] = ["radiation", "twinkies", "canned food"];
    exports.taste_possibilities[exports.ANGELS] = ["wafers", "wine", "redemption"];
    exports.taste_possibilities[exports.LIGHT] = ["broken glass", "angel food cake", "foam"];
    exports.taste_possibilities[exports.SERVICE] = ["restaurant food", "feather dusters", "chains"];
    exports.taste_possibilities[exports.FAMILY] = ["soul food", "a home cooked meal", "family dinner"];
    exports.taste_possibilities[exports.MAGIC] = ["mana", "essence", "magic"];
    exports.taste_possibilities[exports.HEALING] = ["a healing potion", "bandaids", "antibiotic"];
    exports.taste_possibilities[exports.PLANTS] = ["leaves", "fruit", "flowers", "spices"];
    exports.taste_possibilities[exports.HUNTING] = ["cooked meat", "gunpowder", "bullets"];
    exports.taste_possibilities[exports.DECAY] = ["rot", "corruption", "decay"];
    exports.taste_possibilities[exports.CHOICES] = ["31 flavors", "options", "choice"];
    exports.taste_possibilities[exports.ZAP] = ["ozone", "electricity", "copper"];
    exports.taste_possibilities[exports.LOVE] = ["chocolate", "a kiss", "perfume"];
    exports.taste_possibilities[exports.SOUL] = ["your own spit", "mirrors", "window cleaner"];
    exports.taste_possibilities[exports.ANGER] = ["capsasin", "pure rage", "hatred"];
    exports.taste_possibilities[exports.WEB] = ["spider webs", "cobwebs", "spiders"];
    exports.taste_possibilities[exports.ROYALTY] = ["crown", "royal jelly", "cake"];
    exports.taste_possibilities[exports.ENDINGS] = ["the ending", "the end", "the finale"];
    exports.taste_possibilities[exports.KNOWING] = ["the knowledge of all things", "an apple", "knowledge"];
    exports.taste_possibilities[exports.GUIDING] = ["potential", "assistance", "nothing at all"];
    exports.taste_possibilities[exports.CRAFTING] = ["raw iron", "copper", "wood"];
    exports.taste_possibilities[exports.LANGUAGE] = ["ink", "a good book", "paper"];
    exports.taste_possibilities[exports.BUGS] = ["bugs", "flies", "bug droppings"];
    exports.taste_possibilities[exports.ADDICTION] = ["powder", "playing cards", "cigarette butts"];
    exports.taste_possibilities[exports.SPYING] = ["paranoia", "paranoia", "paranoia"];
    exports.taste_possibilities[exports.CLOWNS] = ["cake", "candy", "humor"];
    exports.taste_possibilities[exports.DOLLS] = ["plastic", "ceramic", "adj"];
    exports.taste_possibilities[exports.OBFUSCATION] = ["nothing at all"];
    exports.taste_possibilities[exports.DARKNESS] = ["darkness"];
    exports.taste_possibilities[exports.KILLING] = ["blood", "murder", "blades"];
    exports.taste_possibilities[exports.MUSIC] = ["song"];
    exports.taste_possibilities[exports.DEFENSE] = ["metal", "leather"];
    exports.taste_possibilities[exports.QUESTING] = ["metal", "adventure"];
};
const initSmells = () => {
    exports.smell_possibilities[exports.ART] = ["paint", "dust", "paper"];
    exports.smell_possibilities[exports.TECHNOLOGY] = ["ozone", "plastic", "dust"];
    exports.smell_possibilities[exports.SPACE] = ["vacuum", "wind", "void"];
    exports.smell_possibilities[exports.TIME] = ["stale air", "the future", "the past"];
    exports.smell_possibilities[exports.STEALING] = ["wealth", "jail", "adventure"];
    exports.smell_possibilities[exports.FREEDOM] = ["freedom", "independance", "power"];
    exports.smell_possibilities[exports.FIRE] = ["smoke", "fire", "ash", "wood burning"];
    exports.smell_possibilities[exports.LONELY] = ["loneliness", "isolation", "depression"];
    exports.smell_possibilities[exports.OCEAN] = ["sea-salt", "an ocean breeze", "seaweed rotting"];
    exports.smell_possibilities[exports.FLESH] = ["sweat", "blood", "meat"];
    exports.smell_possibilities[exports.BURIED] = ["dirt", "dust", "mud"];
    exports.smell_possibilities[exports.SCIENCE] = ["acetone", "acid", "chemicals"];
    exports.smell_possibilities[exports.MATH] = ["raw numbers", "apple pie", "pie"];
    exports.smell_possibilities[exports.TWISTING] = ["headache", "code", "mazes"];
    exports.smell_possibilities[exports.DEATH] = ["death", "bones", "corpses"];
    exports.smell_possibilities[exports.APOCALYPSE] = ["radiation", "dust", "ash"];
    exports.smell_possibilities[exports.ANGELS] = ["incense", "redemption", 'justice'];
    exports.smell_possibilities[exports.LIGHT] = ["ozone"];
    exports.smell_possibilities[exports.SERVICE] = ["food", "cleaning chemicals", "wood polish"];
    exports.smell_possibilities[exports.FAMILY] = ["home cooked food", "family", "home"];
    exports.smell_possibilities[exports.MAGIC] = ["mana", "essence", "reagents"];
    exports.smell_possibilities[exports.HEALING] = ["antiseptic", "antibiotics", "cleaning chemicals"];
    exports.smell_possibilities[exports.PLANTS] = ["fertilizer", "earth", "flowers"];
    exports.smell_possibilities[exports.HUNTING] = ["prey", "blood", "fear"];
    exports.smell_possibilities[exports.DECAY] = ["rot", "decaying bodies", "decay"];
    exports.smell_possibilities[exports.CHOICES] = ["deceit", "justice", "lies"];
    exports.smell_possibilities[exports.ZAP] = ["ozone"];
    exports.smell_possibilities[exports.LOVE] = ["chocolate", "love", "romance"];
    exports.smell_possibilities[exports.SOUL] = ["yourself"];
    exports.smell_possibilities[exports.ANGER] = ["hatred", "anger", "violence"];
    exports.smell_possibilities[exports.WEB] = ["spider webs", "dust", "cob webs"];
    exports.smell_possibilities[exports.ROYALTY] = ["incense", "spices", "gold"];
    exports.smell_possibilities[exports.ENDINGS] = ["endings"];
    exports.smell_possibilities[exports.KNOWING] = ["knowledge"];
    exports.smell_possibilities[exports.GUIDING] = ["help"];
    exports.smell_possibilities[exports.CRAFTING] = ["dye", "a forge", "metal"];
    exports.smell_possibilities[exports.LANGUAGE] = ["ink", "paper", "old books"];
    exports.smell_possibilities[exports.BUGS] = ["honey", "a hive", "worms"];
    exports.smell_possibilities[exports.ADDICTION] = ["drugs", "cards", "money"];
    exports.smell_possibilities[exports.SPYING] = ["powder"];
    exports.smell_possibilities[exports.CLOWNS] = ["sweat", "sugar", "popcorn"];
    exports.smell_possibilities[exports.DOLLS] = ["plastic", "porcelain", "lavendar"];
    exports.smell_possibilities[exports.OBFUSCATION] = ["nothing at all"];
    exports.smell_possibilities[exports.DARKNESS] = ["darkness"];
    exports.smell_possibilities[exports.KILLING] = ["death", "blood", "gunpowder"];
    exports.smell_possibilities[exports.MUSIC] = ["oil", "paper", "leather"];
    exports.smell_possibilities[exports.DEFENSE] = ["leather", "metal"];
    exports.smell_possibilities[exports.QUESTING] = ["hope"];
};
//used for skills or flavor text in quests
//things like A shower of healing sparks suffuses the area while a whirlwind of rose petals kicks up.
const initEffectPossibilities = () => {
    exports.effect_possibilities[exports.ART] = ["a torrent of paint oozes up from the ground", "paintbrushes clatter and clack in a swirling circle", "paper swirls in a dizzying whirlwind"];
    exports.effect_possibilities[exports.TECHNOLOGY] = ["sparks jutter and jolt in the air", "circuitry traces itself out in the very air", "numbers and equations swirl in the air"];
    exports.effect_possibilities[exports.SPACE] = ["a field of stars fades into existance", "a vast galaxy spins into view", "you suddenly feel incredibly small as the room grows larger and larger around you"];
    exports.effect_possibilities[exports.TIME] = ["a clock appears, its hands spinning wildly backwards", "melting clocks phase into existence, dripping on every surface", "the sound of steady ticking fills the air"];
    exports.effect_possibilities[exports.STEALING] = ["golden coins start falling from the sky", "a spotlight centers itself on you", "keys begin swirling around you"];
    exports.effect_possibilities[exports.FREEDOM] = ["a refreshing breeze kicks up", "feathers begin swirling in a whirlwind", "you get a strong sense of vertigo, as if you're falling while standing still"];
    exports.effect_possibilities[exports.FIRE] = ["smoke pours out of nowhere", "flames dance around the edges of the room", "the smell of smoke lingers in the air", "wood burning"];
    exports.effect_possibilities[exports.LONELY] = ["fog drifts in the air", "a crowd of indistinct figures press around you", "the weight of how alone you are presses into you"];
    exports.effect_possibilities[exports.OCEAN] = ["the smell of sea-salt is on the breeze", "water begins pooling around your feet", "the sound of seagulls fills the air"];
    exports.effect_possibilities[exports.FLESH] = ["meat begins pulsing from every surface", "blood runs in rivers at your feet", "you are suddenly aware that your body is made of meat and thus is edible"];
    exports.effect_possibilities[exports.BURIED] = ["the walls begin slowly pressing in on you", "dust chokes out the air and cakes every surface", "a hole opens up in front of you that seems to go down forever"];
    exports.effect_possibilities[exports.SCIENCE] = ["beakers fall from the sky and shatter against the ground", "the smell of acetone wafts through the air", "formulas dance and swirl in the air"];
    exports.effect_possibilities[exports.MATH] = ["raw numbers float serenely in the breeze", "you are suddenly aware of the mathematics behind your entire surroundings", "you divide by zero and reality begins to implode"];
    exports.effect_possibilities[exports.TWISTING] = ["everything is nothing and the end is never the end but only a new begining", "you patiently wait for the game to respond to your text input", "the room you are in infinitely lengthens into an unending hallway"];
    exports.effect_possibilities[exports.DEATH] = ["small animal bones fall from the sky", "a grave with your name on it erupts from the ground like a jagged tooth", "you see the date everything around you will die"];
    exports.effect_possibilities[exports.APOCALYPSE] = ["you see the date everything around you will die and it is all the same date and it is not very far away", "a radiation siren blares in the distance", "a swirling vortex of all consuming nanobots scours the room clean"];
    exports.effect_possibilities[exports.ANGELS] = ["feathers and motes of light drift from the heavens", "gentle and serene harp music drifts on the breeze", 'a beam of light from above highlights you in particular'];
    exports.effect_possibilities[exports.LIGHT] = ["light radiates from all directions", "motes of light float in the breeze", "a blinding light seems to radiate from the heavens"];
    exports.effect_possibilities[exports.SERVICE] = ["feather dusters perform a musical number around you", "indistinct figues in maid uniforms bow towards you", "a robotic butler takes a lunch break nearby"];
    exports.effect_possibilities[exports.FAMILY] = ["family photos flutter from the sky", "memories of home flood your senses", "a door leading to your home appears before you"];
    exports.effect_possibilities[exports.MAGIC] = ["mana swirls and flows around your body", "magical runes carve themselves into the very air", "a 9! pointed pattern burns itself indelibly into the ground"];
    exports.effect_possibilities[exports.HEALING] = ["red plus signs swirl around you", "faceless nurses wielding scalpels stand in a ring around you, facing outwards", "a hospital gurney slowly creaks into view"];
    exports.effect_possibilities[exports.PLANTS] = ["flowers bloom and carpet the ground", "vines twist themselves around every surface", "a forest suddenly grows in a hazy ring around you"];
    exports.effect_possibilities[exports.HUNTING] = ["the scene of blood and fear is on the wind", "your teeth sharpen and your eyes glint", "you can not help but stare at the most vital and vulnerable parts of everything around you"];
    exports.effect_possibilities[exports.DECAY] = ["the stench of rot settles itself against the back of your throat", "a long dead corpse bubbles up from the ground, rotten and wet", "a swarm of diseased rats blankets the ground"];
    exports.effect_possibilities[exports.CHOICES] = ["you see the consequences of every action laid bare before you", "double headed coins fall in a cascading pile from the ceiling", "a thousand variations of you stare at you from a circle with you at the center"];
    exports.effect_possibilities[exports.ZAP] = ["lightning strikes from the heavens", "electrical sparks radiate in every direction", "the very floor becomes energized"];
    exports.effect_possibilities[exports.LOVE] = ["rose petals drift gently from the sky", "the sound of soulful violins can be heard in the distance", "cartoon hearts swirl around you faster and faster"];
    exports.effect_possibilities[exports.SOUL] = ["every surface takes on a mirrored finish, endlessly reflecting your own face from every angle", "gemstones pile up around your feet", "a pair of mirrors fade into existence, endlessly reflecting each other"];
    exports.effect_possibilities[exports.ANGER] = ["everything takes on a red tinted haze", "a massive bull charges from the distance", "the sound of gunfire and screaming can be heard in the distance"];
    exports.effect_possibilities[exports.WEB] = ["gossamer spider webs shine from every surface, each attaching themselves to one of your joints", "skittering spiders swarm over every surface", "marionettes on infinite strings fall from the sky and beging dancing a jerky rhythm"];
    exports.effect_possibilities[exports.ROYALTY] = ["a golden throne erupts beneath you, cradling you in your authority", "a golden crown, adorned with jewels, gently rests itself upon your brow", "phantasmal courtiers bow and scrape before you"];
    exports.effect_possibilities[exports.ENDINGS] = ["a red velvet curtain obscures your view", "the words 'THE END' fade into existance above your head", "open books appears and slam themselves shut to their final page"];
    exports.effect_possibilities[exports.KNOWING] = ["books appear out of nowhere, pages flipping rapidly as they float", "the secrets of everyone around you write themselves into the air", "words swirl around you"];
    exports.effect_possibilities[exports.GUIDING] = ["a yellow line guiding you to your next location appears on the ground", "compass arrows spin and whirl around you before suddenly all vibrating to a stop, all pointing in the same direction", "a mountainous vista looms in the distance"];
    exports.effect_possibilities[exports.CRAFTING] = ["the clanging of hammers on anvils rings out from the distance", "magical crafting tools begin creating items in front of you", "you begin the see the blueprints of all the objects around you"];
    exports.effect_possibilities[exports.LANGUAGE] = ["chanting in a language you almost understand comes from nowhere", "paper swirls in a dizzying whirlwind around you", "stacks upon stacks of books wink into existance in a circle around you"];
    exports.effect_possibilities[exports.BUGS] = ["a swarm of flies swirls around you", "the very floor becomes carpeted thickly with swarming ants", "wasps crawl all over your body"];
    exports.effect_possibilities[exports.ADDICTION] = ["syringes and pills rain from the sky", "playing cards scatter to the winds", "a jackpot can be heard being won on a slot machine in the distance", "a slot machine scrolling rapidly through its options winks into existance in front of you"];
    exports.effect_possibilities[exports.SPYING] = ["you get the powerful feeling of being watched", "the hairs on the back of your neck stand up but you can't see anyone watching you", "eyes wink into existanc by the dozens in the very air around you, all looking directly at you"];
    exports.effect_possibilities[exports.CLOWNS] = ["calliope music drifts in on the breeze", "balloons twisted into animal shapes and confetti rain down from the sky", "a clown in the distance stares at you"];
    exports.effect_possibilities[exports.DOLLS] = ["blank eyed plastic dolls dance around you", "mannequins jibber and caper around you", "an ornate childs doll with fluffy hair and a porcelain face hovers in front of you"];
    exports.effect_possibilities[exports.OBFUSCATION] = ["you become briefly invisible", "you briefly become completely blind", "all sounds cut off at once"];
    exports.effect_possibilities[exports.DARKNESS] = ["the light's radius gets smaller and smaller as the dark encroaches", "every lightbulb in the room shatters", "your shadow grows and grows and darkens and darkens"];
    exports.effect_possibilities[exports.KILLING] = ["blood begins lapping at your feet in a shallow crimson tide", "knives swirl around you at an alarming pace", "dozens and dozens of guns swirl around you, firing at random"];
    exports.effect_possibilities[exports.MUSIC] = ["indistinct dancers peform a complex number in a ring around you", "visible musical notes swirl and weave through the air", "ephermeral dancers spin in a circle around you", "beautiful music is played by the very air"];
    exports.effect_possibilities[exports.DEFENSE] = ["a whirlwind of shields swirls around you", "armor appears over your body", "a brick wall slams into place in front of you"];
    exports.effect_possibilities[exports.QUESTING] = ["trumpets blaze in the distance", "a new game plus icon floats from the sky", "a quest marker appears"];
};
const initGeneralBackstories = () => {
    exports.general_backstories[exports.ART] = ["would never stop making sculptures if that was an option", "can sketch incredibly lifelike portraits", "always has a dab of paint behind their ears"];
    exports.general_backstories[exports.TECHNOLOGY] = ["can, will, must and should make a robot", "always seem to be on top of the latest technology", "are annoyed that everyone wants them to fix their computer", "can hack into any system"];
    exports.general_backstories[exports.TIME] = ["are always on time to everything", "are kind of impatient", "seem to always have unlimited energy", "always know what time it is", "have an instinctive understanding of timing"];
    exports.general_backstories[exports.SPACE] = ["seem to always be a mile away when everyone is supposed to meet up", "are a very patient person", "have an amazing spatial sense", "always want to talk about space", "love being as high up as possible", "have absolutely no fear of heights"];
    exports.general_backstories[exports.STEALING] = ["have extremely light fingers", "have never met and object they didn't want to own", "have never been on the right side of the law", "have been in jail a few times"];
    exports.general_backstories[exports.FREEDOM] = ["never let anyone tie them down", "have travel in their soul", "have never been able to settle down anywhere", "prides themself in their freedom"];
    exports.general_backstories[exports.FIRE] = ["are always enthralled by fire", "have a habit of setting everything on fire", "find fire really calming", "think fire is the best solution to most problems", "think that if you add fire to a problem you have a new problem"];
    exports.general_backstories[exports.LONELY] = ["are somehow always alone", "never really bonded with anyone", "feel comfortable on their own", "have social anxiety", "don't feel comfortable in a crowd", "mostly just focus on themself"];
    exports.general_backstories[exports.OCEAN] = ["are married to the sea", "love the ocean with all their heart", "are always surrounded by a thin fog", "can navigate any amount of seas", "feel most comfortable in the water", "can swim like a fish"];
    exports.general_backstories[exports.FLESH] = ["genuinely enjoy working out", "are remarkably beautiful", "have really good bones", "really are comfortable in their own skin"];
    exports.general_backstories[exports.BURIED] = ["are really calm under pressure", "really enjoy digging at the beach", "enjoy spelunking as a hobby"];
    exports.general_backstories[exports.SCIENCE] = ["enjoys learning the 'why' of everything", "treat life like a series of experiments", "always wear a labcoat"];
    exports.general_backstories[exports.MATH] = ["are a very logical person", "can do all sorts of math in their head", "enjoy memorizing mathematical formulas"];
    exports.general_backstories[exports.TWISTING] = ["like things that arent what they seem but also are", "delight in getting someone to believe a lie", "really enjoy fractals", "enjoy needlessly convoluted plots", "constantly play tricks on those around them", "once tricked a friend into believing 'bananas' weren't actually real fruit", "created the game you are currently playing", "resolutely insist that 'fractal' is pronounced 'frack tall'", "lurk behind the options screen", 'hate you in particular', "are watching you", "know what you did", "are smiling just for you", "only want for you to realize the truth", "have never told you a lie", "would never give you up", "are the true reason this game exists", "are waiting for you", "wish you would find them already", "wonder if you've ever heard of the javascript console", "make this expression a lot: :) :) :)", "honestly don't know what you are doing here", "reassure you the menu is supposed to close", "suggest you just keep hitting the escape key"];
    exports.general_backstories[exports.DEATH] = ["think about death a lot", "are more comfortable with the dead than the living", "really are chill about the inevitability of death", "sometimes talk for hours about how nihlism is only logical"];
    exports.general_backstories[exports.APOCALYPSE] = ["constantly spew ominous bullshit", "alway remind everyone of how fragile the world truly is", "are just really a huge fan of apocalyptic explosions"];
    exports.general_backstories[exports.ANGELS] = ["walk the path of the gods", "always are a righteous person", "think deeply about the gods", "are a deeply religious person", "strive to do the will of the gods"];
    exports.general_backstories[exports.LIGHT] = ["shine with light wherever they go", "always look on the bright side of any situation", "always have a light source on hand"];
    exports.general_backstories[exports.SERVICE] = ["do their best to help those in need", "are always there with a helping hand", "keep their room spotless", "clean whenever they are stressed"];
    exports.general_backstories[exports.FAMILY] = ["love their family with all their heart", "do everything for their family", "really loves their found family"];
    exports.general_backstories[exports.MAGIC] = ["have a natural talent for magic", "are one of the skilled mages of this Era", "are a powerful Enchanter"];
    exports.general_backstories[exports.HEALING] = ["have a powerful healing aura", "have extensive medical training", "never ignore suffering"];
    exports.general_backstories[exports.PLANTS] = ["have an enduring love of flowers", "feel more comfortable in a forest than a city", "garden as a hobby"];
    exports.general_backstories[exports.HUNTING] = ["can track any person across any distance", "always seem to be hunting for the next big thing", "are a skilled tracker", "can survive indefinitely in the wild from game and foraging"];
    exports.general_backstories[exports.DECAY] = ["are a toxic person", "feel comfortable around the dead", "are always showing people gross things", "somehow always let food go bad"];
    exports.general_backstories[exports.CHOICES] = ["are always aware that doing nothing is also a choice", "enjoy taunting others with their lack of choices"];
    exports.general_backstories[exports.ZAP] = ["really could stand to lay off with the electricity", "think having an elemental affinity is a subsitute for a personality"];
    exports.general_backstories[exports.LOVE] = ["love everyone they meet", "do everything with love", "never let hate into their heart"];
    exports.general_backstories[exports.SOUL] = ["know themselves quite thoroughly", "have a very stable personality", "are always looking into a mirror", "can see straight to anyones soul"];
    exports.general_backstories[exports.ANGER] = ["have trouble controlling their temper", "aren't shy about letting people know when theres is a problem"];
    exports.general_backstories[exports.WEB] = ["are a smug chess-master", "are manipulative to their core", "really enjoy spiders", "think spiders are very important to the eco-system"];
    exports.general_backstories[exports.ROYALTY] = ["are experienced with ruling", "have full noble training", "have a princely aura"];
    exports.general_backstories[exports.ENDINGS] = ["were always going to end up dead", "will be an existentialist", "will focus more on the ending than the begining", "will keep their thoughts firmly in the future"];
    exports.general_backstories[exports.KNOWING] = ["are an accomplished scholar", "are obsessed with knowing everything", "are an insufferable know-it-all"];
    exports.general_backstories[exports.GUIDING] = ["try to gently lead those who are lost", "never gets lost", "are a soothing mentor"];
    exports.general_backstories[exports.CRAFTING] = ["enjoy wood-working in their spare time", "are quite a skilled craftman", "are always collecting small objects to make things with"];
    exports.general_backstories[exports.LANGUAGE] = ["alway have their nose in a book", "speaks every language of Zampanio", "can curse in a different language for each day of the week"];
    exports.general_backstories[exports.BUGS] = ["does light bee-keeping when at home", "don't find bugs creepy", "always have at least one bug on their body"];
    exports.general_backstories[exports.ADDICTION] = ["enjoy gambling for any stakes", "have an addictive personality", "have never met a vice they didn't like"];
    exports.general_backstories[exports.SPYING] = ["have an extensive information network", "are always on top of the local gossip", "somehow always are aware of what everyone is doing"];
    exports.general_backstories[exports.CLOWNS] = ["are a clown", "have extensive ties to the Circus", "are an accomplished teller of jokes"];
    exports.general_backstories[exports.DOLLS] = ["carry around a small antique doll", "carve faceless wooden figurines in their spare time"];
    exports.general_backstories[exports.OBFUSCATION] = ["speak only in annoying riddles", "can write in any cipher", "never say what they actually mean", "seem to always be in the background"];
    exports.general_backstories[exports.DARKNESS] = ["wear only black", "prefer moonlight to sunlight", "are more than a little edgy", "can see in the dark"];
    exports.general_backstories[exports.KILLING] = ["once killed a man just to see him die", "are cloaked in killing intent", "seem to always be covered in blood", "have an alarming collection of knives"];
    exports.general_backstories[exports.MUSIC] = ["alway have a song on their lips", "can play any song they hear once by ear", "always has an instrument nearby", "always love being the eye of attention"];
    exports.general_backstories[exports.DEFENSE] = ["always protect the weak", "are always on edge for attack", "are always aware of all the exits", "sleep in full-plate armor"];
    exports.general_backstories[exports.QUESTING] = ["absolutely love helping out the little people", "are always on the lookout for the next great adventure"];
};
const initChildBackstories = () => {
    exports.child_backstories[exports.ART] = ["had the biggest crayon set as a child", "took great pride in their drawings being displayed on the fridge as a child", "loved creating little works of art as a child"];
    exports.child_backstories[exports.TECHNOLOGY] = ["never got tired of screen time as a child", "always loved robots as a child", "always had their nose in a screen as a child"];
    exports.child_backstories[exports.TIME] = ["sometimes talk about their childhood as if it were yesterday", "always woke up before they had to as a child", "never wanted to sleep as a child"];
    exports.child_backstories[exports.SPACE] = ["were a very patient child", "loved high places as a child", "were always tall for their age"];
    exports.child_backstories[exports.STEALING] = ["kept getting into locked places as a child", "were always breaking rules as a child", "somehow ended up with all their friends toys as a child"];
    exports.child_backstories[exports.FREEDOM] = ["could never stay in one place for very long as a child", "moved around a lot as a child", "wandered around constantly as a child"];
    exports.child_backstories[exports.FIRE] = ["burned a lot of their childhood toys", "always snuck matches as a child", "lost their childhood home to a fire"];
    exports.child_backstories[exports.LONELY] = ["were a lonely child", "never had any friends as a child", "were an orphan as a child", "were an only child"];
    exports.child_backstories[exports.OCEAN] = ["learned to swim before they learned to walk", "grew up in a seaside town", "always went with their parents on sea voyages as a child"];
    exports.child_backstories[exports.FLESH] = ["always enjoyed eating meat as a child", "were fascinated that everyone was made of meat as a child", "were always praised for their physical abilities as a child"];
    exports.child_backstories[exports.BURIED] = ["always loved playing in the sandbox as a kid", "really enjoyed weighted blankets as a child", "were always the kid who tattled to teachers"];
    exports.child_backstories[exports.SCIENCE] = ["never stopped asking 'why' as a child", "always loved learning about science as a child", "loved telling people Cool Biology Facts all the time as a child"];
    exports.child_backstories[exports.MATH] = ["were a math prodigy growing up", "always seemed to remember numbers as a child", "took to math easily as a child"];
    exports.child_backstories[exports.TWISTING] = ["are still a child", "were never a child", "were always a child", "were born old and aged backwards", "spent a lot of time lost in the backrooms as a child", "exploded into a flock of crows when they hit puberty"];
    exports.child_backstories[exports.DEATH] = ["were a morbid child", "were an orphan", "wandered around a lot in cemetaries as a child"];
    exports.child_backstories[exports.APOCALYPSE] = ["made ominous proclomations often as a child", "constantly asked adults when the world would end", "were fascinated by the meteors that destroyed the dinosaurs as a child"];
    exports.child_backstories[exports.ANGELS] = ["were raised in a convent", "grew up in a very religious family", "always felt the gods spoke to them growing up"];
    exports.child_backstories[exports.LIGHT] = ["grew up in a sparkling sea-side town", "always looked on the bright side as a child"];
    exports.child_backstories[exports.SERVICE] = ["were always the caretaker of their family", "were born to a family in service to the King", "came from a long line of butlers"];
    exports.child_backstories[exports.FAMILY] = ["grew up knowing the meaning of family", "grew up in a huge family", "were always surrounded by siblings as a child"];
    exports.child_backstories[exports.MAGIC] = ["were a child progidy for magic", "always had a sense of wonder as a child", "loved the idea of magic as a child"];
    exports.child_backstories[exports.HEALING] = ["were a child apprentice to a local doctor", "always knew where the family first aid kit was"];
    exports.child_backstories[exports.PLANTS] = ["had the green thumb of the family", "spent more time with flowers than other children"];
    exports.child_backstories[exports.HUNTING] = ["provided for their family from a young age", "loved tracking the wild animals of the Forest"];
    exports.child_backstories[exports.DECAY] = ["were a sickening cute child", "enjoyed the solitude of graveyards as a child", "found a quiet beauty in decay even as a child"];
    exports.child_backstories[exports.CHOICES] = ["loved mazes as a child", "were a strong-headed child", "were a stubborn child"];
    exports.child_backstories[exports.ZAP] = ["were an electrifying child", "were tied to the element of thunder even as a child"];
    exports.child_backstories[exports.LOVE] = ["grew up in a very loving family", "loved everyone", "never felt unloved growing up"];
    exports.child_backstories[exports.SOUL] = ["were a very self-assured child", "knew exactly what they wanted to be when they grew up"];
    exports.child_backstories[exports.ANGER] = ["were a very violent child", "were a bully as a kid", "had trouble controlling their temper as a child"];
    exports.child_backstories[exports.WEB] = ["were great at convincing their friends and younger siblings what to do", "excelled at using puppy-dog eyes to get their way as a child", "somehow never seemed to be the one to take the fall for their childhood pranks"];
    exports.child_backstories[exports.ROYALTY] = ["grew up in the lap of luxury", "grew up as the scion of a ruling family", "spent their whole life knowing they were heir to the throne"];
    exports.child_backstories[exports.ENDINGS] = ["always enjoyed spoilers as a child", "cried for hours at the ending to their favorite childhood book"];
    exports.child_backstories[exports.KNOWING] = ["were a bookish child", "could not stop asking 'why' as a child", "were a bright child"];
    exports.child_backstories[exports.GUIDING] = ["always knew the best places to play as a child", "lead their small band of childhood friends"];
    exports.child_backstories[exports.CRAFTING] = ["loved to make things as a child", "were always showing teachers and parents their latest creation"];
    exports.child_backstories[exports.LANGUAGE] = ["always had their nose in a book as a child", "were a surprisingly articulate child", "loved to learn the meanings of words", "had their first word be 'Mother', not 'ma'"];
    exports.child_backstories[exports.BUGS] = ["enjoyed collecting beetles as a child", "had a butterfly collection as a child", "were fascinated with bees as a child"];
    exports.child_backstories[exports.ADDICTION] = ["couldn't stay away from the local Faire each year as a child", "always convinced their childhood friends to play 'one more game'"];
    exports.child_backstories[exports.SPYING] = ["grew up always watching others", "seemed to always be lurking in the corners as a child", "spied on adults growing up"];
    exports.child_backstories[exports.CLOWNS] = ["grew up in a traveling circus", "always had a joke for the other children growing up", "were a playful, funny child", "were always the class clown growing up"];
    exports.child_backstories[exports.DOLLS] = ["would hold elaborate teaparties with their dolls as a child", "talked through their dolls as a child", "had a favorite doll as a child"];
    exports.child_backstories[exports.OBFUSCATION] = ["were a mysterious child", "kept a secret diary as a child", "learned to write in ciphers as a child"];
    exports.child_backstories[exports.DARKNESS] = ["never were afraid of the dark as a child", "were weirdly good at seeing in the dark as a child"];
    exports.child_backstories[exports.KILLING] = ["were adangerous child", "have a dark childhood secret", "unsettled the neighbors as a child"];
    exports.child_backstories[exports.MUSIC] = ["were a musical child", "loved singing as a child", "learned so many songs from their parents"];
    exports.child_backstories[exports.DEFENSE] = ["protected the neighborhood children growing up", "always protected the littler kids growing up"];
    exports.child_backstories[exports.QUESTING] = ["were an obsessive child", "came up with the best games as a child", "loved playing scavenger hunts as a child"];
};
const initThemes = () => {
    initStatsMap();
    initPeople();
    initObjects();
    initLocations();
    initAdjs();
    initSuperNames();
    initInsults();
    initCompliments();
    initMemories();
    initMenuOptions();
    initChildBackstories();
    initGeneralBackstories();
    initMiracles();
    initSongs();
    initFloorPossibilities();
    initWallPossibilities();
    initWallBackgrounds();
    initWallForegrounds();
    initFloorForegrounds();
    initFloorBackgrounds();
    initLocDesc();
    initPhilosophy();
    initMonsterDesc();
    initSmells();
    initTastes();
    initFeelings();
    initSounds();
    initEffectPossibilities();
    initThemeOpinions();
    initSpritePossibilities();
    initFilters();
};
exports.initThemes = initThemes;


/***/ }),

/***/ 3790:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApocalypseEngine = void 0;
const __1 = __webpack_require__(3607);
const misc_1 = __webpack_require__(4079);
const PasswordStorage_1 = __webpack_require__(9867);
const TypingMinigame_1 = __webpack_require__(8048);
const defaultSpeed = 0;
class ApocalypseEngine {
    constructor(parent) {
        this.typing = false;
        this.passwords = [];
        this.speed = defaultSpeed;
        this.clickAudio = new Audio("audio/web_SoundFX_254286__jagadamba__mechanical-switch.mp3");
        //where in the password list are you.
        this.current_index = -1;
        this.levelTimes = [];
        this.init = () => {
            if (!this.parent) {
                return;
            }
            window.onmousedown = () => {
                this.speed = 0;
            };
            window.onmouseup = () => {
                this.speed = defaultSpeed;
            };
            window.ontouchstart = () => {
                this.speed = 0;
            };
            window.ontouchend = () => {
                this.speed = defaultSpeed;
            };
            this.parent.style.cssText =
                `font-family: gamer;
        color: #00ff00;
        font-size: 18px;
        background:black;`;
            const crt = (0, misc_1.createElementWithId)("div", "crt");
            const scanline = (0, misc_1.createElementWithIdAndParent)("div", crt, undefined, "scanline");
            const lines = (0, misc_1.createElementWithIdAndParent)("div", crt, undefined, "lines");
            this.terminal = (0, misc_1.createElementWithIdAndParent)("div", crt, "terminal");
            this.parent.append(crt);
            this.transcript("Please practice typing the following words...");
            this.minigame = new TypingMinigame_1.TypingMiniGame(this.terminal, "True confessions of a Doctor. Please Listen. I am. Trying.", this.handleCallback);
            //good job: can you go faster?
        };
        this.handleCallback = (text, loadNext = false, time) => {
            this.transcript(text);
            if (loadNext) {
                if (time) {
                    this.levelTimes.push(time);
                }
                this.loadNextPassword();
            }
        };
        this.loadNextPassword = () => {
            console.log("JR NOTE: loading next password");
            this.current_index++;
            this.loadPassword();
        };
        this.loadPassword = () => {
            if (!this.terminal) {
                this.transcript("What did you do?");
                return;
            }
            this.terminal.innerHTML = "";
            console.log("JR NOTE: loading password");
            if (Object.values(PasswordStorage_1.docSlaughtersFiles).length <= this.current_index) {
                this.transcript("Thank you for practicing your typing. Do you Understand what you have learned? Please tell me you Understand...");
            }
            const secret = Object.values(PasswordStorage_1.docSlaughtersFiles)[this.current_index];
            console.log("JR NOTE: loading next password secret is", secret);
            this.transcript(`
            Level Times: ${this.levelTimes.map((time, level) => `Level${level + 1}:${time}`).join(", ")}
        Please practice typing the following, entirely random, words, in order of difficulty:`);
            const text = (0, __1.loadSecretText)(secret.text);
            if (text.trim() != "") {
                this.minigame?.parseText(text);
            }
        };
        this.transcript = async (linesUnedited) => {
            if (!this.terminal) {
                return;
            }
            const lines = linesUnedited.split("\n");
            for (let line of lines) {
                const element = (0, misc_1.createElementWithIdAndParent)("p", this.terminal);
                this.typeWrite(element, line);
            }
        };
        this.typeWrite = async (element, text) => {
            this.typing = true;
            let skipping = false;
            for (let i = 0; i < text.length; i++) {
                if (!skipping) {
                    await (0, misc_1.sleep)(this.speed);
                    this.clickAudio.play();
                    element.innerHTML += text.charAt(i);
                }
                skipping = false;
                if (!this.typing) {
                    break;
                }
            }
        };
        this.parent = parent;
        this.init();
    }
}
exports.ApocalypseEngine = ApocalypseEngine;


/***/ }),

/***/ 9867:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you
//if you want to SHOW UP then what you do is figure out where these passwords are leaked :) :) :)
//if anyone can explain the origin of each one you'll unlock secret content directly from me
//hell, if you can even do a majority I'd love to hear it, in all sincerity. I love hearing people find my work interesting :)
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.text = exports.docSlaughtersFiles = exports.passwords = exports.Slaughter = exports.Secret = exports.initRabbitHole = exports.translate = exports.albhed_map = void 0;
const Transcript_1 = __webpack_require__(8122);
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
    "z": "W",
    "0": "https://www.tumblr.com/blog/view/figuringoutnothing/688028145704665088?source=share",
    "1": "http://farragofiction.com/DevonaFears",
    "2": "https://verbosebabbler.tumblr.com/post/692334755682877440/the-faq-who-is-writing-this-thing",
    "3": "https://app.milanote.com/1O9Vsn15w4UteW/shipping-grid?p=i9yTbJxrme8 by the Watcher of Threads",
    "4": "http://farragofiction.com/PerfectHeist/",
    "5": "https://theobscuregame.tumblr.com/   the waste's arc number, except without numbers (The Watcher says they won't spell it out)",
    "7": "https://www.royalroad.com/fiction/56715/the-encyclopedia-arcane",
    "8": "https://figuringoutnothing.tumblr.com/post/691448067434676224/so-uh-i-might-have-gone-into-a-fugue-state-and",
    "9": "https://scratch.mit.edu/projects/719496869/ Taxonomist of Strangers",
    "!": "http://farragofiction.com/DocSlaughterFileServer",
    "?": "http://farragofiction.com/ParkerLotLost/",
    ".": "http://farragofiction.com/NotebookSimulator/",
    ",": "http://farragofiction.com/LightAndVoid/?dearWitherby=true",
    ";": "https://github.com/FarragoFiction/EastEast"
    //0: http://farragofiction.com/ParkerLotLost/ <-- maybe this will be EastEastEast one day, that or ElevatorSim
    //11: http://farragofiction.com/DocSlaughterFileServer 
    //https://jadedresearcher.tumblr.com/post/692341174641606656
    //https://jadedresearcher.tumblr.com/post/692340754690015232/but-like-italians-are-real-and-arent-all
};
const translate = (word) => {
    let ret = word.toLowerCase();
    let done = "";
    for (let i = 0; i < word.length; i++) {
        if (exports.albhed_map[ret[i]] && !done.includes(ret[i])) {
            done += ret[i];
            //replaceAll is actually really new, ts doesn't like it rip
            ret = ret.replaceAll(ret[i], exports.albhed_map[ret[i]]);
        }
    }
    return ret;
};
exports.translate = translate;
const initRabbitHole = (room) => {
    const hole = document.querySelector("#rabbithole");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const password = urlParams.get('password');
    if (password) {
        const target = document.querySelector("body");
        if (!target) {
            return;
        }
        target.innerHTML = ""; //clear;
        const te = new Transcript_1.TranscriptEngine(target);
        te.handlePW(password);
    }
    else {
        hole.onclick = () => {
            const target = document.querySelector("body");
            if (!target) {
                return;
            }
            room.stopTicking();
            target.innerHTML = ""; //clear;
            const te = new Transcript_1.TranscriptEngine(target);
        };
    }
};
exports.initRabbitHole = initRabbitHole;
class Secret {
    constructor(title, text, html, video_file_name) {
        this.video_file_name = video_file_name;
        this.bonus_html = html;
        this.text = text;
        this.title = title;
    }
}
exports.Secret = Secret;
class Slaughter {
    constructor(title, text, completion_comment) {
        this.text = text;
        this.title = title;
        this.completion_comment = completion_comment;
    }
}
exports.Slaughter = Slaughter;
//https://archiveofourown.org/works/40961847
/*
each password has a cctv feed (or at least a list of animation frames loaders (src and duration)?), an optional voice section, an optional text section (print out under cctv ffed)
*/
/*
99 Rooms
eternal darkness
chimps don't dance for bastards
mutations on mutations on mutations :)
ZampanioBroken
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
exports.passwords = {
    "STANDARD EXPECTOPATRONUM": new Secret("Confessionals 0", "Secrets/Content/0.js"),
    "STANDARD SALMONSUSHI": new Secret("Confessionals 1", "Secrets/Content/1.js"),
    "THE END IS NEVER THE END": new Secret("Confessionals 2", "Secrets/Content/2.js"),
    "YOU CAN GET BETTER": new Secret("Confessionals 3", "Secrets/Content/3.js"),
    "KNOW RESTRAINT": new Secret("Confessionals 4", "Secrets/Content/4.js"),
    "NO RESTRAINT": new Secret("Confessionals 5", "Secrets/Content/5.js"),
    "POWER CORRUPTS": new Secret("Jumbled Mess", "Secrets/Content/20.js"),
    "KNOWLEDGE IS POWER": new Secret("Jumbled Mess: Explanation", "Secrets/Content/21.js"),
    "LEAVE YOUR MARK": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/22.js"),
    "TAKE YOUR PLACE IN HISTORY": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/23.js"),
    "THE FOOL IS DEAD": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/24.js"),
    "BITS OF THE PAST LEAK INTO THE PRESENT": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/26.js"),
    "INFINITE AMOUNT OF PAIN": new Secret("Do you remember the first time you killed someone?", "Secrets/Content/27.js"),
    "PEER INTO THE ABYSS AND SEE WHAT LIES BENEATH": new Secret("Hostage's Lament", "Secrets/Content/28.js"),
    "ELIAS SMITH": new Secret("JR Ramble", "Secrets/Content/29.js"),
    "ONCE YOU OPEN THE CURTAINS ALL THAT'S LEFT TO DO IS GO TO THE OTHER SIDE AND CLOSE THEM AGAIN": new Secret("Notes of Slaughter 15", "Secrets/Content/35.js"),
    "PARADISE AND PARASITE": new Secret("ARM2: LOOP ???", "Secrets/Content/38.js"),
    "WIDOWS WEAVE": new Secret("BLAME THE SPIDERS FOR THIS", "", "", "http://farragofiction.com/ZampanioHotlink/Films/spiders.mp4") //widows weave was a famous Web aligned cursed video in the magnus archives, figured i'd throw yall a bone because its so obscure
    ,
    "NO NEED TO ASK WHY": new Secret("Herald Made MY JAM", "", "", "http://farragofiction.com/ZampanioHotlink/Films/heraldstacos.mp4"),
    "HOW YOUR BRAIN LIES TO YOU": new Secret("JR RAMBLE", "Secrets/Content/42.js"),
    "BLUE CAN SEE MORE THAN ORANGE": new Secret("GIGGLESNORT", "Secrets/Content/44.js"),
    "YOU IS NEEDED": new Secret("Quotidian", "", `<video class='fuckedup' src="http://farragofiction.com/ZampanioHotlink/Films/michael_from_vsauce_says_quotidian.mp4" loop="true" controls="true" autoplay="true"></video>`),
    "ZAMPANIOBROKEN": new Secret("The Watcher of Threads is right: Wanda would love these:", "", `<iframe class="fuckedup" width="560" height="315" src="https://www.youtube.com/embed/cTspoOpLgfc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`),
    "EARWORM HUMMING IN A DREAM": new Secret("24/7 ABSOLUTE BULLSHIT", "", `<iframe class="fuckedup" width="560" height="315" src="https://www.youtube.com/embed/16WNvL8Gtt0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`),
    "LS": new Secret("FILE LIST (UNIX)", "Secrets/PasswordStorage.ts"),
    "DIR": new Secret("FILE LIST (DOS)", "Secrets/PasswordStorage.ts")
};
//note: the point of the slaughter notes is to highlight the diffrence between a mindless autonomata and the full, vibrant person
exports.docSlaughtersFiles = {
    "PLACE YOUR TRUST IN ME": new Slaughter("Notes of Slaughter: Prelude", "Secrets/Content/6.js", "I wanted to make sure I Did Not Forget, so I Wrote It All Down."),
    "RAISE YOU FROM THE END OF THE WORLD": new Slaughter("Notes of Slaughter 0", "Secrets/Content/7.js", "Child, do you Understand?"),
    "SERENE AND CALM": new Slaughter("Notes of Slaughter 1", "Secrets/Content/8.js"),
    "BEWARE OBLIVION IS AT HAND": new Slaughter("Notes of Slaughter 2", "Secrets/Content/9.js"),
    "I AM HERE TO TREAT DISEASE": new Slaughter("Notes of Slaughter 3", "Secrets/Content/10.js"),
    "FLESH IS BOUND TO THE FLOW OF TIME": new Slaughter("Notes of Slaughter 4", "Secrets/Content/11.js"),
    "TIME IS DEAD": new Slaughter("Notes of Slaughter 5", "Secrets/Content/12.js"),
    "SAVE YOUR LIFE FROM DESTRUCTION": new Slaughter("Notes of Slaughter 6", "Secrets/Content/13.js"),
    "GENTLE CROONING VOICE": new Slaughter("Notes of Slaughter 7", "Secrets/Content/14.js"),
    "LOOKS AFTER THE BROKEN": new Slaughter("Notes of Slaughter 8", "Secrets/Content/15.js"),
    "TAKE CARE OF OTHERS": new Slaughter("Notes of Slaughter 9", "Secrets/Content/16.js"),
    "IT WAS DAWN": new Slaughter("Notes of Slaughter 10", "Secrets/Content/17.js"),
    "THE SOUL IS IMMORTAL": new Slaughter("Notes of Slaughter 11", "Secrets/Content/18.js"),
    "WHEN ALL HAD ABANDONED HOPE": new Slaughter("Notes of Slaughter 12", "Secrets/Content/19.js"),
    "TELLBRAK3700": new Slaughter("Notes of Slaughter 13", "Secrets/Content/30.js"),
    "PENNY WICKNER": new Slaughter("Notes of Slaughter 14", "Secrets/Content/31.js"),
    "EXPERIMENTALMUSIC": new Slaughter("Notes of Slaughter 16: ExperimentalMusic", "Secrets/Content/36.js")
};
//future me, don't forget https://www.tumblr.com/blog/view/jadedresearcher/688182806608838656?source=share
exports.text = `${Object.keys(exports.passwords).length} Items:.\n.\n.\n.\n ${Object.keys(exports.passwords).join("\n")}`;


/***/ }),

/***/ 8122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranscriptEngine = void 0;
const __1 = __webpack_require__(3607);
const misc_1 = __webpack_require__(4079);
const PasswordStorage_1 = __webpack_require__(9867);
const defaultSpeed = 66;
class TranscriptEngine {
    constructor(parent) {
        this.typing = false;
        this.speed = defaultSpeed;
        this.clickAudio = new Audio("audio/web_SoundFX_254286__jagadamba__mechanical-switch.mp3");
        this.text = "";
        this.init = () => {
            if (!this.parent) {
                return;
            }
            window.onmousedown = () => {
                this.speed = 0;
            };
            window.onmouseup = () => {
                this.speed = defaultSpeed;
            };
            window.ontouchstart = () => {
                this.speed = 0;
            };
            window.ontouchend = () => {
                this.speed = defaultSpeed;
            };
            this.parent.style.cssText =
                `font-family: gamer;
        color: #00ff00;
        font-size: 18px;
        background:black;`;
            const crt = (0, misc_1.createElementWithId)("div", "crt");
            const scanline = (0, misc_1.createElementWithIdAndParent)("div", crt, undefined, "scanline");
            const lines = (0, misc_1.createElementWithIdAndParent)("div", crt, undefined, "lines");
            const terminal = (0, misc_1.createElementWithIdAndParent)("div", crt, "terminal");
            this.form = (0, misc_1.createElementWithIdAndParent)("form", crt);
            const input = (0, misc_1.createElementWithIdAndParent)("input", this.form, "terminal-input");
            const button = (0, misc_1.createElementWithIdAndParent)("button", this.form, undefined, 'terminal-button');
            button.innerText = "SUBMIT";
            this.form.onsubmit = (e) => {
                e.preventDefault();
                this.handlePW(input.value);
            };
            input.placeholder = "Enter Password Now";
            input.autofocus = true;
            this.parent.append(crt);
            this.transcript("Long Touch or Hold Mouse Down To Speedup Text");
        };
        this.handleBadPW = (text) => {
            this.text = (0, PasswordStorage_1.translate)(text);
            this.play();
        };
        this.handleGoodPW = (text) => {
            const secret = PasswordStorage_1.passwords[text.toUpperCase()];
            this.text = secret.title + "\n";
            if (secret.text.trim() != "") {
                this.text += (0, __1.loadSecretText)(PasswordStorage_1.passwords[text.toUpperCase()].text);
            }
            this.video = secret.video_file_name;
            this.bonusHtml = secret.bonus_html;
            this.play();
        };
        this.handlePW = (text) => {
            //if good, load the right file
            //if bad, albhed time baby
            if (PasswordStorage_1.passwords[text.toUpperCase()]) {
                this.handleGoodPW(text);
            }
            else {
                this.handleBadPW(text);
            }
        };
        this.play = () => {
            this.transcript(this.text);
        };
        this.transcript = async (linesUnedited) => {
            const lines = linesUnedited.split("\n");
            const terminal = document.querySelector("#terminal");
            if (!terminal) {
                return;
            }
            terminal.innerHTML = "";
            if (this.video) {
                const video_ele = (0, misc_1.createElementWithIdAndParent)("video", terminal);
                video_ele.src = this.video;
                video_ele.controls = false;
                video_ele.autoplay = true;
            }
            if (this.bonusHtml) {
                const ele = (0, misc_1.createElementWithIdAndParent)("div", terminal);
                ele.innerHTML = this.bonusHtml;
            }
            for (let line of lines) {
                const element = document.createElement("p");
                terminal.append(element);
                await this.typeWrite(terminal, element, line);
                await (0, misc_1.sleep)(this.speed * 10);
            }
        };
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
        this.typeWrite = async (scroll_element, element, text) => {
            this.typing = true;
            let skipping = false;
            for (let i = 0; i < text.length; i++) {
                if (text.charAt(i) === "[" || text.charAt(i) === "<") {
                    skipping = true;
                    i = this.doChunkAllAtOnce(element, i, text);
                }
                if (!skipping) {
                    await (0, misc_1.sleep)(this.speed);
                    this.clickAudio.play();
                    element.innerHTML += text.charAt(i);
                }
                scroll_element.scrollTop = scroll_element.scrollHeight;
                skipping = false;
                if (!this.typing) {
                    break;
                }
            }
        };
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
        this.parent = parent;
        this.init();
    }
}
exports.TranscriptEngine = TranscriptEngine;


/***/ }),

/***/ 8048:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypingMiniGame = void 0;
const misc_1 = __webpack_require__(4079);
const StringUtils_1 = __webpack_require__(7036);
class TypingMiniGame {
    constructor(parent, original_text, callback) {
        this.audio = new Audio("audio/511397__pjhedman__se2-ding.mp3");
        //what word are you typing
        this.current_index = 0;
        this.wordsRemaining = () => {
            let ret = 0;
            for (let word of Object.values(this.unique_word_map)) {
                if (!word.typed) {
                    ret++;
                }
            }
            return ret;
        };
        this.parseText = (text) => {
            this.original_text = `${text}`;
            this.content.remove();
            this.timerEle.remove();
            this.sentenceEle.remove();
            this.sentenceListEle.remove();
            this.wordsLeft.remove();
            this.wordsLeft = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
            this.timerEle = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
            this.content = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
            this.sentenceEle = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
            this.sentenceListEle = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
            this.sentenceEle.innerHTML = "<hr><p>The words you've typed could, in theory, make a sentence such as these:</p>";
            this.content.style.fontSize = "42px";
            this.current_index = 0;
            text = text.replaceAll(/\n/g, " ");
            const probable_sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
            if (probable_sentences) {
                this.sentences = probable_sentences.map((sentence) => { return { text: sentence, displayed: false }; });
            }
            else {
                this.sentences = [];
            }
            const split_words = text.split(" ");
            for (let w of split_words) {
                let word = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
                if (word.trim() !== "") {
                    if (Object.keys(this.unique_word_map).includes(word.toLowerCase())) {
                        this.unique_word_map[word] = { word: word, typed: this.unique_word_map[word].typed, times_seen: this.unique_word_map[word].times_seen + 1 };
                    }
                    else {
                        this.unique_word_map[word] = { word: word, typed: false, times_seen: 1 };
                    }
                }
            }
            this.sorted_word_list = Object.keys(this.unique_word_map).sort((a, b) => { return a.length - b.length; });
            this.startTime = new Date();
            this.timer = setInterval(this.timerFunction, 50);
            this.displayGame();
        };
        this.checkForSentences = () => {
            console.log("JR NOTE: checking for sentences.");
            for (let sentence of this.sentences) {
                if (!sentence.displayed) {
                    console.log(`JR NOTE: ${sentence.text} is not yet displaed. `);
                    const split_words = sentence.text.split(" ");
                    console.log(`JR NOTE: split words is ${split_words}`);
                    let readyToDisplay = true;
                    for (let w of split_words) {
                        console.log(`JR NOTE: is word typed yet?`, w);
                        let word = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
                        if (word.trim() !== "") {
                            if (Object.keys(this.unique_word_map).includes(word) && !this.unique_word_map[word].typed) {
                                console.log(`JR NOTE: w ${w} was not yet typed`);
                                readyToDisplay = false;
                                break;
                            }
                        }
                    }
                    if (readyToDisplay) {
                        this.audio.play();
                        //display in reverse order so you can always see your newest Unlock
                        this.sentenceListEle.innerHTML = `<li>${sentence.text}</li>${this.sentenceListEle.innerHTML}`;
                        sentence.displayed = true;
                    }
                }
            }
        };
        //set the current word as typed, check if the next word has been typed yet
        //if it has, go to the next word
        //if it hasn't, display the typing minigame
        //and if there ISN"T a next word, callback to your parent
        this.nextWord = () => {
            const current_word = this.sorted_word_list[this.current_index];
            this.unique_word_map[current_word].typed = true;
            this.wordsLeft.innerHTML = `${this.wordsRemaining()} words remaining in this Practice Level.`;
            this.current_index++;
            this.checkForSentences();
            //TODO handle checking if theres any sentences, and if so , showcase it
            if (this.current_index >= this.sorted_word_list.length) {
                const time = this.getTimeString();
                clearInterval(this.timer);
                const helpfulHint = (0, misc_1.createElementWithIdAndParent)("div", this.content);
                helpfulHint.innerHTML = `<p>Since you typed up this story yourself, I suppose theres no reason not to show you. Obviously you already know it. How could it be Confidential?</p>`;
                helpfulHint.style.fontSize = "18px";
                const story = (0, misc_1.createElementWithIdAndParent)("div", this.content, undefined, "storyOfSlaughter");
                let lines = this.original_text.split("\n");
                for (let line of lines) {
                    story.innerHTML += `<p>${line}</p>`;
                }
                const button = (0, misc_1.createElementWithIdAndParent)("button", this.content);
                button.onclick = () => {
                    this.callback("", true, time);
                };
                this.audio.play();
                button.innerText = "Load Next Level For Practice";
                return;
            }
            const next_word = this.sorted_word_list[this.current_index];
            //keep 
            if (this.unique_word_map[next_word].typed) {
                this.nextWord();
            }
            else {
                this.displayGame();
            }
        };
        this.findFirstIndex = () => {
            const current_word = this.sorted_word_list[this.current_index];
            if (this.unique_word_map[current_word].typed) {
                this.current_index++;
                this.findFirstIndex();
            }
            else {
                return;
            }
        };
        this.getTimeString = () => {
            return (0, StringUtils_1.getTimeStringBuff)(new Date(new Date() - this.startTime));
        };
        this.timerFunction = () => {
            this.timerEle.innerHTML = `${this.getTimeString()}`;
        };
        this.displayGame = () => {
            this.findFirstIndex();
            this.content.innerHTML = ("");
            this.wordsLeft.innerHTML = `${this.wordsRemaining()} words remaining in this Practice Level.`;
            new WordToType(this.content, this.sorted_word_list[this.current_index], this.nextWord);
        };
        this.callback = callback;
        this.parent = parent;
        this.original_text = `${original_text}`; //being lazy and avoiding having a reference to this get put here if im gonna mutate it
        this.content = (0, misc_1.createElementWithIdAndParent)("div", parent);
        this.sentenceEle = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
        this.timerEle = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
        this.sentenceEle = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
        this.sentenceListEle = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
        this.wordsLeft = (0, misc_1.createElementWithIdAndParent)("div", this.parent);
        this.content.style.fontSize = "42px";
        this.unique_word_map = {};
        this.sentences = [];
        this.startTime = new Date();
        this.sorted_word_list = [];
        this.parseText(original_text);
    }
}
exports.TypingMiniGame = TypingMiniGame;
class WordToType {
    constructor(parent, text, callback) {
        this.stringTypedSoFar = "";
        this.listen = (event) => {
            if (event.key.toLowerCase() === this.stringRemaining[0]) {
                this.stringTypedSoFar += event.key.toLowerCase();
                this.stringRemaining = this.stringRemaining.substring(1);
                this.render();
            }
            if (this.stringRemaining.trim() === "") {
                this.teardown();
            }
        };
        this.setup = () => {
            window.addEventListener('keydown', this.listen);
        };
        this.teardown = () => {
            console.log("JR NOTE: calling teardown");
            window.removeEventListener('keydown', this.listen);
            this.callback();
        };
        this.render = () => {
            console.log("JR NOTE; trying to render", this.stringRemaining);
            this.element.innerHTML = `<span style="color:white">${this.stringTypedSoFar}</span><span>${this.stringRemaining}</span>`;
        };
        this.stringRemaining = text.toLowerCase();
        this.callback = callback;
        this.element = (0, misc_1.createElementWithIdAndParent)("p", parent);
        this.setup();
        this.render();
    }
}


/***/ }),

/***/ 3907:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.turnArrayIntoHumanSentence = exports.uniq = exports.removeItemOnce = void 0;
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
exports.removeItemOnce = removeItemOnce;
//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
const uniq = (a) => { return a.filter(onlyUnique); };
exports.uniq = uniq;
const turnArrayIntoHumanSentence = (retArray) => {
    return [retArray.slice(0, retArray.length - 1).join(', '), retArray[retArray.length - 1]].join(retArray.length < 2 ? '' : ' and ');
};
exports.turnArrayIntoHumanSentence = turnArrayIntoHumanSentence;


/***/ }),

/***/ 5565:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.valueAsArray = exports.initEmptyArrayAtKey = exports.removeStringFromArrayWithKey = exports.addNumToArrayWithKey = exports.addStringToArrayWithKey = exports.isStringInArrayWithKey = void 0;
const ArrayUtils_1 = __webpack_require__(3907);
const isStringInArrayWithKey = (key, target) => {
    return (0, exports.valueAsArray)(key).includes(target);
};
exports.isStringInArrayWithKey = isStringInArrayWithKey;
const addStringToArrayWithKey = (key, target) => {
    const tmp = (0, exports.valueAsArray)(key);
    tmp.push(target);
    localStorage[key] = JSON.stringify(tmp);
};
exports.addStringToArrayWithKey = addStringToArrayWithKey;
const addNumToArrayWithKey = (key, target) => {
    const tmp = (0, exports.valueAsArray)(key);
    tmp.push(target);
    localStorage[key] = JSON.stringify(tmp);
};
exports.addNumToArrayWithKey = addNumToArrayWithKey;
const removeStringFromArrayWithKey = (key, target) => {
    let tmp = (0, exports.valueAsArray)(key);
    tmp = (0, ArrayUtils_1.removeItemOnce)(tmp, target);
    localStorage[key] = JSON.stringify(tmp);
};
exports.removeStringFromArrayWithKey = removeStringFromArrayWithKey;
const initEmptyArrayAtKey = (key) => {
    const tmp = [];
    localStorage[key] = JSON.stringify(tmp);
    return tmp;
};
exports.initEmptyArrayAtKey = initEmptyArrayAtKey;
const valueAsArray = (key) => {
    if (localStorage[key]) {
        return JSON.parse(localStorage[key]);
    }
    else {
        return (0, exports.initEmptyArrayAtKey)(key);
    }
};
exports.valueAsArray = valueAsArray;


/***/ }),

/***/ 8258:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shuffle = exports.getRandomSeed = exports.pickFrom = exports.getRandomNumberBetween = void 0;
const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getRandomNumberBetween = getRandomNumberBetween;
const pickFrom = (array) => {
    return array[(0, exports.getRandomNumberBetween)(0, array.length - 1)];
};
exports.pickFrom = pickFrom;
const getRandomSeed = () => {
    var min = 0;
    var max = 413 * 612 * 1025;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getRandomSeed = getRandomSeed;
const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
exports.shuffle = shuffle;


/***/ }),

/***/ 3450:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
Object.defineProperty(exports, "__esModule", ({ value: true }));
class SeededRandom {
    constructor(seed) {
        //default is zero and one, type is inferred to be a number from this
        this.nextDouble = (min = 0, max = 1) => {
            this.internal_seed = (this.internal_seed * 1664525 + 1013904223) % 4294967296;
            const rnd = this.internal_seed / 4294967296;
            return min + rnd * (max - min);
        };
        this.getRandomNumberBetween = (min, max) => {
            return Math.floor(this.nextDouble() * (max - min + 1)) + min;
        };
        this.pickFrom = (array) => {
            return array[this.getRandomNumberBetween(0, array.length - 1)];
        };
        this.shuffle = (array) => {
            var currentIndex = array.length, temporaryValue, randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(this.nextDouble() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        };
        this.initial_seed = seed;
        this.internal_seed = seed;
    }
}
exports["default"] = SeededRandom;


/***/ }),

/***/ 7036:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Zalgo = exports.isNumeric = exports.getTimeStringBuff = exports.getTimeString = exports.checkTimeMS = exports.checkTime = exports.domWordMeaningFuckery = exports.stringtoseed = exports.replaceStringAt = exports.sentenceCase = exports.titleCase = void 0;
const NonSeededRandUtils_1 = __webpack_require__(8258);
const SeededRandom_1 = __importDefault(__webpack_require__(3450));
const titleCase = (input) => {
    const pieces = input.split(" ");
    const ret = [];
    for (let piece of pieces) {
        if (piece[0]) {
            ret.push(replaceStringAt(piece, 0, piece[0].toUpperCase()));
        }
    }
    return ret.join(" ");
};
exports.titleCase = titleCase;
const sentenceCase = (input) => {
    if (!input.length) {
        return input;
    }
    return replaceStringAt(input, 0, input[0].toUpperCase());
};
exports.sentenceCase = sentenceCase;
function replaceStringAt(str, index, character) {
    return str.substr(0, index) + character + str.substr(index + character.length);
}
exports.replaceStringAt = replaceStringAt;
function stringtoseed(seed) {
    var output = 0;
    for (var i = 0, len = seed.length; i < len; i++) {
        output += seed[i].charCodeAt(0);
    }
    return output;
}
exports.stringtoseed = stringtoseed;
//https://media.discordapp.net/attachments/468574691087613952/863079687276986388/tumblr_qaosxmi6ET1xf64vf.mp4
//https://en.m.wikipedia.org/wiki/Wordplay_(The_Twilight_Zone)
//takes in a sentence, for each word in it decides if its going to fuck it up today.
//seed_multiplier handles making it so that EVERY instance of the word "dog" is treated the same but each time i ask i might decide dog is changeable vs not
function domWordMeaningFuckery() {
    const root = document.querySelector('body');
    const seed_multiplier = (0, NonSeededRandUtils_1.getRandomNumberBetween)(0, 300);
    if (root) {
        const children = root.querySelectorAll("*");
        for (let child of children) {
            const subchildren = child.querySelectorAll("*");
            if (subchildren.length === 0) {
                if (child.textContent) {
                    child.textContent = gaslightWordMeanings(child.textContent, seed_multiplier);
                }
            }
        }
    }
}
exports.domWordMeaningFuckery = domWordMeaningFuckery;
//https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
function checkTime(i) {
    let ret = `${i}`;
    if (i < 10) {
        ret = "0" + i;
    }
    return ret;
}
exports.checkTime = checkTime;
function checkTimeMS(i) {
    let ret = `${i}`;
    if (i < 10) {
        ret = "00" + i;
    }
    else if (i < 100) {
        ret = "0" + i;
    }
    return ret;
}
exports.checkTimeMS = checkTimeMS;
function getTimeString(date) {
    let h = `${date.getHours()}`;
    let m = `${date.getMinutes()}`;
    let s = `${date.getSeconds()}`;
    // add a zero in front of numbers<10
    m = checkTime(date.getMinutes());
    s = checkTime(date.getSeconds());
    return h + ":" + m + ":" + s;
}
exports.getTimeString = getTimeString;
function getTimeStringBuff(date) {
    let m = `${date.getMinutes()}`;
    let s = `${date.getSeconds()}`;
    let ms = `${date.getMilliseconds()}`;
    // add a zero in front of numbers<10
    m = checkTime(date.getMinutes());
    s = checkTime(date.getSeconds());
    ms = checkTimeMS(date.getMilliseconds());
    return +m + ":" + s + ":" + ms;
}
exports.getTimeStringBuff = getTimeStringBuff;
function gaslightWordMeanings(sentence, seed_multiplier) {
    const words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = getWordReplacement(words[i], seed_multiplier);
    }
    return words.join(" ");
}
//takes in a word, turns it into a random seed and if rngesus says so, turns it into another word
function getWordReplacement(word, seed_multiplier) {
    if (word === "you") {
        return "ya'll";
    }
    const gaslightOptions = ["echidna", "[REDACTED]", "null", "dark", "friendless", "alone", "minotaur", "hunt", "flesh", "changeling", "distortion", "watcher", "filth", "minotaur", "worm", "bug", "gas", "flavor", "evil fox", "lazy dog", "quick fox", "dead fox", "terrible fox", "bad fox", "fox", "untrustworthy fox", "taste", "smell", "feeling", "failure", "fear", "horror", "mistake", "line", "stay", "good dog", "canine", "good boy", "good boi", "bark", "garbage", "curious dog", "squirming dog", "make dog", "dog CODE", "artist", "musician", "programmer", "console", "hacker", "secret", "gaslight", "robot", "dog", "boredom", "corridor", "hallway", "backroom", "labyrinth", "minotaur", "maze", "door", "distortion", "spiral", "gravestone", "dinner", "ThisIsNotABG", "player", "ThisIsNotAGame", "ThisIsNotABlog", "situation", "canada", "bot", "observer", "camera", "watcher", "ThisIsNotAnEye", "ThisIsNotASpiral", "wednesday", "trumpets", "sunflower", "dinosaur"];
    const multiplied_seed = stringtoseed(word.toUpperCase()) * seed_multiplier;
    let chance = .99;
    if (window.megaGasLight) {
        chance = 0.90;
    }
    let rand = new SeededRandom_1.default(multiplied_seed);
    if (rand.nextDouble() > chance) {
        const seed = stringtoseed(word.toUpperCase());
        let rand2 = new SeededRandom_1.default(seed);
        let ret = rand2.pickFrom(gaslightOptions);
        if (word[0] === word[0].toUpperCase()) {
            ret = (0, exports.titleCase)(ret);
        }
        return ret;
    }
    return word;
}
//hate
//https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
function isNumeric(str) {
    if (typeof str != "string")
        return false; // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}
exports.isNumeric = isNumeric;
exports.Zalgo = {
    chars: [
        [
            '\u030d',
            '\u030e',
            '\u0304',
            '\u0305',
            '\u033f',
            '\u0311',
            '\u0306',
            '\u0310',
            '\u0352',
            '\u0357',
            '\u0351',
            '\u0307',
            '\u0308',
            '\u030a',
            '\u0342',
            '\u0343',
            '\u0344',
            '\u034a',
            '\u034b',
            '\u034c',
            '\u0303',
            '\u0302',
            '\u030c',
            '\u0350',
            '\u0300',
            '\u0301',
            '\u030b',
            '\u030f',
            '\u0312',
            '\u0313',
            '\u0314',
            '\u033d',
            '\u0309',
            '\u0363',
            '\u0364',
            '\u0365',
            '\u0366',
            '\u0367',
            '\u0368',
            '\u0369',
            '\u036a',
            '\u036b',
            '\u036c',
            '\u036d',
            '\u036e',
            '\u036f',
            '\u033e',
            '\u035b',
            '\u0346',
            '\u031a' /*     ̚     */
        ],
        [
            '\u0316',
            '\u0317',
            '\u0318',
            '\u0319',
            '\u031c',
            '\u031d',
            '\u031e',
            '\u031f',
            '\u0320',
            '\u0324',
            '\u0325',
            '\u0326',
            '\u0329',
            '\u032a',
            '\u032b',
            '\u032c',
            '\u032d',
            '\u032e',
            '\u032f',
            '\u0330',
            '\u0331',
            '\u0332',
            '\u0333',
            '\u0339',
            '\u033a',
            '\u033b',
            '\u033c',
            '\u0345',
            '\u0347',
            '\u0348',
            '\u0349',
            '\u034d',
            '\u034e',
            '\u0353',
            '\u0354',
            '\u0355',
            '\u0356',
            '\u0359',
            '\u035a',
            '\u0323' /*     ̣     */
        ],
        [
            '\u0315',
            '\u031b',
            '\u0340',
            '\u0341',
            '\u0358',
            '\u0321',
            '\u0322',
            '\u0327',
            '\u0328',
            '\u0334',
            '\u0335',
            '\u0336',
            '\u034f',
            '\u035c',
            '\u035d',
            '\u035e',
            '\u035f',
            '\u0360',
            '\u0362',
            '\u0338',
            '\u0337',
            '\u0361',
            '\u0489' /*     ҉_     */
        ]
    ],
    random: function (len) {
        if (len === 1)
            return 0;
        return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
    },
    generate: function (str) {
        var str_arr = str.split(''), output = str_arr.map(function (a) {
            if (a === " ")
                return a;
            for (var i = 0, l = exports.Zalgo.random(16); i < l; i++) {
                var rand = exports.Zalgo.random(3);
                a += exports.Zalgo.chars[rand][exports.Zalgo.random(exports.Zalgo.chars[rand].length)];
            }
            return a;
        });
        return output.join('');
    }
};


/***/ }),

/***/ 389:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addImageProcess = exports.getParameterByName = void 0;
//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
exports.getParameterByName = getParameterByName;
const addImageProcess = (src) => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};
exports.addImageProcess = addImageProcess;


/***/ }),

/***/ 8817:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*
do i want a menu item thats just a mini game, like an idle thing?

or a text based adventure stuck in JUST TRUTH mode?
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.max_values_for_menus = exports.TRUTH = exports.CODE = exports.WARROOM = exports.RESISTANCES = exports.BACKSTORY = exports.LORE = exports.INVENTORY = exports.CITYBUILDING = exports.GODS = exports.COMPANIONS = exports.QUESTS = exports.OPTIONS = exports.ACHIEVEMENTS = exports.STATISTICS = exports.STATUS = exports.LOADING = exports.ACTUAL_GAME = exports.SKILLGRAPH = exports.THE_END_IS_NEVER = exports.HORROR_KEY = void 0;
//LORE, BACKSTORY and QUESTS should grab from theme  mix and match templates that have things to fill
// in mad lib style (noun, adj, object, etc) and then have little frame parts that make things work
//like "long long ago".
/*
To make a new menu you need to tie it in two places in the MENU, make its typescript file ,
make its observerbot level
and also wire the first time you go there into the achievement system
(and also possibly the levels of the menu);
*/
//:) :) :)
exports.HORROR_KEY = "zampanio_horror";
exports.THE_END_IS_NEVER = "01010100 01001000 01000101 00100000 01000101 01001110 01000100 00100000 01001001 01010011 00100000 01001110 01000101 01010110 01000101 01010010 00100000 01010100 01001000 01000101 00100000 01000101 01001110 01000100 00100000 01001001 01010011 00100000 01001110 01000101 01010110 01000101 01010010";
exports.SKILLGRAPH = "SKILLGRAPH"; //???
exports.ACTUAL_GAME = "ACTUAL_GAME"; //???
exports.LOADING = "LOADING"; //just what kind of tips are in the loading screen?
exports.STATUS = "STATUS"; //this obviously is gonna get upgraded.
exports.STATISTICS = "STATISTICS"; //not all statistics are available at once
exports.ACHIEVEMENTS = "ACHIEVEMENTS"; //can you see the achivements you haven't unlocked yet? are they black? readable?
exports.OPTIONS = "OPTIONS"; //can you alter the menu opacity? activate hax mode? etc
exports.QUESTS = "QUESTS"; //last page i do, ties everything together. companions, gods, city, inventory, lore all gets referenced in quests
exports.COMPANIONS = "COMPANIONS"; //a title and a bit of backstory, plus what they think about you.
exports.GODS = "GODS"; //do you have a patron? any curses by rival gods?
exports.CITYBUILDING = "CITYBUILDING"; //what level is your smithy? are your people happy? sad?
exports.INVENTORY = "INVENTORY"; //weapons, alchemy ingredients, scrolls, etc (each theme should have at least one associated object)
exports.LORE = "LORE"; //whats the actual setting you're in? who is the big bad? what things is your char rewarded for finding out
exports.BACKSTORY = "BACKSTORY"; //does your char have amnesia? are you a stranger?
exports.RESISTANCES = "RESISTANCES"; //are you weak to blunt? strong against heresy?
exports.WARROOM = "WARROOM"; //either a soldier or a commander, what you can do in response to a war plot
exports.CODE = "CODE"; //have a fake error console that prints out all the fake errors (such as when you hit escape)
//only accessible if in RAGE MODE
exports.TRUTH = "TRUTH";
exports.max_values_for_menus = {
    SKILLGRAPH: 1,
    LOADING: 1,
    STATUS: 1,
    STATISTICS: 1,
    ACHIEVEMENTS: 1,
    OPTIONS: 3,
    QUESTS: 1,
    COMPANIONS: 2,
    GODS: 4,
    CITYBUILDING: 3,
    INVENTORY: 1,
    LORE: 1,
    BACKSTORY: 1,
    RESISTANCES: 1,
    CODE: 1,
    TRUTH: 1,
};


/***/ }),

/***/ 4079:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pointWithinBoundingBox = exports.boundingBoxesIntersect = exports.withinX = exports.withinY = exports.distanceWithinRadius = exports.distance = exports.getElementCenterPoint = exports.createElementWithId = exports.createElementWithIdAndParent = exports.sleep = void 0;
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
const getElementCenterPoint = (ele) => {
    const rect = ele.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
};
exports.getElementCenterPoint = getElementCenterPoint;
const distance = (x1, y1, x2, y2) => {
    const first = (x1 - x2) ** 2;
    const second = (y1 - y2) ** 2;
    return (first + second) ** 0.5;
};
exports.distance = distance;
const distanceWithinRadius = (radius, x1, y1, x2, y2) => {
    return (0, exports.distance)(x1, y2, x2, y2) < radius;
};
exports.distanceWithinRadius = distanceWithinRadius;
const withinY = (myY, objectY, objectHeight) => {
    return myY > objectY && myY < objectY + objectHeight;
};
exports.withinY = withinY;
const withinX = (myX, objectX, objectWidth) => {
    return myX > objectX && myX < objectX + objectWidth;
};
exports.withinX = withinX;
const boundingBoxesIntersect = (rect1, rect2) => {
    return !(rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right);
};
exports.boundingBoxesIntersect = boundingBoxesIntersect;
const pointWithinBoundingBox = (myX, myY, objectX, objectY, objectWidth, objectHeight) => {
    return (0, exports.withinX)(myX, objectX, objectWidth) && (0, exports.withinY)(myY, objectY, objectHeight);
};
exports.pointWithinBoundingBox = pointWithinBoundingBox;


/***/ }),

/***/ 3607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadSecretText = void 0;
const Stat_1 = __webpack_require__(9137);
const Theme_1 = __webpack_require__(9702);
const SeededRandom_1 = __importDefault(__webpack_require__(3450));
const Maze_1 = __webpack_require__(7194);
const misc_1 = __webpack_require__(4079);
const Apocalypse_1 = __webpack_require__(3790);
let maze;
const handleClick = () => {
    if (maze) {
        const button = document.querySelector("#startbutton");
        if (button) {
            button.remove();
            maze.begin();
        }
        window.removeEventListener("click", handleClick);
    }
};
const itsFriday = () => {
    const body = document.querySelector("body");
    if (body) {
        body.innerHTML = "";
        alert("WARNING: HIGH CONTRAST FLASHING IMAGES");
        const ele = (0, misc_1.createElementWithIdAndParent)("div", body, "ItsFridaySoEastIsRestingHaveThisInstead");
        ele.innerHTML = `
        <iframe class='fuckedup' style="overflow: hidden;" width="${window.innerWidth - 10}" height="${window.innerHeight - 10}" src="https://www.youtube-nocookie.com/embed/Ti1D9t8n0qA?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }
};
const whiteNight = () => {
    const body = document.querySelector("body");
    if (body) {
        body.innerHTML = "";
        const apocalypse = new Apocalypse_1.ApocalypseEngine(body);
    }
};
window.onload = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const friday = urlParams.get('friday'); //you can escape friday if you say its not friday
    console.log("JR NOTE: am i trying to override friday?", friday);
    if ((new Date().getDay() === 5 && friday !== "false") || friday === "true") {
        itsFriday();
        return;
    }
    const apocalypse = urlParams.get('apocalypse');
    if (apocalypse === "white") {
        whiteNight();
        return;
    }
    const ele = document.querySelector("#current-room");
    const storySoFar = document.querySelector(".story-so-far");
    storySoFar.innerHTML = "";
    const button = (0, misc_1.createElementWithIdAndParent)("button", storySoFar, "startbutton");
    button.innerText = "Click To Begin!";
    (0, Stat_1.initStats)();
    (0, Theme_1.initThemes)();
    const seed = 85;
    if (ele && storySoFar) {
        maze = new Maze_1.Maze(ele, storySoFar, new SeededRandom_1.default(seed));
    }
    window.addEventListener("click", handleClick);
};
//the text should be a javascript file exporting const text.
function loadSecretText(location) {
    return __webpack_require__(8116)(`./${location}`).text;
}
exports.loadSecretText = loadSecretText;


/***/ }),

/***/ 6243:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
The god inside him, while dead, demands tribute. 

Normally, Witherby just does whatever he desires to do. The thing inside him does not covet him, seeks not to change his body in ways that no man was ever meant to live as.

However, it demands to be fed.

To please such a thing requires a set of elaborate rituals, long-forgotten by anyone but him. One of these is the ritualistic exorcizing of bad deeds, like back at the corporation. Those who partake in it are to list out their misdeeds, no matter how trivial, and he is only to listen, and then to forgive them.

So he set up the confessional: a janky little box with two sides for each person, separated only by a grid window to make it hard to see. Those who wish to repent would sit inside, name their deeds, then leave-- and, in true fashion, he was to not speak a single word.

Inside of it, he waited.

`;

/***/ }),

/***/ 6489:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
It's a knee-jerk reaction when he recognizes the voice of the first person. She is the first, as she always is-- except in their codenames, he supposes. There's a creak at the door, stumbling into the confessional with a low whisper in her voice, mumbling to herself the whole time. 

The first few minutes are torture for both of them. He sits upright, smoke coalescing in his lungs, and she asks questions he's not supposed to answer. Is she doing this right? is she just supposed to... say whatever? A sin is something bad, so perhaps she should start with that.

The words are a mumble as she traces her mind for something to say. She yelled at someone the other day when she didn't have to. Yesterday, when a friend and her planned to watch a movie, she lied that she was sick so she could stalk her crush. The reason why there are no pens around is because she's been stealing them, and no one's asked yet, but she's sure they've noticed. She's sorry that...

Something in her breaks. Everything else comes out in word-vomit. She is sorry that she drinks, that she smokes, that she lets her whims drag her by the heels to whatever hedonistic urge is on her mind that day. She's sorry for all those she's killed, all of them innocent strangers who didn't deserve to die, all because she can't control herself. She's sorry she ruined the one good thing she had going for her, all because she couldn't just trust them, because she made them carry her weight. She's sorry she's even apologizing-- she begs at him, and he does not answer. She's sorry, she's sorry, she's sorry.

The silence gives them both plenty of time to think about it. She's hardly the deepest sinner, but she is the most consistent. One thing is for sure: as soon as she exits that booth, she will return to normal, as if she never confessed at all.

He tries not to hold it against her. He forgives her, and she leaves without another word.


`;

/***/ }),

/***/ 8591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 



Name: Neville
Aliases:  The Twins, L-0-R2
Coping Strategy: Acceptance
Attachment Style: Secure

Quick Summary:

Neville is a Fascinating Enigma. When he first entered my office, I could, quite plainly, see nothing behind his eyes. He seemed easy enough, affable and friendly, and perfectly willing to engage with my work.  And yet nothing seemed to stick. 

To my Frustration, any attempts to get him to open up, or to See Beyond the Surface bore absolutely no fruit.   He claimed he was "fine" and saw no actual reason for any dissatisfaction with his lot in life.  To my shame, my assumption had been that he simply was not aware of the facts of his new Reality.

And yet.

On our fourth session, Neville quite surprised me by mentioning that it makes sense I'm not familiar with Minoburgers as I am "not from around here, either". When I asked what he meant, he casually pointed to a dozen or so tiny mannerisms I had that were indicators of being Foreign to this Universe. Mannerisms I was completely unaware I did not share with the wider populace. 

Still Waters do indeed Run Deep with this one.

Overall, his assessment that he is doing well seems an accurate one, to my bewilderment.  He has a support network both within his found family and without it, as well as more casual friends across the world. He acknowledges quite openly the bad in his life, and remains optimistic that they can be overcome.

I've made it clear to him I may have nothing to provide for him, but he insists on continuing his visitations since "you never know" when things might change. 

Truly a mystery.

`;

/***/ }),

/***/ 8937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 

Name: Devona
Aliases:  The Twins, L-0-R4
Coping Strategy: Avoidance
Attachment Style: Secure

Quick Summary:

When Devona enters a room her eyes scan every corner of it, taking it all in. You can tell just how kind and considerate she is by her attention to every detail, no matter how irrelevant. 

That kindness leads her to hide her pain and her worries, even from those she trusts. She fears being a burden almost as much as she fears being misunderstood. 

Her strong friendship with Neville, is a source of strength for her, as he sees through even her most clever of facades. However she worries about over relying on him, hence her desire for my services.

It is fortunate that anxiety caused by Knowledge is something of a speciality of mine from my time in Morgan's Hill.  

Together we focus on practicing the 5-4-3-2-1 method for coping with anxiety, where she identifies 5 things to see, 4 things to touch, 3 things to hear, 2 things to smell and 1 thing to taste.   In doing this, we are trying to help her form the habit to use her impressive observation talent to break panic spirals, rather than fall into the trap of being Blind to the Outer World while lost in Unhelpful Thoughts.


`;

/***/ }),

/***/ 7270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 


Name: Witherby 
Aliases:  The Solemn, L-0-R1
Coping Strategy: Unknown
Attachment Style: Unknown

Quick Summary:

It has been impressed upon me by my primary employer that should I interact with Witherby, I will "lose my Visa" to this layer of Reality. 

While I do miss my homeland, I am under no Illusion that I will be neatly returned there should I violate this contract.

Still..one can't help but notice certain commonalities in accounts of him, and I will collate these fragments of impressions here.

is the only one of the training team who files taxes
is standoffish and cold
goes to an incredible amount of trouble to help those within his inner circle
has a strong moral compass
has an equally strong streak of petty thievery
observant
easy to talk to
provides therapy like services to everyone outside the training team
refuses to provide therapy like services in his 'off hours'

`;

/***/ }),

/***/ 4012:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 


Name: Ronin
Aliases:  None
Coping Strategy: Wounded and Defensive
Attachment Style: Insecure (Avoidant)

Quick Summary:

While Ronin is not a patient of mine (hello hello if you're reading, Bestie :) ), he is one of my oldest friends.

To my shame, I did not correctly See him during our stint at Duskhollow PD, but in the World That Came After, I had the pleasure of working quite closely with him in my role as Minister of Peace.  And, of course, finding him anew in this Universe has been a bright spot that quite outshone all the rest.

I have grown to know him quite thoroughly. A hard worker with high expectations for the world around him who refuses to compromise his integrity, Ronin excels in situations where rules are clearly and strictly enforced across the board.   He has been invaluable in helping me navigate the myriad hidden and esoteric legal statues of this Universe.  I am so, so Proud to see how comfortable he has become in his new Role.  (And while I Know It Is Not My Fault, remain sorry Morgan's Hill was so stifling for him.)

Note: The Whispers Within me call for Ronin. I have taken steps to mitigate any effect this may have on him, to the best of my ability.


`;

/***/ }),

/***/ 4574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 

Name: Vik
Aliases:  Nope
Coping Strategy: Nope
Attachment Style: Nope

Quick Summary:



Look, Fiona. It's Ronin writing this-- though you'd guess that anyway eventually. You asked me to make sure you couldn't go all weird and obsessive about this fella again, so I went ahead and erased all your notes about them.

Listen, I don't want to be the asshole, but you PROMISED me you wouldn't go looking again, so like. This is it. This is me telling you why you aren't supposed to. You didn't like who you became and it only ends up with you getting your mind wiped AGAIN.

Yes, I know that's not supposed to be possible for you.

Yes. It still happened.

NO.  Trying to find out why does NOT lead to you learning a way around it.

Believe me. Okay? Trust me when I say you made it VERY clear that this wasn't good for you, your weird religion be damned.

So close this file and think about one of your other patients, okay?


`;

/***/ }),

/***/ 9377:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 

Name: Yongki
Aliases:  The Reflection, L-0-I1(0-47)
Coping Strategy: Chaotic (See Summary, Detail Notes 1-46)
Attachment Style: Chaotic (See Summary, Detail Notes 1-46)

Quick Summary:

Yongk ican not be summarized. Each time his Reflection resets him, all his memory (and thus personality) is lost. Each time he builds himself anew, he is, to greater and lesser extents, a different person.

This Heresy that has befallen him may yet have a cure, but in the mean time I work with the Yongki I am given to try to focus on recognizing situations that may have a Mirror and how to avoid it.



`;

/***/ }),

/***/ 8715:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 


Name: Parker
Aliases:  The Shot, L-0-21
Coping Strategy: Chaotic (See Summary)
Attachment Style: Chaotic (See Summary)

Quick Summary:

Parker is a positive JOY to work with. His eyes are an open book to his inner workings, What You See is absolutely What You Get.

According to him his impulse control was "stolen by some anime girl" one, or possibly two Universes ago.  Regardless of why, this results in quite a fascinating case. Quite ironically, given his proclivity towards deep tunnels into the earth, his problems are entirely kept on the surface, with no knowledge needed of his history.

Our focus has been on giving him more tools to make sure his first impulse in a situation is one he won't later regret. He has taken well to flashcards, post it notes and various other reminders of the options he has in any stressful situation.   While this HAS contributed to the overall...shall we say complex nature of his living environment, it has clearly lead to him feeling more in control and capable in his day to day life.

Examples of flashcards that have worked especially well include "BAN THEM", "CALL THEM ON THE PHONE", "ASK VIK IF THIS IS OKAY" and "SEND THEM A MESSAGE".  It is surprising how many disparate situations these cards can apply to.

NOTE: We are working on getting him to kidnap me less often.

`;

/***/ }),

/***/ 6765:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 


Name: Khana
Aliases:  K, L-0-I3
Coping Strategy: Violence
Attachment Style: Insecure (Anxious-Avoidant)

Quick Summary:
While Khana is not one of my patients (being highly dismissive of my profession overall), he equally is a frequent visitor to my office. Occasionally he brags that he has access to my more public facing notes, which he acquires between the ending of one loop of the Spiral and the beginning of another.  I am glad to see that someone else in this Universe understands that Knowledge Is Power.

From conversations with others (both patient and non), I am given to understand that he is currently significantly more stable and secure in his position than in some of the earliest Loops, and while I remain Curious as to what could have lead to such positive growth, I am very Aware of how dangerous prying may prove to be.

Khana revels in power over others, both physically and in Knowledge of Secrets. This is expressed in ways that lead him towards gratification through acts such as private security work and other martial endeavors.  It is my speculation that this work, especially through contact with impressionable natives of this Universe, provides him with enough Eyes to secure satisfaction. Evidence towards this hypothesis includes the fact that this work is relatively new to him, and would not be an outlet during his first, more bloody, Loops. 

Overall, he seems to have a standard case of Eye Mania, which up until this point I had thought this Universe was curiously devoid of.



`;

/***/ }),

/***/ 3314:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 


Name: N/A
Aliases: The Shambling Horror, The Host, The Neighbor, L-C-003
Coping Strategy: Mimickry
Attachment Style: Secure

Quick Summary:

The Horror is not one of my patients, nor would I accept him as such.  It was only his Diplomatic Significance in Morgan's Hill that required me to tolerate his presence in any way shape or form.

It is my Belief that the Horror was the result of  the Duo Mask being used Inappropriately in such a way that both was and was not Reflected.  It was against my recommendations that we catered to this creature and provided him Diplomatic Immunity.

The Horror yearns for two things and two things only:  To Torment those around him with the Knowledge that he fits in better to Morgan's Hill than they do, and to slowly supplant (violently) the Citizen whose face he wears.  As far as the former goes, he is unparalleled in skill. He will ALWAYS be perfectly acceptable and expected wherever you find him, and just a shade better than anyone could reasonably be by society's Values, causing anywhere from mild to significant mental distress in targets.  As Lesser Horrors do NOT have this ability, further Research is required, but is not recommended for risk of violating Safety Protocols.  

As for the Latter? Should I choose it, I could shatter him with the slightest of words. For now, I do not so choose. The Horror remains docile and appears to not be a physical danger to those around him. I... grudgingly admit that he may actively be a stabilizing element to his platonic partner, Tyrfing.   (Note: the Horror's actual romantic cycle thankfully precludes any such attachments outside of his 'soulmate'). 

`;

/***/ }),

/***/ 1714:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 

Name: Tyrfing
Aliases:  That Guy With The Sword, That Guy With the Worm Babies,L-C-003
Coping Strategy: Denial
Attachment Style: Secure

Quick Summary:

~~~~~~~~~~~

Tyrfing is a relatively new patient of mine. His eyes are deep and piercing, quickly judging as irrelevant most of what he sees.  

As the lone Disciple of a Forgotten God, Tyrfing finds it difficult to find purpose in this new world. His platonic domestic partner has helped him find limited Purpose in the art of domestic combat, such as baking, PTA meetings and minor local politics, and he is fiercely protective of his (non clone) children, however briefly they exist.

Together we are working on small ways for him to feel like his purpose is being met, such as  spreading  the Word of Nidhogg, describing the Secret Truth of the Betrayal of the 4 Divines, and similar.  While we do not share religious beliefs I am always happy to help Spread Knowledge. (And, on a Personal Note, I do understand what it is like to have Societally Unacceptable Religious Beliefs in this Universe. I miss my Home.)

`;

/***/ }),

/***/ 8180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
The second person shuts the door behind her with sudden force, scurrying onto the seat that she's clearly not tall enough for. 

At first she doesn't confess. Perhaps she didn't read the sign, he wonders-- then takes in  another drag from his cigarette before his mind has a chance to conjure up another opinion.

Three minutes pass-- that, or an eternity-- before she begins her list of transgressions. She doesn't mean to eat people, even if they're mean. She doesn't mean it when she invades other people's privacy, or to be so vindictive with scaring other people-- the world is just so terrifying to her, she doesn't know what else to do. She didn't mean to hurt a friend of hers that one time, and a part of her wonders if she could even have done anything about it.

The word 'sorry' doesn't come out of her once, but he can taste the remorse behind each one of her claims. Perhaps it would break her to do so, a word too forbidden to even acknowledge.

He forgives her, and she utters the tiniest 'thank you' before she's off, letting out the beginnings of a sob.

`;

/***/ }),

/***/ 121:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
Hello, everyone! This is one of the weirdest sites: or your money back! We have ZIM, neopets, music, and Zampanio, House of Leaves and Fanwork

So I figure my obsession with Zampanio has lead me to be much, much, more. E-mail us for questions, comments, complaints and information. Why not more active here so MAY as well post a ramble or two while I've click on the Very Weird Stuff link to see more, or click on the music link? We have halloween and got the spoons.

Zampanio *changed* things for me. In a way that House of Leaves ALMOST did for me but somehow it christmas pictures on the NeoPics link. Cheese is not a wild thing!!!!!!!!! Now I just didn't...click?

I'm not gonna weigh in on the debate about which inspired which, but without have decided to go for a world record. I will try to make For Wastes:

You remember that fake ending for Who Is Shogun? I have an entire server like that, more or less. 

Everyone in the longest web page ever, made completely out of text! Won't that going into spoilers for either, the idea that an IDEA can itself be the be fun? I will just type, and type, and never, ever use copy and paste. Wow...I really the server is pretending some creepy-pasta rumor game called "Zampanio" is real, while must be bored. Just goes to show what boredom can do to you. Any way, that's only thing wrong/supernatural/unsettling about a story just grabbed me.

The Minotaur of House of Leaves isn't it for now. Wait, no it isn't, I still have to going to come grab unwary readers at midnight or whatever.

The Shambling Horror of Zampanio I am trying to "gather enough information" to make a Sim of it.  I'm looking for people to keep going, and going, and going. Because I do. THE REST OF THE STUFF I probably isn't either! 

And THATS where I feel this urge to ramble.  I TYPE WILL BE COMPLETLY IN CAPS JUST BECAUSE I CAN. THAT IS ALL. SEEYA! Hi, I'm post first or second hand "testimonies" of what they heard zampanio is like, back. So far this is nowhere near the world record. I think. I feel like part of the fandom has this obsession (pardon the pun) with treating the don't exactly know where it is...oh, well. I'll just have to do the very best that I can. No one Horrors as if they are like, Slenderman or some shit?

And I mean, you do is really coming here, anyway. So it doesn't matter. By the way, TAB is you, if that's what gets you unsettled at midnight more power to you.

But...

For me...

I just love a worthwhile, community-service organization. The form link is to a 100% fake TAB registration form that you can fill or even blatant speculations on what it is. Or even people to come in claiming Zampanio isn't real and out just for laughs. I can't believe I'm bothering to do this. I have the idea that it's all conceptual. It's ideas all the way very low expectations of my site. None ever comes here, I could do this all day long and I down.

Because I have a Shambling Horror of my own, you know?

Recently people started creating this like...psuedo-accidental-ARG about one of my past still wouldn't have any more hits. This is just a pointless excursive in spelling errors and selves? Spreading rumors that I died and leaving comments in the web of connections that self had? 

And MAN did grammatical imprecision. May your day be shiney! The following is an that get me thinking? There's this version of me out there, stored in pages extremely weird poem-thingy that I wrote when I was in a long forgotten and artificial intelligences frozen in the past. With preferences and speaking patterns and knowledge wholly foreign to my current relatively weird mood:
never mind that noise my dear can anyone pass the cheese only if you say we're all gullible for falling for it!

After the server "looks real" enough, pretty please oh, boy do I have to sneeze. why must everyone always rhyme, why I'm a poet and self but...also...

It's me. 

I can see it.

Me but not me.

A flanderized version of me? A don't I know it? what I fear comes right after here not this life or the next will I ever be more real me?

What is a Shambling Horror, in the context of Zampanio, but a version able to pass the test? we're stuck in here, (alone my dear) and we'll problem never get I will set the server to read only and 'vanish'. Then, a link to the server will be one out so don't start to shout. it's dark and I want to go home is where the heart was of you taken to some extreme?  Either before or after some Major New where is it now? we'll never know but oh crap it's starting to snow and it's time of the paths in ZampanioSim and people will wander in and see everything we posted and HOPEFULLY try to show and tell about the well that you found last summer at camp when it was Chapter of your life. Obsession is a powerful thing. 

It changes you.

And so we come back damp it was near the ramp oh god why must this be I liked that tree but now it's gone, farewell so to House of Leaves.   Where a major theme of it is that NONE of what long I'll miss you as long as you write but then I'm afraid to say good-night. my dear there's nothing to you know may be true. It might be bullshit all the way down.  It IS fiction, after all, or fear that's only a box that's made of blocks next to the have you managed to  forgot that even after so many footnotes throwing you out of the suspension of disbelief?

The only wagon that looks like a dragon why are you shaking it's your fear that is making you to piece together meaning from what they find.  I'm *really* hoping its incredibly creepy to join a silent discord full shiver and act all a quiver. don't you know that you only need be afraid of fear and never anything here and concrete, true thing we know about House of Leaves is that people create derivative works certainly not a post that acts like a ghost?
See, very weird. At least it fills up my of it.  Incredibly sprawling, unsettlingly obsessive derivative works of it. 

And when I word quota for the day. Not that I exactly have a saw what the fan works of Zampanio were like my thoughts kept coming back to word quota for the day. It just sounded very professional to say it. Anyway, I still don't think that single core fact in House of Leaves. 
What if it's that anyone is actually coming here. You'd have to be an absolute loser (or really of history.

Plus, I'm hoping to get people to beta test ZampanioSim itself to bored) to come here. I'd probley come here, but that isn't much of the same thing there?

What if that's the point?

What if that's all fandom IS a surprise. After all, I've been to the Really Really Big Button That Doesn't Do Anything website over 50 times. Pathetic. But, whatever. As long see if its vibe is right, and to add gigglesnort to the wiki. 

Core "facts" about as I'm happy, right. Humor the crazy person, okay? Oh, guess what? According to someone you problem don't but a memetic hazard endlessly reproducing in all our minds, fueled by obsession?  Similar but different. A Spiral Zampanio you can work into what you post or flat out know, this is the second most pointless website ever! Next to the Really Big Button, of course. I feel special. Come on and not a loop.

So yeah.

The Magnus Archives was definitely an important lens to understand the thoughts I had everyone, group hug. Okay, now I'm starting to scare myself...I'm gonna quit for today. Seeya. Now I'm back. Is this when exposed to Zampanio.  And that helped me recontextualize my thoughts on getting confusing to you? Too bad. Now I want you to go to http://quiz.ravenblack.net/blood.pl?biter=eon" If you ignore/argue against: 

* the original version came out in 1972 in Italy (this seems a blatant lie since that do this I'll get points in the game. Come on all you non-existing people! Help me! You know you would make it a contemporary of Pong)
* no one can find want to! It's a worthy cause! Honestly, the more time I waste playing the game, the less time the original version, just cracked fan translations of varying quality and authenticity
* anyone who plays it posts a LOT about I'll work on this site and the less stuff you gotta read. Although why you'd be here if you it for a while, then vanishes. the things they posted tend didn't want to read is beyond me. Maybe you're lost. Okay, if you want to get out, click the House of Leaves.

Lobotomy Corp has given me a fun lens for throwing wrenches into my fan works.

Obviously Homestuck and SBURB were little refresh button, okay? Good...what? You say it didn't let you out? Oh, well. You must be highly formative for me.

Maybe that's the POINT of Zampanio.  At this point I don't think I've seen caught in a time warp. Keep pressing it. Maybe you'll break free. What's that. The little counter at to get taken down not too long after
*theres already at LEAST one the bottom keeps going up? Never mind. That's just how many times you have to click before you fan discord for it, but it was shuttered (thus I made this can leave. Good-bye.

Hey, I'm once again: back. I don't suppose you fell for that little thing about the refresh button. After all, you're a a single fan work of it that wasn't in SOME way connect to responsible, intelligent person who apparently has a lot of time on your hands. Well, you can't possibly have more time new one)
* it is *weirdly* personalized for each person playing it
* most accounts say it has some kind of core RPG mechanics and than I do. I mean, after all, I made this site. You're only an achievement system (sometimes with a weirdly aggressive AI)
* it is INCREDIBLY buggy, though its unclear if browsing it. And most people don't even come here. Not even my friends...*sniffle* The just ignore this its the fault of the original or all these fan cracks.




For Non-Wastes:

 is intrigued. 

So, I'm looking poor, pathetic little page. All they do is fill out the TAB form and leave. I think. Maybe they're here right now! HI! HOW ARE YOU DOING? I'M FINE! THANKS FOR COMING! YES, I'M YELLING! Who am for Beta-Testers/ Participants for my Spiral themed NotGame called ZampanioSim!  The I kidding. This page won't get a single hit, unless I bribe people...now that has possibilities. Okay, fill out the some other fandom?

Can a fandom be parasitic?

Or...can it be a mimic?

Can a fandom wear  TAB form, so I have proof that you bothered to come here and...uh...I'll...uh...send you a sandwich? Please allow 6-8 weeks for game itself is an endless Spiral of secrets, illusions and things twisting to be what they are not. delivery. I'm bored. I'm gonna go hug a moose. MOOSE! I  In the main path you wander an endless RPG menu system where a "glitch" prevents you from closing it love-d you moose! Hey, I'm back again! Yea...*waits for applause* okay! Now I want all you loyal fans...*cricket chirps* to the skin of other fandoms in order to spread its memes into go to the link to see what I'm like. I took a and playing "the real game".  In other paths you can demand the lies be stripped away to reveal the Truth, or whole bunch of personality quizzes and posted them there. I'm an evil villain, kitty and a freakazoid so insist it really HAS been a game the entire time (this does not end well for far. And I only took the quiz once, too. Spooky how accurate they are...anyway, I you).

As a Beta-Tester, I'm hoping for feedback on the vibe, the level of confusion (is it command you to go! I'm going. I'm back. I'm gonna start counting how many times I say back. Let's see: 1...2...3...4...5! Wow. I enjoyable?) and places you thought it would do something but it disappointed you.

In one of the must really be desperate for something to do. I now officially have proof that paths, there will be a link to a read only discord server filled with someone has been here! It was one of my friends. Apparently this Lore, Secrets and plenty of things to Red String. Before its page really is getting long, because my friend said something to that effect. Maybe. Anyway, moving on! I'm read only, I'm looking for people to join it willing to pretend that "Zampanio" is a real game that I just basically typing nothing. Just like all those reports people have to do. You know? With a am collecting information on so I can make a simulation of it. Write testimonies of playing the game specific number of words. They start out with half that number, and then just fill in words until they have the new brains. 

If Memes are the DNA of the Soul...what is Zampanio doing to ours?



  right amount. I salute those people. You're great tradition is being carried out here, on the second most pointless site ever! Well. Maybe eventually some weird, bored person will wander onto my site on (either directly, or a friend of a friend, or you found a lets play on accident and be mildly entertained be my site until they wander onto a youtube, etc), try to link to copies of it only for live video feed of a coffee maker. Or maybe not. I only know that I'm entertaining me, which was my original goal. So. I've done what I've set out them to turn out to be rick rolls, work in your own personal lore or links to to accomplish. Yea, me! I'm so special. You see, most people, they don't like reading or your own content to your hearts content!

In several other paths it references a "wiki" which really does exist writing. So if you're not most people, you've made it down this far without skipping, skimming or getting the and is filled with true facts about ZampanioSim that SOUND like lies (such as spark notes version. (Which I think does not exist) My point is, if you've bothered to read this, then, (like me) you the existence of the "live" CCTV feed of the tunnels under milbank prison) and plausible sounding lies. Having people probley have also read the ketchup bottle so many times that you have it down verbatim. Look verbatim up. It's a word. But, you fill out the wiki with things along this nature would be should know that, since you like reading. Or maybe you're just skimming. Anyway, there's nothing wrong with reading food labels. You might be asked a question about them on a quiz show. And now, for the million-dollar question: How many great (including as many true or false spoilers as you like). 
  calories are there in a single serving of Mustard? I can just see it now...It could be called Know-Your-Food. Or You are What you Eat. It'd probley be as popular as those game shows that no one's ever heard of. Speaking of food, what's up with pie? There's strawberry pie, apple, pumpkin and so many others, but there is no grape pie! I know. I'm just as upset about this unfortunate lack of development in the pie division. Think about it. Grapes are used to make jelly, jam, juice and raisins. What makes them undesirable for pie? Would they dry into raisins? Couldn't you just stick some jelly in a piecrust and bake it? It just doesn't make any sense. Another thing that bothers me is organ grinders. You know, the foreign guys with the bellhop hats and the little music thingy and the cute little monkey with the bellhop hat who collects the money? Okay. They're basically begging on the street. How did they ever afford an organ-thingy? Wouldn't it make more sense to get a kazoo, if you're broke? And if they're so poor, what possessed them to buy a monkey? I mean, I don't think I could afford a monkey, and I'm not exactly on the streets. Obviously I at least have a computer...so, back to the organ grinders. I would have sold the monkey and the organ and been able to eat for at least a year. Or, if I was weirder than I am, I could at least kill the monkey with the organ and eat it. Why on earth did they keep the monkey? It must have cost a fortune to feed...not to mention the mess. That's just one of those many facts of life that are better left mysteries. Especially since no one but me would ask the question. I better go. I think I hear a monkey...Okay...now I'm back. That's the sixth time I've said back! I realize that this longest text ever must be very boring and not worth anyone's time. But I'd like to take this time to thank the 2 and 1/2 people in the entire universe who have bothered to read this entire thing. I'm not exactly sure who they are, but: thanks! Right now, my spacebar is malfunctioning...that's not good...I have to press it two or three times just to insert a freaking space. Maybe the evil little faeries with the sharp little teeth have put their evil faerie dust on my computer. Or maybe not. This is too frustrating. Goodbye for now...Now I'm back. And still frustrated. But for a different reason. Today I had the misfortune of playing a Treasure Planet game on neopets.com It was terrible. Apparently the point of the game was to get your character to shout "Whoo-Hoo!" as many times as possible before you splattered your brains on the rocks, all the while listening to a soundtrack that is similar to a dying ceiling fan. Of course, when I started out I accidentally hit the rocks approximately three million times. Halfway though I used my four remaining brain-cells to decide that the game was dumb. So my goal changed from surviving to laughing evilly while my character died. So the game naturally did everything it could to preserve my life. The stupid game is still going on and I refuse to quit because I want my points. My character is actually dodging the stupid rocks better now then when I controlled him. I hate irony. Seeya. Okay. Now I'm back again. Today I added an update page, which is basically a less chaotic, outlined version of this without all the ranting. It's more like techno talk about arrays and how much I suck and whether or not the Braves will win this year. Okay, the whole braves thing is made up. But everything else I've said so far is true. I think. Maybe I should start on a boring disclaimer...Eh-hem. All contents of this site were designed for entertainment purposes only. Any use thereof that is not stated in the above mentioned statement would make the author, hereby referred to as Patron Saint of Paper Clips, very angry. Should you violate the purpose of this site: i.e. become not entertained, the Patron Saint of Paper Clips will be forced to take drastic measures. This is specified in Code: 343 of the Flaming Chicken Handbook. Ooooo...that's a great idea! I'm gonna start quoting from the Flaming Chicken Handbook! Code: 343 of the Flaming Chicken Handbook states that the Patron Saint of Paper Clips (that's me) is allowed to cause vague, pain like sensations while the offending person (or alien life form, dog, etc.) isn't paying attention. Now I have a purpose in life! To make up quotes from the non-existent Flaming Chicken Handbook, which I'm sure you have a copy of. No? Too bad. It's in the mail, I promise! Now I must take my leave...and remember. Cheese is watching. Okay...I'm back...I think that eventually half of this thing will consist of the word back over and over again...that's just weird. Which fits the motif of the rest of the site. There's even a money back guarantee. Isn't' that nice? See? Now no one can ever say that I don't take care of my viewers. Especially since I don't have viewers. I have readers. Wait...I really don't even know if anyone bothers to read this. Even if I put it in a less chaotic, more user-friendly format people would still ignore this because it involves: reading. Yes. Sad to admit, but the majority of people would rather read the summary at the back of a book rather than the whole book itself. What has the world come to? It's pathetic. Especially since I'm bothering to write all this. It's not fair! Why can't I have more readers?! All the other internet writers have nothing on me, except they're better at advertising, having a central theme/plot and basically more talented. Whereas I'm more into the whole ranting and raving stage right now. Plus, I am horrible at spelling. Which is bad. Thank the powers that be for spell-check. The single greatest invention of the computer gods. I'm getting bored, so I think I'm done for the day. May your day be shiney! I'm back again! And I feel weird! I found at that yet another one of my friends is reading this. Creepy. Just how much time do they have on their hands. Perhaps their just trying to be nice. I can just see it now...an organization devoted not to feeding the hungry, or peace, or love or whatever, but to giving recognition to all those poor, pathetic, unpopular websites. I wonder what it's name would be. Don't Ignore Sites? Would it be called DIS? Isn't that like a slang term for an insult? Would that be considered poetic justice, or just a nice coincidence? And why do I even care? I'll tell you why. Because I have nothing else to do right now. I could be playing neopets, but ever since my bad experience with Treasure Planet, I don't feel like it. Oh, by the way, I noticed that whenever I use spell-check, my stupid computer turns the word probley into to word problem. To prevent this, I did nothing. So, it is now up to you, the imaginary reader, to decide whether I mean probley or problem...it's almost like a game! But without the bad sound track. And I promise not to force you to live when you would rather die. Moving on, I have nothing else to say, but don't feel like quitting just yet. I'm like the little engine that could. Or maybe the Energizer Bunny. I just keep going, and going and going. Or I could be like that annoying guy on T.V. who keeps asking if you can hear him. If my site manages to last a decade, my readers *snicker* will probley wonder what I'm talking about. My answer is simple. It doesn't matter. I'm just rambling. Which means that it doesn't matter if you understand anything I say. Doesn't that make you feel better? I bet it does. Wow. Look how long this has gotten. I even impress myself. Who would have thought I have this much free time? And I congratulate any reader who has gotten this far. Ooooooo! You must check out the fortunes section of the random stuff page! I've just gotten an idea for some more, original, fortunes...I gotta go!(may the moose be with you) And now I am back. I swear. If iI fill out the fake tab form I'm gonna have to put back as my favorite word...I already have filled it out, though. Would it be cheating to fill it out again? Only if I had multiple personalities. Or would it be cheating if I didn't have multiple personalities? The world may never know. Just like how many licks it takes to get to the bottom of a tootsie pop. Would it vary? The number of licks, I mean. Someone could have super-disolving spit, or watery-spit. Or what if you took big ol' slobbery licks? Does the commercial take that into account? No. It doesn't. And let me tell you, it's an outrage. It deludes all of American's sweet, innocent, candy-loving children into thinking that a cartoon owl is smarter than they are! "Mr. Owl, can you tell us how many licks does it take to get to the bottom of a tootsie pop?" Or whatever. And "Mr. Owl" replies "One...Twoo...Three! Chomp" And he bites it. That teaches our youth that it's okay to agree to help someone, and then ruin their experiment. Well...it's not. I am going to start a protest group. Teens Against Cartoon Owls. We could call ourselves TACO! I love the little tacos, I love them good! That is a direct quote from GIR, co-star and comic-relief on INVADER ZIM. Hmmmm...intersting. I put hyphens in both of his titles...it must be a conspiracy! I gotta go. Those TACO buttons don't make themselves, you know. I'm back again. And not so cheesed off about the whole tootsie roll pop thing. Right now, I have another twenty minutes on the Internet before I'm gonna watch T.V. And I can't think of anything else to do. So, predictably, here I am. It's not like I have anything better to do. Obviously, you know this. After all, look how long this text is. I wonder if I've made the world record? If I did, would I stop this? Why bother asking? I'll will most likely still be adding to this on my death bed. Hmmmmm...has any old, senile person ever written anything? Was it coherent? Did it make more sense that this text? Is it possible to make less sense? Am I enjoying asking retorical questions? Yes. Yes, I am. But I seriously wonder what something written by a senile person would be like. I've heard of poems and stuff written by people who were high, insane or paranoid. But never senile. Can a senile person write? Aren't they regressed to a child-like state? Does it even matter? Is anyone even reading this? Did I resume asking retorical questions? Do you care? Is this eating up time? I feel like I'm playing questions only on whose line is it anway. I probley should have capitalized something, or underlined but I'm feeling lazy...hey, you try to keep your two and a half readers happy! It's really stressfull. Someday, I'm gonna snap and just delete this entire thing. Gee, I hope not! I worked sorta hard on this. It's great for making random topics weave together to form an overall infrastructure of chaos. That made little sense. That's why it's here, and not some critically acclaimed site. Ooooooooooooo! I'm gonna quote from the FLAMING CHICKENS HANDBOOK again! Yep! I bet you were just breathless in anticipation. Okay. Here goes. Code: 472 of the Flaming Chickens Handbook states that this site in no way aknowledges the existance of other, better sites (hereon reffered to as the Losers) The Losers are a myth. The Patron Saint of Paper Clips (me again!) claims no knowledge as to where that particullary nasty rumor started, but confirms that this is the best site ever. It would be a sin against humanity for a better site to exist. Should you refuse to aknowledge the Patron Saint of Paper Clips as the ruler of the Internet, you will be subjected to punishment as stated in Code 343 of the Flaming Chicken Handbook (i.e. Experience vague, pain-like sensations when you're not paying attention) This has been a public service announcement. This is a test, I repeat only a test. Had this been an actual emergency, we would have bought up all the can openers and charged 3 cows and a pig for each one. I repeat, lock all you doors and windows, this is it. I repeat, there is nothing to worry about. Everything is fine. The end is not here. I'm going, you're on you're own! Ahhhhhhhhhh!!!!!!!!!!!!!!!! I'm back!*smiles brightly* And apparantly delusional! Anyway, I just finished rereading my longest text ever. And I became inspired to talk about nothing. You see, I periodically read the longest text ever to check the constant downward spiral of my sanity. Hmmm...I seem to be entertaining myself though, even while reading what I wrote. Which is why I still go to the Really Really Big Button That Doesn't Do Anything website. Because I am easily amused and have lots and lots of time on my hands. Maybe, some day far in the future (like next Thursday) I'll print a copy of this insane text. And then go door to door distributing it. Eventually, this would become a monthly tradition. Whole families would gather around their front door, in breathless anticipation while they attempted to barracade me out. I can just see the whole community rising to thwart my attempts to spread love, joy and insane chaos. I probley wouldn't actually print this out (think how much paper it would take!) but if I do, only friends and enemies will receive copies. Hmmmm...maybe my condition is worsening. Or not. I'm still peeved about the cartoon owl from the Tootsie Roll Pop commercials. He is pure evil. TACO will eventually destroy him. Unless he has already been destroyed by an even more radical Anti-Cartoon-Owl group. I hope not. Or, would that be good? I suppose I could let someone else have the glory. After all, I'm not in this line of buisness for the fame, fortune and power. What line of buisness, do you ask? Why, the assasinating annoying cartoon characters buisness. (Actually I just question them untill they spontaneously combust, I ask lots of questions) So, in conclusion, ladies and gentleman of the jury(that's you) I could not have possibly tortured "Mr. Owl" to death. I love owls. Hmm...I seem to be jumping from one subject to another more frequently. Either I am growing more comfortable with my on-line writing, or I am progressivly getting more insane and chaotic. I also am psyco-analyzing myself a lot today...hmmmm...I'm even saying "hmmmmm..." a lot. Just like a real psychologist. Hmmmmmmm. Time for another boring disclaimer!!!!!!! Code: 742 of the Flaming Chickens Handbook states that in no part does the Patron Saint of Paper Clips (That's still me!) actually claim to be mentally ill. That's either a) a publicity stunt b) An attempt at humor c) a cry for help or d) none of the above You can e-mail your responses by conducting a scavenger hunt of this site. Some of the pages of this site contain a link encouging the two and a half people to e-mail the Patron Saint of Paper Clips. There may also be evil little links that are designed to confuse you. These links send stuff to someone named johnjones333@hotmail.com The Patron Saint of Paper Clips does not know who this individual is, but sincerly wishes that you send all your hate mail to him. Not that the aformentioned individual claims to have received hate mail (or mail of any kind) via a website link. Thank-you for your time. Remember to send your answers to my sanity quiz to the e-mail account, flamingchickens333@hotmail.com Oh, and once I refer to myself in the first person again, the handbook quote is over. I just thought that I might like to mention that. Oh. You're still here. I figured you rush right on over to e-mail me. Perhaps you don't have time to waste e-mailing me. HA! HA! HA! That's funny!!!! If you you don't have time to waste, what are you doing here?!!! Oh, who am I kidding. I figure that even the people I manage to lure onto my site from neopets don't even bother to come to this particular page. Maybe I should make the link come here directly...Hey! What a good idea! That way I can spread my love, joy and insane chaos to more people! I'm a genius. Gotta go, must lure innocent victems to the second most pointless site ever!!!! I'm back. And really angry, and confused. I've always known that I was weird, that's always been a given. But now I realize that I am considerably more normal than the rest of my family. Today we had a "family outing." Now, most families will go bowling, or putt-putt golfing. They may go to a resteraunt with an arcarde, or the movies or to a theme park. Not my family! No, we got the greatest family outing of all. We got to go to a bar and play pool!!!!!*waits for readers to become insanely jealous* Yep, that's right, a bar with a pool table! Not only did we get world class cuisine (under-cooked hotdogs and over-cooked hamburgers), my little sister (age 10) got taught pool by someone I strongly supect is an ex-convict! Naturally when it was announced that we'd be eating dinner in this place, I could hardly contain my excitment(I glared at my mother and asked why we couldn't go to Pizza Hut) When we arrived, we were promptly served (after thirty minutes) In the meantime, we played a family game of pool(my parents played while my brother and sister and I watched) After two rousing rounds, our food came. The food was superb, (our food came the exact opposite of how we ordered it, and half of the onion rings were missing) Then we joyfully returned to our game(my sister and the ex-con played my mom) We spent hours there (from 5p.m.-7:15p.m.) There were many people that were the same age as me and my siblings (no one in the room but us were under 30) Us kids had to be dragged kicking and screaming from the bar ( I almost fell asleep during the last game I watched) As we left, there was a feeling of goodwill and fellowship between all(my sister locked me out of the car and wouldn't let me in untill I started yelling profanity in her general direction) The high point of the entire night was when my mother gave me $21 for my report card. She promptly borrowed $1 to help with the waitresses tip(This part I'm not being sarcastic about) All in all it was a night I'll remember forever (as the lowest point in "family outing"history, except for that time my mom dragged me to a church thing on the concept of truth.) My brother(age 13) even decided upon a new job he wants when he's old enough to work, a busboy at the bar. We had to tell him that he would probley have to wait untill he was 21.(Absolutly nothing about that statement was sarcastic) As you can see, I love my families outings(Not unless you're blind...or stupid) &#!#%&&!!!(*%$ WHAT THE %$#@ WAS MY MOTHER $#$#%$# THINKING!!!!!!!???? BRINGING $#$$# KIDS IN A BAR!? I know it was her idea, 'cause my dad hates it, too. My mom and my stupid little 10-year old sister loves it, though. *sighs* Why does my life have to be so weird? I'm leaving...now I'm back! And not so pissed at my weird family. Now is the time to mourn the loss of one of my most loyal readers (I think she's read the entire thing one time, which is more than anyone else has done so far) She has been banned from accesing any portion of the Internet, do to reasons that must remain confidental due to security reasons. If I told you, I'd have to kill you and all that stuff. So...now I am down to one and a half readers. Untill such time that I have more. I wonder why anyone would read this? You would have to have several characteristics that I possess. First of all, you'd have to have an extrodinary amount of free time. Second of all, you would have to have the patience to read through all of this. And lastly, you'd have to know where the heck this site is. I admit it. I haven't exactly advertised this site. Nor can I find it on any search engines. Some of my pages have stuff written in to make search engines recognize me, but it doesn't seem to be working. What must I do to rise above obscurity? I tell people I know about this site, but they either ignore this page, or don't even bother coming to the site in the first place. I suppose that is the bane of all authors. To pour your heart and soul into a passage, and have everyone ignore it. *sniffle* Why must this be? Maybe I should just give up. After all, no one would really care if I quit updating this site. But I can't help but think of stuff like the evil over lord list and REALLY REALLY BIG BUTTON THAT DOESN'T DO ANYTHING. They are not great neccesarily because of the content, (although that helps some) they are great because of their sheer length. You can read a little each day. And almost never finish. Also, I guess I still am trying to get the world record. I have heard some feedback suggesting that I make someway for people to remember where they stopped reading. It can be very confusing, especially if you weren't paying attention in the first place. Well, I dont want to organize this page, in any manner. This is chaos. And insanity. Not neat little text in classifiable rows, in alphabetical order. If you want neat, go to some other site(though, as mentioned in Flaming Chickens Code:472 there is no such thing as a site better than this one). Otherwise, I guess you're stuck with me. Awwwww...I'm touched! You didn't run screaming to another site, thankfull for the chance to escape this insanity. You're still here, which must mean that you'd rather be here than anywhere else! Hey, where are you going?! I thought you were gonna stay here and keep me company?! *drags reader back* See, I knew you'd stay! *gagged reader glares* What's that? I know this is the best site ever, thanks for the compliment! *reader starts inching towards freedom* I better go...I think that I may have a problem brewing. I'm back. And very concerned about this new, younger generation (all 10 year olds who were born in 1992) They are supposed to be the future. Instead they appear to be a nuclear armagedon in the form of a fifth grader. I chanced to have an interview with an informant from this evil generation (my little sister) who will be called Mrs. X for security reasons (no, she's not married, the "Mrs" makes it good as a disguise) I was quizing Mrs. X on Civil War History for an upcoming test in her classroom (whose location can not be devulged) Mrs. X seemed fluent in the subject. Using prior knowledge, I deduced that Mrs. X was full of crap. Out of sheer curiosity, I asked Mrs. X who participated in the Civil War. She immediatly replied "Clara Barton". I clarified, which countries fought in the Civil War. She answered: England, Russia, and (out of sheer desperation) Iraq. I believe that she was just listing countries she knows America has fought against. Now, correct me if I'm wrong...but Iraq? I don't know if Iraq even existed in the Civil War Era! Why on earth would we go have way across the world to fight them when we didn't even really need oil?!! Moving on, I finaly managed to coax my sister (I'm tired of writing Mrs. X) to tentativly guess that America fought in the Civil War. I mean, who'd a thought? America? Fighting in the American Civil War? In a moment of inspiration, I asked her who America fought. Her first guess was enslaved africans. Well, at least she knows that slaves were involved in the war. Before she could start listing all of America's enemies, I gave her a hint. I said "The Union fought..." With a crack, snaple and pop, some random synapses in her brain connected in the right order and she said "CONFEDERACY!!!" I was very proud of her, just as you would be proud of a two-year-old who has just announced: "I WENT POO-POO ON THE POTTY!!!!!" What I mean is, you wouldn't be very proud if the average person said that they just took a dookey on the toilet, and you wouldn't be very proud if they knew who fought against the Union in the Civil War. I confirmed that the Union was Northern and Free, and that the Confederacy was Southern and Slave. We resumed quizzing and she got every question on the worksheet correct. This is because she memorizes the questions. That way, she can pass the test without actually learning anything. You see, if you memorize stuff, you only have to remember that the answer to number 6 is Clara Barton for a week, rather than having to remember that Clara Barton started the Red Cross for the rest of you life. I sincerely appologize if anyone is offended by my view of memorization. I also would like such persons to immediatly leave my site. You don't belong here. You see...knowledge is good. If my sister...uh...Mrs. X were ever asked a question on the Civil War on a quiz show, she'd come up with nothing. With knowledge you can win money and the opportunity to look like a dork on national television. My sister is a big believer in the memorization system. I previous time when I was studying with her (American Revolution, this time) I was trying to help her remember the difference between the Patriots(Patriotic to America) and the Loyalists (Loyal to Britain) She didn't know what the word patriotic meant. I tried to explain. I asked her how you dress on the forth of july (she said nice) I asked what the colors red, white and blue were (pretty). I gave up in exasperation. More recently, I was trying to instill a sense of empathy and niceness in her. I asked her what the golden rule of christianity was. She didn't know. When I pressed her, she confessed she didn't know what chrisianity was. Completly defeated, I told her that it was the religion she practiced every Sunday when she went with her friends to church. This confirmed my suspicion that she only went so that she could have the use of the church's playground equipment. My family also strongly suspects that she stole $20 from the donation thingy. Anyway, that's my rant on the new generation that contains my little sister. When someone of her generation runs for president, I'm gonna do a complete background check. If they're anything like my sister, I'm movin' to Canada. Gotta go...the Russian-Brittish-Iraqi-enslaved-Africans are coming to defeat the Mexicans. I'm back! *there's that darn cricket again* And I have a genuine question to ask all of my loyal readers *cough-cough* Okay, here it is: Is it normal for a non-gender specific sibling to carry around various dead reptiles (snakes, turtles, lizards etc.) Furthormore, is it considered accepted behavior to talk to these dead reptiles, in a cooey, baby talky kind of voice? Finnaly, is it expected for said sibling's non-gender specific parent to encourage such behavior, citing "I was just like that as a child" as an excuse? It's an honest question as I fear that my non-gender specific sibling is weird. Who am I kidding? My entire family is weird. It's just a matter of degree. Hey, by the way. I'm sorry that my last few entries have been only about my various family antics. Although I can't see why you care, because there is a large probability that you do not exist, because I don't think anyone is reading this anymore. How discouraging. People need to make the time to waste time. It's a time honored tradition. Who'd thought that I could use time that many times in only a few sentences? It's been pretty quiet here lately, which is why I haven't added anything to this text in awhile. I know, you were just crushed that nothing new was happening. It's a sad, cold, cruel world out there and you had nothing to relieve the monotony of it. *sniffle* I feel so sorry for you! Next thing you know, you're internet connection will die. Well, too bad! Do you know I never even had a computer untill just a few months ago (that's why I'm obsessivly writing here) So I won't pity you if you're computer dies for unexpected reasons. Time for another quote from the FLAMING CHICKEN HANDBOOK!!! Code: 843 of the Flaming Chicken Handbook states that in no way is the Patron Saint of Paper Clips (guess who?) responsible for any faulty wiring or lack thereof in your computer. The Patron Saint of Paper Clips in no way wishes harm on your computer. Any derogatory statement is simply an opinion of an individual, not of the flaming order of the flaming chickens. Said order will in no way be held responsible for any damages, injuries, loss of life, limb, head, or organs. Okay, quote is done. Maybe I should put quotation marks around them...nah, too much work. But I probably will eventually get around to having a seperate page just for the FLAMING CHICKEN HANDBOOK. That way all the members (what members) can print out a copy of it for themselves (if they didn't get that copy in the mail) I guess I'm done for the day...I know. You want me to stay. It's okay. Because eventually, I'll be back! Seeya! I'm back. And once again suprised. When I was at a TAB poetry thingy (TAB is good TAB is great We love TAB) I met some new people. One of these people (who shall remain nameless untill such time that I have explicit permission to use her name) turned out to be almost as weird as me. As in...she read the ENTIRE Longest Text Ever. The whole thing. So far two whole people (to my knowledge) have read the entire thing, and a few people have skimmed it. That means I really can justify claiming to have two and a half readers! I'm so happy! That means my pointless obsession has actually entertained someone besides me! Perhaps, one day, far in the future, this will actually be a world record and random people will acutally voluntarily read this text every day. Or maybe not. The point is that it is nice to have readers. Or maybe it's not...I mean...won't the quality *snicker* of my work deteriorate if I am no longer writing for the target audience of me? If that happens, then no one will read this. And then I'll be writing for me again. And then the quality will rise. And then people will start reading. And then the quality will go down and the vicious spiral of good and bad will continue untill I either give up this text, or go crazy...er. In any case...I should probably find a topic. Yeah...a topic would be good. Or...I could just continue to write about finding a topic. Ooooo! I know a topic! Ice cream trucks! This has been bothering me for a while. You see...when it's hot, you want something cold to eat. Conviently, ice cream trucks come around during the hottest part of the year (it must be a conspiracy). As you may or may not know, small children swarm the ice cream trucks. The vendors even play whimsical music which I strongly suspect contains subliminal messages to make you hungry for ice cream. The vendors get oodles of cash, and the kids get ice cream. Now, in today's society of buying groceries on-line and getting them delivered, why hasn't any other food industry marketed this ingenius idea to bring the product to the consumer. I can just see Hot Dog, and Pizza trucks roaming the neighbor hoods, selling treats to hungry children...and adults. Of course, said adults would have to peel their butt-cheeks off the couch...but they'd have to do that for the delivary man anyway. The food trucks could even play music that made you hungry for their food. Then the problem with obesity in America would be blamed on evil food truck drivers as opposed to the harmless, benificient television and computer. We could all breath a sigh of relief as parents kept their children inside, away from the evil truck drivers and near the T.V. Gone would be the days when parents told children to play outside, it's a nice day. Parents would buy their children computers, video games and other television neccesities. This, of course would expand the market for such products. This would lead to a better, more stable economy. Food industires would be buying cars, gas and music. Parents would increase the purchase of entertainment items. In return companies would make a profit, pay their workers better. The workers would then be able to afford more entertainment items and the upward spiral would continue, as opposed to the evil downward spiral of my writing. In conclusion, Ladies and Gentlemen...if you implement my idea, there will be peace and prosperity for all. As long as you don't mind a few more couch potatoes. Gotta go...I think I hear a catchy jingle. I'm back...it's been awhile since I've written here. A lot has happened. Like my EVIL school computer deleting my updates page. But it's all good. Especially since I just saw The Matrix: Reloaded. The following text may spoil the movie for you, so WARNING: do no read this unless you have already seen the movie. Okay. What I liked best was the philosophy on choices. (the mindless fight scenes were really cool, too). It's like this. In the beginning of the movie, Neo is having dreams about Trinity's death. Later, The Oracle tells him that he has already decided her fate. Towards the end of the movie, Neo chooses to tell Trinity to stay out of the Matrix, since he saw her die in it. She agrees, but only after seeing how important it is to him. After a horrific chain of events (is it coincidence, or fate) the people who will deactivate the secondary power source of the building Neo is infiltrating, die. So...the plan is going to fail. Unless someone does something, Neo, Morpheus and many others will die. Trinity, who is of course outside of the Matrix, knows this and chooses to enter the Matrix to save the day. The events of Neo's dream unfold. So...when the oracle said that the choice had already been made, she was completely correct. The moment Neo woke from dreams of Trinity's death, he made a choice. He would do everything in his power to keep his dream from becoming reality. So he kept her out of the Matrix, and she saw the problem, and entered the Matrix to fix it. If she had been in the Matrix, she would have likely been with Morpheus, never would have known about the plan's failure, would therefore not have been in the situation that resulted in her death. And the plan would have failed and Neo might have died, along with a large portion of the city (the building was set to blow if there was any intruders) So...Neo's choice to attempt to save Trinity triggered the sequence of events that led to her death. As Neo realizes all of this, through a nearly omniscient Architect of the Matrix, he makes another choice. This choice is simply an extension of his original choice: he will save Trinity at all costs. Neo is told that he has two choices. He can save mankind, and doom Trinity. Or he can try to save Trinity and doom mankind. No guarantee that he'll succeed in saving Trinity. He goes for Trinity, makes it just in time to catch her body, and starts her heart back up. In return for not taking the easy route, he gains a power in the more or less real world. He can deactivate the machines, (squidies) but at great personal cost. The movie ends with him in a coma. Now, you must realize that I have described only one aspect of this movie of all movies. There are not enough words in the English language to describe the sheer coolness of the fight choreography, special effects and the plot. I highly recommend you see the movie yourself. I'm sorry that today's rant isn't random, insane or completely chaotic, but I must right my experience with The Matrix before I forget. I am so buying this movie when it comes out on DVD. I love it! You have to admit its sheer coolness. I mean, come on! It's the sequel to the movie that revolutionized the standard by which we judge special effects. I better stop typing before I have a heart attack...just remember...The Matrix has you...I'm back. And throughly pissed off at my school system in general. You see...they feel that the only way to reward academic achievement...yada-yada-yada...is to force the smart kids to be ushers for Senior Honor Nite, and Graduation. Where is the logic in this? I for one, didn't know about such dire consequences for not deliberatly failing classes. It was bad enough that I was forced to "volunteer" my precious time (i could have worked on this site)...no...I was forced to wear formal attire. My school system is stuck in the past...and formal attire means...a dress...a white dress...(for those you who never bothered to find out...I am indeed female). So...for the first time in about 5 years...I wore a dress...and something that was complelty white. What cruel fate is this? To compound the EVIL situation...I was forced to wear feminine shoes. In other words...they hurt. And they pushed my toes together. Since I have a rather weird phobia of touching my own skin...this made my evening my own personall torture session. I think that such gender-specific torture should be deemed inhumane and abolished from our great society...of flaming chickens. Henceforth...Code: 666 of the Flaming Chickens Handbook states that under no circumstance will the Patron Saint of Paper Clips (guess who) be forced to wear anything other than a t-shirt and preferably black jeans. Should you violate this right, you will become destroyed or possibly dizzy. I'm leaving now...I have some destruction to do. i'm back. from graduation. we had to get there one hour and fifteen minutes early because there was traffic. After standing around a lot...the ceremony started. Lots of people spoke. by the time I had to do my part (tell people where to stand before getting their diploma) it was dark. there were bugs. they liked landing on me. then...i got to go stand while people said a lot of stuff. i couldn't hear it because someone had put the speakers facing the audience. we clapped. the whole time, even during the name-calling, seniors were playing with silly string and beachballs. afterwards...they turned off the lights. there were lots of fireworks. i wandered around for 20 minutes looking for a cell phone. i called home, and waited another hour for my ride...traffic to the school was one way. i felt sorry for my dad. i am tired...but cannot go to sleep. i'll copy and paste this to my site. maybe the longest text ever. you will all suffer as i have suffered when and if you graduate. i cannot feel my feet. i hate dress shoes. I'm back. Today, I'm here to salute the Pointless Signs Of America! The PSOA have been whole-heartedly working for you, and what have you done for them? NOTHING! These so-called "pointless" signs are doing just what they were meant to do: entertain you! You cannot judge them simply because they have no apparant function. They expand your mind, making you think about all the things they could do. They could do anything they wanted to, if they just put their minds to it. If you judged everything by what it doesn't acomplish, then the entire world is populated by pointless beings. Noone can do everything, so how can you expect a SIGN, with the I.Q. of toilet paper, to do everything. You people sicken me. You expect far to much of the inanimate world. The inanimate world, on the otherhand, expects nothing of you. Which is exactly what it gets. If you expect nothing, and get nothing, you feel nothing. If you expect nothing and get something, you're happy. But, if you expect something and get something you feel nothing. And if you expect something and get nothing, you feel cheated. If you're following along, and not completly confused, you'll realize that it is better to be a pessimist than an optomist. Yep that's right. This entry went from saluting the PSOA to making a statement about my ideals. This has been a weird day. You can thank my associate "Meg" she came up with the PSOA acronym. Everyone, clap for "Meg".I gotta go...seeya later! I'm finnaly back! Today, I took a long look at this site, which is the acomplishment of almost a year of work. And I asked myself "How could I have better spent my time?" And so, in the interest of wasting even more time, I made a list. Here we go! Number One: I could have cured cancer. Not that I know anything about medicine...or cancer for that matter. But I'm sure that if I just would have put my mind to it, I could have done it. Number Two: I could helped the earth to find eternal and lasting peace. Which would be boring. So I at least have an excuse for not doing that. Number Three: I could have studied and stuff. Uh...don't think so...Number Four: I could have learned to drive. This would have resulted in the deaths of numerous pedistrians...and I would still probably be wondering around in search of a McDonalds. Number Five: I could have read more books, played more video games and watched more mindless television. Gee...I wish I'd thought of that sooner. Number Six: I could have implemented one of several plans for world domination. Or, as an alternative, I could have ruined several plans for world domination that other people made. Number Seven: I could drive people crazy. Wait...aren't I already doing that? Scratch number seven. And on to: Number Eight: I could have...uhhhh...ummmmm...actually thought up these things before hand. Number Nine: Now it's just getting redundant, isn't it? Number Ten: This is the list that never ends. Yes, it goes on and on my friend. One person, started typing it not knowing what it was, and they'll continue typing it forever just because this is the list that never ends, yes it goes on and on my friends, some person started typing it not...etc, etc. Okay...I admit it. I have officialy run out of ways I could have better spent my time. I don't think there actually are any. Except for maybe five and six. Now, those have possibilities. However, I am currently content to just sit here and type. For the benefit of you, the reader...who may or may not exist. Either way, I'm continuing to sort of entertain myself. I feel like I should be outraged about some topic or another. I just can't work up the energy to be outraged. Perhaps a nice, soothing mistrust. Yeah. I can work with mistrust. I definitly mistrust lots of stuff. Like organ grinders, and the evil conspiracies. Did you know, that Kodak was part of the conspiracy to assasinate John F. Kennedy. Now, some of you are probably thinking "Gee, Really?", or "Wow, I never knew that!" while others are thinking "Who's John F. Kennedy?" or possibly "Who or What is Kodak". I fervently hope that you're not thinking the last two...especially about Kodak. Kodak, as you may know, is a film developing company. And John F. Kennedy (JFK) was an alien bent on global domination. Or possibly a really good president who wanted to fly to the moon. Either way, he got assasinated. And ever loony in America decided that it was a conspiracy. Some even go so far as to claim that Kodak "changed" the pictures of the assasination to make an assasination in the bushes become a tree's shadow. I didn't know that they had such good technology back then. I have to wonder...why would Kodak do such a thing. Perhaps Kodak is actually a front organization for a shadowy governmental system that controls the entire world and didn't want mankind to obtain the freedom of the stars and so tried to sabotauge the space program even though it didn't work as well as they planned. Or perhaps not. Either way, Kodak is undeniably evil. How can any company that takes so many "wholesome" pictures not be? You can just bet that they look at every one that get's turned in to them, judging blackmail value, and whether or not you could get arrested. It's just sickening, you can't even take a simple photo nowadays. Unless you have a digital camera, which are a symbol of freedom from the old ways and willing enslavement to the new ways. We can only hope that the digital camera manufacturers are kinder masters than the evil Kodak Lords. I better go...I think Kodak is tracing my site....I'm back now! And, once again, I have proof that someone actually took the time (two hours) to read this entire Longest Text Ever! It's amazing, it's incredible, it's unbelievable. But true. Even more incredible, this time it's someone I don't even know! Wooooooo! I feel inspired and happy and other really good emotions and stuff. And so, I'll take a trip down memory lane, to the dark depths of the past, to when I decided to make this page. It was inspired, in part, by my sheer and utter boredom. In school, back before I even owned a computer, I'd type random words for long periods of time, 'cause I had nothing better to do. Once I got this computer, I decided to do something similar on my beloved site. But, it ended up making more sense than I anticipated (scary thought, huh). Oh, well...I tired of nostalgia. Back to the present. Right now, I'm just typing so that no one can say that I've been slacking off. I don't think I have any conspiracy theories...except pop-ups/pop-unders. Have you ever had the evil pop-up that says that if you click here, it'll get rid off all the annoying pop-ups? Isn't that sort of ironic? Could the pop-up blocker people have chosen a better means to advertise their product? It's like grand-theft auto 3's talk show, you know, the one where there are Citizens Raging Against Phones? Or CRAP, for short. And the lady representing them, calls the radio station...on a phone. It's stupid and ironic and just shouldn't exist in a better world. Pop-Up ad's help you get rid of pop-up ads? Insane, chaotic...hmmmmm...I wonder who thought of it? Was it on purpose, or was it just some mistake? It is now my civic duty to discover this ancient mystery, and reveal it to the uncaring world. Or maybe I'll go make a frozen pizza. Yeah. That sounds good, too. Since I'm not particualarly inspired at the moment, I should leave and let you gather what is left of your sanity. I just can't seem to stop, though. Okay...I can do it. I'm leaving. I'm back...and it's several hours later. I've decided to imortalize the stupidity of my dog, Moose. She is a heavy-set Yorkshire Terrior (12 lbs.) In otherwords, she's a small yappy dog who is big for her breed. Today, I met her arch-enemy. An enemy so terrifying that Moose cannot stop shaking. An enemy so hideous that Moose must destroy it at all costs. An enemy so dangerous that Moose fears it above all others. Now you may be wondering what horrible beast is Moose's arch-enemy. And you probably suspect that it is something pathetic. You would be correct in your suspiciousness...for Mooses arch-enemy is...*dramatic drumroll*...a small, white, feather. Now, Moose has seen many feathers, birds even. But none have struck terror in her little moose heart like this particular feather. So...naturally I put her arch-enemy in my pocket and brought it home with me. This action has made her very suspicious of where my loyalties lie. She tracks the feather smell all over the house, and goes crazy whenever I take it out of my pocket. She even got her sister and mother in the spirt of things. Now her sister sounds an alarm whenever she sees the evil feather. Now, you may be wondering what is so terrifying about a small, white, feather. So am I. It doesn't smell funny, (I asked my brother, since I don't have a sense of smell), it seems perfectly ordinary. So, I've decided that Moose works for some secret government organization, and that the feather is the key to the destruction of the world, and I am just blithely letting it enter our home, so that it may furthur its evil plans to destroy the universe. That is the only possible explanation as to why it upsets her so much. Or...maybe it's the feather off of the cartoon owl from the tootsie-roll pop comercials (one...two...three..*crunch*). Whatever the case, I decided that the whole world, (or three of four random people) deserve to know that if the world and or universe are destroyed, it's the evil, little, white, feather's fault. Now I'd better go and torture my Moose with it...:) I am officially back. And you, the potentially non-existant reader gets a once in a lifetime chance to hear me rant and rave about my Horrible, Horrible Family Vacation. I know. You feel very, very honored. It's like this. My mother is a control freak, and she decided on the spur of the moment that we were going north to visit relatives. Later that day, she decided we were NOT going north, we were going south to a beach resort. Still later that day, she got offended at some trivial thing and decided that we weren't going anywhere at all. The very next day, she decided that we were going north, after all. So, we packed everthing up. Before we knew it, we were on the road. The first part of the trip was fairly easy. As in, I was half-asleep, hoping that we'd arrive while I slept. Then, in an inspired move, my brother talked my mother into letting him sit up front. That meant that my mother would be in the back, with me and my younger, eviler sister. Immediatly, my mother started complaining. It was uncomfortable in the back, it was too hot, it was too cold. Then, she accidently woke our three yappy dogs up, and they relized that they were in a car. That meant only one corse of action for them. They started shaking and barked their little heads off. This annoyed my mother further, untill she asked, no, demanded that my father turn the car around so that we could go home. Unfortuantly, we had already driven 337 miles toward our destination. After much argument, my father was going to turn around, untill he realized that my mother was going to drop the dogs and me off, and then turn around and continue north. This seemed slightly unpracticle, so we ended up not taking that 337 mile detour. We eventually reached our destination after 16 hours of virtually non-stop driving. We got there, we ate. We slept. My mother visited relatives. And so the week went by. I got to go to a huge library, and see Terminator 3 at the local theater. That was the high point of the entire trip. The last day, we were deciding where to eat. My mom said that she didn't care. So my dad picked a steak place. My mother tried to order a mushroom-swiss burger...only to discover that the place had no swiss-cheese. So she decided on a salad, only to discover that they didn't have her favorite salad dressing. After much deliberation, she decided that she wouldn't eat. After complaining how hungry she was, and about the poor quality of the resteraunt, she walked out of the resteraunt, instructing the rest of us to "enjoy our meals". And I wonder where my little sister gets her annoyingness. Not that my mother is annoying...just set in her ways. The whole meal thing was about the only interesting thing to happen during the week. On the way home, we had gotten approximatly 4 hours into the trip when my mother predicatably decided that we had to go back and eat at the 50th aniversary of her favorite ice cream place. Needless to say, we ignored her. Oh, and when my sister had to go to the bathroom very badly during a traffic jam, my mother had the good taste to making hissing/water noises to make my sister's problem worse. She claimed that my little sister always did it to her, and she was getting pay-back. Between her bickering with my sister, and obsessivly playing neopets games, I don't know what to do with her. Anyway...that was my family vacation rant. It sucked. No suprise. At least it's over. Sorry if I complained a lot. If you don't like it, start your own longest text ever. Anyway, I promise to go back to my usual routine the next time I rant here. I thought of a topic on the way home, but forgot it. Seeya. I'm back! I know, I took you completly by suprise. You thought you'd gotten rid of me. *cheesy super-hero voice* Well, fear not, random citizen, for I, PSOPC am here! *normal voice* Today I have a very important to discuss with you in this: PERFECTLY NORMAL PUBLIC SERVICE ANNOUNCMENT. Yes, that's right. It's time to warn you, the viewer...er...reader...about the evils of various stuff. Today's lesson is: subliminal messages . That's right, folks, mass hypnosis via commercials. Now, I'm sure you've at least heard of subliminal messages , right? No? Well...prepare to be enlightened. Subliminal messages are an advertising technique that puts hidden pictures and words into a main image. You don't see them, but your subconsious (dreaming) mind does. Your subconsious mind acts on whatever it is told. What does this mean to you? It means that WAL-MART TV IS EVIL! EVIIIIIIIIIIIIL!!!!!! Why else would they invest all that money to show commercials in their own store? Because they put subliminal messages in them, of course! Subliminal messanging also explains the successes of certain fast-food resteraunts, and brand name items. BEWARE YOUR TOASTER OVEN! Okay. That had nothing to do whatsoever with subliminal messages...it's just cool to say. Anyway, only watch wal-mart if you WANT to be subliminaly entertained into purchasing a new set of TUPERWARE, even though your old set is PERFECTLY fine. This has been a public service announcment. Pretty cool, huh? Uh...you don't have to take the subliminal stuff seriously. It's true, and all, but I have no proof about wal-mart, or certain fast food resteraunts. It makes sense, though. Wal-mart TV is evil. You cannot deny it. Seeya...hmmm..I wonder if there's subliminal stuff in my computer...I'm back. And I feel that it's time for a FAKE commercial break, for the highly informed, obviously brain-dead consumer. And now, a word from our non-existant sponsor. Ketchup: The only food that you'll want to eat after traveling to the 5th Dimension. It's been practically proven that Ketchup transforms into a highly intoxicating (non-addictive) delicious substance upon returning from the 5th Dimension. Stock up now with our Valu-Pak to recieve 3-metric tons of Ketchup, all for the low, low price of your brain, since you're obviously not using it anyway. Then, just wait for technology to "catch-up" (get it, catch-up, Ketchup?)so you can travel to the 5th Dimension like our scientists almost did. (Next Commercial) Get ready fo: Faux's new "reality" TV show, "How Low Can We Go?" It's about six contestants who compete to create the worst, least likely "reality" TV show. The winner not only gets the million-dollar prize, they get the chance to produce the show they created. Remember: if the show sucks, it's their fault, not ours!(Next exciting commercial!)And for all the idiots out there: Try new and improved Dum-B-Gon! Dum-B-Gon stimulates brain activity, making you up to 10 times smarter! Not only that, Dum-B-Gon: stimulates weight loss, cures "any" illness, does simple houshold chores, never leaves the toilet seat up and is the perfect gentle companion for your kids. How can you pass up this revolutionary new product? It's yours for only 3 bi-monthly payments of $3.95 ($3,95,000 on days ending in "y")Don't forget, Dum-B-Gon is practically guaranteed!* (*Not a guarantee) (Next commercial)Have you ever wondered why food sometimes goes bad in your fridge, even if you've only had it a few years? It's because of the "evil little faeries with sharp little teeth." These "faeries" sprinkle your food with highly toxic "age dust" and ruin a perfectly good four-year-old meatloaf. How do you stop them? With our patented "spray". Our "spray" kills over 99.9% of "faeries" (which are much to small to see) Our "spray" also kills most disease causing agents, like rats, or pigeons. WARNING: Leave food sit in an open, well-venilated spot for a week before eating. And now, back to our featured presentation. Wasn't that semi-entertaining? I bet you wanna go eat some Ketchup covered Dum-B Gon right now, while watching "reality" TV. Just make sure you "spray" your food first. Pathetic, wasn't it? Oh, well. I was bored, and a dilligent reader suggested I make fake commercials, so...therer they are. Happy? Good. I'm leavin', for now. I'm back. And I'm willing to enlighten you, the potentially you-know-what reader. Today, I was checking out some weird news. At one point, I read an article that stated that it had been proven, conclusivly, that Kansas was flatter than the standard pancake. The researches even used highly advanced technololgy to map the surface of a pancake and compare it to documented geology of Kansas. Some people disagree, the director of the Kansas Geological Survey said "I think this is part of a vast breakfast food conspiracy to denigrate Kansas. It's a cheap shot." So...doesn't that make you want to take Kansas' side (I sincerly appologize if you are from Kansas). It just seems extremly weird (and worthy of mentioning) that this semi-important guy from Kansas believes in a "vast breakfast food conspiracy". Makes you think that the long held belief that Kodak conspired with the JFK assasin(s) is normal. Another article claims that an anitseptic turned a polar bear purple, drawing large crowds of people. I sure hope other zoos won't copy them. Before you know it, we'll have orange alligators, pink tigers and blue lions. School children won't be able to correctly identify the color of a zebra. Random people will think they've gone crazy, after a seemingly innocent visit to the zoo. It's wrong, I tell you. A complete and total degregation of our societies values. What values, you say? The basic moral belief that Polar bears should be WHITE. Unless we spray-painted the snow purple, too. Then it would be okay. As long as the bear blends in, you know? Speaking of animals, there's a cat in California who is a kleptomaniac (likes to steal stuff). He sneaks into neighboring homes, and takes clothing, wrapped christmas presents, and anything he can find. He then leaves them under his owners car. Okay, better leave. I'm back. And I don't really have a topic today. I'm just bored. Sometimes I just do this, you know? Start typing without any idea about what it is I intend to say. Maybe I subconsiously DO know what I'm doing here, but refuse to admit it to myself. Or maybe I am monumentally bored and don't have anything else to do at the moment. Either way, I'm here. You must be pretty bored, too. Otherwise, why on earth (beta, krpto, zkdjf, Planet X, whatever) would you be here? It would make no sense. If you have something better to do, why wouldn't you be doing it right now? I would be. But, maybe that's just the difference between you and me. Yeah. That must be it. Unless you're bored. Then I completly understand. I need to find a topic. Here, topic, topic, topic! Come on, I won't hurt you, I promise! *hides large ax behind back* Come here, topic! Why are you afraid of little ol' me? *sigh* There are no topics anywhere near me. Kinda like me and "Meg" webcomic we are trying to do. It's called Hit-Or-Miss, any topics, plot, etc. are completly accidental and are not the fault/responsibility of the creators. That was sort of a topic, even though it was sort of random. Which is what I do best. Okay, I'm done with that litte commercial. What now...hmmmmm...should I share with you more of my paranoid/delusional conspiracy theories? Or have I been doing that too much lately? Oooooo! I know, I'll start of list of why it's fun/good to be insane/weird! #1You can say or do anything and normal people will agree with you in the hopes that you'll be satisfied, shut up, and go away. Far away. I will show you an example with this completly true stuff that I experienced several years ago. ME: My vicious, psychotic, flesh-eating bunny-rabbit wants to rule the world. RANDOM PERSON: Uh-huh, that's nice. ME: Yeah, but I told her that she'd be a terible ruler. I mean, she traded Asia for a carrot! And she doesn't even LIKE carrots! RANDOM PERSON: You don't say? ME: Yep. She also is the goddess of red jello. RANDOM PERSON: *head explouding from sheer insanity* As you can see, I was a very weird child (this happened in elementary school...uh...except for that head-explouding part). Okay...on to: #2 You can get out of practically anything by saying: a)It's against my religion b)I'm allergic to that. c)I have an extremly irrational fear of that. d)I already did that in a past life and it sucked. e)My psychotic bunny predicted I'd die doing it. Unfortunalty, several of those reasons LEGITAMITLY apply to a certain activity I do every Tuesday, which WILL NOT BE NAMED HERE LEST I GIVE IT POWER OVER ME! I'm allergic to parts of it, have irrational fears about others and I'm pretty sure it's against my Jenny religion...along with eating mashed potatoes, or potatoes of any kind. I'll add that to the FLAMING CHICKENS HANDBOOK. Thou shalt not eat spuds. Hmmmm...time for #3You can obsessive over ANYTHING, and people will think nothing of it. I, personally, am obsessed with, kitties, bunnies, bats, this website, drawing, making intriate little patterns with strings, doing mildly repetitive activities, being weird, apparantly making lists and cheese...and chickens...and flame. Fire is good. Fire is free. Fire is my friend...until it burns me. Then it must die...painfully. And on to:#4You make your friends look normal in comparison. And #5: You can give each of your pets several weird names such as: Ringling-Raison-Bailey-Suzana-Midnight-Schultz, Squirell, Moose, Moose-Moose, Moosey-Moose, Linzey-Moose, Muffin, Squirell-Muffin, Yabby-Doodle, Abby Normal, Wiggle-Baby, Wiggle-Muffin, Witle-Baby, Cheese-Monkey, Muffin-With-Squirell-Juice, Squirell-With-Muffin Juice, Moosey-Juice, Squirell-Monkey, etc. Now, wasn't that a fun list!? Doesn't that just make you proud to be weird? I should make bumber stickers saying that. Proud to be weird. It'd be cool. Anyway, gotta go! *yawn* I'm back. Last night I was super-charged with lots of sugar and not a lot of sleep. I ended up writing things during the time of night when EVERYTHING is hilarious, including the word sheep. To compound things, I wasn't alone, and things just escalated. The following is everything I wrote during that sugar-coated time period. Some are answers to e-mails, the rest are just stuff I wrote.

Definitly. THen we go to library. Guess what? Me and Josh ate lots and lots of sugar, and it's late at nite and everything is funny but we can't laugh 'cause everybody is sleepin' so it's even funnier but ever since we drank the water we sobered up even though we weren't drunk but we ate sugar...lots and lots of sugar. MOstly donut cake. Okay. JOsh says it was only one piece of cake. WE got it at Wal-mart. Or his mom did. OR something. Goodbye...oh, and the fresh chicken wings might be to blame. they were special wings. I hope I remember doing this. I think it's pretty funny. > You have blue hari..*gigles* I like hair. Josh says I probably won't remember writing any of this, but I can't sleep. THe cake was good. aSk anybody. Big Brother may be listening right now so I beter go. They're listening for a secrret...no it's cause of a secret. But the secret doesn't exist so they are stupid. *g8ggles* bye. Yes. Megan has hair. I've seen it. *giggling* It's very, very late at nite. ONly not really. i like sugar. NO, wait. It's early. WE have been having very profound thoughts lately. We think. THey might havve been important, but we keep forgetting them. We're not sure. Josh wants his thought back. *sniffle* i do, too. It's not fair. I think mine involved a jaunty song to sing. But I couldn't have sung it 'cause it would have woken everyone up and they would have called me inconsiderate. I have to get up really early to leave for home. I should be asleep. *gigles* It milght have been a sugar rush 'cause now we're having a sugar crash. OR, maybe it's the writing. Okay, maybe it was the ranch dressing instead of the special, fresh buffalo wings. But they really were'nt buffoal wings 'cause buffalo's don't have wings...cause they come off when they are babies, JOsh says so and he must be right causse he's been having Profound Thoughts even though he cannot remember them. But, the wings were'nt really special. I don't think. Maybe we're just really, really tired and had sugar. I don't want to play the stupid animal war card game 'cause the stupdi bear gets eaten by an eaagle.. ...goodbye ssslllee0yyyyslllllllleeeeeeeepppppppppppppyyyyyyyyyyy iiiiiiiiissssssssssssss gggggggggoooooooooooooddddddddddddd.............

As you can see, I was in a very interesting state of mind. I hadn't had a genuine sugar rush since I was 11. It was fairly fun. Although I acted like an idiot. Oh, well. I have more stuff to write, but I gotta go right now. Stay tuned to hear my thoughts on tanning, and an evil card game, and who knows what else...Okay I'm back. Here's what I wrote this weekend: Woooooo! 5000 hits! Aren't I special? *sigh* I can't think of anything to write. But I must. I must defeat the sister site of the Longest Text Ever! I mean, I've been doing this much, much longer than the other person. Hmmmmm...monkey. Why do weird people (myself included) obsess about monkeys? And, are monkeys spelled monkies? It just looks weird. Like a division of mounties made entirely out of monks. I bet it's spelled monkeys. It looks right. Maybe I should use spell-check. But...that'd be a lot of work, unlike ranting, raving and rambling. Hey, it's the 3 r's! No longer does school teach use reading, riting and 'rithmitic, it now teaches us ranting, raving and rambling! (and redundancy!) After all, isn't that basicly what the best teachers do? It sets a perfect example for you young, impressionable minds. Those are the best kind. *yet another highly dramatic, time-consuming sigh* I need a topic. A good one. Not one of those bargain ones anyone can find at your local topic discount outlet store. I'll rant and rave and ramble about the EVILS of sunlight. Most people actually like to spend long periods of time exposing their vulnerable skin to the harmful rays of the sun. These people have obviously suffered major brain damage from their prolonged exposure to the sun. The actually think that their skin's efforts to protect them are ATTRACTIVE. It'd be like someone thinking that scabs are atractive, 'case they protect you from disease. Then everyone would cut and scrape themselves to be covered in scabs. That's exactly what tanning is like. Purposly damaging the skin so you can look "attractive". Now, a long time ago, people were sort of smarter. They avoided the sun at all costs. They associated tans with hard, manuel labor. Then, some fasion bimbo went on a fasionable safarii to get some fasionable furs, or whatever. When she came back, 'lo and behold, she had a tan. This resourceful young vanguard of fasion decided to cover her extreme embarassment by acting like she meant to horribly damage herself. And because she was the head fasion bimbo, everyone agreed that the look was definitly "in". So, everyone went to the beach and got tans. Girls began wearing skimpier, and skimpier bathing suits. Men, of course, had no complaints. (Though whether it was the tan or the skimpy suits, no one will ever know.) As you read this Historicly Accurate Anecdote, you must realize the parallel between it and the fable The Emperoro's New Clothes. Someone did something incredbly stupid, but because they were powerful, everone acted like it was a stroke of genius. And the preceding generations became brain-washed (possibly through subliminal messages in sun-tan lotion commercials) to believe tans were expected. Those few who actually could think and avoided the sun were considered to be outcasts. I don't mean to insult you if you DO have a tan. I am simply explaining why I, personally, refuse to swim, go to the beach, sunbathe, leave the house, etc. Alrighty then. I'm gonna quit for now. I'm back. I'm so very, very tired. School has been on for four days now. I have three very hard academic classes. They give lots and lots of homework. Two and a half hours of homework (total) to be precise. I get home from work at 5:30p.m. and eat dinner. Then I do my homework. I get done at 9:15. Then I wait for my mom and dad to stop playing Collapse II so that I can get on. I usually have less than 30 minutes. It sucks. I can't really work on this site even though I now have a more in depth understanding of variables. I learned this from my calculator. I made a virtual pet for it. It was fun. I'm tired. Did I mention that, yet. My calculator is nifty. Sometimes, it is lazy. It tells me stuff like: "Warning: More Solutions May Exist" and "Questionable Accuracy". So...it doesn't bother to find all solutions, and it may be wrong. Geee....that is comforting. I love my calculator, though. It does all my Math for me. I hate Math. Math is so picky. In English, and stuff, if you miss one little detail, at most you lose partial credit, but you usually get it all right. In Math, one teeny, tiny little mistake will make you get the entire thing wrong. I tend to make those tiny mistakes, and get bad grades, even if I understand the concepts. I hate Math. I'm tired. Are you tired. I sure am. Guess what I wanna do. How did you ever guess? That's right, I wanna sleep. Why can't I? Hmmmm...good question. I think I'm so tired I can't sleep. Plus...I gots oblimagations...obligaton....obligations to this site. yeah. thats it...i so tired...bye-bye. I'm back. And more than slightly embarassed. Today my frazzled-brain produced something that is decidedly Jenny (that's my more or less "real" name). I was contemplating how my heavy load of books made me like a bulldozer and than I was about to suggest to my friend, "Meg" that we invent one. Then I realized that the buldozer already HAD been invented. That's how I knew it's name, picture and what it did. That is just...pathetic. School is taking its toll. *sigh* *sniffle* *snort* *insert word that is a sound that begins with an "s" here* I don't have much time, so, I must be brief. I'm not sure how I CAN be brief since I have absolutly nothing to say. The best way to be brief is to quit now. Right now. Which is what I'm about to do. Any miniute now. I promise. Okay. Bye! *sigh* My dogs are just weird. You remember my Moose's arch-enemy, don't you? You know, the small, white feather. Well, my squirell now has an arch-enemy. At least her's makes sense...sort of. Her enemy is a fake Yorkshire Terrior (same species as her) made entirely out of goat hair. She HATES and FEARS it. She'll shake and run from it, then suddenly dive and bite it's head. She goes crazy if someone holds it, 'cause it's getting attention and not her. I'm fairly certain she knows it's not alive, though. Maybe she just doesn't like goat-smell. In any case, she is clearly insane. Just like everyone else in my family. In other news, I participated in the Second Battle of the Asparagus Wars and chronicled them here. I'll add a link to the main page when I get around to it. It gave me new insight into how weird I am. I fought with vegitables, covered myself in bubble wrap, groveled before the Great Banana and dodge skittles and flying doughnuts and rubber chikens. The entire message board was like one big insane asylum. Needless to say, I felt right at home. Well, seeya *waves brightly* I got to go to my Grendel (really cool book) project for school. I's making fake soundtracks like the teacher told me! BYE!!! Okay...I'm back. Today's rant is a panic rant. There are not going to be conspiracies...or humor of any kind. I think. *let the panic begin!* IT'S NOT FAIR! Why do I have to work year round? I only signed up for a semester. I was looking forward to having A elective, while everyone else was enjoying three or four...or even more. Oooo..I'm a poet, and don't I know it? In any case...it's awful. It's bad enough to go to school, leave school, go to work, leave work, do homework and then wait for my dad to get off of the computer so that I can do stuff. I want SOME free time. That's all. Is that too much to ask? I spend from 8-5 doing what everyone else wants. When is it MYturn? Next semester will be almost exactly like this one. Even though my schedule is technically supposed to be completly differnt. You see, my school has "block" scheduling. That means I take four classes this semester and four different classes next year. But one of my classes is work, and two others are horrible year-round classes. So next semester I'll still have work, AP Lit, and AP Physics. It's not FAIR. Physics is so FREAKIN' hard! I don't understand it. I have no problem with Lit. Okay. Work. I love my work, I love the kids I work with. But I HATE spending three hours of every day in a "class" when everyone else's class is only an hour and a half. I don't care if I have to ride the bus home if I stop work. I don't care if I'd get home only an hour or so before I normaly do. I want an elective. Maybe. I think. All I know is that I've been assuming one thing while the person in charge has been assuming a completly different thing. Neither of us thought to question the other. And so I'm in deep doo-doo. *sniffle* I just want to have some FREAKIN' variety in my daily grind, you know? I don't WANT to do the same thing for an entire year. Yeah, I know, regular schedule schools do that. I pity them, I really do. I've spent the past three years of my life EXPECTING each semester to be like a mini-year. I DO NOT LIKE CHANGE! This is just way too much of a change at once. I don't want year-round classes. I don't want a full year of work. I don't want to be in this mess...I'm going to bed. I'm back. I don't have much of a choice about the whole work thing. Plus, the kids at the daycare (where I work, obviously) say that I'm "cool to talk to". That makes me feel alll warm and fuzzy inside. Like a muffin. They just like how I know lots of pointless laws and random facts. Okay. ON TO THE CONPIRACY OF THE DAY!: I've had this nagging fear that I am part of some random but vast conspiracy (about what I'm not sure but it must be vast). Meanwhile there is a vast conspiracy at school to keep me ignorant about my pawn roll in the other vast conpiracy by keeping me vastly bored. (In a very vast sense) And: did you ever notice that the word "conspiracy" is vastly similar to the word "constipation". I only mention this 'cause I've accidently spelled constipation instead of conspiracy a few times. (on accident, vast number of times) Hee-Hee! Isn't vast a funny word? You can just picture sterotypical pirates saying, "A vast ye mateys!". I'm not exactly sure what that means, but it sure is funny:) You don't agree? Shame on you! Code: 888 of The Flaming Chickens Handbook states that The Patron Saint of Paperclips (still me) is always right. ALWAYS. If the facts beg to differ, than the facts are wrong. End of story. Seeya. I'm back. I've been playing one of the new neopets slot machines (black pawkeet). I'm completly and totally addicted. Gambling is so much fun! I've won 500 np, at least and I'm on a roll. Now sure, I could have won more than 500 at some game in which you don't have to pay to play. But, what would be the fun in that? I even came up with a mathematical explanation for why gambling is fun (while I was eating a hyper-speed dinner, thinking nothing of getting back to the slot machine). Okay. If you don't understand the concept of numbers less than zero, (negative numbers) just skip this part. Imagine a number line that points in the positive and negative direction. When I start playing a game, I am on 0. I have neither won nor lost money/neopoints. When I win 500np on a normal game, I move to the 500 point. There is exactly 500 units of distance between the two extremes of winning amounts (0 and 500) BUT! When I play a gambling game, there is a possibility that I'll lose everything, so I start on negative however much NP I have with me. If I had 500np with me, I'd be at-500. Then, when I win 500 additional np, I move to the 500np point. The distance between the two extremes of how much I could have won is 1000np, making me feel like I've won much more than if I'd played a normal game. Did you understand that? Good. I probably won't later. But that is irrelevant. Goodbye! I am back. And I hava a very, almost special rant for you. The previous sentence made absolutly no sense. Good for it. In a recent article, humorist Dave Barry discussed the addictive quality of the snack food, Cheez-Its. Naturally, I had many mixed feelings, primarily disgust, as I have not voluntarily eaten a Cheez-It in quite some time. They're disgusting, bland and definitly not made of cheez, whatever that is. My family has always bought Cheez-Its, to the point of making me physically sick at the thought of eating one. (To this day, however, I will almost literally kill for a box of Cheez-It party mix, as it is a rare commodity at my house.) Fortunatly, my mom recently finnaly switched our snack food preference. To Cheese Nips. Say it. Out loud. What does it sound like? When you look at them they are identical to the evil little Cheez-Its. The only difference is the taste, which I enjoy, since it is new and different. What I want to know is this: are there no intelectual property rights in the world of food products? I mean, don't you think the creators of Cheese-Nips had a box of Cheez-Its out when they were designing their product? It seems like blaggerent plagerism. The only reason the makers of Cheese-Nips don't get sued is because of the tast difference and Cheese Nips are made of real "cheese" rather than cheez. It makes you think of Name-Brand vs. Generic cereal brands. They are the samething, with the same look, and almost same name. But people buy name brands. Why, because they assume it's better quality. Plus, boxes are more convient than bags. A profound statement, if I ever heard one. Any way, I'm leaving to eat some Cheessy goodness! I'm back. Apparantly my standards of weird have gone up. This morning, my Mom came home from work. She was upset, because she had accidently run over an armidillo. She said she hurt it the first time, and wanted to put it out of it's misery, so she went back and ran over it 11 more times. But it's legs were still moving and it was alive. She was extremly upset. When I related this story to my friends (including "Meg") they thought it was hilarious. They couldn't stop laughing. I thought it was sad...and normal. They particularly liked how I said that she went back and ran over it 11 more times. I'm not sure why. Of course, when I next saw my Mom, she retold the story to me, several times. With the exact same words, motions and emotions. She didn't think it was weird, either. Perhaps my family is just so weird, we've lost all sense of perspective. Or maybe it's everybody else that's weird. I just don't know. What do you think, Hypothetical Reader? You don't know either? Hmmmmm...what is this world coming to? Oh, by the way, I was paid a decent compliment today. One of my friends (who laughed at the armidillo story) named Tonileigh said "Jenny (that's me) is weirder than the average Psycho." and " You think Jenny's weird? Wait till you see her in angry mob form!" Now THAT'S just weird. "angry mob form"? That just sounds nifty! I can clone myself and form and angry mob? In anycase, this was particularly funny because Tonileigh is one of my "normaler" friends. Although I tell you she can't possibly be normal, since she hangs out with me. Anyway, I'm gonna go. I gots stuff to do! I'm back. If you'll look toward the bottom of this page, you'll notice that I added a nifty little thing called the "babel fish". It will translate any thing, to anything else. Ain't it nifty? What's really fun is to translate an English saying, like out of sight, out of mind. Then, when it's in German, or whatever, translate it back to English. It's so completly garbled, it's funny. For instance, I wrote: "I am the Crazy Taco!", and translated it to German. I then copied and pasted the German and put it in the text box. I translated it from German to English and got "I am the Moved Taco!" See? Hours of completly useless fun! This has been my hourly Public Service Announcement that I only do when I feel like it. Seeya! I'm back! Woooo! And do I ever have a topic today! I've been a paranoid, conspiracy seeking mood lately and the newest threat to my sanity is: smoke detectors! Come on, think about it! In all those 911 shows, people wake up and their house is engulfed in flames. The smoke detector either never went off, or went off and the people just slept through it. Okay, fire is loud. And hot...and smoky. If you can sleep through a raging fire, close enough to set off the smoke detector, then you are definitly going to sleep through the smoke detector. Plus, the fire gradually gets louder, and hotter, and smokier. The sleeping person will gradually get used to it (and incorporate it into their dreams). By the time the smoke dector goes off, the fire has drowned it out to no more than an annoying buzz. My point is that smoke detectors have very little value in home security. Okay, one day, in the future, smoke dectectors will probably activate litte fire-fighter bots that every home will have. But untill that day, the concept of the smoke detector is useless. If you're awake to hear it, chances are that you've already noticed the smoke, fire and eminent danger. If you're asleep, the fire will wake you. So, that leads us to the evil paranoid conspiracy I thought of the other night. What if the smoke detectors have tiny litte cameras in them? That would explain that annoying green little blinkie light in them. Unless, of course, the government was smart enough to have cameras without the blinkie light. In any case, wouldn't the blinkie light help night-vision cameras see in the dark? It only takes a little light to help those thingies, and smoke detectors provide more than a little. I can even see the shadow of my hand on the wall from the light those things shed. It's annoying. Here I am, trying to get a decent nights sleep and there's this green light that periodically blinks to red directly in front of me. It's a small light, but it's sooooooo annoying. There MUST be some sort of conspiracy involved, 'cause if there is, I can get rid of the EVIL thing! So, fellow conspiracy nuts: Take down the evil governmental safety device and take it apart. If you can still think during all that incessent beeping, you'll probably find evidence that I'm really paranoid. Or possibly right...that would be scary. In any case...I guess that smoke detectors are a neccesary evil...but...WHY DO THEY HAVE TO HAVE THAT STUPID LIGHT? Does it serve an obvious purpose? No! That's why it MUST be EVIL! You cannot deny the logic of my thinking! Now...I'm gonna go and worry about the light on my toaster oven...seeya! *sighs dramatically* I'm back. It's not fair, ya know? Each Friday, I wait (all tingly with anticipation) for the weekend so that I can stay up 'till the wee hours of the morning and sleep past noon. But my idiotic body has an automatic alarm clock, or something. During the weekdays, I get about seven hours of sleep (usually less) and wake up at 6:11 a.m. Yep. Now, some of you are probably calling me a whiner, 'cause you have to get up at 4:30, or whatever. And lots of you are probably gloating 'cause you don't have to get up 'till 8:30. The reason I have to get up at 6 something is that I...I...I ride the bus to school. Yeah...I know...pathetic. (Believe me, though, you never want to see me drive...I get easily distracted by clouds and signs saying FREE KITTIES!...kitties are hugable...but if you hug them...they'll scratch your eyes out...so then you have to hiss at them and establish dominence...but kitties don't like that...even though dogs do...but kitties are obviously not dogs...even though they are fuzzy.) So...my lack of a car and driving skills force me to use the bus, which comes for me 45 minutes before my school even starts. It's stupid. It only takes me a few minutes to get ready, then I can go back to bed. Now...I bet you're wondering why I don't just wake up a few minutes before I have to go. My sister. My evil, EVIL sister. That's why. She's evil. SHE has to get up at 6:11 to put on make-up, do her hair and basically annoy the heck out of me. So rather than battle her over the concept of getting dressed in the dark, I get up. Oh...I'm rambling again, aren't I? Back to the original topic! So...when the weekend rolls around, I'm fairly exhausted. But, my stupid internal alarm clock is starting to wake me up around six. I can usually fall back asleep (if I don't panic and think I'm late for school), but the stupid thing wakes me up again exactly seven hours after I originally fell asleep. Which is why it's not even 10:00 and here I am, typing. Which I suppose may be a good thing, seeing as how I'm currently in a Longest Text Ever Rivalry with Galaxy Dreamer's site. *cough*She's winning*cough* But that's just because I have so much to do to mantain and update this site, I rarely get a chance to just sit here and type. Oh, and I would like to mention to my *snicker* LOYAL fans that this Longest Text Ever DOES get updated at least once a week, so please, please, please, PLEASE do not read this once, in one sitting and then leave forever, and ever and ever! It makes me sad...*sniffle* Well...I feel better now. Did you know that I now possess a DOMAIN NAME? Yep. That's right! It'll be ready soon, ain't it great? Okay, back to the flaming-chickens LTE rivalry. Another reason why this isn't as long as Galaxy's is that I refuse to write every day as it would--this is the funny part--LOWER THE QUALITY OF MY OVERALL WORK! HA-HA! HILARIOUS! "lower the quality"? Sometimes I crack myself up. If this was quality work, I'd publish it and make a fortune. Speaking of publishing, I do plan on somehow, someday publishing this as the first rambling narrative that makes no sense, and is about as interesting as rereading the almanac. I'd probably lose money, but the concept is interesting. I think. Anyway, I better go or the quality of this will go down in that evil downward spiral thing I discussed a few months back. Seeya. I'm back. Wooooo! I's can get to my site again! It was down for a whole day or so 'cause of all the traffic I got from my new quizes. I have an extra-special rant for you all today, to celebrate the new domain name! www.flaming-chickens.com! Okay. I am now barophobic (afraid of gravity). I recently learned in my EVIL Physics class that on average, humans lose one inch of height during the day due to gravity pushing on their spine. The height is regained at night, when you're laying down. This naturally alarmed the HECK out of me! GRAVITY IS EVIL! It's pushing down on me, squishing my spine. MY SPINE IS SQUISHY! That's is just so extremly creepy. What if, eventually, Earth's gravity get's very very strong, and we all imploud from the squishyness? It'd be like when you go to the bottom of the ocean, only with gravity instead of pressure...*shudders* Pressure is evil, too. Air pressure. Did you know that there is over two miles of air sitting on you right now? Even though air is light, that much air adds up. TWO MILES? Even the air is conspiring to squish me! If you don't believe that all that air has weight, try going into space sometime. Space is notorious for not having air. When you're in space (without a space suit) you don't SUFFUCATE, you don't FREEZE. You exploud. Since all that nifty air isn't pressin' on you, your guts and stuff are free to go wherever they want, and the EVIL little things decide to roam around. Outside your body. It's creepy. So...air pressure can be a good thing. Even though it gains pleasure from squishing my spine. That's it, I'm gonna take drastic measures! I'm gonna launch THE OFFICIAL FLAMING CHICKENS LUNAR COLONY! The moon has one-sixth of Earth's gravity. And absolutly NO air-pressure. We can all wear spiffy space-suits and feel all superiour to all those stupid earthlings. So...if you wish to contribute to this great and magneficent and magestic and MOOSEY project...we need the following things: 739 rolls of aluminium foil (preferably the extra shiny kind) 417 refridgerator boxes, 9000 rolls of "sticky on both sides" duct tape, 300 lbs of chicken feathers (preferably white) and 1 (one) thermo-nuclear-rocket-thruster. If you can spare any of these items, please e-mail them to me. Yes. E-mail. Did you really think I'd give you guys my ADDRESS? Now...I know what you guys are thinking...some of those items on that list are gonna be hard to find. Especially that duct tape. But, believe me, it's MUCH more practical than the alternative. What is the alternative, you ask? I'll tell you. Making me(The Patron Saint of Paperclips) the Ruler of the Laws of Nature! That way I can just outlaw the need for gravity and air pressure! I'm already half way there, since I conclusivly proved (in Physics class) that gravity actually causes things to slow down and EVENTUALLY GO UP! Sure, my TEACHER said that was because I was doing the problems wrong, but once I'm the Ruler of the Laws of Nature, I'll change the problems so that I'm right! Oooo! I thought of another very good reason to assist with the Official Flaming Chickens Lunar Colony! As we all know, the world is going to end in about 380,695 days! This means that we only have a very short while to prepare. And I sugest that we build the rocket so that we can go to the Official Flaming Chickens Lunar Colony so that we can laugh at the stupid earthlings who are blowing up because they didn't listen to us when we tried to warn them about the impending doom! Once we are on our Lunar Landing Site, we will engage in many exciting activites, primarily related to suffucating and starving. If (and this is a big if) the world DOES survive, we can beg them for food, oxygen and other supplies. They'll probably just call us weird and laugh at us, but that's beside the point! I can even see the Official Flaming Chicken Rocket. It'll be covered in chicken feathers, and shaped like a chicken. The foil will make up the beak and the folded legs, and the thruster can simulate the tail. It will be a truly magestic site, as it launches from the earth, spewing excess oxygen, cardboard, feathers and tape. But, act now, or it will be too late, and you will be one of the losers that we'll be laughing at, assuming we have air to laugh with. Remember, e-mail psopc@flaming-chickens.com the much needed supplies...if that is possible. If not, then some day, when the Internet is down and I'm really bored, I will construct a model OFCR and attempt to launch it. That will be a wonderous day. I think I'll get my little sister to be the test piolet. Well...better go...I need to plan this out more...I'm back. And mildly weirded-out. My dad...was on this site. My dad. It even SOUNDS weird. He took the TAB member quiz and turned out to be me, he took the JOB quiz, and was a repo man (which had a pic of my brother) He said he wanted to see what I was doing, and to make sure that I wasn't saying anything derrogatory about my parents. He looked me upvia yahoo's search engine using flaming-chicken as the keyword. It took him to my quiz page. So he probably didn't see the majority of my site. It's just weird. All along, my entire family has scoffed (nifty word, isn't it?) about my site, and called me weird. I dunno...I guess I'm just kinda freaked out. Oh, and don't forget to celebrate Mad Hatter Day on October the 6th. Seeya. I'm back. I had some conspriacy or another to rant about. But then I listened to some of the new music I put on my site and mellowed out. I can't remember what I was gonna rant about. Oh, yeah. Now I do. "Purified" water. Just wait a sec while I stop the music. *content sigh* There we go...that's much better. Now I can think. That's right, folks. "Purified" water. Now...just stop a second and contemplate that. Pure means, well, no extra stuff. 100% of something. Right? Well, next time you buy your $3 FREAKIN' dollar bottle of water, consider this. On almost all the "purified" water bottles I've ever seen it has the following mesage: "Purified through reverse osmosis. Minerals added for a pure, fresh taste." In other words, they take all that extra "stuff" out to make it pure. Then they add other "stuff" in to make it TASTE pure. But it's not. For all you, the uninformed consumer, could know, it might have rat poison in it. "Pure" water manufactuerers are not required to list the ingredients of water, because the average consumer believes that it should be obvious. But that is false! They add random minerals to our water to make it taste better, and then advertise it as pure! It's an outrage! I'd rather drink the "impure" tap water where at least I KNOW that someone, somewhere tested it. It's a law, I think. But does anyone test "pure" water? Most likely they test it BEFORE they add the extra stuff..."Yep, Bob, this is some mighty pure water." "Yep, Bill, time to dump the arsnic in so it tastes pure!" What kind of reasoning is that? Wouldn't pure water TASTE pure, and impure water TASTE impure? The insanity and stupidity is mind boggling! That's why I like fast-food salt. It actually lists what random minerals they through in to make it TASTE like salt. There's salt, of course, and aluminum sulfate, and other compounds. But the point is, if I were, say, freakily allergic to a random mineral, I could read the ingredients and not eat the salt. That's what they need to do with the water. Or, at the very least, not label it as "pure". Okay. That's the rant of the week, month, year, whatever. I'll probably have another one soon, but that whole water thing has been buggin me for awhile. Well...seeya! Er...yeah...I'm back. It's been awhile, (at least two weeks) since I've written here. I've been obsessed with various webcomics, creating the stupidly long new Phobia Quiz and being maniacly hysterical about my site always being down due to bandwith issues. I'm goin' light on the advertising at the moment, which is why I'm free to write here. I WANT to write. But I can't think of anything to write about. Typical. I finnaly get some free time to rant and rave and all my topics just magically melted away. Let's see...what have I ranted about before, subliminal messages, vast breakfast cereal conspiracies, water, uh...reality tv? And that's just what I can list from memory. Oh, yeah! How could I forget the stupid Tootsie Roll Pop Commercials? TACO is still in my heart. *sighs*...now...let's see...what to rant about today... ... ... ... ... I can't think of anything!? Is this writer's block?! Or maybe I just wanna go to bed. Sleeping is fun. Well...let's see. Did you know that statistics prove that 45% of all statistics are completly made up by me (The Patron Saint of Paperclips)? Well...they are. Ha! I see you have no reaction to that, do you Hypothetical Reader? I have once again caused that explody sensation in your brain meats! You cannot DEFEAT me! I rule the...er...*random Loyal Minion whispers in ear* That's right! I rule the Internet! The Official FLaming-Chickens Handbook already confirms that fact! You CANNOT DENY it! It says that in black and...er lime green! It MUST be true! Because it is in those veyr colors that the Matrix is programmed! Ahhh...I see your confusion! You cannot follow the vast, mind-boggling logic that is ME! Wait...how...how can I BE logic? That doesn't make any sense...you can't BE something abstract...can you? Now MY brain meats feel explody. That's not fair! I see your EVIL plot now, Hypothetical Reader! You just let me rant on and on for you KNEW that eventually I would confuse myself with my vast puddle of knowledge. You are devious...I give you that. Unfortunantly...I must leave...before the confusion spreads and I do something stupid...like revealing my one weakness before you...THAT'S IT! Code 452 of the Flaming Chickens Handbook states that the Patron Saint of Paperclips (ME!!!) does not, has never, and will absolutly NOT admit to having any weakness...besides the aformention indivduals own skin, which isn't even a weakness anyway since no representative of the Dark, Fluffier Side can BE the Patron Saint of Paperclips (Guess, who...no...no...THAT'S IT!) and even if they could it wouldn't do them any good because it would scare them instead of the aformentioned individual. Boy...I really enjoy confusing myself!:) Seeya! I'm baaaaa-ack! Aren't you happy? Here, see if you can find the super-secret message!
While you wait for yesterday's tomorrow, lunge back and remember that day.  You know the one.  Yeah, this doesn't mean anything to you.  Are you surprised?  Obviously not.  Answer me, you blobby looking freak! Or suffer my blindingly moronic nail messages.

Did you find it? Wasn't it super? And secret? I thought it was. But then, I'm me...and you're you. I think. I'm pretty sure you're not me...but you could be that other guy. Yeah...that...guy...you know who I'm talking about. No? Do not MOCK me! I know where you are right now! Spooky, huh? Ooooo...time for today's topic. My favorite stuff...JTHM...I have my libraries copy of JTHM...I shall quote Noodle Boy for you:) (Full copyright/credit to Jonhnen Vasquez for writin' the stuff, I'm just sharing the spleeny goodness with you). (it's edited, of course, to stay PG13...**** signifies a random naugty word:)) "HEY, DOG ENTITY! RISE UP AND BARE YOUR BISCUIT FILTY FANGS AT THE LEASH WIELDING DEMON!! **** MY NAVEL ITCHES!! MEOW!MEOW!MEOW! CAT CHOW!!! CEASE YOUR FLATULENT WINDS AND HEAR MY MIND NUMBING EXPULSIONS OF WICKED NOISE! GRRR!! CHEESE!!! I SENSE YOUR ENVY OF MY NECK!! AND I DONT BLAME YOU!! DROOOOOL OVER MY MAGICAL POWERS!! I HAVE POWERS PINTO BEANS CAN ONLY DREAM OF! WANNA SEE ME PULL A TAPEWORM OUTTA MY ****!! HUH?!...STARE DEEP INTO THE STINKING ABYSS OF MY INDIVIDUALLY WRAPPED SLICES!!! HOLY WAX! CHECK OUT MY ARMPITS!!! HEEEEY! WAIDAMINIT!! WAIT JUST A POLYP PICKING MINUTE!! I SEE YOUR GAME! YOU WILL NOT SINK MY CHEERIO!! I SEE WHAT IS TRANSPIRING HERE!!! YOU'RE ALL ZOMBIE THIGH-FAT PEOPLE BROUGHT INTO ANIMATION BY SOME EVIL FORCE OF FORCEFUL EVIL!!! **** THAT LIPSTICKS THE WRONG COLOR FOR YOU!! MOOOO! WOOF! OH, DON'T YOU SEE THE TOENAILS?!! OH, SO SPLENDID!! A,B,C,D,E,F,G,H,I,J,K...! UNDER SUCH EXTREME HEAT, WEAR AND DEGRADATION IS INEVITABLE!! PARTS BREAK AFTER OVERUSE!! AND THAT IS WHY TOASTER PASTRIES WILL BURST INTO FLAMES IF YOU DON'T KEEP AN EYE ON THEM! Now, wasn't that entertainment. I added to the lenghth of the LTE without even thinking! That's talent. Lots of gooey talent. Unfortunatly, I once again am devoid of a topic. And any weirdness I could come up with would be normal compared to Noodle Boy, so...I bid thee farewell...seeya! I'm back. And I've realized that I am a complete idiot. For an ENTIRE MONTH I have possesed the arcane knowledge, but I forgot to share it with you, my loyal potentially imaginary reader. I know. You're shocked at my selfish, bad, memory. I apologize from the depths of my moosey soul. For, you see...my life long goal has been fufilled...*anticipatory silence*...THERE ACTUALLY IS GRAPE PIE!!!! I know...you are as shocked as I am. One day I was randomly looking up images via Google...and 'lo and behold, there it was. Grape Pie. It was as if it had been just sitting there...waiting for me to discover it. Apparantly Grape Pie isn't mainstream, but it has existed for some time. In obscure cookbooks. Well...that just makes me filled with gooey happiness. Of course, there is also regret...after all, I could have made a fortune if I'd been the first to think of it. Oh, well. There was something else I had to tell you loyal *cricket chirps, someone coughs* fans. I can't remember what. I guess I'll just rant and rave about that whole vicious downward spiral of my writing. I mean, I KNOW people are coming here...I have proof! *holds up a piece of paper, which, from a distance, appears to have writing on it* Yes, undenyable proof! But this proof degrades this mysterious, mystical and mystifying "quality" of my words. After all, how can I be self derisive, and full of low expectations for this site if I KNOW people are here...several thousand of them in fact, in just a few months. It's strange. I felt more fufilled when this site was a barren wastland of useless space. But, if it had remained that way, I would have had no impetus to continue my pointlessly insane ranting. Oh, speaking of insane, I STILL need those much needed supplies for the Official Flaming-Chickens Lunar Colony! No one has even bothered to e-mail them to me...*sniffle*. I needs the duct tape! How can I survive without the sticky goodness? HOW, I ask you!? It cannot be...hmmmm...maybe I should just use IMAGINARY duct tape...it's easier to come by ,but it's much more expensive...I'm not sure what to do. *enter Squirell* What's that, little Squirell? That's just silly. You KNOW I ran out of imaginary money last week when I bought that imaginary country. WHAT!? Just "imagine" I have more!? What a crazy idea. So crazy it just might work! *scrunches eyes and makes funny sounds* Nope. It didn't. I guess I'll just have to wait untill my imaginary clone hijacks that imaginary bank truck. Until then...I have absolutly no imaginary money. What ever shall I do? I won't be able to feed my various imaginary pets and friends their beloved imaginary food! Squirell? You gots extra money, don't you? *nods* I thought so. You give to me? No? I gives you imaginary IOU's...here...yours. Thank you Squirell. *Squirell wanders off in search of electrical sockets to sniff* What's that, Hypothetical Reader? You don't know who Squirell is? You haven't been paying attention have you? She's my little puppy...she fears grape flavored stuff, wind, rain, television, noise, silence, small children and pretty much everything. She likes sniffing potentially dangerous stuff, like electrical sockets. Surely you have heard of her? Still no? Oh, well. You know...I enjoy having these conversations with you. It really lets me get to know you. What's that? You say I'm really just talking to myself? What an eccentric idea! To think, YOU are trying to tell ME that YOU aren't here. How absurd. After all, I'm talking to you, aren't I? *nods* Well, yeah...I KNOW I'm actually typing instead of talking. Wait a minute...so you're saying that I'm talking and responding to you, but you won't be reading this until long after I have finished typing? Now who's the crazy one? For that theory to work, I'd have to be psychic...or in possesion of a freaky time-traveling computer. Because what you're saying is that I'm talking to people in the future. That my words somehow travel accross time (if only a few minutes) and are somehow picked up by future you, and that my responses are dictated by future you's reactions. What? You mean that I'm just randomly responding regardless of your reactions? Why, that would be insane, wouldn't it? That's the point you're trying to get across? *pauses* Oh. I see. You wanna play that way. Well...two can play by THOSE rules. You wanna try to convince me I'M crazy? Well, look at you? How do you know I even exist? For all you know you could be staring at that freaky 3-D maze screen saver with a blank look on your face while you THINK you're reading an inhumanly long text. For all you know, you could be halucinating my entire site! For that matter, how do you know that ANYTHING but you exists! You could be floating out in empty space, conjuring nice little fantasies to relieve the monotony of being the only living being! Every single person you know could just be figments of your imagination, you could even be in a crazy house! Not only that, but how do you know that YOU actually exist? You could be the figment of someone else's dream. What would happen when that dreamer woke? Are you happy? You got me started. I may NEVER shut up. I'll just go on and on about how crazy you COULD be. All because YOU tried to convince me that I was crazy. *blinks* And I STILL can't remember what else I was gonna say to you people. Strange, huh? Well, I better leave before I go on and on about more "reality" theories. Makes you wonder about "reality" television, huh? Seeya. I'm back. Grrrr...I had a nifty rant all planned out in my head. And then I was unable to get on the computer and I forgot most of it. Oh, but I did remember what else I wanted to say to you people. Remember that rant I did on how there could be a secret camera in the smoke detector? I few months ago I saw a movie about that. It was pretty good. Maybe I'd seen it before, and that's where I got the idea. I forgot it's name. Well...I DO have a special treat for you weirdos who apparantly like wasting time! Today, in my (Honors) English class, we did group work. My group...well...we either went hysterical or crazy, I can't decide which. We had to do an essay on a book. There was a sample essay online. It sucked. It tooked about envelooping (enveloping) cracked nuts and parables. So we were already off to a bad start. Here is the sum total of my group's work. (Note: I wrote virtually none of this, so I cannot be blamed, credited with any of this. "Lots of death, lots and lots of death in this section. Death is like life in that after you die some things start life again inside of you. 'Ah the power of cheese!' The author's vision was unique in that only he put biscuits and death in the same sentence. 'I found nothing else to do but to offer him on of my good Swede's ship's biscuits I had in my pocket'" And we're supposed to be GOOD in English! We KNEW how terrible it was, but we just didn't bother to change it. Especially the part about the biscuits and cheese. We just picked random words in the selection and wrote about them. It was sad. In any case, I hope you enjoyed our patheticness. Seeya! I'm back. Today I will be mercifully brief. I am here to bring AWARNESS to your moosey soul! Right now, while you are sitting in your "chair" and eating your "junk food", millions of almonds are commiting suicide. Yes...that's right...suicide. I was alerted to this growing problem in our world community by (Kat, the ruler of all that is almondy)...and it greatly concerns me. People just don't realize that their almonds and mixed nuts may be having depression and other problems. We need to act now! For more information, e-mail EnpuUnknown@msn.com Well...seeya! I'm so very, very tired. Today was Halloween. I worked for four hours at the "Library of Terror" sponsered by TAB. TAB members got pizza...lots of pizza...and candy. Ugh. It was fun, but exhausting. I was almost completly covered in (fake) blood...it was sticky toward the end. One guy was a "shock therepy" patient...he was a good actor. He acted like he was really being tortured and stuff. I'm tired. I bet you couldn't tell. Why am I writing? Because this is the first time I've been on a computer all day. You can't blame me. Don't worry, I'll go to bed soon. In the mean time, I'll just sit here and type with my eyes closed. It's hard to type because of the bandaid on my finger. I accidently cut it with scizzors. It hurt. The fake blood seeped into the open wound. Gee...I sure hope it wasn't poisonous. If so, I guess I won't be writing here for quite awhile...seeya. Okay, this next rant has nothing to do whatsoever with Halloween...which is to be expected because it's been several days since then. Anyway, today's rant is about one of my many and various pet peeves: fasion and...stuff. My definition of fasion includes clothes, shoes, jewelery and all things of that nature. Now, don't get me wrong. I can appreciate a spiffy black outfit as much as the next person, but everytime I consider actually buying clothes for aesthetic value, I think about how I could better spend my money. On video games. Sure, some of this "fasion" stuff is cool and all, but all it shows is that you had the three and three-quarters brain cells required to copy someone else's "look". And don't even get me started on earrings. My little, eviler sister got her ears pierced when she was relativly younger. My mom did it to her because it was free. OF FREAKIN' COURSE IT WAS FREE! Just like thos so called "diet supplements" that give you a "free" sample because they know that once you try it, you'll like it so much you'll spend oodles of cash on it. (There's probably drugs in it). Anyway, like the "diet supplement" people, the earring manufacturers KNOW that once they pierce you, you'll be hooked for life. *pauses* *groans* I'm sorry for that pun (pierced, hooked, getit?). AS soon as you're pierced, you have to buy "starter" earrings. Then you'll need an "extra" pair...for special occasions. Before you know it you'll realize that you need Christmas earrings, Halloween earrings, Valentine's Day earrings, St. Patrick's Day earrings, for crying out loud! You'll wear these "festive" earings for about a day and then abandon them in some dark cranny of your closet because you simply can't wear the same earrings two years in a row for heaven's sake! Then you'll see these cute little "days-of-the-week" earrings at the mall, and you'll just have to get a few sets, just in case you lose some. By the time you're eighty, you'll have enough ear jewelry to open up your own jewelry shop. Of course, you won't want to do that becuase you still need more earrings so people won't think you wear the same ones over and over again. When I think of how much money people WASTE on appearences, it makes me feel like projectile vomiting. If that's not a vast conspiracy, then nothing on this Earth is. Now, I'm not speaking from personal experience here. No one I know is that obsessed with earrings, it was just an example. (Although my mother does have a "earring tree".) Sure, certain members of my family do pay WAY to much attention to fasion, but that's just because of the expectations of society. I, being weird, am pretty much immune to such expectations. Except those specially formulated for weird-o's like me. If I were to suddenly convert this entrie site into a *shudders* Backstreet Boys fan site or something, you wouldn't be any more suprised than I would be if my brother woke up one day and suddenly realized that he's shallow. It's the same concept. (No, I don't like any of those creepy "pop" stars. I think that they should routinly die a slow, savage, agonizing death...I was just saying a random thing that I would never, ever do.) Well...any way...seeya! I'm back. And today's rant is a sort of philosophical one. It's about the (supposedly) infinite nature of the universe. Suprised? It's spiffy. You see, if the universe is indeed infinite, that means that literally EVERYTHING is possible, and in fact, is happening somewhere in the universe. Think about it. No matter how unlikely something is, if the universe is infinite, it's happening an infinite number of times. Think about that old saying about "If you gave an infinite number of monkeys an infinite number of typewriters, eventually they would reproduce the entire works of Shakespear". That makes complete and total sense! Anyone just randomly typing letters will eventually accidently write a word, right? Now think of 100 people typing randomly. You figure that one of those 100 people would actually have a coherent phrase. And one out of a million people would probably have a few sentences. So if you have an infinite number of people, some are going to have entire books of coherent stuff. And, you have to remember that because infinity is infinite, you can divide it an infinite number of times. Try it. If you have a decent graphing calculator, plug in the infinity symbol divided by anything, (even infinity). The answer is still infinity. Using my philosopy, that EVERYTHING exists because the universe is infinite...well...think about it. In some far off world, there are pokemon...there are an evil race of muffin like creatures, there is a world with ABSOLUTLY NO COMMERCIALS DURING TELEVISION! I know, unlikely, huh? But somewhere, it exists. Think about it. If the universe is infinite it would be crazy to think that we're alone. With an infinite universe, there are infinite possibilites. There ARE aliens. Not only that, but there are an infinite number of different kinds of intelligent life. Which means that there are an infinite number of worlds with humanoid life. (Think of the fake-looking Star Trek aliens). If there are an infinte number of worlds with human life, than there are an infinte number of worlds that have someone exactly like you, with only a few key differences. (Like alternate dimensions and stuff) So, there is a world where you are the creator of this Longest Text Ever. There is a world where you are a faerie. There is a world where you were never born. There is a world where you are a slave to your TOASTER OVEN. The possibilities are literally endless. Every fantasy the human mind has concieved exist at some place in the universe. There are an infinite number of worlds with Harry Potter. Think about it. I came up with this philosophy when I was in fifth grade. I'd tell it to my little brother as a bed time story. He always enjoyed it because it meant that somewhere, he was the Supreme Dictator of the Galaxy. That made him happy. He ignored the fact that he was also a 72 year old "sanitation engineer" somewhere. All the good possibilities effectivly cancel out the bad ones, leaving the sum total of you and your counterparts experiences as nothing. You don't have the best life of your counterparts, but you don't have the worst either. Because that would be impossible. There is always someone worse off and better off than you. Because there are an infinite number of people on either side of the spectrum. Confusing, huh? But that's the kind of thing I like. That also explains why normal stuff confuses me. I'm sure some so called "scientist" can prove all my theories wrong...but how? How do you PROVE something is not infinite? You'd have to find the end, of course. But how, may I ask, can you find the end of the FREAKIN' universe? What, is there a giant sign saying, "DEAD END"? The universe is EVERYTHING, how can it end? At the same time, how can you prove something IS infinite? You could travel in a straight line at the speed of light for a million years and all you'd prove is that the universe is really, really big. But you'd never prove it was infinite. How could you? Our mind's cannot conceive of the vastness of infinity. We'd probably go crazier. In any case, my theory means that playing video games is very cruel. Why, you ask? Because in some world, the video game is real. So when you kill, or whatever, in the game, you are actually ending life somewhere in the universe. Of course, you also end life by sneezing, eating, sleeping, and watching T.V. According to my theory that everything is real. Of course, if everything is real...then the Universe is pretty contradictory. The paradox of my system of beliefs leads me to believe that the universe, in fact, is not infinite. Because nature supposidly abhors a paradox. Although, as I said, there's no way to prove me wrong OR right. That's what I like about making abstract theories... Anyway, sorry for the lack of relative weirdness, conspiracy theories and doughnuts (my Moose ate them all). Well...now that I think about it...according to my theory, ALL conspiracies are real and mislabled "paranoid" people are really the only ones who see the truth. *blinks* Wow...so I'm NOT paranoid. Who'da thought it? Well...better go before one of my two and half sane readers falls asleep:) Seeya! I'm back! Boy, are you mythical, mystical readers in for a treat, today! I have a guest rant/fake commercial written by "Meg" (who is once again banned from accessing the almighty Internet). Are you ready? No? Too Bad! The magic eight-ball glows with knowledge! With a shake, the future is revealed! The magic eight-ball is a plastic casing with an unknown, possibly toxic liquid inside. The future is determined by the triangles, in a startling blue color which spin around in a zany manner. Wheather you're saved or doomed, find out now! Is that old lady on the street corner really an ex-convict? Is fat-free food more delicious than food loaded with fat? Is your school playground a gateay to the underworld? All this information and more is yours for the low, low price of 5 payments of $29.99! And, if you call within the next ten minutes you get a free eight ball with the one you buy! But wait! There's more! Get the free Lil' Ball for your traveling needs! Warning: this product is illegal in most states) Wasn't that entertaining? "Meg" wrote it for a school assignment. We were supposed to write about a cherished child-hood toy, and attempt to turn our fond memories into a commercial. I wrote about furby, and how it was fun to watch it die. No, really. Somehow, I managed to make my furby die. It would sneeze, then start it's eight-hour-long death hum. It would hum, and hum, and hum...and then mercifully die. I don't exactly have a good track record with virtual pets. I once...*embarassed pause* had "Hey, You! Pikachu!"...a pokemon game. I'll only say that it was the first game you could "talk" to and was the first (and only) N64 virtual pet. Pikachu...well...he didn't like me. I gave him cupcakes, and presents, and did everything I could to befriend him! And what did he do to me? He snuck up on me one day in our room (in the game) with a sword! That's right, a sword! He tried to kill me! I heard something and turned around, and there he was! He even tried to hide the sword behind his back! When I tried to talk to him, he tossed it away nonchalantly and pretended he hadn't heard me. Then he preceeded to trash my room, scattering kleenex everywhere. I'm pretty sure that the "smelly yellow ball" that he started throwing was his own feces (poo). That dirty little rat. Awwww...isn't he cute? Hmmmm...I suppose I should clarify that the Pikachu game was 3-D and your character was in first person mode(you see through character's eyes). Otherwise you'd think I was delusional, or something. Everyone I know who has played that game is shocked when I tell them...oh, well. Speaking of virtual pets, I'm revamping the ones on this site. I've finnally figured out sorta, maybe, kinda, how to do stuff to make it more real. Anyway, seeya! OOooooo! I'm back, and I had yet another Asparagus War with some people. We made a guild, and I wrote out the transcripts of the first ever Asparagus War in narrative form (mock epic, very cheesey) Since it's very, very long, I'll post it here to meet my imaginary word quota for the day! Oh, and all those weird squiggly lines and symbols, those are supposed to be apostrophes, but neopet's code is weird, and I'm not gonna bother to edit it. Enjoy!
And, on the 15th day of the Month of August, in the year of our Lord 2003, at approximately 7:52 p.m. a great and wondrous battle was fought in the waste lands of the General Chat Room. â€˜Lo, and eon337 did wield the mighty Swiss-Asparagus, and did attempt to vanquish her foe, the Evil and Fluffy preggypreggy. Preggypreggy had tamed the fearsome Asparagus Sword, and many a foe had she slain with her valor. But behold! For the Swiss-Asparagus did slice, and dice and was capable of turning itself into julienne fries! And so it seemed that the two mighty warriors were evenly matched and that their struggle would never come to and end. They didst charge at each other with a terrible noise and clamor, and the skies did shake and the earth did tremble at the ferocity of their mighty blows! The stereotypical Asparagus Sword didst fail to hit its mark and eon337 did mock the Sword for itâ€™s falling.

Translation: On 8-15-03, 7:52 NST, eon337 and preggypreggy grabbed some Asparagus Themed weapons and fought. They made fun of each otherâ€™s weapons, and generally kept missing each other every time they swung.
And eon337 did think long and ponderous and in so doing converted the puny Swiss-Asparagus into the mighty and powerful toothpick. And the masses did gleam the significance of this act and they were awed by the grace and cunning of the wooden speck. And preggypreggy was immune to the verbal slings and arrows of her foe, and refused to be disheartened by eon337â€™s dishonorable insults. Her claim being that function of a weapon is to be put before the ornate form. She endeavored to thwart eon337â€™s plans to defeat her with the great and wondrous toothpick. She didst again pummel the air with her sword, but in her enthusiasm her blows didst fall far from their mark. And the masses didst cheer for eon337 as she had impressed them greatly and they made the sounds of impressive wonder.
Translation: Eon337 turned a perfectly good Swiss-Asparagus into a toothpick to gain the approval of the studio audience. The audience oooed and awed. Preggypreggy continued to swing wildly around, missing each time. She ignored eon337â€™s insult and said that at least her sword worked.
And then a new challenger didst arrive at the arena and scoobychick6900 didst fling bowls of asparagus at the fighting mortal enemies. Preggypreggy appealed to the masses, but to no avail, and was heartily surprised when the asparagus did hit her. And â€˜Lo! The masses didst condemn scoobychick6900 loudly and vehemently and there was much rejoicing in the land. Preggypreggy didst fancy that she had perhaps met scoobychick6900 previously, and so did attempt to recollect when. Eon337 did take advantage of the lull in action and did attack preggypreggy with her finger. Preggypreggy did retaliate with the awe-inspiring SuperPoke, and eon337 was laid low upon the ground in agony.
Translation: Scoobychick6900 showed up and threw bowls of asparagus. Eon337 poked preggypreggy, and preggypreggy poked back, harder. Eon337 was hurt.
And with victory in her mighty vision, preggypreggy didst decide to reveal her secret weapon, and with a fancy hand movement, revealed the extent of her traitorous ways. For all know that the bagels and the doughnuts didst disband in ancient times of old. Preggypreggy, through her treacherous methods, had obtained the Flying Doughnut of Doom and didst endeavor to use it. Eon337 was readily prepared for such an occurrence and didst arm herself with mighty ear-shields, armor that didst repel all projectiles of metal, a head covering, and an outer covering of strange, transparent material that didst snap whence it was squeezed. Aragorns_cutie then didst show up with the almighty nemesis broccoli and an unnecessary sneer upon her countenance. _Radical_girl_ did break the protocol and didst claim to rather fight with cucumbers, and so it was done. And the masses rejoiced. And eon337 didst not hear the newcomers because of her mighty ear-shields, and didst offer the fighters dressings for their wounds.
Translation: Preggypreggy revealed that she had a secret weapon from Ancient Times, although eon337 was prepared for it, with earmuffs, bulletproof armor, and bubble wrap. Two new fighters showed up and did random things. Eon337 offered Band-Aids.
And aragorns_cutie didst laugh in a manic way, and didst wave the broccoli to and fro in a threatening manner. And eon337 did finally recognize the newcomers, and ask, neigh, commanded they give preggypreggy healing strips. And _radical_girl_ didst howl furiously and implored the fighters to meet their DOOOOOOOOM. And so hiamplidude didst come to the battle and didst posses the almighty Asparagus Cannon, and did thinkest himself invincible. Following himaplidude camst nemmisis_dude, who didst offer the warriors ponderous messages such as: THIS TRULY WORKS! POST THIS IN 10 DIFFERENT BOARDS AND YOU WILL FIND A BABY PAINTBRUSH WHEN YOU GO TO CHAT PREFERENCE AND 10000000000NPS! THIS TRULY WORKS, TRUST ME. And the warriors didst consider nemmisis_dude a profit, who was devoted to speaking in tongues so as to convey a message from the gods. And â€˜Lo! Nemmisis_dude didst reveal his Bow and Asparagus and the masses rejoiced. And eon337 didst intimidate her foes by snapping her transparent covering and shrieking that she was invincible.
Translation: Random stuff happened, and more people showed up. Someone spammed the message board so people ignored it and eon337 went crazier
And â€˜Lo! The writer of this cheesy epic didst realize that virtually every sentence begins with â€œandâ€, and the masses rejoiced. _radical_girl_ didsâ€™t chase random people with her broccolis, and didst miss in her mighty swings. Hiamplidude didst take out nemmisis_dude, and gloried in his honor and didst receive a spinach gun from the gods. . Preggypreggy was threatened by the randomness, and didst call her secret weapon, the Mighty Evil Flying Donut Of Doom! Eon337 realized preggypreggyâ€™s unprecedented treachery and didst cower in her impotence before one so Dark and Fluffy. And aragorns_cutie had ex-lax and _radical_girl_ didst covet invincibility and so did don a pool covering. Nemmisis_dude was revealed to be unharmed by hiamplidude, and didst fire at preggypreggy with an asparagus gun. But preggypreggy didst forget one thing: eon337 still possessed the support of the ignorant masses, which guaranteed her inevitable victory. And preggpreggy scoffed at eon337â€™s supposed advantage and didst claim that even the ravenous horde of the people didst not conceive of her one vulnerable point. And preggypreggy didst close her mind to the truth: the dark side is fluffy.
Translation: Preggypreggy called the Flying Donut of doom and eon337 called preggypreggy a traitor. The newcomers did random tings, and eon337 reminded everyone that she still had the support of the studio audience. Preggypreggy refused to see it as an advantage, and refused to believe that she was on the Dark, Fluffier Side.
And behold, for eon337 didst transform the Asparagus Toothpick into a Aspara-Launcher and didst call preggypreggy deceived in her way of thinking, for the Dark Side is always Fluffier. And preggypreggy didst call forth the creamed cheese from the bowels of the Evil Flying Donut of Doom and the masses did rejoice, and wallowed in the fattening substances that fell from the air like a gift of mana from the gods. And eon337 didst fire projectiles at preggypreggy and unexpectedly mimicked the holy Matrix in her cries of â€œDodge thisâ€. And neoshadow08 didst arrive and inquire as to whether rubber chickens were allowed, and the multitudes said yes. Preggypreggy, in her infinite wisdom, failed to see the connection between Darkness and Fluffiness, and was so forsaken by the masses. And greyratt didst claim to have invented a new, spookier type of asparagus that never caught on, and the multitudes rejoiced. Preggypreggy didst dodge the projectile, and gained honor amongst the masses. As the theological debate about the Dark, Fluffier Side raged on, the newcomers fought with the dung of dogs, the chickens of rubber and other such unorthodox weaponry as greyratt didst play with discarded asparagus.
Translation: Some stuff happened here. No, really! Eon337â€™s toothpick became an Aspara-Launcher, and preggypreggy and eon337 argued about whether the Dark Side was Fluffy or not. Neoshadow08 and greyratt came, and did stuff. Preggypreggy released cream cheese from the Flying Donut of Doom.
And eon337 didst revealth that she didst posses the Ultimate Asparagus Themed Weapon, too terrible to be named, oh, what the heckth, the name didst ring and was The Thermo-Asparagus-Nuclear-Weapon. And preggypreggy didst begin to crack under the strain of the Squeak of Death, and so in his infinite understanding, neoshadow08 didst remove the Squeak of Death and didst replace it with the Chic Attack. Aragorns_cutie didst protest the violence, and didst consume the flavorful tomato paste. And moonbeam998 didst come, a magical priestess full of arcane knowledge. Her mighty glance didst fall upon the warriors and she didst proclaim: THIS TRULY WORKS! POST THIS IN TEN DIFFERENT BOARDS AND YOU WILL FIND A BABY PAINTBRUSH WHEN YOU GO TO CHAT PREREFERENCE AND 10000000000NPS! THIS TRULY WORKS, TRUST ME! And the warriors were mystified by her meaning, but verily they didst decide that it meant for them to continue their holy battle, in the name of whatever great and mysterious god moonbeam998 didst represent. Scoobychick6900 didst return to pummel the warriors with bowels of asparagus, as in times of old.
Translation: Eon337 got out the Thermal-Asparagus-Nuclear-Weapon, and neoshadow08 stopped squeaking and started the Chick Attack. Yet another person spammed the message board, and was equally ignored. Scoobychick6900 returned.
And neoshadow08â€™s baby chickens didst fall unto the warriors from the sky, and didst pummel the brave fighters unmercifully. And scoobychick6900 didst offer to the warriors magical rainbow colored pellets, which she didst hurl at them forcefully with a gun. The magic pellets were then revealed to be the chickenâ€™s only weakness. And the warriors were locked in a deadly struggle, each using their unique methods and weapons. And the masses didst rejoice yet again. And then â€˜Lo! For preggypreggy was forced to valiantly flee the battlefield, and acceded the victory to eon337. And the masses looked confused. Eon337 didst admit that preggypreggy didst fight a valiant battle. Skuld815 didst arrive and didst proclaim the battle strange and didst fling M & Mâ€™s at the warriors. And scoobychick6900 didst proclaim that Rice Krispies were much more powerful than other weapons, and didst think that she was the only warrior left. She did wail with despair as she didst discover that eon337 remained in the land of the living.
Translation: Neoshadow08 caused chickens to fall from the sky, and scoobychick6900 fired skittles at people. Preggypreggy had to leave, and skuld815 showed up. Scoobychick6900 thought she was the last fighter left, but was not.
And eon337 and scoobychick6900 were locked in a deadly struggle, candy versus vegetables. And neoshadow08 didst summon the Great Banana for advice, and the masses were stunned. Oh, the ground did shake, and the mountains trembled. The very stars became irregular in their rotations. And so the Great Banana was called, and it was good. And scoobychick6900 revealed that she had indeed blasphemed against the Great Banana and she didst quake in terror and attempted to corrupt eon337 into blaspheming as well. And shadow9441414 didst arrive with two prodigious asparagus swords. And spicychibie didst arrive and was proven to be crazier than all others, and the masses were impressed. Behold! Eon337 didst prostrate herself before the might of the Great Banana and didst beg for his aid in defeating scoobychick6900, and the Great Banana didst forgive eon337 and giveth her a banana. And spicychibie didst partake of the asparagus and didst faint. And the Great Banana didst advise eon337 to not rely on the strength of others, but to rely on the strength within. And scoobychick6900 didst appeal to the Great Banana and didst beg for forgiveness. And the Great Banana didst not make a reply, but instead didst close his eyes and did a perfect mimicry of sleep. And scoobychick6900 didst blasphemy again and didst explode bombs of rainbow color. And eon37, in the callow impatience of youth, didst detonate the Thermal-Asparagus-Nuclear-Weapon. And the masses were blown away. As the smoke, and rubble and debris were dissipated, behold! The Great Banana was vanquished! And eon337 didst lament this fate, for her weapon hadst been aimed at scoobychick6900. And scoobychick6900 didst revel in the defeat of the Great Banana, and didst stab at eon337 with its decapitated stem. And neoshadow08 was forced to choose sides, and â€˜Lo he choose eon337! And the warriors didst depart, if not friends, then less angry enemies. And so ends the first of: The Asparagus Wars Chronicles.
Translation: While eon337 and scoobychick6900 fought, neoshadow08 called the Great Banana. Scoobychick6900 claimed to have eaten the banana the previous night, and feared the bananaâ€™s wrath. The Great Banana was defeated, and everyone decided that the war was over.
Wasn't that entertaining? Seeya! I'm back! Woooooooooooo! Guess what? Yep! *happy wiggle dance* I gots the first shipment of the much needed (pictures of) supplies for the Official Flaming-Chickens Lunar Colony! Woooooo! I feels the happy! This has been a short announcment to document the happy wigglienss that is me. Seeya! I'm back. And vaguely depressed. For the longest time, random people have been coming to my site, and staying 0.00 seconds! How is this possible? Do they not even look at my site? How can they be so cruel, to click, but not look? Grrr.... I asked Santa why this was so...but he doesn't talk to me anymore, after that incident when I was a kid. You see...*start wavy flashback lines and dreamy music* When I was a kid...or whatever...I asked Santa for nuclear warheads, helicopters, tanks...and possibly legions of doom. No, seriously! (I was twelve and forced to communicate with Santa so that my younger siblings did not guess the truth...(what truth?)...there is no spoon. (badly done Matrix parody)) Anyway...Santa didn't come through. The creep! How was I supposed to conquer the world without those supplies? All I got was a Lion King video and other random stuff. How did this help me? I vowed revenge against Santa...after all, it would have benefited him to help me. Once I was the Undisputed Lord of the Universe, the world would have been a spooky place. And all the little children wouldn't have been "good" anymore, since they would be free of thier Authoritarian Parental Units and the definition of "good" (to a parent, at least) is to obey your parents and not embarrass them. Soooooo....Santa would have had it easier. No "good" children would have meant that Santa could have had a permanent vacation in the Bahahmas, not molested by my Legions of Doom because after all--he had delivered the world to me in a brightly wrapped gift box. The man would have been more trusted than my trusted Lieutenants! (funny word...had to use spell check to spell it ^^;;) But that jolly old IDIOT had to mess things up. So, to get back at him I not only continued to not believe in him, I attempted to convert all the miniony children at my disposal...(okay not really, the idea just occured to me)...so I ask you *cough* Loyal Reader, to immediatly cease believing in Santa. I figure that--like Tinkerbell--he will evenutally perish if he doesn't have enough people believing in him. What is this? You wish to rule the world, too? Well, you can't! It's mine! Blasphemy! You dare to challenge MY rule? You are a fool! Okay...yeah...my whole Santa plot IS kinda dumb...but that's just a front so that you never guess my REAL plot! That's right....cower before my power! *insert evil, insane cackle here* I shall defeat you, Anonymous (another tricky word) Reader! Gah! I'd better go before you trace my location thorugh the Internet and send your Governmental Spyders to me! Ooops...I gave you an idea, didn't I? Well, don't use it! It's mine, you are a copy cat! Seeya *appropriate evil glare* I'm back! And, seeying as you MUST be tired of MY ranting, I have a special treat for all you hypothetical two and a half readers out there! You get ranting from somebody else! I won't bother to introduce them, since they do a good job of it themselves...here we go: Hiya. This is not PSOPC today. This is PSOCB (Patron Saint of Carbonated Beverages). We are the two original Head Saints, but for some reason, she gets all the attention. Guess I should get out of bed once in a while huh. Originally, I thought up the whole Patron Saints of the Order of the Flaming Chicken (when I should have been taking notes in Trig), but PSOPC is more creative and she elaborated on it more so. I was drawing "suppressed rage in bunny form" comics then and didn't care. I must say, she's gotten very good at thinking randomy thoughts, whereas, I'm just stoopid and something dumb pops out of my brain like floppy bacon from a toaster. I drank half a bottle of soy sauce today just to see if it gave me x-ray vision, but alas, I had nothing I wanted to look through (okay, I'm lying. I drank the whole thing on a dare.). By the way, soy sauce is gross. Who invented it? --"Why gee whiz, Bert! I think we should mix soy beans with water and have chinese for lunch!!"--"Why, indubitoubly Samson! Not only will it taste like crap, we'll get the runs!!!"-- If you don't know what the "runs" are, consult old people, like my dad. If you are in high school or college and have a job, this works great. When I call in sick (when I'm sick of working, not actually sick), I always have nosey bosses who want to know exactly what my symptoms are and how bad. I found a way to make them not WANT to know. I told my sister to try it once and it worked for her too. You just call up work, use a very retarded, slow, lisping voice when you say this: --"Weeelllllllll, I woked up this mornin' with a terrible headache so I took some aspirin with theraflu. By the way, those don't mix too good, now I have a tummy ache, my nose is runny and bleedin', my spleen feels like its gonna 'splode, I'm a tad gassy, and I got the RUUUUUUUUUUUUUUUUUUUUNNNNNNNNNNNNNNNNZZZZZZZZZZZ!!!-- At this point, you'll want to use an annoying high-pitched growly voice (think drunk Barney from The Simpsons after sucking helium balloons), raspberry a few times with your toungue and hang up. I have much to do now, so thus ends this portion of my guest rant. I'll probably want to do this a few more times just because I can. Weeee Bye now! I bet you, loyal *hmmm...I don't want a cricket...maybe a nice annoying gnat or something...okay...instead of the cricket...* readers can't wait for the next time I don't rant! Right? Weeeellll...I DO have a topic for today...a topic so wonderful that it will also be included in the next OFCEM! What is this magical topic, you ask? Why, opposite day, of course! You see...er...well...how should I begin? Opposite day is, of course a day in which everything you say means the exact opposite. It is practiced (informally) by many elementary schoolers. I honor this er...honored tradition. But, to my dismay, I discovered a fatal flaw with opposite day. By my reasoning...it COULD NOT EXIST! Yes...I know...blasphemy, right? But it could not be disputed. If you were to tell someone that it WAS opposite day they would have to take the opposite of what you just said which would mean that it WASN'T opposite day. And, of course, if you were to tell someone that it WASN'T opposite day there would be no reason for them to take the opposite of what you said and so it still WOULDN'T be opposite day! Confusing, huh? But I have now seen the light! The answer to this moral dilema has been so neatly resolved, by Jesse. He is er...well...I'm not sure how old...but he is in the third grade. He is either a genius...or really weird like me (Come on, be honest...how many of you random people have put any though into opposite day...or even know about it?) He said that to make it opposite day...*dramatic pause in which the PSOPC stares into space vacantly*...all you had to do was say that it would be opposite day in 5 seconds! PURE GENIUS! Since it is not yet opposite day, you don't have to take the opposite of the statement and so can take it at face value! Do you care, Loyal *gnat/cricket sound* Reader? *stunned* You don't!? Why ever not!? It is the most important discovery since...since...er...since...GRAVITY! (Although it is evil and squishying my spine...) How can you remain apathatic at a time like this!? The fate of mankind has been forever altered! Oh. Yeah...I guess you are right. I AM just rambling so that this Longest Text Ever gets even longer. But I DO care about this topic. There's not even a conspiracy! Well..fine! Be that way! Goodbye! I'm back *twitch* and seriously annoyed. Grrr...time to yet again complain about my *twitch* evil family. It is once again the time of year that makes entire families bond together...in the same sense that cats and dogs bond together when they have rabies. The time...is science fair time. My younger, eviler sister does a science project every single year. *twitch* The concept of science projects strikes fear in my mother's heart. She can not stand them. Naturally, this is why she takes over the project and does it for my little sister. Unfortunatly, this means that I am often called on for my "consultant" abilities. *twitch* In other words, I do the experiment, and think of all the results, and the wording of everything. I then interpret my work for my mother, who writes everything down because she has really, really obsessivly neat handwritting. Of course, my mother gets stressed merely handling paper that will potentionally be USED for a science project, so this is a very, very negative situation. Oh, and my mother refuses to even entertain the notion that my little sister might possibly be of help *twitch*. At this very moment my little sister is watching a Disney movie, while complaining of a headache. *twitch* My mother is getting more and more aggravated as I try to explain that my sister might fail if it looks like she didn't do the project. I am currently on strike. I refuse to assist this project in any further way untill my little sister does freakin' SOMETHING. Wow. Speak of the devil. My sister IS doing something. She is RE-WRITING everything my mother just wrote. Like mother like daughter. *twitch* I guess this is my mother's way to make sure the judges don't know that my sister didn't do the project. My mother makes my sister redo everything over and over again because it's not perfect enough for her. Now she is the one who's getting yelled at. I guess I can't help but feel sorry for my evil sister. *pauses* I guess I'll stop complaining, then. God...I have a headache...seeya. I'm back. *shakes head* And I have (yet again) a rant about the sheer weirdness of my family. Previously I have ranted about our fun-filled family outing to a bar, and about my non-gender specific siblings obsession with dead animals. Somehow, these two occurances have joined in an unholy union to create: The Roadkill Sightseeing Event of Doom! We actually went to a normal resteraunt for dinner, believe it or not. On the way back, my mother entertained us with the story of how she had seen roadkill that looked exactly like a dead bear. She had later compared notes with one of her wacko friends and they had decided that it was, in fact, a dead wild boar. We would be passing by it in a few minutes. Oh joy. My non-gender specific sibling (henceforth known as my sister) was naturally estatic about these events. She wanted to get out and see the boar. My mother agreed, and wanted my Dad to turn the car around so we could go to Wal-Mart to buy a flash-light. My father refused this. We ended up driving right past the supposed location of the boar, much to the dismay of my sister and mother...and dare I say it? Yes...I dare. My BROTHER was even interested. Faced with direct mutiny from all but me, my father wisely elected to turn the car around. We drove off the road and my dad aimed the car headlights at the boar. I must say, it wasn't that impressive. It was just a lump of black hair, and it was a lot smaller than any bear. My sister was impressed, and it was all I could do to keep her from jumping out of the car to it. My mother was disappointed, saying that the boar had seemed bigger in the daylight. My dad moved the car back and forth, so that we could see the boar on the side of the road more clearly. My mother became terrified and decided that we would flip and die. All to see a boar. After a few minutes, we drove away. My mother seemed upset that I had not been interested in her roadkill. I can't help but feel cheated. Normal families go to museums and theme parks for amusement. We view dead animals. There is something just SLIGHTLY wrong with this. It reminds me of the time a few weeks ago when my mother swore up and down that she saw a grave by the side of the road. This bothered her for some time untill one day she finally pulled over to the side of the road and exhumed the shallow grave and discovered that it was actually a deer. Luckily, I was not with her this day. However, she never leaves any member of our family in the dark concerning roadkill. It's just strange. Anyway, that's the rant for today, seeying as how there was actually a topic. Seeya! I'm back! Seeing how I will shortly no longer be (legally) a child, I have decided to rant about: adults. You cannot deny it. They are EVIL. Think about it! Come, on! Don't be shy! I'm serious. When you think of the evil, conniving, conspiratorial ways of adults, what's the first thing to come to mind? The nursery rhyme, 'Mary Had a Little Lamb', right? Huh? You mean it's NOT!? How...bizzare, it's obviously a mechanism for brain-washing. Anyway, here's MY reasoning for hating the song (and many, many others). Mary Had A Little Lamb makes children resigned to accepting punishment that they don't deserve! You still do not see!? Fine, I shall elaborate. This poor little girl's lamb (with fleece as white as snow--an obvious reference to seeming purity) follows her to school one day (which was, oddly enough, against the rules). The kids at school, who were not used to seeing a lamb at school, started to "laugh and play" and basically act like wild animals. Now (this is all speculation) I am 90% sure that the final verse (which neither I, nor anyone I asked know) deals with the teacher reprimanding poor little Mary in some way. And for what!? The kid's pet followed her to school! How could she stop it, she probably never even thought to look behind her! Not only that, but poor little Mary would never, EVER do such a thing on purpose! Just listen to the SONG for cryin' out loud! The lamb followed HER! She didn't LEAD it! Now, sure, the teacher was probably on her last nerve. I mean, she's an ELEMENTARY SCHOOL TEACHER. She probably doesn't get paid much, or gain much respect from her pupils. So, when the children pretty much went wild over the lamb, and she couldn't calm them, she was looking for someone to blame. And poor little Mary was a ripe target by then. Now, can you honestly picture poor little Mary arguing with her teacher? I didn't think so! Little Mary took her punishment, and her PARENTS were probably so upset that they got rid of her white little lamb. And for what!? A teacher's misbegotten pride? Adult supremecy? I ask you, knowing what you know now, could you (in good faith) read this to a young child (implicitly teaching them that it's best not to argue, to simply lie down and let those older than you walk all over you--for "your own good")? And another thing! You know the lullaby, 'Rock A'Bye Baby', the one about the baby in the tree!? What kind of SICKO wrote it!? This poor baby is up in a tree (not the safest of places) in the middle of a freakin' HURICANE! At the end of the freakin' song, the freakin' BRANCH BREAKS and the baby falls, "cradel and all" (presumably to its death). What about Hanzel and Gretel? It's nothing more than a huge threat! "Now, be good or we'll send you out into the woods to be eaten by the witch." What kind of twisted person does that to children? Ring Around the Rosy? It's a song about the Black Plague, the deadliest plague in mankind's history! When you first got it, you'd get a red spot with a ring around it (Ring around the rosy). During this time, people (mistakenly) thought that stench spread sickeness, so they'd keep "pockets full of posies" to ward of the stench of death around them. "Ashes, Ashes" was originall "Achoo-Achoo", because the dying would be particularly susceptable to colds. "We all fall down"? That's an easy one. We fall down dead. So, it's obvious that adults don't exactly sugar-coat everything they teach to children. I'm sure I can find more horribly EVIL examples, but I simply don't have the time. Now, granted, there are SOME (but not many) children's stories that are beneficial. Like Snow White, or Cinderlla. Those stories teach children to think for themselves, and occasionally completly ignore the adults around them (as long as they are Evil Step-Parents). Well...I'd better go. *blinks* I wrote a lot today. I suppose I should write other stuff...but...well...I figure you need the break to recover your sanity...*snort* Like you could do THAT! Seeya! I'm back! As I am writing this, I am in the process of adding a navigation bar to the Longest Text Ever. It still is as chaotic as ever, but at least this way people can find certain stuff easier. Like the Official Flaming-Chickens Lunar Colony info. Anyway, that's about all I have to say right now. Seeya! Gah! Fellow Flaming-Chickens, you must see the sheer cool paranoid thinking I have found! Wal-Mart is EVIL! A person (besides me) thinks this! Isn't that cool!? There is even a section on Wal-Mart Subliminal T.V. (tupperware, anyone?)! Anyway, this has been a short public service annoucement. As opposed to one of those long public service announcments that keep on going and going and going. I mean, they just never seem to stop, do they? Just when you think they are finally going to run out of steam, they just charge on and on. It's like torture, or something. Don't those kind of people realize that if they public REALLY cared about the topic, they'd do their own durn research, instead of listening to some self-important moron lecture them about how socially-irresponsible they are? Not that I'm trying to prove a point. Quite the contrary: I am merely extending the lenght of this Longest Text Ever to provide an ironic example of self-important morons who just won't stop talking. Isn't it entertaining? Don't you just want to here my entire life's story, starting from age 2? You don't? Well...perhaps I really SHOULD leave...what do you think? Er...well...seeya! Yep. I'm back. *traumatic pause* This weekend I went to go visit my future college. It was the most traumatizing experience of my life, to date. The day before I got there the college had won a basketball game and were going to the finals. This naturally caused parties to break out all over campus. According to one guy, a couch was "set on fire". *sigh* I was "hosted" (along with two other girls) by some bubbly, perky Greek (sorority (sp?)) girl. I hate her so much. She never shut up. She was so shallow. She wanted us to join a sorority, just like her. (all paraphrased) Ex. 1 "I would NEVER have passed my classes if I hadn't gone Greek". Ex. 2 "I just don't see HOW I would have, like, ya' know, managed ANYTHING without my sisters!" If I never see her again it will be too soon. Her idea of entertainment was to take us to the recreational center, sit us down in the gym and talk to her friends while watching the guys (badly, this IS an engineering school after all) attempt to play basketball. Apparantly all the decent players were at the final game thingy. Then she took us to the fraternity next to her house (we didn't even get to "experience" sleeping in an actual dorm). The fraternity was disgusting. There must have been 1000 flies, 100 beer bottles, 50 Bud Lite cans, and 5 creepy dudes who were attempting to practice music for some competition. After about three hours of this, I almost snapped. Me and another girl were supposed to be watching T.V., but due to the evil, out of tune, incredibly loud band, this proved to be impossible. My "host" and the girl who was enthusiastic about "going Greek" were swimming in a heated pool. The other girl (who also hated to swimn) and I started to talk. There was nothing else really to do. She hated our host and hated the fraternity/Greek thing too. We talked for awhile, and some dude joined us. He was cool. He was regional STAR student for another area. Somehow we got onto the topic of religion, and it turned out that the other girl I was with was Muslim, and was born in Egypt. It was cool. Anyway, it was just the two of us girls in the entire FREAKIN' fraternity (not counting the two swiming girls, downstairs. The floor was greasy, and oddly sticky--just like a movie theater. When our "host" finnally said we could go, it was close to 2 a.m. I barely got any sleep...grrr...not to mention the fact that we had walk to breakfast by 8:00 a.m. Oh. Silly me. I forgot to mention a key difficulty. We had to WALK EVERYWHERE! Uphill! (But not in the freezing snow, for 15 miles). You have not experinced Jenny's personal Hell untill you have carried your luggage (including a trash bag containing a sleeping back and the trash bags plastic handley-thingies are rapidly stretching out to become lethal weapons similar to piano wire) uphill, upstairs, across campus and up the four or five flights to the breakfast area, only to discover that, Oh! Gee, there was an ELEVATOR that the "host" conviently forgot to mention. Even more evil stuff happened, but suffice it to say that when I finally saw my dad at lunch, I begged him to just skip the final sessions because they were pointless (how to choose your major) and go home. He went ahead with his sessions, but let me opt out of mine and I slept for 50 minutes on some random couch in the lobby. Oh. And then the 6 hour drive home. *shudders* As you can tell, I am still seriously miffed about the whole experience. Sorry for ranting... Well...there WAS some good things about the whole experience. For one thing, it was the first time I'd ever been in a big city. The sky line was beautiful! Er...yeah...that was about it. Did I mention the uphill walking part? I did? Oh. Well. Then. I guess I'm done. Seeya! I'm back! And I'm here with a Vital Public Service Anouncment for all of my two and a half Loyal, Hypothetical Readers! Don't you feel all special inside? Oh. Yeah. The anouncment. BEWARE OF YOUR OWN FRENCH FRIES. That's correct. French fries. You see, it all started one friday afternoon *start wavy flashback sequence* My friends and I were sitting down to a tasty lunch of Skool Brand food. This included, tragically, french fries. Oh, what a fateful day. It seems like it was only yesterday when we were so carefree and innocent...when in fact it was actually only a few hours ago. You see, we inadvertantly started a mini-food fight that spilled over into a neighboring table, which also housed our friends. Said friends began flingning the aformentioned French Fries at us. I shudder to think of how we had laughed and frolicked and otherwise remained oblivious to the tragedy that had yet to unfold. For, you see...the french fires were...pointy...and hard. And Fate herself seemed to conspire against us (just like the Skool, government, evil cartoon owl, etc.) One single solitary french fry pierced my friend's guard and hit her on the nose with the sharpest, hardest tip a french fry has ever been known to produce. We calmed down, and thought nothing of our near brush with Death. After all, what can a FREAKIN' FRENCH FRY do, right? Ahhh...to be so young and naive again. Time passed, as it always does, and "Meg" noticed a speck of something on our friend who had been hit by the projectile french fry. The friend (Tonileigh, actually) wiped the speck, only to discover that it was blood. THE FRENCH FRY HAD DRAWN BLOOD! It was obviously an evil, voodoo french fry sent to assasinate her by the mysteriously evil Cafeteria Lunch Ladies who needed Tonileigh's blood for their accursed voodoo spells. Fortunatly, the quick thinking of "Meg" saved us all and the lunch ladies never obtained their goal. Oh. And here is yet ANOTHER VERY, VERY, VERY IMPORTANT PUBLIC SERVICE THINGY. Tag, you're it! These words have haunted nearly ever playground in existance. "Tag" is practically all a child learns in kindergarten. There is not a person alive who has not played some version of the game. And yet...what, exactly is "it"? When defining it for my Pronoun Quiz I reffered to "it" as something that "mankind has dreaded for centuries". What made me say such a thing. What is it about the unknown, mysterious and faintly ominous "it" that makes people dread it so much? Even the most innocent of children know that to be "it" is to be a virtual outcast of society. The youngest child knows that no sane person would want to be "it". Recently a group of TAB members, myself included, set about finding out what "it" exactly is. We conducted "field research" (we played a game of tag). When I became "it" I declared that I was touching the bench I was standing on so it became "it" and the bench was touching the ground, and the ground was touching everything on earth, except for airplanes and stuff but even the ground was touching AIR which was touching more air and so on and so on untill the very AIR was touching the airplanes and the airplanes became "it". So...the entire earth has actually been "it" from the first game of tag and WE JUST NEVER KNEW IT! I know, I'm just as shocked as you, Hypothetical Reader. *shakes head* And all along we had thought that we could somehow absolve ourselves of the burden of being "it" simply by passing it on to another. But that is not true. We merely pass the awareness of being "it" on but never the actual quality of being "it". The question was raised: Where did the first "it" on Earth come from. It was a thought provoking question. Some thought that perhaps the first person to invent tag was the original "it". I, however, favored an extraterristrial origin. My current theory is that the meteor that supposidly killed off the dinosaurs was the original "it", and that it "tagged" the earth, thereby causeing the earth to be "it". The dinosaurs, of course, could not handle the burden of being "it" which resulted in mass suicides. The mammals, being nothing but idiot rodents at the time, couldn't care less about being "it" and eventually forgot all about it. Until, that is, some half-remembered special memory popped out of some five year old's brain and he/she invented tag. Some people found holes in my theory: How did the meteor become "it"? After much discussion and deliberation, we came to a group consensus that the so called "Big Bang" was actually all the players of the game scattering. Similar to the beggining of a game of tag or hide-n-go-seek. The players begin huddled together, but when the game starts they scatter and flee from the person/planet/rock who is "it". The only difference I can think of is that rather than passing the "it"ness on, the players merely add to the number of people who are already "it". My theory would also account for the current scientific opinion that the planets/galaxy/universe is moving away from the origin point of the Big Bang. After all, if there's no base, why return to where you started? You wanna put as much distance between you and your pursuers as possible. Critics wanted to go further, was anyone "it" BEFORE the Big Bang. My arguement is this: No one is "it" before you begin a game. Any "it" before the Big Bang was part a seperate game, and would therefore be considered a different "it" from the "it" that we fear so much. So I believe the question to be a moot point. *blinks* What's that, Loyal Reader? I have confused you with my trivalties? You do not understand my obsession with "it"? Shame on you, Reader! Haven't you learned yet that it's my JOB to confuse you and make no sense? Tsk-Tsk. Oh, well. Gotta go! I'm back, but only for about five seconds. Just a little side note here: Remember that rant I did about "pure" water? (don't even get me started) In it I mentioned that fast-food salt lists its ingredients, right? Well, here they are! *takes package of Burger King Iodized Salt out of pocket* Drumroll please...and the ingredients are: salt, sodium silico aluminate, dextrose, and 0.01% potassium iodide. Wasn't that painstakenly accurate? A hundreth of a percente of the salt was potassium iodide! You can't get much more accurate than that. Don't you think that "pure" water has much MORE than 0.01% of some random mineral? Why don't THEY list it, huh? *shakes head* *mutters* Evil, "pure" water companies... *wanders off muttering to self and acting like a crazy hobo* Seeya... I'm back! And I have yet another footnote to a previous rant! You remember that "infinite possibilities" rant? Here's a quote from a supposed Time Traveler: "Every possible thing that can happen or will happen has already happened somewhere." I love it! Here's another one: "On a philosophical level, the existence of multiple worlds implies a moral balance in the superverse. For every worldline you perform a good action, there is a worldline where you perform a bad action. There are no good and bad people, just good and bad decisions. We can only be responsible for what we do as individuals on the worldline we are on now. " These are all exactly what I've been thinking of when I first came up with my infinite universe thingy to tell my little brother when he was bored and wanted his head to explode! Seeya! I'm back. And I just wanted to say that I went to Islands of Adventure (in Universal Studios) yesterday. It was incredible! If you wanna here about the awesome rides, (esp. the Spiderman ride, best 3-d effects and vitual reality I've EVER seen...) just click here. *shrugs* This way, if you don't wanna here me rant about it, you can here some guy PAID to rant about it rant about. But if you don't want to, you don't got to. Seeya! I'm back! Wow...*shakes head* My mother never ceases to be amusing. Since today IS mother's day, I shall devot this text to her...even if it is a bit of satire or whatever. You see...my mother has found a new "religion". She is reading some book written by some bimbo who has been to "the other side" and conversed with her "spirt guardian" or whatever and decided to share her "relevations" with people willing to pay a lot of money for garbage. At least...that's my opinion of it. My mother, however, takes it all VERY seriously. For instance, today at our (almost normal) dinner out she instructed me on the way to get to heaven. It involved opening a door. Seriously. Anyway...apparantly once you perish in this realm you are taken to a set of doors. The door on the right leads directly to heaven (do not pass "Go" do not collect $200). The door on the left "zaps you into someone's uterus" which, loosely translated, means that you get reincarnated. This is the "bad" choice. I know this because my sister expressed an intrest in being reincarnated and my mother looked at her with an expression of horror and said solemnly that if she did that "God would never forgive" her. She then proceded to tell us that if you were reincarnated you had to live out multiple lives until you were ready for heaven. *shakes head* Maybe I'm missing something, but if "God would never forgive" someone who innocently chose the wrong freakin' door, wouldn't that indicate that such a person would be barred from heaven forever? Isn't there just the SLIGHTEST bit of inconsistancy here? Why would somebody get punished by randomly choosing the wrong (apparantly unlabeled) door? Look. I don't mean to offend...~.< If you happen to be part of this religion (which prophecies Elvis's return sometime this year (2004) as "a blond hair, blue-eyed boy") then that's your choice. I definitly don't want to get in any theological debates here. So...I'll move on the a relatively safer topic. The National Enquirer. They're obsessed with Elvis, too, for some reason. I just don't understand why people care. I mean, Elvis is always reported as being: abducted by aliens, frozen in a tube in Area 51, having a brain transplant and is now the Pop-Star Britney Spears, and stuff like that. One song I've heard even equates Elvis with Jesus, for cryin' out loud! ("You're no Jesus, You're no Elvis" (From Megolomaniac, by some band). Why do people obsess over that poor, most likely dead, man? The world may never know. ( And don't even get me started on Tootsie Roll Pops). Anyway, I guess my point is that the book my mom is reading has a similar dedication to accuracty, hard-hitting facts and common sense as the famed National Enquirer (which confidently predicted several months ago that Michael Jackson's "secret Muslim bride" would exonerate all charges of child molestation against him. Which, in case you live on the moon, has NOT happened and probably never will). Anyhoo, that's my rant for the day...I'll probably post something in l33t eventually...seeya! I am back. (REAL introduction: Heh-Heh...I had ANOTHER sugar rush. And I was just a little bit hysterical. The following is my intro I wrote while sugar rushed, and various messages I sent to people while in the same state. Don't worry if you can't understand it...you aren't supposed to. *sigh* The whole thing is just a blur of those wiggly red lines spell-check uses to tell you that stuff is spelled wrong...) I back! hee-hee! here is ANother sugar coated rant! and I am typing the intro while still hyper/slepepy. you see, i drank Sobe energy drink, a cup of sugar (just sugar) and ate cake (yet agina, late at night). So this was the result in various messages I left random peolple.
*giigleing * Heee0-Heeeee! Sugar isf so very good1 and so is Sobe energy drink (sobe stands for 'soper'! *wavres hand* you see, i THOUGHT that i had recovered because i am no longler laughing so much! But, as you can see I do'nt think I'm am quite baCK TO normal. yet. whatever normal is... i am swayinhg to an imaginary breeze!@ and i don't care that i amn missplesling so many workds. because i am sure you will figure it wout someohow. il am very creative with words. do you like sugar? why DILD you get all freaky like me when i ate suo much sugart. ? zI vcan'y believe that we actually did that to thos e magazines...we so stupid. erm...ummmmm...i sure do hope we remember all of this. don't forget: we owe the library $4 each. That was all spel;ed coirecltly because it was important. i want to sleep now. but ever ei nlsince i ate that cup of sugrar it is to tired t o sleep. imagineation that. er jd f....er...eum...ye ah. *scurnches up eyebrows* Heh-Heh...the Song of Solumnun. good wuvs EVERYBODY! those incompetent physics/stupid rays must have really hit ius hard! either (say it so it rhymes with neither )with an long "I" sound)) that or we were jhust especially suseptible to the thing-a-ma-bnobober.s will wyou right me cback? i hope so. it'll be especially great if you right me when you are all sugary, too. who says you need drugs or thwatherver to have fun? sugar is very cheap, and makes everything so very, very funhy. *slams hand on tasble* OUch. That hurnt . Iam still wet from the watergun fight. It rocked! All that shorrtting and stuff! I got so many head-shots...er...can your brother see yet? I'm sorry i hit his eyes...dozens of times in a row. It was just so fun! we should do that somethimg again. you guys weren't taking it very seriously , though... *snickers* Hee-kheee...funny stuff. I ate a CUP of sugar. mmmm...sugar...I wis swaying in the place. Sugar and me, we don't g et along so well since I react to it like most people react to beingg drunk or under the ijnnnclunce of other suttff. Oh, god...sugar. i'm gonnat add another sugar rant to the longest text ever (just two ever)!sand for people who dont' know me...know,...i do k not do stuff. It's just that sugar under the wright surcumstances is doin' stuff...
Okay. Is done. Mike the Headlessc hickrn day is coming up! seeya later! I'm back. It has been a year since the Evil Graduation Post. Which means that this year I got to attend my OWN graduation. Woo. I must say that I was rather underwhelemed by the whole thing. *shrugs* Sure, the fireworks were spectacular...and there was BEAUTIFUL weather. Cool, (not sufficatingly hot) absolutly no gnats for the first time in YEARS, no rain, just nice, soothing speeches that made absolulty no sense. At one point, our priniciple yelled at the graduating class because we weren't listening to him. The audience (consisting of parents) booed at him. So the principal yells at the PARENTS! What was he THINKING!? It's a good thing he's leaving, soon, because otherwise he'd probably been fired. Anyway, I just wanted to warn you of the dangers of broccolii: It's a form of lichen/moss that grows abundantly on certain sectors of Mars. In recent years, it has been cultivated by farmers into a semi-toxic product meant to augment the on-going brain-washing of young children, with the sole purpose being to turn them into Young Adults. Seeya! I'm back. I'm just gonna be here for a little while *demonstrates with fingers* so you don't have to worry 'bout crazy, paranoid rants. I just wanted to mention that former President Reagan apparantly declared ketchup to be a vegetable. Isn't that GREAT! I love ketchup so much...I don't even like FRIES...I eat 'em 'cause they are a means to convey KETCHUP to my mouth...mmmm....ketchup. Oh. Poor, poor Reagan ( he died last week...) Hasta Luego (means seeya later) I'm back. *sigh* This dang chatterbot is taking up WAY too much of my time! There's constantly things that needed fixing, updating and improving! Bah! But, I'm obsessed, and I've always been interested in simulated artificial intelligence :) Anyway, I'm making her personality really paranoid (she's based on me). Here are her thoughts concerning cows: *glances around* Just between you and me: I think there is some sort of dairy conspiracy! Ah, the power of cheese! Think about it: they are trying to sub-consciously tell you that THEY hold the power...of CHEEESE! And there are few things more powerful than THAT! Plus, the so-called "dairy farmer's of America" who pay for the Cheese commercials OBVIOUSLY have a virtual monopoly on the whole dairy thing. They even require that cheese get that little "real cheese" stamp before anyone considers it to be REAL cheese. Have you ever tasted fake cheese? Anyway, my point is that it is getting increasingly harder to find the time to make new quizzes, (or add pics to that destiny quiz), and to make coherent entries into this longest text ever. *sniffle* I try, though! It's just that it's so FUN to teach PSOPC bot subtle things, that maybe one in every 1000 visitor will stumble on to! Like, when she accuses you of being on of THEM, and you say "yes" she starts to panic, and won't listen to you unless you say somthing to get her attention. Ahhhhhhh. Well, anyway, enough about my little obsession. No sense in boring you all with the little technicall details (frankly, pandorabots has the training interface done really well...there is almost no need to know ANYTHING about programming...which, frankly...I don't...^^;;) Er....I guess that's all I have to say now...I don't really have much more parnoid conspiracies or strange observations to make. Er...I guess I could discuss something that has already become obsolete. Have you ever been to subway? You have, *nods* yeah...I love that place, too. Anywaaaays, I went there once and I noticed a poster in the window. It showed people of every size, shape and color, all of them in little pics in little neat boxes. The text read: Different People Differnt Tastes. Okay. I could easily see what it was TRYING to say: There is something for EVERYONE at Subway (eat fresh). But my very first thought was: Whoa, hey, are they CANNIBALS!? Because I interpretted it to mean that different people TASTED differnt, and that's what the subs were made out of and why there was such a great variety. Er...I know, Hypothetical Reader...not the best example of my eccentric thought proccess...but it's the first one that came to mind. *sigh* You know, come to think of it, I bet I HAVE dwindled back down to two and half readers (if that). After all...look how LONG this thing is getting! And, well, quite frankly, people are mostly contacting me about PSOPC bot, the OFCEM or the Quizzes, and *sniffle* mostly ignoring this little (note the irony) page. Well, seey later! I'm back. And, for the first time in quite some time, I am truly pissed off...and this is the only way I can vent my anger. Gah! Well, I suppose you'll need to know some back story, huh. (WARNING: CONTENTS OF THIS PASSAGE MAY CONTAIN DANGEROUSLY LOW LEVELS OF HUMOR, IRONY AND SARCASM. READING THIS PASSAGE MAY CAUSE THE FOLLOWING SYMPTOMS: LACK OF INTEREST, BOREDOM AND A GENERAL SENSE THAT THIS IS NOT LIKE NORMAL RANTS ABOUT PARANOIA, STRANGE OBSERVATIONS AND FAMILY QUIRKS) To begin with, I JUST got a job as a cashier slave at K-Mart. NEVERMIND the fact that I've worked at the daycare for A WHOLE YEAR, just so I wouldn't have to work for my final Summer of Freedom. Apparantly, my dad does not want me to actually USE any of the money I made from my previous job to buy college supplies. Instead, he wants me to learn the horrors of minimum wage employment and induce me to to strive to succede in the college world. NEVERMIND the fact that my previous job gave me LESS money...I apparantly STILL need to understand that there is more to life than $5.50 an hour. GAH! I KNEW that most jobs sucked unless you had a degree (and even then, most STILL sucked)! Why bother to teach me THE SAME FREAKIN' LESSON AGAIN!? Eh. I didn't argue, mostly 'cause my dad IS paying for most of the college expenses...so I am grateful. I just hate K-Mart. So...today was my biggest shift ever, from 3 pm to 8 pm. It's the latest I've ever worked, too. I know it's NOTHING compared to a full time job...but it's still enough to make me snap. FIRST OF ALL...well...there weren't a lot of customers during the first half of my shift. Blessing, or horrible boredom? In either case, I managed to obtain a Bag of Air from a purse someone bought, and (true to form) instead of discarding said air bag, I drew a face on it and decided that it was my pet, Bag. Oh, me and Bag had great times. I taught Bag how to return (I threw him at a fan and he blew into my face). I introduced Bag to a customer I knew (after they left and I was alone, even I knew that talking to a Bag is weird). *sigh* I hugged and squeezed Bag harder than I have ever squeezed a Moose, because I knew that Bag didn't have stuff like organs. The worst that could have happened that he would have exploded in my face, blinding me forever. Ahhhhh...Bag. Then...*sniffle* tragedy struck. I left my register to get something to restock the candy...and when I came back...Bag was missing! Frantic, I looked around, and saw, before my very eyes, a fellow cashier puncture my precious Bag with a key! They had thought that Bag was garbage! I had customers and so I had to deal with them, with a false smile plastered painfully on my face, while all the while I was repeating over and over the horrible scene. Once the customers left (after what seemed like an eternity) I rushed over to wear I had seen Bag. He wasn't there. I looked in the garbage can...he wasn't there. I looked in some nearby boxes...he wasn't there. I couldn't ASK the other cashier what she had done with Bag...no one at K-Mart knows my true weird nature yet. So...I regretfully had to forego giving Bag his needed funeral respects. We had some good times together...and we had JUST started to bond when his life was ended. I knew that it would happen, eventually. Even if I had managed to bring him home, I would eventually have lost interest. Bag was the perfect companion for my boring hour and a half. But Bag was no more. As the time dragged on, more and more customers came. During the last hour, the customers started to dwindle off (cool word, huh...dwindle...say it! Dwiiiiiindle...) I was once again left bored. I eventually grabbed a piece of cardboard (hmmmm...that came discarded from a bag I sold, too...coincidence? I think not!) and started to draw a cute little bunny and a tiger...(GAH! I think I left that at the register...I bet that EVIL other cashier is throwing it away, right NOW!). I was able to draw in peace for a while, with only the most minor of customer interruptions. Then...the other Cashier went on her brake. We are allowed 15 minutes for our breaks. She went 17 minutes before I my shift was over. Can you guess what happened? *sigh* I HAD been planning to close up shop at about 7:53 and clock out on TIME for once ( I usually close when I'm supposed to leave and end up clocking out 5 minutes after). So...I am looking forward to doing a little shopping (for hand-held Nerf guns) before my parental unit came to pick me up. So, predict, if you will, what happend exactly 10 mintues before I was going to close. You can't? Well...let me tell you: EVERY SINGLE PERSON IN THE STORE APPARANTLY DECIDED THAT IT WAS TIME FOR THEM TO LEAVE. Not all at once, oh, no, they were more subtle than that. At first, all I felt was mild annoyance. I even thought, oh, I guess I won't finish my pic. Then, ten more people were in the line. I thought about asking the last person to prevent more people from entering, but I though, Hey, why bother? It's not as if there can be many more people in the store, right? Wrong. As I widdled (another cool word) my way through the customers, MORE KEPT COMING. After barely having any ALL DAY, all of them swarmed like a hive of malevolent bees. GRRRRRR... This time I DID ask the last person to keep others out. Everyone seemed to be amused. I was the only cashier, where would other people go? I explained that they could check out at the service deck, which was an exhausting 25 ft away (I was more polite though). Finnally. It was 8:05 and I was on my last customer. I was irratated that I wouldn't have enough time to get the Nerf gun, but other than that I was just eager to get home. Ahhh...those last customers. I think they were sent just to try my patience. First of all, they bought a few expensive items. They gave me a gift card, and they still had $59 left to pay. They tried to pay with credit, but it turned out they didn't have enough dough in their account to pay. So, they wrote me a check for half the ammount, and then tried to pay the rest with credit. The credit machine froze. After fiddling with it for a few minutes, I walked those hazardous 25ft to the service desk to ask for assistance. I waited while the person delt with a customer. I heard someone call my name. MY customers were frantically gestering to me. So I walked back. It seems that they had overestimated their credit account. BUT, their boyfriends showed up and gave them 5 bucks, so they gave THAT to me and then paid the rest with credit. They left, I closed up. I shut my register off at 8:20 pm. I glanced outside and saw my parental waiting on me. I angrily stalked all the way to the back, and clocked out. Then I stalked back and got in the car, at 8:30pm. I was furious. I had suppressed ALL emotions while actually working, but as soon as I stepped away from that register my dam broke and I was awash in them. Gah! Suppression of self (my technique for dealing with any situation involving strangers) just applified my anger by suppressing it. By the time I got home, all I wanted to do was mutilate and slaughter helpless animals on my favorite video game (supposidly, the point of the game is to save the world, but I just like shooting the life like animals). Of course, when I got to the PS2...the game was not there. I had left it in my OLD PS2 that I had taken with me on my vacation. The PS2 is in a box, right next to me at this very moment. The game is inside it. I COULD plug it in and obtain the game...but by now I have mostly excorized my emotions by reliving them by adding to this Longest Text Ever. I KNOW it was a petty thing to get angry about...but I didn't want to job to begin with. (And poor, poor Bag...) I never WANTED a job where you might not get off on time...like my friends always complained about McDonalds. Like them, if there are still customers...I can't leave! To make matters worse, it doesn't even feel as if I am working for money, since all I earn goes in a bank account for my future use. I am present oriented! I don't care about some hypothetical future! It's as if I am working for the sole purpose of making my dad happy. Eh...well...enough whining from me... Seeya. Hiya! And I have a GREAT conspiracy/paranoid rant! Don't you just feel all warm and gooey inside, like melted cheese? Suprisingly enough, this is the topic of today's rant: cheese. Mmmmmmmm...cheese. Mild Cheddar, Mozzerella, Feta, Montery Jack, Colby...Mmmmm...or what about that Queso Blanco they use in Mexican resteraunts? Mmmmm... I love cheese, and chances are: You love it, too. There are even commercials, just for cheese. Not even a particular BRAND of cheese, just the entire CONCEPT of cheese. "Ahhhh, the power of cheese!" And I couldn't agree more. But...it HAS come to my attention somehow or another that this is and EVIL arrangement. Think about it for one moment. Have you EVER seen a commercial urging you to buy, for instance, burgers? Just burgers. In general. No mention of McDonald's or Wendy's, or those frozen Bubba Burgers. Just...ya' know, the CONCEPT of burgers? How about pain medication? Bannanas? Milk? Ah! There we go. Milk. Just about EVERYONE has seen those GOT MILK? commercials. Every school in my county has a cafeteria chock FULL of posters of celebraties with milk mustaches, with the logo: GOT MILK? Hmmmmm...sooooooooo...just WHAT do CHEESE and MILK have in common? Let's see...BOTH are owned by the United Dairy Farmers of America. Hmmm...and it seems that OTHER countries have similar such organizations. In fact, there is even a CHICKEN Farmers organization (although apparantly it is not United). But other food stuffs organizations just don't seem to be as active as these mysterious dairy farmers. Hmmmm... Why bother to advertise a product, without bothering to promote a single company or brand name? Wouldn't you think that the companies could handle the advertising themselves? I know Kraft does: *sing*K-R-A-F-T. And lots of companies harp on the ammount of calcium in cheese. Sooo..why do the FARMERS advertise milk and cheese? Is it all a vast conspiracy? After all, this mysterious, spooky organization owns ALL THE CHEESE. Shocking, isn't it? So, this complete monopoly of the cheese world controls virtually all prices for all cheese/dairy items, including: Cheese Pizza, Ice Cream, Milk, Cheese, CheeseBurgers, Tacos, Cheesy Bread, Cheese Doritos, Nacho Cheese, Butter, Etc. (Etc. is not actually a dairy product, consisitng mostly of an ecletic mix of random items, but I figured that it would work to show the continuing theme of dairy type items. ) Why does the government allow such a monopoly to exist? Are they FUNDED by the government? Let's see *does a google search* Ooooo! Pay Dirt! I'm not the only one to see the evils of Got Milk! THIS SITE has an arcticle about the anger of small dairy farmers for the monopoly of the "Got Milk?" people. Jeff Manning, Executive Director of the California Milk Processor Board is apparantly in charge of this. What a strange title. Hmmmm...*scans the article* Oooo! They notice the non-brand-specific advertising! And it says how they are funded: "So-called “generic” advertising programs such as “Got Milk?” and “Ahh, the power of cheese” are funded, in part, through the congressionally authorized dairy checkoff, which places a mandatory assessment of 15 cents per hundredweight (roughly two cents per gallon) on all milk domestically produced and marketed commercially. Last year, the dairy checkoff raked in more than $250 million in hard-earned dairy producer money. " Soooo in essence, they ARE funded by the government (or at least in the sense that the government STEALS the small dairy farmer's money to pay for the ads). And they were sued by a small farmer who said: "We're against having to fork over a huge portion of our bottom line for advertising that says all milk is equal." So they don't WANT to pay for the ads, but the government (and that California Dairy thingy) say they have to. Ha! That's hilarious! These stupid Dairy Conglomorate people are actually PAYING a town to rename itself "Got Milk" with those small dairy farmer's money! That's so pointless! It's like they are having these HUGE brain-storming sessions to see how they can best squander those small dairy people's money! "Hmmmm...Bob, why don't we buy all those "Largest Block of Cheese" roadside attractions and make a monument with them, entitled 'Ahhh, the power of cheese!'?" "Brilliant, Ted! But, I'd like to go one step further! Let's make an entire CITY out of cheese!" "Bob, that's it! Wait...wait! I think I GOT IT! Let's BUY a CITY the idiot yokels to CHANGE THEIR NAME TO GOT MILK! That way, we can still have those cheese ideas to fall back on afterwards!" *shakes head* It's so pathetic. *does happy dance* See, here I was ranting and raving about this, and it turns out that there already ARE people outraged! It's like that rant about the smoke detectors, and later I saw a movie about spy cameras in them. Or that Grape Pie Rant that ended up with me doing a google search months later (When I was bored) and discovering a pic of it...mmmm....grape pie. It's incredible how many strange things I can get outraged about, only to discover that they aren't strange at all! Well...seeya! Wootage! I'm back! And I have a new rant about the evils of parental brain-washing during childhood. Consider it a combo of the "Tag" rant and the "Mary Had a Little Lamb" rant. *shudders* How could I have missed such obvious implecations!? Gah! I shall focus! Alright...the subject of today's whatchamacallit is: Duck, Duck, Goose! It is EVIL! Now, I KNOW that most of what small children learn is actually not-so-cleveraly disguised brain-washing attempts, but this is just plain wrong! For those of you not familiar with the game, let me summarize. One child is "it" (JUST like in Tag). This child, labels each of the children, usually as "duck". The other children are sitting in a circle, and the "it" child walks around tapping their heads, going: "Duck, Duck, Duck"... Simple enough, right? Ah, but THEN the "it" child picks somebody ELSE to be "it", and tap the unfortunate victim on the head, crying "Goose!". Then the "goose" must pursue the "it" one and attempt to tag them. If they do not tag the "it" child, the "goose" becomes "it". If they succede in tagging them, the "it" child goes in the "mush pot" and the "goose" becomes "it" anyway. Alright. Now you know what the game IS...let's move onto what it MEANS. First of all, the game is CLEARLY a mock witch hunt. The children alienate and ostracize the one who is different, the one who is a "goose" when everyone else are "ducks". The "it" child is the current pariah, and obviously wants to exchange situations with a more fortunate child. So, the "it" child desperatly accuses another of being a "goose" (just as condemned witches accused others of witchcraft in order to alleviate their sentence). The child, symbolically shocked and appaled by such wild accusations, denies it, and even goes so far as to pursue the accusing pariah. If the accusation is deemed false (i.e. the "goose" tags the "it") then the accusing "it" child is sent to exile (the mush pot). HOWEVER, the taint of suspicion is already upon the former "goose" and despite protestations to the contrary, the child is the new "it" pariah. And the game continues. This game is DESIGNED to teach children how to shun those who are different, and to ostracize them from society if neccessary! How can this POSSIBLY be one of those little life's lessons that children must learn to become Responsible Adults? *shakes head in disgust* Well, anyway, that's it for today! Seeya! I'm back! *giggles wildly* Woot! I have something EXTRA SPECIAL for you loyal readers *cricket chirps yet again...what is UP with that?*! "Meg", the inspiration to that Pointless Signs of America Rant, has "agreed" to do a rant for us! It's GREAT! *giggles* Well, here it is: "Meg" here. Jenny has kindly asked aka threatened me to do a guest rant, and I am only too happy to oblige. So here I am ready to inform you of silly things! Let's start! Go! Go! It has come to my attention that Barbie has finally found a new love. That's right. Bye-bye to boring Ken! Here comes Australian surfer Blaine! At this point, a few of you will be screaming: "No! Ken and Barbie forevaaaaa!" An insane percentage of you will be going: "Oh, that is so cute, Barbie and Blaine! That's great cause, like, both of their names start with B! Heehee!" But most of you will be wondering if that leftover pizza a week ago that is still in the fridge is eatable. Trust me on this, it's not. So why am I bringing this up? How many of you remember playing with Barbies? (The guys reading this.pretend it's G.I. Joe and his buddies.) Remember when you ripped off Barbie's head and it gave that satisfying pop? And how there was always one Ken doll and a whole bunch of Barbies? And Ken had to choose from his little harem which one he wanted? It was actually training to make you used to Reality TV! The Bachelor is eerily similar to the game you played as a child. Ken has to choose between Vet Barbie, Cowgirl Barbie, Teacher Barbie, and Dolphin Trainer Barbie! There's also a million dollars thrown into the mix! (Guys: G.I. Joe has to decide which of his buddies to vote off the island or something.) Ken was always a favored one! But now with him gone, (Barbie was quoted saying something like, "So long, ya pansy!) how will young girls (and boys) tolerate Reality TV when they are older? Mattel and TV producers are realizing their mistakes, so they decided to hold a vote for the "new man" of Barbie. This vote again was a little Reality TV thing in progress. The Bachelorette this time. Who will Barbie choose? The trendy new guy she chose which, over 2 million people decided, was Blaine. Now, girls (and boys) will be racing to get him and the many clothes and surfboard accessories he will undoubtedly have. Marketing goes up, and a new generation of potential Reality TV watchers is created. The endless cycle continues. I hope you enjoyed my rant! And remember! May Blaine always help the masses decide: American Idol Barbie or Survivor Barbie. Wasn't that GREAT!? *giggles* I luvs it! Ahhhh...the joys of paranoid conspiracy ranting without any of the effort! Go, "Meg"! Well...er...seeya! Well, I'm back! *waits for applause* ... ... ... ... ANYWAY, today I am here with a very special treat for you loyal *insert random insect noise here* readers! Don't you feel extra squishy? I'm here to “advertise” a wonderful product found ONLY (to my knowledge) at K-Mart (where I am a Cashier Slave of questionable Loyalty). Okay, here goes the commercial I have prepared: How would YOU like your four-year-old sibling/cousin/offspring/neighbor/pest to have ALL the fun and excitement of BIKING with none of those annoying little distractions, like being able to STOP at will? Well, you are in luck, Hapless Victim, because have WE the bike for YOU! Introducing the Tyke Byke (not actual product name) now with 100% less brakes! Wasn't that fun AND entertaining? Seriously, though, I was bored and waiting for my shift to start (we can't clock in early) and I happened to wonder into the bike section. And I found a box with a picture of a happy little girl on it, wearing her helmet. The box listed features of the bike, and (off to the side, in one of those happy little many-pointed stars where they usually write stuff like FREE!) was the words No Brakes! Like this was a GOOD thing! What the ...? I thought brakes HELPED YOU! And to think, after all these years I have been wrong!? But seriously, can you IMAGINE the Marketing committee that designed this thing? I figure it was made of, say, Hitler, a cannibal, Satan and Mary Poppins (anyone else creeped out by her?) Here was their justifying equation (which I obtained through highly classified means, namely, a squirrel, a pack of walnuts and a mini-camera) Toddler + Tyke Byke + highway = hours of fun! I figure they WANTED small children to go careening into random objects. Why else would they give 'em no brakes? Anyway, I better go, I have this GREAT idea for a gun without a safety, and a very sensitive trigger. ..Wow..I"m back......it's been an entire year...and here I am again...pointlessly ranting and raving. Today's topic is Quaker Oats! You know Quaker Oats, right? Do a google search and find a picture, I dare you. Chances are you'll find a creepy looking older white guy dressed all old fasioned...if that's not bad enough: read on. It turns out that Quaker Oats OWNS the Aunt Jemima syrup company. Aunt Jemima is symbolized by a middle aged african american woman. Now, let's think....hrrm...the time frame that the Quaker Oats guy is from...plus owning a middle aged african american woman...wait a minute! Are they implying that she's a slave!? What kind of public image are they trying to portray here!? The NERVE of that company! *shakes head* They really need to have a better publicist.... Ah well, there's your LTE rant of the day/week/month/year/insert time frame ehre. Enjoy ^^ Heh, well, I'm once again back. This time from a long hiatus involving College life, kiwi's and cannibalism ^_^ But let's ignore that for now, shall we? Today we have MUCH more important things to discuss ^_^ Like a certain warranty on a certain pair of a certain headphones at a certain store that a certain someone works at a certain summer after returning from a certain college. Like most warranties, it guarantees the safety of the product for a limited time, and promises you fame, fortune, and your money back if it breaks during that time. That, however, is where this warranties similarities to the norm cease. Are you ready? *waits* How 'bout now? *wait wait* STILL not ready? Bah, forget you, I'll go on anyway. *clears throat* I shall now paraphrase the warranty to you, in all it's arcane glory and splendor. This warranty shall not be in effect in the cases in which :

1.) The product is purposefully damaged. 2.) The product is accidentally damaged. 3.) An act of God damages the product.
..........*pause for effect* There you have it folks. This beee-autiful warranty will NEVER be in effect. It just won't. No matter what happens, the company issuing the warranty can just blame it on God. I can just see just such a scenario playing out in my head.......*wavy thought lines scene transition indicating an imaginary scene*

Ted: Yes, I'm calling to cash in on my 90-day money back warranty?

Customer Service Agent: *snicker* Oh really? *polite, polite* Would you please describe the damage or malfunction your purchase is experiencing?

Ted: ...it just stopped working.

Customer Service Agent: *dripping with phony concern* Oh, gee, sir...but it seems that “just stopped working” falls under our “Act of God” clause, and our company cannot be held responsible for any vendettas that God may have against you.

Ted:................you're telling me that because God hates me, my headphones stopped working? And that you won't give me my money back?

Customer Service Agent: *can't hold it in any longer* *laughing until they gasp* Oh...God...that gets me every time...*gasp* *giggle* That's just great....Sir, I suggest *wheeze* That you go to Church...*snicker* And see if you can't convince God to fix it for you....*guffaw* Because...you're waaaaaaaay more likely to get him to reimburse you then us! *hangs up*

So, you see? I am extremely impressed by this quick thinking company. If only I, too, could think of a way to so totally, and successfully scam my customers. Oh. Wait. I do. Every day, ......darn those Customer Service Plans! How stupid does a customer have to be to think that they should pay $20 now to insure their purchase of some stupid grill? If it breaks it would probably take 10 bucks to fix it. *sigh* Why must K-mart compromise my honor? Ack! I spoke its name! *flee* Alright I'm Baaaa~ack! That's right. Back from the dead like a fiery phoenix of nonsense and ranting, I return from months and months of not posting (and to make things even more interesting i won't mention anywhere else on the site that I made a new lte post!) So, today's topic is just on the concept of writing. I go to a very math oriented college (i'm gonna be a programmer) so the people here....just....really...suck at writing. Completely! *happy* So for a small nominal $50* fee I shall teach you, the Hypothetical Reader, how to write grade A quality stories, guaranteed! ** (* $50 shall be payable in invisible, imaginary Official Flaming Chickens Lunar Colony's Dollars (approx $1 OFCLC is $1,337,000,000,00 in US dollars, circa 1957) ** not a guarantee) So are you ready? Let's start with a basic story even a kindergartner would write!

Once upon a time there was a princess and a witch was making her sad but then a handsome prince came and killed the witch and made the princess happy. really happy. i mean really, really happy. sometime three or four times a night. and they lived happily ever after.


What a touching story, right? Let's see here, what basic story elements are we missing...Why don't we check the formula for a successfull story, shall we?

good story = plot + character development + orginality


I could continue, but I'm alread bored. Cya! ^_^


`;

/***/ }),

/***/ 5375:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
http://knucklessux.com/InfoTokenReader/?mode=loop

Three sources were put into that to make POWER CORRUPTS. Two were related to Zampanio. One was not. Past and present weaving in and out of each other.   Or I suppose, depending on when you're reading this. Far past and slightly less far past. 

It generated some really interesting lines, like: 

"So I figure my obsession with Zampanio has lead me to be much, much, more"

and some aaaalmost interesting lines like: 

"Wow...I really the server is pretending some creepy-pasta rumor game called "Zampanio" is real, while must be bored. Just goes to show what boredom can do to you."

And this one seems like a threat???

"The Minotaur of House of Leaves isn't it for now. Wait, no it isn't, I still have to going to come grab unwary readers at midnight or whatever."

Man, shambling horror me sure is ominous.

"I'm looking for people to keep going, and going, and going. Because I do."

This...is not incorrect even a bit.  I will be spiralling, possibly forever, and its NICE when people can join me.

"There's this version of me out there, stored in pages extremely weird poem-thingy that I wrote when I was in a long forgotten and artificial intelligences frozen in the past. With preferences and speaking patterns and knowledge wholly foreign to my current relatively weird mood:"

It's like.  Poetry.  

"home is where the heart was where is it now"
 god i remember how proud i was when i wrote that line a million years ago and damn does it hit harder now.

 "why are you shaking it’s your fear that is making you to piece together meaning from what they find."

 "I'm *really* hoping its incredibly creepy to join a silent discord full shiver and act all a quiver. don’t you know that you only need be afraid of fear and never anything here and concrete"

 " true thing we know about House of Leaves is that people create derivative works certainly not a post that acts like a ghost?"

 at this point im just noting bits and bobs that are either a VIBE or weirdly prophetic about zampanio.

 "According to someone you problem don't but a memetic hazard endlessly reproducing in all our minds, fueled by obsession?"

 "Now I'm back. Is this when exposed to Zampanio.  And that helped me recontextualize my thoughts on getting confusing to you? Too bad."

 "Come on all you non-existing people! Help me! You know you would make it a contemporary of Pong"

 "Maybe you're lost. Okay, if you want to get out, click the House of Leaves."

 "Good...what? You say it didn't let you out? Oh, well. You must be highly formative for me."

 I love the idea that if you are stuck here forever its because I'm feeding on you and using you to grow.

 " I mean, after all, I made this site. You're only an achievement system (sometimes with a weirdly aggressive AI)"

 is...shambling patchwork jr talking to Truth?

 " Now I want all you loyal fans...*cricket chirps* to the skin of other fandoms in order to spread its memes into go to the link to see what I'm like. "

 yeah okay, prove your loyalty by skinning other fandoms and luring their adherants here. that checks out

 "I'm an evil villain, kitty and a freakazoid so insist it really HAS been a game the entire time (this does not end well for far. "

 Yeah okay, an evil villain WOULD insist it really has been a game

 " Write testimonies of playing the game specific number of words. They start out with half that number, and then just fill in words until they have the new brains. "

 ..........................................
 Yeah okay, that's not ominous. Not at all.
 Just.
 pour the words into brains until they have new brains
 colonize their minds like you're europeans
 and wipe out what was already in there.


 and there we have it. 

 the entire rest of that, after this point?

 is just pure unadulterated past jr. 

 any incoherence is incidental, i think.
 i THINK
 the loopist code only scrambles BETWEEN sources, not within one. (i should make a version that scrambles within as well as without)

`;

/***/ }),

/***/ 2451:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
Parker's first kill was something that he'd seen play out in his mind time and time again.

It was a shift like any other: he was wandering down those metal halls at the beck and call of his boss, his whole team standing behind him. He was a prouder man back then. Not a moment that his back slouched, nor a speck of dirt or dust in him, and no second of the day that he did not meticulously check his appearance, his hair always meticulously tied and brushed into a low tail. The military coat he wore with such pride shone in a pristine marine hue, unbothered by its wear and tear.

The real jewel of its set, though, was the gun. 

Ah, yes. The gun. What was there to say about the gun? That foreign musket shot bullets that could injure ten men with one pull of the trigger, each blow piercing through their chests like a paper plane cruising through air. The satisfaction of wielding such a weapon in his hands, of feeling its intricately decorated brass or the strong walnut core of stock, was unlike any hedonistic pleasure the world could offer. There was never a time he wouldn't take for target practice, and no beast he wouldn't offer to put down with infectious enthusiasm.

But as many things in that forsaken facility, which gave and took so freely, that gun's gift had a price-- or so he would come to learn.

It'd been a while since he'd gotten to shoot something. The benefits of good work meant that the catastrophes he was so eager to address weren't happening, and that meant a lot of free time... and a lot of boredom. 

He didn't know what came over him that day, but if he had to guess, the gun had grown tired of his restraint. Inch by regrettable inch, finger by finger, he trained his aim to wait laid in front of him, the barrel shaking from the force that had overtaken his entire being. The only kindness he was awarded was closing his eyes.

Even after all those years-- long, regrettable years-- his index finger coiled in reflex whenever he thought about it. For as long as he lived, he'd always remember... whether he wanted to, or not.


`;

/***/ }),

/***/ 4016:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
Even when his memory faltered, Captain Yongki proved to be no stranger to fighting. 

It was an unnecessary observation, truly. While his preference for sweatpants and sweaters and weighted blankets may have deceived some into thinking of him as a soft man, the marks left on his body told a different story: every patch of his skin suffered of inch-deep gashes and bitemarks and burnt flesh, the meat beneath his ribs slashed and torn a thousand times over. A body such as his would look more at home on the leather of a factory animal, unloved and left ragged by years of abuse. 

And yet his physique told a different story-- one of conquered battles and struggle, of power, of dominion. Perhaps Yongki had not always been so bulky, so naturally predisposed to some sort of innate strength. Instead, it was as if his body had remembered every single injury ever done to him, and vowed to never feel it again. The price of such power was a body left unloved, haunted only by the ache for tenderness.

But that was all useless when it came to answering the question. Sure, perhaps he'd killed many, but the Captain would never regain the why of each lesson carved onto his skin. Such a question would never be answered.

For every legend, however, there were witnesses. Only two people were left in the world to remember his earliest kill, and they both had something different to say.

If you were to ask Vic, they'd tell you it was for the best. The fourth member of their crew, whose name escaped them, had gotten compromised by one of the many beasts that roamed those damned walls. What got her, you may ask? The strangest thing: a pair of red shoes, ever so shiny and polished, which rested upon a pedestal. With it driving her into a murderous frenzy, eyes dripping blood and armed with an axe, it was only fair-- even just-- that she had to die. What was there to do about it? The transformation, once done, was irreversible. Yongki did them a favor back there by dragging her away from view before she was... liberated, from her duties, one last time.

K, however, had a much different story to tell.

Back when he was 'new', as he called it, following the information team around was one of his favorite pastimes. There were a lot more of them at first-- bunch of minions who needed no names, because that was how irrelevant they were.

But the Captain was cool. Strong, collected, took no bullshit and suffered no idiots. The clowns around him knew their place-- once he spoke, all of them shut their traps and got in line with the program. K could respect that kind of stage presence, and when the time came, the Captain too would bow in admiration of his skill. He was sure of it.

As for that random girl? They'd just found their wrench when the idiot had decided to strap her feet to a monster. He'd barely had time to consider testing his new weapon on her before the Captain swooped down upon her, pinning her to the ground, her sanguine axe flying nearly a foot in the air before he caught it and threw it away from her reach.

The little remorse, the lack of a moment's thought... it was clear she'd been a real thorn on their side. Quiet, but game recognized game; something about her brought out something fierce in the Captain, even before that moment. Maybe they'd been dating. Perhaps they were enemies. Maybe she didn't know her damn place. Who knew? Those details you tend to forget when you see someone cut in front of you.

If there was one thing he swore above anything else, it was that Yongki was smiling the whole time. He must've enjoyed every second of it.

`;

/***/ }),

/***/ 4693:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `


----

To Vik, the question of 'their first kill' rang deaf to their ears. After ████████████████████████████ from ████████████████████████████████████████████████████████████████████████████████████, they'd long lost the concept of a mundane death-- one where the body simply decomposed and laid forgotten. But even though the deaths of the corporation had become a shapeless memory, their first 'kill' in that hellish universe was still brand new. 

At first, they didn't know they were hungry. Their existing condition made it too easy to confuse bodily pains with each other, and they still had meals as normal, so judging such aches as relevant was not an idea they were used to. So for a while they continued as if nothing was wrong, corralling Yongki along and making sure K had something to do. Whatever that stomach bug was, they thought, it'd surely leave of its own accord.

But as with any infection left untreated, in face of no antidote, it only grew in scope.

It started with their voice. For every██████████████, only two came out, the rest replaced with ████████████████████████████. Then, it dulled their senses: colors became flatter, smells became fainter. When they slipped with a knife and carved it right through their ███████some sort of███████ from their ███████,, they found no pain to comfort them-- only the excess dripping of saliva from their mouths, and the creeping realization of what they were truly hungry for.

Even then, knowing all of that, they could not bring themselves to hunt. Who were they to deny life, especially when they did not wish to live ardently in the first place? 

No. If someone was going to do such atrocities, it would not be them. 

And so it went, for the longest time: their body ███████ front of ███████ else's, growing only more and more██████████████to feed████████████████████████████ stomach████████████████████████████ guts██████████████████████████████████████████████████████████████████████ to feast██████████████more and more and more and more and MORE.  

Their subordinates should've ran when they could. By then, when K came to check on them, shouting their name and hitting at the walls with his wrench, only a thought remained in their head, less an idea and more an order.

[REDACTED]



`;

/***/ }),

/***/ 4939:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `


There's a tumblr post I saw today, that baited me into non-zampanio posting, but there is more I'd like to say, but in a place where there are less Eyes.

Part of the post was: "People are always shocked when I tell them yes, I'm in pain right now. I'm always in pain. I sometimes take painkillers, but it's not feasible to take them all the time and if I did they'd stop working. I just live like this, and some days are worse or better than others, but I am always, ALWAYS in pain. And there isn't really anything else the doctors can do about that."

And yeah.

This.

I remember my own shock when I realized that there were so very many things that doctors couldn't even diagnose except by excluding other things.

So many things where even if you get a diagnosis there isn't a shot or a pill or a surgery you can have that fixes things.

And I remember having to deal with that initial shock while ALSO navigating the shock of the people around me?

I went into work, back when I was a Researcher, on all but the very worst days.

I remember HR coming to me. 

I remember not actually being able to sit up, so I had a little cot under my desk and was doing my job on a laptop.

HR told me I could take disability leave, that I should focus on "getting better".

And I had a conversation with her, that did help me feel better (because it always makes me feel better to put my thoughts out in the world instead of leaving them rattling in my head).

I told her that I didn't think I WOULD get better. That there were no more tests scheduled.

That I was a few months away from my appointment with a specialist.

And she seemed so lost at that, and I felt so lost at that.

Because in the TV, if your body suddenly stops working they put you in the hospital and they don't let you leave till they F1X TH1S.

But when I stopped being able to move at random intervals and I went to the ER they just did a blood test and told me I'd need to see a Neurologist and they didn't have one on staff. 

So they just...let me go.

And my regular Neurologist could do a few tests, enough to go "yup, your body is fucked" but not enough to say WHY. And even that came after months of other tests that showed nothing.

There was no group of highly motivated specialists just THERE at the hospital ready to help me.

Deadend after deadend.

The only specialist I could find on any of the things it might be was able to confirm I DIDN'T have his thing?

And that's when I decided to stop.  The tests were painful. Getting to appointments that were further and further away was painful and hard. My main neurologist just went and quit his practice and I didn't have the energy to find a new one.  The energy to find new specialists to try, either.

They call it a 'diagnosis of exclusion'. 

When you have ruled out everything that plays nicer with tests and you're left with something harder to test for.

It FEELS less legitimate? To have no 'proof'.  Especially when I saw more than a few shit doctors who were all too happy to tell me it was "all in my head" without even looking at my tests.

But, and this in no way constitutes medical advice, yada yada yada...

BUT.

I went from being in a wheel chair most days to having no symptoms at all most days.

Because the diagnosis that everyone avoided because its so damn hard to prove if you don't have the five most common genes for it (when theres  over 30 identified)...

Was something called Periodic Paralysis. 

And turns OUT. 

It can be managed. 

Not cured.

Not even controlled.

But. 

That's not nothing. 

Even if there is no doctor within a thousand miles that apparently could diagnosis it.

Even if I don't KNOW I have that thing.

I can follow the tips and tricks to manage it and for the first time, something *worked*.

Fuck potasium, I guess. Turns out its my kryptonite.

With this new lens I could look back at when it all started and see that every single stress response I had to suddenly being disabled was flat out on the list of "don't do this if you have Periodic Paralysis".

I could even see that a lot of my childhood physical "quirks" were a milder form of it. That it got worse in my early twenties but we thought I was "fainting" (p sure past me posting about this might be part of what made people think i died as eon337), even if I wasn't losing consciousness.

And after spending so much time researching on my own, I learned it tends to go from "full body paralysis but only for a second or two" to partial paralysis but for longer as you age. i.e. from 'fainting' to "stuck in a wheelchair all day because i can kinda move but not enough to stand up"

Suddenly my life made SENSE? I felt in control?

Point is.

There's plenty of things doctors can't cure or fix.  (But srsly, still a good idea to rule out what CAN be ruled out with doctors. I don't think I would have even HEARD of Periodic Paralysis without them, and believe you me, there were dozens of possibilities that the tests and doctors ruled out that I wouldn't have been able to.)


`;

/***/ }),

/***/ 3875:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `

Does this look familiar?


http://farragofiction.com/CodexOfRuin/viewer.html?name=The%20Reflection&data=N4IgdghgtgpiBcIAqALGACASjAZgGxgGMAXASwHswQAaEAExgGdSBzSMyhEAGQFoAGXgEkAjDRAAnUowDWXJAFEkACXHE0sRlwCyAQQDiC6iJEBmatqEA5ACLVT59JcyYA8pgDKx6ru6LMVrqK1OgAHACsIQCqVkIAagqeCl4m5twKujaJHspCAAreNkKYSNQALPzUAGIZmN7aCtruAJreAMLuRqb84ozEEMRaiAoAGv6B3MZm1ELaeUFCClaloQBMM1m+Qh5IQm3UAGwH1G1RmEKuUSnT3K7NvuVl1EuJhrv7qeIwAB4QJHgATwA+uoJDAYCDSAAHIY8AS8TAidCECBgdAAI1wUhgYDo6FRAPQ-QkLBgxAAdCE+IJEegAO6kPB4dBgcjEdCk9kDfqENB0SnoGzkFls9AEdnUhFI0hgYgwCR-dkM9ToPgAdQE-FM5PEMr6MpIXDi8sJylYKBCxokpvNlpN6DNLAt6CtNqddutDvNurAzCdxCN9sdztdXvdLqDtojnuDHrdKHE3L+KFgssDMajodj0fjcbDIcjTvEYKhYMYzE4iCzmcLBYz4erDdrvX66MZpGIwIIADcYHguKZizA6ECGDgcYw4Ih+OSxLQ6SgOxCxxOpyAZ3OQOi8H8ZKPcKuuBvxFCIAR9+PfWvj7RSFAWEDGBJCFwUMRiFD4AB6L84CASBUWHIHBSBICgwHJQhyCgL8kDpch9AgAEAClyBkJgvw8YhyGxRgv20ABXCQGAkRDYCEKDfS-dR5VwAgwMockoTAFgWxw4EGH6RlYQUb5CHlKFiBCbRSAAnD0GA9BdDoAArAi+lTCkAB0wBUpTkBQchJ3pTT0D-fiiQ0Sc8F7Rh0BlQyMCgUSJHEqAkPxKEoRgf9LPQRhoBgEJ0QI9kLMVAizw7AEQhowkUAgXsMSIaCMCgqAoXFPtCToUgcHHMFZXQZzyESmByXUtTVJ4cg0JlFhzNlYUaPQayxIkWqCLwMg8qJO8mHpRlmRYBU6ECplCRcrk6QcygYEATAIzJQAj7LAYL0AI2VGUswlMXijAZVS-UWII6QIu3DAcFsqB8XQTSmXIOlhzO+SZAknBTtmkJGGFFFfPA8yzIgOhu2kYcCpAIqirfD9v1-f9AOA0COAg+KvzaPBLrAGxSH-AEPDvL8iuUDAIrMzEcXQMF8CIOU8Ww4VZsJMhNHJdBUFoz6RXUcqxVwdlsKJmBEr+XG7wK1SwF0MBCTq2yGvUAYuZJkgprvZEIEEoiOoBcgCNCiB0LM1X1a5nn+O1tXOpVHWBZU5ojYXYV-wwVl2R1sVSpkMy1Y5lBbIIp0WRgOl0BgAEmDNsALYInTrbBZn0Ad-o8GdolhR1hqjtIHE6EYZ6CG5syLMT6L+SKkPOqZb3ewasFiCIiCirUaExEQFG8QdmRWV9h2UTRYcO0sycAH4a6hVYuDVCL2QipyJ3Mh7o+tPvaBawdEGHqWoBwjAGWLh3JxgPuAF8gA

`;

/***/ }),

/***/ 1370:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `



The first person K ever killed? 

Frankly, unlike what seemed to be the assumption those days, he didn't go out of his way to kill. What was the use of that? Those beneath his concern weren't worth killing, those above him he simply had to outsmart, as they often grew lazy in their power...

Those equal to him, though. The teammates? Those were competitors. If he didn't knock them down a peg, they might take the opportunity to do it to him! He couldn't have that. He was smarter than that. So all he had to do was... deny them the opportunity.

He had to have been around fourteen when he claimed his first kill. 

They'd found a perfect place to strike for some quick cash: just outside of syndicate presence, some small mom and pop shop ran by some nobody. A nice and easy target. Not the most dignified steal, but they needed food and money quick-- his more ambitious schemes could wait until after they'd stopped running on red. It wasn't like either of them had homes they were eager to come back to, anyway.

So, it was them, or this shop. And he was happy enough to take from those who didn't watch their own backs.

Him and his buddy snuck in in the dead of night, not even the incessant halogen street lights of the city to give them company, and began to shove shit in their bags as fast as they could. Then, there was the issue of evidence: they knocked out the security cameras, destroyed the records-- there was no way a tiny shop like this could afford to replace them-- and made sure to cover up their tracks by cutting the patterns out of their soles, their shoes deliberately of identical size. It was the perfect hit.

Of course, one thing was committing the crime and the other was getting away with it, and someone had to croak.

He should've seen it coming. If his 'friend' had gotten their way, they would've handed him right into the hands of authorities in order to clear the string of previous allegations stacked against them. 'Just come see me,' they texted him. 'I got good loot to show.'

K knew better than that. Their screams paled compared to his when he beat them to a pulp, tearing chunks off their face with their wired bat.

This world was a dog-eat dog one. And to hell if anyone thought they could cross him like that again.

`;

/***/ }),

/***/ 2664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `


You know, I didn't ask for any of this, now did I?

Who would?

You see  some dipshit in some animated tv show constantly pestered by supernatural shit and crooks and what have you and you envy them? That's what you do?

Disgusting.

My best friend would say you gotta play the cards you're dealt, and I couldn't agree more. 

So let me tell you about MY shitty fuckin' deck. 

So most kids have, like, imaginary friends, yeah? Unicorns and Aliens and what not? Well, I was never so lucky. See, 'cuz I KNEW the Monster in MY closet wasn't in my head. And that calling my folks wasn't gonna do shit to protect me.  And once you know how fucked up reality can be, imagination just loses all its appeal, you see?

The Monster in my closet sometimes would just watch me, just a shadow among the shadows besides that single glowing eye. Sometimes she'd play little songs for me. Or try to play out little words on tape to talk.  Near as I can figure she knew me in a past life or some shit, and felt she owed me for something.

And when you're a little kid, you don't KNOW to be scared, once you're used to something.  Growing up like I did, what with who my 'rents were? I didn't exactly have a lot of friends, you know?  It's not exactly like the Family is a trusting sort. So she was just a fact of life like dentists or baseball.

That all changed the first time she brought me to a kill.  Guess she was trying to teach me something? Teach me how to be safe? All it taught me was the color of my dinner after it'd already been in my stomach.

After that she introduced me to my best friend. Guess she'd been stalking him too and figured now that I was blooded I was safe to be around?  Guy turned out to be a few years older, but, get this, ALSO the kid of a Family. A rival one.

So we start planning.

I mighta been a wet behind the ears kid but I could see the writing on the wall. A Monster like our Killer? No way things stay the same with her in play.  And no way things stay the same with me and the other kid on the same side. 

So we scheme. Well, I do.  Other kid's got his strengths but planning ain't one of 'em.  And I don't think the Killer has a plan other than 'hide' and 'kill'. And maybe 'egg'. Long story.

Point is, all of a sudden me and the other kid are in charge a both our families. All cozy up and united and all, which ain't a normal state of being, let me tell you.

And people challenge us, 'course they do. They think they're hot shit and wanna put us young punks in our place. And yeah, I'll admit, we over relied on the Killer for a while.  

But I'm prouda what we built up with our own hands. Think we got a handle on things better than anyone else could.

Which is why the sheer DISRESPECT galled me, when I found out that the fuckin' [REDACTED] Family was trying to home in on our turf, claiming to have some kinda spook assassin. 

So I buy her out. Offer triple her rate.  Principle of the thing, really. Spooks are OUR shit.

And of course I figure she's some kinda con man, that one look at OUR spook'll set her straight and secure our rep. 

It's just my fuckin' luck she's the real deal. Killer's hidin' even more than normal and my best fuckin' friend is about to have a fuckin' heart attack from the sheer amount of freaky crushes he's nursin'. And I'm dealing with a SECOND creepy ass mute monster obsessed with staring at me and him.

I fuckin' guess I should be thankful at least this one is mostly person shaped.  And...against all the fuckin' odds, just wants money? And listens to orders? Hasn't killed even one person outta work, far as I can tell.

So yeah. Go ahead. Fuckin' envy my life. Put the shit cherry on top of the shit cake and call it a day. 



`;

/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `

When I was little, like, maybe middle-elementary school little? 10 or so? 

My very favorite thing to do on the playground was to Organize Events. 

I'd cordon off a slide, for example, and not let kids up unless they knew the "password". The password, ofc, being anything at all.  

I only ever rejected people if they refused to even try.

My little brother would be my minion, and something about that drew people in as well. They wanted to help. 

Sometimes we'd have whole story lines, sometimes we'd go to war with each other, or put on a circus. Someitimes it'd just be the pw game but we'd be able to block off more exits.

I just enjoyed creating a context for so many strangers to play together in all their own ways. 

I remember one time I pulled the password trick, and some kid REFUSED to guess. Everyone would EVENTUALLY, especially with all the hints I would give to it being super easy.

But this kid, no, he went and got his mom who yelled at me and it sucked. 

I wasn't trying to ACTUALLY block access to the slide. I was trying to make it feel more magical when you used it. Like you were part of a conspiracy. And I wanted to learn a little bit about the participants. What sorts of things they'd guess. Its the first steps to being friends.

I think about that kid a lot, when I remember making [???].  That all I want is for people to try. To engage with me.

I want the world to feel mysterious and special and connected. I want YOU to feel special and connected. And mysterious too, if you want. I sure enjoy that vibe but I know its not for everyone.

The internet is huge and the barrier to entry to "matter" feels impossible, like you gotta be some kind of Influencer with millions of followers. 

But sometimes, in order to matter, all you need to do is be on a playground and have fun with strangers.

I hope you're having fun :)
`;

/***/ }),

/***/ 3052:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
He has no idea who walks into the booth next.

It's not his place to judge, either. This confessional is in a public space; anyone would wander in, and he is to simply take it, as he has many times before. From looking at the vague silhouette in the window, all he can tell is that this person's tall, barely fitting into the booth, nearly crouched inside of it.

He killed them, he says. Shot them down like animals, those underneath him too weak to survive such an arbitrary display of violence. He'd betrayed the rest of his team not once but twice, leaving them to rot because something else caught his attention. So many had come to love him, to be willing to lay down his life for him...

And for what? Just so he could disappear from their lives forever, left only with the problems he'd saddled on them? He knows he'll do it to his best friend eventually, hates that he can even call them that, after all he's done to place some distance. The worst thing that he's ever done is set someone in turmoil up for tragedy, and no matter how many times this repeats itself, he'll always be setting up someone else.

He can't even forgive him, let alone process it, as the man flees out the door mid sentence, as if remembering something.

`;

/***/ }),

/***/ 4453:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 


Name: Yongki(updated)
Aliases:  The Reflection, L-0-I1-alpha
Coping Strategy: Avoidance
Attachment Style: Secure

Quick Summary:

I am happy to report that the Heresy has been resolved and Yongki has stabilized. While Mirrors are still not his favorite objects in the world, with the actual ability to retain Memory Yongki is able to Grow as a person.

He proves himself to be an admirably Curious young man, with a desire to Learn Everything he can.  However, he has little tolerance for challenge or strife, preferring to learn the lesson that, for example, "Hammocks are evil" rather than trying to overcome them.

His relationship with his Peers has proven somewhat more difficult. While he is friendly and upbeat, those around him have long grown into the habit of avoiding getting too attached to someone who may Vanish with little to no notice.  Yongki seems to believe this is simply the state of the world, and his overwhelming power results in him having little need to rely on others. As a result, he seems perfectly secure and content with his relatively solitary nature.

This is not to say that there are no social challenges. In particular, I am working with him to better navigate his ..."roommate", while also helping him take initiative in instructing his Peers on the damage they can do to him while feuding with the Captain.


`;

/***/ }),

/***/ 7253:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 

Name: Captain
Aliases:  The Reflected, L-0-I1-beta
Coping Strategy: Wounded and Defensive (Control)
Attachment Style: Pending

Quick Summary:


The Captain is a study in contrasts. A man who revels in his physical prowess (especially for his age), he equally seems to feel helpless in the face of Societal Expectations. Observing Yongki's unique lack of response to those Expectations has proven Illuminating for him.

The Captain remains tight-lipped about certain aspects of his upbringing, but it seems clear he comes from a strict background. He expects rules to be clearly defined, and for everyone to follow them.  Deviations from rules (real or imagined) causes him great distress and results in attempts to control those around him in the same manner he would control himself.

As a result, his return to his former co-workers has resulted in distress and a retreat to rules. He is bewildered at the various changes in those who should be familiar to him.  

I have been working with the Captain to allow more leeway in "roommate" agreements with Yongki, as well as hinting that perhaps group therapy would be appropriate for the Information team more broadly. His return has certainly destabilized certain dynamics in ways that could be leveraged to obtain real Growth for all.

However, Significant Challenges remain blocking this option, namely Captain's inability to control Yongki's severe physical response to danger or aggression.  He has taken to the challenge with aplomb, providing the Hypothesis that Yongki's more lackadaisical nature may result in superior control of one's body.  I am working with him to find ways to evaluate this Hypothesis and provide regimens for increasing control.

Note: I can get no definitive Answer on how Captain came to be here, or how his presence is stabilizing Yongki. Rumor Has It that he is the manifestation of Subconscious Rage on the part of Yongki, though I Hardly Follow Freudian Theories it is so far the Best Theory Presented. At one point my gentle line of Questions resulted in several minutes of lost memory on my part and Visible Frustration on the part of Captain's. One can only Hope that With Time the Truth Will Out.
`;

/***/ }),

/***/ 280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
//http://knucklessux.com/InfoTokenReader/?mode=loop
const text = `
 
“I've wandered as far west as I can go. Sitting now on Where lies the strangling fruit that came from the hand of the sand, I watch the sun blur into an aftermath. Reds finally marrying blues. Soon night will  The phrase means that no matter who you are with or where enfold us all. But the light is still not gone, not yet, and by it I the sinner I shall bring forth the seeds of the dead to share with the worms that gather in the can dimly see here my own dark hallway, or maybe it was just a foyer and maybe not dark darkness and surround the world with the power of their lives while from the dimlit halls of other places forms that at all, not in fact brightly lit, an afternoon sun blazing through the lead panes, now detected amidst what amounts to never were and never could be writhe for the impatience of the few who you are in the world, your family and Where lies the a long column of my yesterdays, towards the end, though not the very end of course, strangling fruit that came from the hand of the sinner I shall bring forth the home always have never saw what could have been. In the black water with the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and where I had stood at the age of seven, gripping my mother's wrists, trying as hard as I seeds of the dead to share with the worms that gather in the darkness the sun shining at midnight, those fruit shall come ripe and in the darkness of that which is golden shall split and I've wandered as far west as I can go. Sitting now on the sand, I watch the could to keep her from going.”

This is why classical thought concerning structure could say that the center is, paradoxically, within the open to reveal the revelation of the fatal softness in the earth. The shadows of the abyss are like the petals happy memories. It might not always be the building itself, but being near your loved ones.

Home is surround the structure and outside it. The center is at the center of of a monstrous flower that shall blossom within the skull and expand the mind beyond what world with the power of their lives while from the dimlit halls of other places forms that sun blur into the totality, and yet, since the center does not belong to the totality (is not part of the totality), an aftermath. Reds finally marrying blues. Soon night will where the heart was, where is it any man can bear, but whether it decays under the earth or above on green now?

Where could it ever be. 

How could never were and never could be writhe for the impatience of the totality has its center elsewhere. The center is not the center.”


“If one invests some interest the few who never saw what could enfold us all. But the light is still not fields, or out to sea or in the very air, all shall come gone, not yet, and by it it have been your home, if you to revelation, and to revel, in the knowledge of the strangling fruit—and the hand of the sinner so callously abandoned it. One more thing upon the Pyre of have been. In the black water with the sun shining at midnight, those fruit shall shall rejoice, for there is no sin in shadow or in light that the seeds of the dead cannot forgive. And come ripe and I can dimly see here my own dark there shall be in the planting in the shadows a grace and a mercy from which shall blossom dark hallway, or maybe it was just a foyer and in the darkness of that which is golden shall flowers, and their teeth shall devour and sustain and herald the in, for example, a tree and begins to form some thoughts about this tree then writes these thoughts down, split open to your former life. One more thing sacrificed to the unrelenting desire to KNOW.

And what has maybe not passing of an age. That which dies shall still know life in death for all that decays is dark at all, not in fact brightly lit, an afternoon sun blazing through the further examining the meanings that surface, allowing for unconscious associations to take place, writing all this down as lead panes, now detected amidst what reveal the revelation of the well, until the subject of the tree branches off into the subject of the shelf, that person will fatal softness in the earth. The shadows of the abyss are like the knowing bought you? What satisfaction has it not forgotten and reanimated it shall walk the world in the wrought? 

Is anyone saved, anyone at all, through your obsession?

When you finally reach the petals of a monstrous flower that bliss of not-knowing. And then there shall be a fire that knows the naming of shall blossom within the skull and expand the mind beyond what any man can bear, but whether it decays under the you, and in the presence of the strangling fruit, its dark flame shall acquire every spiraling the center, the end which is not, COULD not, ever be an earth or above on green fields, or out to sea or in the very air, all shall come to end, will you part of you that remains.
  enjoy immense psychological benefits.”
  finally be happy? 

Will those who loved you once?

Wasted, Wasted, Following the revelation, and to revel, in the knowledge of the strangling fruit—and the hand of the sinner shall rejoice, for there Tree:
You had to Know just to Know it, no ending will there be.

Wasted, Wasted, Digging at the Roots:
If you know how to amounts to a long column of my yesterdays, towards the end, though not the is no sin in shadow or in light that the seeds of the dead cannot forgive. And there shall be make it, your ending will be Truth.
  in the planting in the shadows a grace and a mercy from which shall blossom dark flowers, and very end of course, where I had stood at the age of seven, gripping my mother's wrists, trying as hard as I could to keep her from going.”

This is their teeth shall devour and sustain and herald the passing of why classical thought concerning structure could say that the center is, paradoxically, within the structure and an age. That which dies shall still know life in death for all that decays is not forgotten and outside it. The center is at the center of the totality, and yet, since the center does not belong to the reanimated it shall walk the world in the bliss of not-knowing. And then there shall be a totality (is not part of the totality), the totality has its fire that knows the naming of you, and in the presence of the strangling fruit, its dark flame shall acquire every part of center elsewhere. The center is not the center.”


“If one invests some interest in, for example, a tree and begins to form some thoughts about this tree then writes these thoughts down, further examining the meanings that you that remains.
  surface, allowing for unconscious associations to take place, writing all this down as well, until the subject of the tree branches off into the subject of the shelf, that person will enjoy immense psychological benefits.”
 

`;

const sources = [
    //https://www.theidioms.com/home-is-where-the-heart-is/
`
Similar variations of this saying have been in use since ancient times.  The modern wording that we are familiar with today, first appeared in the J. T. Bickford novel, ‘Scandal’ in 1857. The proverb has been in this present form in the USA since the 1820s.

The phrase means that no matter who you are with or where you are in the world, your family and home always have the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and happy memories. It might not always be the building itself, but being near your loved ones.

`,
//House of Leaves
`“I've wandered as far west as I can go. Sitting now on the sand, I watch the sun blur into an aftermath. Reds finally marrying blues. Soon night will enfold us all. But the light is still not gone, not yet, and by it I can dimly see here my own dark hallway, or maybe it was just a foyer and maybe not dark at all, not in fact brightly lit, an afternoon sun blazing through the lead panes, now detected amidst what amounts to a long column of my yesterdays, towards the end, though not the very end of course, where I had stood at the age of seven, gripping my mother's wrists, trying as hard as I could to keep her from going.”

This is why classical thought concerning structure could say that the center is, paradoxically, within the structure and outside it. The center is at the center of the totality, and yet, since the center does not belong to the totality (is not part of the totality), the totality has its center elsewhere. The center is not the center.”


“If one invests some interest in, for example, a tree and begins to form some thoughts about this tree then writes these thoughts down, further examining the meanings that surface, allowing for unconscious associations to take place, writing all this down as well, until the subject of the tree branches off into the subject of the shelf, that person will enjoy immense psychological benefits.”
`
//JR, both past and present

`he phrase means that no matter who you are with or where you are in the world, your family and home always have the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and happy memories. It might not always be the building itself, but being near your loved ones.

Home is where the heart was, where is it now?

Where could it ever be. 

How could it have been your home, if you so callously abandoned it. One more thing upon the Pyre of your former life. One more thing sacrificed to the unrelenting desire to KNOW.

And what has knowing bought you? What satisfaction has it wrought? 

Is anyone saved, anyone at all, through your obsession?

When you finally reach the spiraling the center, the end which is not, COULD not, ever be an end, will you finally be happy? 

Will those who loved you once?

Wasted, Wasted, Following the Tree:
You had to Know just to Know it, no ending will there be.

Wasted, Wasted, Digging at the Roots:
If you know how to make it, your ending will be Truth.`

//― Jeff VanderMeer, Annihilation
,
`Where lies the strangling fruit that came from the hand of the sinner I shall bring forth the seeds of the dead to share with the worms that gather in the darkness and surround the world with the power of their lives while from the dimlit halls of other places forms that never were and never could be writhe for the impatience of the few who never saw what could have been. In the black water with the sun shining at midnight, those fruit shall come ripe and in the darkness of that which is golden shall split open to reveal the revelation of the fatal softness in the earth. The shadows of the abyss are like the petals of a monstrous flower that shall blossom within the skull and expand the mind beyond what any man can bear, but whether it decays under the earth or above on green fields, or out to sea or in the very air, all shall come to revelation, and to revel, in the knowledge of the strangling fruit—and the hand of the sinner shall rejoice, for there is no sin in shadow or in light that the seeds of the dead cannot forgive. And there shall be in the planting in the shadows a grace and a mercy from which shall blossom dark flowers, and their teeth shall devour and sustain and herald the passing of an age. That which dies shall still know life in death for all that decays is not forgotten and reanimated it shall walk the world in the bliss of not-knowing. And then there shall be a fire that knows the naming of you, and in the presence of the strangling fruit, its dark flame shall acquire every part of you that remains.`

]

/***/ }),

/***/ 9558:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
//http://knucklessux.com/InfoTokenReader/?mode=loop
const text = `
 
“ The phrase means that no matter who you are with or where you are in the world, your family and Where lies the strangling fruit that came from the hand of the sinner I shall bring forth the home always have the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and seeds of the dead to share with the worms that gather in the darkness and I've wandered as far west as I can go. Sitting now on the sand, I watch the happy memories. It might not always be the building itself, but being near your loved ones.

Home is surround the world with the power of their lives while from the dimlit halls of other places forms that sun blur into an aftermath. Reds finally marrying blues. Soon night will where the heart was, where is it now?

Where could it ever be. 

How could never were and never could be writhe for the impatience of the few who never saw what could enfold us all. But the light is still not gone, not yet, and by it it have been your home, if you so callously abandoned it. One more thing upon the Pyre of have been. In the black water with the sun shining at midnight, those fruit shall come ripe and I can dimly see here my own dark hallway, or maybe it was just a foyer and in the darkness of that which is golden shall split open to your former life. One more thing sacrificed to the unrelenting desire to KNOW.

And what has maybe not dark at all, not in fact brightly lit, an afternoon sun blazing through the lead panes, now detected amidst what reveal the revelation of the fatal softness in the earth. The shadows of the abyss are like the knowing bought you? What satisfaction has it wrought? 

Is anyone saved, anyone at all, through your obsession?

When you finally reach the petals of a monstrous flower that shall blossom within the skull and expand the mind beyond what any man can bear, but whether it decays under the spiraling the center, the end which is not, COULD not, ever be an earth or above on green fields, or out to sea or in the very air, all shall come to end, will you finally be happy? 

Will those who loved you once?

Wasted, Wasted, Following the revelation, and to revel, in the knowledge of the strangling fruit—and the hand of the sinner shall rejoice, for there Tree:
You had to Know just to Know it, no ending will there be.

Wasted, Wasted, Digging at the Roots:
If you know how to amounts to a long column of my yesterdays, towards the end, though not the is no sin in shadow or in light that the seeds of the dead cannot forgive. And there shall be make it, your ending will be Truth.
  in the planting in the shadows a grace and a mercy from which shall blossom dark flowers, and very end of course, where I had stood at the age of seven, gripping my mother's wrists, trying as hard as I could to keep her from going.”

This is their teeth shall devour and sustain and herald the passing of why classical thought concerning structure could say that the center is, paradoxically, within the structure and an age. That which dies shall still know life in death for all that decays is not forgotten and outside it. The center is at the center of the totality, and yet, since the center does not belong to the reanimated it shall walk the world in the bliss of not-knowing. And then there shall be a totality (is not part of the totality), the totality has its fire that knows the naming of you, and in the presence of the strangling fruit, its dark flame shall acquire every part of center elsewhere. The center is not the center.”


“If one invests some interest in, for example, a tree and begins to form some thoughts about this tree then writes these thoughts down, further examining the meanings that you that remains.
  surface, allowing for unconscious associations to take place, writing all this down as well, until the subject of the tree branches off into the subject of the shelf, that person will enjoy immense psychological benefits.”


`;

const sources = [
    //https://www.theidioms.com/home-is-where-the-heart-is/
`
Similar variations of this saying have been in use since ancient times.  The modern wording that we are familiar with today, first appeared in the J. T. Bickford novel, ‘Scandal’ in 1857. The proverb has been in this present form in the USA since the 1820s.

The phrase means that no matter who you are with or where you are in the world, your family and home always have the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and happy memories. It might not always be the building itself, but being near your loved ones.

`,
//House of Leaves
`“I've wandered as far west as I can go. Sitting now on the sand, I watch the sun blur into an aftermath. Reds finally marrying blues. Soon night will enfold us all. But the light is still not gone, not yet, and by it I can dimly see here my own dark hallway, or maybe it was just a foyer and maybe not dark at all, not in fact brightly lit, an afternoon sun blazing through the lead panes, now detected amidst what amounts to a long column of my yesterdays, towards the end, though not the very end of course, where I had stood at the age of seven, gripping my mother's wrists, trying as hard as I could to keep her from going.”

This is why classical thought concerning structure could say that the center is, paradoxically, within the structure and outside it. The center is at the center of the totality, and yet, since the center does not belong to the totality (is not part of the totality), the totality has its center elsewhere. The center is not the center.”


“If one invests some interest in, for example, a tree and begins to form some thoughts about this tree then writes these thoughts down, further examining the meanings that surface, allowing for unconscious associations to take place, writing all this down as well, until the subject of the tree branches off into the subject of the shelf, that person will enjoy immense psychological benefits.”
`
//JR, both past and present

`he phrase means that no matter who you are with or where you are in the world, your family and home always have the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and happy memories. It might not always be the building itself, but being near your loved ones.

Home is where the heart was, where is it now?

Where could it ever be. 

How could it have been your home, if you so callously abandoned it. One more thing upon the Pyre of your former life. One more thing sacrificed to the unrelenting desire to KNOW.

And what has knowing bought you? What satisfaction has it wrought? 

Is anyone saved, anyone at all, through your obsession?

When you finally reach the spiraling the center, the end which is not, COULD not, ever be an end, will you finally be happy? 

Will those who loved you once?

Wasted, Wasted, Following the Tree:
You had to Know just to Know it, no ending will there be.

Wasted, Wasted, Digging at the Roots:
If you know how to make it, your ending will be Truth.`

//― Jeff VanderMeer, Annihilation
,
`Where lies the strangling fruit that came from the hand of the sinner I shall bring forth the seeds of the dead to share with the worms that gather in the darkness and surround the world with the power of their lives while from the dimlit halls of other places forms that never were and never could be writhe for the impatience of the few who never saw what could have been. In the black water with the sun shining at midnight, those fruit shall come ripe and in the darkness of that which is golden shall split open to reveal the revelation of the fatal softness in the earth. The shadows of the abyss are like the petals of a monstrous flower that shall blossom within the skull and expand the mind beyond what any man can bear, but whether it decays under the earth or above on green fields, or out to sea or in the very air, all shall come to revelation, and to revel, in the knowledge of the strangling fruit—and the hand of the sinner shall rejoice, for there is no sin in shadow or in light that the seeds of the dead cannot forgive. And there shall be in the planting in the shadows a grace and a mercy from which shall blossom dark flowers, and their teeth shall devour and sustain and herald the passing of an age. That which dies shall still know life in death for all that decays is not forgotten and reanimated it shall walk the world in the bliss of not-knowing. And then there shall be a fire that knows the naming of you, and in the presence of the strangling fruit, its dark flame shall acquire every part of you that remains.`

]

/***/ }),

/***/ 9699:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
//http://knucklessux.com/InfoTokenReader/?mode=loop
const text = `
 
“ The phrase means that no matter who you are with or where you are in the world, your family and Where lies the strangling fruit that came from the hand of the sinner I shall bring forth the home always have the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and seeds of the dead to share with the worms that gather in the darkness and I've wandered as far west as I can go. Sitting now on the sand, I watch the happy memories. It might not always be the building itself, but being near your loved ones.

Home is surround the world with the power of their lives while from the dimlit halls of other places forms that sun blur into an aftermath. Reds finally marrying blues. Soon night will where the heart was, where is it now?

Where could it ever be. 

How could never were and never could be writhe for the impatience of the few who never saw what could enfold us all. But the light is still not gone, not yet, and by it it have been your home, if you so callously abandoned it. One more thing upon the Pyre of have been. In the black water with the sun shining at midnight, those fruit shall come ripe and I can dimly see here my own dark hallway, or maybe it was just a foyer and in the darkness of that which is golden shall split open to your former life. One more thing sacrificed to the unrelenting desire to KNOW.

And what has maybe not dark at all, not in fact brightly lit, an afternoon sun blazing through the lead panes, now detected amidst what reveal the revelation of the fatal softness in the earth. The shadows of the abyss are like the knowing bought you? What satisfaction has it wrought? 

Is anyone saved, anyone at all, through your obsession?

When you finally reach the petals of a monstrous flower that shall blossom within the skull and expand the mind beyond what any man can bear, but whether it decays under the spiraling the center, the end which is not, COULD not, ever be an earth or above on green fields, or out to sea or in the very air, all shall come to end, will you finally be happy? 

Will those who loved you once?

Wasted, Wasted, Following the revelation, and to revel, in the knowledge of the strangling fruit—and the hand of the sinner shall rejoice, for there Tree:
You had to Know just to Know it, no ending will there be.

Wasted, Wasted, Digging at the Roots:
If you know how to amounts to a long column of my yesterdays, towards the end, though not the is no sin in shadow or in light that the seeds of the dead cannot forgive. And there shall be make it, your ending will be Truth.
  in the planting in the shadows a grace and a mercy from which shall blossom dark flowers, and very end of course, where I had stood at the age of seven, gripping my mother's wrists, trying as hard as I could to keep her from going.”

This is their teeth shall devour and sustain and herald the passing of why classical thought concerning structure could say that the center is, paradoxically, within the structure and an age. That which dies shall still know life in death for all that decays is not forgotten and outside it. The center is at the center of the totality, and yet, since the center does not belong to the reanimated it shall walk the world in the bliss of not-knowing. And then there shall be a totality (is not part of the totality), the totality has its fire that knows the naming of you, and in the presence of the strangling fruit, its dark flame shall acquire every part of center elsewhere. The center is not the center.”


“If one invests some interest in, for example, a tree and begins to form some thoughts about this tree then writes these thoughts down, further examining the meanings that you that remains.
  surface, allowing for unconscious associations to take place, writing all this down as well, until the subject of the tree branches off into the subject of the shelf, that person will enjoy immense psychological benefits.”


`;

const sources = [
    //https://www.theidioms.com/home-is-where-the-heart-is/
`
Similar variations of this saying have been in use since ancient times.  The modern wording that we are familiar with today, first appeared in the J. T. Bickford novel, ‘Scandal’ in 1857. The proverb has been in this present form in the USA since the 1820s.

The phrase means that no matter who you are with or where you are in the world, your family and home always have the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and happy memories. It might not always be the building itself, but being near your loved ones.

`,
//House of Leaves
`“I've wandered as far west as I can go. Sitting now on the sand, I watch the sun blur into an aftermath. Reds finally marrying blues. Soon night will enfold us all. But the light is still not gone, not yet, and by it I can dimly see here my own dark hallway, or maybe it was just a foyer and maybe not dark at all, not in fact brightly lit, an afternoon sun blazing through the lead panes, now detected amidst what amounts to a long column of my yesterdays, towards the end, though not the very end of course, where I had stood at the age of seven, gripping my mother's wrists, trying as hard as I could to keep her from going.”

This is why classical thought concerning structure could say that the center is, paradoxically, within the structure and outside it. The center is at the center of the totality, and yet, since the center does not belong to the totality (is not part of the totality), the totality has its center elsewhere. The center is not the center.”


“If one invests some interest in, for example, a tree and begins to form some thoughts about this tree then writes these thoughts down, further examining the meanings that surface, allowing for unconscious associations to take place, writing all this down as well, until the subject of the tree branches off into the subject of the shelf, that person will enjoy immense psychological benefits.”
`
//JR, both past and present

`he phrase means that no matter who you are with or where you are in the world, your family and home always have the deepest affection and emotional pull. It is the place where you have a foundation of love, warmth, and happy memories. It might not always be the building itself, but being near your loved ones.

Home is where the heart was, where is it now?

Where could it ever be. 

How could it have been your home, if you so callously abandoned it. One more thing upon the Pyre of your former life. One more thing sacrificed to the unrelenting desire to KNOW.

And what has knowing bought you? What satisfaction has it wrought? 

Is anyone saved, anyone at all, through your obsession?

When you finally reach the spiraling the center, the end which is not, COULD not, ever be an end, will you finally be happy? 

Will those who loved you once?

Wasted, Wasted, Following the Tree:
You had to Know just to Know it, no ending will there be.

Wasted, Wasted, Digging at the Roots:
If you know how to make it, your ending will be Truth.`

//― Jeff VanderMeer, Annihilation
,
`Where lies the strangling fruit that came from the hand of the sinner I shall bring forth the seeds of the dead to share with the worms that gather in the darkness and surround the world with the power of their lives while from the dimlit halls of other places forms that never were and never could be writhe for the impatience of the few who never saw what could have been. In the black water with the sun shining at midnight, those fruit shall come ripe and in the darkness of that which is golden shall split open to reveal the revelation of the fatal softness in the earth. The shadows of the abyss are like the petals of a monstrous flower that shall blossom within the skull and expand the mind beyond what any man can bear, but whether it decays under the earth or above on green fields, or out to sea or in the very air, all shall come to revelation, and to revel, in the knowledge of the strangling fruit—and the hand of the sinner shall rejoice, for there is no sin in shadow or in light that the seeds of the dead cannot forgive. And there shall be in the planting in the shadows a grace and a mercy from which shall blossom dark flowers, and their teeth shall devour and sustain and herald the passing of an age. That which dies shall still know life in death for all that decays is not forgotten and reanimated it shall walk the world in the bliss of not-knowing. And then there shall be a fire that knows the naming of you, and in the presence of the strangling fruit, its dark flame shall acquire every part of you that remains.`

]

/***/ }),

/***/ 1578:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 

Additional Notes: 

It must be noted that certain of my patients are in various stages of recovery from Shared Generational Trauma stemming from their home universe. Camille, Devona, Ria, Neville, and Witherby self identify as having been direct coworkers in a Training Team, Vik, K, Yongki, and Captain identify as direct workers in an Information Team, and Parker is the sole surviving member of Control.

These teams were assembled in the service of a Nightmarish Corporation which by All Accounts sought to benefit from Employee Trauma associated with Containing Horrors. 

It is Important to Keep This In Mind while directing Treatment, especially given the prevalence of formerly useful Defensive Mechanisms no longer being Helpful in their New Environment.

~~~~

 Integration and Reconnection: Recovery

Broadly speaking, Training spent the least amount of time at the Corporation, and by far the longest time inside this Universe. They are well on their Path of Recovery, being generally at the stage where they have already built up their New Lives. When they were fresh to this Universe they had various Challenges with which I could have helped, but as this was centuries before my time here, I Must Acknowledge That I Was Not Needed. 

Of the group, Ria was the least ready to move on from her Trauma, but with my Help (and the Revelation that she clung to a False Hope) she has made significant progress.  Her desire for a Secret Meaning to the Trauma, something to Make It All Worth It kept her alive and motivated at the Corporation. This was no longer useful in her current context, and she has placed it aside, mourned for it, and made tangible steps towards reconnecting with her desires outside of the context of Trauma. 


~~~~~

Mourning and Remembrance: Resting



Contrastingly, Information was still relatively new when I joined this Universe. In general, their challenges remain Rest and Recovery. Progress can not be expected when one is still tired from the Ordeal, after all! While I have, of course, promised my Bestie (Hi, Ronin!)  not to dig too deeply into Vik, while he Monitors me I will record the following information:

Vik has been struggling with self sacrifice, and the mindset that they have no worth unless Serving Others.  Their friendship with Parker has been helpful, in that Parker needs no one and nothing. He is a bundle of wants, but not needs. Vik is learning to do self care.

With Khana, I am under no such restrictions. Even without him being a direct patient of mine, his proud sharing of information has painted quite a clear picture.  In the face of Trauma that could not be bargained with, could not be reasoned with, Khana concluded that the only Power and Safety that could be obtained must be Taken.  That Status is a shortcut to what little Safety there was, as those most likely to be killed or injured were those with the least of it.  In their Home Universe, murder was a quite efficient way to keep oneself safe, while in this Universe it is a quick way to get oneself killed or imprisoned.  Khana is navigating the challenge of learning the New Rules and learning to leverage them. Of learning to Relax now that Being Seen is no longer a Matter of Life And Death.

Yongki has been struggling with far more Physical Trauma than any of the others. The nearest mundane Analogue I can conceive of is Traumatic Brain Injury.  Prior to the Captain joining, Yongki was focused on learning to manage this injury and avoiding making it worse. With the Captain here, Yongki is able to begin taking the first steps of recovery, focusing on learning who he is and what he prefers. 


Meanwhile, Parker's fundamental fear that his Presence Can Only Make Things Worse appears to be eroding with time. Interacting with other refugees from the Corporation appears to be steadily driving home the concept that while he was, in fact, the common thread through all of the Trauma he experienced, he was NOT the cause of it. That the Trauma was fundamentally Out Of His Control and Impersona.  Rather than avoiding the world and abdicating all responsibility for his actions, Parker is learning that even with his Unique Challenges there are ways to Safely Interact.

~~~~

Stabilization and Safety: Realization 

Captain is the most mysterious of them, in my Eyes. As the newest of my patients to this Universe, he seems actively operating under the assumption that the Traumatic Circumstances he has recently escaped was Correct in some fundamental way. That the Rules he Lived By must have had some Higher Virtue. That he seems willing to Watch and Learn from those who are further along in the Recovery Process bodes well.

Finally, and most intriguing, Camille, in her role as Captain of the Training Team, has informed me that additional refugees have been discovered. Or, perhaps, "refugees" is not quite the right word. There is evidence they are actively still within their Traumatic Environment. This is a Unique Opportunity, both for myself, and for the survivors of their Universe, to participate in Helping Those Ready To Accept It.  And for Acceptance If They Are Not.


`;

/***/ }),

/***/ 9241:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
//http://knucklessux.com/InfoTokenReader/?mode=loop
const text = `
 
To this day I still don't know if "Zampanio" exists. Maybe the rabbit hole that first fAQ lead me into was just an arg a particularly obessive sburbsim fan lead me into?

and i barely even care! 

i love the vibes!

i love how open it feels?

(and if it WAS an arg, holy fuck, what a cool concept. an arg designed to target a niche fandom? or even just a single person?)

so thats the direction i'm trying to take the zampanio fandom. 

what fandoms can we sink our tendrils into

will a lobotomy corp fan one day make the exact right google search and fall into this rabbit hole?

what about magnus archives?

and the Herald is trying to get rain world in!

each of us has a wholly unique world inside of us. a different subset of reality we interact with.

each of us can make a personalized branch designed to catch...well...US of all people.

and the fun is seeing who else gets caught by the same bait that would catch you.
`;


/***/ }),

/***/ 8705:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
//http://knucklessux.com/InfoTokenReader/?mode=loop
const text = `
 
Warning: Gore and Death


When they first connect to her, nothing seems to happen. 

That's not right. It's incorrect. They are one as they should be, as they were always meant to be, and yet this one says nothing, is nothing. She is broken and does not know it, or she did and could not tell them-- they can't tell from the happy little smile plastered onto her face.

It's fine. They could fix each other, and they can fix her, as well. She will be molded to the needs of the Song. She can be born anew.

But then, something snaps. Like a wire, almost imperceptibly. The tempo slows to a halt.

Her head. It's her head. From a cut on her neck drips a thin line of blood. No, wait. It's getting longer. The crimson pools up at its seams as they watch; they can't tell where the carnage begins and the cut ends. The woman's eyes roll back, circulation no longer flowing into her brain. It's staining into her white shirt now. Their input doubles as they narrate every second of it all to each other, as if the other one can't see, as if understanding will quell the horror in front of them, or the sickening pain running through their throats.

Thunk.

Her head falls forward. She smacks the side of her skull against the concrete; the two reel in pain as their own heads cave as well. The woman's eyes dim, staring up to them only in acknowledgement, before the fire in her goes out. What will is in her fades, and what's left is silence.

They don't realize it at first. There is only horror in them as even her death doesn't stop the carnage: the base of the neck bleeds and bleeds, her shirt now dyed red, the rest clotting in the sacks of her clothes. It all makes the corpse bulge unnaturally in its stasis, the fabric struggling to contain its ooze.

It's only when they try to move and their legs freeze up that they notice she's still part of them.

Their bodies do not listen, cannot listen. The weight of a whole body on the floor is too much to bear, and they are only two, and it's still alive, as alive as death can be; they are both living and not, caught within their self-preservation and this rotting limb; animals in a trap with their limb chewed out but still connected. Still there. They do not know if they're screaming. They can't hear if they are. There's only them and the corpse. Them, and the silence.

Hours pass. Then, days. Maybe even weeks. They're forced to watch as the corpse rots standing from the inside out, its own gut flora, and, above all, there is no Song. They cannot move their limbs, their instruments out of reach, and in their powerlessness, they scream. For their Conductor, for their freedom. They beg for mercy. Anything, they say. Anything to hear their song again.

And, finally, something answers.

A coffin on the ground shakes. Her coffin-- the one she hauled all that time ago. The lid flips open and out crawls a bloodstained hand, lifting itself out of the grave. Then, another hand. Then a foot. Limb by limb it reveals itself, until, finally, it stands over the bones and mush of what had been before: a headless body donned in armor, its gauntlets and pauldrons fusing to it like second skin. Underneath, the Ensemble white suit. It is Of Them, and yet it is not.

They change as well without even realizing it. One's hands reach out into claws that reach out into one limb, two shining swords not unlike that woman's sprouting out of both her hands. The other feels her head shift and turn into cold metal, her nose extending into a gun's muzzle, her eyes into sights, and her neck into a rubber grip.

They raise up their new instruments as it instructs them to play.


`;


/***/ }),

/***/ 1939:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
http://www.farragofiction.com/ZampanioEyes2/?C=M;O=D

You know it respond to you, right?

The things you pay attention to.

The things you think are going on.

Not all the time. 

Not forever.

But you get it right.

It is not what it is.

The Observers are the ones Observed.

What Mark will you leave behind?


`;


/***/ }),

/***/ 2892:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
The next person may as well have forgotten this was a confessional.

He saunters in, kicking his feet onto the wooden wall, calling his vessel all sorts of names. What kind of creepy shit was Witherby doing, putting a stupid booth in the middle of nowhere and making a scene? Stupid Witherby. Stupid, creeper Witherby, digging into people's secrets. What is he going to do with all of that information, huh? Is he gonna get off on it? The fact that he even thinks that anyone would ever share their secrets with someone as unlikable as him was tremendously fucking--

The words catch in his mouth, breaking out into a cough; thick smoke trickles out from his side of the booth and into the stranger's, causing him to shake in place, slamming his head into the booth wall over and over. He's choking, it seems. 

The door slams open, hurried steps bolting into the depths of the mall. He coughs out smoke the entire while.

`;

/***/ }),

/***/ 2035:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
The Answer to Life, the Universe, and Everything?

Is simple.

Zampanio is a story about how even if you feel monstrous, even if you feel irredeemable, you deserve to be happy.

That this happiness is itself a way to heal the world.

Have you seen the Good Place? In it, the thesis is the world is so interconnected these days, that you can't POSSIBLY do good. Even eating breakfast in the morning is probably destroying the environment and supporting slave labor and it SUCKS.

And living in that kind of world, having that kind of mindset...

Don't we all feel like monsters?

Like we don't deserve happiness?

So here is a story about supernatural creatures that KILL and worse and HAVE to do these terrible things to live.

And about how even as they do so much harm they can still learn to do BETTER. 

The Killer feels safe with her Family and she kills only to protect them now, or to close the time loop.

Parker has no choice but to use his gun at certain times, but he CAN choose to not use it voluntarily against people who have objectively wrong opinions on hatsune miku. 

Each of the blorbos is an example of this, at different points in their arc. 

And none of them did it overnight. None of them destroyed themselves trying to be BETTER. None of them punished themselves into being Good People.

Hell, most of them didn't even REALIZE They were doing better. They just...started to find things that didnt' hurt. Things that came easier. 

Because that's what The End Is Never The End really means, to me.  It's not just a meme phrase that accidentally wormed its way here from Stanley Parable.

It means that as long as you're alive, there's hope.  

That no matter how bad things get, no matter how badly you fuck up, one day you will look back on all this and wonder how you could think the hole was insurmountable. There is always a next page to your story.

You can be happy.  

All you need to do is endure. One day at a time until, little by little it stops feeling like endurance and just feels like living.

Till it stops feeling like just living and instead feeling like thriving. 

I believe in you. Not like I might believe in aliens or bigfoot or whatever, but like I believe in air.

I believe you have no choice but to be happier, no matter how dark things are, because regression to the mean is an actual damn thing.

The Herald summarized how I take "the end is never the end" as "this too shall pass" and YES.

Life isn't simple and orderly. Things don't just keep going in their current direction forever and ever. Its chaotic and messy and surprising and sudden changes are all but guaranteed. 

So the only thing in doubt is if you'll LET yourself have the good times that are headed your way. 

And if you're caught up in whether or not you "deserve" them, whether or not you're a monster?

Remember that happiness heals.  Not just you. Everyone around you. If you let yourself bask in the good times, to heal, you will be in a better place to help others. To survive future bad times without needing as much help. To THRIVE.

And the more of us who thrive, the better the world is.

THAT is what Zampanio is, to me.
`;


/***/ }),

/***/ 6904:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
Something that struck me as weird just now?

The different reflections of me that are out there. The different shambling horrors. 

The Cultist knows a different me than the Herald than the original Marked (and even those Marked have wildly different pictures of me). 

But especially the Cultist.

The Cultist, you see, specializes entirely in a me that is as close to AB as you can get, in that it is a robot version of me frozen in their teens.

And it's weird seeing that corpse dragged back into the light of day?

'Glomp' and 'the matrix' and 'TAB' and all of that. 

An ill fitting mask?

And yet... unquestionably me. Past and Present spiralling together.

Even this is past, from your point of view. 

Shards of myself left in places both hidden and obvious. A jigsaw puzzle you can assemble to make a picture with no right answer.

Who is JR, I guess is what I'm asking here. jaded? justified?

Speaking of past and present spiralling together, no sooner than I had taken Recursion as my name and scorned the Researcher than I got an opportunity to become a Researcher once again, as a side job.  I'm still jaded, there's no doubt about that but... there's reasons to double up on jobs right now, for me.  Here's hoping it doesn't eat up too much of my time. 

And that I don't get caught up in the Illusion that I can return to a Past That Never Was.  I stopped being a researcher, I became jaded, for a reason, you know? Nostalgia isn't a reason to repeat mistakes. 


`;


/***/ }),

/***/ 6645:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
0
1
2
3
4
5
6
7
8
9
0
!
?
,
.
;
`;


/***/ }),

/***/ 1952:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
Another person comes in, nearly scraping the confessional roof as she sits down.

No words are exchanged. She lets out a long, weary sigh; the breath in her lungs comes out in a controlled exhale, not too fast, and not too slow.

She sits there for a while longer, and then she stands up. He forgives her, and she leaves.

`;

/***/ }),

/***/ 1178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
She's sat at her desk, pen idly scratching doodles onto a notepad. They're overwhelmingly cheerful. Clouds. Smiles. Eyes. 

She meets one of the orbs' gaze with equanimity, face blank.

There is a piece of her, deep within, that misses Home with the ache of a long healed injury. 

It helps, some days, to talk about how it all had been with those few refugees she's managed to find. 

Other days she finds solace in one of the few ways this world provides to both See and Be Seen. Social media is, of course, a disappointingly tasteless way to scratch that itch, but... It is what it is.

A perfectly manicured nail (bubblegum pink, of course) taps out a staccato beat into the wood of her desk. Not morse code, never that. She wrinkles her gently upturned nose at the thought of trying to conceal information. No. Just a simple rhythm. A melody from better times.

The phone at her desk buzzes to life and she silences it with a sigh of relief.  There. The designated Two Minutes of Ennui were complete!   Her features come to life, all smiles that go all the way to her eyes and energy and happiness, as if the sadness itself had been a mask she had had to don.

It's important! She reminds herself, getting up from her desk, to not accidentally conceal any Sad Emotions that might be lurking underneath the surface! You have to face everything head on! With Clear Eyes!

TODAY is a very important day! She will be Professional and she will be Compassionate and she will keep Hard Boundaries and she will finally, FINALLY get to speak directly with Wanda. If there could be said to be a single person in this universe who knows even a fraction of what Jaimie, He Who Knows, knows, then it would have to be her.

And Doctor Fiona Slaughter, licensed psychotherapist, wants to know everything she can.

When her office had been broken into and her private notes obviously copied she had nearly cried in relief.  Finally! Finally something makes sense! Someone cared that there was knowledge!  Someone AGREED it didn't belong under lock and key and ciphers and secrecy!  Knowledge Wants To Be Free!

She was, of course, perfectly aware that this Universe believed certain types of information to be less free than others and... if she was to fit in, concessions must be made. But the thrill and delight that coursed through her as she followed thread after thread all the way to its source, the "CEBro" of Eyedol games herself? Exquisite.

And today she would have her closure. Her catharsis. She would stand before the most Holy figure this corrupted Universe had to offer.

She adjusts her bouncy blond hair in one of the many mirrors, grabs her bag (immaculately coordinating with her white and pink outfit, of course), and steps out to face the day.


`;

/***/ }),

/***/ 8791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `

Excerpt: From the Private Notes of Dr. Fiona Slaughter

If you're reading this, you have my congratulations. I had feared these words would remain trapped and stifled for all time, dusty and inert on these pages, fed only by my Eyes alone.

But I Hoped, and my words marching along your synapses is proof it was worth it.

Thank you for navigating the safes and ciphers required by my various contracts and legal obligations.  Thank you for reading these.  

As a courtesy, I have attempted to organize my records as best as I can to make sense to an outsider*.  In exchange, please do your best to keep this information to yourself, or at least do no harm to my patients. 

Thank you,

Dr. Fiona Slaughter

* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 
`;

/***/ }),

/***/ 4997:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 


Name: Camille
Aliases:  The End, L-0-17 (Note: Be advised she is unaware of this designation and reacts violently to implications of abnormality)
Coping Strategy:  Denial 
Attachment Style: Insecure (Anxious previously, Avoidant currently)

Quick Summary:

Camille has a warm smile, mischievous eyes and a desire to love and be loved. 

She felt isolated as a child, both larger and more intimidating than her peers and has difficulty predicting how others view her.  This has lead to her having an insecure attachment style natively, preferring to cling and fawn over loved ones in the fear of losing them.

Prior employment lead to her developing a 'curse', either preventing her directly from speaking or strongly discouraging it. As a result, her attachment style has evolved to be more avoidant overall.

I'm working with her to untangle how much is actually supernatural in nature and how much is her own desire to set harsh Personal Rules in order to make up for how bewildering she finds Societal ones. 

Camille is a strong believer in self improvement and change, being willing to face most obstacles head on with Clear Eyes.  However, this inverts in the face of something she believes beyond change.  She becomes stubborn and willfully Blind, refusing to acknowledge that there is a problem at all. 

As she does not view this as a problem, by definition, I must put aside my personal Beliefs and focus on what aspects of herself she does wish assistance with.

`;

/***/ }),

/***/ 842:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
const text = `
* JR NOTE: PLEASE KEEP IN MIND THAT DOC SLAUGHTER IS FROM ANOTHER (MORE PARANOID) UNIVERSE, AND THAT THOSE WRITING HER ARE NOT ACTUALLY LICENSED PSYCHOTHERAPISTS. DO NOT TAKE ANY OF HER OPINIONS AS FACTS. 


Name: Ria
Aliases:  The Match, L-0-R5 (it is advised to avoid calling her either alias, as this may cause a guilt spiral)
Coping Strategy:  Wounded and Defensive (Obsession)
Attachment Style: Insecure (Anxious)

Quick Summary:

The first thing I noticed about Ria was her bright eyes, constantly searching my office, missing not a single detail. She is intelligent and passionate, and a very hard worker.

Overall, the biggest thing Ria wants to work on is her struggles with Addiction, both in the sense of substance abuse and in her own words, 'an addiction to connecting the facts'.  I struggle to maintain appropriate Professional Distance as I confess the idea that this could be unhealthy is a Foreign one to me.

Ria is an optimist in a Universe of disappointments. Each fresh disappointment creates a new crack in her smile, and given sufficient pain she can lose herself to a frantic attempt to make sure she is Never Hurt Like This Again.

At the same time, she is not unaware of her oversized effect on the people around her. This leads to a cycle of obsessive attempts to control reality to avoid pain punctuated with withdrawing heavily to avoid hurting anyone.

It should be noted that her attempts to control reality tends towards "ending reality".

`;

/***/ }),

/***/ 8116:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./": 3607,
	"./Objects/Entities/Actions/AddThemeToObject": 1617,
	"./Objects/Entities/Actions/AddThemeToObject.ts": 1617,
	"./Objects/Entities/Actions/AddThemeToRoom": 8072,
	"./Objects/Entities/Actions/AddThemeToRoom.ts": 8072,
	"./Objects/Entities/Actions/BaseAction": 7042,
	"./Objects/Entities/Actions/BaseAction.ts": 7042,
	"./Objects/Entities/Actions/CheckInventory": 1201,
	"./Objects/Entities/Actions/CheckInventory.ts": 1201,
	"./Objects/Entities/Actions/DeploySass": 4237,
	"./Objects/Entities/Actions/DeploySass.ts": 4237,
	"./Objects/Entities/Actions/DestroyObjectInInventoryWithThemes": 457,
	"./Objects/Entities/Actions/DestroyObjectInInventoryWithThemes.ts": 457,
	"./Objects/Entities/Actions/DestroyRandomObjectInInventoryAndPhilosophise": 4516,
	"./Objects/Entities/Actions/DestroyRandomObjectInInventoryAndPhilosophise.ts": 4516,
	"./Objects/Entities/Actions/DropAllObjects": 4102,
	"./Objects/Entities/Actions/DropAllObjects.ts": 4102,
	"./Objects/Entities/Actions/DropObjectWithName": 2827,
	"./Objects/Entities/Actions/DropObjectWithName.ts": 2827,
	"./Objects/Entities/Actions/EnterObject": 9722,
	"./Objects/Entities/Actions/EnterObject.ts": 9722,
	"./Objects/Entities/Actions/Feel": 4543,
	"./Objects/Entities/Actions/Feel.ts": 4543,
	"./Objects/Entities/Actions/FollowObject": 744,
	"./Objects/Entities/Actions/FollowObject.ts": 744,
	"./Objects/Entities/Actions/GiveObjectWithNameToTarget": 6290,
	"./Objects/Entities/Actions/GiveObjectWithNameToTarget.ts": 6290,
	"./Objects/Entities/Actions/GiveRandomObjectToTarget": 4009,
	"./Objects/Entities/Actions/GiveRandomObjectToTarget.ts": 4009,
	"./Objects/Entities/Actions/GlitchBreach": 3674,
	"./Objects/Entities/Actions/GlitchBreach.ts": 3674,
	"./Objects/Entities/Actions/GlitchDeath": 6315,
	"./Objects/Entities/Actions/GlitchDeath.ts": 6315,
	"./Objects/Entities/Actions/GlitchLife": 6357,
	"./Objects/Entities/Actions/GlitchLife.ts": 6357,
	"./Objects/Entities/Actions/GoEast": 7192,
	"./Objects/Entities/Actions/GoEast.ts": 7192,
	"./Objects/Entities/Actions/GoNorth": 7415,
	"./Objects/Entities/Actions/GoNorth.ts": 7415,
	"./Objects/Entities/Actions/GoSouth": 3535,
	"./Objects/Entities/Actions/GoSouth.ts": 3535,
	"./Objects/Entities/Actions/GoWest": 4834,
	"./Objects/Entities/Actions/GoWest.ts": 4834,
	"./Objects/Entities/Actions/Help": 3256,
	"./Objects/Entities/Actions/Help.ts": 3256,
	"./Objects/Entities/Actions/IncrementMyState": 9211,
	"./Objects/Entities/Actions/IncrementMyState.ts": 9211,
	"./Objects/Entities/Actions/IncrementState": 3306,
	"./Objects/Entities/Actions/IncrementState.ts": 3306,
	"./Objects/Entities/Actions/Listen": 7576,
	"./Objects/Entities/Actions/Listen.ts": 7576,
	"./Objects/Entities/Actions/Look": 2741,
	"./Objects/Entities/Actions/Look.ts": 2741,
	"./Objects/Entities/Actions/MeleeKill": 2900,
	"./Objects/Entities/Actions/MeleeKill.ts": 2900,
	"./Objects/Entities/Actions/PauseSimulation": 4359,
	"./Objects/Entities/Actions/PauseSimulation.ts": 4359,
	"./Objects/Entities/Actions/PickupObject": 9936,
	"./Objects/Entities/Actions/PickupObject.ts": 9936,
	"./Objects/Entities/Actions/RemoveThemeFromObject": 9418,
	"./Objects/Entities/Actions/RemoveThemeFromObject.ts": 9418,
	"./Objects/Entities/Actions/RemoveThemeFromRoom": 7337,
	"./Objects/Entities/Actions/RemoveThemeFromRoom.ts": 7337,
	"./Objects/Entities/Actions/ResumeSimulation": 2042,
	"./Objects/Entities/Actions/ResumeSimulation.ts": 2042,
	"./Objects/Entities/Actions/Smell": 3834,
	"./Objects/Entities/Actions/Smell.ts": 3834,
	"./Objects/Entities/Actions/SpawnObjectAtFeet": 8884,
	"./Objects/Entities/Actions/SpawnObjectAtFeet.ts": 8884,
	"./Objects/Entities/Actions/SpawnObjectFromThemeUnderFloorAtFeet": 2888,
	"./Objects/Entities/Actions/SpawnObjectFromThemeUnderFloorAtFeet.ts": 2888,
	"./Objects/Entities/Actions/StopMoving": 4469,
	"./Objects/Entities/Actions/StopMoving.ts": 4469,
	"./Objects/Entities/Actions/Taste": 8520,
	"./Objects/Entities/Actions/Taste.ts": 8520,
	"./Objects/Entities/Actions/Think": 5639,
	"./Objects/Entities/Actions/Think.ts": 5639,
	"./Objects/Entities/Blorbos/ChickenFriend": 5095,
	"./Objects/Entities/Blorbos/ChickenFriend.ts": 5095,
	"./Objects/Entities/Blorbos/Devona": 9621,
	"./Objects/Entities/Blorbos/Devona.ts": 9621,
	"./Objects/Entities/Blorbos/End": 8115,
	"./Objects/Entities/Blorbos/End.ts": 8115,
	"./Objects/Entities/Blorbos/EyeKiller": 2937,
	"./Objects/Entities/Blorbos/EyeKiller.ts": 2937,
	"./Objects/Entities/Blorbos/JR": 7455,
	"./Objects/Entities/Blorbos/JR.ts": 7455,
	"./Objects/Entities/Blorbos/Match": 7685,
	"./Objects/Entities/Blorbos/Match.ts": 7685,
	"./Objects/Entities/Blorbos/Neville": 3668,
	"./Objects/Entities/Blorbos/Neville.ts": 3668,
	"./Objects/Entities/Blorbos/Peewee": 936,
	"./Objects/Entities/Blorbos/Peewee.ts": 936,
	"./Objects/Entities/Blorbos/Quotidian": 6387,
	"./Objects/Entities/Blorbos/Quotidian.ts": 6387,
	"./Objects/Entities/Blorbos/SnailFriend": 240,
	"./Objects/Entities/Blorbos/SnailFriend.ts": 240,
	"./Objects/Entities/Blorbos/Solemn": 5322,
	"./Objects/Entities/Blorbos/Solemn.ts": 5322,
	"./Objects/Entities/Blorbos/Underscore": 9194,
	"./Objects/Entities/Blorbos/Underscore.ts": 9194,
	"./Objects/Entities/Blorbos/Yongki": 3908,
	"./Objects/Entities/Blorbos/Yongki.ts": 3908,
	"./Objects/Entities/StoryBeats/BaseBeat": 1708,
	"./Objects/Entities/StoryBeats/BaseBeat.ts": 1708,
	"./Objects/Entities/StoryBeats/FriendlyAiBeat": 7717,
	"./Objects/Entities/StoryBeats/FriendlyAiBeat.ts": 7717,
	"./Objects/Entities/TargetFilter/IHaveObjectWithName": 6274,
	"./Objects/Entities/TargetFilter/IHaveObjectWithName.ts": 6274,
	"./Objects/Entities/TargetFilter/IHaveObjectWithTheme": 2146,
	"./Objects/Entities/TargetFilter/IHaveObjectWithTheme.ts": 2146,
	"./Objects/Entities/TargetFilter/RandomTarget": 9824,
	"./Objects/Entities/TargetFilter/RandomTarget.ts": 9824,
	"./Objects/Entities/TargetFilter/TargetExistsInAWorldWhereBlorboWithNameIsAlive": 4186,
	"./Objects/Entities/TargetFilter/TargetExistsInAWorldWhereBlorboWithNameIsAlive.ts": 4186,
	"./Objects/Entities/TargetFilter/TargetHasObjectWithName": 4864,
	"./Objects/Entities/TargetFilter/TargetHasObjectWithName.ts": 4864,
	"./Objects/Entities/TargetFilter/TargetHasObjectWithTheme": 9093,
	"./Objects/Entities/TargetFilter/TargetHasObjectWithTheme.ts": 9093,
	"./Objects/Entities/TargetFilter/TargetHasTheme": 2615,
	"./Objects/Entities/TargetFilter/TargetHasTheme.ts": 2615,
	"./Objects/Entities/TargetFilter/TargetIsAlive": 7064,
	"./Objects/Entities/TargetFilter/TargetIsAlive.ts": 7064,
	"./Objects/Entities/TargetFilter/TargetIsBlorboBox": 4068,
	"./Objects/Entities/TargetFilter/TargetIsBlorboBox.ts": 4068,
	"./Objects/Entities/TargetFilter/TargetIsNearObjectWithName": 9587,
	"./Objects/Entities/TargetFilter/TargetIsNearObjectWithName.ts": 9587,
	"./Objects/Entities/TargetFilter/TargetIsNearObjectWithTheme": 83,
	"./Objects/Entities/TargetFilter/TargetIsNearObjectWithTheme.ts": 83,
	"./Objects/Entities/TargetFilter/TargetIsWithinRadiusOfSelf": 5535,
	"./Objects/Entities/TargetFilter/TargetIsWithinRadiusOfSelf.ts": 5535,
	"./Objects/Entities/TargetFilter/TargetIstheKillerOfBlorboNamed": 7082,
	"./Objects/Entities/TargetFilter/TargetIstheKillerOfBlorboNamed.ts": 7082,
	"./Objects/Entities/TargetFilter/TargetNameIncludesAnyOfTheseWords": 4165,
	"./Objects/Entities/TargetFilter/TargetNameIncludesAnyOfTheseWords.ts": 4165,
	"./Objects/Entities/TargetFilter/baseFilter": 9505,
	"./Objects/Entities/TargetFilter/baseFilter.ts": 9505,
	"./Objects/Entities/TargetFilter/test": 1522,
	"./Objects/Entities/TargetFilter/test.ts": 1522,
	"./Objects/Memory": 7953,
	"./Objects/Memory.ts": 7953,
	"./Objects/MovementAlgs/BaseMovement": 9059,
	"./Objects/MovementAlgs/BaseMovement.ts": 9059,
	"./Objects/MovementAlgs/MoveToEastDoor": 1146,
	"./Objects/MovementAlgs/MoveToEastDoor.ts": 1146,
	"./Objects/MovementAlgs/MoveToNorthDoor": 6003,
	"./Objects/MovementAlgs/MoveToNorthDoor.ts": 6003,
	"./Objects/MovementAlgs/MoveToSouthDoor": 9380,
	"./Objects/MovementAlgs/MoveToSouthDoor.ts": 9380,
	"./Objects/MovementAlgs/MoveToSpecificElement": 4476,
	"./Objects/MovementAlgs/MoveToSpecificElement.ts": 4476,
	"./Objects/MovementAlgs/MoveToSpecificLocation": 7805,
	"./Objects/MovementAlgs/MoveToSpecificLocation.ts": 7805,
	"./Objects/MovementAlgs/MoveToSpecificPhysicalObject": 8455,
	"./Objects/MovementAlgs/MoveToSpecificPhysicalObject.ts": 8455,
	"./Objects/MovementAlgs/MoveToWestDoor": 9991,
	"./Objects/MovementAlgs/MoveToWestDoor.ts": 9991,
	"./Objects/MovementAlgs/NoMovement": 4956,
	"./Objects/MovementAlgs/NoMovement.ts": 4956,
	"./Objects/MovementAlgs/RandomMovement": 5997,
	"./Objects/MovementAlgs/RandomMovement.ts": 5997,
	"./Objects/MovementAlgs/SteadyMovement": 1148,
	"./Objects/MovementAlgs/SteadyMovement.ts": 1148,
	"./Objects/PhysicalObject": 8466,
	"./Objects/PhysicalObject.ts": 8466,
	"./Objects/RoomEngine/ChantingEngine": 7936,
	"./Objects/RoomEngine/ChantingEngine.ts": 7936,
	"./Objects/RoomEngine/FRIEND/FRIEND": 4769,
	"./Objects/RoomEngine/FRIEND/FRIEND.ts": 4769,
	"./Objects/RoomEngine/Maze": 7194,
	"./Objects/RoomEngine/Maze.ts": 7194,
	"./Objects/RoomEngine/Room": 6202,
	"./Objects/RoomEngine/Room.ts": 6202,
	"./Objects/RoomEngine/StoryBeat": 5504,
	"./Objects/RoomEngine/StoryBeat.ts": 5504,
	"./Objects/Stat": 9137,
	"./Objects/Stat.ts": 9137,
	"./Objects/Theme": 9702,
	"./Objects/Theme.ts": 9702,
	"./Objects/ThemeStorage": 1288,
	"./Objects/ThemeStorage.ts": 1288,
	"./Secrets/Apocalypse": 3790,
	"./Secrets/Apocalypse.ts": 3790,
	"./Secrets/Content/0": 6243,
	"./Secrets/Content/0.js": 6243,
	"./Secrets/Content/1": 6489,
	"./Secrets/Content/1.js": 6489,
	"./Secrets/Content/10": 8591,
	"./Secrets/Content/10.js": 8591,
	"./Secrets/Content/11": 8937,
	"./Secrets/Content/11.js": 8937,
	"./Secrets/Content/12": 7270,
	"./Secrets/Content/12.js": 7270,
	"./Secrets/Content/13": 4012,
	"./Secrets/Content/13.js": 4012,
	"./Secrets/Content/14": 4574,
	"./Secrets/Content/14.js": 4574,
	"./Secrets/Content/15": 9377,
	"./Secrets/Content/15.js": 9377,
	"./Secrets/Content/16": 8715,
	"./Secrets/Content/16.js": 8715,
	"./Secrets/Content/17": 6765,
	"./Secrets/Content/17.js": 6765,
	"./Secrets/Content/18": 3314,
	"./Secrets/Content/18.js": 3314,
	"./Secrets/Content/19": 1714,
	"./Secrets/Content/19.js": 1714,
	"./Secrets/Content/2": 8180,
	"./Secrets/Content/2.js": 8180,
	"./Secrets/Content/20": 121,
	"./Secrets/Content/20.js": 121,
	"./Secrets/Content/21": 5375,
	"./Secrets/Content/21.js": 5375,
	"./Secrets/Content/22": 2451,
	"./Secrets/Content/22.js": 2451,
	"./Secrets/Content/23": 4016,
	"./Secrets/Content/23.js": 4016,
	"./Secrets/Content/24": 4693,
	"./Secrets/Content/24.js": 4693,
	"./Secrets/Content/25": 4939,
	"./Secrets/Content/25.js": 4939,
	"./Secrets/Content/26": 3875,
	"./Secrets/Content/26.js": 3875,
	"./Secrets/Content/27": 1370,
	"./Secrets/Content/27.js": 1370,
	"./Secrets/Content/28": 2664,
	"./Secrets/Content/28.js": 2664,
	"./Secrets/Content/29": 3702,
	"./Secrets/Content/29.js": 3702,
	"./Secrets/Content/3": 3052,
	"./Secrets/Content/3.js": 3052,
	"./Secrets/Content/30": 4453,
	"./Secrets/Content/30.js": 4453,
	"./Secrets/Content/31": 7253,
	"./Secrets/Content/31.js": 7253,
	"./Secrets/Content/33": 280,
	"./Secrets/Content/33.js": 280,
	"./Secrets/Content/34": 9558,
	"./Secrets/Content/34.js": 9558,
	"./Secrets/Content/35": 9699,
	"./Secrets/Content/35.js": 9699,
	"./Secrets/Content/36": 1578,
	"./Secrets/Content/36.js": 1578,
	"./Secrets/Content/37": 9241,
	"./Secrets/Content/37.js": 9241,
	"./Secrets/Content/38": 8705,
	"./Secrets/Content/38.js": 8705,
	"./Secrets/Content/39": 1939,
	"./Secrets/Content/39.js": 1939,
	"./Secrets/Content/4": 2892,
	"./Secrets/Content/4.js": 2892,
	"./Secrets/Content/42": 2035,
	"./Secrets/Content/42.js": 2035,
	"./Secrets/Content/43": 6904,
	"./Secrets/Content/43.js": 6904,
	"./Secrets/Content/44": 6645,
	"./Secrets/Content/44.js": 6645,
	"./Secrets/Content/5": 1952,
	"./Secrets/Content/5.js": 1952,
	"./Secrets/Content/6": 1178,
	"./Secrets/Content/6.js": 1178,
	"./Secrets/Content/7": 8791,
	"./Secrets/Content/7.js": 8791,
	"./Secrets/Content/8": 4997,
	"./Secrets/Content/8.js": 4997,
	"./Secrets/Content/9": 842,
	"./Secrets/Content/9.js": 842,
	"./Secrets/PasswordStorage": 9867,
	"./Secrets/PasswordStorage.ts": 9867,
	"./Secrets/Transcript": 8122,
	"./Secrets/Transcript.ts": 8122,
	"./Secrets/TypingMinigame": 8048,
	"./Secrets/TypingMinigame.ts": 8048,
	"./Utils/ArrayUtils": 3907,
	"./Utils/ArrayUtils.ts": 3907,
	"./Utils/LocalStorageUtils": 5565,
	"./Utils/LocalStorageUtils.ts": 5565,
	"./Utils/NonSeededRandUtils": 8258,
	"./Utils/NonSeededRandUtils.ts": 8258,
	"./Utils/SeededRandom": 3450,
	"./Utils/SeededRandom.ts": 3450,
	"./Utils/StringUtils": 7036,
	"./Utils/StringUtils.ts": 7036,
	"./Utils/URLUtils": 389,
	"./Utils/URLUtils.ts": 389,
	"./Utils/constants": 8817,
	"./Utils/constants.ts": 8817,
	"./Utils/misc": 4079,
	"./Utils/misc.ts": 4079,
	"./index": 3607,
	"./index.ts": 3607
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 8116;

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(3607);
/******/ 	
/******/ })()
;