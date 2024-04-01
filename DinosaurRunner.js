let canvas = document.getElementById('Canvas');
let ctx = canvas.getContext('2d');
let dinosaurDirection = -1;
let randomObstacles;
let crashCounter = 0;
let points = 0;
let gameOver = false;

function showDinosaur() {
    let dinosaur = {
        x: 300,
        y: 240,
        width: 20,
        height: 60,
        color: 'black',
        speed: 6,
        draw: function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function() { 
            if (dinosaur.y > 84 && dinosaurDirection === 1) {
                dinosaur.y -= dinosaur.speed;
            } else if (dinosaur.y === 84) {
                dinosaurDirection *= -1;
                dinosaur.y += dinosaur.speed;
            } else if (dinosaur.y > 84 && dinosaur.y < 240 && dinosaurDirection === -1) {
                dinosaur.y += dinosaur.speed;
            }
        }
    }
    dinosaur.draw();
    
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && gameOver === false) {
            dinosaurDirection *= -1;
            function animateDinosaur() {
                requestAnimationFrame(animateDinosaur);
                ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
                dinosaur.update();
                dinosaur.draw();
            }
                animateDinosaur();
        } else if (event.key === 'ArrowDown' && gameOver === false) {
            ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
            dinosaur.y = 270;
            dinosaur.draw();
        } else if (event.key === 'ArrowUp' && gameOver === false) {
            ctx.clearRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
            dinosaur.y = 240;
            dinosaur.draw();
        }
    });

    function showObstacles() {
        let pointsCounter = 0;
        randomObstacles = Math.floor(Math.random() * 2) + 1;
        console.log(randomObstacles);
        if (randomObstacles % 2 === 0) {
            let obstacle = {
                x: 1520,
                y: 270, 
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
                        delete obstacle;
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
        } else if (randomObstacles % 2 != 0) {
            let obstacle = {
                x: 1520,
                y: 230, 
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
                        delete obstacle;
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
    setInterval(showObstacles, 2500);

    function incrementSeconds() {
        ++points;
    }
    setInterval(incrementSeconds, 1000);
}
