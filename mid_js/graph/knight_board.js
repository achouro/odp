import {Stack, Queue} from './queue.js'
import {Node, Edge, Graph} from './graph.js'

export class Cell extends Node{
    constructor(x,y){
        super();
        this.x=x;
        this.y=y;
        this.id=`${x}-${y}`;
        this.piece=null;

    }
}

export class Board extends Graph{
    constructor(length=8){
        super(true);
        this.length=length;
        this.initialise_board();
    }

    initialise_board(){

        for(let set of this.adjacency_list.values()){
            set.clear();
        }

        for(let i=0; i<this.length; i++){
            for(let j=0; j<this.length; j++){

                const cell=new Cell(i,j);

                this.add_node(cell.id, cell);
                
            }
        }
    }
    initialise_edges(piece_moves){

        for(let i=0; i<this.length; i++){
            for(let j=0; j<this.length; j++){

                const current_id=`${i}-${j}`;

                const current_moves=piece_moves(i,j);

                for(let move of current_moves){

                    let move_id=`${move[0]}-${move[1]}`;

                    if(this.nodes.has(move_id)){
                        this.add_edge(move_id, current_id, 1)
                    }
                }

                
            }
        }
    }

    knight_moves(x,y){

        const moves=[[x+1, y+2], [x+1, y-2], 
                     [x-1, y+2], [x-1, y-2],
                     [x+2, y+1], [x+2, y-1],
                     [x-2, y+1], [x-2, y-1] ]

        let valid_moves=[]
        for( let move of moves){
            if(move[0]>=0 &&move[1]>=0 && move[0]<8 &&move[1]<8){
                valid_moves.push(move);
            }
        }
        return valid_moves;
    }

    rook_moves(x,y){

        if(x<0 ||y<0 ||x>=this.length || y>=this.length){ return [];}

        const moves=[];

        for(let i=1; i<8; i++){
            
            if(i!==y){moves.push([x,i]);}
            
            if(i!==x) {moves.push([i, y]);}
        }

        return moves;

    }

    bishop_moves(x,y){

        if(x<0 ||y<0 ||x>7 || y>7){ return [];}

        const moves=[];

        const directions=[[1,1],[1,-1],[-1,1],[-1,-1]];

        for(let direction of directions){

            for(let i=1; i<this.length; i++){
                
                const x_move= x+direction[0]*i;
                const y_move= y+direction[1]*i;

                if(x_move>=0 && y_move>=0 && x_move<this.length && y_move<this.length){
                    moves.push([x_move, y_move]);
                }
                else{break;}
            }
        }
    
    return moves;

    }

    queen_moves(x,y){
        const moves = [...this.rook_moves(x,y), ...this.bishop_moves(x,y)]
        return moves;
    }

    king_moves(x,y){
        const moves=[];

        const directions=[[1,1],[1,-1],[-1,1],[-1,-1],
                         [0,1],[0,-1],[1,0],[-1,0]];

        for(let direction of directions){

                const x_move=x+ direction[0];
                const y_move=y+ direction[1];

                 if(x_move>=0 && y_move>=0 && x_move<this.length && y_move<this.length){
                    moves.push([x_move, y_move]);
                }
            }
        return moves;
    }

    pawn_moves(x,y){
        const moves=[];

        const directions=[[1,0],[1,-1],[-1,1]];

        for(let direction of directions){

                const x_move=x+ direction[0];
                const y_move=y+ direction[1];

                 if(x_move>=0 && y_move>=0 && x_move<this.length && y_move<this.length){
                    moves.push([x_move, y_move]);
                }
            }
        return moves;
    }

    piece_traversal([xstart,ystart], [xend, yend]){

        const start_id=`${xstart}-${ystart}`;
        const end_id=`${xend}-${yend}`;

        const path_ids= this.shortest_path(start_id, end_id);

        if(!path_ids){return null}

        const path=[];

        for(let i=0; i<path_ids.length; i++){
            const pair=path_ids[i].split('-').map(Number)
            path.push(pair)
        }
        return path;
    }

}
