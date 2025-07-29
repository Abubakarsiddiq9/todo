const taskInputjs=document.querySelector('.taskInputjs');
const addbuttonjs=document.querySelector('.addbuttonjs');
const taskListjs=document.querySelector('.taskListjs');
const date=document.querySelector('.calenderjs');
let existing = JSON.parse(localStorage.getItem('savedTask') || '[]');
existing.forEach(task => {
    createTaskElement(task.text, task.date);
});
addbuttonjs.addEventListener('click',()=>{
    let taskGiven=taskInputjs.value.trim();
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
  
    let savedTask=JSON.parse(localStorage.getItem('savedTask')||'[]');
    savedTask.push({ text: taskGiven, date: formattedDate });
    localStorage.setItem('savedTask', JSON.stringify(savedTask));
    createTaskElement(taskGiven, formattedDate);
     taskInputjs.value = '';
});

function createTaskElement(taskText, taskDate) {
    const list = document.createElement('li');
    list.classList.add('taskListcss');
    list.innerHTML = `
        <span class="taskGot">${taskText} (${taskDate})</span>
        <button class="delete-btn">x</button>
    `;

    // Add delete functionality
    list.querySelector('.delete-btn').addEventListener('click', () => {
        list.remove();
        removeTaskFromStorage(taskText, taskDate);
    });

    // Toggle checked
    let clicked = false;
    list.addEventListener('click', () => {
        clicked = !clicked;
        list.classList.toggle('checked', clicked);
    });

    taskListjs.appendChild(list);
}

function removeTaskFromStorage(text, date) {
    let tasks = JSON.parse(localStorage.getItem('savedTask') || '[]');
    tasks = tasks.filter(task => !(task.text === text && task.date === date));
    localStorage.setItem('savedTask', JSON.stringify(tasks));
}