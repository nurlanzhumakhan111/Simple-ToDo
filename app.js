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
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  renderAllTasks(objOfTasks)
  form.addEventListener('submit', onFormSubmitHandler)

  function renderAllTasks(TasksList) {
    if (!TasksList) {
      console.error('Error!')
    }
    const fragment = document.createDocumentFragment();
    Object.values(TasksList).forEach((task) => {
      const li = listItemTemplate(task)
      fragment.appendChild(li)
    })
    listGroup.appendChild(fragment)

  }

  function listItemTemplate({
    _id,
    title,
    body
  }) {
    let li = document.createElement('li');
    let span = document.createElement('span');
    let button = document.createElement('button');
    let p = document.createElement('p');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    button.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    p.classList.add('mt-2', 'w-100');
    span.textContent = title;
    button.textContent = 'Delete';
    p.textContent = body;
    li.appendChild(span)
    li.appendChild(button)
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
})(tasks);