let canvas = document.getElementById('Canvas');
let ctx = canvas.getContext('2d');
let dinosaurDirection = -1;
let randomObstacles;
let crashCounter = 0;
let points = 0;
let gameOver = false;
let obstacleScheduled = false;

function startGame() {
    let dinosaur = {
        x: 300,
        y: 240,
        width: 20,
        height: 60,
        color: 'brown',
        speed: 5,
        draw: function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function() { 
            if (this.y > 120 && dinosaurDirection === 1) {
                this.y -= this.speed;
            } else if (this.y === 120) {
                dinosaurDirection = -1;
                this.y += this.speed;
            } else if (this.y > 120 && this.y < 240 && dinosaurDirection === -1) {
                this.y += this.speed;
            }
        }
    }
    dinosaur.draw();
    
    function animateDinosaur() {
        requestAnimationFrame(animateDinosaur);
        ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
        dinosaur.update();
        dinosaur.draw();
    }
    if (gameOver === false) {
        animateDinosaur();
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === ' ' && gameOver === false) {
            dinosaurDirection = 1;
        } else if (event.key === 'ArrowDown' && gameOver === false) {
            ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
            dinosaur.y = 280;
            dinosaur.draw();
        } else if (event.key === 'ArrowUp' && gameOver === false) {
            ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
            dinosaur.y = 240;
            dinosaur.draw();
        }
    });

    function showObstacles() {
        let pointsCounter = 0;
        randomObstacles = Math.floor(Math.random() * 3) + 1;
        if (randomObstacles % 2 === 0) {
            let yValue = 270;
            let obstacleHeight = 35;
            let obstacleColor = 'green';
            createAndAnimateObstacles(yValue, obstacleColor, obstacleHeight);
        } else if (randomObstacles % 3 === 0) {
            let yValue = 230;
            let obstacleHeight = 20;
            let obstacleColor = 'red';
            createAndAnimateObstacles(yValue, obstacleColor, obstacleHeight);
        } else {
            let yValue = 250;
            let obstacleHeight = 20;
            let obstacleColor = 'grey';
            createAndAnimateObstacles(yValue, obstacleColor, obstacleHeight);
        }
        
        function createAndAnimateObstacles(yValue, obstacleColor, obstacleHeight) {
            let obstacle = {
                x: 1520,
                y: yValue, 
                width: 50,
                height: obstacleHeight,
                color: obstacleColor,
                speed: 4,
                draw: function() {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                },
                update: function() {
                    if (this.x > -100) {
                        this.x -= this.speed; 
                    } else {
                        obstacle = null;
                    }
                }
            }

            function animateObstacles() {
                if (obstacle.x < dinosaur.x + dinosaur.width &&
                    obstacle.x + obstacle.width > dinosaur.x &&
                    obstacle.y < dinosaur.y + dinosaur.height &&
                    obstacle.y + obstacle.height > dinosaur.y) {
                        ++crashCounter;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        if (crashCounter === 1) {
                            gameOver = true;
                            alert('Game OVER! You hit an obstacle! You have ' + points + ' points! REFRESH THE PAGE TO START A NEW GAME.');
                        } 
                } else if (obstacle.x < dinosaur.x && pointsCounter === 0) {
                    points += 10;
                    pointsCounter = 1;
                } 
                requestAnimationFrame(animateObstacles);
                ctx.clearRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                obstacle.update();
                obstacle.draw();
            }
            
            if (gameOver === false) {
                animateObstacles();
            }
        }
    }

    function scheduleObstacle() {
        if (!obstacleScheduled) {
            obstacleScheduled = true;
            setInterval(showObstacles, 1700);
        }
    }
    scheduleObstacle();
    
    function incrementSeconds() {
        ++points;
    }
    setInterval(incrementSeconds, 1000);
}
