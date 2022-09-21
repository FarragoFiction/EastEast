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
  const storedValues = localStorage.getItem(TIME_KEY);
  if(storedValues){
    const parsedValues = valueAsArray(TIME_KEY);
    //only save it if its smaller plz
    if(parsedValues[index]){
      if(timeNumber < parsedValues[index]){
        console.log("JR NOTE: Congrats on beating your personal best :) :) :)")
        parsedValues[index] = timeNumber;
        return true;
      }
    }else{
      parsedValues[index] = timeNumber;
      return true;
    }
    localStorage[TIME_KEY]  = parsedValues;
  }else{
    console.log("JR NOTE: initing empty array and adding something to it")
    initArrayWithInitialValuesAtKey(TIME_KEY, [timeNumber]);
  return true
  }
  return false;
}