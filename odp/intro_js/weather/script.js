const select= document.querySelector("select");
const para= document.querySelector("p");

function response(){
  const choice=select.value;
  
  if(choice==="sunny"){para.textContent="You better get them sunnies out!"; }
  else if(choice==="rainy"){ para.textContent="You better get your umbrella out!";}
  else if(choice==="cloudy"){para.textContent="Uh! Just chill."; }
  else if(choice==="snowy"){para.textContent="You better get them gloves on! And also, your coat, very important!"; }
  //console.log(select.value)
  console.log(choice)

}

select.addEventListener("change", response);


//console.log(selection)
//console.log(response)
console.log(select)
