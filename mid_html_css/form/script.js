const first_name=document.querySelector("#first_name")
const last_name=document.querySelector("#last_name")
const age=document.querySelector("#age")
console.log(first_name, last_name, age)
const message=document.querySelector(".message")
const button=document.querySelector(".button")
const form=document.querySelector("form")

form.addEventListener("submit", 
    (event)=>{
        event.preventDefault()
        if(age.value>=18){
            message.textContent=`Hello ${first_name.value}, welcome to the platform!`;
        }
        else{
            message.textContent=`Hi ${first_name.value}, too bad you cannot log in! We'll see you again in a few years!`;
        }
    }
)