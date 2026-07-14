import {Stack, Queue} from './queue.js'

export class Node{
    constructor(id, data=null){
        this.id=id;
        this.data=data;
    }
}

export class Edge{
    constructor(start, end, weight=1){
        this.start=start;
        this.end=end;
        this.weight=weight;
    }
}

export class Graph{
    constructor(directed=false){
        this.directed=directed;
        this.nodes= new Map();
        this.adjacency_list=new Map();
    }

    add_node(id, data){

        if(this.nodes.has(id)){ return;}

        const node= new Node(id, data);

        this.nodes.set(node.id, node);
        this.adjacency_list.set(node.id, new Set());
    }

    add_edge(start, end, weight){

        this.add_node(start);
        this.add_node(end);
        
        const edge=new Edge(start, end, weight)

        this.adjacency_list.get(start).add(edge);

        if(!this.directed){

            const other_edge=new Edge(end, start, weight)
            this.adjacency_list.get(end).add(other_edge);
        }
    }

    get_adjacent(node){
        return this.adjacency_list.get(node) || new Set()
    }

    remove_node(node){
        if(!this.nodes.has(node)){ return;}
        //adjclist: {key : value(new Set())}
        for(let values of this.adjacency_list.values()){
            for(let edge of values){
                //remove edges pointing to our node
                if(edge.end===node){
                    values.delete(edge)
                }
            }
        }

        //remove node and its adjascency list
        this.nodes.delete(node);
        this.adjacency_list.delete(node)
    }

    remove_edge(start, end){
        //edges pointing to our edge nodes
        const start_edges=this.adjacency_list.get(start)
        if(start_edges){
            for(let edge of Array.from(start_edges)){
                if(edge.end===end){
                    start_edges.delete(edge);
                }
            }
        }

        if(!this.directed){
            const end_edges=this.adjacency_list.get(end)

            if(end_edges){
                for(let edge of Array.from(end_edges)){
                    if(edge.end===start){
                        end_edges.delete(edge);
                    }
                }
            }
        }       

    }

    bfs(node, callback){
        if(!this.nodes.has(node)){return;}

        const visited= new Set();

        let queue= new Queue()
        queue.enqueue(node)
        //let queue=[node];

        visited.add(node)

        while(queue.length>0){

            let current=queue.dequeue();
            //let current=queue.shift();

            callback(this.nodes.get(current));

            for(let adjacent of this.get_adjacent(current)){
                if(!visited.has(adjacent.end)){

                    visited.add(adjacent.end)
                    //queue.push(adjacent.end);
                    queue.enqueue(adjacent.end);
                }
            }
        }
    }

    dfs(node, callback){

        if(!this.nodes.has(node)){return;}

        const visited= new Set();

        let stack=new Stack()
        stack.push(node);
        //let stack=[node];

        while(stack.length()>0){

            
            let current= stack.pop();


            if(!visited.has(current)){

                visited.add(current);
                callback(this.nodes.get(current));

                for(let adjacent of this.get_adjacent(current)){
                    if(!visited.has(adjacent.end)){
                        stack.push(adjacent.end)
                    }
                }

            }
            

        } 
    }

    shortest_path(start, end){

        if(!this.nodes.has(start) ||!this.nodes.has(end)){ return null;}

        if(start===end){ return [start];}

        const visited= new Set();
        const queue=new Queue();

        queue.enqueue(start);
        visited.add(start);

        let path_found=false;

        let backtrack= new Map();

        while(queue.length()>0){
            let current=queue.dequeue();

            if(current===end){
                path_found=true;
                break;
            }
            
            for(let adjacent of this.get_adjacent(current)){
                if(!visited.has(adjacent.end)){

                    visited.add(adjacent.end);
                    //
                    backtrack.set(adjacent.end, current);
                    //
                    queue.enqueue(adjacent.end);

                }
            }

        }

        if(!path_found){return null;}

        let reverse_path=[];
        let current=end;

        while(current!==undefined){
            
            reverse_path.push(current);
            current=backtrack.get(current);
        }

        const path=Array.from(reverse_path.reverse());

        return path;

    }

    //djikstra
    weighted_shortest_path(start, end){

        if(!this.nodes.has(start) ||!this.nodes.has(end)){ return null;}

        if(start===end){ return {path:[start], distance:0}; }

        const visited= new Set();

        let backtrack= new Map();

        let distances= new Map();

        for(let nodes of this.nodes.keys()){
            distances.set(nodes, Infinity)
        }

        let pqueue=[[start,0]];

        let path_found=false;


        while(pqueue.length>0){

            let [current,current_dist]=pqueue.shift();

            if(current===end){
                path_found=true;
                break;
            }

            if(visited.has(current)){ continue; }

            visited.add(current);
            
            for(let adjacent of this.get_adjacent(current)){

                if(visited.has(adjacent.end)){ continue;}

                let potential_dist= current_dist + adjacent.weight

                if(potential_dist< distances.get(adjacent.end)){

                    backtrack.set(adjacent.end, current);
                    distances.set(adjacent.end, potential_dist);
                    
                    pqueue.push([adjacent.end, potential_dist]);
                    pqueue.sort((a,b)=>a[1]-b[1]);
                    
                }
                
                
            }

        }

        if(!path_found){return null;}

        if(distances.get(end)===Infinity){return null;}

        let reverse_path=[];
        let current=end;

        while(current!==undefined){
            
            reverse_path.push(current);
            current=backtrack.get(current);
        }

        const path=reverse_path.reverse();
        const distance=distances.get(end);

        return {path, distance};

    }

}
