

	//html5的拖动
	function allowdrop(ev){
		ev.preventDefault();
	}
	function drag(ev){
		ev.dataTransfer.setData('picture',ev.target.id);
	}
	function drop(ev){
		ev.preventDefault();
		var data = ev.dataTransfer.getData('picture');
		ev.target.appendChild(document.getElementById(data));
	}


	

