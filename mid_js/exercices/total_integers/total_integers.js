const total_integers = function(nested_object) {

    let count=0;

    if(typeof(nested_object)!=="object" || nested_object===null){
        return;
    }
  

    for(let sub_object of Object.values(nested_object)){

        
        if(Number.isInteger(sub_object)){
            count+=1;
        }

        else if(typeof(sub_object)==="object"){
            if(typeof(total_integers(sub_object))==="number"){
                count+= total_integers(sub_object);
            }
            

        }

        
    }
    
    return count;
    
    
};

module.exports = total_integers;