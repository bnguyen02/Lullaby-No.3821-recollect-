let font;
let wordlist = [];
let ts = [];
let sounds = [];
let audionames = [];
let holder;
let img1;
let img2;

function preload() {
  font = loadFont("roboto.ttf");
  wordlist = loadStrings('list.txt');
  audionames = ['em.wav', 'hoi.wav', 'anh.wav', 'bao.wav','gio.wav', 'tro.wav', 'lai.wav', 'dem.wav', 'hao.wav', 'mon.wav', 'no.wav','ngan.wav', 'con.wav', 'chi.wav', 'me.wav', 'chua.wav', 've.wav', 'voi.wav', 'tron.wav', 'ba.wav', 'ong.wav', 'noi.wav', 'mat.wav', 'tang.wav', 'thay.wav', 'mong.wav', 'choo.wav', 'lai.wav', 'liem.wav', 'mau.wav', 'thuong.wav', 'troi.wav'
];
  img1 = loadImage('img1.png');

  for (let audioname of audionames) {
    sounds.push(loadSound(audioname, soundReady()));
    console.log(audioname);
  }
}

class textsounds {
  constructor(t, s) {
    this.pos = createVector(random(width), random(height));
    this.text = t;
    this.textSize = textSize(50);
    this.textFont = textFont(font);
    this.tw = textWidth(this.text);
    this.ta = textAscent() * 0.75;
    this.td = textDescent();
    this.sound = s;
    console.log(this.sound)
  }

  show() {
    fill(260);
    noStroke();
    text(this.text, this.pos.x, this.pos.y);
    // strokeWeight(2);
    // stroke(255, 0, 0);
    // line(this.pos.x, this.pos.y, this.pos.x + this.tw, this.pos.y). //Bottom line
    // stroke(0, 255, 0);
    // line(this.pos.x, this.pos.y - this.ta, this.pos.x + this.tw, this.pos.y - this.ta) //Top line
    // stroke(0, 0, 255);
    // strokeWeight(5);
    // point(this.pos.x + this.tw / 2, this.pos.y - this.ta / 2)

  }

  testMouse(x, y) {
    if (x > this.pos.x && x < this.pos.x + this.tw) {
      if (y < this.pos.y && y > this.pos.y - this.ta) {
        console.log("over " + this.text);
        return true;
      }
    }
    return false;
  }
  soundloop() {
    this.sound.loop();
  }

  soundstop() {
    this.sound.stop();
  }

  soundplay() {
    return this.sound.isPlaying();
  }

}

function soundReady() {
  console.log("sound ready!")
}

 

 
function setup() {
  createCanvas(2000, 1000);

    

  for (let i = 0; i < wordlist.length; i++) {
    ts.push(new textsounds(wordlist[i], sounds[i]))
  }
  wordlist = [];
  sounds = [];
  
 
  
}


function draw() {
  background(img1); 
  

  for (let i = 0; i < ts.length; i++) {
    ts[i].show()
  }

  if (holder) {
    holder.pos = createVector(mouseX - holder.tw / 2, mouseY + holder.ta / 2);
  }

}

function mouseClicked() {
  if (holder == null) {
    for (let t of ts) {
      if (t.testMouse(mouseX, mouseY)) {
        holder = t
        holder.soundloop()
      }
    }
  } else {
    if (holder.soundplay()) {
      holder.soundstop()
    }

    holder = null;


  }
}