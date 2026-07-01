const pascal = function(number) {

    if(NaN){
        return;
    }

    const first_argument=1;
    const last_argument=1;

    const first_row=[first_argument];
    const second_row=[first_argument, last_argument];

    if(number===1){
        return first_row;
    }
    if(number===2){
        return second_row;
    }

    let all_rows=[];
    all_rows.push(first_row);
    all_rows.push(second_row);

    for(let i=2; i<number;i++){ 
        
        let subsequent_row=[];
        subsequent_row[0]=Number(first_argument);
        

         //pacal_i+1.length=pascal_i.length+1 (-2) //removing the first and last arguments

        for(let j=1; j<i ;j++){
            subsequent_row[j]= Number(all_rows[i-1][j-1])+ Number(all_rows[i-1][j]);

        }  
        subsequent_row.push(Number(last_argument));


        all_rows.push(subsequent_row);

        }

    return all_rows[number-1];
    
    
}

module.exports = pascal;