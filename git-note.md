# GitHub에 업로드하기
사전 준비
1. GitHub 계정 만들기: github.com
2. PC에 Git 설치: Git 공식 다운로드 -> 설치 중간에 Next만 누르면 됨


# 업로드 단계
1. 메뉴에서 Terminal -> New Terminal하면 하단에 검은창이 열림
2. Git 명령어 입력
git init
   -->그러면 폴더에 .git이라는 숨겨진 폴더가 생기고, Git이 이 폴더를 추적하기 시작함.
git add .
git commit -m "First commit"


# 만약 Git 설치했는데 VS Code에서 git이라는 명령어를 못 알아듣는 경우
Git이 설치되어 있지 않거나, 설치는 되어 있는데 VS Code가 Git을 인식하지 못하는 상태임. 이런 경우, 일단 VS Code를 완전히 종료 -> 다시 실행 (그래야 Git이 반영됨)
그 후에 아래 명령어 입력해서 확인:
git --version
결과 예시: git version 2.50.1.windows.1
이렇게 나오면 이제 제대로 설치되고 연결된 것임.


# Please tell me who you are와 같은 문구가 나올 경우
사용자 정보(이메일과 이름)가 설정되지 않아서 발생하는 문제임. 이런 경우 아래 두 명령어를 입력해서 이메일과 이름을 설정해야함.
git config --global user.email "your_email@example.com"
git config --global user.name "Your Name"
※여기서 "your_email@example.com"은 실제 이메일 주소,
"Your Name"은 실제 이름으로 바꿔야 함.
그 후, 설정이 잘 되었는지 확인하기 위해 아래 명령어를 입력.
git config --global user.email
git config --global user.name


# GitHub에 업로드하기
1. GitHub에 새 저장소(repository) 만들기
--1. https://github.com -> +클릭 -> New repository
--2. Repository name: (예시)todo-app
--3. create repository 클릭
2. GitHub에 업로드
GitHub에서 만든 새 저장소가 열리면, 아래 명령어를 VS Code 터미널에 입력.
--1. 원격 저장소 추가 (GitHub 저장소 URL을 아래 예시처럼 변경)
git remote add origin https://github.com/yourusername/todo-app.git
※여기서 yourusername은 GitHub 계정 이름으로 바꿔야 함.
--2. 브랜치 설정 (기본 브랜치 이름을 main으로 설정)
git branch -M main
--3. 원격 저장소로 push (업로드)
git push -u origin main
(이렇게 하면 이제 GitHub에 코드가 업로드됨)



# 원격 저장소 연결 및 업로드
git remote add origin https://github.com/본인GitHub아이디/todo-app.git
git branch -M main
git push -u origin main


# main 브랜치가 존재하지 않아서 에러 메시지가 나오는 경우
1. 현재 로컬 브랜치 이름 확인
git branch
예를 들어, master라는 이름이 있을 수 있음.
2. 브랜치 이름 변경
만약 master라는 브랜치가 있다면, 아래 명령어로 master를 main으로 변경할 수 있음
git branch -M main
3. git push 명령어 다시 입력
이제 main 브랜치로 변경했으므로 다시 git push를 실행


# GitHub에서 자신의 저장소 페이지 찾기
1. https://github.com 접속하여 로그인
2. 오른쪽 위에 있는 프로필 사진(원형 아이콘) 클릭하고 메뉴가 뜨면 Your repositories 클릭
3. todo-app 저장소 클릭
(저장소 목록 중에서 최근에 만든 todo-app 저장소를 찾아 클릭. 만약 보이지 않으면 우측 상단의 Sort(종류)를 바꾸면 최근 업로드한 저장소가 올라옴.)


# GitHub Pages 배포
1. GitHub 저장소(todo-app)페이지로 이동
2. 상단 탭에서 Settings 클릭
3. 왼쪽 메뉴에서 Pages 클릭
4. Source 설정
(Deploy from a branch 선택,
Branch는 main, Folder는 /root,
아래나 옆에 버튼이 있다면 Save 클릭)
5. 몇 초 후 아래처럼 주소가 생성됨(안나오면 다시 같은 주소로 재시도해서 들어가야 함. Your site is live at: https://~~)나오면 성공.


# 수정 후 GitHub Pages에 반영하는 전체 흐름
1. VS Code에서 수정
(예: index.html, style.css, script.js 수정)
2. 저장
(Ctrl + S 또는 File -> Save)
3. 터미널에서 Git 명령어 입력
※Terminal은 VS Code 화면 맨 위의 메뉴에서 찾을 수 있음. 터미널이 없다면 Terminal -> New Terminal로 하단에 검은창이 열리게 하면 됨.


--1. 수정한 모든 파일을 Git에 추가
git add .

--2. 수정 내용을 저장
git commit -m "업데이트 내용"

--3. GitHub로 전송 (-> GitHub Pages가 자동 반영)
git push -u origin master
or
git push -u origin main


# GitHub Pages로 만든 사이트(예시 : TODO 사이트)를 배포하는 과정
1. 저장소 확인
저장소 주소: https://github.com/azerty25611/todo-app
루트 디렉토리에 다음 파일들이 있어야 함
index.html
style.css
script.js
확인 후, 다음 단계로 진행.
2. GitHub Pages 설정
--1. GitHub 저장소로 이동 -> todo-app 저장소 바로가기
--2. 상단 메뉴 중 Settings 클릭
--3. 왼쪽 메뉴에서 "Pages" 또는 "Pages(Deployments)" 클릭
--4. 다음 항목을 설정:
      Source: Deploy from a branch
      Branch: master
      Folder: / (root)   <-꼭 이거 선택
--5. [Save] 버튼 클릭
3. 배포 확인
GitHub Pages는 보통 몇 초~분 내로 사이트를 배포함.
잠시 후 아래 주소로 접속
https://azerty25611.github.io/todo-app/
이 주소는 GitHub 사용자 이름과 저장소 이름을 기준으로 자동 생성됨.
4. 테스트
위 주소로 접속해서 입력창에 할 일을 압력하고
수정된 사항을 실행했을 때 반응이 일어나는지
새로고침해도 로컬스토리지에 저장된 일이 그대로 나타나는지 확인.
※만약 안 뜨거나 오류가 있다면?
  -아직 배포가 안 됐거나, 파일 이름이 잘못되었거나(index.html은 꼭 소문자로, 정확한 이름으로), console(F12) 오류 메시지