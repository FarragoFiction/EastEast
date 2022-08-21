export class StoryBeat{
    command: string;
    response: string;
    commandClass ="'";
    responseClass = "";

    truthfulComment?: string; //meant to be deployed in the console
    
    constructor(command: string, response: string, truthfulComment?:string){
        this.command = command;
        this.response = response;
        this.truthfulComment  =truthfulComment;
    }

    checkClass = (word: string,className:string)=>{
        if(this.command.toUpperCase().includes(word.toUpperCase())){
            this.commandClass = `${this.commandClass} ${className}`
        }
        if(this.response.toUpperCase().includes(word.toUpperCase())){
            this.responseClass = `${this.responseClass} ${className}`
        }
    }

    

}