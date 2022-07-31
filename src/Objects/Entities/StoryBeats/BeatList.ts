import { GoNorth } from "../Actions/GoNorth";
import { GoSouth } from "../Actions/GoSouth";
import { TargetFilter } from "../TargetFilter/baseFilter";
import { TargetNameIncludes } from "../TargetFilter/targetNameIncludes";
import { AiBeat } from "./BaseBeat";

//because they could, Quotidian starts heading towards the south door.
export const testBeat = new AiBeat(
    [new TargetFilter()],
    [new GoSouth()]
);

export const testBeat2 = new AiBeat(
    [new TargetNameIncludes("Peewee")],
    [new GoNorth()]
);