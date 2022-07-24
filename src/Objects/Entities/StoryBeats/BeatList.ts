import { GoSouth } from "../Actions/GoSouth";
import { Trigger } from "../Triggers/BaseTrigger";
import { AiBeat } from "./BaseBeat";

//because they could, Quotidian starts heading towards the south door.
export const testBeat = new AiBeat(
    [new Trigger()],
    [new GoSouth()]
);