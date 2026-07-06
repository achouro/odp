
export class Node{
    constructor(value){
        this.value=value;
        this.left=null;
        this.right=null
    }
}

export class BST{
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
    //Binary Search
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

    contains(item){
        if(this.search(item)!==null){
            return true;
        }
        return false;
    }

    delete(item){
        this.root=search_delete(this.root, item);

        function search_delete(node, item){
            if(node===null){ 
                return null;
            };

            //Move thorugh search node recursively until you find your item
            if(Number(item) < node.value){
                node.left=search_delete(node.left, item);
            }
            else if(node.value < Number(item)){
                node.right=search_delete(node.right, item);
            }

            //Element found
            else if(Number(item)===node.value){

                //No child nodes->No successor
                if(node.left===null && node.right===null){
                    return null;
                }
                //One child node->Its successor
                if(node.left===null){
                    return node.right;
                }
                if(node.right===null){
                    return node.left;
                }
                //Two child nodes->Max sub-child of min/right child node
                //Will maintain old_left>successors & new_right<successor
                let successor=node.right;

                while(successor.left!==null){
                    successor=successor.left;  
                }

                node.value=successor.value;
                node.right=search_delete(node.right, node.value)
            }
            return node;
        }
        return this;
    }
    
    get_min(){
        if(!this.root){return null;}

        let current=this.root;
        while(current.left!==null){
            current=current.left;
        }
        return current.value;
    }

    get_max(){
        if(!this.root){return null;}

        let current=this.root;
        while(current.right!==null){
            current=current.right;
        }
        return current.value;
    }
    
    get_height(node=this.root){
        if(node===null){return -1;}

        let left_height=this.get_height(node.left)
        let right_height=this.get_height(node.right)

        let height= Math.max(left_height, right_height) +1;

        return height;
        
    }

    dfs(){
        let result=[];

        function traverse(node){
            if(!node){return};
            //in-order traversal
            traverse(node.left);
            result.push(node.value);
            traverse(node.right);
        }

        traverse(this.root);

        return result;
    }

    bfs(){
        if(!this.root){return [];}
        
        let result=[]
        let queue=[this.root];

        while(queue.length>0){

            let current=queue.shift();

            result.push(current.value)

            if(current.left){
                queue.push(current.left);
            }
            if(current.right){
                queue.push(current.right);
            }
        }
        return result;

    }

}