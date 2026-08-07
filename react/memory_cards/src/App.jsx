import { useState } from 'react'
import './App.css'

const initial_cards=[{ id: 1, name: 'Charizard', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200' },
  { id: 2, name: 'Pikachu', img: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200' },
  { id: 3, name: 'Bulbasaur', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200' },
  { id: 4, name: 'Squirtle', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200' },
  { id: 5, name: 'Jigglypuff', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=200' },
  { id: 6, name: 'Gengar', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200' },
  { id: 7, name: 'Snorlax', img: 'https://images.unsplash.com/photo-1563245372-f21724e3846d?w=200' },
  { id: 8, name: 'Mewtwo', img: 'https://images.unsplash.com/photo-1614027164847-1b28feb1df6c?w=200' },
  { id: 9, name: 'Eevee', img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=200' }, ]


export default function App() {

  const [cards, set_cards] = useState(initial_cards)

  const [score,set_score]=useState(0)
  const [best_score,set_best_score]=useState(0)
  const [message, set_message]=useState("Click only on the cards you have not selected before!")

  const [clicked, set_clicked]=useState([])



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

    return (
      <div className='App'>
        <header>
          <h1>Memory Cards</h1>
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
                <img src={card.img}></img>
                <p>{card.name}</p>
              </div>

            ))}
          </div>

        </main>
      </div>
    )

}





