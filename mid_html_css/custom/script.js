function change_theme(){
  const root= document.documentElement;
  const other_theme= root.className === 'dark' ? 'light' : 'dark';

  root.className= other_theme;

  document.querySelector('.theme-name').textContent= other_theme;
}


document.querySelector('.theme-toggle').addEventListener('click', change_theme)
