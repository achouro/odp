
import {Queue} from './stack_queue.js'

class Node{
    constructor(value){
        this.value=value;
        this.left=null;
        this.right=null
    }
}

class BST{
    constructor(){
        this.root=null;
    }

    insert(item){
        const node= new Node(item);

        if(!this.root){ this.root=node; return;}

        let current= this.root;

        while(current){
            if(node.value <= current.value){

                if(!current.left){ current.left=node; break;}
                
                current=current.left;
            }

            else if(node.value > current.value){

                if(!current.right){ current.right=node; break;}

                current=current.right;
            }
        }
    }

    search(item){
        let current=this.root;
        while(current){
            if(current.value===item){
                return current;

            }

            if(current.value < item){
                current=current.right;
            }
            else if(item < current.value){
                current=current.left;
            }
        }
        return null;
    }

}