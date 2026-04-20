const dialog=document.getElementById("my_dialog")

const show_button=document.getElementById("show_button")
const close_button=document.getElementById("close_button")

const send_button=document.getElementById("send_button")

const request=document.getElementById("request")
const output=document.getElementById("output")

function engage(){
  const question=dialog.showModal();
}

function leave(){
  const question=dialog.close();
}

show_button.addEventListener("click", engage)
close_button.addEventListener("click", leave)


function process(){
  dialog.close()
  const output_value=request.value
  output.textContent=`Request for ${output_value} has been handled.`

  //alert("Request for ${input} is being handled." )
}
send_button.addEventListener("click", process)
