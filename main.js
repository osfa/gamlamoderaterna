var noiseSource = new Tone.Noise({
	"volume" : -12,
	"type" : "white",
	"playbackRate"  : 0.2
}); //.start(); //toMaster();

var filter = new Tone.AutoFilter({
	"frequency" : 200,
	"min" : 400,
	"max" : 15000
}).connect(Tone.Master);

noiseSource.connect(filter);
filter.start();

var playerReverse = new Tone.Player({
  "url" : "drogogon-reverse.mp3",
  "autostart" : true,
  "loop" : true,
  "reverse": false,
  "playbackRate": 1
});
playerReverse.volume.value = 6;

var player = new Tone.Player({
  "url" : "drogogon.mp3",
  "autostart" : true,
  "loop" : true,
  "reverse": false,
  "playbackRate": 1
});
player.volume.value = 6;

var eyes = new Tone.Player({
  "url" : "eyes.mp3",
  "autostart" : true,
  "loop" : true,
  "reverse": true,
  "playbackRate": 0.2
}).toMaster();
eyes.volume.value = -3;

var shiftval = -24;
var normval = -6;

var pitchShift = new Tone.PitchShift({
    pitch: shiftval,
    delayTime  : 2
}).toMaster();

var pitchShiftReverse = new Tone.PitchShift({
    pitch: shiftval,
    delayTime  : 2
}).toMaster();

player.connect(pitchShift);
playerReverse.connect(pitchShift);

Tone.Transport.scheduleRepeat(function(time){

	pitchShift.pitch += 6;
	pitchShiftReverse.pitch += 6;

	if(pitchShift.pitch > 16){
		pitchShift.pitch = normval;
		pitchShiftReverse.pitch = normval;
	}

	if(eyes.volume.value < 7){
		eyes.volume.value += 3;
	}

	console.log("vol", eyes.volume.value);
	console.log("pitch", pitchShift.pitch);

}, 8);

Tone.Transport.start();

// var players = [];
// var playerCount = 6;
// var shifter = 6;

// for (var i = 0; i < playerCount; i++){

// 	var p = new Tone.Player({
// 	  "url" : "drogogon.mp3",
// 	  "autostart" : true,
// 	  "loop" : true
// 	});

// 	var ps = new Tone.PitchShift({
// 	    pitch: -(shifter * 6),
// 	    delayTime: (shifter * 2),
// 	}).toMaster();

// 	players.push(p);
// 	p.connect(ps);
// }

var oscillators = [];
var bassFreq = 30;
var bassInterval = 3;
var bassMax = -30;
var oscCount = 4;

for (var i = 0; i < oscCount; i++){
oscillators.push(new Tone.Oscillator({
  "frequency" : bassFreq * i,
  //"type" : "sawtooth10",
  "volume" : bassMax,//-Infinity,
  "detune" : Math.random() * 30 - 15,
}).toMaster());
}

oscillators.forEach(o => {
	//console.log('ramping:', o.frequency);
	o.start();
	o.volume.rampTo(bassMax, bassInterval);
});


var kill = new Tone.Oscillator({
  "frequency" : 3000,
  "type" : "sawtooth10",
  "volume" : -12,
  "detune" : Math.random() * 30 - 15,
}).toMaster();

var isPlaying = false;
var killP = false;

window.onload = function(){

	console.log('onload');
	var main = document.getElementById('main');

	main.onclick = function(){
		console.log('onclick', isPlaying);
		killP = !killP;
		// if(killP){ kill.start(); }
		// else { kill.stop(); }
		noiseSource.start();
	}

	main.addEventListener("mouseover", function(){
		//console.log('mouseover', isPlaying);
		//console.log('delta');
		if(!isPlaying){
			noiseSource.start();
			isPlaying = !isPlaying;
		}
	});

	main.addEventListener("mouseout", function(){
		//console.log('mouseout', isPlaying);
		if(isPlaying){
			noiseSource.stop();
			isPlaying = !isPlaying;
		}
	});
}
