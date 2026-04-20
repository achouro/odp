console.log("Rock Paper Scissors")

/// Computer choice simulator
function get_computer_choice(){
  var choice="";
  var nb= Math.random()*3;

  if(nb>=0 &&nb<1){ choice="Rock";}
  if(nb>=1 &&nb<2){ choice="Paper";}
  if(nb>=2 &&nb<3){ choice="Scissors";}
 
  return choice;
}

/// Single round logic
function play_round_logic(human_selection, computer_selection){
  
  let winner="";
  
  //if(human_selection===computer_selection){ winner="No one";}
  if(human_selection===computer_selection){ winner="Draw! No one";}

  if(human_selection==="Rock"){
    if (computer_selection==="Scissors"){ winner="Human"; }
    else if (computer_selection==="Paper"){ winner="Computer";}
  }

  else if(human_selection==="Paper"){
    if(computer_selection==="Rock"){ winner="Human"; }
    else if(computer_selection==="Scissors"){winner="Computer";}
  }

  else if(human_selection==="Scissors"){
    if(computer_selection==="Paper"){winner="Human"; } 
    else if(computer_selection==="Rock"){ winner="Computer";}
  }

  
  return winner;
}
 
/// Game Entries set-up function
function set_up_game(){

  intro=document.querySelector("div.intro")
  //phrase=document.createElement("p")
  //phrase.textContent=""
  //intro.appendChild(phrase)
  label=document.createElement("label")
  label.textContent="Please select your move:"
  label.htmlFor="choice"
  label.style.fontWeight="bold";
  
  buttons=document.createElement("ul")
  buttons.id="choice"
  buttons.style="display:flex; flex-direction:row; align-items:center; justify-content:center;"
  
  game=document.querySelector("div.game")

  //intro.appendChild(phrase)
  game.appendChild(label)
  game.appendChild(buttons) 

  
  const choices=["Rock", "Paper", "Scissors"]

  for(i=0;i<choices.length; i++ ){
    const choice=choices[i];
    item=document.createElement("li")
    button=document.createElement("button")
    button.type="button"
    button.className="choices"
    button.id=choice
    button.name=choice
    button.textContent=choice
    button.style="list-style-type:none; margin-right:30px; width:100px; height:100px; border-radius:20px";
    
    item.appendChild(button)
    buttons.appendChild(item)

  }
  
}

/// UI components set-up functions
function set_up_selection(){
      selection=document.createElement("p")
      selection.id="selection"
      selection.classList.add="renewable"
      //selection.textContent=`${human_selection} ${computer_selection}`
      renewable.appendChild(selection)
}

function set_up_round(){
        var round_winner="";
        round=document.createElement("p")
        round.id="round"
        round.classList.add="renewable"
        //round.textContent=`${round_winner} wins round!`
        renewable.appendChild(round)
}

function set_up_next(){
      var next=document.createElement("button")
      next.id="next";
      next.classList.add="renewable"
      next.type="button";
      next.textContent="Next Round"
      next.style="width:150px;"
      next.style.visibility="hidden";
      renewable.appendChild(next)
}

function set_up_scores(){
    //var computer_score=0;
    //var human_score=0;
    //var played=0;
    scores=document.querySelector("div.score")
    score=document.createElement("ul")      
    score.id="score";
          
    score_human=document.createElement("li")
    score_human.id="score_human"
    score_human.textContent=` Human: ${human_score}`
    score.appendChild(score_human)
          
    score_computer=document.createElement("li")
    score_computer.id="score_computer"
    score_computer.textContent=` Computer: ${computer_score}`
    score.appendChild(score_computer)
      
    score.style="padding: 10px 60px; display:flex; justify-content:space-between;"
    scores.appendChild(score)
}

function set_up_winner(){    
  let winner="";
  if(human_score>computer_score) { winner="Human";}  
  else if(human_score<computer_score){ winner="Computer";}
  game_win=document.createElement("p")
  //game_win.textContent=`${winner()} wins game!` //`${round_winner} wins game!`
  //renewable.textContent="";
  //game.textContent="";
  renewable.appendChild(game_win)
  return winner;
}

function initialise(){

  set_up_scores()
  set_up_selection()
  set_up_round()
  set_up_next()
  set_up_game()
}

function reset(){
  computer_score=0;
  human_score=0;
  played=0;
  played_first= false;
  
  game.textContent="";
  renewable.textContent="";
  scores.textContent="";
  
  //initialise()
  set_up_scores()
  set_up_selection()
  set_up_round()
  set_up_next()
  set_up_game()
}

/// UI  Human choice call
function round_call(){

const buttons= document.querySelectorAll(".choices")
 
  buttons.forEach(
    (button)=>{
      button.addEventListener( "click", (event)=>{
                              const choice=event.target.id;
                              play_round(choice); } )
    })
}

function play_round(choice){

  var  computer_selection=get_computer_choice()

  var human_selection=choice

  if(human_selection===computer_selection){
    //continue;
    //round_call()
  }

  selection.textContent=`${human_selection} ${computer_selection}`
    
  round_winner = play_round_logic(human_selection, computer_selection);
  console.log(round_winner)

  if(round_winner==="Human"){human_score+=1; played+=1; }
  else if(round_winner==="Computer"){computer_score+=1; played+=1; }

  //else {round_call(); return;}

  
  round.textContent=`${round_winner} wins round!`
  
  next.style.visibility="visible";
  next.textContent="Start Again"

  score_human.textContent=` Human: ${human_score}`
  score_computer.textContent=` Computer: ${computer_score}`

  //played_first=true;
  

} 

/// HTML components 
function read_html(){
game=document.querySelector("div.game")
renewable=document.querySelector("div.renewable")
scores=document.querySelector("div.score")
next=document.querySelector("#next")
play=document.querySelector("button#play")

score_human=document.querySelector("li#score_human")
score_computer=document.querySelector("li#score_computer")
}

///Game orchestration 
function orchestrate(){
  var computer_score=0;
  var human_score=0;
  var played=0;

  read_html()

  play.addEventListener("click", function handle(){

    reset()
  
    read_html()
  
    round_call()
    
    next.addEventListener("click",(event)=> {handle()})
  
  }, {once:true})

}

/// Play game
orchestrate()


