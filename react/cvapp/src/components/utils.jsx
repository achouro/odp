import {useState, StrictMode} from 'react'

export class Person{
    constructor(name="Joey Don", email="joey@gmail.com", number="+1234567890", education=null, work=null){
        this.name=name;
        this.email=email;
        this.number=number;
        this.education=education || [{school:"", title:"", graduation_date:"" },];
        this.work= work || [{company:"", title:"",location:"", responsibilities:"", date_start:"", date_end:""},];
    }
}

export function Add_details(){
    
    const init_person= new Person();
    const [person, set_person]=useState(init_person);
 
    const [details_state, set_details_state]=useState(false);

    const [loading, set_loading]=useState(false);
    const[submitted, set_submitted]=useState(false);

    
    //section being either education or work
    const handle_change=(event, section, index=null)=>{
        //event.preventDefault();
        const {name, value}=event.target;

        if(!section){
            set_person((prev_info)=>({...prev_info, [name]:value}));
        }

        else{
            
            set_person((prev_info)=>{

                const history= [...prev_info[section]];
                history[index]={...history[index], [name]:value};
                
                return {...prev_info, [section]:history}

            })
        }
        

    }

    const handle_add=(event, section)=>{
        event.preventDefault();
        
        const boilerplate = (section==='education') ? {school:"", title:"", graduation_date:""} 
                                               : {company:"", title:"", location:"", responsibilities: "", date_start: "", date_end: "" }

        set_person((prev_info=>({...prev_info, [section]:[...prev_info[section], boilerplate] })
    ))

    }


    const handle_submit=(event)=>{
        event.preventDefault();
        set_loading(true);

        setTimeout(()=>{ 
            set_loading(false);
            set_submitted(true)}, "2s")

    }

    if(loading){
        return (<h2>Loading...</h2>);

    }

    //if(submitted){ return (<h2>CV Built successfully</h2>)}

    return(
        
        <div className={`container ${submitted ? "split_screen" : ""}`}>

            <div className='left'>

            <div className="builder">

            <form onSubmit={handle_submit}>
                
                

                {details_state && ( 
                    <fieldset>
                        <div >
                            <fieldset>
                            <legend>Personal Details:</legend>
                            <section >
                                <div className="one-part">
                                    <label for="name">Name:</label>
                                    <input type="text" name="name" value={person.name} onChange={handle_change}></input>
                                </div>
                                <div className="one-part">
                                    <label for="email">Email:</label>
                                    <input type="email" name="email" value={person.email} onChange={handle_change}></input>
                                </div>
                                <div className="one-part">
                                    <label for="number">Number:</label>
                                    <input type="number" name="number" value={person.number} onChange={handle_change}></input>
                                </div>
                            </section>
                            </fieldset>

                            <fieldset>
                                <legend>Education:</legend>
                                {person.education.map((education, index)=>(
                                    <section key={index}>
                                        <div className="one-part">
                                            <label for="school">School:</label>
                                            <input type="text" name="school" id={`school-${index}`} value={education.school} onChange={(event)=>handle_change(event, 'education', index)}></input>
                                        </div>

                                        <div className="one-part">
                                            <label for="Title">Degree Title:</label>
                                            <input type="text" name="title" id={`title-${index}`} value={education.title} onChange={(event)=>handle_change(event, 'education', index)}></input>
                                        </div>
                                        <div className="one-part">
                                            <label for="graduation_date">Graduation Date:</label>
                                            <input type="date" name="graduation_date" id={`graduation_date-${index}`} value={education.graduation_year} onChange={(event)=>handle_change(event, 'education', index)}></input>
                                        </div>
                                    </section>
                                ))}

                                <div class="button"><button type="button" onClick={(event)=>{handle_add(event, 'education')}}>Add Education</button></div>
                            </fieldset>

                            <fieldset>
                                <legend>Work Experience:</legend>
                                {person.work.map((work, index)=>(
                                    <section key={index}>
                                        <div className="one-part">
                                            <label for="company">Company:</label>
                                            <input type="text" name="company" id={`company-${index}`} value={work.company} onChange={(event)=>handle_change(event, 'work', index)}></input>
                                        </div>
                                        <div className="one-part">
                                            <label for="title">Title:</label>
                                            <input type="text" name="title" id={`title-${index}`}  value={work.title} onChange={(event)=>handle_change(event, 'work', index)}></input>
                                        </div>
                                        <div className="one-part">
                                            <label for="location">Location:</label>
                                            <input type="text" name="location" id={`location-${index}`}  value={work.location} onChange={(event)=>handle_change(event, 'work', index)}></input>
                                        </div>
                                        <div className="one-part">
                                            <label for="start_year">Start Year:</label>
                                            <input type="date" name="date_start" id={`start_year-${index}`} value={work.date_start} onChange={(event)=>handle_change(event, 'work', index)}></input>
                                        </div>
                                        <div className="one-part">
                                            <label for="end_year">End Year:</label>
                                            <input type="date" name="date_end"id={`end_year-${index}`}  value={work.date_end} onChange={(event)=>handle_change(event, 'work', index)}></input>
                                        </div>
                                        <div className="one-part">
                                            <label for="responsiblities">Responsibilites:</label>
                                            <textarea type="textarea" rows="4" name="responsibilities"id={`responsibilities-${index}`}  value={work.responsibilities} onChange={(event)=>handle_change(event, 'work', index)}></textarea>
                                        </div>
                                    </section>))}

                                <div class="button"><button type="button" onClick={(event)=>{handle_add(event, 'work')}}>Add Work Experience</button></div>
                            </fieldset>

                            <div class="submit button">
                                <button type="submit">{submitted ? "Update CV" : "Build CV"}</button>
                            </div>
                            
                        </div> 
                    </fieldset>
                )}
                
                

                </form>
            </div>

            <button type="button" className="hide" onClick={()=>{set_details_state(!details_state)}}>
                    {details_state ? "Hide Details" : "Add Details"}
            </button>
            </div>

            {submitted && (
                <div className='right'>

                <div className="preview">
                   
                    <div className='header'>
                        <div className='name'><h2>{person.name}</h2></div>
                         
                        <div className='title'>
                            {person.work.title}
                        </div>
                    </div>
                    <div className="body">
                        

                        <h3>Work Experience</h3>
                        <div className='work'>
                        {person.work.map((work,index)=>(

                                <div key={index}>
                                    <div><strong>{work.title}</strong></div>
                                    <div>{work.company} {work.location ? `, ` : ''}{work.location}</div>
                                    <div className="dates">
                                        <div>{work.date_start}{work.date_start ? ` - ` : ""} {work.date_end}</div>
                    
                                    </div>
                                    <div className="responsibilities">
                                        <ul>
                                        {work.responsibilities.split(/[\.,]/).map((respo, index)=>{
                                        const clean=respo.replace(/-*^\*s/,'').trim();
                                        if(!clean){return null;}
                                        return(<li key={index}>{clean}</li>)
                                        }
                                    )}
                                        </ul>
                                    
                                    </div>
                                </div>
                            ))}
                    </div>

                    <h3>Education</h3>
                        <div className='education'>
                        {person.education.map((education,index)=>(

                                    //want to use className=`education-${index}`
                                    <div key={index}>
                                        <div><strong>{education.title}</strong></div>
                                        <div>{education.school}</div>
                                        <div>{education.graduation_date}</div>
                                    </div>
                        ))}
                        </div>

                    </div>
                    <div className='footer'>
                        <div className='sub'>
                        <div className='email'><strong>Email:</strong>{person.email}</div>
                        <div className='number'><strong>Phone:</strong>{person.number}</div>
                        </div>
                    </div>
                </div>

                <div className='download'>
                        <button type='button' className="download" onClick={()=>window.print()}>Download CV</button>
                </div>
                
            </div>
            )}
        </div>
        )

}

