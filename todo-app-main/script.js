// 할 일 목록을 저장할 배열
let todos = [];

// HTML 요소 가져오기
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');

// 페이지 로드 시 저장된 데이터 불러오기
window.onload = function () {
  try {
    // 브라우저에 저장된 이전 할 일 목록을 불러옴
    const saved = localStorage.getItem('todos');
    if (saved) {
      // 저장된 데이터가 있으면 JSON 형식에서 배열로 변환
      todos = JSON.parse(saved);
      // 각 할 일을 화면에 표시
      todos.forEach(todo => renderTodo(todo));
    }
  } catch (error) {
    // 데이터 불러오기가 실패하면 오류 메시지 표시
    console.error('localStorage에서 데이터를 불러오는 중 오류 발생:', error);
    alert('やることのリストを読み込めませんでした。もう一度試してください。');
  }
};

// 새로운 할 일을 추가하는 함수
function addTodo() {
  const text = input.value.trim(); // 입력 상자의 텍스트를 가져와 양쪽 공백 제거
  if (text === '') {
    // 아무것도 입력하지 않았으면 경고 메시지 표시
    alert('やることを入力していません。。\uD83D\uDE22');
    return;
  }

  // 새로운 할 일 객체 생성 (텍스트와 완료 여부, 수정 중인지 여부 포함)
  const todo = { text, completed: false, isEditing: false };
  todos.push(todo); // 배열에 추가
  saveTodos(); // 브라우저에 저장
  renderTodo(todo); // 화면에 표시
  input.value = ''; // 입력 상자 비우기
}

// 엔터 키를 눌렀을 때 할 일 추가
input.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTodo(); // 엔터 키를 누르면 addTodo 함수 실행
  }
});

// 할 일을 화면에 표시하는 함수
function renderTodo(todo) {
  const li = document.createElement('li'); // 새로운 리스트 항목 생성
  li.style.display = 'flex'; // 항목을 가로로 정렬
  li.style.alignItems = 'center'; // 세로 가운데 정렬
  li.style.justifyContent = 'space-between'; // 내용과 버튼 사이 간격 최대화
  li.style.marginTop = '10px'; // 위쪽 여백
  li.style.lineHeight = '1.5'; // 줄 간격
  li.style.position = 'relative'; // 버튼 위치 조정용

  // 할 일 텍스트를 표시할 요소
  const todoText = document.createElement('span');
  todoText.textContent = todo.text; // 텍스트 설정
  todoText.style.flexGrow = '1'; // 텍스트가 가능한 한 공간 차지
  todoText.style.wordBreak = 'break-word'; // 긴 단어는 줄바꿈
  todoText.style.whiteSpace = 'normal'; // 텍스트가 자연스럽게 줄바꿈
  todoText.style.paddingRight = '15px'; // 오른쪽 여백

  if (todo.completed) {
    todoText.classList.add('completed'); // 완료된 항목이면 취소선 스타일 적용
  }

  // 텍스트 클릭 시 완료/미완료 토글
  todoText.addEventListener('click', function () {
    todo.completed = !todo.completed; // 완료 상태 반전
    todoText.classList.toggle('completed'); // 취소선 스타일 추가/제거
    saveTodos(); // 변경 사항 저장
  });

  // 수정 버튼
  const editBtn = document.createElement('button');
  editBtn.textContent = '\u270E'; // 연필 모양 이모지
  editBtn.style.padding = '5px'; // 버튼 안쪽 여백
  editBtn.style.color = 'blue'; // 글자 색상
  editBtn.style.fontSize = '20px'; // 글자 크기
  editBtn.style.backgroundColor = '#fff'; // 배경 색상
  editBtn.style.border = '2px solid blue'; // 테두리
  editBtn.style.cursor = 'pointer'; // 마우스 커서 모양
  editBtn.style.borderRadius = '4px'; // 둥근 테두리
  editBtn.style.width = '30px'; // 버튼 크기
  editBtn.style.height = '30px';
  editBtn.style.display = 'flex'; // 버튼 내부 정렬
  editBtn.style.justifyContent = 'center';
  editBtn.style.alignItems = 'center';
  editBtn.style.marginRight = '5px'; // 오른쪽 여백

  // 삭제 버튼
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '\u274C'; // X 모양 이모지
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

  // 수정 버튼 클릭 시 동작
  editBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록
    if (todo.isEditing) return; // 이미 수정 중이면 무시

    todo.isEditing = true; // 수정 모드 시작

    // 수정용 입력 상자 생성
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = todo.text; // 기존 텍스트로 초기화
    editInput.style.width = '70%'; // 입력 상자 너비
    editInput.style.padding = '5px'; // 안쪽 여백

    // 취소 버튼
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '\u21A9'; //뒤로 가기 모양 이모지
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

    // 기존 항목 지우고 수정 모드 요소 추가
    li.textContent = '';
    li.appendChild(editInput);
    li.appendChild(editBtn);
    li.appendChild(cancelBtn);
    li.appendChild(deleteBtn);
    editInput.focus(); //입력 상자에 커서 바로 위치

    // Enter 키로 수정 완료
    editInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        updateTodoText(todo, editInput, li, todoText, editBtn, deleteBtn);
      }
    });

    // 입력 상자에서 포커스 잃으면 수정 완료
    editInput.addEventListener('blur', function (e) {
      // 삭제나 취소 버튼 클릭 시 이벤트 무시
      if (e.relatedTarget !== deleteBtn && e.relatedTarget !== cancelBtn) {
        updateTodoText(todo, editInput, li, todoText, editBtn, deleteBtn);
      }
    });

    // 취소 버튼 클릭시 원래 상태로 복구
    cancelBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      todo.isEditing = false;
      li.textContent = '';
      li.appendChild(todoText);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    });
  });

  // 삭제 버튼 클릭 시 동작
  deleteBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (todo.isEditing) {
      // 수정 모드에서 삭제 클릭 시 수정 취소
      todo.isEditing = false;
      li.textContent = '';
      li.appendChild(todoText);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }
    // 삭제 확인 메시지
    if (confirm('この文章を削除しますか？')) {
      todos = todos.filter(t => t !== todo); //배열에서 해당 할 일 제거
      li.remove(); //화면에서 항목 제거
      saveTodos(); //변경 사항 저장
    }
  });

  //리스트 항목에 텍스트와 버튼 추가
  li.appendChild(todoText);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li); //목록에 항목 추가
}

// 수정 완료 처리 함수
function updateTodoText(todo, editInput, li, todoText, editBtn, deleteBtn) {
  const newText = editInput.value.trim(); //수정된 텍스트 가져오기
  if (newText === '') {
    // 빈 텍스트면 경고 후 원래 상태로 복구
    alert('やることを入力してください。');
    todo.isEditing = false;
    li.textContent = '';
    li.appendChild(todoText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    return;
  }

  //새로운 텍스트로 업데이트
  todo.text = newText;
  todo.isEditing = false;
  saveTodos(); //변경 사항 저장
  li.textContent = '';
  todoText.textContent = newText; //텍스트 업데이트
  if (todo.completed) {
    todoText.classList.add('completed'); //완료 상태면 취소선 유지
  }
  li.appendChild(todoText);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
}

// localStorage에 저장 (브라우저에 할 일 목록 저장)
function saveTodos() {
  try {
    // 배열을 JSON 문자열로 변환해 저장
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    //저장 실패 시 오류 메시지
    console.error('localStorage에 저장하는 중 오류 발생:', error);
    alert('やることのリストを保存できませんでした。');
  }
}