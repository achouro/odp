function Cell(){

    let value="";

    const add_token=(player)=>{
        value= (player===game.players[0].name) ? game.players[0].token : game.players[1].token;
    }

    const get_value=()=>value;

    return {add_token, get_value}

}


function Board(){

    let rows=3;
    let columns=3;
    let board=[];

    for(let i=0; i<rows;i++){
        board[i]=[];
        for(let j=0; j<columns; j++){
            board[i].push(Cell());
            
        }
    }

    const get_board=()=>board;

    const is_available=(row, column)=>{
        
        if(board[row][column].get_value()===""){
            return true;
        }
        return false;
    }

    const place_token=(player, row, column)=>{

        if(!is_available(row,column)){ return;}

        board[row][column].add_token(player.name);

        is_available(row, column)===false;

    }

    return {get_board, place_token}

}


function Game(){

    let board= Board();

    let players=[{name:"Player 1", token:"X", score:0, domElement:document.querySelector(".score.one")},
                 {name:"Player 2", token:"O", score:0, domElement:document.querySelector(".score.two")}]

    let active_player=players[0];

    const get_active_player=()=>active_player;

    const switch_player=()=>{
        active_player = (active_player===players[0]) ? players[1] : players[0];
        
    }

    const play_round=(row, column)=>{
        board.place_token(active_player, row, column);
    }

    const reset_board=()=>{
        board=Board();
        active_player=players[0];
    }

    return {players,get_board:()=>board.get_board(), get_active_player, switch_player, play_round, reset_board}
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

        board_be=game.get_board();

        active_player=game.get_active_player();

        turn.textContent=active_player.name;

        board_fe.textContent="";

        for(let i=0; i<board_be.length;i++){
            row=board_be[i];

            for(let j=0; j<board_be[i].length; j++){
                
                col=board_be[i][j];

                const cell=document.createElement("button");
                cell.classList.add("cell");
                cell.dataset.row=i;
                cell.dataset.column=j;
                

                let name=board_be[i][j].get_value();

                if(name){
                    let icon=document.createElement("img");
                    icon.classList.add(name);
                    icon.src=`images/${name}.png`;
                    cell.appendChild(icon)

                }
                board_fe.appendChild(cell)

            }
        }

    }

    const check_winner=(board, row, col, player)=>{

        const directions=[[{x:1, y:0}, {x:-1, y:0}],
                          [{x:0, y:1}, {x:0, y:-1}],
                          [{x:1, y:1}, {x:-1, y:-1}],
                          [{x:1, y:-1}, {x:-1, y:1}]]

        for(const direction of directions){

            let count=0;

            for( let {x,y} of direction){

                let row_search= row + x;
                let col_search= col + y;

                while(row_search>=0 && row_search<board.length && col_search>=0 && col_search<board[0].length){

                    let position=board[row_search][col_search].get_value();

                    if(position===player.token){

                        count+=1;

                        row_search+=x;
                        col_search+=y;

                        
                    }
                    else{ break;}               
                }
                
            }
            if(count>=2){return true;} 
        }
        return false;
    }

    
    const check_tie=(board)=>{

        for(let i=0; i<board.length;i++){
            
            for(let j=0; j<board[i].length; j++){

                if(board[i][j].get_value()===""){ return false;}
            }
        }
        return true;
    }
    

    const update_winner=()=>{

        active_player=game.get_active_player();

        round_won=false;

        for(let i=0; i<board_be.length;i++){
            for(let j=0; j<board_be[i].length;j++){

                if(board_be[i][j].get_value()===active_player.token)
                if(check_winner(board_be, i, j, active_player)){
                    round_won=true;
                } 
            }
        }

        if(round_won){
            
            win_player.style.visibility="visible";
            win_player.textContent=active_player.name;
            win.style.visibility="visible";

            active_player.score=Number(active_player.score)+1;
            active_player.domElement.textContent=active_player.score;

            game_active=false;
            return;
        }

        
        if(check_tie(board_be)){
            
            win.textContent="It's a tie! Press Next!"
            win.style.visibility="visible";
            win.style.fontSize="1rem";
            game_active=false;
        }
        

    }

    const board_handler=(event)=>{

        if(!game_active){return;}

        const selected_column=Number(event.target.dataset.column);
        const selected_row=Number(event.target.dataset.row);

        game.play_round(selected_row, selected_column)

        update_winner();

        update_screen();

        if(game_active){game.switch_player();}        

    }

    board_fe.addEventListener("click", board_handler)

    update_screen();

    const next_handler=()=>{

        board_fe.innerHTML="";
        win.style.visibility="hidden";
        win_player.style.visibility="hidden";       
        
        game_active=true;

        game.reset_board();

        board_fe.addEventListener("click", board_handler)

        update_screen();


    }

    next.addEventListener("click", next_handler)

    const reset_handler=()=>{

        board_fe.innerHTML="";
        win.style.visibility="hidden";
        win_player.style.visibility="hidden";  
        
        for(let player of game.players){player.score=0; player.domElement.textContent="0";}
        
        game_active=true;

        game.reset_board();

        board_fe.addEventListener("click", board_handler)

        update_screen();

    }

    reset.addEventListener("click", reset_handler)

}

Controller();