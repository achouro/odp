export function sum(a,b){

    return a+b;
}

export function capitalise(string){

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function reverse_string(string){

    let rev="";

    for(let i=0; i<string.length;i++){

        const letter=string.charAt(string.length -1 -i)

        rev+=letter;

    }

    return  rev;
}

export function calculator(operation, a,b){

    function add(a,b){
        return a+b;
    }
    function subtract(a,b){
        return a-b;
    }
    function multiply(a,b){
        return a*b;
    }
    function divide(a,b){
        if(b===0){throw new Error("Division by Zero Not Permitted")}
        return a/b;
    }

    const operations={add, subtract, multiply, divide}

    return operations[operation](a, b);
}

export function ceasar_cipher(string, shift){
    
    //Build set of all characters
    const chars="abcdefghijklmnopqkrstuvwxyz";
    const upper_chars=chars.toUpperCase();
    const numbers=["0123456789"]
    const all=chars+ upper_chars + numbers;

    const all_list=[]
    for( let i=0; i<all.length; i++){
        all_list.push(all.charAt(i))
    }
    //console.log(all_list)

    const punctuation=".,?!:;'-_()[]{}<>+=*/\\%$#@&^~|"
    const space=" ";
    const immutable= space + punctuation;
    const all_immutable=[]
    for( let i=0; i<all_immutable.length; i++){
        all_immutable.push(immutable.charAt(i))
    }

    //Build cipher
    let shifted="";

    for(let i=0; i<string.length;i++){

        const letter=string.charAt(i)

        if(immutable.includes(letter)){shifted+=letter; continue; }

        const position= all_list.indexOf(letter)

        const shifted_position= (Number(position) + Number(shift))%Number(all_list.length)

        const shifted_letter=all_list[shifted_position];

        shifted+=shifted_letter;
    
    }

    return shifted

}

export function analyse(arr){

    function average(arr){
        let sum=0;
        for(let i=0;i<arr.length; i++){
            sum+=arr[i];
        }
        const avg=sum/arr.length;

        return avg;
    }

    function min(arr){

        let min=arr[0]

        for(let i=1;i<arr.length; i++){
            if(arr[i]<min){
                min=arr[i];
            }
        }
        return min
    }
    function max(arr){

        let max=arr[0]

        for(let i=1;i<arr.length; i++){
            if(arr[i]>max){
                max=arr[i];
            }
        }
        return max
    }

    function length(arr){ return arr.length}

    const operations={average, min, max, length};

    const object={
        average: operations['average'](arr),
        min:operations['min'](arr),
        max:operations['max'](arr),
        length:operations['length'](arr)
    } 

    return object;

}

