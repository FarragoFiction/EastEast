
export class Relationship  {
    title: string;
    amount: number;

    important= false; //you can be Important but not romantic
    romantic  = false; //you can be Romantic but not important

    official = false; //do both parties agree that This Is A Thing (whatever flavor it is?)

    constructor(title: string,amount: number){
        console.log("JR NOTE: making a new relationship", title, amount);
        this.amount = amount;
        this.title  = title;
    }

    //pass in absolute value
    strengthen = (value: number, likeMultiplier: number)=>{
        this.amount += value * likeMultiplier;
    }

    //pass in absolute value
    weaken = (value: number, dislikeMultiplier: number)=>{
        this.amount += value * dislikeMultiplier;
    }

    //pass in absolute value
    //takes in a value and then adds it to the amount (if the amount is positive) or subtracts it (if the amount is negative)
    //so if you pass a postitive number in it'll INCREASE whatever your feelings are, in whatever direction they are trending
    //and if you pass a negative number in (better to just use de_escalate) it'll DECRASE whatever your feelings are, in the opposite of whatever direction they are trendng
    intensify = (value: number, likeMultiplier: number, dislikeMultiplier: number)=>{
        if(this.amount < 0){ //if you have no opinion about someone, give them the benefit of the doubt
            this.amount += -1* value * dislikeMultiplier;
        }else{
            this.amount += value * likeMultiplier;
        }
    }

    //pass in absolute value
    //opposite of intensify, it goes in the OPPOSITE direction its trending int .however, if you're zero currently, no changes
    de_escalate = (value: number, likeMultiplier: number, dislikeMultiplier: number)=>{
        if(this.amount === 0){
            return;
        }
        if(this.amount < 0){ //if you have no opinion about someone, give them the benefit of the doubt
            this.amount += value * likeMultiplier;
        }else{
            this.amount += -1 * value * dislikeMultiplier;
        }
    }


}