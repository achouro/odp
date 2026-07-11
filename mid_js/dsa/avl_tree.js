
export class Node{
    constructor(value){
        this.value=value;
        this.left=null;
        this.right=null;
        this.height=1;
    }
}

export class AVL{
    constructor(){
        this.root=null;
    }

    build_tree(array){
        const sorted=[... new Set(array)].sort((a,b)=>a-b);

        const start=0;
        const end=sorted.length-1;

        this.root=this.build_balanced(sorted, start, end);
        return this;

        
    }

    build_balanced(sorted, start, end){

            if(start>end){return null};

            const middle=start + Math.floor((end-start)/2);

            const node=new Node(sorted[middle]);

            node.left=this.build_balanced(sorted, start, middle-1);
            node.right=this.build_balanced(sorted, middle+1, end);

            this.update_height(node);

            return node;

        }

    update_height(node){

        let height=1+ Math.max(
            node.left ? node.left.height : 0 , 
            node.right ? node.right.height :0 )

        node.height=height;
        
    }

    balance_factor(node){
        if(!node){return 0;};
        let factor= (node.left ? node.left.height : 0) - (node.right ? node.right.height : 0)

        return factor;
    }



    rotate_right(node){

        //Pivot nodes
        let node_left= node.left;
        let node_left_right= node_left.right;
        

        node_left.right=node;
        node.left=node_left_right;

        this.update_height(node)
        this.update_height(node_left)

        node=node_left;

        return node;

    }
                

    rotate_left(node){

        //Pivot nodes
        
        let node_right= node.right;
        let node_right_left= node_right.left;

        node_right.left=node;
        node.right=node_right_left;

        this.update_height(node)
        this.update_height(node_right)

        node=node_right;

        return node;

    }

    balance(node){

        this.update_height(node);
        //Left-exceeding imbalance
        if(this.balance_factor(node)>=2){

            //Left-right case convert to Left-left
            if(this.balance_factor(node.left)<=-1){
                node.left=this.rotate_left(node.left)
            }  

            //All left-left cases and treated the same
            node=this.rotate_right(node)
            return node;

            

        }

        //Right-exceeding imbalance
        if(this.balance_factor(node)<= -2){
     
            //Right-left convert to Right-right
            if(this.balance_factor(node.right)>=1){
                node.right=this.rotate_right(node.right)
            }  

            //All right-right cases and treated the same 

            node=this.rotate_left(node)
            return node

            
        }

        return node;
    }

    insert(item){

        const insert_node=(node, value)=>{

            if(!node){ return new Node(value);}

            if(value===node.value){return node;}

            if(value <= node.value){
                node.left=insert_node(node.left,value);
            }

            else if(value > node.value){
                node.right=insert_node(node.right,value);
            }
            return this.balance(node)
        }

        this.root=insert_node(this.root,item);

        
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

        const search_delete=(node, item)=>{
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
            return this.balance(node);
        }
        this.root=search_delete(this.root, item);

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