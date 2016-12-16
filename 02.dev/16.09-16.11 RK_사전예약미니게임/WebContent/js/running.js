(function($){
	var __arg , __id = 0 , __itemMap = [], __itemPool = [], _isComplete ,
    __Arun , __Crun , __Aproto , __Cproto , __ARG , __FACTORY , __RELEASE;

	__Arun = function(){ this.data = {}; };
	__Crun = function(){};
	__ARG = (function(){
		__arg = new __Arun;
		return __arg;
	})();
	__Aproto = __Arun.prototype;
	__Cproto = __Crun.prototype;
	
	$.$each(['players' ,'initValue' , 'limitValue' ,'time' , 'onComplete' , "onFinal" , "onBlock" , "onDelay" , 'onTime' , 'rollList','size'] , 
		    function($name){
				__Aproto[$name] = function($value){
				this.data[$name] = $value === undefined ? true : $value;
				return this; 
			};
	});
	 
	function _initialize($bind){
		$bind.ratio = 1;
		$bind.time = $.$isNumber($bind.time) ? $bind.time  : 10;
		$bind.size = $.$isNumber($bind.size) ? $bind.size : stage.width;
		$bind.onTime = $.$isFunction($bind.onTime) ? $bind.onTime : function(){}
		$bind.onFinal = $.$isFunction($bind.onFinal) ? $bind.onFinal : function(){}
		$bind.onBlock = $.$isFunction($bind.onBlock) ? $bind.onBlock : function(){}
		$bind.onDelay = $.$isFunction($bind.onDelay) ? $bind.onDelay : function(){}
		$bind.onComplete = $.$isFunction($bind.onComplete) ? $bind.onComplete : function(){}
		if($bind.players == undefined) throw new Error("Running : must has a players array");
	}
	
	__Cproto.resize = function($size){
		var bind = this;
		var bsize = this.size;
		var id = 0;
		
		bind.block = true;
		if(bind.rollList!=null) {
			bind.rollList.setSize($size);
			$.$each(bind.rollList.getItems() , function($item){
				$.$sprite.ADD($.$find($item , "img")).width($size);
			});
			
			if(!_isComplete){
				stage.timerR(reset).timer(500,1,reset);
			}
		}
		
		function reset(){
			bind.time += .5; // resize 하는 경우 전체 시간 을 늘려줌.
			bind.size = $size;
			$.$each(bind.players,function($player){
				var per = $player.x()/bsize;
				
				stage.timerR(bind.resume);
				$.$tweener.KILL($player);
				$.$tweener.TO($player,.3,{x:$size*per,onComplete:function(){
					id++;
				}});
				bind.resume();
			});
		}
	}
	
	__Cproto.resume = function(){
		this.ratio = 1;
		this.onDelay(1);
		this.block = false;
	}
	
	__Cproto.reset = function(){
		this.start();
	}
	
	__Cproto.start = function($winnerId , $gradeIds){
		var bind = this;
		var players = bind.players;
		var finalPause = isEnd = isReady = false,moveBlock = true;
		var speed = id = 0;
		var startTime , tmp;
		var lastItem = null;
		var isDelay = false;
		var delayBlock = false;
		
		if(arguments.length == 0){
			stage.enterframeR(racing);
			$.$each(players,function($player){
				$player.x((bind.size*.1) - ($player.width()/2));
				$player.timerR(setSpeed); 
				$.$tweener.KILL($player);
			});
			bind.rollList.reSync(0);
			return;
		}

		_isComplete = false;
		bind.block = false;
		bind.isRunning = true;
		startTime = new Date();
		
		$.$each(players,function($player){
			$player.asset("rv",0);
			$player.x((bind.size*.1) - ($player.width()/2));
			$.$tweener.TO($player,.5,{x :bind.size * (Math.random()*.4+.1) , ease : $.$tweener.EASE.strongI , onComplete:function(){
				id++;
				if(id == players.length) moveBlock = false;
			}});
			setSpeed($player);
		});
		
		stage.enterframe(racing);
		
		function racing(){
			if(bind.block) return;
			
			if(lastItem!=null && lastItem.x() < 10 && players[$winnerId].x() > bind.size * .6 && !finalPause){
				bind.onBlock();
				bind.block = true;
				finalPause = true;
			}
			 
			speed =  lastItem && speed > -1 ? -1 : isEnd && 0 > speed ? speed-speed*.0005: speed <= -20 ?-20: speed-.3; 
			if(bind.rollList!=null && !_isComplete)bind.rollList.setLocation(speed*bind.ratio);
			
			if(!moveBlock){ 
				$.$each(players,function($player){
					$player.x($player.x()+(($player.asset('rv')*bind.ratio)));
				});
			}
			
			 var currentTime  = new Date();
			 tmp = ((currentTime.getTime() - startTime.getTime()) / 1000);
			 bind.onTime(tmp);
			 
			 if(bind.time-.41< tmp && bind.time-.3 > tmp) {
				 if(!isDelay){
					 isDelay = true;
					 bind.onDelay(5);
				 }
				 bind.ratio = bind.ratio-.07 <= .1 ? .1 : bind.ratio-.07; 
			 }
			 if(bind.time-1 <= tmp  && !isReady){
				 var i = 0;
				 var half = (bind.size/2);
				 var winner = players[$winnerId];
				 winner.asset('rv' , 0);
				 $.$each(players,function($player){
					 if(i != $winnerId){
						 if($player.x() > winner.x()){
							 $player.asset('rv', -1  * ($gradeIds[i] * .5));
						 }
						 else if($player.x() <= half){
							 $player.asset('rv', 1 * ($player.x() / half));
						 }else if($player.x() + $player.width() > half){
							 $player.asset('rv', (1 * (($player.x() + $player.width()) / bind.size))*-1);
						 }
					 }
					 
					 $player.timerR(setSpeed);
					 i++;
				});
				isReady = true;
			 }else if(bind.time-1 <= tmp && !isEnd){
				 isEnd = true;
			 }else if(isEnd && bind.time-.3 < tmp){
				if(!lastItem) {
					var cid = id = 0;
					var items =  bind.rollList.getItems();
					var item = items[0];
					$.$each(items , function($item){
						if(item.x() < 0 || $item.x() > 0 && $item.x() < item.x()) {
							item = $item;
							cid = id;
						}
						id ++;
					});
					
					lastItem = item;
					bind.onFinal(lastItem , items[cid == items.length-1 ? 0 : cid+1]);
				
					 var i = 0;
					 $.$each(players,function($player){
						$player.asset('rv', (1 / $gradeIds[i++])*5); 
					 });
				}
				
				var i = 0;
				var per = 1 - (1 * (players[$winnerId].x()/bind.size));
				$.$each(players,function($player){  
					
					if($player.x() < bind.size*.7 && $gradeIds[i] > 1 && $player.x() > players[$gradeIds.indexOf($gradeIds[i]-1)].x()){
						$player.asset('rv', $player.asset('rv')*.1);
					}else{
						if($player.asset('rv') < 2 ){
							$player.asset('rv' ,  2 );
						}else if($player.asset('rv') < 5 && $player.x() > bind.size*.3){
							$player.asset('rv' ,  $player.asset('rv')*1.2 );
						}else if($gradeIds[i] < 5 && $player.x() < players[$gradeIds.indexOf($gradeIds[i]+1)].x()){
							$player.asset('rv', $player.asset('rv')*1.02);
						}else{
							$player.asset('rv',$player.asset('rv')*1.002);  
						}
					}
						
					i++;
				});
				
				if(lastItem.x() < lastItem.width()*-.3){
					var isGoal = true;
					_isComplete = true;
					$.$each(players,function($player){
						if($player.x() < bind.size+30) isGoal = false; 
					});
					if(isGoal) {
						stage.enterframeR(racing);
						bind.onComplete();
					}
				}
			 }
		}
		
		function reset($player){
			var t =  Math.random()*400 + 100;
			$player.timer(t, 1 , setSpeed , $player);
		}
		
		function setSpeed($player){
			var rv = $player.x() < -50 ? Math.random()*.5+.5 : $player.x() > bind.size * .3 ?  Math.random()*-.5-.5 : Math.random()*1-.5;
			$player.asset('rv',rv);
			reset($player);
		}
	};
	
	__FACTORY = function($ARG){
		if($ARG.data === undefined || $ARG !== __arg) throw new Error('Running : ARG or ARG.data is undefined.');
		
		var run = __itemPool.length ? __itemPool.splice(-1)[0] : new __Crun; 
		for(var i in $ARG.data){
			run[i] = $ARG.data[i];
		}
			
		_initialize(run);
		__itemMap.push(run);
		__arg.data = {};
		++__id;
		return run;
	};
	
	__RELEASE = function($crun){
		var i;
		var len = __itemMap.length;
		for(i = 0 ; i < len ; ++i){
			if(__itemMap[i] == $crun){
				$crun.clear();
				__itemMap.splice(i, 1);
				__itemPool.push($crun);
				--__id;
				return;
			} 
		}
	};
	
	$.$member('rk.race.Running', {ARG : __ARG, FACTORY : __FACTORY , RELEASE : __RELEASE});
})(ncjs);

