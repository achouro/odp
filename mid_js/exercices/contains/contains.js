const contains = function(nested_object, object) {

    if(Object.is(nested_object,object)){
        return true;
    }

    else if(typeof(nested_object)==="object" && nested_object!==null) {

     for(let sub_object of Object.values(nested_object)){
        
        if(contains(sub_object, object)){
            return true;
        }
        
     }
    }
    
    return false;
    
    
};

module.exports = contains;