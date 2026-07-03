//Simple Stack and Queue implementations as linked lists
class Stack{
    constructor(){
        this.stack=[];
    }

    push(item){this.stack.push(item);} //push item to the right
    pop(){return this.stack.pop();} //pop item on the the right

    
    length(){return this.stack.length;}
    is_empty(){return this.stack.length===0;}

    top(){return this.stack[this.stack.length-1];}


}

class Queue_{
    constructor(){
        this.queue=[]
    }

    enqueue(item){this.queue.push(item);} //push item to the right
    dequeue(){return this.queue.shift();} //pop item to the left

    length(){return this.queue.length;}
    is_empty(){return this.queue.length===0;}

    
    first(){return this.queue[0];}
    last(){return this.queue[this.queue.length-1];}
}

//Doubly-linked list implementation of a queue
//DLL single items are referred to as node
class Node{
    constructor(value){
        this.value=value;
        this.next=null;
        this.back=null
    }
}

class Queue{
    constructor(){
        this.head=null;
        this.tail=null;
        this.size=null;
    }

    enqueue(item){
        const node= new Node(item);
        if(!this.tail){
            this.head=node;
            this.tail=node;
            this.size+=1;
        }

        this.tail.next=node;
        this.tail=node;
        this.size+=1;

        
    }

    dequeue(){
        if(!this.head){ return null;}

        const popped=this.head.value;
        this.head=this.head.next;

        if(!this.head){ this.tail=null;}
        this.size-=1;

        return popped;
        
    }

}


