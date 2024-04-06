let canvas = document.getElementById('Canvas');
let ctx = canvas.getContext('2d');
let dinosaurDirection = -1;
let randomObstacles;
let crashCounter = 0;
let points = 0;
let gameOver = false;
let obstacleScheduled = false;

let imgDinosaur = new Image();
imgDinosaur.src = "images.png";
let imgObstacle1 = new Image();
imgObstacle1.src = "cactus2.png";
let imgObstacle2 = new Image();
imgObstacle2.src = "bird1.png";
let imgObstacle3 = new Image();
imgObstacle3.src = "bird2.png";

function startGame() {
    let dinosaur = {
        x: 300,
        y: 205,
        width: 60,
        height: 120,
        speed: 5,
        draw: function() {
            ctx.drawImage(imgDinosaur, this.x, this.y, this.width, this.height);
        },
        update: function() { 
            if (this.y > 20 && dinosaurDirection === 1) {
                this.y -= this.speed; // Săritură
                if (this.y <= 20) {
                    dinosaurDirection = -1; // Schimbăm direcția la coborâre când dinozaurul a atins înălțimea maximă
                }
            } else if (this.y < 205 && dinosaurDirection === -1) {
                this.y += this.speed; // Coborâre
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
        if (event.key === ' ' && gameOver === false && dinosaur.y === 205) {
            dinosaurDirection = 1;
        } else if (event.key === 'ArrowDown' && gameOver === false) {
            ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
            dinosaur.y = 253;
            dinosaur.draw();
            
        } else if (event.key === 'ArrowUp' && gameOver === false) {
            ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
            dinosaur.y = 205;
            dinosaur.draw();
        }
    });

    function showObstacles() {
        let pointsCounter = 0;
        randomObstacles = Math.floor(Math.random() * 3) + 1;
        if (randomObstacles % 2 === 0) {
            let yValue = 260;
            let obstacleWidth = 70;
            let obstacleHeight = 60;
            createAndAnimateObstacles(yValue, obstacleWidth, obstacleHeight, imgObstacle1);
        } else if (randomObstacles % 3 === 0) {
            let yValue = 220;
            let obstacleWidth = 50;
            let obstacleHeight = 15;
            createAndAnimateObstacles(yValue, obstacleWidth, obstacleHeight, imgObstacle2);
        } else {
            let yValue = 230;
            let obstacleWidth = 50;
            let obstacleHeight = 20;
            createAndAnimateObstacles(yValue, obstacleWidth, obstacleHeight, imgObstacle3);
        }
        
        function createAndAnimateObstacles(yValue, obstacleWidth, obstacleHeight, imgObstacle) {
            let obstacle = {
                x: 1520,
                y: yValue, 
                width: obstacleWidth,
                height: obstacleHeight,
                speed: 4,
                draw: function() {
                    ctx.drawImage(imgObstacle, this.x, this.y, this.width, this.height);
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
