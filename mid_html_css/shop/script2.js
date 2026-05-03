const id=document.querySelector("#ID")
const item=document.querySelector("#item")
const quantity=document.querySelector("#quantity")

const message=document.querySelector(".message")
const button=document.querySelector(".button")
const form=document.querySelector("form")

available=7;

form.addEventListener("submit", 
    (event)=>{
        event.preventDefault()
        if(quantity.value<=available){
            message.textContent=`Hi ${id.value}, your request has been submitted successfully!`;
        }
        else{
            message.textContent=`Hi ${id.value}, there are only ${available} left for the ${item.value} item.`;
        }
    }
)