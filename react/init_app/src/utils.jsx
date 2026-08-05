export function Greetings(){
    return <h1>Hello M8!</h1>
}

import koala from "./images/koala.png"
export function Koala(){
    return <div><img src={koala} width={300} height={300}/></div>
}

export function Farewell(){
    return <h1>See you around M8!</h1>
}

//export function Button(props){
    //const style={ color:props.color, width:props.width + "px",height:props.height + "px" };


export function Button({text="Click er m8", color="blue", width=100, height=50}){
    const style={ color:color, width:width + "px",height:height + "px" };

    return(
        <div >
                <button style={style}>{text}</button>
        </div>
        );
}

//Button.defaultProps{text:"Click er m8", color:"blue", width:300, height:300}


export function ButtonSection(){
    const handle_click=(url)=>{
        window.location.href=url
    }
    return(
        <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}} >
            <Button onClick={() => handle_click('https://www.google.com')}></Button>
            <Button text="Careful m8, Don't Click er" color="red" width="100" height="50"></Button>
        </div>
    );
}

export function Animals(){
    const animals=["Lion", "Cow", "Snake", "Lizard"];
    const animals_list=animals.map((animal)=>{return(<li key={animal}>{animal}</li>);})

    return(
        <div>
            <h1>Animals:</h1>
            <ul style={{display:'flex', flexDirection:'row', gap: '1vw'}}>
                {animals_list}
            </ul>
        </div>
    )
}
