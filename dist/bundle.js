/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 953:
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

/***/ 137:
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

/***/ 702:
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
const Stat = __importStar(__webpack_require__(137));
const ThemeStorage = __importStar(__webpack_require__(288));
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

/***/ 288:
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
const constants_1 = __webpack_require__(817);
const Memory_1 = __webpack_require__(953);
const Stat = __importStar(__webpack_require__(137));
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
    exports.floor_foregrounds[exports.DECAY] = [{ src: "hydration_station.png", desc: "You go to take a sip of the water before realizing it's filled with maggots." }, { src: "Decay_Object.png", desc: "I wonder if they're poisonous?" }, { src: "corpse_blossom.png", desc: "It stinks of death and decay." }, { src: "webshelves.png", desc: "These shelves haven't been able to hold anything for a long time." }, { src: "webtable.png", desc: "What could be trapped in here, you wonder?" }, { src: "webtable2.png", desc: "You peer into its cracks but see nothing inside." }, { src: "deadbush.png", desc: "The bush is rotting." }, { src: "deadtree.png", desc: "What did this look like when it was alive, you wonder." }, { src: "decay_is_an_extant_form_of_life.png", desc: "In your heart you know decay is an extant form of life." }, { src: "decayedwebbox.png", desc: "This rotten box can't be used to hold anything anymore." }, { src: "decayingbarrel.png", desc: "The barrel stinks of fermentation and rot." }, { src: "grave.png", desc: "You wonder who is buried and rotting here." }, { src: "shittycot.png", desc: "The cot stinks of rot." }];
    exports.floor_foregrounds[exports.BUGS] = [{ src: "waspnest2.png", desc: "There is a wasp nest here." }, { src: "bees4.png", desc: "The bees are buzzing and crawling and flying everwhere." }, { src: "bees.png", desc: "The Swarm is judging you." }, { src: "bees3.png", desc: "Incessent buzzing." }, { src: "bees2.png", desc: "You skin crawls just looking at these buzzing insects." }, { src: "waspnest1.png", desc: "There is a wasp nest here. It is filled with holes." }, { src: "waspnest3.png", desc: "If you let the inhabitants of this waspnest love you, you could be a nest, too." }, { src: "ruined_honey.png", desc: "Someone has already raided this bee hive." }, { src: "ruined_wasp_nest.png", desc: "Who destroyed this wasp nest?" }, { src: "wasp.png", desc: "It seems to be a large statue of a wasp." }];
    exports.floor_foregrounds[exports.LOVE] = [{ src: "Love_Object.png", desc: "Fragile Concept." }, { src: "wine2.png", desc: "If only there was someone to share this with." }, { src: "wine.png", desc: "Oh to be on a picnic with someone you love." }, { src: "necklace.png", desc: "Someone beautiful could wear this." }, { src: "jwelerybox.png", desc: "A cherished gift." }, { src: "flowers.png", desc: "A gift for a significant other." }, { src: "dress.png", desc: "Just looking at this pretty dress makes you wish you could remember going to dances." }, { src: "angelstatue.png", desc: "Love is war." }, { src: "bear.png", desc: "It feels soft and cuddly." },];
    exports.floor_foregrounds[exports.STEALING] = [{ src: "Stealing_Object.png", desc: "[Right Click, Save Image]" }, { src: "cookingpot.png", desc: "Reminds you of being on the run from the law." }, { src: "fancychest.png", desc: "You wonder what kind of loot is in here." }, { src: "goldingots.png", desc: "There is NO way you're going to be able to carry these out of here." }, { src: "jwelerybox.png", desc: "A tidy fortune in jewels." }, { src: "necklace.png", desc: "You wonder how much this would be worth on the blackmarket." }, { src: "pileofgold1.png", desc: "You are practically drooling seeing so much gold." }, { src: "pileofgold2.png", desc: "You want to bathe in this like Scrooge McDuck." }, { src: "pileofgoldsmaller.png", desc: "What could you buy with this?" }, { src: "smallgoldpile.png", desc: "A modest fortune yours for the taking." }];
    exports.floor_foregrounds[exports.LANGUAGE] = [{ src: "writingtablet.png", desc: "A forgotten language is perfectly translated here for you." }, { src: "smallbookshelf.png", desc: "It's all your favorite childhood books." }, { src: "obelisk.png", desc: "It's a rosetta stone for every language reading out 'Zampanio is a really good game. You should play it.'" }, { src: "books.png", desc: "Language is used masterfully in these volumes of poetry." }, { src: "books.png", desc: "Somehow each book claims you are the author." }, { src: "bigbookshelf.png", desc: "All of the literary classics." }, { src: "bigbookshelf.png", desc: "Dozens upon dozens of books in every language." }];
    exports.floor_foregrounds[exports.KNOWING] = [{ src: "Knowing_Object.png", desc: "I know something you don't." }, { src: "writingtablet.png", desc: "You need to know more." }, { src: "writingtablet.png", desc: "The thoughts currently in your head are perfectly etched here." }, { src: "smallbookshelf.png", desc: "The tomes list out the forgotten secrets of every civilization." }, { src: "scrolls.png", desc: "Forbidden knowledge floods your mind and you can't Unknow it." }, { src: "books.png", desc: "Spoilers for all of fiction is somehow contained in these few volumes." }, { src: "books.png", desc: "The thoughts of everyone you've ever known are detailed here." }, { src: "bigbookshelf.png", desc: "Everything you would need to perfectly navigate this maze is listed here, if only you could remember it." }, { src: "bigbookshelf.png", desc: "The identity of the Eye Killer is here, long past the point where you could use it." }];
    exports.floor_foregrounds[exports.ROYALTY] = [{ src: "Royal_Object.png", desc: "Long Live The... The... Is dead." }, { src: "jwelerybox.png", desc: "Crown jewels." }, { src: "pileofgold2.png", desc: "The wealth of an Empire." }, { src: "pileofgold1.png", desc: "The wealth of a kingdom." }, { src: "princessbed.png", desc: "A bed fit for royalty." }, { src: "smallgoldpile.png", desc: "The taxes you are due." }, { src: "throne.png", desc: "Your rightful place." }];
    exports.floor_foregrounds[exports.SCIENCE] = [{ src: "Science_Object.png", desc: "A beaker of perfectly generic fluid." }, { src: "smallbookshelf.png", desc: "Textbooks organized by scientific discipline line these shelves." }, { src: "science.png", desc: "Oh, the discoveries you could make with enough patience and equipment." }, { src: "morewine.png", desc: "You get the distinct urge to do science seeing this well stocked lab." }, { src: "jars.png", desc: "Specimen jars." }];
    exports.floor_foregrounds[exports.CRAFTING] = [{ src: "Crafting_Object.png", desc: "Just a little bit of tape..." }, { src: "armor3.png", desc: "A master made this armor, you can tell." }, { src: "armor2.png", desc: "You frown as you study the flaws of this piece of armor." }, { src: "armor.png", desc: "You appreciate the craftsmanship here." }, { src: "hammer.png", desc: "The heft of this hammer is just perfect for forging." }, { src: "metalingots.png", desc: "Fresh ingots ripe for being turned into more useful materials." }, { src: "pickax.png", desc: "You feel the strange urge to craft some mines." }, { src: "shovel.png", desc: "You just want to turn the soil with your hands and MAKE something with it." }, { src: "stumpwithax.png", desc: "You feel a distinct urge to go chop some trees." }, { src: "well.png", desc: "Enough water to cool a thousand forges." }];
    exports.floor_foregrounds[exports.BURIED] = [{ src: "Buried_Object.png", desc: "X Marks the Spot." }, { src: "grave.png", desc: "You hear faint scratching from underneath." }, { src: "grave.png", desc: "You could sleep under here forever buried." }, { src: "pickax.png", desc: "With this you could dig and dig and dig deep into the earth until no one could ever save you." }, { src: "pit.png", desc: "The warm embrace of the earth awaits. Why must you cling so to the cold, unforgiving sky?" }, { src: "pit2.png", desc: "Down and down it goes. You want to jump in." }, { src: "well.png", desc: "It goes so deep into the earth. You cannot see the bottom. The concept of a bottom is anathema to this well." }, { src: "shovel.png", desc: "DIG" }];
    exports.floor_foregrounds[exports.ANGELS] = [{ src: "Angel_Object.png", desc: "Do you hear the tintinnabulation?" }, { src: "writingtablet.png", desc: "The words of your gods are written here." }, { src: "obelisk.png", desc: "It lists out the praises of the gods." }, { src: "jars.png", desc: "Jars of holy water." }, { src: "iceglacier.png", desc: "It feels holy." }, { src: "angelstatue.png", desc: "The angels bless you." }];
    exports.floor_foregrounds[exports.PLANTS] = [{ src: "Plants_Object2.png", desc: "What a terrible place to try and grow..." }, { src: "Plants_Object1.png", desc: "What a terrible place to try and grow..." }, { src: "yellowflowers.png", desc: "Weeds, but pretty ones." }, { src: "wildflowers.png", desc: "These flowers grow with no human hand." }, { src: "tallpottedplant.png", desc: "It seems healthy, though confined." }, { src: "shovel.png", desc: "Did someone leave it here after planting something?" }, { src: "pinetree.png", desc: "You wonder how trees manage to grow inside this labyrinth." }, { src: "grass.png", desc: "Surprisingly fertile soil produces this clump of grass." }, { src: "flowers.png", desc: "Beautiful flowers. Pointless flowers." }, { src: "fern.png", desc: "For an instant, you think this might be some sort of...creature. But no. Just a fern." }, { src: "cactus2.png", desc: "The most tsundere of plants." }, { src: "cactus.png", desc: "You don't think it can talk. You aren't sure why this disappoints you." }, { src: "cabbages.png", desc: "These cabbages are well grown." }];
    exports.floor_foregrounds[exports.WEB] = [{ src: "webzampiano.png", desc: "Your body positions itself in front of it and begins playing a jaunty tune on it." }, { src: "webwine2.png", desc: "Will you choose to give up control of your body?" }, { src: "webwine.png", desc: "Spiders desperately scrabble for purchase at the surface of the liquid. Some have already drowned and sunk to the bottom of the bottle." }, { src: "webvanity.png", desc: "Your hands jerkily go through the motions of putting makeup on." }, { src: "webthrone.png", desc: "Are even Ruler's immune from the pressures of society?" }, { src: "webtable3.png", desc: "Small bugs are trapped here." }, { src: "webtable2.png", desc: "You see shadows moving inside." }, { src: "webtable.png", desc: "What could this trap?" }, { src: "websword2.png", desc: "Long abandoned." }, { src: "websword1.png", desc: "Bad things will happen if you touch it." }, { src: "webswords.png", desc: "Who laid them here so carefully together?" }, { src: "webshield.png", desc: "You are frozen in the certainty that if you were to pick this up, threads would bind it forever to your body." }, { src: "webshelves.png", desc: "Society puppets you into keeping things maintained." }, { src: "webscrolls.png", desc: "What is knowlege but a means to manipulate others?" }, { src: "webpot.png", desc: "It's filled with spiders." }, { src: "weborgan.png", desc: "It plays a haunting melody all on its own, as gossamer threads tug on the keys." }, { src: "webbooks.png", desc: "If you read all these books you will be dancing to the collector tune." }, { src: "webmoney.png", desc: "What is money but chains?" }, { src: "webjars.png", desc: "Small spiders scuttle inside, endlessly trying to climb up the smooth glass then falling down." }, { src: "webjam.png", desc: "Evolution has programmed you to prefer dense caloric options." }, { src: "webfortune.png", desc: "We are all bound by fate." }, { src: "webflower.png", desc: "Gifts are classic ways to manipulate others." }, { src: "webeggs.png", desc: "You can see shadows moving inside the eggs. Occasionally they twitch." }, { src: "webdragon.png", desc: "Even the most powerful among us are powerless in the face of traps and manipulation." }, { src: "webbooks.png", desc: "What are words but a way to control others?" }, { src: "webbing4.png", desc: "What could possibly make such a huge web?" }, { src: "webbing3.png", desc: "It looks like Mr. Spider is not home." }, { src: "webbing.png", desc: "Tiny spiders work tirelessly to spin more of this web." }, { src: "webbarrell.png", desc: "More laughs than a barrel of spiders." }, { src: "scarecrow2.png", desc: "Almost invisible threads jerk and tug it in a variety of directions. It seems to be in pain." }, { src: "scarecrow.png", desc: "Nearly invisible threads connect to each of its joints. It isn't moving, but you aren't sure it will stay that way." }];
    exports.floor_foregrounds[exports.KILLING] = [{ src: "knife.png", desc: "Knife goes in. Blood comes out. It's that simple." }, { src: "violentbed.png", desc: "A fight happened here." }, { src: "webswords.png", desc: "There is clarity in killing. The why doesn't matter, only the how." }, { src: "swords.png", desc: "You could kill a lot of people with these." }, { src: "swordanvil.png", desc: "A weapon has only one purpose: killing." }, { src: "stumpwithax.png", desc: "You feel the inexplicable urge to write 'All Work And No Play Makes Johnny A Dull Boy' over and over again." }, { src: "pickax.png", desc: "You could really do some damage to someone's skull with this." }, { src: "choppingblock.png", desc: "You almost wish you weren't alone in this maze, just so you could test this knife out." }, { src: "boxoknives.png", desc: "You could really do some damage to someone with all these knives." }, { src: "bloodfountain.png", desc: "You feel the inexplicable urge to bathe in this." }];
    exports.floor_foregrounds[exports.FLESH] = [{ src: "Flesh_Object2.png", desc: "It pulsates gently." }, { src: "Flesh_Object.png", desc: "The beefy arm is waving at you in between flexing." }, { src: "skeleton1.png", desc: "You think you could make a pretty decent bone broth from this." }, { src: "skeleton2.png", desc: "In the end we are all just meat hanging off bones." }, { src: "ham.png", desc: "Meat is meat." }, { src: "turkey.png", desc: "It smells delicious. It was alive once, as you are now. You'll smell delicious, too, one day." }, { src: "meatslabs.png", desc: "Meat is me." }, { src: "meatgrinder.png", desc: "You slowly feed your right arm into it and watch the ribbons of flesh pour out the other end." }, { src: "meatchops.png", desc: "They are grown from your own cells, you can feel this in your bones." }, { src: "meatchops.png", desc: "This doesn't look quite like pork.  Somehow, that unsettles you." }, { src: "fishcrate.png", desc: "Your flesh isn't fundamentally different than the flesh of these fish." }, { src: "cookingpot.png", desc: "Something savory and meaty wafts out." }, { src: "choppingblock.png", desc: "It's incredible what a good quality butcher's knife can do to meat." }, { src: "butcheredmeat.png", desc: "In the end we are nothing more than meat." }];
    exports.floor_foregrounds[exports.APOCALYPSE] = [{ src: "Apocalypse_Object.png", desc: "This doll house scale ruined building would be cute if it weren't for the smell emanating from it..." }, { src: "fossil1.png", desc: "As death is a natural and inevitable part of life, extinction is the natural fate of all worlds." }, { src: "fossil2.png", desc: "There are entire species consisting solely of the dead." }, { src: "fossil3.png", desc: "For ever species we know have vanished, how many thousands extinguished without a sound? " }, { src: "fossil4.png", desc: "As Death comes to all beings, Extinction comes to all species." }, { src: "fossil5.png", desc: "How impossibly lucky is this creature, for their bones to survive epochs?" }, { src: "fossil6.png", desc: "To fear Extinction is to fear inevitability." }, { src: "fossil7.png", desc: "What entire ecosystems lived and died before you took your first breath?" }, { src: "science.png", desc: "Just enough knowledge to destroy it all." }, { src: "webooks.png", desc: "How long will the works of man outlast us?" }];
    exports.floor_foregrounds[exports.ENDINGS] = [{ src: "Endings_Object_2.png", desc: "Stop. Please." }, { src: "Ending_Object.png", desc: "The End" }, { src: "grave.png", desc: "The End." }, { src: "guidepost.png", desc: "All ways lead to dead ends." }, { src: "lamppost.png", desc: "Why are lampopsts so often signifiers of endings?" }, { src: "skeleton1.png", desc: "There is a serenity in knowing how the story ends." }, { src: "skeletons.png", desc: "Did they know their ends would be so similar?" }, { src: "skull.png", desc: "The path differes, but the end is always the same." }, { src: "skull3.png", desc: "We all end the same." }, { src: "webbooks.png", desc: "All the pages are torn out save the last." }, { src: "webooks.png", desc: "Every book within is blank, save the last page." }, { src: "writingtablet.png", desc: "It lists out the last thought you and everyone you ever met will ever have." }];
    exports.floor_foregrounds[exports.DEATH] = [{ src: "Death_Object.png", desc: "This status of Death seems uninterested in your plight." }, { src: "chessset.png", desc: "Do you dare cheat death?" }, { src: "bonepile.png", desc: "Death is the great equalizer." }, { src: "grave.png", desc: "This is not your fate. But no one is beyond Death." }, { src: "skeleton1.png", desc: "Meat is meat." }, { src: "skeleton2.png", desc: "Memento mori." }, { src: "skeletons.png", desc: "At least they died together." }, { src: "skull.png", desc: "It was inevitable they would die." }, { src: "skull3.png", desc: "Meat is meat." }, { src: "violentbed.png", desc: "Most people die in beds." }, { src: "hospitalbed.png", desc: "Someone died here." }, { src: "grave.png", desc: "It simply says 'everyone' on it." }, { src: "grave.png", desc: "It is yours." }, { src: "grave.png", desc: "It's inscription is too worn with age to read." }, { src: "grave.png", desc: "Somehow you know it has the name of your best friend." }, { src: "grave.png", desc: "If you had a family, they would be listed here, you're sure of it." }, { src: "grave.png", desc: "It has your name on it." }, { src: "decayingbarrel.png", desc: "Even the works of man eventually die." }, { src: "deadtree.png", desc: "You wonder what killed it before you remember it doesn't matter." }, { src: "deadbush.png", desc: "A reminder that death comes to us all." }, { src: "corpse_blossom.png", desc: "It reeks of death." }, { src: "angelstatue.png", desc: "In your bones you know no beautific afterlife awaits." }];
    exports.floor_foregrounds[exports.CLOWNS] = [{ src: "jwelerybox.png", desc: "Clown jewels." }, { src: "Clown_Object.png", desc: "Honk honk! +u+" }, { src: "toybox.png", desc: "Laughter rings out anytime you touch this box." }, { src: "jackinaboxopen.png", desc: "Sourceless laughter peels out across the room as you jump in surprise when the jack springs out." }, { src: "jackinaboxclosed.png", desc: "It's hilarious how much anxiety the anticipation of a closed jack in the box causes." }, { src: "gift.png", desc: "When you go to open it it explodes into confetti." }, { src: "balloon5.png", desc: "A sign of life." }, { src: "balloon4.png", desc: "Surely someone must have filled these within the past day or two if they're still floating, right?" }, { src: "balloon3.png", desc: "You wonder how they float." }, { src: "balloon2.png", desc: "It feels like it might pop at any moment." }, { src: "balloon1.png", desc: "How whimsical." }];
    exports.floor_foregrounds[exports.DOLLS] = [{ src: "Dolls_Object.png", desc: "This Doll Recites:" }, { src: "jr_doll.png", desc: "There's something cathartic in having power over old JR." }, { src: "toytrain.png", desc: "Choo choo! Jaimie would be proud." }, { src: "toysoldiersmall.png", desc: "It's okay. You'll be his friend." }, { src: "toysoldierlarge.png", desc: "He seems to be made of wax. His eyes are wrong, though." }, { src: "toyshelves.png", desc: "So many toys, it almost makes you wish you could be nostalgic." }, { src: "toyregiment.png", desc: "Each time you look away they are a single step closer." }, { src: "toydummerboy.png", desc: "Any time you look away you hear a single beat of his drum." }, { src: "toybox.png", desc: "All sorts of fun to be had in here." }, { src: "toyarmy.png", desc: "Oh." }, { src: "teapot.png", desc: "If only you had some toys, you could host a little teaparty." }, { src: "teachustheinsides.png", desc: "Screams are coming from inside." }, { src: "snowman.png", desc: "You know its heart yearns to look more human. What would it have to steal to get there." }, { src: "scarecrow2.png", desc: "It waits." }, { src: "scarecrow.png", desc: "You're suddenly certain it is just choosing not to move." }, { src: "princessbed.png", desc: "And adorable bed you just want to cover with stuffed animals and dolls." }, { src: "jackinaboxopen.png", desc: "You feel something touching your leg, but when you look down i's just this Jack In a Box." }, { src: "jackinaboxclosed.png", desc: "You hear something moving inside." }, { src: "hobbyhorse.png", desc: "Its eyes seem alive, and in pain." }, { src: "gumballmachine.png", desc: "Delicious sweets." }, { src: "dress.png", desc: "A dress in need of a doll." }, { src: "dollhouse.png", desc: "The dolls inside are all missing." }, { src: "doll.png", desc: "Someone must miss her terribly." }, { src: "doll.png", desc: "Scrawled on her face is 'will you be my mother?'" }, { src: "doll.png", desc: "She is watching you." }, { src: "chessset.png", desc: "It looks like a fun game." }, { src: "bear.png", desc: "Every time you look away it seems to be in a different pose." }, { src: "balloon1.png", desc: "There's little people inside, waving at you." }, { src: "armor.png", desc: "Did it just move when you weren't looking?" }, { src: "angelstatue.png", desc: "Her eyes seem to watch you." }];
    exports.floor_foregrounds[exports.TWISTING] = [{ src: "zampanio_flowerkid_by_hex2.png", desc: "How do sprite sheets work???" }, { src: "Twisting_Object.png", desc: "Hee Hee Hee Hee Hee" }, { src: "jr_lobstersona.png", desc: "This is not JR." }, { src: "jr_slug.png", desc: "This is not JR." }, { src: "aluminum.png", desc: "This is not JR." }, { src: "JadedResearcher.png", desc: "This is not JR." }, { src: "jr_doll.png", desc: "This is not JR." }];
    exports.floor_foregrounds[exports.TECHNOLOGY] = [{ src: "laundry.png", desc: "Modern technology sure is convinient!" }, { src: "laptop.png", desc: "The battery seems to be completely dead." }, { src: "printer.png", desc: "You feel the irrational urge to destroy this flawless piece of technology." }];
    exports.floor_foregrounds[exports.SERVICE] = [{ src: "hydration_station.png", desc: "You wonder if anyone around here is thirsty..." }, { src: "cookingpot.png", desc: "Is it time for you to cook dinner?" }, { src: "plates.png", desc: "Are you supposed to clean these dishes?" }, { src: "laundry.png", desc: "You can't remember the last time you've done laundry." }, { src: "Service_Object.png", desc: "Ring Bell For Service." }];
    exports.floor_foregrounds[exports.ADDICTION] = [{ src: "webwine2.png", desc: "you really don't want to touch it." }, { src: "webwine.png", desc: "Its a good thing this wine looks so gross." }, { src: "wineshelves.png", desc: "You're not tempted by these." }, { src: "beer.png", desc: "Probably shouldn't." }, { src: "morewine.png", desc: "Best not to." }, { src: "teapot.png", desc: "Caffeine is bad for you." }, { src: "Addiction_Object.png", desc: "A difficult subject." }];
    exports.floor_foregrounds[exports.LIGHT] = [{ src: "lamppost.png", desc: "It spreads its light over a vast area. It makes you feel safe." }, { src: "lamp.png", desc: "It's soothing and bright." }, { src: "Light_Object.png", desc: "How enlightening..." }];
    exports.floor_foregrounds[exports.OCEAN] = [{ src: "hydrationstation3.png", desc: "Such a tiny bucket of water compared to the vast ocean..." }, { src: "hydrationstation2.png", desc: "The water looks so cool and refreshing..." }, { src: "hydration_station.png", desc: "The water looks refreshing, you almost didn't realize how thirsty you were." }, { src: "fishcrate.png", desc: "Fish freshly caught from the ocean." }, { src: "barrel.png", desc: "Filled with salt pork for a long sea journey." }, { src: "Ocean_Object_2.png", desc: "Why is the Baltic Sea Anomaly an Ocean Object? Don't ask me..." }, { src: "Ocean_Object_1.png", desc: "The fish gasps for breath." }];
    exports.floor_foregrounds[exports.LONELY] = [{ src: "lonely_figure.png", desc: "Alone..." }];
    //JR NOTE: from here down are just ghoul objects, need to go back and add things from sprite sheets as well
    exports.floor_foregrounds[exports.FREEDOM] = [{ src: "Freedom_Object.png", desc: "Have you seen the freedom object? It seems to have gotten out..." }];
    exports.floor_foregrounds[exports.FIRE] = [{ src: "Fire_Object.png", desc: "Hmm Interesting..." }];
    exports.floor_foregrounds[exports.OCEAN] = [{ src: "Ocean_Object_2.png", desc: "Why is the Baltic Sea Anomaly an Ocean Object? Don't ask me..." }, { src: "Ocean_Object_1.png", desc: "The fish gasps for breath." }];
    exports.floor_foregrounds[exports.MATH] = [{ src: "Math_Object.png", desc: "Don't you hate it when the beads break? Makes math so much harder." }];
    exports.floor_foregrounds[exports.FAMILY] = [{ src: "Family_Object.png", desc: "Family Tree Pruned." }];
    exports.floor_foregrounds[exports.MAGIC] = [{ src: "Magic_Object.png", desc: "Look Inward." }];
    exports.floor_foregrounds[exports.CHOICES] = [{ src: "Choice_Object.png", desc: "Signs like this tend to be more useful when labeled..." }];
    exports.floor_foregrounds[exports.ZAP] = [{ src: "zap_object.png", desc: "zap pow kaboom" }];
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

