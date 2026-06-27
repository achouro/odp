let menu_html=`<div class="left">
            <div class="title">My Tasks:</div>
            <div class="part today">
                <div class="time">Today</div>
                <div class="box today">
                    <input type="checkbox" id="today" name="today">
                    <label for="today"></label>
                </div>
            </div>
            <hr>
            <div class="part tomorrow">
                <div class="time">Tomorrow</div>
                <div class="box tomorrow">
                    <input type="checkbox" id="tomorrow" name="tomorrow">
                    <label for="tomorrow"></label>
                </div>
            </div>
            <hr>
            <div class="part this_week">
                <div class="time">This Week</div>
                <div class="box this_week">
                    <input type="checkbox" id="this_week" name="this_week">
                    <label for="this_week"></label>
                </div>
            </div>
            <hr>
            <div class="part this_month">
                <div class="time">This Month</div>
                <div class="box this_month">
                    <input type="checkbox" id="this_month" name="this_month">
                    <label for="this_month"> </label>
                </div>
            </div>
        
         </div>
         <div class="right">
            
            <form id="add_form"> 
                <fieldset>
                    <legend>Search by Location:</legend>

                    <div class="box">
                        <label for="title">City:</label>
                        <input type="text" id="city" name="city" placeholder="New Haven, CT">
                    </div>
                    <div class="box">
                        <label for="project">Prevision:</label>
                        <input type="text" id="project" name="project" placeholder="Temperature">
                    </div>
                    
                    <div class="box">
                        <label for="date">Date:</label>
                        <input type="date" id="date" name="date">
                    </div>

                    <legend>Search on the Map:</legend>
                    <div class="box map">
                        
                        <input type="map" id="map" name="map">
                    </div>
                    
                    <button class="submit" type="submit"><img src="${require('../images/add.png')}"></button>
                
                </fieldset>
            </form>
               </div>`

export function load_html(){

    const content=document.querySelector(".content");
    content.innerHTML="";

    const todo=document.createElement("div");
    todo.classList.add("todo")
    todo.style="display:flex; flex-direction:column; align-items:center; justify-content:center;"


    const subtitle=document.createElement("h3");
    subtitle.classList.add("subtitle")
    subtitle.textContent="Check Your Location Weather Previsions and More!"


    const themenu=document.createElement("div");
    themenu.classList.add("themenu")
    themenu.innerHTML= menu_html;

    themenu.style="display:flex; flex-direction:row; align-items:center; justify-content:space-between;"

    todo.append(subtitle, themenu)

    content.append(todo)

}

export function read_html(){
    const add=document.querySelector("fieldset button")
    const form=document.querySelector("form")

    const tasks=document.querySelector("div.box")

    return{add, form}
}

export class Task{
    constructor(title, project, tasks, date, priority){
    //constructor({title="My Task", project="My Project", tasks="", date=new Date().toISOString, priority=1}={}){
        this.title=title;
        this.project=project;
        this.tasks=tasks;
        this.date=date;
        this.priority=priority;

        this.status='pending';
        this.created= new Date().toISOString();
        
    }

    done(){ this.status='done'; }

    get_task(){return this; }

    set_task_item(item, to){if(item in this) {this[item]=to;}}


}


export function clear_form(){
    const title=document.querySelector("input#title")
    const project=document.querySelector("input#project")
    const tasks=document.querySelector("textarea#tasks")
    const date=document.querySelector("input#date")
    const priority=document.querySelector("input#priority")

    title.value="";
    project.value="";
    tasks.value="";
    date.value="";
    priority.value="";

    
}

export let mytasks=[];
export let alltasks=[];


export function update_tasks(){
    
    const date= new Date()
    const today=date.toISOString().split('T')[0];
    
    for(let i=0; i<localStorage.length; i++){
    
        if(localStorage.key(i)){
            const saved_task=JSON.parse(localStorage.getItem(localStorage.key(i)));
    
            const my_task=new Task(saved_task.title, saved_task.project, saved_task.tasks, saved_task.date, saved_task.priority);

            my_task.id=localStorage.key(i);
            my_task.status= saved_task.status || "pending"

            alltasks.push(my_task);
            
            if(my_task.status==='pending' && my_task.date>=today){
                mytasks.push(my_task);

            }
            localStorage.setItem(localStorage.key(i), JSON.stringify(my_task))
            

            
        }
    
    }
}

//update_tasks();


export function handle_add(){
    
    const add_form=document.querySelector("form#add_form")

    add_form.addEventListener("submit",(event)=>{
        
        event.preventDefault();

        const form_data= new FormData(add_form);

        const data =Object.fromEntries(form_data.entries());

        localStorage.setItem(`task-${Date.now()}`, JSON.stringify(data));

        let task_object=JSON.parse(localStorage.getItem(`task-${Date.now()}`))
        
        const new_task=new Task(task_object.title, task_object.project, task_object.tasks, task_object.date, task_object.priority)

        new_task.id=`task-${Date.now()}`;
        new_task.status='pending';
        

        mytasks.push(new_task);
        alltasks.push(new_task);

        
        console.log(mytasks);

        clear_form();

        const dates=handle_time();

        display_tasks(dates);
        

    })
    


}

