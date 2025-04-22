document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------TIMER----------------------------------
    // -----------------------------------------------------------------------
    let timer;
    let totalSeconds;
    let isRunning = false;
    let currentMode = 'pomodoro'; 

    const timerDisplay = document.getElementById('timer');
    const playPauseBtn = document.getElementById('playPause');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const pomodoroBtn = document.getElementById('pomodoroBtn');
    const shortBreakBtn = document.getElementById('shortBreakBtn');
    const longBreakBtn = document.getElementById('longBreakBtn');
    const rewindBtn = document.getElementById('rewind');

    // initialize timer
    function initTimer() {
        switch(currentMode) {
            case 'pomodoro':
                totalSeconds = 25 * 60;
                break;
            case 'shortBreak':
                totalSeconds = 5 * 60;
                break;
            case 'longBreak':
                totalSeconds = 10 * 60;
                break;
        }
        updateDisplay();
    }

    function updateDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            playPauseIcon.classList.replace('fa-play', 'fa-pause');
            
            timer = setInterval(() => {
                totalSeconds--;
                updateDisplay();
                
                if (totalSeconds <= 0) {
                    clearInterval(timer);
                    isRunning = false;
                    playPauseIcon.classList.replace('fa-pause', 'fa-play');
                    
                    if (currentMode === 'pomodoro') {
                        setMode('shortBreak');
                    } else {
                        setMode('pomodoro');
                    }
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
    }

    function setMode(mode) {
        currentMode = mode;

        pomodoroBtn.classList.remove('active');
        shortBreakBtn.classList.remove('active');
        longBreakBtn.classList.remove('active');
        document.getElementById(`${mode}Btn`).classList.add('active');
        
        // TODO: When I click through the buttons it auto-starts
        initTimer();
        pauseTimer();
        updateDisplay();
        startTimer();
    }

    function resetTimer() {
        pauseTimer();
        
        switch(currentMode) {
            case 'pomodoro':
                totalSeconds = 25 * 60;
                break;
            case 'shortBreak':
                totalSeconds = 5 * 60;
                break;
            case 'longBreak':
                totalSeconds = 10 * 60;
                break;
        }
        updateDisplay();
    }

    playPauseBtn.addEventListener('click', function() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    pomodoroBtn.addEventListener('click', () => setMode('pomodoro'));
    shortBreakBtn.addEventListener('click', () => setMode('shortBreak'));
    longBreakBtn.addEventListener('click', () => setMode('longBreak'));
    rewindBtn.addEventListener('click', resetTimer);

    initTimer();
    



    // ----------------------------TODO LIST----------------------------------
    // -----------------------------------------------------------------------
    const noteBtn = document.getElementById('noteBtn');
    const taskPopup = document.getElementById('taskPopup');
    const closeBtn = document.getElementById('closeTaskPopup');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const newTaskInput = document.getElementById('newTaskInput');
    const taskList = document.getElementById('taskList');
    const popupHeader = document.querySelector('.task-popup-header');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    let isDragging = false;
    let offsetX, offsetY;
    
    popupHeader.addEventListener('mousedown', function(e) {
        if (e.target === this || e.target.tagName === 'H3') {
            isDragging = true;
            offsetX = e.clientX - taskPopup.getBoundingClientRect().left;
            offsetY = e.clientY - taskPopup.getBoundingClientRect().top;
            taskPopup.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        taskPopup.style.left = (e.clientX - offsetX) + 'px';
        taskPopup.style.top = (e.clientY - offsetY) + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        taskPopup.style.cursor = '';
    });
    
    function togglePopup() {
        taskPopup.classList.toggle('hidden');
        
        if (!taskPopup.classList.contains('hidden')) {
        bringToFront(taskPopup);
        }
    }
    
    function bringToFront(element) {
        const highestZ = [...document.querySelectorAll('*')].reduce((acc, el) => {
        const z = parseInt(window.getComputedStyle(el).zIndex);
        return z > acc ? z : acc;
        }, 0);
        
        element.style.zIndex = highestZ + 1;
    }
    
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span>${task}</span>
                <button class="delete-task" data-index="${index}">
                <i class="fa fa-close"></i>
                </button>
            `;
            taskList.appendChild(li);
        });
        
        document.querySelectorAll('.delete-task').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        });
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            newTaskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }
    
    noteBtn.addEventListener('click', togglePopup);
    closeBtn.addEventListener('click', togglePopup);
    addTaskBtn.addEventListener('click', addTask);
    
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();









    // ------------------------------BUTTONS----------------------------------
    // -----------------------------------------------------------------------
    // full screen button
    document.getElementById('fullscreenBtn').addEventListener('click', () => {
        if(!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    
    // theme button
    const videoSelectBtn = document.getElementById('videoSelectBtn');
    const themePanel = document.getElementById('themePanel');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const closePanelBtn = document.getElementById('closePanelBtn');

    videoSelectBtn.addEventListener('click', () => {
        themePanel.classList.toggle('show');
        document.body.classList.toggle('panel-open');
    });

    closePanelBtn.addEventListener('click', () => {
        themePanel.classList.remove('show');
        document.body.classList.remove('panel-open');
    });

    document.addEventListener('click', (e) => {
        if (themePanel.classList.contains('show')) {
            if (!themePanel.contains(e.target) && !videoSelectBtn.contains(e.target)) {
                themePanel.classList.remove('show');
                document.body.classList.remove('panel-open');
            }
        }
    });

    document.querySelectorAll('.theme-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            const src = item.getAttribute('data-src');
    
            if(type === "color") {
                backgroundVideo.style.display = "none";
                document.body.style.background = src;
            } else if(type === "photo") {
                backgroundVideo.style.display = "none";
                document.body.style.background = `url(${src}) center/cover no-repeat`;
            } else if(type === "video") {
                backgroundVideo.style.display = "block";
                backgroundVideo.src = src;
                backgroundVideo.load();
                backgroundVideo.play();
                document.body.style.background = "none"; 
            }
        });
    });

    document.querySelectorAll('.theme-item').forEach(item => {
        item.addEventListener('click', () => {
          document.querySelectorAll('.theme-item').forEach(el => el.classList.remove('active'));
          item.classList.add('active');
          const src = item.dataset.src;
          if (item.dataset.type === 'video') {
            document.body.style.background = `url(${src})`;
          }
        });
      });


    
    const musicBtn = document.getElementById('musicBtn');
    const musicPanel = document.getElementById('musicPanel');
    const closeMusicPanel = document.getElementById('closeMusicPanel');

    const soundBtn = document.getElementById('soundBtn');
    const soundPanel = document.getElementById('soundPanel');
    const closeSoundPanel = document.getElementById('closeSoundPanel');



    // music button
    musicBtn.addEventListener('click', () => {
        musicPanel.classList.toggle('show');
        document.body.classList.toggle('panel-open');
    });
 
    closeMusicPanel.addEventListener('click', () => {
        musicPanel.classList.remove('show');
        document.body.classList.remove('panel-open');
    });

    document.addEventListener('click', (e) => {
        if (musicPanel.classList.contains('show')) {
            if (!musicPanel.contains(e.target) && !musicBtn.contains(e.target)) {
                musicPanel.classList.remove('show');
                document.body.classList.remove('panel-open');
            }
        }
    });


    // Sound button
    soundBtn.addEventListener('click', () => {
        soundPanel.classList.toggle('show');
        document.body.classList.toggle('panel-open');
    });
 
    closeSoundPanel.addEventListener('click', () => {
        soundPanel.classList.remove('show');
        document.body.classList.remove('panel-open');
    });

    document.addEventListener('click', (e) => {
        if (soundPanel.classList.contains('show')) {
            if (!soundPanel.contains(e.target) && !soundBtn.contains(e.target)) {
                soundPanel.classList.remove('show');
                document.body.classList.remove('panel-open');
            }
        }
    });



    // --------------------------------GAME-------------------------------------
    const gameBtn = document.getElementById('gameBtn');
    const gamePopup = document.getElementById('gamePopup');
    const closeGameBtn = document.getElementById('closeGamePopup');
    const gameBoard = document.getElementById('gameBoard');
    const gameStatus = document.getElementById('gStatus');
    const resetBtn = document.getElementById('resetGame');
   
       
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameActive = true;
  
  // winning conditions
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  function initializeBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('game-cell');
      cell.setAttribute('data-index', i);
      cell.addEventListener('click', handleCellClick);
      gameBoard.appendChild(cell);
    }
  }
  
  function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    
    if (board[clickedCellIndex] !== '' || !gameActive) return;
    
    makeMove(clickedCell, clickedCellIndex, currentPlayer);
    
    if (checkWin()) {
      gameStatus.textContent = 'You win!';
      gameActive = false;
      return;
    }
    
    if (checkDraw()) {
      gameStatus.textContent = 'Game ended in a draw!';
      gameActive = false;
      return;    
    }
    
    // AI move
    setTimeout(() => {
      if (gameActive) {
        currentPlayer = 'O';
        gameStatus.textContent = "AI's turn (O)";
        
        setTimeout(() => {
          const aiMove = getAIMove();
          const aiCell = gameBoard.children[aiMove];
          makeMove(aiCell, aiMove, currentPlayer);
          
          if (checkWin()) {
            gameStatus.textContent = 'AI wins!';
            gameActive = false;
            return;
          }
          
          if (checkDraw()) {
            gameStatus.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
          }
          
          currentPlayer = 'X';
          gameStatus.textContent = 'Your turn (X)';
        }, 500);
      }
    }, 300);
  }
  
  function makeMove(cell, index, player) {
    board[index] = player;
    cell.textContent = player;
    cell.style.pointerEvents = 'none';
  }
  
  function getAIMove() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        if (checkWin()) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }
    
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        if (checkWin()) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }
    
    if (board[4] === '') return 4;
    
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === '');
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    const availableSpots = board.map((spot, index) => spot === '' ? index : null).filter(val => val !== null);
    return availableSpots[Math.floor(Math.random() * availableSpots.length)];
  }
  
  function checkWin() {
    return winningConditions.some(condition => {
      return condition.every(index => {
        return board[index] === currentPlayer;
      });
    });
  }
  
  function checkDraw() {
    return board.every(cell => cell !== '');
  }
  
  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = 'Your turn (X)';
    initializeBoard();
  }
  
  function toggleGamePopup() {
    gamePopup.classList.toggle('hidden');
    if (!gamePopup.classList.contains('hidden')) {
      resetGame();
    }
  }
  
  gameBtn.addEventListener('click', toggleGamePopup);
  closeGameBtn.addEventListener('click', toggleGamePopup);
  resetBtn.addEventListener('click', resetGame);
  
  initializeBoard();
    
});