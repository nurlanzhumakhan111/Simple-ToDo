const tasks = [{
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
      acc[task._id] = task;
      return acc
    }, {})
    console.log(objOfTasks)
    const listGroup = document.querySelector('.tasks-list-section .list-group')
    const listGroupButton = document.querySelectorAll('.list-group-button')
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
    renderAllTasks(objOfTasks)
    form.addEventListener('submit', onFormSubmitHandler)
    listGroup.addEventListener('click', clickHandler)
    listGroupButton.forEach(button => {
      button.addEventListener('click', renderCertainTasks)
    })

    function renderAllTasks(TasksList) {
      // listGroup.innerHTML
      if (!TasksList) {
        console.error('Error!')
      }
      const fragment = document.createDocumentFragment();
      let tasks = Object.values(TasksList).sort(function (x, y) {
        return (x.completed === y.completed) ? 0 : x.completed ? 1 : -1;
      })
      tasks.forEach((task) => {
          const li = listItemTemplate(task)
          fragment.appendChild(li)
        })
        listGroup.appendChild(fragment)
      }

      function renderCertainTasks(e) {
        listGroup.innerHTML = ''
        const fragment = document.createDocumentFragment();
        if (e.target.classList.contains('list-group-button-notcompleted')) {
          Object.values(objOfTasks).forEach((task) => {
            if (task.completed === false) {
              const li = listItemTemplate(task)
              fragment.appendChild(li)
            }
          })
          listGroup.appendChild(fragment)
        } else if (e.target.classList.contains('list-group-button-all')) {
          renderAllTasks(objOfTasks)
        }
      }

      function listItemTemplate({
        _id,
        title,
        body,
        completed
      }) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let button = document.createElement('button');
        let buttonDone = document.createElement('button');
        let p = document.createElement('p');
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
        li.setAttribute('data-task-id', _id);
        if (completed) {
          li.classList.add('complete')
        }
        button.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
        button.textContent = 'Delete';
        buttonDone.classList.add('btn', 'btn-done')
        buttonDone.textContent = 'Done';

        span.textContent = title;

        p.classList.add('mt-2', 'w-100');
        p.textContent = body;
        li.appendChild(span)
        li.appendChild(button)
        li.appendChild(buttonDone)
        li.appendChild(p)
        return li
      }

      function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

        if (!titleValue || !bodyValue) {
          alert('Введите данные')
          return
        }

        const task = createNewTask(titleValue, bodyValue)
        const listItem = listItemTemplate(task);
        listGroup.insertAdjacentElement('afterbegin', listItem);
        testArr(objOfTasks)
        form.reset();
      }

      function createNewTask(title, body) {
        const newTask = {
          _id: `task-${Math.random()}`,
          title,
          body,
          completed: false,
        }
        objOfTasks[newTask._id] = newTask
        return {
          ...newTask
        }
      }

      function deleteTask(id) {
        const {
          title
        } = objOfTasks[id];
        const isConfirm = confirm(`Are you sure that you want to delete ${title} task?`);
        if (!isConfirm) return;
        delete objOfTasks[id];
        return isConfirm
      }

      function deleteFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove()
        testArr(objOfTasks)

      }

      function clickHandler({
        target
      }) {
        if (target.classList.contains('delete-btn')) {
          onDeleteHandler(target)
        } else if (target.classList.contains('btn-done')) {
          onDoneHandler(target)
        }
      }

      function onDeleteHandler(target) {
        const parent = target.closest('[data-task-id]');
        const id = parent.dataset.taskId;
        const confirmed = deleteTask(id);
        deleteFromHtml(confirmed, parent)
        testArr(objOfTasks)
      }

      function onDoneHandler(target) {
        const parent = target.closest('[data-task-id]');
        const id = parent.dataset.taskId;
        objOfTasks[id].completed = !objOfTasks[id].completed;
        parent.classList.toggle('complete');
      }

      function testArr(obj) {
        const empty = document.querySelector('.empty');
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
          empty.style.display = 'block';
        } else {
          empty.style.display = 'none';

        }
      }
    })(tasks);