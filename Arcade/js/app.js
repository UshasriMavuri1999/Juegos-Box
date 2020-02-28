//Declaration of enemy and its position.
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
};
// Movements for the enemy and assigning random speed for it.
Enemy.prototype.update = function(dt) {
  // we should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);
  this.speed = 2 * Math.floor(Math.random() * 200);

  while (this.x >= 505) {
    this.x = 0;
  }
  // Set the position of player back to original
  // position when he clashes with the enemy.

  var A = player.x < this.x + 70;
  var B = player.x + 70 > this.x;
  var C = player.y < this.y + 50;
  var D = player.y + 65 > this.y;
  if (A && B && C && D) {
    player.x = 200;
    player.y = 400
    // Popup when the player clashes with enemy.
    swal({
      title: 'Hit the skids....You are done!!!',
      imageUrl: "./images/cry.webp",
      confirmButtonText: 'PlayAgain'
    })
  }

  if (player.y < 70) {
    //Popup with Congratulations when he reaches the
    //respective position.
    swal({
        title: 'Congratulations!!',
        text: 'You won the game!!',
        // type: 'success',
        imageUrl: "./images/congobg2.gif",
        confirmButtonText: 'PlayAgain'
      },
      function() {
        location.reload()
      }
    )
  }
};
// Default poition of bugs
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite = "images/enemy-bug.png"), this.x, this.y);
};
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy_pstn = [80, 160, 240];
for (i = 0; i < enemy_pstn.length; i++) {
  // We use random function for random positions and speed
  var enemy = new Enemy(Math.random() * 200, enemy_pstn[i], 100);
  allEnemies.push(enemy)
}
// Place the player object in a variable called player,
// Assign respective co-ordinates to player
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  // Default character of player
  this.image = 'images/char-boy.png';
}
//  Fix the initial position of player
var player = new Player(200, 400);
Player.prototype.update = function(dt) {}
// Bydefault position of player
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.image), this.x, this.y);
};
// Player reacts according to the action of keys performed
player.handleInput = function(movements) {
  if (movements === "left") {
    if (this.x > 10) {
      this.x = this.x - 100;
    }
  } else {
    if (movements === "right") {
      if (this.x < 390) {
        this.x = this.x + 100;
      }
    } else {
      if (movements === "up") {
        if (this.y > 18) {
          this.y = this.y - 82;
        }
      } else {
        if (movements === "down") {
          if (this.y < 380) {
            this.y = this.y + 82;
          }
        }
      }
    }
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
