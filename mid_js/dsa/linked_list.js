//Doubly-linked list implementation
//DLL single items are referred to as node
export class Node{
    constructor(value){
        this.value=value;
        this.next=null;
        this.back=null
    }
}

export class List{
    constructor(){
        this.head=null;
        this.tail=null;
        this.size=0;
    }

    append(item){
        const node=new Node(item)
        if(!this.tail){
            this.head=node;
            this.tail=node;
            this.size+=1;
        }
        else{
            
            this.tail.next=node;
            node.back=this.tail;
            this.tail=node; //or this.tail=this.tail.next;
            this.size+=1;

        }
    }

    prepend(item){
        const node=new Node(item)
        if(!this.head){
            this.head=node;
            this.tail=node;
            this.size+=1;
        }
        else{
            
            this.head.back=node;
            node.next=this.head;
            this.head=node; //or this.tail=this.tail.back;
            
            this.size+=1;

        }
    }

    size_(){ return this.size; }

    head_(){ return this.head; }

    tail_(){ return this.tail; }

    at(index){
        //corner cases
        if(index<0 || index>=this.size_){return null;}
        if(index===0){return this.head;};
        if(index===this.size-1){ return this.tail};
        
        //optimised search
        let choice= (index<this.size/2) 
                //[start, steps, direction]
                ? {start:this.head, steps:index, direction:'next'}
                : {start:this.tail,  steps: this.size-1-index, direction:'back'}
 
        let current=choice.start;

        for(let i=0;i<choice.steps; i++){
            current=current[choice.direction];
        }
        return current;
    }

    pop_front(){
        if(!this.head){return undefined;}

        let popped= this.head;
        
        if(this.size===1){
            this.head=null;
            this.tail=null

            return popped;
        }
        
        this.head=this.head.next;
        this.head.back=null;

        this.size-=1;
        
        return popped;
    }
    pop_back(){
        if(!this.tail){return undefined;}

        let popped= this.tail;
        
        if(this.size===1){
            this.head=null;
            this.tail=null

            return popped;
        }
        
        this.tail=this.tail.back;
        this.tail.next=null;

        this.size-=1;
        
        return popped;
    }

    contains(item){
        let current=this.head;
        for(let i=0; i<this.size;i++){
            
            if(current.value===item){
                return true;
            }
            current=current.next;

        }
        return false;
    
    }

    find_index(item){
        let current=this.head;
        for(let i=0; i<this.size;i++){
            
            if(current.value===item){
                return i;
            }
            current=current.next;

        }
        return -1;
    }

    to_string(){
        let string='';
        let current=this.head;

        for(let i=0; i<this.size;i++){
            
            string+='( ' +current.value +' )'

            current=current.next;

            string+=' -> '; 

            if(current===this.tail){string+= '( ' +current.value +' )'+ ' -> '+"null"; break;}  
   
            
    }
    console.log(string);
    return string;

    }

    
    insert_at(index, item){

         if(index<0 || index>this.size){return null;}
        if(index===0){return this.prepend(item);}
        if(index===this.size){return this.append(item);}
      
        let current=this.at(index);

        let node=new Node(item);

        node.next=current;
        node.back=current.back;

        current.back.next=node;
        current.back=node;
        
        this.size+=1;
        

    }   

    delete_at(index){

        if(index<0 || index>=this.size){return null;}
        if(index===0){return this.pop_front();}
        if(index===this.size-1){return this.pop_back();}

        let current=this.at(index)

        
        current.next.back=current.back;
        current.back.next=current.next;
    
        this.size-=1;

        return current.value;
    }   
}

