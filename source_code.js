let img;
let img2;
let cols, rows;
let scl = 35;
let w = 1400;
let h = 1000;

let flying = 0;

let terrain = [];

function preload() {
  img = loadImage("https://raw.githubusercontent.com/lwh0224/03-27Graphics_TeamPrj/main/volley_sph.png")    //구에 넣을 배구공 텍스쳐 사진이다.
  img2 = loadImage("https://raw.githubusercontent.com/lwh0224/03-27Graphics_TeamPrj/main/8bitSunset.jpg")    //배경으로 쓸 석양 이미지이다.
}

function setup() {

  createCanvas(640, 853, WEBGL);
  cols = w / scl;
  rows = h / scl;
  noStroke();

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}
function draw() {

  flying -= 0.01;    //바다가 비교적 잔잔히 파도치는것처럼 느껴지도록 값을 낮췄다.
  let yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -27, 27);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(255);
  push();
  translate(0,0,-700);    //배경을 파도 뒤에 입혀주기 위해 z축값을 조정하였다.
  texture(img2);    //석양 배경을 plane 도형에 텍스쳐로 입혀준다.
  plane(width*2, height*2);    //plane 도형을 z축으로 멀어지게 했으므로 너비와 높이에 2배를 해서 잘보이도록 바꾼다.
  pop();
  translate(0, 110);
  rotateX(PI / 3);
  fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      let v = terrain[x][y];
      fill(220-v, 95-v, 80-v);    //파도가 태양에 비친 주황색값으로 바꿔준다.
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  push();
  translate(w / 2, h / 2);
  translate(mouseX - width / 2, (mouseY - height / 2) * 4);
  rotateX(millis() /2500);
  rotateY(millis()/ 6000);
  texture(img);  //구에 발리볼 텍스쳐를 입혀준다.
  sphere(100);
  pop();
}
