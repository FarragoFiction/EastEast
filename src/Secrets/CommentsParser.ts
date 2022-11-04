



//https://stackoverflow.com/questions/5989315/regex-for-match-replacing-javascript-comments-both-multiline-and-inline was key
export const parseComments= (fileLocation: string)=>{
    const httpGet = (theUrl: string) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
      }
    //const url = 'dist/bundle.js';
    const resp = httpGet(fileLocation);
    const fullComments = resp.match(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm);
    let ret:string[] = [];
    if(!fullComments){
        return ret;
    }
    for(let item of fullComments){
        const banned = ["/******/","/***/","/* harmony export */","/* binding */"]
        if(!banned.includes(item)){
            ret.push(item);
        }
    }
    return ret;
}