const name=document.querySelector("#ID")
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
            message.textContent=`Hello ${name.value}, your request has been submitted successfully!`;
        }
        else{
            message.textContent=`Hi ${name.value}, there are only ${available} left for ${item.value}.`;
        }
    }
)