/***/ 867:
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
exports.text = exports.passwords = exports.Secret = exports.initRabbitHole = exports.translate = exports.albhed_map = void 0;
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
    "z": "W",
    "0": "https://www.tumblr.com/blog/view/figuringoutnothing/688028145704665088?source=share",
    "1": "http://farragofiction.com/DevonaFears",
    "2": "http://farragofiction.com/NotesOnStealingPeoplesShit/"
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
const initRabbitHole = () => {
    const hole = document.querySelector("#rabbithole");
    hole.onclick = () => {
        const target = document.querySelector("body");
        if (!target) {
            return;
        }
        target.innerHTML = ""; //clear;
        const te = new Transcript_1.TranscriptEngine(target);
    };
};
exports.initRabbitHole = initRabbitHole;
class Secret {
    constructor(title, music_file_name, text) {
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
    "STANDARD EXPECTOPATRONUM": new Secret("Confessionals 0", undefined, "Secrets/Content/0.js"),
    "STANDARD SALMONSUSHI": new Secret("Confessionals 1", undefined, "Secrets/Content/1.js"),
    "THE END IS NEVER THE END": new Secret("Confessionals 2", undefined, "Secrets/Content/2.js"),
    "BEWEARE OBLIVION IS AT HAND": new Secret("Confessionals 3", undefined, "Secrets/Content/3.js"),
    "KNOW RESTRAINT": new Secret("Confessionals 4", undefined, "Secrets/Content/4.js"),
    "NO RESTRAINT": new Secret("Confessionals 5", undefined, "Secrets/Content/5.js")
    //note: the point of the slaughter notes is to highlight the diffrence between a mindless autonomata and the full, vibrant person
    ,
    "THE TRUTH IS LAYERED": new Secret("Notes of Slaughter: Prelude", undefined, "Secrets/Content/6.js"),
    "THE FOOL IS DEAD": new Secret("Notes of Slaughter 0", undefined, "Secrets/Content/7.js"),
    "SHEPHARD SHUFFLE": new Secret("Notes of Slaughter 1", undefined, "Secrets/Content/8.js"),
    "BEWARE OBLIVION IS AT HAND": new Secret("Notes of Slaughter 2", undefined, "Secrets/Content/9.js"),
    "DIED LIKE COWARDS": new Secret("Notes of Slaughter 3", undefined, "Secrets/Content/10.js"),
    "NOT A FED": new Secret("Notes of Slaughter 4", undefined, "Secrets/Content/11.js"),
    "TIME IS DEAD": new Secret("Notes of Slaughter 5", undefined, "Secrets/Content/12.js"),
    "TAKE YOUR PLACE IN HISTORY": new Secret("Notes of Slaughter 6", undefined, "Secrets/Content/13.js"),
    "LEAVE YOUR MARK": new Secret("Notes of Slaughter 7", undefined, "Secrets/Content/14.js"),
    "COLONIZE YOUR MIND": new Secret("Notes of Slaughter 8", undefined, "Secrets/Content/15.js"),
    "INFINITE AMOUNT OF PAIN": new Secret("Notes of Slaughter 9", undefined, "Secrets/Content/16.js"),
    "CAST ASIDE ALL ASPIRATIONS OF MORTALITY": new Secret("Notes of Slaughter 10", undefined, "Secrets/Content/17.js"),
    "BITS OF THE PAST LEAK INTO THE PRESENT": new Secret("Notes of Slaughter 11", undefined, "Secrets/Content/18.js"),
    "SLAUGHTERHOUSE 9": new Secret("Notes of Slaughter 12", undefined, "Secrets/Content/19.js"),
    "LS": new Secret("FILE LIST (UNIX)", undefined, "Secrets/PasswordStorage.ts"),
    "DIR": new Secret("FILE LIST (DOS)", undefined, "Secrets/PasswordStorage.ts")
};
exports.text = `.\n.\n.\n.\n ${Object.keys(exports.passwords).join("\n")}}`;


/***/ }),

