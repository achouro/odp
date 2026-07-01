const permutations = function(array) {

    if(!Array.isArray(array)){
        return;
    }

    if(array.length<=1){
        return [array];
    }

    let all_permutations=[];

    for(let i=0; i<array.length;i++){ 

        sub_array=array.slice(0,i).concat(array.slice(i+1))
        sub_permutations=permutations(sub_array);

        for(let j=0;j<sub_permutations.length;j++){
            
            const single_permutation=[array[i], ...sub_permutations[j]];

            all_permutations.push(single_permutation);

        }
        

        
    }


    
    return all_permutations;
    
    
};

module.exports = permutations;