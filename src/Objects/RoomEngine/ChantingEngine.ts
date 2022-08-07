
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

    start=()=>{
        this.audio.play();
    }

    pause = ()=>{
        this.audio.pause();
    }

}