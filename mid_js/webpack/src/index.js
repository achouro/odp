import "./style.css"
import {greeting} from "./greeting.js"

import greet_image from "./firework.png"

console.log(greeting);

const block=document.createElement("h3");
block.textContent= greeting;
//block.textContent="Hello M8!"

const image=document.createElement("img");
image.src=greet_image;

document.body.appendChild(block);
document.body.appendChild(image);