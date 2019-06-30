var canvas = document.getElementById("scenery");
canvas.width = window.innerWidth;
canvas.height = (window.innerHeight)/2;

var c = canvas.getContext("2d");//stands for Context
//
// c.fillStyle = "red";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "red";
// c.fillRect(250, 100, 100, 100);
// c.fillStyle = "rgba(0,0,250,.1)";
// c.fillRect(370, 100, 100, 100);
// console.log(canvas);
//
// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle = "blue";
// c.stroke();
//
// //Arc (x,y,radius,startangle,endangle)
//
// for(var i = 0; i < 300; i++){
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x,y,30,0, Math.PI*2, false);
//     c.strokeStyle = "BLACK";
//     c.stroke();
// }

//
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = 10 * (Math.random() - 0.5) ;
// var dy = 10 * (Math.random() - 0.5) ;
// var radius = 30;

var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 40;
// var minRadius = 2;

var colorArray = [
  "#0E6AEB",
  "#0A4DAB",
  "#06295B",
  "#06306B",
  "#041F45",
];

window.addEventListener("mousemove",
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
}
);

window.addEventListener("resize",
function (event) {
  canvas.width = window.innerWidth;
  canvas.height = (window.innerHeight)/2;



})


function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.strokeWidth = 20;
    c.stroke();
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius> innerWidth || this.x - this.radius < 0){
      this.dx = - this.dx;
    }
    if (this.y + this.radius> (innerHeight)/2 || this.y - this.radius < 0){
      this.dy = - this.dy;
    }


    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y -this.y> -50) {

        if(this.radius < maxRadius) {
          this.radius += 1;
        }

    }
    else if (this.radius > this.minRadius){
      this.radius -= 1 ;
    }

    this.draw();
  }

}

  var circleArray = [];
function init() {
      circleArray = [];

  for(var i = 0; i < 300; i++){
      var radius = Math.random() * 3 + 1;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * ((innerHeight)/2 - radius * 2) + radius;
      var dx = (Math.random() - 0.5) ;
      var dy = (Math.random() - 0.5) ;

      circleArray.push(new Circle(x,y,dx,dy,radius));
  }
}


    function animate(){
      requestAnimationFrame(animate);
      c.clearRect(0,0,innerWidth, (innerHeight)/2);
      for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
      }

    }

init();
animate();
