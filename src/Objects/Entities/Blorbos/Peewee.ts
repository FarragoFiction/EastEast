//base level Entity object. quotidians can turn into anything

import { Movement } from "../../MovementAlgs/BaseMovement";
import { NoMovement } from "../../MovementAlgs/NoMovement";
import { Room } from "../../RoomEngine/Room";
import { StoryBeat } from "../../RoomEngine/StoryBeat";
import { all_themes } from "../../Theme";
import { ENDINGS, WEB, TECHNOLOGY } from "../../ThemeStorage";
import { Action } from "../Actions/BaseAction";
import { Feel } from "../Actions/Feel";
import { FollowObject } from "../Actions/FollowObject";
import { GlitchBreach } from "../Actions/GlitchBreach";
import { GlitchDeath } from "../Actions/GlitchDeath";
import { GlitchLife } from "../Actions/GlitchLife";
import { GoEast } from "../Actions/GoEast";
import { GoNorth } from "../Actions/GoNorth";
import { GoSouth } from "../Actions/GoSouth";
import { GoWest } from "../Actions/GoWest";
import { Help } from "../Actions/Help";
import { Listen } from "../Actions/Listen";
import { Look } from "../Actions/Look";
import { PauseSimulation } from "../Actions/PauseSimulation";
import { ResumeSimulation } from "../Actions/ResumeSimulation";
import { Smell } from "../Actions/Smell";
import { StopMoving } from "../Actions/StopMoving";
import { Taste } from "../Actions/Taste";
import { Think } from "../Actions/Think";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { Quotidian, Direction } from "./Quotidian";
import { FRIEND } from "../../RoomEngine/FRIEND/FRIEND";
import { PickupObject } from "../Actions/PickupObject";
import { DropAllObjects } from "../Actions/DropAllObjects";
import { CheckInventory } from "../Actions/CheckInventory";
import { EnterObject } from "../Actions/EnterObject";
import { DropObjectWithName } from "../Actions/DropObjectWithName";
import { GiveObjectWithName } from "../Actions/GiveObjectWithNameToTarget";


//what, did you think any real being could be so formulaic? 
//regarding the real peewee, wanda is actually quite THRILLED there is a competing parasite in the Echidna distracting the immune system (and tbf, preventing an immune disorder in the form of the eye killer)
//the universe is AWARE of the dangers to it and endlessly expands its immune system response
//becoming ever more inflamed
//but it can never be enough
export class Peewee extends Quotidian {
    lore = "While this is, clearly, not Peewee, it is, perhaps, the closest to Peewee anyone could be. A puppet with irrelevant will dancing for your pleasure.";
    maxSpeed = 20;
    minSpeed = 1;
    currentSpeed = 10;
    //only for peewee
    possibleActions: Action[] = [new PauseSimulation(), new ResumeSimulation(), new StopMoving(),new GoNorth(), new GoEast(), new GoSouth(), new GoWest(),new GiveObjectWithName(""),new DropObjectWithName(""), new EnterObject(), new CheckInventory(), new FollowObject(), new PickupObject(), new DropAllObjects(),new GlitchDeath(), new GlitchLife(),new GlitchBreach(), new Think(), new Look(), new Listen(), new Smell(), new Feel(), new Help(), new Taste()]; //ordered by priority
    //TODO: things in here peewee should do automatically, based on ai triggers. things like him reacting to items.

    direction = Direction.DOWN; //movement algorithm can change or use this.
    movement_alg: Movement = new NoMovement(this);
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

    constructor(room: Room, x: number, y: number) {
        const sprite = {
            default_src: { src: "Peewee/left.gif", width: 90, height: 90 },
            left_src: { src: "Peewee/left.gif", width: 90, height: 90 },
            right_src: { src: "Peewee/right.gif", width: 90, height: 90 },
            up_src: { src: "Peewee/back.gif", width: 45, height: 90 },
            down_src: { src: "Peewee/front.gif", width: 45, height: 90 }

        };
        console.log("JR NOTE: peewee should have an ongoing storybeat for commenting on anything he's near, just on his own, plus eventually one for trying to kill the universe")
        const beats: AiBeat[] = [];
        super(room, "Peewee",x, y, [all_themes[ENDINGS], all_themes[WEB], all_themes[TECHNOLOGY]], sprite,"It's Peewee, the Glitch of Doom, the Devil of Spirals, the Puppet of Twisted Fate here to dance for your amusement. It's okay. If he weren't caught in your Threads, he'd be trying to End all our fun. We can't have that, now can we? After all, the End can Never Be The End in a Spiral :) :) :)", beats);
        this.friend = new FRIEND(this.room.maze, this);
    }



    //peewee's ai is user based. you can tell him to do various actions. 
    //there is no trigger. only actions.
    processStorybeat = (beat: StoryBeat) => {
        this.container.id = "PeeweePuppet"
        for (let action of this.possibleActions) {
            const words = beat.command.split(" ");
            for (let word of words) {
                if (action.recognizedCommands.includes(word.toUpperCase())) {
                    const aibeat = new AiBeat([],[new TargetNameIncludesAnyOfTheseWords(words)], [action]).clone(this);
                    aibeat.owner = this;
                    aibeat.timeOfLastBeat = 0; //peewee NEVER gets timelocked
                    const trigger = aibeat.triggered(this.room,true);//sets targets
                    action.handleProcessingPeeweeInput(words, this);
                    beat.response = action.applyAction(aibeat);
                    return;
                }
            }
        }

        if (beat.response.trim() === "") {
            const aibeat = new AiBeat([],[], []);
            aibeat.owner = this;
            beat.response = new Action().applyAction(aibeat);
        }

    }


}
