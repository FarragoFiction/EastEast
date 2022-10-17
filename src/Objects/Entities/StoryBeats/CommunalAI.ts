
import { ConsiderWhetherTargetIsImportantToYou } from "../Actions/ConsiderIfIsImportantToMe";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { ConsiderWhetherTargetIsRomanticToYou } from "../Actions/ConsiderIfIsRomantic";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";
import { ILikeTargetMoreThanAmount } from "../TargetFilter/ILikeTargetMoreThanAmount";
import { TargetIsAlive } from "../TargetFilter/TargetIsAlive";
import { TargetIsBreeching } from "../TargetFilter/TargetIsBreaching";
import { TargetIsImportantToMe } from "../TargetFilter/TargetIsImportantToMe";
import { TargetStabilityLevelLessThanAmount } from "../TargetFilter/TargetStabilityLevelLessThanAmount";
import { AiBeat, SUBJECT_HE_SCRIPT, SUBJECT_HIS_SCRIPT } from "./BaseBeat";
import { TargetIsRomanticToMe } from "../TargetFilter/TargetIsRomanticToMe";


//JR NOTE: you can pass these to ai beats to debug them better (and not get any other beats spam)
export const debugAiBeat = (beat: AiBeat)=>{
    console.log("JR NOTE: I am a beat to debug", beat)
}

//if they're not already important to me, hang out just as bros
const hangOutWithFriend = new AiBeat(
    `${SUBJECTSTRING}: Hang out with ${TARGETSTRING}`,
    [`${SUBJECTSTRING} and ${TARGETSTRING} hang out for a while. They both have a pretty good time. `],
    [ new TargetIsAlive(), new ILikeTargetMoreThanAmount(100, {singleTarget: true}),new TargetIsImportantToMe({invert: true, singleTarget: true})],
    [new ConsiderWhetherTargetIsImportantToYou()],
    true,
    1000*30,
);

const hangOutWithPotentialCrush = new AiBeat(
    `${SUBJECTSTRING}: Hang out with ${TARGETSTRING}`,
    [`${SUBJECTSTRING} and ${TARGETSTRING} hang out for a while. They both have a pretty good time. `],
    [ new TargetIsAlive(), new ILikeTargetMoreThanAmount(100, {singleTarget: true}),new TargetIsRomanticToMe({invert: true, singleTarget: true})],
    [new ConsiderWhetherTargetIsRomanticToYou()],
    true,
    1000*30,
);

const breachIfStabilityDropsEnough = new AiBeat(
    `${SUBJECTSTRING}: Breach`,
    [`${SUBJECTSTRING} has reached ${SUBJECT_HIS_SCRIPT} limit. ${SUBJECT_HE_SCRIPT} have seen too many horrors. More than anyone could possibly bear. ${SUBJECT_HIS_SCRIPT} form begins twisting as they clutch ${SUBJECT_HIS_SCRIPT} head. `],
    [  new TargetStabilityLevelLessThanAmount(0, {singleTarget:true, kMode: true}), new TargetIsBreeching({invert: true,singleTarget:true, kMode: true})],
    [new IncrementMyState("")],
    true,
    1000*30
);

//things like confessing love or breaching if your stability level is low enough
export const communal_ai:AiBeat[] = [breachIfStabilityDropsEnough,hangOutWithFriend,hangOutWithPotentialCrush]