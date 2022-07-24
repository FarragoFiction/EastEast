
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { FEELING, SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { Quotidian } from "../Quotidian";
import { Action } from "./BaseAction";

//assume only peewee can look
export class Feel extends Action {
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


    recognizedCommands: string[] = ["FEEL", "CARESS", "TOUCH","FONDLE"];


    applyAction = (subject: Quotidian, current_room: Room, object?: Quotidian,) => {
        let thingsHeard = `${current_room.getRandomThemeConcept(FEELING)}.`;


        const north = current_room.getNorth();
        const south = current_room.getSouth();
        const east = current_room.getEast();
        if (north) {
            thingsHeard = `${thingsHeard} <p>When he touches the frame of the NORTH DOOR he can't help but notice the distinct texture of ${north.getRandomThemeConcept(FEELING)}.</p>`;
        }

        if (south) {
            thingsHeard = `${thingsHeard} <p>When he touches the frame of the SOUTH DOOR he can't help but notice the distinct texture of ${south.getRandomThemeConcept(FEELING)}.</p>`;
        }

        if (east) {
            thingsHeard = `${thingsHeard} <p>When he touches the frame of the EAST DOOR he can't help but notice the distinct texture of ${east.getRandomThemeConcept(FEELING)}.</p>`;
        }

        return `Underneath Peewee's tail, the floor feels weirdly of ${thingsHeard}`;
    }



}