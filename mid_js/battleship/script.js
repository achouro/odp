function Cell(){

    let value="";

    const add_token=(player)=>{

        value= (player=== game.players[0].name) ? game.players[0].token : game.players[1].token;
    }

    const get_value=()=>value;

    return {add_token, get_value}
}

function Board(){

    const rows=6;
    const columns=7;
    const board=[];

    for(let i=0; i<rows; i++){
        board[i]=[];
        for(let j=0; j<columns; j++){
            board[i].push(Cell());
        }
    }
    
    const get_board=()=>board;
    

    const drop_token= (player, column)=>{

        const available_cells=board
            .filter((row)=>(row[column].get_value()===""))
            .map(row=>row[column]);
        
        if (!available_cells.length){return;}

        board[available_cells.length-1][column].add_token(player);
    }

    return {get_board, drop_token};
}

function Game(){
    let board=Board();

    let players=[{name:"Player 1", token:"gold", score:0, domElement:document.querySelector(".score.one")},
                 {name:"Player 2", token:"silver", score:0, domElement:document.querySelector(".score.two")}]

    let active_player=players[0];

    const get_active_player=()=>active_player;

    const switch_player=()=>{
        active_player= active_player===players[0] ? players[1] : players[0];
    }

    const play_round=(column)=>{
        board.drop_token(get_active_player().name,column);
    }

    const reset_board=()=>{
        board=Board();
        active_player=players[0];
    }
    
    return {players, get_active_player, switch_player, play_round, get_board:()=>board.get_board(), reset_board}
}

function Controller(){

    game=Game();

    let game_active=true;

    const read_html=()=>{
        turn=document.querySelector("div.player.turn")
        board_fe=document.querySelector(".board")
        win=document.querySelector(".winner")
        win_player=document.querySelector(".game_winner")
        reset=document.querySelector("button.reset")
        next=document.querySelector("button.next")
        
    
        score_one=document.querySelector(".score.one")
        score_two=document.querySelector(".score.two")
    }
    
    read_html();

    const update_screen=()=>{

        board_fe.textContent="";

        active_player=game.get_active_player()

        turn.textContent=active_player.name;        

        board_be=game.get_board();
                
        for( let row_index=0; row_index<board_be.length; row_index++){
            row=board_be[row_index];
            
            for(let col_index=0; col_index<board_be[row_index].length; col_index++ ){
                
                column_cell=board_be[row_index][col_index];

                const cell=document.createElement("button");
                cell.classList.add("cell");

                cell.dataset.column=col_index;
                cell.dataset.row=row_index;
                
                let name=column_cell.get_value();

                if(name){
                    let icon=document.createElement("img")
                    icon.src=`images/token_${name}.png`
                    cell.classList.add(name)
                    cell.appendChild(icon)
                }
                board_fe.appendChild(cell)

            }
        }
    }   
    
    const check_winner=(board, row, col, player)=>{
        
        const directions=[{x:1, y:0}, {x:0, y:1}, 
                          {x:-1, y:0}, {x:0, y:-1},
                          {x:1, y:1}, {x:-1, y:-1},
                          {x:-1, y:1}, {x:1, y:-1}]
     
        for( const {x,y} of directions){

            let count=0;
                            
            let row_search= row + x;
            let col_search= col + y;

            
                       
            while(row_search>=0 && row_search<=5 && col_search>=0 && col_search<=6){

                let position= board[row_search][col_search].get_value();
                
                if(position===player.token){
                    
                    count+=1;
    
                    if(count>=4){ return true;}
    
                    row_search+=x;
                    col_search+=y;
                }
                else{break;}
                 
            }
        }

        return false;                  
    }


    const update_winner=()=>{
        
        active_player=game.get_active_player()

        round_won=false;
        
        for( let row_index=0; row_index<board_be.length; row_index++){
            
            for(let col_index=0; col_index<board_be[row_index].length; col_index++ ){
                
                if(check_winner(board_be, row_index, col_index, active_player)){
                    
                    round_won=true;
                }   
            }        
        } 

        if(round_won){

                        win.style.visibility="visible";
                        win_player.style.visibility="visible";
                        win_player.textContent=active_player.name;

                        active_player.score= Number(active_player.score) +1;
            
                        active_player.domElement.textContent = active_player.score;

                        game_active=false;
       
        }
              
        
    }
 
    function board_handler(event){

        if(!game_active){return;}
        
        const selected_column= event.target.dataset.column;

        if(!selected_column){return;}


        game.play_round(selected_column); 

        update_screen();

        update_winner();

        game.switch_player();

    }

    board_fe.addEventListener("click",board_handler)

    update_screen();
    

    function next_handler(){  
        
        board_fe.innerHTML="";
        win.style.visibility="hidden";
        win_player.style.visibility="hidden";

        game.reset_board()

        game_active=true;

        board_fe.addEventListener("click",board_handler)

        update_screen();
    
    }
    
    next.addEventListener("click", next_handler)
    
    function reset_handler(){ 
    
        board_fe.innerHTML="";
        win.style.visibility="hidden";
        win_player.style.visibility="hidden";

        for (let player of game.players){player.score=0; player.domElement.textContent="0"};

        game_active=true;
        
        game.reset_board()

        board_fe.addEventListener("click",board_handler)

        update_screen();
        
    }

    reset.addEventListener("click", reset_handler)

}


Controller();

