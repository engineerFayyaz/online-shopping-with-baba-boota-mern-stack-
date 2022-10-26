
export function setString(name) {
if(name.length>35){
    return `${name.slice(0,35)}...`
}else{
    return name
}
}