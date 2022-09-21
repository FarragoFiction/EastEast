import { removeItemOnce } from "./ArrayUtils";
import { TIME_KEY } from "./constants";

export const isStringInArrayWithKey =(key:string,target:string)=>{
  return valueAsArray(key).includes(target);
}

export const addStringToArrayWithKey =(key:string,target:string)=>{
  const tmp = valueAsArray(key);
  tmp.push(target);
  localStorage[key] = JSON.stringify(tmp);
}

export const addNumToArrayWithKey =(key:string,target:number)=>{
  const tmp = valueAsArray(key);
  tmp.push(target);
  localStorage[key] = JSON.stringify(tmp);
}


export const removeStringFromArrayWithKey =(key:string,target:string)=>{
  let tmp = valueAsArray(key);
  tmp = removeItemOnce(tmp, target);
  localStorage[key] = JSON.stringify(tmp);
}

export const initEmptyArrayAtKey =(key:string)=>{
  const tmp:any[] = [];
  localStorage[key] = JSON.stringify(tmp);
  return tmp;
}

export const initArrayWithInitialValuesAtKey =(key:string, values:any[])=>{
  localStorage[key] = JSON.stringify(values);
}

export const valueAsArray = (key: string)=>{
  if(localStorage[key]){
    return JSON.parse(localStorage[key]) as any[];
  }else{
    return initEmptyArrayAtKey(key);
  }
}


export const saveTime = (index: number, timeNumber: number)=>{
  console.log(`JR NOTE: i want to save time ${timeNumber} to index ${index}`)
  const storedValues = localStorage.getItem(TIME_KEY);
  console.log("JR NOTE: stored values is", storedValues)
  if(storedValues){
    const parsedValues = valueAsArray(TIME_KEY);
    console.log("JR NOTE: parsed values is", parsedValues)
    //only save it if its smaller plz
    if(parsedValues[index]){
      if(timeNumber < parsedValues[index]){
        console.log("JR NOTE: Congrats on beating your personal best :) :) :)")
        parsedValues[index] = timeNumber;
      }
    }else{
      parsedValues[index] = timeNumber;
    }
    console.log("JR NOTE: new parsedValues is", parsedValues)

    localStorage[TIME_KEY]  = parsedValues;
  }else{
    console.log("JR NOTE: initing empty array and adding something to it")
    initArrayWithInitialValuesAtKey(TIME_KEY, [timeNumber]);
    console.log("JR NOTE: localStorage.getItem(TIME_KEY) is", localStorage.getItem(TIME_KEY))
  }
}