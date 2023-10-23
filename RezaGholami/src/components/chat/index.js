export function splitName(name){
    const arrayName = name.split(" ")
    if(arrayName.length == 1){
        return arrayName[0][0]
    }
    else return arrayName[0][0] +" "+ arrayName[1][0]
}