import { IncrementMyState } from "../Actions/IncrementMyState";
import { SUBJECTSTRING, TARGETSTRING } from "../TargetFilter/baseFilter";
import { TargetIsBreeching } from "../TargetFilter/TargetIsBreaching";
import { TargetStabilityLevelLessThanAmount } from "../TargetFilter/TargetStabilityLevelLessThanAmount";
import { AiBeat } from "./BaseBeat";

const breachIfStabilityDropsEnough = new AiBeat(
    `${SUBJECTSTRING}: Breach`,
    [`${SUBJECTSTRING} has reached their limit. They have seen too many horrors. More than anyone could possibly bear. Their form begins twisting as they clutch their head. `],
    [  new TargetStabilityLevelLessThanAmount(0, {singleTarget:true, kMode: true}), new TargetIsBreeching({invert: true,singleTarget:true, kMode: true})],
    [new IncrementMyState("")],
    true,
    1000*30
);

//things like confessing love or breaching if your stability level is low enough
export const communal_ai:AiBeat[] = [breachIfStabilityDropsEnough]