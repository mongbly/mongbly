(function($){
	var $TXT = RK_RESOURCES;
	var RESOURCES = $TXT.img;
	var LANG = $TXT.lang;
	var DATALINK = $TXT.data + 'occupation/';
	var ISMOTION = false;
	var ISEND = true;
	var ISCHECKING = false;


	// 데이터 컨트롤러 ==========================================================================================
	var LANDLEVEL = [
		[0,1,0,1,0,0,2,0,0,0],
		[1,0,0,0,1,0,0,0,2,0],
		[0,1,0,0,2,0,1,0,0,0],
		[0,2,0,0,0,0,0,0,1,1],
		[0,0,2,0,0,1,0,0,1,0],
		[2,0,1,0,0,0,0,1,0,0],
		[1,0,0,1,0,0,0,2,0,0]
	];

	// 시계 ==========================================================================================
	(function(){
		var __container,
			__strPlaying = '<img src="'+ RESOURCES + LANG + 'occupation/time_bg_playing.png" />\
				<div class="text time">00 : 00 : 00</div>\
				<div class="text guild">0</div>\
				<div class="text monster">0</div>',
			__strChecking = '<img src="'+ RESOURCES + LANG +'occupation/time_bg_checking.png" />\
				<div class="text remaintime">00 : 00 : 00</div>\
				<div class="text guild">0</div>\
				<div class="text monster">0</div>',
			__strWaiting = '<img src="'+ RESOURCES + LANG +'occupation/time_bg_waiting.png" />\
				<div class="text next">2016 - 12 - 08</div>',
			__clockArea, __timer;

		function _getData(){
			stage._data({
				url: DATALINK + 'total',
				complete: function(res){
					if(ISCHECKING){
						_setChecking();
					}else{
						_setPlaying();
					}
					$.$sprite.ADD($.$find(__container, '.guild')).attr('innerHTML', stage._thousand( res.totalGuildCount ));
					$.$sprite.ADD($.$find(__container, '.monster')).attr('innerHTML', stage._thousand( res.totalMonsterCount ));
				}
			});
		}
		function _setWaiting(){
			__container.attr('innerHTML', __strWaiting);
			if(ISEND || stage.MINIGAMEEND){
				$.$sprite.ADD($.$find(__container, '.text')).attr('innerHTML', '2016 - 12 - 08');
				return;
			}

			var d = new Date(userData.currentTime), zoneStr = '',
				timeString = stage.occupationTime.nextPlayTime || '2016-'+ _df(d.getMonth()+1) +'-'+ _df(d.getDate()) +'T09:00:00+09:00';
			if(typeof _isProfileSea != 'undefined' && _isProfileSea.toString() == 'true'){
				zoneStr = ' <span class="timezone">(GMT+9)</span>';
			}

			$.$sprite.ADD($.$find(__container, '.text')).attr('innerHTML', getTimeString(timeString) + zoneStr);
			
			function getTimeString($str){
				var dt = new Date($str), output = '';
				output += dt.getYear() + 1900 + ' - ';
				output += _df(dt.getMonth() + 1) + ' - ';
				output += _df(dt.getDate()) + ' ';
				if(typeof _isProfileTw != 'undefined' && _isProfileTw.toString() == 'true'){
					output += _df(dt.getHours()-1) + ' : ';
				}else{
					output += _df(dt.getHours()) + ' : ';
				}
				output += _df(dt.getMinutes()) + ' : ';
				output += _df(dt.getSeconds());
				return output;
			}
		}
		function _setChecking(){
			__container.attr('innerHTML', __strChecking);
			__clockArea = $.$sprite.ADD($.$find(__container, '.remaintime'));

			if(ISEND || stage.MINIGAMEEND){
				_setWaiting();
				return;
			}
			_clock( getRemainSecondToMidnight() );

			function getRemainSecondToMidnight(){
				var d = new Date(userData.currentTime),
					sec = (23-d.getHours())*3600;
				sec += (60-d.getMinutes())*60;
				sec += (60-d.getSeconds());
				return sec;
			}
		}
		function _setPlaying(){
			__container.attr('innerHTML', __strPlaying);
			__clockArea = $.$sprite.ADD($.$find(__container, '.time'));

			if(ISEND || stage.MINIGAMEEND){
				_setWaiting();
				return;
			}
			_clock( getRemainSecond(stage.occupationTime.endPlayTime) );

			function getRemainSecond($str){
				var current = new Date(userData.currentTime),
					end = new Date($str),
					diff = end - current;

				return parseInt(diff/1000);
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
		function _df($str){
			return $str.toString().length > 1 ? $str : _df('0'+$str);
		}

		
		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.container .timeArea'));

			if(ISEND || stage.MINIGAMEEND){
				_setWaiting();
				return;
			}

			stage.addEvent('RK_OCC_ING', _getData);
			stage.addEvent('RK_OCC_CLOCK_UPDATE', _getData);
			stage.addEvent('RK_OCC_PAUSE', function(){
				if(ISCHECKING){
					_getData();
				}else{
					_setWaiting();
				}
			});
		});
	})();
	

	// 가이드 텍스트 ==========================================================================================
	(function(){
		var __container, __img,
			__srcPlaying = [RESOURCES +  LANG + 'occupation/mission_playing_land.png', RESOURCES +  LANG + 'occupation/mission_playing_map.png'],
			__srcChecking = RESOURCES + LANG + 'occupation/mission_checking.png',
			__srcWaiting = RESOURCES + LANG + 'occupation/mission_waiting.png';

		function _change(){
			__container.attr('className', 'missionText ani_mission');
			setTimeout(function(){
				__container.attr('className', 'missionText');
			}, 300);
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.missionText'));
			__img = $.$sprite.ADD($.$find(__container, 'img'));

			if(ISEND || stage.MINIGAMEEND){
				__img.visible(false);
				return;
			}

			stage.addEvent('RK_OCC_LAND', function(){
				__img.attr('src', __srcPlaying[0]);
				_change();
			});
			stage.addEvent('RK_OCC_MAP_LOAD', function(){
				__img.attr('src', __srcPlaying[1]);
				_change();
			});
			stage.addEvent('RK_OCC_PAUSE', function(){
				__img.attr('src', ISCHECKING ? __srcChecking : __srcWaiting );
			});
		});
	})();


	// 영지목록 ==========================================================================================
	(function(){
		var __container, __landList = [];

		function _getData(){
			if(ISEND || stage.MINIGAMEEND) return;
			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + 'region/guild',
				complete: function(res){
					_setData(res);
					stage.trigger('RK_LOADING_COMPLETE');
				}
			});
		}
		function _setData($arr){
			$.$each($arr, function($land, $i){
				var target = __landList[$i];
				$.$sprite.ADD($.$find(target, '.count')).attr('innerHTML', $land.count);
				if($land.count > 0 && !target.checked){
					_check($i);
					target.checked = true;
				}
			});
			_show();
		}
		function _show(){
			ISMOTION = true;
			__container.style({display:'block'}).attr('className','landList ani_contract');
			setTimeout(function(){
				__container.attr('className','landList');
				ISMOTION = false;
			}, 500);
		}
		function _hide(){
			ISMOTION = true;
			__container.attr('className','landList ani_expand');
			setTimeout(function(){
				ISMOTION = false;
				__container.attr('className','landList').style({display:'none'});
			}, 500);
		}
		function _showMap($index){
			stage.trigger('RK_OCC_MAP', $index);
		}
		function _check($index){
			$.$each(arguments, function($idx){
				if( typeof $idx != 'number' ) return;
				var checker = $.$sprite.ADD('img').attr('className','icon').attr('src', RESOURCES + 'occupation/land_icon_check.png');
				checker.append(__landList[$idx]);
			});
		}


		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.mapArea .landList'));

			$.$each($.$find(__container, '.land'), function($land,$i){
				var land = $.$sprite.ADD($land);
				land.addEvent('click', function(){
					// 이벤트 기간 종료
					if(stage.MINIGAMEEND){
						stage.trigger('RK_ALERT', {text: $TXT.common.alert.minigameEnd});
						return;
					}
					if(ISMOTION) return;
					if(ISEND){
						stage.trigger('RK_ALERT', {text: $TXT.occupation.notice[ISCHECKING ? 'checking' : 'waiting'] });
						return;
					}
					stage._clickAction(this, function(){
						_showMap($i);
						BUFFLOG('btn_land_' + ($i+1));
					});
				});
				__landList.push( land );
			});

			stage.addEvent('RK_OCC_ING', _getData);
			stage.addEvent('RK_OCC_LAND', _getData);
			stage.addEvent('RK_OCC_MAP_LOAD', _hide);
		});
	})();

	// 맵 ==========================================================================================
	var Area = function($index){
		var self = this, order = $index + 1;

		self.dom = $.$sprite.ADD('div').attr('className', 'area area' + order);
		self.dom.attr('innerHTML', '<img class="icon number" src="'+ RESOURCES +'occupation/map_area_num_'+ order +'.png" />\
					<img class="icon counter" src="'+ RESOURCES +'occupation/map_area_counter.png" />\
					<div class="icon text"><span class="my">0</span><span class="guild">10</span></div>');
		self.box = $.$sprite.ADD('img').attr('className','box').attr('src', RESOURCES +'occupation/map_area_box.png').append(self.dom);
		self.bg = $.$sprite.ADD('img').attr('className','icon wind').attr('src', RESOURCES +'occupation/map_area_wind_5.png').append(self.dom);
		self.iconDoing = $.$sprite.ADD('img').attr('className','icon rolling').attr('src', RESOURCES +'occupation/map_area_icon_doing_crop.png');

		self.dom.addEvent('click', function(){
			stage._clickAction(this, function(){
				if(ISMOTION) return;
				stage.trigger('RK_OCC_INSERT', self);
				BUFFLOG('btn_land_'+self.info.region,'btn_map_'+self.info.position);
			});
		});
	};
	Area.prototype = {
		reset: function(){
			this.setLevel(0);
			this.stopDoing();
			this.stopSelect();
		},
		setLevel: function($level){
			this.level = $level;
			var color = $level == 2 ? 3 : $level == 1 ? 4 : 5;
			this.bg.attr('src', RESOURCES +'occupation/map_area_wind_'+ color +'.png');
		},
		setMy: function($qty){
			this.countMy = $qty;
			$.$sprite.ADD($.$find(this.dom,'.text .my')).attr('innerHTML', $qty || '-');
		},
		setGuild: function($qty){
			this.countGuild = $qty;
			$.$sprite.ADD($.$find(this.dom,'.text .guild')).attr('innerHTML', $qty || '-');
		},
		setDoing: function(){
			if( this.isDoing ) return;
			this.isDoing = true;
			this.iconDoing.style({display:'block'}).append(this.dom);
		},
		stopDoing: function(){
			if( !this.isDoing ) return;
			this.isDoing = false;
			this.iconDoing.style({display:'none'});
		},
		setSelect: function(){
			if( this.isSelect ) return;
			this.isSelect = true;
			this.box.attr('src', RESOURCES +'occupation/map_area_box_on.png');
		},
		stopSelect: function(){
			if( !this.isSelect ) return;
			this.isSelect = false;
			this.box.attr('src', RESOURCES +'occupation/map_area_box.png');
		}
	};

	(function(){
		var __container, __currentClass, __currentRegion, __areas = [], __title, __bg, __insertMy, __insertGuild, __btnSelectLand, __btnHelp, __data = LANDLEVEL,
			__countMy, __countGuild;

		function _getData($id,$update){
			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + $id + '/guild',
				complete: function(res){
					_setMap($id-1, res);
					if(!$update){
						_show();
						stage.trigger('RK_OCC_MAP_LOAD');
					} 
					stage.trigger('RK_LOADING_COMPLETE');
				}
			});
		}
		function _setMap($index, $data){
			__currentRegion = $index + 1;
			__countMy = 0;
			__countGuild = 0;

			__container.attr('className', 'map type'+ ($index+1) );
			__title.attr('src', RESOURCES + LANG + 'occupation/map_subtitle_0'+ ($index+1) +'.png');
			__bg.attr('src', RESOURCES +'occupation/map_land_bg_'+ ($index+1) +'.png');
			$.$each(__areas, function($area, $i){
				var data = $data[$i];
				$area.reset();
				$area.info = data;
				$area.info.region = $index + 1;
				$area.setLevel( __data[$index][$i] );
				$area.setMy( data.userCount );
				$area.setGuild( data.guildCount );
				if(data.userCount > 0) $area.setDoing();
				if(data.userCount > 0) $area.setSelect();
				__countMy += data.userCount;
				__countGuild += data.guildCount;
			});
			__insertMy.attr('innerHTML', __countMy);
			__insertGuild.attr('innerHTML', stage._thousand(parseInt( __countGuild )) );
		}
		function _show(){
			__currentClass = __container.attr('className');
			__container.style({display:'block'}).attr('className', __currentClass + ' ani_into');
			setTimeout(function(){
				__container.attr('className', __currentClass);
			}, 500);
		}
		function _hide(){
			__currentClass = __container.attr('className');
			__container.attr('className', __currentClass + ' ani_out');
			setTimeout(function(){
				__container.attr('className', __currentClass).style({display:'none'});
			}, 500);
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.mapArea .map'));
			__title = $.$sprite.ADD($.$find(__container, '.subtitle'));
			__bg = $.$sprite.ADD($.$find(__container, '.bg'));
			__insertMy = $.$sprite.ADD($.$find(__container, '.mapInfo .insert_my'));
			__insertGuild = $.$sprite.ADD($.$find(__container, '.mapInfo .insert_guild'));

			for(var i=0; i<10; i++){
				var a = new Area(i);
				a.dom.append(__container);
				__areas.push( a );
			}

			$.$sprite.ADD($.$find(__container, '.btn_select_land')).addEvent('click', function(){
				stage._clickAction(this, function(){
					_hide();
					stage.trigger('RK_OCC_LAND');
				});
			});
			$.$sprite.ADD($.$find(__container, '.btn_help')).addEvent('click', function(){
				stage._clickAction(this, function(){
					stage.trigger('RK_OCC_LAYER_HELP');
				});
			});

			stage.addEvent('RK_OCC_MAP', function($w,$index){
				_getData($index + 1);
			});
			stage.addEvent('RK_OCC_INSERT_COMPLETE', function($w,$data){
				if($data.monsterCount == 0) return;
				_getData(__currentRegion, true);
			});
		});
	})();

	// 소환수 투입 레이어 ==========================================================================================
	(function(){
		var __layer, __position, __title, __level, __countMyArea, __countGuildArea, __countMy, __countGuild, __currentPosition, __minMonster, __maxMonster,
			__btnPlus, __btnMinus, __btnMax;

		function _getData($w, $area){
			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + 'attend',
				parameters: {
					region: $area.info.region,
					position: $area.info.position
				},
				complete: function(res){
					_render($area, res);
					stage.trigger('RK_LOADING_COMPLETE');
				}
			});
		}
		function _render($area, $data){
			var status = stage.occupationStatus;
			__currentPosition = $area;
			__countMy = __currentPosition.countMy;
			__countGuild = __currentPosition.countGuild;
			__minMonster = __countMy;
			__maxMonster = status.monsterRewardCount - status.monsterCount + __minMonster;
			__countMyArea.attr('innerHTML', __countMy);
			__countGuildArea.attr('innerHTML', __countGuild);
			
			if($data.guild){
				$.$sprite.ADD($.$find(__layer, '.descArea .guildName')).attr('innerHTML', $data.guild.guildName);
				$.$sprite.ADD($.$find(__layer, '.descArea .monsterCount')).attr('innerHTML', $data.guild.monsterCount);
			}else{
				$.$sprite.ADD($.$find(__layer, '.descArea .guildName')).attr('innerHTML', '-');
				$.$sprite.ADD($.$find(__layer, '.descArea .monsterCount')).attr('innerHTML', '-');
			}

			__position.attr('innerHTML', __currentPosition.info.region + '-' + __currentPosition.info.position);
			__title.attr('src', RESOURCES +  LANG + 'occupation/insert/title_0'+ __currentPosition.info.region +'.png');
			__level.attr('src', RESOURCES +  LANG + 'occupation/layer/area_icon_level_'+ (__currentPosition.level+1) +'.png');

			_setBtns();
			_open();
		}
		function _open(){
			__layer.style({display:'block'});
		}
		function _close(){
			__layer.style({display:'none'});
		}
		function _save(){
			_close();
			if( __minMonster == __countMy ) return;
			stage.trigger('RK_OCC_SENDMONSTER', {
				region: __currentPosition.info.region,
				position: __currentPosition.info.position,
				qty: __countMy - __minMonster,
				currentPosition: __currentPosition,
				remain: __maxMonster - __countMy
			});
			BUFFLOG('attack','land_'+__currentPosition.info.region,'map_'+__currentPosition.info.position,'monster_qty_'+(__countMy - __minMonster) );
		}
		function _plus(){
			if( __countMy >= __maxMonster ) return;
			__countMyArea.attr('innerHTML', ++__countMy);
			__countGuildArea.attr('innerHTML', ++__countGuild);
			_setBtns();
		}
		function _minus(){
			if( __countMy <= __minMonster ) return;
			__countMyArea.attr('innerHTML', --__countMy);
			__countGuildArea.attr('innerHTML', --__countGuild);
			_setBtns();
		}
		function _max(){
			__countGuild = __countGuild + (__maxMonster-__countMy);
			__countMy = __maxMonster;
			__countMyArea.attr('innerHTML', __countMy);
			__countGuildArea.attr('innerHTML', __countGuild);
			_setBtns();
		}
		function _setBtns(){
			__btnPlus.alpha(1);
			__btnMinus.alpha(1);
			__btnMax.alpha(1);
			if( __countMy >= __maxMonster ){
				__btnPlus.alpha(0.3);
				__btnMax.alpha(0.3);
			}
			if( __countMy <= __minMonster ){
				__btnMinus.alpha(0.3);
			}
		}

		$.$init(function(){
			__layer = $.$sprite.ADD($.$find('#layer_insert'));
			__position = $.$sprite.ADD($.$find(__layer, '.titleArea .position'));
			__title = $.$sprite.ADD($.$find(__layer, '.titleArea .name'));
			__level = $.$sprite.ADD($.$find(__layer, '.titleArea .level'));
			__countMyArea = $.$sprite.ADD($.$find(__layer, '.myMonster'));
			__countGuildArea = $.$sprite.ADD($.$find(__layer, '.guildMonster'));
			__btnPlus = $.$sprite.ADD($.$find(__layer, '.btn_plus')).addEvent('click', function(){
				stage._clickAction(this, _plus);
			});
			__btnMinus = $.$sprite.ADD($.$find(__layer, '.btn_minus')).addEvent('click', function(){
				stage._clickAction(this, _minus);
			});
			__btnMax = $.$sprite.ADD($.$find(__layer, '.btn_max')).addEvent('click', function(){
				stage._clickAction(this, _max);
			});

			$.$sprite.ADD($.$find(__layer, '.btn_save')).addEvent('click', function(){
				stage._clickAction(this, _save);
			});
			$.$sprite.ADD($.$find(__layer, '.btn_cancel')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});

			stage.addEvent('RK_OCC_INSERT', _getData);
		});
	})();


	// 소환수 투입 완료 레이어 ==========================================================================================
	(function(){
		var __layer, __position, __title, __level, 
			__resultPoint, __resultUser, __resultGuild, 
			__rankFirstName, __rankFirstCount, __rankMyName, __rankMyCount, 
			__currentPosition, __currentInsert, __isLast = false;

		function _getData($region,$position,$monster){
			if($monster == 0) return;

			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + 'attend',
				method: 'post',
				parameters: {
					region: $region,
					position: $position,
					monster: $monster
				},
				complete: function(res){
					_render(res);

					stage.trigger('RK_OCC_INSERT_COMPLETE', {
						monsterCount: true
					});
					stage.trigger('RK_OCC_STATUS_UPDATE');
					stage.trigger('RK_OCC_CLOCK_UPDATE');
					stage.trigger('RK_USER_UPDATE');
					stage.trigger('RK_LOADING_COMPLETE');
					stage._sound('complete');
				}
			});
		}
		function _render($data){
			__position.attr('innerHTML', __currentPosition.info.region + '-' + __currentPosition.info.position);
			__title.attr('src', RESOURCES +  LANG + 'occupation/insert/title_0'+ __currentPosition.info.region +'.png');
			__level.attr('src', RESOURCES +  LANG + 'occupation/layer/area_icon_level_'+ (__currentPosition.level+1) +'.png');

			__resultPoint.attr('innerHTML', $data.point);
			__resultUser.attr('innerHTML', __currentInsert);
			__resultGuild.attr('innerHTML', __currentPosition.info.guildCount + __currentInsert);

			__rankFirstName.attr('innerHTML', $data.guildName);
			__rankFirstCount.attr('innerHTML', $data.guildMonsterCount);
			__rankMyName.attr('innerHTML', stage.user.user.guild.guildName);
			__rankMyCount.attr('innerHTML', __currentPosition.info.guildCount + __currentInsert);
			
			_open();
		}
		function _open(){
			__layer.style({display:'block'});
		}
		function _close(){
			__layer.style({display:'none'});
		}
		function _shareSns(){
			var landName = $TXT.occupation.landNames[__currentPosition.info.region-1],
				areaName = __currentPosition.info.region + '-' + __currentPosition.info.position,
				insertMy = __currentPosition.info.userCount;
			var tit = $TXT.occupation.insert.shareSnsTit.replace(/{{{landName}}}/g,landName).replace(/{{{areaName}}}/g,areaName);
			var msg = '';
			var dec = $TXT.occupation.insert.shareSnsDec.replace(/{{{landName}}}/g,landName);
			var last = $TXT.occupation.insert.shareSnsLast;
			var img = 'http://akstatic.plaync.com/resource/rk/meta/rk_v1103.jpg';

			stage.trigger('RK_SHARE_SNS', {$tit:tit, $msg:msg, $dec:dec, $last:last, $img:img});
			BUFFLOG('btn_sns_share','land_'+__currentPosition.info.region,'map_'+__currentPosition.info.position,'monster_qty_'+__currentPosition.info.userCount);
		}
		function _shareGuild(){
			var landName = $TXT.occupation.landNames[__currentPosition.info.region-1],
				areaName = __currentPosition.info.region + '-' + __currentPosition.info.position,
				insertMy = __currentPosition.info.userCount;
			var tit = $TXT.occupation.insert.shareGuildTit.replace(/{{{landName}}}/g,landName).replace(/{{{areaName}}}/g,areaName);
			var dec = $TXT.occupation.insert.shareGuildDec.replace(/{{{landName}}}/g,landName).replace(/{{{areaName}}}/g,areaName).replace(/{{{insertMy}}}/g,insertMy);
			var monster = '';

			stage.trigger('RK_SHARE_GUILD', {$tit:tit, $monster:monster, $dec:dec});
			BUFFLOG('btn_guild_share','land_'+__currentPosition.info.region,'map_'+__currentPosition.info.position,'monster_qty_'+__currentPosition.info.userCount);
		}

		$.$init(function(){
			__layer = $.$sprite.ADD($.$find('#layer_insert_complete'));
			__position = $.$sprite.ADD($.$find(__layer, '.titleArea .position'));
			__title = $.$sprite.ADD($.$find(__layer, '.titleArea .name'));
			__level = $.$sprite.ADD($.$find(__layer, '.titleArea .level'));
			__resultPoint = $.$sprite.ADD($.$find(__layer, '.resultArea .point'));
			__resultUser = $.$sprite.ADD($.$find(__layer, '.resultArea .userMonsterCount'));
			__resultGuild  = $.$sprite.ADD($.$find(__layer, '.resultArea .guildMonstercount'));
			__rankFirstName = $.$sprite.ADD($.$find(__layer, '.rankArea .rank_first .name'));
			__rankFirstCount = $.$sprite.ADD($.$find(__layer, '.rankArea .rank_first .number'));
			__rankMyName = $.$sprite.ADD($.$find(__layer, '.rankArea .rank_my .name'));
			__rankMyCount = $.$sprite.ADD($.$find(__layer, '.rankArea .rank_my .number'));			
			
			$.$sprite.ADD($.$find(__layer, '.btnArea .sns')).addEvent('click', function(){
				stage._clickAction(this, _shareSns);
			});
			$.$sprite.ADD($.$find(__layer, '.btnArea .guild')).addEvent('click', function(){
				stage._clickAction(this, _shareGuild);
			});
			$.$sprite.ADD($.$find(__layer, '.btnArea .confirm')).addEvent('click', function(){
				stage._clickAction(this, function(){
					_close();
					if(__isLast) stage.trigger('RK_OCC_SENDMONSTER_LAST');
				});
			});

			stage.addEvent('RK_OCC_SENDMONSTER', function($w,$data){
				__currentPosition = $data.currentPosition;
				__currentInsert = $data.qty;
				__isLast = $data.remain == 0;
				_getData($data.region, $data.position, $data.qty);
			});
		});
	})();


	// 소환수 투입 완료 : 마지막 소환수 투입 완료 시
	(function(){
		var __layer, __gameLinks = GAMELINK;

		function _open(){__layer.style({display:'block'});}
		function _close(){__layer.style({display:'none'});}

		$.$init(function(){
			__layer = $.$sprite.ADD($.$find('#layer_last_insert'));

			$.$sprite.ADD($.$find(__layer, '.btn_close')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});
			$.$sprite.ADD($.$find(__layer, '.btn_goto_collection')).addEvent('click', function(){
				stage._clickAction(this, function(){
					location.href = __gameLinks[0];
				});
			});
			$.$sprite.ADD($.$find(__layer, '.btn_goto_race')).addEvent('click', function(){
				stage._clickAction(this, function(){
					location.href = __gameLinks[2];
				});
			});

			stage.addEvent('RK_OCC_SENDMONSTER_LAST', _open);
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
		function _getDetail($season){
			$season = $season || 0;
			stage._data({
				url: DATALINK + 'history/' + $season,
				complete: function(res){
					_renderDetail(res);
				}
			});
		}
		function _render($data){
			__listWrap.attr('innerHTML', '');

			$.$each($data.pageList, function($item){
				var li = $.$sprite.ADD('li').append(__listWrap), html = '';

				html = '<span class="date">'+ $item.day.replace('2016-','').replace('-','/') +'</span>';
				html += '<span class="my_win">'+ $item.userScore +'</span>';
				html += '<span class="guild_win">'+ +$item.guildScore +'</span>';
				html += '<span class="score">'+ $item.score +'</span>';
				html += '<span class="rank">'+ ($item.rank || '50+') +'</span>';
				html += '<span class="dagger">'+ ($item.point==0?$item.point:'+'+$item.point) +'</span>';

				li.seasonId = $item.seasonId;
				li.attr('innerHTML', html).addEvent('click', function(){
					_getDetail( this.seasonId );
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
			// 결과
			var str;
			str =  '<span class="dagger">'+ ($data.dagger.total==0?$data.dagger.total:'+'+$data.dagger.total) +'</span>';
			str += '<span class="point">'+ (($data.guildOutput.minor*1) + ($data.guildOutput.normal*3) + ($data.guildOutput.major*5)) +'</span>';

			str += 	'<span class="guildInfo"><div class="valign"><div class="middle"><span class="guildName">' + stage.user.user.guild.guildName + '</span><span class="guildRank">'+($data.rank || '50+')+'</span></div></div></span>';
			$.$sprite.ADD($.$find(__detail, '.reward')).attr('innerHTML', str);

			// 단검획득
			str =  '<span>'+ ($data.dagger.normal==0?$data.dagger.normal:'+'+$data.dagger.normal) + '</span>';
			str += '<span>'+ ($data.dagger.extra==0?$data.dagger.extra:'+'+$data.dagger.extra) + '</span>';			
			str += '<span>'+ ($data.dagger.rank==0?$data.dagger.rank:'+'+$data.dagger.rank) + '</span>';
			str += '<span class="sum">'+ ($data.dagger.total==0?$data.dagger.total:'+'+$data.dagger.total) +'</span>';
			$.$sprite.ADD($.$find(__detail, '.daggerScore')).attr('innerHTML', str);

			// 거점 점령 내역
			str = '';
			str +=	'<li>';
			str +=		'<span>'+ $data.userInput +'</span>';
			str +=		'<span>'+ $data.userOutput +'</span>';
			str +=		'<span class="sum"></span>';
			str += 	'</li>';
			str +=	'<li>';
			str +=		'<span>'+ $data.guildInput.guild +'</span>';
			str +=		'<span>'+ $data.guildOutput.guild +'</span>';
			str +=		'<span class="sum">'+ $data.score.guild +'</span>';
			str += 	'</li>';
			str +=	'<li>';
			str +=		'<span>'+ $data.guildInput.minor +'</span>';
			str +=		'<span>'+ $data.guildOutput.minor +'</span>';
			str +=		'<span class="sum">'+ $data.score.minor +'</span>';
			str += 	'</li>';
			str +=	'<li>';
			str +=		'<span>'+ $data.guildInput.normal +'</span>';
			str +=		'<span>'+ $data.guildOutput.normal +'</span>';
			str +=		'<span class="sum">'+ $data.score.normal +'</span>';
			str += 	'</li>';
			str +=	'<li>';
			str +=		'<span>'+ $data.guildInput.major +'</span>';
			str +=		'<span>'+ $data.guildOutput.major +'</span>';
			str +=		'<span class="sum">'+ $data.score.major +'</span>';
			str += 	'</li>';



			// for(var i=0; i<15; i++){
			// 	if( i%3 == 0 ) str += '<li>';
			// 	str += '<span';
			// 	if( i%3 == 2 ) str += ' class="sum"';
			// 	str += '>'+ $data.rank +'</span>';
			// 	if( i%3 == 2 ) str += '</li>';
			// }
			$.$sprite.ADD($.$find(__detail, '.result')).attr('innerHTML', str);

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

			stage.addEvent('RK_OCC_RECORD', _getData);
		});
	})();

	// 하단투입상황 ==========================================================================================
	(function(){
		var __container, __my, __guild, __member;

		function _getData(){
			stage._data({
				url: DATALINK + 'my',
				complete: function(res){
					_setMy(res.monsterCount, res.monsterRewardCount);
					_setGuild(res.guildMonsterCount);
					_setMember(res.guildMemberCount);
					stage.occupationStatus = res;
				}
			});
		}
		function _setMy($insert,$all){
			var html = '<span>';
			html += $insert;
			html += '</span>/';
			html += $all;
			__my.attr('innerHTML', html);
		}
		function _setGuild($num){
			__guild.attr('innerHTML', stage._thousand($num));
		}
		function _setMember($num){
			__member.attr('innerHTML', stage._thousand($num));
		}

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.container .statusArea'));
			__my = $.$sprite.ADD($.$find(__container, '.insert_my'));
			__guild = $.$sprite.ADD($.$find(__container, '.insert_guild'));
			__member = $.$sprite.ADD($.$find(__container, '.insert_member'));

			$.$sprite.ADD($.$find(__container, '.btn_view')).addEvent('click', function(){
				stage._clickAction(this, function(){
					stage.trigger('RK_OCC_RECORD');
					BUFFLOG('btn_record');
				});
			});

			stage.addEvent('RK_OCC_STATUS_UPDATE', _getData);
		});
	})();

	// 도움말 레이어 ==========================================================================================
	(function(){
		var __layer;

		function _open(){
			__layer.style({display:'block'});
		}
		function _close(){
			__layer.style({display:'none'});
		}

		$.$init(function(){
			__layer = $.$sprite.ADD($.$find('#layer_help'));

			$.$sprite.ADD($.$find(__layer, '.btn_confirm')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});

			stage.addEvent('RK_OCC_LAYER_HELP', _open);
		});
	})();

	// game setting ==========================================================================================
	(function(){
		function _getData(){
			stage._data({
				url: DATALINK + 'schedule',
				complete: function(res){
					ISEND = res.end;
					stage.occupationTime = res;
					if(ISEND){
						_setPause(res.nextPlayTime);
					}else{
						_setStart();
					}
					stage.trigger('RK_OCC_STATUS_UPDATE');
				}
			});

		}
		function _setStart($time){
			stage.trigger('RK_OCC_ING');
		}
		function _setPause($refTime){
			// 정산중인지를 계산하는 로직 : 다음 플레이 날짜가 현재 날짜와 다른가
			var next = new Date($refTime),
				current = new Date(userData.currentTime);
			
			ISCHECKING = next.getDate() != current.getDate();
			stage.trigger('RK_OCC_PAUSE');
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