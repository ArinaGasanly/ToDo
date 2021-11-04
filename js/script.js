const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const todoRemove = document.querySelector('.todo-remove')
const add = document.querySelector('add')

const toDoData = []

const render = function () {
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''
  todoRemove.innerHTML = ''

  toDoData.forEach(function (item) {
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
        localStorage.setItem('text', JSON.stringify(item.text))
       render()
      })

    li.querySelector('.todo-remove').addEventListener('click', function () {
      li.remove()
      toDoData.splice(item, 1);
    
    })
      
    if (item.text === '') {
      li.remove()
      toDoData.splice(item, 1);
    } else {
      return true
    }

    
    if (localStorage.getItem('text'))
    item.text = JSON.parse(localStorage.getItem('text'))
    
  })
}

todoControl.addEventListener('submit', function (event) {
  event.preventDefault()


const newToDo = {
  text: headerInput.value,
  completed: false
}

toDoData.push(newToDo)
headerInput.value = ''

render()

})