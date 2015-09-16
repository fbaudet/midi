$(document).ready(function(){
	var keyblack = $('#keysblack').find(".keyblack");
	
	//var keyblackJQ = $('.keyblack');

	var keyblackLength = keyblack.length;
	keyblackLength -= 1;

	var init = [33, 56, 104, 127, 150];
	var i = 0;

	keyblack.each(function() {
		console.log($(this));
		$(this).css('left', init[i]+"px");
		i++;
	});


	for (var i = 0; i < keyblackLength; ++i) {
		//console.log(keyblack[i]);
		// keyblack[i].style.left = "10px";
	};
});