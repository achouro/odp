const select=document.querySelector("select");
const html=document.querySelector("html");

console.log(select)

function update(background_color, text_color){
  html.style.backgroundColor=background_color;
  html.style.color=text_color;
}

select.addEventListener(
  "change", 
  ()=> select.value==="black" ? update("black","white") : update("white","black"),
);
