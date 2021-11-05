const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const todoRemove = document.querySelector('.todo-remove')


const toDoData = []

const displayLocalStorage = function () {
  const toDoDataLocalStorage = localStorage.getItem('toDoData');
  const arrayLocalStorage = JSON.parse(toDoDataLocalStorage);
  toDoData.push.apply(toDoData, arrayLocalStorage);

}
const render = function () {
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''
  

  toDoData.forEach(function (item, index) {
   const li = document.createElement('li')

    li.classList.add('todo-item')

    li.innerHTML = '<span class="text-todo">' + item.text + '</span >' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>'
      if(item.completed) {
        todoCompleted.append(li)
      } else {
        todoList.append(li)
      }
       

    
      li.querySelector('.todo-complete').addEventListener('click', function() {
       item.completed = !item.completed
        render()
        localStorage.setItem('toDoData', JSON.stringify(toDoData))
      })

    li.querySelector('.todo-remove').addEventListener('click', function () {
      li.remove()
      toDoData.splice(index, 1);
      localStorage.removeItem(index);
      localStorage.setItem('toDoData', JSON.stringify(toDoData))
    })
      
    if (toDoData.length == 0) {
      localStorage.clear();
    } 
  })
}

todoControl.addEventListener('submit', function (event) {
  let isError = false;
  event.preventDefault()


const newToDo = {
  text: headerInput.value,
  completed: false
}

  if (headerInput.value === '') {
    isError = true;
  };

  if (!isError) {
    toDoData.push(newToDo);
    headerInput.value = '';
    
    render();
    
  };
  localStorage.setItem('toDoData', JSON.stringify(toDoData));
});

displayLocalStorage();
render();

