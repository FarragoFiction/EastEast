import { DeploySass } from "../Actions/DeploySass";
import { FollowObject } from "../Actions/FollowObject";
import { GoEast } from "../Actions/GoEast";
import { GoNorth } from "../Actions/GoNorth";
import { GoSouth } from "../Actions/GoSouth";
import { PickupObject } from "../Actions/PickupObject";
import { TargetFilter, TARGETSTRING } from "../TargetFilter/baseFilter";
import { TargetIsWithinRadiusOfSelf } from "../TargetFilter/TargetIsWithinRadiusOfSelf";
import { TargetNameIncludesAnyOfTheseWords } from "../TargetFilter/TargetNameIncludesAnyOfTheseWords";
import { AiBeat } from "./BaseBeat";






export const SassObjectAndPickUp = new AiBeat(
    [`The Quotidian is sqwawking at the ${TARGETSTRING}.`],
    [new TargetIsWithinRadiusOfSelf(5)],
    [new DeploySass("Gross!"),new  PickupObject()],
    true
);