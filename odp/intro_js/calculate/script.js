

const operate = function(a, b, operator){
	//return callback(Number(a),Number(b));
	switch(operator){
		case "+": return ( Number(a)+Number(b)).toFixed(3);
		case "-": return (Number(a)-Number(b)).toFixed(3);
		case "*": return (Number(a)*Number(b)).toFixed(3);
		case "/": return b===0 ? "ERROR" : (Number(a)/Number(b)).toFixed(3);
		default : return "Invalid Operation"
	}
}

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
			
			screen.textContent+=event.target.textContent;
		})

	console.log(message)
	return message;
}

function transform(){

	message=screen.textContent;

	tokens=message.split(/([+\-*)/])/)

	console.log(tokens)
	return tokens

}

function calculate(){
	
	a= tokens[0]
	op=tokens[1]
	b= tokens[2]
	
	result= operate(a,b,op)

	if(tokens.length>3){
		for(let i=3; i<=tokens.length-1 ;i++){
			a=result
			op=tokens[i];
			b=tokens[i+1];

			result=operate(a,b,op)
		}
	}

	return result
}
	
function display_result(){

	equal.addEventListener("click", (event)=>{
		//stop listening to operational
		
		message=message;
		console.log(message)
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