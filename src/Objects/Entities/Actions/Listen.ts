
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SOUND } from "../../ThemeStorage";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";

//assume only peewee can look
export class Listen extends Action {
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


    recognizedCommands: string[] = ["LISTEN", "HEAR"];


    applyAction = (subject: Quotidian, current_room: Room, object?: Quotidian,) => {
        let thingsHeard = `the sound of ${current_room.getRandomThemeConcept(SOUND)}.`;


        const north = current_room.getNorth();
        const south = current_room.getSouth();
        const east = current_room.getEast();
        if (north) {
            thingsHeard = `${thingsHeard} <p>Towards the NORTH, he hears ${north.getRandomThemeConcept(SOUND)}.</p>`;
        }

        if (south) {
            thingsHeard = `${thingsHeard} <p>Towards the SOUTH, he hears ${south.getRandomThemeConcept(SOUND)}.</p>`;
        }

        if (east) {
            thingsHeard = `${thingsHeard} <p>Towards the EAST, he hears ${east.getRandomThemeConcept(SOUND)}.</p>`;
        }

        return `${subject.name} listens  carefully. He hears ${thingsHeard}`;
    }



}