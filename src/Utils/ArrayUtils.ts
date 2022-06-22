export function removeItemOnce(arr:any[], value:any) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  //https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  function onlyUnique(value:any, index:number, self:any[]) {
    return self.indexOf(value) === index;
  }

  export const uniq  =(a:any[]) =>{return a.filter(onlyUnique)};