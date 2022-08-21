export class StoryBeat{
    command: string;
    response: string;
    commandVoided = false;
    responseVoided = false;

    truthfulComment?: string; //meant to be deployed in the console
    
    constructor(command: string, response: string, truthfulComment?:string){
        this.command = command;
        this.response = response;
        this.truthfulComment  =truthfulComment;
    }

    checkVoid = (word: string)=>{
        if(this.command.includes(word)){
            this.commandVoided = true;
        }
        if(this.response.includes(word)){
            this.responseVoided = true;
        }
    }

}