var noiseSource = new Tone.Noise({
	"volume" : 0,
	"type" : "brown",
	"playbackRate"  : 4
}); //.start(); //toMaster();

var filter = new Tone.AutoFilter({
	"frequency" : 0.1,
	"min" : 400,
	"max" : 15000
}).connect(Tone.Master);

noiseSource.connect(filter);
filter.start();

var isPlaying = false;

// window.onload = function(){

	console.log('onload');
	var main = document.getElementById('main');

	main.onclick = function(){
		console.log('onclick', isPlaying);
		noiseSource.start();
		// if(!isPlaying){
		// 	noiseSource.start();
		// 	isPlaying = !isPlaying;
		// }
		// else {
		// 	noiseSource.stop();
		// 	isPlaying = !isPlaying;
		// }
	}

	main.addEventListener("mouseover", function(){
		console.log('mouseover', isPlaying);
		console.log('delta');
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
