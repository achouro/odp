
selection=document.querySelector("#size")

selection.addEventListener("change",
    (event)=>{
        
        size=event.target.value;
        build_grid(size);
        call_input();
        
    } )

var body=document.querySelector("body")

var output=document.querySelector("#output")

function build_grid(size){


    output.innerHTML="";
    
    var variable=size;
    
    frame=document.createElement("div")
    frame.id="frame"
    frame.style=`
                display:flex;
                flex-wrap:wrap;
                box-sizing:content-box;
                width: 500px; 
                height: 500px; 
                
                margin:30px 30px;
                border:15px red solid;`
    console.log(frame.style.height)

    var v_width=to_digit(frame.style.width)/variable +"px";
    var v_height=(to_digit(frame.style.height))/variable +"px";

    var v_border=to_digit(frame.style.border)
    var v_borders=1/variable;
    
    console.log(v_border,v_borders , typeof v_border)
    
    console.log(v_width,v_height);
    

    v_number=(variable)*(variable) ;

    for(i=1;i<=v_number; i++){
        
        frames=document.createElement("div")
        frames.className="frames"
        frames.id=`${i}`;
        frames.style=`
                     margin:0 auto;
                     box-sizing:border-box;
                     color:white;
                     background: white;
                     border:0.5px black solid;
                     `
        frames.style.height=v_height;
        frames.style.width=v_width;

        frame.appendChild(frames) 
    }
    

    output.appendChild(frame)

    set_up_message()

    set_up_reset()
 }

build_grid(size=16)


function call_input(){

    
    frames=document.querySelectorAll(".frames")
    //console.log(Array(frames))
    frames.forEach(
        (one_frame)=>{
            var v_opacity=0.1;
            one_frame.addEventListener('mouseover', 
                (event)=>{
                    one_frame.style.background="black";
                    v_opacity+=0.1
                    one_frame.style.opacity=`${v_opacity}`;
            })

            one_frame.addEventListener('click', 
            (event)=>{
                one_frame.style.background="white";
            })
            
    })

   }
call_input()

//

/// Set-up functions
function set_up_reset(){
    reset=document.createElement("button")
    reset.id="reset";
    reset.textContent="Reset"
    output.appendChild(reset)
    
    reset.addEventListener("click", (event)=>{build_grid(16); call_input();})
    
    //output.style="display:flex; flex-direction: column; align-items: center;"
}

function set_up_message(){
    message=document.createElement("p")
    message.id="message";
    message.textContent="Use your mouse to hover around the screen to display you drawing"
    output.appendChild(message)
    output.style="display:flex; flex-direction: column; align-items: center;"
}
/// Utils
function to_digit(css){
/// \d+ for digit; \D+ for non-digit / /g for global 
c=css.match(/\d+|\D+/g);
c=Number(c[0]);
return c
}

