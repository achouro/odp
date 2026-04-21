

const operate = function(a, b, operator){
	//return callback(Number(a),Number(b));
	switch(operator){
		case "+": return (Number(a)+Number(b)).toFixed(3);
		case "-": return (Number(a)-Number(b)).toFixed(3);
		case "*": return (Number(a)*Number(b)).toFixed(3);
		case "/": return (Number(a)/Number(b)).toFixed(3);
		//case "/": return (Number(b)===0) ? "ERROR" : (Number(a)/Number(b)).toFixed(3);
		default : return "";
	}
}
//console.log(operate("1","0","/"))

function read_html(){
	input=document.querySelector(".operational")
	numbers=document.querySelector(".numbers")
	operators=document.querySelector(".operators")
	screen=document.querySelector(".screen .input")
	reset= document.querySelector(".screen .reset")
	equal=document.querySelector("#equal")
}

function initialise(){
	
	let message="";
	let tokens=[];
	let ops=[];
	let result=null;
	
	let a=null;
	let b=null;
	let op=null;
}

function get_message(){

	message="";

	input.addEventListener("click", 
		(event)=>{
			message+=event.target.textContent;
			
			if(event.target.id==="equal"){return;}
			screen.textContent+=event.target.textContent;
		})

	console.log(message)
	return message;
}

function transform(){

	message=screen.textContent;

	tokens=message.split(/([+\-*)/])/)

	//console.log(tokens)
	return tokens

}

function calculate(){
	
	result= 0;
	ops=tokens

	while(ops.length>1){

		//tbf: operation/loop not considered likely if conditional
		for(let i=0; i<=Math.floor((tokens.length)) -2 ;i++){
				
			a=ops[2*i];
			op=ops[2*i +1];
			b=ops[2*i +2];

			console.log(a,op,b)
		
			if(op && b){
				
			if(op==="*" || op==="/"){
				
				local_result=Number(operate(Number(a),Number(b),op))
				
				console.log(local_result)
				ops[2*i]=local_result;
				ops.splice(2*i+1,2)
				console.log(ops, "*/")	

				i-=1;
				continue;

				
				
			}
			}
			
		}

		for(let i=0; i<Math.floor((ops.length)/3)  ;i++){

			a=ops[3*i];
			op=ops[3*i+1];
			b=ops[3*i+2];

			if(!(op==="*" ||op==="/")){
			   if((op==="+" || op==="-")){
				
				result=Number(operate(a,b,op))
				ops[3*i]=result;
					
				ops.splice(i+1,2)
				console.log(ops, "+-")
				}
			}
			
		}
	
	}	
	if(Number.isNaN(ops[0])){return "ERROR"; return;} 

	return ops;
}

function display_result(){

	equal.addEventListener("click", (event)=>{
		
		message=message;
		//console.log(message)
		tokens=transform(message);
		console.log(tokens)
		result=calculate(tokens);
		console.log(result)
		screen.textContent=""
		screen.textContent=result;	
	})
	
}


function reset_(){

	reset.addEventListener("click",
		(event)=>{
			screen.textContent=""
			initialise()
		})
}


function orchestrate(){
	
	read_html()
	initialise()

	get_message()

	display_result()

	reset_()
}


orchestrate()