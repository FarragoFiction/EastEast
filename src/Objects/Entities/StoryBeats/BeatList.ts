import { GoSouth } from "../Actions/GoSouth";
import { TargetFilter } from "../TargetFilter/baseFilter";
import { AiBeat } from "./BaseBeat";

//because they could, Quotidian starts heading towards the south door.
export const testBeat = new AiBeat(
    [new TargetFilter()],
    [new GoSouth()]
);