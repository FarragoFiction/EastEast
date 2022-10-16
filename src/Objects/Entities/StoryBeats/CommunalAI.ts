import { ConsiderWhetherTargetIsImportantToYou } from "../Actions/ConsiderWhetherTargetIsImportantToMe";
import { IncrementMyState } from "../Actions/IncrementMyState";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";
import { ILikeTargetMoreThanAmount } from "../TargetFilter/ILikeTargetMoreThanAmount";
import { TargetIsBreeching } from "../TargetFilter/TargetIsBreaching";
import { TargetIsImportantToMe } from "../TargetFilter/TargetIsImportantToMe";
import { TargetStabilityLevelLessThanAmount } from "../TargetFilter/TargetStabilityLevelLessThanAmount";
import { AiBeat } from "./BaseBeat";

//if they're not already important to me, hang out just as bros
const hangOutWithFriend = new AiBeat(
    `${SUBJECTSTRING}: Hang out with ${TARGETSTRING}`,
    [`${SUBJECTSTRING} and ${TARGETSTRING} hang out for a while. They both have a pretty good time. `],
    [ new ILikeTargetMoreThanAmount(100, {singleTarget: true}) && new TargetIsImportantToMe({invert: true})],
    [new ConsiderWhetherTargetIsImportantToYou()],
    true,
    1000*30
);

const breachIfStabilityDropsEnough = new AiBeat(
    `${SUBJECTSTRING}: Breach`,
    [`${SUBJECTSTRING} has reached their limit. They have seen too many horrors. More than anyone could possibly bear. Their form begins twisting as they clutch their head. `],
    [  new TargetStabilityLevelLessThanAmount(0, {singleTarget:true, kMode: true}), new TargetIsBreeching({invert: true,singleTarget:true, kMode: true})],
    [new IncrementMyState("")],
    true,
    1000*30
);

//things like confessing love or breaching if your stability level is low enough
export const communal_ai:AiBeat[] = [breachIfStabilityDropsEnough,hangOutWithFriend]