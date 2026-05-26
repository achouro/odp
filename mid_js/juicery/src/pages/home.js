export default function home_load(){

    const content=document.querySelector(".content");   
    content.innerHTML="";

    const home=document.createElement("div");
    home.classList.add("home")
    home.style="display:flex; flex-direction:column; align-items:center; justify-content:center;"



    const title=document.createElement("h1");
    title.classList.add("title")
    title.textContent="Welcome to our Juice Bar!"
    title.style="color: white;"

    const subtitle=document.createElement("h3");
    subtitle.classList.add("subtitle")
    subtitle.textContent="Do you want the secret juice?"
    subtitle.style="color: white;"

    const image=document.createElement("img");
    image.classList.add("fruits")
    image.src=`${require('../images/fruits.png')}`

    const check=document.createElement("h4");
    check.classList.add("subtitle")
    check.textContent="Check Out our New Menu!"
    check.style="color: white;"
    


    
    home.append(title, image, subtitle, check)

    content.append(home)





}
