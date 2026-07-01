const factorial = function(number) {

    if(number<0 || !typeof(number)==="number" ||typeof(number)==="object" 
                ||typeof(number)==="string" || !Number.isInteger(number)){ 

        return undefined;}

    if(number===1 || number===0){
        return 1;
    }
    else{
        return number*factorial(number -1)
    }
};

// Do not edit below this line
module.exports = factorial;