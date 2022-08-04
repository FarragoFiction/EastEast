import { DeploySass } from "../Actions/DeploySass";
import { FollowObject } from "../Actions/FollowObject";
import { GoEast } from "../Actions/GoEast";
import { GoNorth } from "../Actions/GoNorth";
import { GoSouth } from "../Actions/GoSouth";
import { TargetFilter } from "../TargetFilter/baseFilter";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/targetNameIncludesAnyOfTheseWords";
import { AiBeat } from "./BaseBeat";

//because they could, Quotidian starts heading towards the south door.
export const testBeat = new AiBeat(
    [new TargetFilter()],
    [new GoSouth()]
);

export const testBeat2 = new AiBeat(
    [new TargetNameIncludesAnyOfTheseWords(["Peewee"])],
    [new GoNorth()]
);

export const testBeat3 = new AiBeat(
    [new TargetIsWithinRadiusOfSelf(30,true)],
    [new GoEast()]
);

export const FollowPeewee = new AiBeat(
    [new TargetNameIncludesAnyOfTheseWords(["Peewee"])],
    [new FollowObject()]
);

export const SassObject = new AiBeat(
    [new TargetIsWithinRadiusOfSelf(5)],
    [new DeploySass("Gross!",["Wow you're really gross, aren't you?", "I don't like you!","Wow! So boring!"])],
    true
);