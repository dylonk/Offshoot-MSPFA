

const canvas = document.getElementById('canvas');
const movingcanvas = document.getElementById('movingcanvas');
const ctx = canvas.getContext('2d');
const ctx2 = movingcanvas.getContext('2d');

//initialization of global variables
stringwidth=5;
let strings = [];
let images = [];


// List of image paths
const imagePaths = [
  "exporthere\\landbg.png",
  "exporthere\\bigharp_frame_only.png",
  "exporthere\\phonegray.png",
  "exporthere\\phonecameratop.png",
  "exporthere\\phonehomescreen_blank.png",
  "exporthere\\phone_text_battery.png", 
  "exporthere\\bigharp_buttons_toplayer.png", //last image loaded in draw function, all other images must be loaded in other functions.  
  "exporthere\\discord_white_bg.png",
  "exporthere\\full_ineeri_darkbg.png",
  "exporthere\\full_ineeri_isolated_text.png",
  "exporthere\\full_kollei_darkbg.png",
  "exporthere\\full_kollei_isolated_text.png",
  "exporthere\\ineeri_red_bg.png",
  "exporthere\\kollei_red_bg.png",
  "exporthere\\phone_blue_toplayer.png",
  "exporthere\\phone_discord_bg.png",
  "exporthere\\phone_discord_gray.png",
  "exporthere\\phone_discord_red.png",
  "exporthere\\phone_icons_isolated.png",
  "exporthere\\phone_icons_text_combo.png",
  "exporthere\\phone_icons_text_isolated.png",
];




//PRELOAD LOADS ALL IMAGES, IDS THEM ACCORDINGLY AND DRAWS THE FIRST 5.
function preload() {
  // Loads all images
  for (let i = 0; i < imagePaths.length; i++) {
    thisImage=loadImage(imagePaths[i]);
    thisImage.id="Image " + i;
    images[i] = thisImage;
    console.log("Image " + i + " loaded?");
  }
}




function setup() {
  createCanvas(1700, 800);
  strings.push(new HarpString(30, 115, 80)); 
  strings.push(new HarpString( 80, 140, 120));
  strings.push(new HarpString( 135, 153, 220));
  strings.push(new HarpString( 193, 155, 300));
  strings.push(new HarpString( 245, 135, 400));
  strings.push(new HarpString( 285, 100, 500));
  strings.push(new HarpString( 320, 60, 600));
  strings.push(new HarpString( 360, 15, 700));
  strings.push(new HarpString( 400, 0, 800));
  strings.push(new HarpString( 450, 0, 900));
}



function draw() {
  background(255);
  // Draw images first
  let x = 0;
  let y = 0;
  for (let i = 0; i < 6; i++) {
    image(images[i], x, y); // Adjust size and position as needed 
  }


  for (let string of strings) {
    string.display();
  }

  image(images[6], x, y); //loads harp buttons
}

//CLICK AND DRAG
let drag = false;
document.addEventListener(
    'mousedown', () => drag = false);

document.addEventListener(
    'mousemove', () => drag = true);

document.addEventListener(
    'mouseup', () => console.log(
        drag ? 'drag' : 'click'));



  

class HarpString {
  constructor(x, y, height) {
    this.x = x;
    this.height = height;
    this.y = y+height/2;
    this.width = stringwidth;
    this.isPlucked = false;
    this.pluckTime = 0;
    this.initialAmplitude = 20; // Initial amplitude of the wave
    this.amplitude = this.initialAmplitude;
    this.frequency = 2; // Frequency of the wave
    this.damping = 0.9999; // Damping factor to reduce amplitude over time
  }

  display() {
    stroke(255,215,0);
    strokeWeight(this.width);
    noFill();
    
    beginShape();
    for (let i = -this.height / 2; i <= this.height / 2; i++) {
      let offset = 0;
      if (this.isPlucked) {
        let time = (millis() - this.pluckTime) / 200;
        let normalizedPosition = (i + this.height / 2) / this.height; // Normalize position between 0 and 1
        offset = this.amplitude * sin(TWO_PI* this.frequency * i + time * TWO_PI) * (1 - normalizedPosition) * normalizedPosition;
        this.amplitude *= this.damping; // Reduce amplitude over time
        if (this.amplitude < 0.1) {
          this.isPlucked = false;
        }
      }
      vertex(this.x + offset, this.y + i);
    }
    endShape();
  }

  calculateAmplitude() {
    // Normalize height to a range (e.g., 1 to 10)
    let normalizedHeight = this.height / 300;
    // Apply logarithmic scaling
    let logAmplitude = Math.log(normalizedHeight + 1); // Adding 1 to avoid log(0)
    
    console.log(logAmplitude);
    return (logAmplitude*(Math.random() * (25 - 18) + 18));
  }


  pluck() {
    this.initialAmplitude=this.calculateAmplitude();
    console.log(this.initialAmplitude);
    this.isPlucked = true;
    this.pluckTime = millis();
    this.amplitude = this.initialAmplitude; // Reset amplitude when plucked
  }
}


//AUDIO API STUFF

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(soundId) {
    audioContext.resume().then(() => {
        const audioElement = soundId;
        if (!audioElement.source) {
            const source = audioContext.createMediaElementSource(audioElement);
            source.connect(audioContext.destination);
            audioElement.source = source; // Store the source to avoid creating it multiple times
        }
        audioElement.currentTime = 0; // Reset playback position
        audioElement.play();
    });
}





document.addEventListener('keydown', function(event) {
    if(!audioContext){audioContext = new AudioContext();} 
    audioContext.resume();
    keyPressed=event.key;
    if (pressedKeys.has(keyPressed)) {
      return;
  }
    pressedKeys.add(keyPressed);
    switch (keyPressed) {
        
        case '1':
        console.log("a pressed");
        sound = document.getElementById('c5');

        strings[0].pluck();
        playSound(sound);
        break;
        case '2':
        sound = document.getElementById('d5');

        strings[1].pluck();
        playSound(sound);
        break;
        case '3':
        sound = document.getElementById('d#5');
 
        strings[2].pluck();
        playSound(sound);
        break;
        case '4':
        strings[3].pluck();

        sound = document.getElementById('f5');
        playSound(sound);
        break;
        case '5':
        strings[4].pluck();
        sound = document.getElementById('f#5');
        playSound(sound);

        break;
        case '6':
        strings[5].pluck();
        sound = document.getElementById('g5');
        playSound(sound);
        break;
        case '7':
        strings[6].pluck();
        sound = document.getElementById('a5');
        playSound(sound);
        break;
        case '8':
        strings[7].pluck();
        sound = document.getElementById('a#5');
        playSound(sound);
        break;
        case '9':
        strings[8].pluck();
        sound = document.getElementById('b5');
        playSound(sound);
        break;
        case '0':
        strings[9].pluck();
        sound = document.getElementById('c6');  
        playSound(sound);
}



});

document.addEventListener('keyup', function(event) {
  const keyReleased = event.key;
  // Remove the key from the set of pressed keys
  pressedKeys.delete(keyReleased);
});