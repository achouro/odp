import {Node, Graph} from '../utils/graph.js'

export class Ship{

    constructor(id, name, capacity, power, player=null, x=null, y=null){

        this.id=id;
        this.name=name;
        this.player=player;
        this.x=x;
        this.y=y;
        this.capacity=capacity;
        this.power=power;
        this.neighbours= new Set();
        this.is_alive=true;

    }

}



export class Player{
    constructor(id, name, pieces=new Map(), total_capacity=29, total_power=14){

        this.id=id;
        this.name=name;

        this.total_capacity=total_capacity;
        this.total_power=total_power;

        this.pieces=new Map();

        this.has_won=false;

    }


}


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
    constructor(length=10){
        super(true);
        this.length=length;
        this.initialise_board();
        this.initialise_edges();
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

    initialise_edges(){

        for(let i=0; i<this.length; i++){
            for(let j=0; j<this.length; j++){

                const current_id=`${i}-${j}`;
                const neighbours=[[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]]

                for(let [nx,ny] of neighbours){
                    
                    let d_x= i + nx;
                    let d_y= j + ny;

                    if(d_x>=0 && d_y>=0 && d_x<this.length && d_y<this.length){

                        let neighbour_id=`${d_x}-${d_y}`;
                        this.add_edge(neighbour_id, current_id, 1);
                    }
                }               
            }
        }
    }

    

    get_cell(x,y){
        return this.nodes.get(`${x}-${y}`);
    }

    place_ship(ship, x,y){
        const cell=this.nodes.get(`${x}-${y}`);
        if(cell && !cell.piece){
            cell.piece=ship;
            ship.x=x;
            ship.y=y;
            return true;
        }
        return false;
    }

    opponent_in_range(ship){

        const directions=[[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]];

        let targets=[];

        for(let [nx,ny] of directions){
            let d_x= ship.x + nx;
            let d_y= ship.y + ny;

            let current=this.nodes.get(`${d_x}-${d_y}`);

            if(current.piece && current.piece.player!==ship.player){
                targets.push(current);
            }
        }

        return targets;
    }

}

export class Game{
    constructor(size=10){
        this.board= new Board(size);

        this.players={'Player 1': new Player('P1', 'Player 1', new Map()), 
                      'Player 2': new Player('P2', 'Player 2', new Map())}

        this.turn='Player 1';
        this.game_over=false;

    }

    initialise_pieces(){

        const player_1=this.players['Player 1'];
        const player_2=this.players['Player 2'];
        const length=this.board.length -1;

        const coordinates_p1=[[0,5], [1,3], [1,7], [2,4], [2,5], [2,6]]
        let coordinates_p2=[]
        for(const [x,y] of coordinates_p1){ const pair=[length-x, y]; coordinates_p2.push(pair); }
        const coordinates=coordinates_p1.concat(coordinates_p2)

        const ships=[['BP', "BlackPearl", 10, 5], 
                    ['FD', "FlyingDutchman", 5, 3], 
                    ['QA', "QueenAnne", 3, 1]]

        const make_ship =(data)=> new Ship(data[0], data[1], data[2], data[3]);

        const make_navy=()=>[make_ship(ships[0]),
                    ...Array(2).fill(0).map(()=>make_ship(ships[1])),
                    ...Array(3).fill(0).map(()=>make_ship(ships[2]))]



        const both_navies=[...make_navy(),...make_navy()];

        for(let i=0;i<coordinates.length;i++){
                
                const ship=both_navies[i]
                const [x,y]=coordinates[i]

                this.board.place_ship(ship, x, y)

                const cell=this.board.get_cell(x,y);

                ship.player = (i>=6) ? player_1 : player_2;

                let previous=null;
                let p=0;

                if(ship.name===previous){
                    p+=1;
                    ship.player.pieces.set(`${ship.id}-${p}`, ship);
                    return;
                }

                ship.player.pieces.set(`${ship.id}-${0}`, ship);

                previous=ship.name;

            }

    }

     

    move_piece(ship, [x, y]){

        //console.log("Attempting move to", x, y, "for player", ship.player.name);

        if(this.game_over || ship.player.name!==this.turn){return false;}

        const old_position=this.board.nodes.get(`${ship.x}-${ship.y}`);
        const new_position=this.board.nodes.get(`${x}-${y}`);

        if(new_position.piece || !new_position ){return false;}

        if(x<0 || y<0 || x>=this.board.length || y>= this.board.length){
            return false;
        }

        old_position.piece=null;
        new_position.piece=ship;

        ship.x=x;
        ship.y=y;

        return true;
    }

    launch_attack(ship, target_ship){
        if(this.game_over || ship.player.name!==this.turn){return false;}

        const potential_targets=this.board.opponent_in_range(ship)

        if(potential_targets.some((target)=>target.piece === target_ship)){

            target_ship.capacity =target_ship.capacity - ship.power;
            target_ship.player.total_capacity-=ship.power;

            if(target_ship.capacity<=0){
                target_ship.is_alive=false;
                const cell=this.board.get_cell(target_ship.x, target_ship.y);
                cell.piece=null;
            }

            if(target_ship.player.total_capacity<=0){

                this.game_over=true;
                ship.player.has_won=true;

            }
            return true;
        }
        return false;

    }

    switch_turn(){
        if(!this.game_over){
            this.turn= (this.turn==='Player 1') ? 'Player 2' : 'Player 1';
        }
    }


}




export function Controller(){

    const board_ui=document.querySelector('.board')
    const turn_ui=document.querySelector('.player.turn')
    const score_one=document.querySelector('.score.one')
    const score_two=document.querySelector('.score.two')

    let game= new Game();
    game.initialise_pieces();

    let piece_to_move=null;


    function render(){

        board_ui.innerHTML='';
        turn_ui.innerHTML=game.turn;

        score_one.innerHTML=game.players["Player 1"].total_capacity;
        score_two.innerHTML=game.players["Player 2"].total_capacity;

                    
            for( let row=0; row<game.board.length; row++){
                for(let col=0; col<game.board.length; col++ ){

                    const current_cell=game.board.get_cell(row, col);

                    const cell_ui=document.createElement("button");
                    cell_ui.classList.add("cell");
                    cell_ui.dataset.column=col;
                    cell_ui.dataset.row=row;
                    
                    let ship=current_cell.piece;

                    if(ship){
                        let icon=document.createElement("img")
                        icon.src=`images/${ship.name}.png`
                        cell_ui.classList.add(ship.name);
                        cell_ui.appendChild(icon)
                    }

                    cell_ui.onclick= ()=> {
                        click_handler(row, col);}

                    board_ui.appendChild(cell_ui)

                }
            }
        }

    function click_handler(row, col){

        const cell=game.board.get_cell(row, col);

        //console.log(`Click at ${row}, ${col}. Current Turn: ${game.turn}`);

        //own piece selection
        if(cell.piece && cell.piece.player.name===game.turn){
            piece_to_move=cell.piece;
            return;
        }

        if(piece_to_move){

            let action=false;

            //empty-->to move to
            if(!cell.piece){
                action= game.move_piece(piece_to_move, [row, col])
            }
            //ennemy selected-->attack
            else if(cell.piece && cell.piece.player.name!==game.turn){

                const piece_to_attack=cell.piece;
                action= game.launch_attack(piece_to_move, piece_to_attack);


            }
            if(action){
                piece_to_move=null;
                game.switch_turn();
                render();
            }
            
        }

    }

    render();

}

Controller();