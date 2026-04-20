console.log("Rock Paper Scissors")

function get_computer_choice(){
  var choice="";
  var nb= Math.random()*3;

  if(nb>=0 &&nb<1){ choice="Rock";}
  if(nb>=1 &&nb<2){ choice="Paper";}
  if(nb>=2 &&nb<3){ choice="Scissors";}
 

  return choice;
}

//console.log(get_computer_choice())

function get_human_choice(){

  var choice=prompt("Please input your choice:");

  choice=choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase()  
  
  return choice;

}


function play_round(human_selection, computer_selection){

  var winner="";

  if(human_selection="Rock"){
    if(computer_selection="Scissors"){
    var winner="Human";
    console.log("Human wins round!");
    break;
    //human_score+=1;
    }
    else if(computer_selection="Paper"){
    var winner="Computer";    
    console.log("Computer wins round!");
    break;
    //computer_score+=1;
    }
    if(computer_selection="Rock"){
    console.log("Draw try again!");
    play_round(get_human_choice, get_computer_choice);
    }

  }

  else if(human_selection="Paper"){
    if(computer_selection="Rock"){
    var winner="Human";
    console.log("Human wins round!");
    break;
    //human_score+=1;
    }
    if(computer_selection="Scissors"){
    var winner="Computer";
    console.log("Computer wins round!");
    break;
    //computer_score+=1;
    }
    else if(computer_selection="Paper"){
    console.log("Draw try again!");
    play_round(get_human_choice, get_computer_choice);
    }

  }

  else if(human_selection="Scissors"){
    if(computer_selection="Paper"){
    var winner="Human";
    console.log("Human wins round!");
    break;
    //human_score+=1;
    }
    if(computer_selection="Rock"){
    var winner="Computer";
    console.log("Computer wins round!");
    break;
    //computer_score+=1;
    }
    else if(computer_selection="Scissors"){
    console.log("Draw try again!");
    play_round(get_human_choice, get_computer_choice);
    }

  }

  return winner;
}
//console.log(` Human: ${human_score} | Computer: ${computer_score} `)

function play_game(){

  var computer_score=0;
  var human_score=0;

  for(i=1; i<=5;i++){ 
    var  computer_selection=get_computer_choice();
    var human_selection=get_human_choice();
    console.log(human_selection, computer_selection);
  
    play_round(human_selection, computer_selection);
    

    if(winner="Human"){
      human_score+=1;
    }
    else if(winner="Computer"){
      computer_score+=1;
    }
    else{
      var  computer_selection=get_computer_choice();
      var human_selection=get_human_choice();
      console.log(human_selection, computer_selection)
      play_round(human_selection, computer_selection);
    }   
   
 
    console.log(` Human: ${human_score} | Computer: ${computer_score} `)

  }
}

console.log(play_game())
