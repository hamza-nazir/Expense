let btn = document.getElementById('flexSwitchCheckDefault');
let div=document.getElementsByClassName('budget-highlight');
let content=document.getElementsByClassName('main-content');
btn.addEventListener('click', () => {
  if (btn.checked) {
    div[0].style.backgroundColor= 'rgb(65, 65, 64)';
    div[0].style.color= 'white';
 
   
  } else {

    div[0].style.backgroundColor= 'white';
    div[0].style.color= 'black';
  }
});