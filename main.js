const button = document.querySelector('.btn');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

class Ball {
    constructor(x, y, Hspeed, Wspeed, color, size) {
        this.x = x;
		  		this.y = y;
		  		this.Hspeed = Hspeed;
		  		this.Wspeed = Wspeed;
		  		this.color = color;
		  		this.size = size;
    }

	Draw() {
        ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fill();
    }

	Move() {

        if ((this.x + this.size) >= width) {
            this.Hspeed = -(this.Hspeed);
        }

		if ((this.x - this.size) <= 0) {
            this.Hspeed = -(this.Hspeed);
        }

		if ((this.y + this.size) >= height) {
            this.Wspeed = -(this.Wspeed);
        }

		if ((this.y - this.size) <= 0) {
            this.Wspeed = -(this.Wspeed);
        }

		this.x += this.Hspeed;
		this.y += this.Wspeed;
    }
}

let balls = [];
let PageX = document.documentElement.clientWidth;
let PageY = document.documentElement.clientHeight;

button.addEventListener('click',function() {
    const size = random(10,20);
    let ball = new Ball(
    PageX / 2,
    PageY / 2,
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
    );
    balls.push(ball);
});

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,width,height);

	for(let i = 0; i < balls.length; i++) {
        balls[i].Draw();
		balls[i].Move();
    }

	requestAnimationFrame(loop);
}

loop();