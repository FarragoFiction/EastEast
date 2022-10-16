
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { FEMALE, himPronoun, MALE, Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";


export class ConsiderWhetherTargetIsImportantToYou extends Action {



    recognizedCommands: string[] = [];

    applyAction = (beat: AiBeat)=>{
        const current_room = beat.owner?.room;
        if(!current_room){
            return "";
        }
        const subject = beat.owner;
        let target = beat.targets[0];

        if(!subject || !target || !(target instanceof Quotidian)){
            return "";
        }
        let odds = 0.0;
        if(target.gender === FEMALE){
            odds = subject.platonicFOdds;
        }else if(target.gender === MALE){
            odds = subject.platonicMOdds;
        }else{
            odds = subject.platonicNBOdds;
        }
        if(subject.rand.nextDouble() < odds){
            subject.realizeIHaveASquishOnBlorbo(target);
        }
        return `${subject.processedName()} realizes that ${TARGETSTRING} is important to ${himPronoun(subject.gender)}.`;

    }

}