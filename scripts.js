const taskInputjs=document.querySelector('.taskInputjs');
const addbuttonjs=document.querySelector('.addbuttonjs');
const taskListjs=document.querySelector('.taskListjs');
const date=document.querySelector('.calenderjs');
localStorage.getItem('savedTask');
addbuttonjs.addEventListener('click',()=>{
    let taskGiven=taskInputjs.value;
    let dategot=date.value;
    let formattedDate = '';
    if(taskGiven===''){
       alert('Please enter a task');
        console.log('write')
        return;
    }
    if (dategot === '') {
        date.classList.add('shake');
        setTimeout(() => {
        date.classList.remove('shake');
        }, 300);
        return; 
    }
    
    if (dategot) {
        const [year, month, day] = dategot.split("-");
        formattedDate = `${day}-${month}-${year}`;
    }
  

    const list= document.createElement('li');
    
    list.innerHTML=`${taskGiven} (${formattedDate}) <button class="delete-btn">x</button>`;
 
    
    list.classList.add('taskListcss')
    
    taskListjs.appendChild(list);
    list.querySelector('.delete-btn').addEventListener('click', () => {
  list.remove();
    });
    
    let clicked=false;
    list.addEventListener('click',()=>{
        
        if(!clicked){
        list.classList.add('checked');
        clicked=true;
        }else{
            list.classList.remove('checked');
            clicked=false;
        }
    })
    localStorage.setItem('savedTask',JSON.stringify(list.innerText));
});