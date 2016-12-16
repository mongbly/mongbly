(function($){
	var $TXT = RK_RESOURCES;
	var RESOURCES = $TXT.img;
	var ISFIRST = true;

	var _bw , _container , _block;
	var _running , _roll , _flowId = 0;
	var _countId , _isCounting , _countCover , _countImg , _players = [] , _seqs = [];

	var WINNER = 0;
	var GRADE_IDS = [1,2,3,4,5];
	var RUNNERS = [5,9,11,3,18];
	var SEQ_LEN = [9,11,13,10,11,11,11,10,12,11,11,10,9,8,12,10,11,15,8,12,9,7,11,11,10,12,9,9,10,10]
	var SEQ = [];

	function _initialize(){
		_run();
		_setSeqData();
		_setPlayers();
		$.$sprite.ADD($.$find(".countdown")).visible(false);

		if(ISFIRST) return;
		_setCountDown('reset');
	}

	function _setSeqData(){
		var j = 0;

		$.$each(RUNNERS , function($id){
			SEQ[j] = [];
			var len = $.$option().level == 3? SEQ_LEN[$id] : $.$option().level == 2 ? SEQ_LEN[$id]/2 : 3;
			for(var i = k = 0 ; i < len ; i++){
				k = i<10 ? "0"+i : i;
				SEQ[j].push(RESOURCES +"race/monster/"+$id+"/"+k+".png");
			}
			j++;
		});

	}

	function _run(){
		_container = $.$sprite.ADD($.$find(".raceView"));
		// $.$sprite.ADD($.$find(".btn_replay")).mouseClick(_setCountDown);
	}

	function _setCountDown($type){
		ISFIRST = false;
		_countId = 3;
		_block = false;

		if(!_countCover){
			_countCover =  $.$sprite.ADD($.$find(".countdown")).visible(true).style({"left": 0 , "top":0});
			_countImg = $.$sprite.ADD($.$find(".countdown img")).style("position","absolute");
			stage.enterframe(_sizeCheck);
		}

		if(_running){
			_flowId = 0;
			 _running.reset();
			 _playerReadyClose();
			 $.$each(_seqs , function($seq){
				$seq.stop(1);
			 });
		}

		_isCounting = true;
		_countImg.visible(false).scaleX(1).scaleY(1);

		if($type == 'reset'){
			_countImg.attr('src', RESOURCES +"race/countdown_3.png");
			return;
		}

		_countImg.timerR(counting).timer(1000,3,counting).attr('src', RESOURCES +"race/countdown_3.png");
		_playerReady(stage);
		_setCountPos();

		function counting(){
			var oriW = _countCover.width() , oriH = _countImg.height();
			if(_countId>0){
				_setCountShow(RESOURCES +"race/countdown_"+_countId+".png");
				_countId--;
			}else{
				_isCounting = false;
				_countImg.visible(false);
				_playerReadyClose();
				_setTrackInit();
			}
		}

		stage._sound('countdown');
		counting();
	}

	function _playerReady($target){
		$target.timerR(_playerMoving).timer(200 + (_countId*100), 1 , _playerMoving , $target);
	}

	function _playerMoving(){
		var id = Math.floor(Math.random()*_players.length);
		var target = _players[id];
		var tx = target.x();

		if(target == this){
			// console.log("SAME");
			_playerReady(this);
		}
		else if(target.asset("moving")){
			_playerReady(target);
		}else{
			target.asset("moving" , true);
			$.$tweener.TO(target , .1 , {x : tx+10 , onComplete : function(){
				$.$tweener.TO(target , .1 , {x : tx , onComplete :function(){
					target.asset("moving" , false);
					_playerReady(stage);
				}});
			}});
		}
	}

	function _playerReadyClose(){
		 stage.timerR(_playerMoving);
		 $.$each(_players, function($item){
			$item.timerR(_playerMoving);
			$.$tweener.KILL($item);
		 });
	}

	function _setPlayers(){
		if(_players.length > 0) return;

		var i = 0;
		var mv = 0;
		var level = $.$option().level;

		$.$each($.$find(_container,'.player'),function($item){
			$item = $.$sprite.ADD($item);
			$item.style({"width" : (45-mv) + "%"});
			$item.x((_container.width()*.1) - (($item.width()/2)-mv));

			var seq = $.$sequence.FACTORY($.$sequence.ARG.urls(SEQ[i++]).img($.$sprite.ADD($.$find($item , "img"))).speed(level == 3 ? .6 : level == 2 ? Math.random()*1+1: Math.random()*3+3));
			_players.push($item);
			_seqs.push(seq);
			seq.stop(1);
			mv+=3;
		});
	}

	function _playersRunning(){
		_running.start(WINNER , GRADE_IDS);
		 $.$each(_seqs , function($seq){
				$seq.play(true);
		 });
	}

	function _setCountPos(){
//		if(!_isCounting) return;
		_countCover.x((_container.width()/2) - (_countImg.width()/2)).y((_container.height()/2) - (_countImg.height()/2));
	}


	function _setTrackInit(){
		if(_running){
			_playersRunning();
		}else{
			_setTrack();
		}
	}

	function _setTrack(){
		var isEnd;
		var speed = 0;
		var track = $.$sprite.ADD($.$find(".track")).attr("innerHTML" , " ");
		var data = $.$provider.FACTORY($.$provider.ARG.map([RESOURCES +"race/run_0.jpg",RESOURCES +"race/run_1.jpg",RESOURCES +"race/run_2.jpg",RESOURCES +"race/run_3.jpg"]).loop());
		var isComplete = false;

		_bw = _container.width();
		_roll = $.$rolllist.FACTORY($.$rolllist.ARG.target(track).size(track.width()).item(function($index) {
    		var item =  $.$sprite.ADD('div').attr({className : 'item', innerHTML : '<img src="'+ RESOURCES +'race/run_0.jpg"/>'}).style({position:'absolute'});
            return item;
		}).turm(function($id) {
          return _container.width()-2;
        }).dataReset(function($item, $data) {
        	if(_block) return;
        	$item.attr({innerHTML : '<img src="'+(_flowId == 0 ? data.getData(0) : data.getData(1) )+'"/>'});
        	$.$sprite.ADD($.$find($item , "img")).width(_container.width());
        	_flowId ++;
        }).onComplete(function(){

        }));

		_roll.data(data);
		_setRunning(_roll);
		_playersRunning();
	}

	function _setRunning($track){
		var flowEnd;

	    // console.log("SET RUN")
		_running = $.$running.FACTORY($.$running.ARG.players(_players).time(5).rollList($track).size(_container.width())
				.onComplete(function(){
					$.$each(_seqs , function($seq){
		    			$seq.stop();
		    		});
				})
				.onFinal(function($a , $b){
					_block = true;
					$a.attr("innerHTML" ,'<img src="'+ RESOURCES +'race/run_2.jpg"/>');
					$b.attr("innerHTML" ,'<img src="'+ RESOURCES +'race/run_3.jpg"/>');
				})
				.onDelay(function($value){
					// console.log("ON DELAY");
					$.$each(_seqs , function($seq){
		    			$seq.setRatio($value);
		    			$seq.play(true);
		    		});
				})
				.onTime(function($time){

				})
				.onBlock(function(){
					_setCountShow(RESOURCES +"race/final.png");
		    		$.$each(_seqs , function($seq){
		    			$seq.stop();
		    		});
		    		stage.timer(1000,1,function(){
		    			$.$each(_seqs , function($seq){
		    				$seq.play(true);
		    			});
		    			_running.resume();
		    			_countImg.visible(false);
		    		});
					setTimeout(function(){
						stage.trigger('RK_RAC_REPLAY_FINISH');
					}, 1000);
				}));

		_running.start(WINNER , GRADE_IDS);
	}

	function _setCountShow($url){
		var sx = $url.indexOf("final") > -1 ? 1.4728 : 1;
		var oriW = _countCover.width() , oriH = _countImg.height();
		var imgW =  _countImg.width() * sx;
		_countImg.attr("src" , $url).visible(true).width(imgW);
		_setCountPos();

		_countImg.scaleX(3*sx).scaleY(3);
		_countImg.x(-(_countImg.width()-oriW)/2).y( - (_countImg.height()-oriH)/2);
		$.$tweener.TO(_countImg,.3,{x:0,y:0,scaleX:sx ,scaleY:1,ease:$.$tweener.EASE.backIO});
	}

	function _sizeCheck(){
		if(_bw!=_container.width()){
			_bw = _container.width();
			_setCountPos();
			if(_running!=null) _running.resize(_bw);
		}
	}

	// $.$init(_initialize);
	stage.addEvent('RK_RAC_VIEW_REPLAY', function($w,$data){
		var slot = [], rankingArray = [];

		// 소환수 랭킹 순서대로 배열 정리
		$.$each($data.raceResult, function($item){
			if($item.rank){
				rankingArray[$item.rank-1] = $item;
			}else{
				rankingArray.push($item);
			}
		});

		for(var i=0; i<5; i++){
			var pos = getRandom(5, i==0);
			GRADE_IDS[pos] = i+1;
			RUNNERS[pos] = rankingArray[i].monsterId-1;
		}

		_initialize();

		function getRandom($max,$reset){
			if($reset) slot = [];
			var output = parseInt(Math.random()*$max), diff = true;
			if(slot[output]) diff = false;
			else slot[output] = true;
			return diff ? output : getRandom($max, false);
		}
	});
	stage.addEvent('RK_RAC_RUNNING', _setCountDown);

	$.$init(function(){
		// preload image
		var urls = [RESOURCES +"race/run_0.jpg",RESOURCES +"race/run_1.jpg",RESOURCES +"race/run_2.jpg",RESOURCES +"race/run_3.jpg"];
		stage.PRELOAD = [];
		$.$each(urls, function($item){
			var img = document.createElement('img');
			img.setAttribute('src', $item);
			stage.PRELOAD.push(img);
		});
	});
})(ncjs);


