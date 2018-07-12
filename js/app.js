// Enemies our player must avoid
const Enemy = function(x,y,speed) {
	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) { 
	const thiss = this
    setTimeout( function() {
		if (thiss.x > 1250) {
			thiss.x = -100;
		}
		else { thiss.x += thiss.speed; }
	},1*dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//player constructor function
const Player = function() {
	this.sprite = 'images/char-princess-girl.png';
	this.x = 200;
	this.y = 383;
};

//handles behavior when player encounters enemies and gets to the water
Player.prototype.update = function(direction) {
	const thiss = this
	if (thiss.y === -32) {
		thiss.x = 200;
		thiss.y = 383;
	}
	allEnemies.forEach(function (enemy) {
		if (thiss.x > enemy.x - 25 && thiss.x < enemy.x + 30
			&& thiss.y > enemy.y - 20 && thiss.y < enemy.y + 20) {
			thiss.x = 200;
			thiss.y = 383;
		}
	});	
};

//renders player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

//player movement
Player.prototype.handleInput = function(event) {
	if (this.x === 0 & event === 'left' ||
		this.x === 400 & event === 'right' ||
		this.y === -32 & event === 'up' ||
		this.y === 383 & event === 'down') {
		return
	}
	else {
		if (event === 'left') {
			this.x -= 100;
		}
		else if (event === 'right') {
			this.x += 100;
		}
		else if (event === 'up') {
			this.y -= 83;
		}
		else if (event === 'down') {
			this.y += 83;
		}
	}
};

//instantiates these awesome objects
const enemy1 = new Enemy(-150,217,3);
const enemy2 = new Enemy(-900,134,5);
const enemy3 = new Enemy(-575,49,9);
const enemy4 = new Enemy(-622,217,6);
const enemy5 = new Enemy(-1352,134,2);
const enemy6 = new Enemy(-250,49,3);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
const player = new Player();


//listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
