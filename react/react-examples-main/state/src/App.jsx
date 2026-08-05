import { useState } from 'react';
import './App.css';

const COLORS = ['pink', 'green', 'blue', 'yellow', 'purple'];

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [changes, setChanges]=useState(0);

  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
    setChanges(changes+1);
  };


  return (
    <>
    <div  style={{ display:"flex",flexDirection:"column",}}>
    <div
      className="App"
      style={{
        backgroundColor,

      }}
    >
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? 'selected' : ''}
        >
      
          {color}
        </button>
        ))}

    </div>
    <button>Number of changes: {changes}</button>
    </div>
    </>
    
    
  );
}

export default App;
