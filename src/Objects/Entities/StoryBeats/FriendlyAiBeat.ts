
import { Action } from "../Actions/BaseAction";
import { TargetFilter } from "../TargetFilter/baseFilter";
import { AiBeat } from "./BaseBeat";

export class FriendlyAiBeat extends  AiBeat {
    startingText:string;
    endingText:string;
    
    constructor(startingText: string, endingText: string,triggers: TargetFilter[], actions: Action[]) {
        super(triggers, actions, false);
        this.startingText  = startingText;
        this.endingText = endingText;
    }
}