/***/ 923:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Room = void 0;
const ThemeStorage_1 = __webpack_require__(288);
const misc_1 = __webpack_require__(79);
class Room {
    //objects
    //people
    //really theres just the one room, we keep clearing it out.
    constructor(themes, element, seed) {
        this.floor = "glitch.png";
        this.wall = "glitch.png";
        this.width = 0;
        this.height = 0;
        this.render = () => {
            this.element.innerHTML = "";
            this.width = this.element.getBoundingClientRect().width;
            this.height = this.element.getBoundingClientRect().height;
            this.element.style.backgroundImage = `url(images/Walkabout/floor/${this.floor})`;
            const wall = (0, misc_1.createElementWithIdAndParent)("div", this.element, "wall");
            wall.style.backgroundImage = `url(images/Walkabout/wall/${this.wall})`;
        };
        this.init = () => {
            this.initFloor();
            this.initWall();
        };
        this.initFloor = () => {
            const theme = this.seed.pickFrom(this.themes);
            this.floor = theme.pickPossibilityFor(this.seed, ThemeStorage_1.FLOOR);
        };
        this.initWall = () => {
            const theme = this.seed.pickFrom(this.themes);
            this.wall = theme.pickPossibilityFor(this.seed, ThemeStorage_1.WALL);
        };
        this.themes = themes;
        this.seed = seed;
        this.element = element;
        this.init();
    }
}
exports.Room = Room;