//console.log(alltasks)

export function handle_time(){
    
    const date= new Date()
    
    const today=date.toISOString().split('T')[0];

    date.setDate(date.getDate() +1)
    
    const tomorrow=date.toISOString().split('T')[0];
    
    const this_week=[];
    const this_month=[];
    
    for(let i=2; i<30;i++){

        const loop_date=new Date();

        loop_date.setDate(loop_date.getDate()+i); 

        if(i<7){
            this_week.push(loop_date.toISOString().split('T')[0])}
        
        this_month.push(loop_date.toISOString().split('T')[0])
   
    }

    return {today, tomorrow, this_week, this_month}
    
    
} 

export function display_tasks(dates){

    const containers={
        today:document.querySelector(".box.today"), 
        tomorrow:document.querySelector(".box.tomorrow"),
        this_week:document.querySelector(".box.this_week"),
        this_month:document.querySelector(".box.this_month")
    }    
    
    const cleared = new Set()

    for(let i=0; i<mytasks.length; i++){
        
        const task=mytasks[i];

        let target_box=null;

        if(dates.this_month.includes(task.date)){
            target_box=containers.this_month;
        }

        if(dates.this_week.includes(task.date)){
            target_box=containers.this_week;
        }

        if(task.date===dates.tomorrow){
            target_box=containers.tomorrow;
        }

        if(task.date===dates.today){
            target_box=containers.today;
        }

        if(!target_box){ continue;}

        const target_date=target_box.classList[1];
        //console.log(target_date)

        const task_display=document.createElement("div")
        task_display.classList.add("task_display")

        const project=document.createElement("div")
        project.classList.add("project")
        project.textContent=task.project + " | "
        
        const title=document.createElement("div")
        title.classList.add("title")
        title.textContent=task.title + `:`

        const check=document.createElement("input")
        check.type="checkbox";
        check.name=target_date;
        check.id=target_date;

        const firstpart=document.createElement("div")
        firstpart.classList.add("firstpart")
        firstpart.append(check, project, title)

        const priority=document.createElement("div")
        priority.classList.add("priority")
        if(task.priority===1){
            priority.classList.add("low")
        }
        else if(task.priority===2){
            priority.classList.add("mid")
        }
        else if(task.priority===3){
            priority.classList.add("high")
        }

        
        const firstline=document.createElement("div")
        firstline.classList.add("firstline")
        firstline.append(firstpart, priority)
        
        const tasks=document.createElement("div")
        tasks.classList.add("tasks")
        tasks.textContent=task.tasks

        const box=document.createElement("div")
        box.classList.add("box")

        box.append(firstline, tasks)
        

        if(!cleared.has(target_box)){
            target_box.innerHTML="";
            cleared.add(target_box)
        }
        

        target_box.append(box);   
        
    }                
}



export function handle_check(){
    
    const checks=document.querySelectorAll("input[type='checkbox']")

    for(let i=0; i<checks.length; i++){
        
        const check=checks[i];

        check.addEventListener("change", ()=>{

            const container=check.closest(".box")
            const title=container.querySelector(".title").textContent.replace(":", "").trim();

            //console.log(title)

            const target_mytask=mytasks.find((task)=>title===task.title)
            const target_alltask=alltasks.find((task)=>title===task.title)
            //console.log(target_mytask)
            
            if(target_mytask) {target_mytask.status='done';}
            if(target_alltask) {target_alltask.status='done';}

            if(target_mytask.id){
                const stored=JSON.parse(localStorage.getItem(target_mytask.id));
                stored.status='done';
                localStorage.setItem(target_mytask.id, JSON.stringify(stored))
            }
            
            container.innerHTML="";
            
        })
    }
    
}
console.log(mytasks)



export function handle_priority(){
    let priority= document.querySelector("input#priority")

    let choices=document.querySelectorAll(".choices button")

    if(!(choices && priority)){return;}
    //console.log(choices)

    for(let i=0;i<choices.length;i++){
        let choice=choices[i];

        choice.addEventListener("click",()=>{

            const level=choice.dataset.level;
            
            if(priority){priority.value=level;}
            
            
        })
    }
    

}

//handle_priority();

export function fix_priority(){

    for(let i=0; i<alltasks.length; i++){
        
        const task=alltasks[i];

        const gen_priority= Math.floor(Math.random()*3) +1;
        
        const stored=JSON.parse(localStorage.getItem(task.id));
        stored.priority=gen_priority;
        localStorage.setItem(task.id, JSON.stringify(stored));
    }
    
}

