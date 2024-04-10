let canvas = document.getElementById('Canvas');
let ctx = canvas.getContext('2d');
let dinosaurDirection = -1;
let randomObstacles;
let crashCounter = 0;
let points = 0;
let gameOver = false;
let obstacleScheduled = false;
const dinosaurInclined = 255;
const dinosaurNormalPosition = 210;
const dinosaurMaximJump = 50;
const minimumObstaclePosition = -100;
const dinosaurInclinedWidth = 80;
const dinosaurInclinedHeight = 45;
const pointsForEachObstacle = 10;

const imgDinosaur = new Image();
imgDinosaur.src = "images.png";
const imgDinosaur2 = new Image();
imgDinosaur2.src = "dinosaur2.png";
const imgObstacle1 = new Image();
imgObstacle1.src = "cactus2.png";
const imgObstacle2 = new Image();
imgObstacle2.src = "bird1.png";
const imgObstacle3 = new Image();
imgObstacle3.src = "bird2.png";

function startGame() {
    let dinosaur = {
        x: 300,
        y: 210,
        width: 60,
        height: 90,
        speed: 5,
        draw: function() {
            if (dinosaur.y === dinosaurInclined) {
                ctx.drawImage(imgDinosaur2, this.x, this.y, dinosaurInclinedWidth, dinosaurInclinedHeight);
            } else {
                ctx.drawImage(imgDinosaur, this.x, this.y, this.width, this.height); 
            }
        },
        update: function() { 
            if (this.y > dinosaurMaximJump && dinosaurDirection === 1) {
                this.y -= this.speed;
                if (this.y <= dinosaurMaximJump) {
                    dinosaurDirection = -1;
                }
            } else if (this.y < dinosaurNormalPosition && dinosaurDirection === -1) {
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
        if (event.key === ' ' && gameOver === false && dinosaur.y === dinosaurNormalPosition) {
            dinosaurDirection = 1;
        } else if (event.key === 'ArrowDown' && gameOver === false) {
            ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
            dinosaur.y = dinosaurInclined;
            dinosaur.draw();
            
        } else if (event.key === 'ArrowUp' && gameOver === false) {
            ctx.clearRect(dinosaur.x, dinosaur.y, dinosaurInclinedWidth, dinosaurInclinedHeight);
            dinosaur.y = dinosaurNormalPosition;
            dinosaur.draw();
        }
    });

    function showObstacles() {
        let pointsCounter = 0;
        randomObstacles = Math.floor(Math.random() * 3) + 1;
        if (randomObstacles % 2 === 0) {
            const yValue = 240;
            const obstacleWidth = 50;
            const obstacleHeight = 80;
            createAndAnimateObstacles(yValue, obstacleWidth, obstacleHeight, imgObstacle1);
        } else if (randomObstacles % 3 === 0) {
            const yValue = 205;
            const obstacleWidth = 50;
            const obstacleHeight = 15;
            createAndAnimateObstacles(yValue, obstacleWidth, obstacleHeight, imgObstacle2);
        } else {
            const yValue = 230;
            const obstacleWidth = 50;
            const obstacleHeight = 20;
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
                    if (this.x > minimumObstaclePosition) {
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
                    points += pointsForEachObstacle;
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
