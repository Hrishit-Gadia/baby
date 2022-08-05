img = "";
Status = "";
objects = [];
alerter = "";
function preload(){
  alerter = loadSound('stranger_things.mp3');
}

function setup() {
  canvas = createCanvas(350, 350);
  video = createCapture(VIDEO);
  video.size(350, 350);
  video.hide();
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 350, 350);
  if (Status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      fill(r, g, b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if (objects[i].label == 'person') {
        alerter.stop();
        document.getElementById('info').innerHTML = 'Baby Detected';
      }
      else {
        document.getElementById('info').innerHTML = 'Baby Not Detected';
        alerter.play();
      }
    }
    if (objects.length == 0) {
      document.getElementById('info').innerHTML = 'Baby Not Detected';
      alerter.play();
    }
  }
}