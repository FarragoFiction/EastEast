export class StoryBeat{
    command: string;
    response: string;
    truthfulComment?: string; //meant to be deployed in the console
    
    constructor(command: string, response: string, truthfulComment?:string){
        this.command = command;
        this.response = response;
        this.truthfulComment  =truthfulComment;
    }
}