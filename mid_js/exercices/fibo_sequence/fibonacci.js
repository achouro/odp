const fibonacci = function(number) {

    if(NaN){
        return;
    }
    if(number===0){return [0]}
    if(number===1){return [0,1]}

    const first_argument=0;
    const second_argument=1;

    let sequence=[];

    sequence.push(first_argument);
    sequence.push(second_argument);

    for(let i=2; i<=number;i++){ 
               
        sequence[i]=Number(sequence[i-1])+ Number(sequence[i-2]);

        }

    return sequence;
    
    
}

module.exports = fibonacci;