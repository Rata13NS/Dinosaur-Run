let canvas = document.getElementById('Canvas');
let ctx = canvas.getContext('2d');
let dinosaurDirection = -1;
let randomObstacles;
let crashCounter = 0;
let points = 0;
let gameOver = false;

function startGame() {
    let dinosaur = {
        x: 300,
        y: 240,
        width: 20,
        height: 60,
        color: 'black',
        speed: 5,
        draw: function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function() { 
            if (dinosaur.y > 110 && dinosaurDirection === 1) {
                dinosaur.y -= dinosaur.speed;
            } else if (dinosaur.y === 110) {
                dinosaurDirection *= -1;
                dinosaur.y += dinosaur.speed;
            } else if (dinosaur.y > 110 && dinosaur.y < 240 && dinosaurDirection === -1) {
                dinosaur.y += dinosaur.speed;
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
        if (event.code === 'Space') {
            dinosaurDirection *= -1;
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
            createAndAnimateObstacles(yValue);
        } else if (randomObstacles % 3 === 0) {
            let yValue = 220;
            createAndAnimateObstacles(yValue);
        } else {
            let yValue = 240;
            createAndAnimateObstacles(yValue);
        }
        
        function createAndAnimateObstacles(yValue) {
            let obstacle = {
                x: 1520,
                y: yValue, 
                width: 50,
                height: 35,
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
    
    if (points < 200) {
        setInterval(showObstacles, 2500);
    } else if (points >= 200 && points <= 500) {
        setInterval(showObstacles, 2000);
    } else {
        setInterval(showObstacles, 1500);
    }

    function incrementSeconds() {
        ++points;
    }
    setInterval(incrementSeconds, 1000);
}
