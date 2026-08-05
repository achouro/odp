import {data} from './data.jsx';
import {useState} from 'react';

export default function Gallery(){

    const [index, setIndex]= useState(0);
    const [show, setShow]= useState(false);

    function handle_click(){ 
        setIndex((index)=> {
            return (index+1)%data.length; 
        })}

    function show_more(){
        setShow((show)=>{return !show; })

    }

    let slide= data[index];

    return(
        <>
            <button onClick={handle_click}>Next</button> 
            <h2>{slide.name} by {slide.artist}</h2>  
            <p>{index+1} of {data.length}</p>
            <img src={slide.url} alt={slide.alt}></img>
            <br/>
            <>
            <button onClick={show_more}>{show ? 'Hide' :'Show' } Description</button>
            {show && <p>{slide.description}</p>}
            </>
            

        </>
        );
}