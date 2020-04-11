(() => {
	console.log('fired');
	const items = document.querySelectorAll('.items img'),
		  dropZone = document.querySelectorAll('.drop'),
		  dropBoard = document.querySelector(".drop-zone"),
		  audioPlay = document.querySelector("audio"),

		  //each drop zones
		  drop1 = document.querySelector(".one"),
		  drop2 = document.querySelector(".two"),
		  drop3 = document.querySelector(".three"),
		  drop4 = document.querySelector(".four"),

		  //each instrument images
		  drumDrop = document.querySelector("#drumPlay"),
		  guitarDrop = document.querySelector("#guitarPlay"),
		  pianoDrop = document.querySelector("#pianoPlay"),
		  saxDrop = document.querySelector("#saxPlay"),

		  //each music box in each drop zone
		  musicZone1 = document.querySelector(".playInstr1"),
		  musicZone2 = document.querySelector(".playInstr2"),
		  musicZone3 = document.querySelector(".playInstr3"),
		  musicZone4 = document.querySelector(".playInstr4"),

		  instrSound = new Audio('audio/Sound-Sax.mp3'),

		  //buttons
		  playButtons = document.querySelectorAll('.playButton'),
          pauseButtons = document.querySelectorAll('.pauseButton'),
          rwButtons = document.querySelectorAll('.rwButton'),
          reset = document.querySelector('.resetButton');

    let globalPaused = false;

	function allowDrag(event){
		console.log("Drag item");
		event.dataTransfer.setData("text/plain", this.id);
	}

	function allowDragOver(event){
		console.log('Dragged over a drop zone');
		event.dataTransfer.setData("text/plain", this.id);
		event.preventDefault();
		if (this.id == "dragDrum") {drumDrop.classList.add("dragging");}
		if (this.id == "dragGuitar") {guitarDrop.classList.add("dragging");}
		if (this.id == "dragPiano") {pianoDrop.classList.add("dragging");}
		if (this.id == "dragSax") {saxDrop.classList.add("dragging");}
	}

	//play instruments functions
	function playAudio() {
    if (globalPaused) {
      console.log('paused');
      if (instrSound.getAttribute('src').includes(this.dataset.trackref)) {
        // if our audio is paused, then just play the track and exit
        resumeAudio();
        return;
      }
    }
    let sound = this.dataset.trackref;
    instrSound.src = `audio/${sound}.mp3`;
    instrSound.load();
    instrSound.play();
  }

	//button controls
	function resumeAudio() {
    globalPaused = false;
    instrSound.play();
    }

	function pauseAudio() {
    instrSound.pause();
    globalPaused = true;
  	}

  	function rwAudio() {
    instrSound.currentTime = 0;
 	}

	//drop events
	function allowDrop(event){
		console.log("Dropped Item");
		event.dataTransfer.setData("text/plain", this.id);
		event.preventDefault();

		//showing instrument images in the zones
		if (drumDrop.classList.contains("dragging")) {
			musicZone1.classList.add("show-drum");}

		if (guitarDrop.classList.contains("dragging")) {
			musicZone2.classList.add("show-guitar");}

		if (pianoDrop.classList.contains("dragging")) {
			musicZone3.classList.add("show-piano");}

		if (saxDrop.classList.contains("dragging")) {
			musicZone4.classList.add("show-sax");}

		else {console.log("no more items")}
	}//end allowDrop
	
	//reset everything
	function resetEverything(event){
		console.log("reset");
		instrSound.pause(); 
		globalPaused = true;
		drumDrop.classList.remove("dragging");
		guitarDrop.classList.remove("dragging");
		pianoDrop.classList.remove("dragging");
		saxDrop.classList.remove("dragging");
		musicZone1.classList.remove("show-drum");
		musicZone2.classList.remove("show-guitar");
		musicZone3.classList.remove("show-piano");
		musicZone4.classList.remove("show-sax");
	}

	//Trigger functions
	items.forEach(item => {
		item.addEventListener('dragstart', allowDrag);
		item.addEventListener('dragover', allowDragOver);
	});

	dropZone.forEach(drop => {
		drop.addEventListener('dragover', allowDragOver);
		drop.addEventListener('drop', allowDrop);
	});

  	playButtons.forEach(button => button.addEventListener("click", playAudio));
  	pauseButtons.forEach(button => button.addEventListener("click", pauseAudio));
  	rwButtons.forEach(button => button.addEventListener("click", rwAudio));
  	reset.addEventListener("click", resetEverything);

})();