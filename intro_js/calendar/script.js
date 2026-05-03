const select=document.querySelector("select");
const html=document.querySelector("html");

const list=document.querySelector("ul");
const h3=document.querySelector("h3");

const a_31_day_month=["january", "march", "mai", "july", "august", "october", "december"];
const a_30_day_month=[ "april", "june", "september", "november"]

const a_29_day_month=["february"]

function create_calendar (month){
   let days=31;
   if(a_31_day_month.includes(month)){let days=31; }
   else if(a_30_day_month.includes(month)){let days=30; }
   else if(a_29_day_month.includes(month)){let days=29; }

   list.textContent="";
   h3.textContent=month.charAt(0).toUpperCase() + month.slice(1);
  
   for(let i=1; i<=days; i++){
     const list_item=document.createElement("li");
     list_item.textContent=i;
     list.appendChild(list_item); 
   }
}

select.addEventListener("change", 
  ()=> {const choice=select.value; create_calendar(choice); });




console.log(select)

function update(background_color, text_color){
  html.style.backgroundColor=background_color;
  html.style.color=text_color;
}




