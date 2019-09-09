module.exports = (x,y,callback) => {
    if ( x <= 0 || y <= 0){
        setTimeout(()=>  callback(new Error(x + y +"Menor que 0", null)) , 2000);
    } else{
        setTimeout(()=>  callback(null, {
            perimeter: () => (2*(x+y)),
            area: () => (x*y)
        }) , 2000);
    }
}


