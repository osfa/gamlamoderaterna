var noiseSource = new Tone.Noise({
	"volume" : -10,
	"type" : "brown",
	"playbackRate"  : 0.2
}).start(); //toMaster();

var noise = new Tone.AutoFilter({
	"frequency" : "2m",
	"min" : 800,
	"max" : 15000
}).connect(Tone.Master);

noiseSource.connect(noise);

var isPlaying = false;

// window.onload = function(){

	console.log('onload');
	var main = document.getElementById('main');

	main.onclick = function(){
		console.log('onclick', isPlaying);
		noiseSource.volume = -5;
		// if(!isPlaying){
		// 	noiseSource.start();
		// 	isPlaying = !isPlaying;
		// }
	}

	main.addEventListener("mouseover", function(){
		console.log('mouseover', isPlaying);
		if(!isPlaying){
			noiseSource.start();
			isPlaying = !isPlaying;
		}
	});

	main.addEventListener("mouseout", function(){
		console.log('mouseout', isPlaying);
		if(isPlaying){
			noiseSource.stop();
			isPlaying = !isPlaying;
		}
	});
// }
