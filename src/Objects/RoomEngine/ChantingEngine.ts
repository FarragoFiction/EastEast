import { getRandomNumberBetween } from "../../Utils/NonSeededRandUtils";

/*
has array of audio files it can switch between in a playlist
makes audio go in and out in terms of volume
subtly messes with speed and pitch, too, if i can manage it
*/
export class ChantingEngine{
    baseLocation = "audio/Chant/";
    //JR NOTE: todo , still raw audio, needs cleanup
    sources = ["Take1.mp3","Take2WhoopsItsAFractal.mp3"];
    audio = new Audio(this.baseLocation + this.sources[0]);
    tickNum = 0;

    start=()=>{
        this.audio.loop = true;
        this.audio.play();
        this.tick();
    }

    tick = () => {
        if(this.audio.paused){
            return;
        }
        this.tickNum ++;
        if(this.tickNum %100 === 0){
            const chance = Math.random();
            if(chance>0.95){
                const range = 25;
                this.audio.playbackRate = ((100+range)-getRandomNumberBetween(0,range))/100;
                console.log("JR NOTE: mutating chant",this.audio.playbackRate)
            }else if (chance > 0.05){
                const range = 25;
                this.audio.playbackRate = -1* ((100+range)-getRandomNumberBetween(0,range))/100;
                console.log("JR NOTE: mutating chant backwards",this.audio.playbackRate)  
            }
        }
        setTimeout(this.tick, 50);

    }

    pause = ()=>{
        this.audio.pause();
    }

}