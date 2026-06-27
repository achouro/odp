import "./style.css"
import query_load from "./pages/todo.js"


const nav=document.createElement("div");
nav.classList.add("nav")


const left_button=document.createElement("button");
left_button.classList.add("left_button")
const image_left=document.createElement("img")
image_left.src=require('../src/images/cloudy.png')
left_button.appendChild(image_left)

left_button.addEventListener("click",query_load)


const todo=document.createElement("button");
todo.classList.add("weather")
todo.textContent="Weather"
todo.addEventListener("click",query_load)


const right_button=document.createElement("button");
right_button.classList.add("right_button")
const image_right=document.createElement("img")
image_right.src=require('../src/images/hot.png')
right_button.appendChild(image_right)

right_button.addEventListener("click",query_load)


nav.append(left_button, todo, right_button)

const content=document.createElement("div");
content.classList.add("content")


document.body.append(nav, content);

query_load()

