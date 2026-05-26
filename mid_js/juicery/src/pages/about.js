export default function about_load(){


    const content=document.querySelector(".content");
    content.innerHTML="";

    const about=document.createElement("div");
    about.classList.add("about")
    about.style="display:flex; flex-direction:column; align-items:center; justify-content:space-between;"


    const title=document.createElement("h1");
    title.classList.add("title")
    title.textContent="Our Story"
    title.style="color: white;"

    const description=document.createElement("div");
    description.classList.add("description")
    description.textContent="Born from a small kitchen, we are commited to make healthy living taste amazing."
    description.style="color: white;"

    const image=document.createElement("img");
    image.classList.add("store")
    image.src=`${require('../images/store.png')}`

    const container=document.createElement("div");
    container.classList.add("container")
    container.style="display:flex; flex-direction:row; align-items:center; justify-content:center;"
    
    container.append(image, description)


    const contact=document.createElement("div");
    contact.classList.add("contact")
    contact.style="display:flex; flex-direction:row; align-items:center; justify-content:center;"
    
    contact.textContent="Give us a call at: (+1) 775 980 2006 \n Or come visit at: 5631 Steeles Ave E, ON M1V 5P6"


    about.append(title, container, contact)

    content.append(about)



}