/***/ }),

/***/ 122:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const __1 = __webpack_require__(607);
const misc_1 = __webpack_require__(79);
const PasswordStorage_1 = __webpack_require__(867);
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
        };
        this.handleBadPW = (text) => {
            this.text = (0, PasswordStorage_1.translate)(text);
            this.play();
        };
        this.handleGoodPW = (text) => {
            const secret = PasswordStorage_1.passwords[text.toUpperCase()];
            this.text = secret.title + "\n";
            this.text += (0, __1.loadSecretText)(PasswordStorage_1.passwords[text.toUpperCase()].text);
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
        this.transcript = (linesUnedited) => __awaiter(this, void 0, void 0, function* () {
            const lines = linesUnedited.split("\n");
            const terminal = document.querySelector("#terminal");
            if (!terminal) {
                return;
            }
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
                    console.log("JR NOTE: about to sleep for ", this.speed, "current time is", Date.now());
                    yield (0, misc_1.sleep)(this.speed);
                    console.log("JR NOTE: slept current time is", Date.now());
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
        this.parent = parent;
        this.init();
    }
}
exports.TranscriptEngine = TranscriptEngine;


/***/ }),

/***/ 907:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uniq = exports.removeItemOnce = void 0;
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


/***/ }),

/***/ 565:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.valueAsArray = exports.initEmptyArrayAtKey = exports.removeStringFromArrayWithKey = exports.addNumToArrayWithKey = exports.addStringToArrayWithKey = exports.isStringInArrayWithKey = void 0;
const ArrayUtils_1 = __webpack_require__(907);
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

