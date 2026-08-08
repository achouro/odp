import { useEffect, useState } from 'react'
import './App.css'
import {characters} from './pinyin.jsx'


export default function App() {

  const [cards, set_cards] = useState([])

  const [score,set_score]=useState(0)
  const [best_score,set_best_score]=useState(0)
  const [message, set_message]=useState("Click only on the cards you have not selected before!")

  const [clicked, set_clicked]=useState([])

  const [loading, set_loading]=useState(false)
  const [number_of_cards, set_number_of_cards]=useState(9)

  useEffect(()=>{

    //const ids=Array.from({length:number_of_cards}, ()=>(Math.floor(Math.random()*206)))

    async function load_data(){
      set_loading(true)
      try{

        const data= await Promise.resolve(characters)

        const cards=[...data].sort(()=>(Math.random() -0.5))
                              .slice(0,number_of_cards)
        

        set_cards(cards);
        set_loading(false);
        //set_message("Images Successfully Loaded")
        
      }
      catch(error){
        set_message("Error Fetching Images")
        set_loading(false)
      }
    }

  load_data();

  },[number_of_cards])

  const shuffle=(cards)=>{ 
    return [...cards].sort(()=>(Math.random() -0.5));
  }

  const handle_click=(target)=>{


    if(clicked.includes(target)){
      if(score>best_score){ set_best_score(score);}
      set_message("Clicked Here Before! Start Again!")
      set_score(0);
      set_clicked([]);
    }

    else{
      set_message("Keep'er Moving!")

      const new_score=score+1;
      set_score(new_score)
      if(new_score>=best_score){ set_best_score(new_score);}

      set_clicked([...clicked, target]);

      if(new_score===initial_cards.length){ set_message("You Won!")}
      else{ set_message("Good One! Keep'er Moving!") } 
    }

    set_cards((prev)=>shuffle([...prev]));
    
  }

  if (loading) {
    return <div className="App"><header><h1>Loading Chinese Cards...</h1></header></div>
  }

    return (
      <div className='App'>
        <header>
          <h1>Chinese Memory Cards</h1>
          <div className='scores'>
            <div>Score: {score}</div>
            <div>Best Score: {best_score}</div>
          </div>
          <div className="message">{message}</div>
        </header>

        <main>
          <div className='cards'>
            {cards.map((card)=>(
              <div key={card.id} className='card' onClick={()=>handle_click(card.id)}>
                <div className="character">{card.char}</div>
                <p>{card.english}:-{card.pinyin}</p>
              </div>

            ))}
          </div>

        </main>
      </div>
    )

}





