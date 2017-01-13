function tostar(star) {
    star = star.toString().substring(0,1);
    var arr = [];
    for(var i=0;i<5;i++){
        if(i<star){
            arr[i] = 1;
        }
        else {
            arr[i] = 0;
        }
    }
    return arr;
}
module.exports = {
    tostar: tostar
}