
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND } from "../../ThemeStorage";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";

//assume only peewee can look
export class Smell extends Action {
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


    recognizedCommands: string[] = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];


    applyAction = (subject: Quotidian, current_room: Room, objects?: PhysicalObject[]) => {
        let thingsHeard = `${current_room.getRandomThemeConcept(SMELL)}.`;


        const north = current_room.getNorth();
        const south = current_room.getSouth();
        const east = current_room.getEast();
        if (north) {
            thingsHeard = `${thingsHeard} <p>Towards the NORTH, he can detect a whiff of ${north.getRandomThemeConcept(SMELL)}.</p>`;
        }

        if (south) {
            thingsHeard = `${thingsHeard} <p>Towards the SOUTH, he can detect a whiff of ${south.getRandomThemeConcept(SMELL)}.</p>`;
        }

        if (east) {
            thingsHeard = `${thingsHeard} <p>Towards the EAST, he can detect a whiff of ${east.getRandomThemeConcept(SMELL)}.</p>`;
        }

        return `${subject.name} takes in a lungful of air. His cybernetic nose detects traces of ${thingsHeard}`;
    }



}