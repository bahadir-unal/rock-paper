const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.querySelector('.player-score');
const computerScoreElem = document.querySelector('.computer-score');
const resultElem = document.querySelector('#result');
const playAgainBtn = document.querySelector('#play-again');
const countdownElem = document.querySelector('#countdown');
const computerChoiceElem = document.querySelector('#computer-choice');

const weapons = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
let countdown = 10;
let timeout;

// bilgisayar için seçme fonksiyonu
function computerPlay() {
  const weaponIndex = Math.floor(Math.random() * weapons.length);
  return weapons[weaponIndex];
}

// update etme ve skoru gösterme fonksiyonu
function updateScore(playerWeapon, computerWeapon) {
  clearTimeout(timeout);
  if (playerWeapon) {
    computerChoiceElem.innerHTML = `Bilgisayarın seçimi: ${computerWeapon}`;
    if (playerWeapon === computerWeapon) {
      resultElem.innerHTML = "Berabere!";
    } else if (
      (playerWeapon === 'rock' && computerWeapon === 'scissors') ||
      (playerWeapon === 'paper' && computerWeapon === 'rock') ||
      (playerWeapon === 'scissors' && computerWeapon === 'paper')
    ) {
      resultElem.innerHTML = 'Kazandın!';
      playerScore++;
      playerScoreElem.innerHTML = `Sen: ${playerScore}`;
    } else {
      resultElem.innerHTML = 'Bilgisayar kazandı!';
      computerScore++;
      computerScoreElem.innerHTML = `Bilgisayar: ${computerScore}`;
    }
    startTimer();
  } else {
    computerChoiceElem.innerHTML = `Oyun sona erdi`;
    resultElem.innerHTML = 'Seçim yapmadığın için oyunu kaybettin';
    resultElem.style.color = 'red';
    disableOptions();
  }

  if (playerScore === 5) {
    resultElem.textContent = 'Kazandın!';
    resultElem.style.color = 'green';
    computerChoiceElem.innerHTML = 'Oyun sona erdi';
    disableOptions();
    stopTimer();
  }

  if (computerScore === 5) {
    resultElem.textContent = 'Kaybettin!';
    resultElem.style.color = 'red';
    computerChoiceElem.innerHTML = 'Oyun sona erdi';
    disableOptions();
    stopTimer();
  }
}

// oyuncu seçim fonksiyonu
function selectWeapon() {
  clearTimeout(timeout);
  countdownElem.innerHTML = '10';
  countdown = 10;
  const playerWeapon = this.id;
  const computerWeapon = computerPlay();
  updateScore(playerWeapon, computerWeapon);
}

// zamanlayıcı başlasın
function startTimer() {
  countdown--;
  countdownElem.innerHTML = countdown;
  if (countdown === 0) {
    const computerWeapon = computerPlay();
    updateScore(null, computerWeapon);
  } else {
    timeout = setTimeout(startTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(timeout);
  countdown = 10;
  countdownElem.textContent = countdown;
}

// reset game 
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  countdown = 10;
  playerScoreElem.innerHTML = 'Sen: 0';
  computerScoreElem.innerHTML = 'Bilgisayar: 0';
  resultElem.innerHTML = 'Tarafını seç!';
  countdownElem.innerHTML = '10';
  resultElem.style.color = '#ff0a0a';
  computerChoiceElem.innerHTML = '';
  enableOptions();
  startTimer();
}

function disableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'none';
  });
}

function enableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'auto';
  });
}


choices.forEach((choice) => choice.addEventListener('click', selectWeapon));
playAgainBtn.addEventListener('click', resetGame);

// sayfa yüklendiğinde zamanlayıcı çalışsın
countdownElem.innerHTML = countdown; 
timeout = setTimeout(startTimer, 1000);