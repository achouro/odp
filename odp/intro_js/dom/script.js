const container=document.querySelector("#containers")

const content=document.createElement("div")

content.classList.add("content")
content.textContent ="Text of the content class"
container.appendChild(content)

const para=document.createElement("p")

para.classList.add("redone")
para.textContent="Hey! i am red."
para.style.color="red"
container.appendChild(para)

const h3=document.createElement("h3")

h3.classList.add("blueone")
h3.textContent="Hey! i am blue."
h3.style.color="blue"
container.appendChild(h3)

const subcontent=document.createElement("div")

subcontent.classList.add("subcontent")

const h1=document.createElement("h1")
//h1.classList.add("h1")
h1.textContent="I am a div"
subcontent.appendChild(h1)

const subpara=document.createElement("p")
//subpara.classList.add("h1")
subpara.textContent="Me too"
subcontent.appendChild(subpara)    

container.appendChild(subcontent)


container.appendChild(content)


btn=document.querySelector("#btn")

//btn.onclick=()=>alert('Hello world!')

btn.addEventListener("click", ()=>alert("Hello World!"))


bton=document.querySelector("#bton")

bton.addEventListener("click",function(e){ console.log(e)} )

bton.addEventListener("click", function(e){e.target.style.background="blue";})


const buttons=document.querySelectorAll("button")

buttons.forEach(
    (button)=> {
        button.addEventListener("click", ()=> alert(button.id));
    }
)