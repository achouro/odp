import "./style.css"
import home_load from "./pages/home.js"
import menu_load from "./pages/menu.js"
import about_load from "./pages/about.js"


const nav=document.createElement("div");
nav.classList.add("nav")


const home=document.createElement("button");
home.classList.add("home")
home.textContent="Secret Juice"
home.style="background-color:transparent"
home.addEventListener("click",home_load)


const menu=document.createElement("button");
menu.classList.add("menu")
menu.textContent="Menu"
menu.style="background-color:transparent"
menu.addEventListener("click",menu_load)


const about=document.createElement("button");
about.classList.add("about")
about.textContent="About"
about.style="background-color:transparent;";
about.addEventListener("click",about_load)


nav.append(home, menu, about)

const content=document.createElement("div");
content.classList.add("content")



document.body.append(nav, content);

home_load()
//menu_load()
