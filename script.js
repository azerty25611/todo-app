// 할 일 목록을 저장할 배열
// 사용자가 입력한 할 일들을 이 배열에 저장함
let todos = [];

// HTML 요소를 자바스크립트에서 사용할 수 있도록 가져오기
const input = document.getElementById('todoInput'); //입력창
const list = document.getElementById('todoList'); //할 일 리스트를 표시할 공간

//페이지가 처음 열릴 때 실행되는 함수
// 페이지 로드 시 저장된 데이터를 불러오기
window.onload = function () {
  const saved = localStorage.getItem('todos'); //localStorage에서 'todos' 키로 저장된 값 가져오기
  if (saved) {
    todos = JSON.parse(saved); // JSON 문자열을 다시 배열로 변환
    todos.forEach(todo => renderTodo(todo)); //배열의 각 항목을 화면에 출력
  }
};

// 할 일 추가 함수
function addTodo() {
  const text = input.value.trim(); //입력된 텍스트를 가져오고, 앞뒤 공백 제거
  if (text === '') return; //아무것도 입력하지 않으면 함수 종료

  //새로운 할 일 객체 생성
  const todo = { text, completed: false }; // text 할일 내용, completed: false 처음엔 완료되지 않은 상태

  todos.push(todo); //배열에 추가
  saveTodos();      // localStorage에 저장
  renderTodo(todo); // 화면에 표시
  input.value = ''; // 입력창 비우기
}

// 엔터 키를 누르면 addTodo 함수 실행되도록 설정(할 일을 추가하도록 설정)
input.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTodo(); // 엔터 키를 누르면 addTodo 함수 실행(할 일 추가)
  }
});

// 할 일을 화면에 표시하는 함수
function renderTodo(todo) {
  const li = document.createElement('li'); //새로운 <li> 요소 생성
  li.textContent = todo.text; // 텍스트 설정

  //완료된 항목이라면 스타일 적용 (회색 + 취소선)
  if (todo.completed) {
    li.classList.add('completed');
  }

  // <li>를 클릭하면 완료/미완료 상태 전환
  li.addEventListener('click', function () {
    todo.completed = !todo.completed; //true -> false / false -> true
    li.classList.toggle('completed'); //CSS 클래스 토글 (추가/제거)
    saveTodos(); // 상태 변경 후 저장
  });


  // 삭제 버튼 생성
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'ｘ'; //버튼에 'ｘ' 표시
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.style.background = 'transparent'; //배경 없음
  deleteBtn.style.border = 'none'; //테두리 없음
  deleteBtn.style.cursor = 'pointer'; //마우스를 올리면 손가락 커서
  deleteBtn.style.fontSize = '16px';

  // 삭제 버튼 클릭 시 해당 항목 삭제
  deleteBtn.addEventListener('click', function (e) {
    e.stopPropagation(); //클릭이 <li>까지 전달되지 않게 막음
    todos = todos.filter(t => t !== todo); //현재 항목을 배열에서 제거
    li.remove(); //화면에서도 제거
    saveTodos(); // 저장 상태 갱신
  });

  // li 요소 안에 삭제 버튼 추가
  li.appendChild(deleteBtn);

  // 최종적으로 리스트에 <li> 추가하여 화면에 보이게 함
  list.appendChild(li);
}

// todos 배열을 문자열로 바꿔 localStorage에 저장하는 함수
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}