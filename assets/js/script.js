window.onload = function(){
  //canvas init
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //snowflake particles
  var mp = 25; //max particles
  var particles = [];
  for (var i=0; i < mp; i++) {
    particles.push({
      x:Math.random()*W, //x-coordinate
      y:Math.random()*H, //y-coordinate
      r:Math.random()*4+1, //radius
      d:Math.random()*mp //density
    });
  }

  //Draw snowflakes
  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for(var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    update();
  }

  //Move snowflakes with function
  //Angle ongoing incremental flag. Sin and Cos functions applied to it to create vertical and horizontal movements
  var angle = 0;
  function update() {
    angle += 0.01;
    for (var i = 0; i < mp; i++){
      var p = particles[i];
     //update x and y coordinates
     //Add 1 to cos function to prevent negative values-keeps them from moving upwards as fall
     //Particles have own density that can be used to make downward movement different for each flake.
     //make random by adding radius
      p.y += Math.cos(angle + p.d) + 1 + p.r/2;
      p.x += Math.sin(angle)*2;

    //Send flakes back to the top when exits
    //lets flakes enter from left and right
    if(p.x > W+5 || p.x < -5 || p.y > H) {
      if(i % 3 > 0) { //66.7% of the snowflakes
        particles[i] = {x:Math.random()*W, y:-10, r: p.r, d: p.d};
      } else {
        //if snowflake exists from right
        if(Math.sin(angle) > 0) {
          //enter from left
          particles[i] = {x: -5, y:Math.random()*H, r: p.r, d: p.d};
        } else {
          //enter from the right
          particles[i] = {x: W+5, y:Math.random()*H, r: p.r, d: p.d};
        }
      }
    }
  }
}

  //animation loop
  setInterval(draw, 33);
}