/***/ 258:
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

/***/ 450:
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

/***/ 817:
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

/***/ 79:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadSecretText = void 0;
const Stat_1 = __webpack_require__(137);
const Theme_1 = __webpack_require__(702);
const ThemeStorage_1 = __webpack_require__(288);
const PasswordStorage_1 = __webpack_require__(867);
const Room_1 = __webpack_require__(923);
const NonSeededRandUtils_1 = __webpack_require__(258);
const SeededRandom_1 = __importDefault(__webpack_require__(450));
console.log(PasswordStorage_1.albhed_map);
window.onload = () => {
    (0, PasswordStorage_1.initRabbitHole)();
    const ele = document.querySelector("#current-room");
    (0, Stat_1.initStats)();
    (0, Theme_1.initThemes)();
    const themes = [Theme_1.all_themes[ThemeStorage_1.ENDINGS], Theme_1.all_themes[ThemeStorage_1.WEB], Theme_1.all_themes[ThemeStorage_1.TWISTING], Theme_1.all_themes[ThemeStorage_1.CLOWNS]];
    console.log("JR NOTE: todo take seed from param");
    const seed = (0, NonSeededRandUtils_1.getRandomNumberBetween)(1, 113);
    if (ele) {
        const room = new Room_1.Room(themes, ele, new SeededRandom_1.default(seed));
        room.render();
    }
};
//the text should be a javascript file exporting const text.
function loadSecretText(location) {
    return __webpack_require__(116)(`./${location}`).text;
}
exports.loadSecretText = loadSecretText;


