
import { turnArrayIntoHumanSentence } from "../../../Utils/ArrayUtils";
import { Room } from "../../RoomEngine/Room";
import { SMELL, SOUND, TASTE } from "../../ThemeStorage";
import { FEMALE, himPronoun, MALE, Quotidian } from "../Blorbos/Quotidian";
import { Action } from "./BaseAction";
import { PhysicalObject } from "../../PhysicalObject";
import { AiBeat } from "../StoryBeats/BaseBeat";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";


export class ConsiderWhetherTargetIsRomanticToYou extends Action {
    importantReturn = true;


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
            odds = subject.romanticFOdds;
        }else if(target.gender === MALE){
            odds = subject.romanticMOdds;
        }else{
            odds = subject.romanticNBOdds;
        }
        const baseModifier = 13; //on average, how often they have to hang out to decide they're crushing
        if(subject.rand.nextDouble() < odds/baseModifier){
            subject.realizeIHaveACrushOnBlorbo(target);
            return `${subject.processedName()} realizes that ${TARGETSTRING} actually...looks really nice and maybe would be good to kiss?.`;

        }
        return "";

    }

}