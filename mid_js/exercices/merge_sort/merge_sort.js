const  merge= function (left, right){

    let sorted=[]
    let i=0, j=0;
    while(i<left.length && j<right.length){

        if(left[i]<=right[j]){
            sorted.push(left[i]);
            i++;
            continue;
        }

        if(right[j]<=left[i]){
            sorted.push(right[j]);
            j++;
            continue;
        }

        
    }

    while(i<left.length){
        sorted.push(left[i]);
            i++;
            continue;
    }

    while(j<right.length){
            sorted.push(right[j]);
            j++;
            continue;
    }

    return sorted;
}

const merge_sort = function(array) {

    if(!Array.isArray(array)){
        return;
    }

    if(array.length<=1){
        return array;
    }
    
    let split=Math.floor(array.length/2)
    let left_array=array.slice(0,split)
    let right_array=array.slice(split)

    let sorted_left=merge_sort(left_array);
    let sorted_right=merge_sort(right_array);

    let sorted_array=merge(sorted_left, sorted_right)

    return sorted_array;
 
    
};

module.exports = merge_sort;