// game =======================================================================================================================================================================================================================
(function($){
	var $TXT = RK_RESOURCES;
	var RESOURCES = $TXT.img;
	var LANG = $TXT.lang;
	var DATALINK = $TXT.data + 'race/';
	var ISMOTION = false;
	var ISEND = true;
	var ISATTENDED = false;

	// time area ==========================================================================================
	(function(){
		var __container, __timeArea, __clockArea, __gameTitle, __timer;
		var __strWaiting = '<div class="txt clock">00 : 00 : 00</div>\
				<img src="'+ RESOURCES + LANG +'race/info_timeArea_waiting.png" />',
			__strPlaying = '<div class="txt game">-</div>\
				<div class="txt remainTime">00 : 00 : 00</div>\
				<div class="txt guild">0</div>\
				<div class="txt all">0</div>\
				<img src="'+ RESOURCES + LANG +'race/info_timeArea_playing.png" />',
			__strReplay = '<div class="txt game">-</div>\
				<div class="txt time">2016.09.09-01:00:00<span class="timezone">(GMT+9)</span></div>\
				<div class="txt guild">0</div>\
				<div class="txt all">0</div>\
				<img src="'+ RESOURCES + LANG +'race/info_timeArea_replay.png" />',
			__titleWaiting = '<img src="'+ RESOURCES + LANG +'race/info_title_waiting.png" />',
			__titlePlaying = '<img src="'+ RESOURCES + LANG +'race/info_title_playing.png" />',
			__titleReplay = '<span class="text"></span><img src="'+ RESOURCES +'race/info_title_bg.png" />';

		function _getData(){
			stage._data({
				url: DATALINK + 'attend',
				complete: function(res){
					stage.raceAttend = res;
					_showPlaying(res);
				}
			});
		}
		function _getReplayData($id){
			stage.trigger('RK_LOADING');

			stage._data({
				url: DATALINK + 'schedule/' + $id,
				complete: function(sch){
					stage._data({
						url: DATALINK + 'attend/' + $id,
						complete: function(res){
							validateData(res);

							res.schedule = sch;
							_showReplay(res);
							stage.trigger('RK_LOADING_COMPLETE');
						}
					});

				}
			});

			function validateData($data){
				// 소환수 숫자가 제대로 안들어 왔을 때 validation
				var list = $data.raceResult; monsterPick = [];

				if($data.attendResult){
					monsterPick[$data.attendResult.monsterId-1] = true;
				}

				for(var i=0; i<5; i++){
					if(!list[i]){
						list[i] = {monsterId: getRandomMonster()+1};
					}else{
						monsterPick[list[i].monsterId-1] = true;
					}
				}

				function getRandomMonster(){
					var output = parseInt(Math.random()*30), diff = true;
					if(monsterPick[output]) diff = false;
					else monsterPick[output] = true;
					return diff ? output : getRandomMonster();
				}
			}

		}
		function _showWaiting(){
			clearTimeout(__timer);
			__timeArea.attr('innerHTML', __strWaiting).attr('className', 'timeArea');
			__clockArea = $.$sprite.ADD($.$find(__timeArea, '.clock'));

			if(ISEND || stage.MINIGAMEEND){
				__clockArea.attr('innerHTML', '00 : 00 : 00');
			}else{
				_clock( _getRemainSecond(stage.raceTime.nextPlayTime) );
			}

			__gameTitle.attr('innerHTML', __titleWaiting);

			stage.trigger('RK_RAC_STATUS_PAUSE');
		}
		function _showPlaying($data){
			clearTimeout(__timer);
			__timeArea.attr('innerHTML', __strPlaying).attr('className', 'timeArea');
			__clockArea = $.$sprite.ADD($.$find(__timeArea, '.remainTime'));

			if(typeof _isProfileSea != 'undefined' && _isProfileSea == 'true') $.$sprite.ADD($.$find(__timeArea, '.game')).attr('innerHTML', $TXT.race.unit + stage.raceTime.raceId);
			else $.$sprite.ADD($.$find(__timeArea, '.game')).attr('innerHTML', stage.raceTime.raceId + $TXT.race.unit);

			$.$sprite.ADD($.$find(__timeArea, '.guild')).attr('innerHTML', stage._thousand($data.guildTotalCount));
			$.$sprite.ADD($.$find(__timeArea, '.all')).attr('innerHTML', stage._thousand($data.userTotalCount));

			_clock( _getRemainSecond(stage.raceTime.endPlayTime) );

			__gameTitle.attr('innerHTML', __titlePlaying);

			stage.trigger('RK_RAC_STATUS_ING');
			stage.trigger('RK_RAC_VIEW_ING');
		}
		function _showReplay($data){
			clearTimeout(__timer);
			__timeArea.attr('innerHTML', __strReplay).attr('className', 'timeArea replay');
			__clockArea = $.$sprite.ADD($.$find(__timeArea, '.time'));

			var displayDate = getTimeString( $data.schedule.seasonStartDate );

			if(typeof _isProfileSea != 'undefined' && _isProfileSea.toString() == 'true'){
				displayDate += '<span class="timezone">(GMT+9)</span>';
			}
			__clockArea.attr('innerHTML', displayDate);

			if(typeof _isProfileSea != 'undefined' && _isProfileSea == 'true') $.$sprite.ADD($.$find(__timeArea, '.game')).attr('innerHTML', $TXT.race.unit + $data.schedule.id);
			else $.$sprite.ADD($.$find(__timeArea, '.game')).attr('innerHTML', $data.schedule.id + $TXT.race.unit);

			$.$sprite.ADD($.$find(__timeArea, '.guild')).attr('innerHTML', stage._thousand($data.guildTotalCount));
			$.$sprite.ADD($.$find(__timeArea, '.all')).attr('innerHTML', stage._thousand($data.userTotalCount));

			__gameTitle.attr('innerHTML', __titleReplay);
			if(typeof _isProfileSea != 'undefined' && _isProfileSea == 'true') $.$sprite.ADD($.$find(__gameTitle, '.text')).attr('innerHTML','Results of <span class="game">#' + $data.schedule.id + '</span>');
			else $.$sprite.ADD($.$find(__gameTitle, '.text')).attr('innerHTML', '<span class="game">'+ $data.schedule.id + $TXT.race.unit+ '</span> ' + $TXT.race.resultDetail.title);

			stage.trigger('RK_RAC_STATUS_REPLAY', $data);
			stage.trigger('RK_RAC_VIEW_REPLAY', $data);

			function getTimeString($str){
				var dt = new Date($str), output = '';
				output += dt.getYear() + 1900 + '.';
				output += _df(dt.getMonth() + 1) + '.';
				output += _df(dt.getDate()) + ' ';
				if(typeof _isProfileTw != 'undefined' && _isProfileTw.toString() == 'true'){
					output += _df(dt.getHours()-1) + ':';
				}else{
					output += _df(dt.getHours()) + ':';
				}
				output += _df(dt.getMinutes()) + ':';
				output += _df(dt.getSeconds());
				return output;
			}

		}
		function _clock($remain){
			var counter = 0, remain = $remain;

			(function tic(){
				clearTimeout(__timer);

				var h = parseInt(remain/3600),
					m = parseInt((remain-(h*3600))/60),
					s = remain%60;

				remain--;
				__clockArea.attr('innerHTML', _df(h) + ' : ' + _df(m) + ' : ' + _df(s));

				if( h<1 && m<1 && s<1 ){
					__timer = setTimeout(function(){ location.reload(); }, 1000);
				}else{
					__timer = setTimeout(tic, 1000);
				}
			})();
		}
		function _getRemainSecond($str){
			var current = new Date(userData.currentTime),
				end = new Date($str),
				diff = end - current;

			return parseInt(diff/1000);
		}
		function _df($str){
			return $str.toString().length > 1 ? $str : _df('0'+$str);
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.infoArea'));
			__timeArea = $.$sprite.ADD($.$find(__container, '.timeArea'));
			__gameTitle = $.$sprite.ADD($.$find(__container, '.gameTitle'));

			stage.addEvent('RK_RAC_PAUSE', _showWaiting);
			stage.addEvent('RK_RAC_ING', _getData);
			stage.addEvent('RK_RAC_REPLAY', function($w,$raceId){
				_getReplayData($raceId);
			});
		});
	})();


	// game view area : waiting ==========================================================================================
	var MonsterWaiting = function($index){
		this.defaultClass = 'player line' + ($index+1);
		this.dom = $.$sprite.ADD('div');
		this.image = $.$sprite.ADD('img').append(this.dom);
		this.dom.addEvent('click', function(){
			if(ISEND || stage.MINIGAMEEND) return;
			stage.trigger('RK_RAC_SELECT');
		});
	};
	MonsterWaiting.prototype = {
		setMonster: function($monsterIndex){
			this.image.attr('src', RESOURCES + 'collection/monster/' + $monsterIndex + '/show_large.png');
		},
		setMotion: function($num){
			var motionList = ['ani_jump','ani_tilt','ani_tilt','ani_zoom','ani_stretch'];
			this.dom.attr('className', this.defaultClass + ' ' + motionList[$num]);
		}
	};

	(function(){
		var __container, __playerList = [], __playerWrap, __btnAttend, __btnBefore;

		function _render(){
			$.$each(__playerList, function($item,$i){
				$item.setMonster( getRandom(30, $i==0) );
			});
			$.$each(__playerList, function($item,$i){
				$item.setMotion( getRandom(5, $i==0) );
			});
			var slot = [];
			function getRandom($max,$reset){
				if($reset) slot = [];
				var output = parseInt(Math.random()*$max), diff = true;
				if(slot[output]) diff = false;
				else slot[output] = true;
				return diff ? output : getRandom($max, false);
			}

			_open();
		}
		function _open(){__container.style({display:'block'});}
		function _close(){__container.style({display:'none'});}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.raceArea .waitingView'));
			__playerWrap = $.$sprite.ADD($.$find(__container, '.players'));

			for(var i=0; i<5; i++){
				var item = new MonsterWaiting(i);
				item.dom.append(__playerWrap);
				__playerList.push(item);
			}

			__btnAttend = $.$sprite.ADD($.$find(__container, '.btn_apply')).addEvent('click', function(){
				stage._clickAction(this, function(){
					// 이벤트 기간 종료
					if(stage.MINIGAMEEND){
						stage.trigger('RK_ALERT', {text: $TXT.common.alert.minigameEnd});
						return;
					}
					stage.trigger('RK_RAC_SELECT');
					BUFFLOG('btn_apply',stage.raceTime.raceId + '경기');
				});
			});
			__btnBefore = $.$sprite.ADD($.$find(__container, '.btn_show_result')).addEvent('click', function(){
				stage._clickAction(this, function(){
					// 이벤트 기간 종료
					if(stage.MINIGAMEEND){
						stage.trigger('RK_ALERT', {text: $TXT.common.alert.minigameEnd});
						return;
					}
					stage.trigger('RK_RAC_REPLAY', stage.raceTime.raceId - 1);
					BUFFLOG('btn_apply',(stage.raceTime.raceId - 1) + '경기');
				});
			});

			stage.addEvent('RK_RAC_STATUS_PAUSE', function(){
				__btnAttend.visible(false);
				__btnBefore.visible(false);
				_render();
			});
			stage.addEvent('RK_RAC_VIEW_ING', function(){
				__btnAttend.visible(true);
				__btnBefore.visible(true);

				if(typeof _isProfileSea != 'undefined' && _isProfileSea == 'true'){
					$.$sprite.ADD($.$find(__btnAttend, 'span')).attr('innerHTML', $TXT.race.unit + stage.raceTime.raceId);
					$.$sprite.ADD($.$find(__btnBefore, 'span')).attr('innerHTML', $TXT.race.unit + (stage.raceTime.raceId - 1));
				}else {
					$.$sprite.ADD($.$find(__btnAttend, 'span')).attr('innerHTML', stage.raceTime.raceId + $TXT.race.unit);
					$.$sprite.ADD($.$find(__btnBefore, 'span')).attr('innerHTML', (stage.raceTime.raceId - 1) + $TXT.race.unit);
				}

				_render();
			});
			stage.addEvent('RK_RAC_REPLAY', function($w,$raceId){
				_close();
			});
		});
	})();


	// game view area : replay ==========================================================================================
	(function(){
		var __container, __btnReplay, __btnGotoWaiting;

		function _open(){__container.style({display:'block'});}
		function _close(){__container.style({display:'none'});}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.raceArea .raceView')).style({display:'none'});

			__btnGotoWaiting = $.$sprite.ADD($.$find(__container, '.btn_goto_waiting')).addEvent('click', function(){
				stage._clickAction(this, function(){
					if(ISMOTION) return;
					stage.trigger('RK_RAC_ING');
				});
			});
			__btnReplay = $.$sprite.ADD($.$find(__container, '.btn_replay')).addEvent('click', function(){
				stage._clickAction(this, function(){
					if(ISMOTION) return;
					ISMOTION = true;
					stage.trigger('RK_RAC_RUNNING');

					__btnReplay.visible(false);
					__btnGotoWaiting.visible(false);
				});
			});

			stage.addEvent('RK_RAC_VIEW_REPLAY', _open);
			stage.addEvent('RK_RAC_ING', _close);
			stage.addEvent('RK_RAC_REPLAY_FINISH_COMPLETE', function(){
				__btnReplay.visible(true);
				__btnGotoWaiting.visible(true);
			});
		});
	})();


	// game view area : replay result layer ==========================================================================================
	(function(){
		var __container, __list, __image;

		function _render($list){
			var li = '';
			for(var i=0; i<5; i++){
				li += '<li>';
				if($list[i]){
					li += $TXT.collection.monsterInfo[$list[i].monsterId-1].monsterName;
				}else{
					li += '-';
				}
				li += '</li>';
			}

			__list.attr('innerHTML', li);
			__image.attr('src', RESOURCES + 'collection/monster/' + ($list[0].monsterId-1) + '/show_large.png');
		}
		function _open(){
			__container.style({display:'block'}).attr('className','layer ani_popup');
			setTimeout(function(){
				__container.attr('className','layer');
			}, 200);
		}
		function _close(){
			ISMOTION = false;
			__container.style({display:'none'});
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('#layer_replay_result'));
			__list = $.$sprite.ADD($.$find(__container, '.result'));
			__image = $.$sprite.ADD($.$find(__container, '.monsterView img'));

			$.$sprite.ADD($.$find(__container, '.btn_close')).addEvent('click', function(){
				stage._clickAction(this, function(){
					_close();
					stage.trigger('RK_RAC_REPLAY_FINISH_COMPLETE');
				});
			});

			stage.addEvent('RK_RAC_VIEW_REPLAY', function($w,$data){
				// 레이스 순위 배열 정리
				var rankingArray = [];
				$.$each($data.raceResult, function($item){
					if($item.rank){
						rankingArray[$item.rank-1] = $item;
					}else{
						rankingArray.push($item);
					}
				});
				_render(rankingArray);
			});
			stage.addEvent('RK_RAC_REPLAY_FINISH', _open);

		});
	})();


	// status area ==========================================================================================
	(function(){
		var __container,
			__flagSrc = [RESOURCES + LANG +'race/icon_fail.png', RESOURCES + LANG +'race/icon_complete.png'],
			__bg = $.$sprite.ADD('img').attr('className','bg'),
			__flag = $.$sprite.ADD('img').attr('className','icon').attr('src', RESOURCES + LANG +'race/icon_complete.png'),
			__btnView = $.$sprite.ADD('button').attr('className','btn_view').attr('innerHTML','<img src="'+ RESOURCES + LANG +'occupation/statusArea_btn_view.png" />'),
			__name = $.$sprite.ADD('div').attr('className','text monster_name'),
			__countInserGuild = $.$sprite.ADD('div').attr('className','text insert_guild'),
			__countDagger = $.$sprite.ADD('div').attr('className','text dagger'),
			__countPoint = $.$sprite.ADD('div').attr('className','text point'),
			__countRank = $.$sprite.ADD('div').attr('className','text rank'),
			__space = $.$sprite.ADD('div');

		function _reset(){
			__flag.append(__space);
			__name.append(__space);
			__countInserGuild.append(__space);
			__countDagger.append(__space);
			__countPoint.append(__space);
			__countRank.append(__space);
			__btnView.append(__space);
		}
		function _showWaiting(){
			_reset();
			__bg.attr('src', RESOURCES + LANG +'race/status_waiting.png');
			__btnView.append(__container);
		}
		function _showPlaying(){
			var name = stage.raceAttend.attendResult > 0 ? $TXT.collection.monsterInfo[stage.raceAttend.attendResult-1].monsterName : '-';

			_reset();
			__bg.attr('src', RESOURCES + LANG +'race/status_playing.png');
			if(stage.raceAttend.attendResult > 0) __flag.append(__container).attr('src', __flagSrc[1]);
			__name.append(__container).attr('innerHTML', '<div class="valign"><div class="middle">'+name+'</div></div>');
			__countInserGuild.append(__container).attr('innerHTML', '<div class="valign"><div class="middle">'+stage.raceAttend.myGuildUserTotalCount+'</div></div>');
			__btnView.append(__container);
		}
		function _showReplay($data){
			var name = '-', guildRnak = 0, guildScore = 0;

			_reset();
			__bg.attr('src', RESOURCES + LANG +'race/status_replay.png');

			if($data.attendResult){
				// 레이스 참가 시
				name = $TXT.collection.monsterInfo[$data.attendResult.monsterId-1].monsterName;
				__flag.append(__container).attr('src', __flagSrc[ $data.attendResult.rank > 0 ? 1 : 0 ]);

				if($data.guildRankAndScore){
					guildRnak = $data.guildRankAndScore.rank;
					guildScore = $data.guildRankAndScore.score;
				}
			}
			__name.append(__container).attr('innerHTML', '<div class="valign"><div class="middle">'+name+'</div></div>');
			__countDagger.append(__container).attr('innerHTML', '<div class="valign"><div class="middle">'+$data.point.total+'</div></div>');
			__countPoint.append(__container).attr('innerHTML', '<div class="valign"><div class="middle">'+guildScore+'</div></div>');
			__countRank.append(__container).attr('innerHTML', '<div class="valign"><div class="middle">'+guildRnak+'</div></div>');
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.statusArea .statusAreaContent'));
			__bg.append(__container);

			__btnView.addEvent('click', function(){
				stage._clickAction(this, function(){
					stage.trigger('RK_RAC_RECORD');
					BUFFLOG('btn_record');
				});
			});

			stage.addEvent('RK_RAC_STATUS_PAUSE', _showWaiting);
			stage.addEvent('RK_RAC_STATUS_ING', _showPlaying);
			stage.addEvent('RK_RAC_STATUS_REPLAY', function($w,$data){
				_showReplay($data);
			});
		});
	})();


	// monster select layer ==========================================================================================
	var Monster = function($index){
		var self = this;
		self.index = $index;
		self.guildCount = 0;
		self.dom = $.$sprite.ADD('div').attr('className','monster');
		self.dom.attr('innerHTML','<img src="'+ RESOURCES +'collection/smn_icon_size.png">\
			<img class="icon cover" src="'+ RESOURCES +'collection/smn_icon_cover_on.png" />\
			<img class="icon counter" src="'+ RESOURCES +'collection/smn_icon_counter.png" />');

		self.image = $.$sprite.ADD('img').attr('className','icon image').attr('src', RESOURCES +'collection/smn_icon_disable.png');
		self.image.append(self.dom);

		self.selector = $.$sprite.ADD('span').attr('innerHTML', '<img class="icon border ani_select" src="'+ RESOURCES +'collection/smn_icon_border.png" /><img class="icon check" src="'+ RESOURCES +'collection/smn_icon_check.png" />');
		self.selector.append(self.dom).style({display:'none'});

		self.counter = $.$sprite.ADD('span').attr('className','guildCounter').append(self.dom);

		self.dom.addEvent('click', function(){
			stage._clickAction(this, function(){
				if(!self.isActive){
					stage.trigger('RK_ALERT', {text: $TXT.race.selection.disable});
					return;
				}
				stage.trigger('RK_RAC_SELECT_DETAIL', self.index);
			});
		});

		self.reset();
	};
	Monster.prototype = {
		select: function(){
			if(this.isSelect) return;
			this.isSelect = true;
			this.selector.style({display:'block'});
		},
		active: function(){
			if(this.isActive) return;
			this.isActive = true;
			this.image.attr('src', RESOURCES +'collection/monster/'+ this.index +'/list_monster_on.png');
		},
		setCounter: function($num){
			this.counter.attr('innerHTML', $num);
		},
		reset: function(){
			this.isSelect = false;
			this.isActive = false;
			this.selector.style({display:'none'});
			this.setCounter(0);
		},
		appendTo: function($target){
			this.dom.append($target);
		}
	};

	(function(){
		var __container, __monsterList = [];

		function _getData(){
			stage._data({
				url: DATALINK + 'monsters',
				complete: function(res){
					_render(res);
				}
			});
		}
		function _render($data){
			$.$each($data.guildMonsterList, function($item,$i){
				var target = __monsterList[$i];
				target.reset();
				target.setCounter($item.monsterCount);
				if($item.rewarded) target.active();
				if($item.reserved){
					ISATTENDED = true;
					target.select();
				}
			});

			__container.style({display:'block'});
		}
		function _close(){
			__container.style({display:'none'});
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('#layer_selection'));
			var listWrap = $.$sprite.ADD($.$find(__container, '.monster_list'));

			for(var i=0; i<30; i++){
				var mon = new Monster(i);
				mon.appendTo(listWrap);
				__monsterList.push(mon);
			}
			stage.monsterList = __monsterList;

			$.$sprite.ADD($.$find(__container, '.btn_close')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});
			$.$sprite.ADD($.$find(__container, '.btn_save')).addEvent('click', function(){
				stage._clickAction(this, _attend);
			});


			stage.addEvent('RK_RAC_SELECT', _getData);
		});
	})();


	// monster select detail layer ==========================================================================================
	(function(){
		var __container, __hasMonster, __monsterIndex, __monsterName, __monsterStatus, __monsterImage, __monsterComment, __infoAttend, __infoTop, __infoMember,
			__btnPrev, __btnNext, __btnSave;

		function _getData($index){
			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + 'monsters/' + ($index+1),
				complete: function(res){
					__monsterIndex = $index
					_render(res);
					stage.trigger('RK_LOADING_COMPLETE');
				}
			});
		}
		function _render($data){
			__hasMonster = $data.hasMonster;
			if(__hasMonster){
				__monsterName.attr('innerHTML', $TXT.collection.monsterInfo[__monsterIndex].monsterName);
				__monsterStatus.attr('innerHTML', $TXT.race.selection.hasMonster[1]).attr('className','status');
				__monsterImage.attr('src', RESOURCES + 'collection/monster/' + __monsterIndex + '/show_large.png');

				var randomID = 1+(stage.raceTime.raceId+__monsterIndex)%3;
				if(randomID==1) var c = $TXT.collection.monsterInfo[__monsterIndex].condition01;
				else if(randomID==2) var c = $TXT.collection.monsterInfo[__monsterIndex].condition02;
				else if(randomID==3) var c = $TXT.collection.monsterInfo[__monsterIndex].condition03;
				__monsterComment.visible(true).attr('innerHTML', c);
				__btnSave.style({display:'inline-block'});
				if(ISATTENDED) __btnSave.style({display:'none'});
			}else{
				__monsterName.attr('innerHTML', '-');
				__monsterStatus.attr('innerHTML', $TXT.race.selection.hasMonster[0]).attr('className','status none');
				__monsterImage.attr('src', RESOURCES + 'collection/show_large_disable.png');
				__monsterComment.visible(false);
				__btnSave.style({display:'none'});
			}

			__infoAttend.attr('innerHTML', $data.attendCount);
			__infoTop.attr('innerHTML', $data.top1Count);
			__infoMember.attr('innerHTML', $data.guildMemberCount);

			__container.style({display:'block'});
		}
		function _prev(){
			_getData( getPrev(__monsterIndex) );

			function getPrev($current){
				var prev = $current > 0 ? $current-1 : 29;
				return stage.monsterList[prev].isActive ? prev : getPrev(prev);
			}
		}
		function _next(){
			_getData( getNext(__monsterIndex) );

			function getNext($current){
				var next = $current < 29 ? $current+1 : 0;
				return stage.monsterList[next].isActive ? next : getNext(next);
			}
		}
		function _close(){
			__container.style({display:'none'});
		}
		function _attend(){
			if(!__hasMonster){
				stage.trigger('RK_ALERT', {
					text: 'x'
				});
				return;
			}
			stage.trigger('RK_RAC_SELECT_RESULT', __monsterIndex);
			BUFFLOG('apply','monster_'+__monsterIndex,stage.raceTime.raceId+'경기');
			_close();
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('#layer_selection_detail'));
			__monsterName = $.$sprite.ADD($.$find(__container, '.title'));
			__monsterStatus = $.$sprite.ADD($.$find(__container, '.status'));
			__monsterImage = $.$sprite.ADD($.$find(__container, '.monster_view .image'));
			__monsterComment = $.$sprite.ADD($.$find(__container, '.monster_view .comment .valign .middle'));
			__infoAttend = $.$sprite.ADD($.$find(__container, '.history .attendCount'));
			__infoTop = $.$sprite.ADD($.$find(__container, '.history .top1Count'));
			__infoMember = $.$sprite.ADD($.$find(__container, '.history .guildMemberCount'));

			__btnPrev = $.$sprite.ADD($.$find(__container, '.btn_prev')).addEvent('click', function(){
				stage._clickAction(this, _prev);
			});
			__btnNext = $.$sprite.ADD($.$find(__container, '.btn_next')).addEvent('click', function(){
				stage._clickAction(this, _next);
			});
			__btnSave = $.$sprite.ADD($.$find(__container, '.btn_save')).addEvent('click', function(){
				stage._clickAction(this, _attend);
			});
			$.$sprite.ADD($.$find(__container, '.btn_close')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});

			stage.addEvent('RK_RAC_SELECT_DETAIL', function($w,$index){
				_getData($index);
			});
		});
	})();


	// monster select result layer ==========================================================================================
	(function(){
		var __container, __monsterIndex, __monsterRank, __monsterName, __monsterImage, __monsterComment, __infoDagger, __infoMember;

		function _getData($index){
			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + 'attend',
				method: 'post',
				parameters: {
					monsterId: $index+1
				},
				complete: function(res){
					__monsterIndex = $index;
					__monsterRank = res.rank;
					_render(res);
					stage.trigger('RK_LOADING_COMPLETE');
				}
			});
		}
		function _render($data){
			__monsterName.attr('innerHTML', $TXT.collection.monsterInfo[__monsterIndex].monsterName);
			__monsterImage.attr('src', RESOURCES + 'collection/monster/' + __monsterIndex + '/show_large.png');
			__infoDagger.attr('innerHTML', $data.point);
			__infoMember.attr('innerHTML', $data.rank);
			__monsterComment.attr('innerHTML', $TXT.race.selection.completeMsg);

			__container.style({display:'block'});
			stage._sound('popup');
		}

		function _shareSns(){
			var randomID = 1+(stage.raceTime.raceId+__monsterIndex)%3;
			if(randomID==1) var monsterMessage = $TXT.collection.monsterInfo[__monsterIndex].message01;
			else if(randomID==2) var monsterMessage = $TXT.collection.monsterInfo[__monsterIndex].message02;
			else if(randomID==3) var monsterMessage = $TXT.collection.monsterInfo[__monsterIndex].message03;
			var monsterName = $TXT.collection.monsterInfo[__monsterIndex].monsterName;

			var tit, msg, dec, last, img;

			tit = $TXT.race.help.shareSnsTit.replace(/{{{monsterName}}}/g,monsterName);
			msg = monsterName +  ' : ' + monsterMessage.replace(/<br>/g, '');
			dec = $TXT.race.help.shareSnsDec.replace(/<br>/g, '').replace(/{{{monsterName}}}/g,monsterName);
			last = $TXT.race.help.shareSnsLast;
			img = RESOURCES + 'collection/monster/' + __monsterIndex +'/share_image.jpg';
			stage.trigger('RK_SHARE_SNS', {$tit:tit, $msg:msg, $dec:dec, $last:last, $img:img});
			BUFFLOG('btn_sns_share','monster_'+__monsterIndex,stage.raceTime.raceId+'경기');
		}
		function _shareGuild(){
			var monsterName = $TXT.collection.monsterInfo[__monsterIndex].monsterName;
			var randomID = 1+(stage.raceTime.raceId+__monsterIndex)%3;

			var tit, monster, dec;
			tit = $TXT.race.help.shareGuildTit.replace(/{{{monsterName}}}/g,monsterName);

			if(randomID==1) monster = $TXT.collection.monsterInfo[__monsterIndex].message01;
			else if(randomID==2) monster = $TXT.collection.monsterInfo[__monsterIndex].message02;
			else if(randomID==3) monster = $TXT.collection.monsterInfo[__monsterIndex].message03;

			dec = $TXT.race.help.shareGuildDec.replace(/{{{monsterName}}}/g,monsterName);
			stage.trigger('RK_SHARE_GUILD', {$tit:tit, $monster:monster, $dec:dec});
			BUFFLOG('btn_guild_share','monster_'+__monsterIndex,stage.raceTime.raceId+'경기');
		}
		function _close(){
			__container.style({display:'none'});
			stage.trigger('RK_RAC_ING');
			stage.trigger('RK_RAC_SELECT');
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('#layer_selection_result'));
			__monsterName = $.$sprite.ADD($.$find(__container, '.title'));
			__monsterImage = $.$sprite.ADD($.$find(__container, '.monster_view .image'));
			__monsterComment = $.$sprite.ADD($.$find(__container, '.monster_view .comment .valign .middle'));
			__infoDagger = $.$sprite.ADD($.$find(__container, '.reward .dagger'));
			__infoMember = $.$sprite.ADD($.$find(__container, '.reward .guildMember'));

			$.$sprite.ADD($.$find(__container, '.status')).attr('innerHTML', $TXT.race.selection.complete);

			__btnPrev = $.$sprite.ADD($.$find(__container, '.btnArea .sns')).addEvent('click', function(){
				stage._clickAction(this, _shareSns);
			});
			__btnNext = $.$sprite.ADD($.$find(__container, '.btnArea .guild')).addEvent('click', function(){
				stage._clickAction(this, _shareGuild);
			});
			__btnSave = $.$sprite.ADD($.$find(__container, '.btnArea .confirm')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});

			stage.addEvent('RK_RAC_SELECT_RESULT', function($w,$index){
				_getData($index);
			});
		});
	})();


	// 기록 보기 레이어 ==========================================================================================
	(function(){
		var __layer, __listWrap, __detail, __currentPage, __btnPrev, __btnNext;

		function _getData($pageNum){
			__currentPage = typeof $pageNum == 'number'? $pageNum : 0;
			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + 'history',
				parameters: {
					page: __currentPage
				},
				complete: function(res){
					_render(res);
					stage.trigger('RK_LOADING_COMPLETE');
				}
			});
		}
		function _getDetail($raceId){
			stage.trigger('RK_LOADING');

			$raceId = $raceId || 0;
			stage._data({
				url: DATALINK + 'schedule/' + $raceId,
				complete: function(sch){
					stage._data({
						url: DATALINK + 'attend/' + $raceId,
						complete: function(res){
							validateData(res);

							res.schedule = sch;
							_renderDetail(res);
							stage.trigger('RK_LOADING_COMPLETE');
						}
					});

				}
			});

			function validateData($data){
				// 소환수 숫자가 제대로 안들어 왔을 때 validation
				var list = $data.raceResult; monsterPick = [];

				if($data.attendResult){
					monsterPick[$data.attendResult.monsterId-1] = true;
				}

				for(var i=0; i<5; i++){
					if(!list[i]){
						list[i] = {monsterId: getRandomMonster()+1};
					}else{
						monsterPick[list[i].monsterId-1] = true;
					}
				}

				function getRandomMonster(){
					var output = parseInt(Math.random()*30), diff = true;
					if(monsterPick[output]) diff = false;
					else monsterPick[output] = true;
					return diff ? output : getRandomMonster();
				}
			}
		}
		function _render($data){
			__listWrap.attr('innerHTML', '');

			$.$each($data.pageList, function($item){
				var li = $.$sprite.ADD('li').append(__listWrap), html = '',
					monsterName = $item.monsterId > 0 ? $TXT.collection.monsterInfo[$item.monsterId-1].monsterName : '-',
					rank = $item.rank == 0 ? '-' : $item.rank;

				html = '<span class="order">'+ $item.id +'</span>';
				html += '<span class="apply"><div class="valign"><div class="middle">'+  monsterName +'</div></div></span>';
				html += '<span class="rank">'+ rank +'</span>';
				html += '<span class="score">'+ $item.score +'</span>';
				html += '<span class="dagger">'+ ($item.point==0?$item.point:'+'+$item.point) +'</span>';


				li.raceId = $item.id;
				li.attr('innerHTML', html).addEvent('click', function(){
					_getDetail( this.raceId );
				});
			});

			$.$sprite.ADD($.$find(__layer, '.paging .count')).attr('innerHTML', (__currentPage+1)+'/'+ $data.pageCount );

			__btnPrev.isDisable = false;
			__btnNext.isDisable = false;
			$.$sprite.ADD($.$find(__btnPrev, 'img')).attr('src', RESOURCES + LANG + '/occupation/layer/btn_prev.png');
			$.$sprite.ADD($.$find(__btnNext, 'img')).attr('src', RESOURCES + LANG + '/occupation/layer/btn_next.png');
			if($data.isFirstPage){
				__btnPrev.isDisable = true;
				$.$sprite.ADD($.$find(__btnPrev, 'img')).attr('src', RESOURCES + LANG + '/occupation/layer/btn_prev_disabled.png');
			}
			if($data.isLastPage){
				__btnNext.isDisable = true;
				$.$sprite.ADD($.$find(__btnNext, 'img')).attr('src', RESOURCES + LANG + '/occupation/layer/btn_next_disabled.png');
			}

			_open();
		}
		function _open(){
			__layer.style({display:'block'});
		}
		function _close(){
			__layer.style({display:'none'});
		}
		function _prev(){
			if(this.isDisable) return;
			_getData(__currentPage-1);
		}
		function _next(){
			if(this.isDisable) return;
			_getData(__currentPage+1);
		}

		function _renderDetail($data){
			var gameTime = $data.schedule.seasonStartDate, rankingArray = [];

			// 랭킹 순서대로 배열 정리
			$.$each($data.raceResult, function($item){
				if($item.rank){
					rankingArray[$item.rank-1] = $item;
				}else{
					rankingArray.push($item);
				}
			});

			function viewGameTime($time){
				var timeY = $time.substring(0, 4),
					timeM = $time.substring(5, 7),
					timeD = $time.substring(8, 10),
					time1 = $time.substring(11, 13),
					time2 = $time.substring(14, 16);

				return timeY+'/'+timeM+'/'+timeD+' '+time1+':'+time2;
			}


			var str =   '<img src="'+ RESOURCES + LANG +'/race/layer/record_detail_bg.png" />';
			// 경기 정보
			if(typeof _isProfileSea != 'undefined' && _isProfileSea == 'true') str += '<div class="title"><span class="game">' + $TXT.race.unit + $data.schedule.id + '</span>' + $TXT.race.resultDetail.title + '</div>';
			else str += '<div class="title"><span class="game">' + $data.schedule.id + ' ' + $TXT.race.unit + '</span> ' + $TXT.race.resultDetail.title + '</div>';
			str += '<div class="gameTime">' + $TXT.race.resultDetail.time + ' : ' + viewGameTime(gameTime) + '</div>';
			// 참여 정보
			str +=	'<div class="summary">';
			if($data.attendResult){
				if($data.attendResult.rank > 0){
					// 참여 정보 : 참여해서 레이스 출전
					str += $TXT.race.resultDetail.attendA.replace(/{{{monsterName}}}/g, $TXT.collection.monsterInfo[$data.attendResult.monsterId-1].monsterName).replace(/{{{monsterRank}}}/g, $data.attendResult.rank);
				}else{
					// 참여 정보 : 참여했지만 레이스 출전 못함
					str += $TXT.race.resultDetail.attendB.replace(/{{{monsterName}}}/g, $TXT.collection.monsterInfo[$data.attendResult.monsterId-1].monsterName);
				}
			}else{
				// 참여 정보 : 미참여
				str += $TXT.race.resultDetail.attendC;
			}
			str +=	'</div>';
			// 보상 정보
			str +=	'<div class="reward">';
			if($data.guildRankAndScore){
				// 보상 정보 : 레이스 참여

				str +=		'<span class="dagger">' + ($data.point.total==0?$data.point.total:'+'+$data.point.total) + '</span>';
				str +=		'<span class="point">'+ $data.guildRankAndScore.score +'</span>';
				str += 		'<span class="guildInfo"><div class="valign"><div class="middle"><span class="guildName">' + stage.user.user.guild.guildName + '</span><span class="guildRank">'+$data.guildRankAndScore.rank+'</span></div></div></span>';
			}else{
				// 보상 정보 : 레이스 미참여
				str +=		'<span class="dagger">' + ($data.point.total==0?$data.point.total:'+'+$data.point.total) + '</span>';
				str +=		'<span class="point">0</span>';
				str += 		'<span class="guildInfo"><div class="valign"><div class="middle"><span class="guildName">' + stage.user.user.guild.guildName + '</span><span class="guildRank">-</span></div></div></span>';
			}
			str +=	'</div>';
			// 단검 정보
			str +=	'<div class="daggerScore">';
			str +=		'<span>' + ($data.point.normal==0?$data.point.normal:'+'+$data.point.normal) + '</span>';
			str +=		'<span>' + ($data.point.extra==0?$data.point.extra:'+'+$data.point.extra) + '</span>';
			str +=		'<span>' + ($data.point.rank==0?$data.point.rank:'+'+$data.point.rank) + '</span>';
			str +=		'<span class="sum">' + ($data.point.total==0?$data.point.total:'+'+$data.point.total) + '</span>';
			str +=	'</div>';
			// 레이스 결과 목록
			str +=	'<ul class="result">';
			str +=		'<li>' + $TXT.collection.monsterInfo[rankingArray[0].monsterId-1].monsterName + '</li>';
			str +=		'<li>' + $TXT.collection.monsterInfo[rankingArray[1].monsterId-1].monsterName + '</li>';
			str +=		'<li>' + $TXT.collection.monsterInfo[rankingArray[2].monsterId-1].monsterName + '</li>';
			str +=		'<li>' + $TXT.collection.monsterInfo[rankingArray[3].monsterId-1].monsterName + '</li>';
			str +=		'<li>' + $TXT.collection.monsterInfo[rankingArray[4].monsterId-1].monsterName + '</li>';
			str +=	'</ul>';
			str +=	'<div class="monsterView"><img src="'+ RESOURCES +'/collection/monster/' + (rankingArray[0].monsterId-1) + '/show_large.png" /></div>';

			$.$sprite.ADD($.$find('.detail_pop .data_area')).attr('innerHTML', str);
			_openDetail();
		}
		function _openDetail(){
			__detail.style({display:'block'});
		}
		function _closeDetail(){
			__detail.style({display:'none'});
		}

		$.$init(function(){
			__layer = $.$sprite.ADD($.$find('#layer_record'));
			__listWrap = $.$sprite.ADD($.$find(__layer, '.record_list'));
			__detail = $.$sprite.ADD($.$find(__layer, '.detail_pop'));

			__btnPrev = $.$sprite.ADD($.$find(__layer, '.btn_prev')).addEvent('click', function(){
				stage._clickAction(this, _prev);
			});
			__btnNext = $.$sprite.ADD($.$find(__layer, '.btn_next')).addEvent('click', function(){
				stage._clickAction(this, _next);
			});

			$.$sprite.ADD($.$find(__layer, '.btn_close')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});
			$.$sprite.ADD($.$find(__layer, '.btn_detail_close')).addEvent('click', function(){
				stage._clickAction(this, _closeDetail);
			});

			stage.addEvent('RK_RAC_RECORD', _getData);
		});
	})();


	// game setting ==========================================================================================
	(function(){
		function _getData(){
			stage._data({
				url: DATALINK + 'schedule',
				complete: function(res){
					ISEND = res.end;
					stage.raceTime = res;
					if(ISEND){
						_setPause(res.nextPlayTime);
					}else{
						_setStart();
					}
				}
			});

		}
		function _setStart($time){
			stage.trigger('RK_RAC_ING');
		}
		function _setPause($refTime){
			stage.trigger('RK_RAC_PAUSE');
		}
		function _joinGuild(){
			stage.trigger('RK_ALERT_GUILD');
		}

		stage.addEvent('RK_USER_COMPLETE', function(){
			if(stage.hasGuild){
				_getData();
			}else{
				_joinGuild();
			}
		});
	})();
})(ncjs);
