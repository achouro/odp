const button=document.querySelector("button")
const input=document.querySelector("input")
const output=document.querySelector(".output")

const contacts=["Chris:2232322","Sarah:3453456", "Bill:7654322",
  		"Mary:9998769", "Dianne:9384975",];

button.addEventListener("click",
	()=>{
	const search=input.value.toLowerCase();
	input.value="";
	input.focus();
	output.textContent="";
	for(const contact of contacts){
	  const split_contact= contact.split(":");
	  if(split_contact[0].toLowerCase() ===search){
		output.textContent=`Phone number for ${split_contact[0]}: ${split_contact[1]}`;
		break;
	  }				

	}
	if(output.textContent=== ""){ 
	  output.textContent="Number not found.";}		
	}
	)

 