/***/ }),

/***/ 243:
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

/***/ 489:
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

/***/ 591:
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

/***/ 937:
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

It is fortunate that anxiety caused by Knowledge is something of a speciality of me from my time in Morgan's Hill.  

Together we focus on practicing the 5-4-3-2-1 method for coping with anxiety, where she identifies 5 things to see, 4 things to touch, 3 things to hear, 2 things to smell and 1 thing to taste.   In doing this, we are trying to help her form the habit to use her impressive observation talent to break panic spirals, rather than fall into the trap of being Blind to the Outer World while lost in Unhelpful Thoughts.


`;

/***/ }),

/***/ 270:
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

/***/ 12:
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

/***/ 574:
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

/***/ 377:
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

/***/ 715:
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

/***/ 765:
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

/***/ 314:
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

/***/ 714:
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

/***/ 180:
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

/***/ 52:
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

/***/ 892:
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

/***/ 952:
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

/***/ 178:
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

/***/ 791:
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

/***/ 997:
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

/***/ 934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Zalgo": () => (/* binding */ Zalgo),
/* harmony export */   "checkTime": () => (/* binding */ checkTime),
/* harmony export */   "domWordMeaningFuckery": () => (/* binding */ domWordMeaningFuckery),
/* harmony export */   "getTimeString": () => (/* binding */ getTimeString),
/* harmony export */   "isNumeric": () => (/* binding */ isNumeric),
/* harmony export */   "replaceStringAt": () => (/* binding */ replaceStringAt),
/* harmony export */   "sentenceCase": () => (/* binding */ sentenceCase),
/* harmony export */   "stringtoseed": () => (/* binding */ stringtoseed),
/* harmony export */   "titleCase": () => (/* binding */ titleCase)
/* harmony export */ });
/* harmony import */ var _NonSeededRandUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(258);
/* harmony import */ var _SeededRandom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(450);



const titleCase = (input)=>{
    const pieces = input.split(" ");
    const ret = [];
    for(let piece of pieces){
        if(piece[0]){
            ret.push(replaceStringAt(piece,0 , piece[0].toUpperCase()));
        }
    }
    return ret.join(" ");
}

const sentenceCase = (input)=>{
    if(!input.length){
        return input;
    }
    return replaceStringAt(input, 0, input[0].toUpperCase());
}

function replaceStringAt(str, index, character){
    return str.substr(0, index) + character + str.substr(index+character.length);
}

function stringtoseed(seed){
    var output = 0;
   for (var i = 0, len = seed.length; i < len; i++) {
      output += seed[i].charCodeAt(0)
    }
    return output
}

//https://media.discordapp.net/attachments/468574691087613952/863079687276986388/tumblr_qaosxmi6ET1xf64vf.mp4
//https://en.m.wikipedia.org/wiki/Wordplay_(The_Twilight_Zone)
//takes in a sentence, for each word in it decides if its going to fuck it up today.
//seed_multiplier handles making it so that EVERY instance of the word "dog" is treated the same but each time i ask i might decide dog is changeable vs not
function domWordMeaningFuckery(){
    const root = document.querySelector('body');
    const seed_multiplier = (0,_NonSeededRandUtils__WEBPACK_IMPORTED_MODULE_0__.getRandomNumberBetween)(0,300);
    if(root){
        const children = root.querySelectorAll("*");
        for(let child of children){
            const subchildren = child.querySelectorAll("*");
            if(subchildren.length === 0){
                child.textContent = gaslightWordMeanings(child.textContent, seed_multiplier);
            }
        }
    }

}

//https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTimeString(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
}

function gaslightWordMeanings(sentence, seed_multiplier){
    const words = sentence.split(" ");
    for(let i = 0; i<words.length; i++){
        words[i] = getWordReplacement(words[i],seed_multiplier)
    }
    return words.join(" ");
}

//takes in a word, turns it into a random seed and if rngesus says so, turns it into another word
 function getWordReplacement(word,seed_multiplier){
     if(word === "you"){
         return "ya'll";
     }
    const gaslightOptions = ["echidna","[REDACTED]","null","dark","friendless","alone","minotaur","hunt","flesh","changeling","distortion","watcher","filth","minotaur","worm","bug","gas","flavor","evil fox","lazy dog","quick fox","dead fox","terrible fox","bad fox","fox","untrustworthy fox","taste","smell","feeling","failure","fear","horror","mistake","line","stay","good dog","canine","good boy","good boi","bark","garbage","curious dog","squirming dog", "make dog", "dog CODE","artist","musician","programmer","console","hacker","secret","gaslight","robot","dog","boredom","corridor","hallway","backroom","labyrinth","minotaur","maze","door","distortion","spiral","gravestone","dinner","ThisIsNotABG","player","ThisIsNotAGame","ThisIsNotABlog","situation","canada","bot","observer","camera","watcher","ThisIsNotAnEye","ThisIsNotASpiral","wednesday","trumpets","sunflower","dinosaur"];
    const multiplied_seed = stringtoseed(word.toUpperCase())*seed_multiplier;
    let chance = .99;
    if(window.megaGasLight){
        chance = 0.90;
    }
    let rand = new _SeededRandom__WEBPACK_IMPORTED_MODULE_1__["default"](multiplied_seed);
    if(rand.nextDouble()>chance){
        const seed = stringtoseed(word.toUpperCase());
        let rand2 = new _SeededRandom__WEBPACK_IMPORTED_MODULE_1__["default"](seed);
        let ret= rand2.pickFrom(gaslightOptions);
        if(word[0]===word[0].toUpperCase()){
            ret = titleCase(ret);
        }
        return ret;
    }
    return word;
}

//hate
//https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

var Zalgo = {
    chars: {
        0 : [ /* up */
    '\u030d', /*     ̍     */
    '\u030e', /*     ̎     */
    '\u0304', /*     ̄     */
    '\u0305', /*     ̅     */
    '\u033f', /*     ̿     */
    '\u0311', /*     ̑     */
    '\u0306', /*     ̆     */
    '\u0310', /*     ̐     */
    '\u0352', /*     ͒     */
    '\u0357', /*     ͗     */
    '\u0351', /*     ͑     */
    '\u0307', /*     ̇     */
    '\u0308', /*     ̈     */
    '\u030a', /*     ̊     */
    '\u0342', /*     ͂     */
    '\u0343', /*     ̓     */
    '\u0344', /*     ̈́     */
    '\u034a', /*     ͊     */
    '\u034b', /*     ͋     */
    '\u034c', /*     ͌     */
    '\u0303', /*     ̃     */
    '\u0302', /*     ̂     */
    '\u030c', /*     ̌     */
    '\u0350', /*     ͐     */
    '\u0300', /*     ̀     */
    '\u0301', /*     ́     */
    '\u030b', /*     ̋     */
    '\u030f', /*     ̏     */
    '\u0312', /*     ̒     */
    '\u0313', /*     ̓     */
    '\u0314', /*     ̔     */
    '\u033d', /*     ̽     */
    '\u0309', /*     ̉     */
    '\u0363', /*     ͣ     */
    '\u0364', /*     ͤ     */
    '\u0365', /*     ͥ     */
    '\u0366', /*     ͦ     */
    '\u0367', /*     ͧ     */
    '\u0368', /*     ͨ     */
    '\u0369', /*     ͩ     */
    '\u036a', /*     ͪ     */
    '\u036b', /*     ͫ     */
    '\u036c', /*     ͬ     */
    '\u036d', /*     ͭ     */
    '\u036e', /*     ͮ     */
    '\u036f', /*     ͯ     */
    '\u033e', /*     ̾     */
    '\u035b', /*     ͛     */
    '\u0346', /*     ͆     */
    '\u031a'  /*     ̚     */
    ],
    1 : [ /* down */
    '\u0316', /*     ̖     */
    '\u0317', /*     ̗     */
    '\u0318', /*     ̘     */
    '\u0319', /*     ̙     */
    '\u031c', /*     ̜     */
    '\u031d', /*     ̝     */
    '\u031e', /*     ̞     */
    '\u031f', /*     ̟     */
    '\u0320', /*     ̠     */
    '\u0324', /*     ̤     */
    '\u0325', /*     ̥     */
    '\u0326', /*     ̦     */
    '\u0329', /*     ̩     */
    '\u032a', /*     ̪     */
    '\u032b', /*     ̫     */
    '\u032c', /*     ̬     */
    '\u032d', /*     ̭     */
    '\u032e', /*     ̮     */
    '\u032f', /*     ̯     */
    '\u0330', /*     ̰     */
    '\u0331', /*     ̱     */
    '\u0332', /*     ̲     */
    '\u0333', /*     ̳     */
    '\u0339', /*     ̹     */
    '\u033a', /*     ̺     */
    '\u033b', /*     ̻     */
    '\u033c', /*     ̼     */
    '\u0345', /*     ͅ     */
    '\u0347', /*     ͇     */
    '\u0348', /*     ͈     */
    '\u0349', /*     ͉     */
    '\u034d', /*     ͍     */
    '\u034e', /*     ͎     */
    '\u0353', /*     ͓     */
    '\u0354', /*     ͔     */
    '\u0355', /*     ͕     */
    '\u0356', /*     ͖     */
    '\u0359', /*     ͙     */
    '\u035a', /*     ͚     */
    '\u0323'  /*     ̣     */
        ],
    2 : [ /* mid */
    '\u0315', /*     ̕     */
    '\u031b', /*     ̛     */
    '\u0340', /*     ̀     */
    '\u0341', /*     ́     */
    '\u0358', /*     ͘     */
    '\u0321', /*     ̡     */
    '\u0322', /*     ̢     */
    '\u0327', /*     ̧     */
    '\u0328', /*     ̨     */
    '\u0334', /*     ̴     */
    '\u0335', /*     ̵     */
    '\u0336', /*     ̶     */
    '\u034f', /*     ͏     */
    '\u035c', /*     ͜     */
    '\u035d', /*     ͝     */
    '\u035e', /*     ͞     */
    '\u035f', /*     ͟     */
    '\u0360', /*     ͠     */
    '\u0362', /*     ͢     */
    '\u0338', /*     ̸     */
    '\u0337', /*     ̷      */
    '\u0361', /*     ͡     */
    '\u0489' /*     ҉_     */
    ]

    },
    random: function(len) {
        if (len === 1) return 0;
        return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
    },
    generate: function(str) {
        var str_arr = str.split(''),
            output = str_arr.map(function(a) {
                if(a === " ") return a;
                for(var i = 0, l = Zalgo.random(16);
                    i<l;i++){
                        var rand = Zalgo.random(3);
                    a += Zalgo.chars[rand][
                        Zalgo.random(Zalgo.chars[rand].length)
                        ];
                 }
                return a;
            });
        return output.join('');
    }
};

/***/ }),

/***/ 116:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./": 607,
	"./Objects/Memory": 953,
	"./Objects/Memory.ts": 953,
	"./Objects/Stat": 137,
	"./Objects/Stat.ts": 137,
	"./Objects/Theme": 702,
	"./Objects/Theme.ts": 702,
	"./Objects/ThemeStorage": 288,
	"./Objects/ThemeStorage.ts": 288,
	"./Secrets/Content/0": 243,
	"./Secrets/Content/0.js": 243,
	"./Secrets/Content/1": 489,
	"./Secrets/Content/1.js": 489,
	"./Secrets/Content/10": 591,
	"./Secrets/Content/10.js": 591,
	"./Secrets/Content/11": 937,
	"./Secrets/Content/11.js": 937,
	"./Secrets/Content/12": 270,
	"./Secrets/Content/12.js": 270,
	"./Secrets/Content/13": 12,
	"./Secrets/Content/13.js": 12,
	"./Secrets/Content/14": 574,
	"./Secrets/Content/14.js": 574,
	"./Secrets/Content/15": 377,
	"./Secrets/Content/15.js": 377,
	"./Secrets/Content/16": 715,
	"./Secrets/Content/16.js": 715,
	"./Secrets/Content/17": 765,
	"./Secrets/Content/17.js": 765,
	"./Secrets/Content/18": 314,
	"./Secrets/Content/18.js": 314,
	"./Secrets/Content/19": 714,
	"./Secrets/Content/19.js": 714,
	"./Secrets/Content/2": 180,
	"./Secrets/Content/2.js": 180,
	"./Secrets/Content/3": 52,
	"./Secrets/Content/3.js": 52,
	"./Secrets/Content/4": 892,
	"./Secrets/Content/4.js": 892,
	"./Secrets/Content/5": 952,
	"./Secrets/Content/5.js": 952,
	"./Secrets/Content/6": 178,
	"./Secrets/Content/6.js": 178,
	"./Secrets/Content/7": 791,
	"./Secrets/Content/7.js": 791,
	"./Secrets/Content/8": 997,
	"./Secrets/Content/8.js": 997,
	"./Secrets/Content/9": 842,
	"./Secrets/Content/9.js": 842,
	"./Secrets/PasswordStorage": 867,
	"./Secrets/PasswordStorage.ts": 867,
	"./Secrets/RoomEngine/Room": 923,
	"./Secrets/RoomEngine/Room.ts": 923,
	"./Secrets/Transcript": 122,
	"./Secrets/Transcript.ts": 122,
	"./Utils/ArrayUtils": 907,
	"./Utils/ArrayUtils.ts": 907,
	"./Utils/LocalStorageUtils": 565,
	"./Utils/LocalStorageUtils.ts": 565,
	"./Utils/NonSeededRandUtils": 258,
	"./Utils/NonSeededRandUtils.ts": 258,
	"./Utils/SeededRandom": 450,
	"./Utils/SeededRandom.ts": 450,
	"./Utils/StringUtils": 934,
	"./Utils/StringUtils.js": 934,
	"./Utils/URLUtils": 389,
	"./Utils/URLUtils.ts": 389,
	"./Utils/constants": 817,
	"./Utils/constants.ts": 817,
	"./Utils/misc": 79,
	"./Utils/misc.ts": 79,
	"./index": 607,
	"./index.ts": 607
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
webpackContext.id = 116;

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
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;