export class HashMap {
    constructor(){
        
        this.list_of_lists=[];

        this.size=0;
        this.capacity=16;

        this.load=this.size/this.capacity;
        this.load_balance=0.75;

        for(let i=0;i<this.capacity;i++){
            this.list_of_lists.push([]);
        }
    }

    hash(key){
        let hash_code=0;
        let prime=31;
        let key_string=String(key);

        for(let i=0; i<key_string.length;i++){
            hash_code= prime*hash_code + key_string.charCodeAt(i) ||0 ;
        }

        return Math.abs(hash_code) % this.capacity
    }

    has(key){
        let hash_code=this.hash(key);
        let list=this.list_of_lists[hash_code];

        for (let item of list){
            if(item.key===key){
                return true;
            }
        }
            
        return false;
    }

    get(key){
        let hash_code=this.hash(key);
        let list=this.list_of_lists[hash_code];

        for (let item of list){
                if(item.key===key){return item.value;}
        }           
        return null;

    }

    set(key,value){
        let hash_code=this.hash(key);
        let list=this.list_of_lists[hash_code];

        for (let item of list){
                if(item.key===key){
                    item.value=value;
                    return;
                }
        }

        list.push({key:key, value:value});
        this.size+=1;

        //if(this.load > this.load_balance){
        if(this.size/this.capacity > this.load_balance){
            this.resize();
        }

    }

    resize(){
        let load= Math.round(this.size*100/this.capacity)/100;

        let old_list_of_lists=this.list_of_lists;

        
        //Rebuild map with double capacity
        this.capacity *=2;
        this.list_of_lists=[];
        this.size=0;

        for(let i=0;i<this.capacity;i++){
            this.list_of_lists.push([]);
        }

        for(let old_list of old_list_of_lists){
            for(let old_item of old_list){

                let hash_code=this.hash(old_item.key);
                let list=this.list_of_lists[hash_code];

                list.push({key:old_item.key, value:old_item.value});

                this.size+=1;
            }
        }

    }

    delete(key){
        let hash_code=this.hash(key);
        let list=this.list_of_lists[hash_code];

        for (let i=0; i<list.length;i++){
                if(list[i].key===key){
                    
                    list.splice(i,1);

                    this.size-=1;
                    return true;
                }
        }           
        return false;

    }

    size(){ return this.size;}

    

    clear(){
        this.list_of_lists=[];

        this.size=0;
        this.capacity=16;
        this.load_balance=0.75;

        for(let i=0;i<this.capacity;i++){
            this.list_of_lists.push([]);
        }
    }
    keys(){
        let all_keys=[];
        for(let list of this.list_of_lists){
            for(let item of list){
                all_keys.push(item.key);
            }
        }
        return all_keys;
    }

    values(){
        let all_values=[];
        for(let list of this.list_of_lists){
            for(let item of list){
                all_values.push(item.value);
            }
        }
        return all_values;

    }
    entries(){
        let all_entries=[];
        for(let list of this.list_of_lists){
            for(let item of list){
                all_entries.push([item.key,item.value]);
            }
        }
        return all_entries;

    }
           



}