const board = document.getElementById('tiles')
const start = document.getElementById('btn')
const score = document.getElementById('score')
        pianoTiles()
        let started = false;
        let userClicked = [];
        let gamePattern = [];
        let level = 0;
        function pianoTiles() 
        {
            start.onclick = function (e) 
            {
                start.style.display = 'none'
                score.style.display = 'block'
                score.innerHTML = 'Level : 0'
                if (!started) 
                {
                    nextSequence();
                    started = true;
                }
                board.onclick = function(e) {
                    var userChosen = e.target.id;
                    userClicked.push(userChosen);
                    checkNormal(userClicked.length - 1);
                };
            };
        };
        function checkNormal() {
            if (userClicked.some(r => gamePattern.includes(r)) || (gamePattern.length == userClicked.length)) {
                if (gamePattern.sort().join(',') === userClicked.sort().join(',')) {
                    if (level > 0) {
                        score.innerHTML = 'Level : ' + (level);
                    }
                    setTimeout(function () {
                        nextSequence();
                    }, 1000);
                }
                else {
                    setTimeout(function () {
                        score.innerHTML = 'Game Over! Your Score is ' + (level - 1);
                    }, 200);
                    pianoTiles();
                }
            }
            else if (userClicked.length > gamePattern.length) {
                setTimeout(function () {
                    score.innerHTML = 'Score : ' + (level - 1);
                }, 200);
                pianoTiles();
            }
        }
        

        function nextSequence() {
            userClicked = [];
            level++;
            var randomNumber = Math.floor(Math.random() * 16);
            gamePattern.push(randomNumber);
            var i = 0;
            var interval = setInterval(function () {
                if (i < gamePattern.length) {
                    var tile = document.getElementById(gamePattern[i]);
                    tile.style.backgroundColor = '#fff';
                    setTimeout(function () {
                        tile.style.backgroundColor = '#000';
                    }, 300);
                    i++;
                }
                else {
                    clearInterval(interval);
                }
            }, 400);
        }
