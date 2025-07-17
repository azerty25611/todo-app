// 할 일 목록을 로컬스토리지에서 불러와 저장할 변수
let todos = [];

// HTML 요소 참조
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');

// 페이지 로드 시 저장된 데이터를 불러오기
window.onload = function () {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved); // JSON → 배열로 변환
    todos.forEach(todo => renderTodo(todo));
  }
};

// 할 일 추가 함수
function addTodo() {
  const text = input.value.trim();
  if (text === '') return;

  const todo = { text, completed: false };
  todos.push(todo);
  saveTodos();      // 저장
  renderTodo(todo); // 화면에 추가
  input.value = '';
}

// 엔터 키를 누르면 할 일을 추가하도록 설정
input.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTodo(); // 엔터 키를 누르면 addTodo 함수 실행
  }
});

// 할 일 화면에 렌더링 함수
function renderTodo(todo) {
  const li = document.createElement('li');
  li.textContent = todo.text;

  if (todo.completed) {
    li.classList.add('completed');
  }

  // 클릭하면 완료 처리
  li.addEventListener('click', function () {
    todo.completed = !todo.completed;
    li.classList.toggle('completed');
    saveTodos(); // 변경 후 저장
  });

  // 우클릭하면 삭제
  li.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    todos = todos.filter(t => t !== todo);
    li.remove();
    saveTodos(); // 삭제 후 저장
  });

  list.appendChild(li);
}

// 로컬스토리지에 저장
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}