/* for page 1 */

// reference the DOM 

const btn1 = document.getElementById('button1');
const btn2 = document.getElementById('button2');

let show = false;

btn1.addEventListener('click', () =>{
  if(show){
    btn2.style.display = 'block';
  }else{
    show = true;
    btn2.style.display = 'none';
  }
})

btn2.addEventListener('click', () =>{
  if(show){
    btn1.style.display = 'block';
  }else{
    show = true;
    btn1.style.display = 'none';
  }
})
