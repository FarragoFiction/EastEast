
import {albhed_map, initRabbitHole} from "./Secrets/PasswordStorage";
console.log(albhed_map);
window.onload = ()=>{
    initRabbitHole();
}

//the text should be a javascript file exporting const text.
export function loadSecretText(location){
    return require(`./${location}`).text
  }
