$(function(){
	minigameItit();	
});

$(window).keydown(function(e){
	// if(e.keyCode != 37 || e.keyCode != 39) return;

	if(e.keyCode == 37) pressKey = 'left';
	if(e.keyCode == 39) pressKey = 'right';
	
	chk(pressKey, currIdx);
});


var currIdx = 0;
var pressKey;
function minigameItit(){
	appendRoad();
}

// road format
// 0:[1 0]
// 1:[0 1]
// 2:[1 1]

var road = [];
function appendRoad(){
	for(var i=0;i<10;i++){
		var random = (Math.floor(Math.random()*10)%3).toFixed(0);
		road.push(random);

		var dom =  '<li>';
            dom +=    '<div class="road_left"></div>';
            dom +=    '<div class="road_right"></div>';
            dom += '</li>';

        $('ul').append(dom);
        $('ul li').eq(i).addClass('type_'+random);
	}
}
function chk($key, $idx){
	console.log('$key : ' + $key + ' | $idx : ' + $idx);

	if(road[$idx] == 0) {
		if($key=='left') $('ul li').eq($idx).find('.road_left').css('opacity', 0);
		else alert('틀림')
	}else if(road[$idx] == 1) {
		if($key=='right') $('ul li').eq($idx).find('.road_right').css('opacity', 0);
		else alert('틀림')
	}else if(road[$idx] == 2) {
		if($key=='left') $('ul li').eq($idx).find('.road_left').css('opacity', 0);
		else if($key=='right') $('ul li').eq($idx).find('.road_right').css('opacity', 0);
		else alert('틀림')
	}

	currIdx++;
};
