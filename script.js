// 할 일 목록을 저장할 배열
let todos = [];

// HTML 요소 가져오기
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');

// 페이지 로드 시 저장된 데이터 불러오기
window.onload = function () {
  try {
    const saved = localStorage.getItem('todos');
    if (saved) {
      todos = JSON.parse(saved);
      todos.forEach(todo => renderTodo(todo));
    }
  } catch (error) {
    console.error('localStorage에서 데이터를 불러오는 중 오류 발생:', error);
    alert('할 일 목록을 불러오지 못했습니다. 다시 시도해주세요.');
  }
};

// 할 일 추가 함수
function addTodo() {
  const text = input.value.trim();
  if (text === '') {
    alert('할 일을 입력해주세요.');
    return;
  }

  const todo = { text, completed: false, isEditing: false };
  todos.push(todo);
  saveTodos();
  renderTodo(todo);
  input.value = '';
}

// 엔터 키로 할 일 추가
input.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// 할 일 화면에 표시
function renderTodo(todo) {
  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.justifyContent = 'space-between';
  li.style.marginTop = '10px';
  li.style.lineHeight = '1.5';
  li.style.position = 'relative';

  const todoText = document.createElement('span');
  todoText.textContent = todo.text;
  todoText.style.flexGrow = '1';
  todoText.style.wordBreak = 'break-word';
  todoText.style.whiteSpace = 'normal';
  todoText.style.paddingRight = '80px';

  if (todo.completed) {
    todoText.classList.add('completed');
  }

  todoText.addEventListener('click', function () {
    todo.completed = !todo.completed;
    todoText.classList.toggle('completed');
    saveTodos();
  });

  // 수정 버튼
  const editBtn = document.createElement('button');
  editBtn.textContent = '\u270E';
  editBtn.style.padding = '5px';
  editBtn.style.color = 'blue';
  editBtn.style.fontSize = '20px';
  editBtn.style.backgroundColor = '#fff';
  editBtn.style.border = '2px solid blue';
  editBtn.style.cursor = 'pointer';
  editBtn.style.borderRadius = '4px';
  editBtn.style.width = '30px';
  editBtn.style.height = '30px';
  editBtn.style.display = 'flex';
  editBtn.style.justifyContent = 'center';
  editBtn.style.alignItems = 'center';
  editBtn.style.marginRight = '5px';

  // 삭제 버튼
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '\u274C';
  deleteBtn.style.padding = '5px';
  deleteBtn.style.color = 'red';
  deleteBtn.style.fontSize = '15px';
  deleteBtn.style.backgroundColor = '#fff';
  deleteBtn.style.border = '2px solid red';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.style.borderRadius = '4px';
  deleteBtn.style.width = '30px';
  deleteBtn.style.height = '30px';
  deleteBtn.style.display = 'flex';
  deleteBtn.style.justifyContent = 'center';
  deleteBtn.style.alignItems = 'center';

  // 수정 버튼 클릭
  editBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (todo.isEditing) return;

    todo.isEditing = true;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = todo.text;
    editInput.style.width = '70%';
    editInput.style.padding = '5px';

    // 취소 버튼
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '\u21A9';
    cancelBtn.style.padding = '5px';
    cancelBtn.style.color = 'gray';
    cancelBtn.style.fontSize = '15px';
    cancelBtn.style.backgroundColor = '#fff';
    cancelBtn.style.border = '2px solid gray';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.style.borderRadius = '4px';
    cancelBtn.style.width = '30px';
    cancelBtn.style.height = '30px';
    cancelBtn.style.display = 'flex';
    cancelBtn.style.justifyContent = 'center';
    cancelBtn.style.alignItems = 'center';
    cancelBtn.style.marginLeft = '5px';
    cancelBtn.style.marginRight = '5px';

    li.textContent = '';
    li.appendChild(editInput);
    li.appendChild(editBtn);
    li.appendChild(cancelBtn);
    li.appendChild(deleteBtn);
    editInput.focus();

    // Enter 키로 수정 완료
    editInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        updateTodoText(todo, editInput, li, todoText, editBtn, deleteBtn);
      }
    });

    // blur 이벤트로 수정 완료
    editInput.addEventListener('blur', function (e) {
      // 삭제 버튼 또는 취소 버튼 클릭 시 blur 이벤트 무시
      if (e.relatedTarget !== deleteBtn && e.relatedTarget !== cancelBtn) {
        updateTodoText(todo, editInput, li, todoText, editBtn, deleteBtn);
      }
    });

    // 취소 버튼 클릭
    cancelBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      todo.isEditing = false;
      li.textContent = '';
      li.appendChild(todoText);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    });
  });

  // 삭제 버튼 클릭
  deleteBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (todo.isEditing) {
      // 수정 모드에서 삭제 시 수정 취소
      todo.isEditing = false;
      li.textContent = '';
      li.appendChild(todoText);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }
    if (confirm('この文章を削除しますか？')) {
      todos = todos.filter(t => t !== todo);
      li.remove();
      saveTodos();
    }
  });

  li.appendChild(todoText);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// 수정 완료 처리 함수
function updateTodoText(todo, editInput, li, todoText, editBtn, deleteBtn) {
  const newText = editInput.value.trim();
  if (newText === '') {
    alert('할 일을 입력해주세요.');
    todo.isEditing = false;
    li.textContent = '';
    li.appendChild(todoText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    return;
  }

  todo.text = newText;
  todo.isEditing = false;
  saveTodos();
  li.textContent = '';
  todoText.textContent = newText;
  if (todo.completed) {
    todoText.classList.add('completed');
  }
  li.appendChild(todoText);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
}

// localStorage에 저장
function saveTodos() {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('localStorage에 저장하는 중 오류 발생:', error);
    alert('할 일 목록을 저장하지 못했습니다.');
  }
}