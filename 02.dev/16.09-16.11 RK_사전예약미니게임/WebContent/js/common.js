// RK minigame common
(function($){
	var $TXT = RK_RESOURCES;
	var MAX_WIDTH = 480;
	var RESOURCES = $TXT.img;
	var LANG = $TXT.lang;
	var DATALINK = $TXT.data;
	var AKVOD = 'http://akvod.plaync.com/RK/minigame/';
	var GAMELINK = ['collection_dev.html','occupation_dev.html','race_dev.html'];
	var GAMEINDEX = location.href.indexOf('collection') > -1 ? 0 : location.href.indexOf('occupation') > -1 ? 1 : 2;
	var LOGIN = document.cookie.indexOf('GPLLV') > -1 || document.cookie.indexOf('DEF_KEEP_LOGIN=true') > -1;
	var LOGINLINK = 'https://rc-mlogin.plaync.com/login/signin?return_url=' + location.href;
	var GUILDJOINLINK = 'http://op.mlogin.plaync.com/login/signin?return_url=' + location.href;
	var POINTSHOPLINK = 'http://op.mlogin.plaync.com/login/signin?return_url=' + location.href;
	var AGITLINK = '/preorder/agit/index';
	var ISMOBILE = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
	var MOBILEDEVICE = /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'ios' : 'android';
	// document.domain = 'plaync.com';

	// make current time for server. template : userData.now = '2016-10-25T20:10:35.189';
	if( typeof userData == 'object' ){
		userData.currentTime = new Date( userData.now.split('[')[0] );
	}else{
		window.userData = {};
		userData.currentTime = new Date();
	}

	// share game data
	window.GAMELINK = GAMELINK;

	// GOOGLE_ANALYTICS
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','GOOGLE_ANALYTICS');

	GOOGLE_ANALYTICS('create', 'UA-45356526-18', 'auto');
	GOOGLE_ANALYTICS('send', 'pageview');

	window.BUFFLOG = function(){
		if( typeof region == 'undefined' ) window.region = 'local';
		var gameName = region + '_', label;
		gameName += GAMEINDEX == 0 ? 'collection' : GAMEINDEX == 1 ? 'occupation' : 'race';
		label = gameName + ', click';
		$.$each(arguments, function($item){
			label += ', ' + $item;
		});
		GOOGLE_ANALYTICS('send','event',gameName,'click',label);
	};


	// common method ==========================================================================================
	(function(){
		function openPopup( url, name, width, height ){
			if ( !url ) return;
			name = name || 'ncsoft';
			width = width || 500;
			height = height || 700;
			window.open( url, name, 'width='+ width +' , height=' + height );
		}

		$.$init(function(){
			stage._getData = function($link, $params, $callback){
				$.$dataloader.AJAX($.$dataloader.ARG.url( $link ).contentType('json').parameters($params).onComplete(function($res){
					var res = $.$dataloader.parseJson( $res.responseText );
					if(typeof $callback == 'function') $callback.call($callback, res);
				}));
			};
			stage._jsonp = function($url, $params, $callback){
				var head = document.getElementsByTagName('head')[0],
					script = document.createElement('script'),
					fn = '_' + Math.random().toString().replace('.',''),
					paramStr = '';

				window[fn] = $callback;
				script.onload = function(){
					head.removeChild(script);
					delete script;
					delete window[fn];
				};

				for( i in $params ){
					paramStr += i + '=' + $params[i] + '&';
				}

				script.setAttribute('src', $url + '?'+ paramStr +'callback=' + fn);
				head.appendChild(script);
			};
			stage._data = function($options){
				var options = {
					url: $options.url,
					method: $options.method || 'get',
					parameters: $options.parameters || {},
					complete: $options.complete
				}, paramStr = getParamStr(options.parameters);

				$.$dataloader.AJAX($.$dataloader.ARG.url( options.url + paramStr ).method( options.method ).xhrParams({withCredentials:true}).contentType('json').onComplete(function($res){
					var res = $.$dataloader.parseJson( $res.responseText );
					if(stage.DEBUG) console.log(res);
					if(typeof options.complete == 'function') options.complete.call(options.complete, res);
				}).onFailure(function($res){
					if( $res.status == 401 ) stage.trigger('RK_LOGIN');
				}));

				function getParamStr(obj){
					var counter = 0, i, output = '';
					for(i in obj){
						output += counter == 0 ? '?' : '&';
						output += i + '=' + obj[i];
						counter++;
					}
					return counter == 0 ? '' : output;
				}
			};
			stage._clickAction = function($target, $callback){
				if( typeof $target.attr != 'function' ) return;
				var beforeClass = $target.attr('className'), aniClass = 'ani_click';
				if( beforeClass.indexOf(aniClass) > -1 ) return;
				$target.attr('className', beforeClass + ' ' + aniClass);
				setTimeout(function(){
					$target.attr('className', beforeClass);
					if(typeof $callback == 'function') $callback.call($target);
				}, 200);

				stage._sound('click');
			};
			stage._thousand = function($num){
				if( typeof $num != 'number') return $num;
				var reg = /(^[+-]?\d+)(\d{3})/,
					output = $num.toString();

				while (reg.test(output))
				output = output.replace(reg, '$1' + ',' + '$2');

				return output;
			};
			stage._openPage = function($url){
				if(ISMOBILE){
					location.href = $url;
				}else{
					if( $url == AGITLINK ){
						openPopup($url, 'rkAgitPop', 500, 700);
					}else{
						var w = window.opener || window;
						w.open($url, '_blank');
						// w.location.href = $url;
					}
				}
			};
		});
	})();

	// suond controller ==========================================================================================
	var SoundController = function(){
		this.source = {};
	};
	SoundController.prototype = {
		add: function($key, $link, $isBgm){
			var media = document.createElement('audio');
			if($isBgm){
				media.setAttribute('loop', true);
				media.volume = 0.5;
				media.oncanplaythrough = function(){
					if(ISMOBILE || localStorage.getItem('RK_SOUND_ON') == 'false') return;
					this.play();
				};
			}
			media.setAttribute('src', $link);
			media.preload = true;
			media.load();
			this.source[$key] = media;
		},
		play: function($key){
			if(!this.source[$key]) return;
			if(this.source[$key].readyState < 4) return;
			this.source[$key].currentTime = 0;
			this.source[$key].play();
		},
		stop: function($key){
			for(var i in this.source){
				this.source[i].pause();
			}
		}
	};

	(function(){
		var __sound = new SoundController(), __isSoundOn = true;

		function _init($gameIndex){

			// 공통
			__sound.add('click', AKVOD + 'click.mp3');
			__sound.add('popup', AKVOD + 'popup.mp3');
			switch ($gameIndex) {
				// 컬렉션
				case 0:
					__sound.add('bgm', AKVOD + 'RK_Lobby.mp3', true);
					__sound.add('rolling', AKVOD + 'collection_rolling.mp3');
					__sound.add('add', AKVOD + 'collection_add.mp3');
					break;
				// 점령전
				case 1:
					__sound.add('bgm', AKVOD + 'RK_Openning.mp3', true);
					__sound.add('complete', AKVOD + 'occupation_complete.mp3');
					break;
				// 레이스
				case 2:
					__sound.add('bgm', AKVOD + 'RK_WorldMap.mp3', true);
					__sound.add('countdown', AKVOD + 'race_countdown.mp3');
					break;
			}
		}
		function _play($key){
			if($key == 'on'){
				_on();
				localStorage.setItem('RK_SOUND_ON', true);
				return true;
			}else if($key == 'off'){
				_off();
				localStorage.setItem('RK_SOUND_ON', false);
				return false;
			}else if($key == 'toggle'){
				if(__isSoundOn) _off();
				else _on();
				localStorage.setItem('RK_SOUND_ON', __isSoundOn);
				return __isSoundOn;
			}else if($key == 'status'){
				return __isSoundOn;
			}
			if(!__isSoundOn) return false;
			__sound.play($key);
		}
		function _off(){
			__isSoundOn = false;
			__sound.stop();
		}
		function _on(){
			__isSoundOn = true;
			__sound.play('bgm');
		}

		$.$init(function(){
			_init(GAMEINDEX);
			stage._sound = _play;

			// initial sound setting
			if(ISMOBILE){
				_off();
			}else {
				localStorage.getItem('RK_SOUND_ON') == 'false' ? _off() : _on();
			}
		});
	})();


	// check resize ==========================================================================================
	(function(){
		var __wrapper, __width;
		
		function _checkSize(){
			var ref = document.body.clientWidth;
			if(__width == ref) return;
			__width = ref;
			ref = ref < MAX_WIDTH ? ref : MAX_WIDTH;

			__wrapper.width(ref);
			document.body.style.fontSize = (ref/10) + 'px';
		}

		$.$init(function(){
			__wrapper = $.$sprite.ADD($.$find('.wrapper'));
			stage.addEvent('resize', _checkSize).trigger('resize');
			setTimeout(_checkSize,200);
		});
	})();


	// GAME STAUTS SET
	(function(){
		$.$init(function(){
			stage._data({
				url: DATALINK + 'schedule',
				complete: function(res){
					stage.MINIGAMEEND = res.isEnd;
				}
			});
		});
	})();


	// header
	(function(){
		var __html = '<div class="profileImg">\
				<img class="image" src="" />\
				<img class="cover" src="'+ RESOURCES +'common/header_profile_bg.png" />\
			</div>\
			<div class="profile"></div>\
			<div class="info dagger">\
				<span class="number">0</span>\
				<img src="'+ RESOURCES + LANG + 'common/header_info_dagger.png" />\
			</div>\
			<div class="info summons">\
				<span class="number">0</span>\
				<img src="'+ RESOURCES + LANG + 'common/header_info_summons.png" />\
			</div>\
			<div class="btns">\
				<button class="btn_home"><img src="'+ RESOURCES +'common/header_btn_home.png" /></button>\
				<button class="btn_guide"><img src="'+ RESOURCES +'common/header_btn_guide.png" /></button>\
				<button class="btn_sound"><img src="'+ RESOURCES +'common/btn_sound_off.png" /></button>\
			</div>';

		var __container, __btnSound;

		function _getData($update){

			stage._data({
				url: DATALINK + 'collection/user',
				complete: function(res){
					if( !res.user ){
						stage.trigger('RK_LOGIN');
						return;
					}
					stage.user = res;
					stage.hasGuild = res.user.guild.guildId > 0;
					if(stage.hasGuild){
						getGuildData();
					}else{
						_render(__container, res);
						if($update == 'update'){
							stage.trigger('RK_COL_TICKET_UPDATE');
							return;
						}
						stage.trigger('RK_USER_COMPLETE');
					}
				}
			});

			function getGuildData(){
				stage._data({
					url: DATALINK + 'collection/user/ranking',
					complete: function(res){
						if(stage.user.user.guild){
							stage.user.user.guild.monsterSum = res.monsterSum || 0;
							stage.user.user.guild.rank = res.rank || 0;
						}
						_render(__container, res);
						if($update == 'update'){
							stage.trigger('RK_COL_TICKET_UPDATE');
							return;
						}
						stage.trigger('RK_USER_COMPLETE');
					}
				});
			}

		}
		function _render($w,$data){
			var str = '', guild = {}, sandBox;
			$data = stage.user;

			guild.serverName = $data.user.serverName ? $data.user.serverName : '-';
			guild.guildName = $data.user.guild.guildName ? $data.user.guild.guildName : '-';

			sandBox = typeof sandBoxImgUrl != 'undefined' ? sandBoxImgUrl : 'http://dn.sfile.plaync.com';
			sandBox += '/data/' + $data.user.guid + '/profile?type=medium';
			$.$sprite.ADD($.$find(__container, '.profileImg .image')).attr('src', sandBox);

			str += '<div class="server">'+ guild.serverName +'</div>';
			str += '<div class="guild">'+ guild.guildName +'</div>';
			str += '<div class="name">'+ $data.user.userName +'</div>';
			$.$sprite.ADD($.$find(__container, '.profile')).attr('innerHTML', str);

			_setDagger( $data.dagger );
			_setMonster( $data.monster );
		}
		function _setDagger($num){
			$.$sprite.ADD($.$find(__container, '.dagger .number')).attr('innerHTML', '+'+$num);
		}
		function _setMonster($num){
			$.$sprite.ADD($.$find(__container, '.summons .number')).attr('innerHTML', $num);
		}
		function _toggleSound(){
			var link = stage._sound('toggle') ? RESOURCES +'common/btn_sound_on.png' : RESOURCES +'common/btn_sound_off.png';
			__btnSound.attr('src', link);

			BUFFLOG( link.indexOf('_off') > 0 ? 'btn_sound_on' : 'btn_sound_off' );
		}


		$.$init(function(){
			var soundBtnLink = stage._sound('status') ? RESOURCES +'common/btn_sound_on.png' : RESOURCES +'common/btn_sound_off.png';
			__container = $.$sprite.ADD($.$find('.header')).attr('innerHTML', __html);
			__btnSound = $.$sprite.ADD($.$find(__container, '.btn_sound img')).attr('src', soundBtnLink);

			stage.addEvent('RK_USER', _getData);
			stage.addEvent('RK_USER_UPDATE', function(){
				_getData('update');
			});

			$.$sprite.ADD($.$find(__container, '.btn_guide')).addEvent('click', function(){
				stage._clickAction(this, function(){
					stage.trigger('RK_GUIDE');
					BUFFLOG( 'btn_help' );
				});
			});
			$.$sprite.ADD($.$find(__container, '.btn_sound')).addEvent('click', function(){
				stage._clickAction(this, _toggleSound);
			});
			$.$sprite.ADD($.$find(__container, '.btn_home')).addEvent('click', function(){
				stage._clickAction(this, function(){
					stage._openPage($TXT.common.info.url.split('?')[0]);
				});
			});

			// check login
			if(!LOGIN) return;

			_getData();
		});
	})();


	// BOTTOM BTNS ==========================================================================================
	(function(){
		var __container, __btnRanking, __btnAgit, __btnShop, __gameBtn = [], 
			__gameLink = GAMELINK, __gameIndex = GAMEINDEX, counter = 0,
			__urls = [
				RESOURCES + LANG + 'common/bottom_game_collection.png',
				RESOURCES + LANG + 'common/bottom_game_occupation.png',
				RESOURCES + LANG + 'common/bottom_game_race.png'
			];

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.bottom'));
			__btnRanking = $.$sprite.ADD('button').attr('innerHTML','<img src="'+ RESOURCES + LANG + 'common/bottom_btn_rank.png" />').append(__container);
			__btnAgit = $.$sprite.ADD('button').attr('innerHTML','<img src="'+ RESOURCES + LANG + 'common/bottom_btn_agit.png" />').attr('className','center').append(__container);
			__btnShop = $.$sprite.ADD('button').attr('innerHTML','<img src="'+ RESOURCES + LANG + 'common/bottom_btn_shop.png" />').append(__container);
			__gameBtn[0] = $.$sprite.ADD('button').attr('innerHTML','<img src="'+ RESOURCES + 'common/bottom_game_left.png" />').attr('className','game').append(__container);
			__gameBtn[1] = $.$sprite.ADD('button').attr('innerHTML','<img src="'+ RESOURCES + 'common/bottom_game_right.png" />').attr('className','game').append(__container);

			__btnRanking.addEvent('click', function(){
				stage._clickAction(this, function(){
					if(!stage.hasGuild){
						stage.trigger('RK_ALERT', {
							text: $TXT.common.ranking.notGuild,
							type: 'guild'
						});
						return;
					}
					stage.trigger('RK_RANKING');
					BUFFLOG('btn_rank');
				});
			});
			__btnAgit.addEvent('click', function(){
				stage._clickAction(this, function(){
					stage._openPage(AGITLINK);
				});
			});
			__btnShop.addEvent('click', function(){
				stage._clickAction(this, function(){
					stage._openPage(POINTSHOPLINK);
				});
			});

			$.$each(__gameLink, function($link,$i){
				if( __gameIndex == $i ) return;
				var target = __gameBtn[counter++];
				$.$sprite.ADD('img').attr('className','name').attr('src', __urls[$i]).append(target);
				target.addEvent('click', function(){
					stage._clickAction(this, function(){
						if(stage.collectionPick){
							if(stage.collectionPick.isRoll || !stage.collectionPick.isOpen) return;
						}
						location.href = $link;
					});
				});
			});
		});
	})();



	// layer : ranking ==========================================================================================
	(function(){
		var coin_msg = GAMEINDEX == 0 ? '' : '<img src="'+RESOURCES+LANG+'common/layer/coin_msg.png" />';

		var __layer = $.$sprite.ADD('div').attr('className','layer').attr('innerHTML','<div class="dimmed"></div>\
				<div class="ranking">\
					<div class="cont">\
						<img class="bg" src="'+ RESOURCES + LANG + 'common/layer/rank_top.png" />\
						<div class="tabArea">\
							<button class="tab"><img src="'+ RESOURCES + LANG + 'common/layer/rank_tab_0.png" /></button>\
							<button class="tab"><img src="'+ RESOURCES + LANG + 'common/layer/rank_tab_1.png" /></button>\
							<button class="tab"><img src="'+ RESOURCES + LANG + 'common/layer/rank_tab_2.png" /></button>\
						</div>\
						<div class="list">\
							<div class="tit">\
								<span class="rank">'+$TXT.common.ranking.titRank+'</span>\
								<span class="guild_name">'+$TXT.common.ranking.titGuildName+'</span>\
								<span class="point">'+$TXT.common.ranking.titPoint[GAMEINDEX]+'</span>\
							</div>\
							<ol></ol>\
							<img class="bg" src="'+ RESOURCES +'common/layer/rank_body.png" />\
						</div>\
						<div class="message"></div>\
						<img class="bg" src="'+ RESOURCES + 'common/layer/rank_bottom.png" />\
						<p class="coin_msg">'+ coin_msg +'</p>\
						<div class="btnArea">\
							<button class="btn_refresh"><img src="'+ RESOURCES + LANG + 'common/layer/pop_btn_refresh.png" /></button>\
							<button class="btn_confirm"><img src="'+ RESOURCES + LANG + 'common/layer/pop_btn_confirm.png" /></button>\
						</div>\
					</div>\
				</div>');
		var __tabBtns = [], __gameIndex = GAMEINDEX,
			__msgJoinGuild = '<img class="bg" src="'+ RESOURCES + LANG +'common/layer/rank_message_join.png" /><button class="btn_join"><img src="'+ RESOURCES + LANG +'common/layer/alert_btn_ally.png" /></button>',
			__msgArea = $.$sprite.ADD($.$find(__layer, '.message')),
			__guildRank, __guildScore, __guildMemberCount;

		$.$each( $.$find(__layer, '.tabArea .tab'), function($btn,$i){
			__tabBtns.push( $.$sprite.ADD( $btn ).addEvent('click', function(){
				stage._clickAction(this, function(){
					if(__gameIndex == $i) return;
					if(!stage.hasGuild && $i != 0) return;
					_getData($i);

					$.$sprite.ADD($.$find(__layer, '.tit .point')).attr('innerHTML',$TXT.common.ranking.titPoint[$i]);

					coin_msg = $i == 0 ? '' : '<img src="'+RESOURCES+LANG+'common/layer/coin_msg.png" />';
					$.$sprite.ADD($.$find(__layer, '.coin_msg')).attr('innerHTML',coin_msg);
				});
			}) );
		});
		$.$sprite.ADD($.$find(__layer, '.btnArea .btn_refresh')).addEvent('click', function(){
			stage._clickAction(this, function(){
				_getData(__gameIndex);
			});
		});
		$.$sprite.ADD($.$find(__layer, '.btnArea .btn_confirm')).addEvent('click', function(){
			stage._clickAction(this, function(){
				_close();
			});
		});

		function _getData($index){
			var urls = [
					DATALINK + 'collection/ranking',
					DATALINK + 'occupation/ranking/guild',
					DATALINK + 'race/ranking/guild'
				],
				index = typeof $index == 'number' ? $index : GAMEINDEX;

			stage.trigger('RK_LOADING');
			stage._data({
				url: urls[index],
				complete: function(res){
					__gameIndex = index;

					if(stage.hasGuild){
						getMyGuildInfo(function(){
							_render(__layer, res, index);
						});
					}else{
						_render(__layer, res, index);
						stage.trigger('RK_LOADING_COMPLETE');
					}
				}
			});

			function getMyGuildInfo($callback){
				var urls = [
					DATALINK + 'collection/user/ranking',
					DATALINK + 'occupation/ranking/user',
					DATALINK + 'race/ranking/user'
				];

				stage._data({
					url: urls[__gameIndex],
					complete: function(res){
						__guildRank = res.rank || '50+';
						__guildScore = __gameIndex == 0 ? res.monsterSum : res.score;
						__guildMemberCount = res.guildMemberCount || 1;
						if(typeof $callback == 'function') $callback.call();
						stage.trigger('RK_LOADING_COMPLETE');
					}
				});
			}
		}
		function _open(){
			__layer.style({display:'block'});
		}
		function _close(){
			__layer.style({display:'none'});
		}
		function _render($w,$data,$gameIndex){
			var str = '', info = stage.user, list = $data;
			// tab
			$.$each(__tabBtns, function($btn,$i){
				str = RESOURCES + LANG +'common/layer/rank_tab_' + $i;
				if( $i == $gameIndex) str += '_on';
				str += '.png';
				$.$sprite.ADD($.$find($btn, 'img')).attr('src', str);
			});

			// list
			str = '';
			if(__gameIndex == 2) list = $data.guildRanking;
			$.$each(list, function($item){
				str += '<li><div class="rank">'+ $item.rank +'</div>';
				str += '<div class="name">'+ $item.guildName +'</div><div class="count"><span>';
				switch (__gameIndex) {
					case 0:
						str += $item.monsterSum +'</span></div></li>';
						break;
					case 1:
						str += $item.score +'</span></div></li>';
						break;
					case 2:
						str += $item.score +'</span></div></li>';
						break;
				}
			});
			$.$sprite.ADD($.$find(__layer, 'ol')).attr('innerHTML', str);

			// message
			if(info.user.guild.guildName){
				str = '<div class="current">';
				str += $TXT.common.ranking.guildInfo.replace(/{{{guildName}}}/g,'<span class="name">'+ info.user.guild.guildName +'</span>').replace(/{{{guildRank}}}/g,'<span class="rank">'+ __guildRank +'</span>');
				str += '</div>';

				str += '<div class="collect">';
				if( $gameIndex == 0 ){
					str += $TXT.common.ranking.collection.replace(/{{{count}}}/g, '<span class="qty">'+ __guildScore +'</span>');
				}else{
					// 누적 점수
					if( $gameIndex == 1 ){
						str += $TXT.common.ranking.occupation.replace(/{{{count}}}/g, '<span class="qty">'+ stage._thousand(__guildScore) +'</span>');
					}else if( $gameIndex == 2 ){
						str += $TXT.common.ranking.race.replace(/{{{count}}}/g, '<span class="qty">'+ stage._thousand(__guildScore) +'</span>');
					}
					// 길드 인원 수 10명 이상
					if( __guildMemberCount > 9 ){
						// 기사단의 증표 계산
						var guildReward = 6000;
						
						if( __guildRank == 0){
							guildReward = 6000;
						}else if( __guildRank == 1 ){
							guildReward = 48000;
						}else if( __guildRank < 11 ){
							guildReward = 36000;
						}else if( __guildRank < 21 ){
							guildReward = 27000;
						}else if( __guildRank < 31 ){
							guildReward = 15000;
						}

						str += '<br />';
						str += $TXT.common.ranking.occupationReward.replace(/{{{myReward}}}/g, '<span class="qty">'+ stage._thousand(parseInt(guildReward/30)) +'</span>');
					}
				}
				str += '</div>';

				__msgArea.attr('innerHTML', str);
			}else{
				str = __msgJoinGuild;
				__msgArea.attr('innerHTML', str);
				$.$sprite.ADD($.$find(__msgArea, '.btn_join')).addEvent('click', function(){
					stage._clickAction(this, function(){
						// location.href = GUILDJOINLINK;
						stage._openPage(GUILDJOINLINK);
					});
				});
			}

			_open();
		}


		$.$init(function(){
			__layer.append( $.$find('.wrapper') ).style({display:'none'});

			stage.addEvent('RK_RANKING', _getData);
		});
	})();


	// layer : sns share ==========================================================================================
	(function(){
		var __areaCode = 1, __imageLink, __tit, __dec, __msg, __last = '', __container,
			__html  = '<div class="dimmed"></div><div class="share_sns"><div class="cont"><img class="bg" src="'+ RESOURCES + LANG + 'common/layer/sns_bg.png" /><div class="where">';

		// setAreaCode
		if(typeof _isProfileKr != 'undefined' && _isProfileKr.toString() == 'true') __areaCode = 1;
		if(typeof _isProfileTw != 'undefined' && _isProfileTw.toString() == 'true') __areaCode = 2;
		if(typeof _isProfileSea != 'undefined' && _isProfileSea.toString() == 'true') __areaCode = 3;

		if(__areaCode == 1) __html += '<img class="kakao" src="'+ RESOURCES +'common/layer/sns_kt.png" /><img class="kakaoStory" src="'+ RESOURCES +'common/layer/sns_ks.png" />';
		__html += '<img class="facebook" src="'+ RESOURCES +'common/layer/sns_fb.png" /><img class="twitter" src="'+ RESOURCES +'common/layer/sns_tw.png" />';
		__html += '</div><div class="btnArea"><button class="btn_close"><img src="'+ RESOURCES + LANG + 'common/layer/pop_btn_close.png" /></button></div></div></div>';
		__container = $.$sprite.ADD('div').attr('className','layer').attr('innerHTML', __html);

		function _getData(){
			var gameName = ['collection','occupation','race'];
			stage._data({
				url: DATALINK + gameName[GAMEINDEX] + '/sns',
				method: 'post',
				complete: function(res){
					if(!res.result) return;
					// 게임에 따라 보상 내용이 다름. collection 일 경우에만 소환 티켓 제공 
					var msg = GAMEINDEX == 0 ? $TXT.common.share.rewardTicket : $TXT.common.share.rewardDagger.replace(/{{{daggerCount}}}/g,10);

					stage.trigger('RK_ALERT', {
						type: 'notify',
						text: msg,
						callback: function(){
							stage.trigger('RK_USER_UPDATE');
						}
					});
				}
			});
		}
		function _setData($data){
			// 이벤트 기간 종료
			if(stage.MINIGAMEEND){
				stage.trigger('RK_ALERT', {text: $TXT.common.alert.minigameEnd});
				return;
			}
			__tit = $data.$tit;
			__msg = $data.$msg == '' ? $data.$msg : '\n' + $data.$msg;
			__dec = $data.$dec;
			__last = $data.$last;
			__imageLink = $data.$img || 'http://akstatic.plaync.com/resource/rk/meta/rk_v1103.jpg';

			_open();
		}
		function _open(){
			__container.style({display:'block'});
		}
		function _close(){
			__container.style({display:'none'});
		}
		function _loadKakao($callback){
			$.$js('//developers.kakao.com/sdk/js/kakao.min.js', function(){
				Kakao.init('5c3deb427bbc856fcee17ffd8a3a11a9');
				if(typeof $callback == 'function') $callback.call();
			});
		}

		function _loadFacebook($callback){
			var countryID = 'ko_KR', //한국어
				appID = '815276028612152';

			if(__areaCode == 2){
				countryID = 'zh_CN'; // 대만어
				appID = '1237160869709558';
			}else if(__areaCode == 3){
				countryID = 'en_US'; // 영어
				appID = '1237160869709558';
			}
			
			$.$js('//connect.facebook.net/'+countryID+'/sdk.js', function(){
				FB.init({appId:appID, xfbml:true, version:'v2.7'});
				if(typeof $callback == 'function') $callback.call();
			});
		}

		$.$sprite.ADD($.$find(__container, '.kakao')).addEvent('click', function(){
			stage._clickAction(this, function(){
				if(typeof Kakao != 'object'){
					_loadKakao(share);
				}else{
					share();
				}
				if(ISMOBILE) _getData();
			});
			BUFFLOG('share','sns_kakao', __tit);

			function share(){
				Kakao.Link.sendTalkLink({
					label: '['+__tit+']'+__msg+'\n'+__dec+'\n\n'+__last,
					image: {
						src: __imageLink,
						width: '1200',
						height: '630'
					},
					webButton: {
						text: $TXT.common.info.gameName + '바로가기',
						url: $TXT.common.info.url
					},
					// webLink: {
					// 	text: 'lrk',
					// 	url: $TXT.common.info.url
					// },
					fail: function(){
						stage.trigger('RK_ALERT', {text:'모바일에서만 사용하실 수 있습니다.'});
					}
				});
			}
		});
		$.$sprite.ADD($.$find(__container, '.kakaoStory')).addEvent('click', function(){
			stage._clickAction(this, function(){
				if(typeof Kakao != 'object'){
					_loadKakao(share);
				}else{
					share();
				}
				_getData();
			});
			BUFFLOG('share','sns_kakaostory', __tit);

			function share(){
				Kakao.Story.share({
					url: $TXT.common.info.url,
					text: '['+__tit+']'+__msg+'\n'+__dec+'\n\n'+__last
				});
			}
		});
		$.$sprite.ADD($.$find(__container, '.facebook')).addEvent('click', function(){
			stage._clickAction(this, function(){
				if(typeof FB != 'object'){
					_loadFacebook(share);
				}else{
					share();
				}
				_getData();
			});
			BUFFLOG('share','sns_facebook', __tit);

			function share(){
				FB.ui({
					method: 'feed',
					display: 'popup',
					name: __tit,
					description: __msg+'\n'+__dec,
					link: $TXT.common.info.url,
					redirect: $TXT.common.info.url,
					picture: __imageLink,
					caption: $TXT.common.info.gameName,
					message:  __msg+'\n'+__dec,
				});
			}
		});
		$.$sprite.ADD($.$find(__container, '.twitter')).addEvent('click', function(){
			stage._clickAction(this, function(){
				var options = 'width=600,height=440,menubar=no,location=no,menubar=no,status=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no',
					contents = '?hashtags=' + $TXT.common.info.hashtags.replace(/ /g, '');
				//contents += '&url=' + $TXT.common.info.url;
				contents += '&text=' + __tit;

				window.open( encodeURI('https://twitter.com/intent/tweet' + contents), '', options);
				BUFFLOG('share','sns_twitter', __tit);
				_getData();
			});
		});
		$.$sprite.ADD($.$find(__container, '.btn_close')).addEvent('click', function(){
			stage._clickAction(this, _close);
		});

		$.$init(function(){
			__container.append( $.$find('.wrapper') ).style({display:'none'});

			stage.addEvent('RK_SHARE_SNS', function($w,$data){
				_setData($data);
			});
		});
	})();


	// share guild ==========================================================================================
	(function(){
		var __gameName = ['collection','occupation','race'];

		function _share($msg){

			// 이벤트 기간 종료
			if(stage.MINIGAMEEND){
				stage.trigger('RK_ALERT', {text: $TXT.common.alert.minigameEnd});
				return;
			}
			// 길드 미가입
			if(!stage.hasGuild){
				stage.trigger('RK_ALERT', {text: $TXT.common.share.notGuild});
				return;
			}

			var shareMsg = '['+$msg.$tit+'] <br>' + $msg.$dec;

			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + __gameName[GAMEINDEX] + '/guild',
				method: 'post',
				parameters: {contents: encodeURIComponent(shareMsg)},
				complete: function(res){
					var rewardMsg = res.result ? '<span class="desc">'+ $TXT.common.share.rewardDagger.replace(/{{{daggerCount}}}/g,10) +'</span>' : '';

					stage.trigger('RK_LOADING_COMPLETE');
					stage.trigger('RK_ALERT', {
						text: $TXT.common.share.guild + rewardMsg,
						callback: function(){
							stage._openPage(AGITLINK);
						}
					});

					if(res.result) stage.trigger('RK_USER_UPDATE');
				}
			});
		}

		$.$init(function(){
			stage.addEvent('RK_SHARE_GUILD', function($w,$msg){
				_share($msg);
			})
		});
	})();


	// layer : play guide
	(function(){
		var __wrapper, __layer, __flickContainer, __btnPrev, __btnNext,
			__list, __flicker, __provider, __w, __h, __isInit = false, __isOpen = false, __isMotion = false;
			
		function _setFlick(){
			var pageList = [[
				RESOURCES + LANG + 'collection/guide_0_v2.jpg',
				RESOURCES + LANG + 'collection/guide_1.jpg',
				RESOURCES + LANG + 'collection/guide_2.jpg',
				RESOURCES + LANG + 'collection/guide_3.jpg'
			],[
				RESOURCES + LANG + 'occupation/guide_0_v2.jpg',
				RESOURCES + LANG + 'occupation/guide_1.jpg',
				RESOURCES + LANG + 'occupation/guide_2.jpg',
				RESOURCES + LANG + 'occupation/guide_3.jpg',
				RESOURCES + LANG + 'occupation/guide_4.jpg'
			],[
				RESOURCES + LANG + 'race/guide_0_v2.jpg',
				RESOURCES + LANG + 'race/guide_1.jpg',
				RESOURCES + LANG + 'race/guide_2.jpg',
				RESOURCES + LANG + 'race/guide_3.jpg',
				RESOURCES + LANG + 'race/guide_4.jpg'
			]];

			__list = $.$rolllist.FACTORY($.$rolllist.ARG.target(__flickContainer).size(__wrapper.width()).turm(function($index){
				return __wrapper.width();
			}).item(function($index){
				return $.$sprite.ADD('img').style({position:'absolute',display:'block'});
			}).onComplete(function($e){
				__isMotion = false;
				_setBtns();
			}).dataReset(function($item, $data){
				$item.attr('src', $data);
			}));

			__provider = $.$provider.FACTORY($.$provider.ARG.map( pageList[GAMEINDEX] ).loop(false).startIndex(0));
			__flicker = $.$flick.FACTORY($.$flick.ARG.target(__list).speed($.$option().level <= 2 ? .2 : .3).margin($.$option().level === 1 ? 10 : $.$option().level === 2 ? 20 : 50).once());
			__list.data(__provider);
			stage.addEvent('resize', _resizing);
			__isInit = true;

			_open();
		}
		function _open(){
			if( !__isInit ){
				_setFlick();
				return;
			}
			__isOpen = true;
			__layer.style({display:'block'});
			_setBtns();
			_resizing();
		}
		function _close(){
			__isOpen = false;
			__layer.style({display:'none'});
			// change page to first
			if( __list.currentId == 0 ) return;
			__list.setLocation( __list.currentId * __w );
		}
		function _prev(){
			if( !__isInit || __isMotion ) return;
			if( __list.getNearByZero().index == 0 ) return;
			__isMotion = true;
			__flicker.setJumpMove(1);
		}
		function _next(){
			if( !__isInit || __isMotion ) return;
			if( __list.getNearByZero().index == __list.length-1 ) return;
			__isMotion = true;
			__flicker.setJumpMove(-1);
		}
		function _setBtns(){
			var idx = __list.getNearByZero().index;
			__btnPrev.visible( idx > 0 );
			__btnNext.visible( __list.getNearByZero().index < __list.length-1 );
		}
		function _resizing(){
			if( __isOpen == false ) return;
			if( __w == __wrapper.width() && __h == __wrapper.height() ) return;
			__w = __wrapper.width();
			__h = __wrapper.height();
			__flickContainer.width(__w).height(__h);
			__list.setSize(__w);
		}

		$.$init(function(){
			__wrapper = $.$sprite.ADD($.$find('.wrapper'));
			if(ISMOBILE) __wrapper.attr('className', __wrapper.attr('className') + ' ' + MOBILEDEVICE);
			__layer = $.$sprite.ADD('div').append(__wrapper).attr('className','layer layer_guide').style({display:'none'});
			__flickContainer = $.$sprite.ADD('div').append(__layer).style({position:'relative'});
			__btnPrev = $.$sprite.ADD('button').append(__layer).attr('className','btn_prev').attr('innerHTML','<img src="'+ RESOURCES + LANG +'/common/guide_btn_prev.png"/>').addEvent('click', function(){
				stage._clickAction(this, _prev);
			});
			__btnNext = $.$sprite.ADD('button').append(__layer).attr('className','btn_next').attr('innerHTML','<img src="'+ RESOURCES + LANG +'/common/guide_btn_next.png"/>').addEvent('click', function(){
				stage._clickAction(this, _next);
			}); 
			$.$sprite.ADD('button').append(__layer).attr('className','btn_close').attr('innerHTML','<img src="'+ RESOURCES + LANG +'/common/guide_btn_close.png"/>').addEvent('click', function(){
				stage._clickAction(this, _close);
			});

			stage.addEvent('RK_GUIDE', _open);

			// cookie setting
			var due = 60;
			$.$cookie.SET('RK_MINIGAME_VISTED','TRUE',due);
			if( $.$cookie.GET('RK_MINIGAME_VISTED') == 'TRUE' ){
				if( $.$cookie.GET('RK_MINIGAME_GUIDE') != 'HIDE' ){
					stage.trigger('RK_GUIDE');
					$.$cookie.SET('RK_MINIGAME_GUIDE','HIDE',due);
				}
			}
		});
	})();


	// layer : alert ==========================================================================================
	(function(){
		var __alert = $.$sprite.ADD('div').attr('className','layer').attr('innerHTML','<div class="dimmed"></div>\
			<div class="alert">\
				<img class="bg" src="'+ RESOURCES +'common/layer/alert_bg.png" />\
				<div class="cont">\
					<div class="comment"></div>\
					<div class="btnArea">\
						<button class="btn collection"><img src="'+ RESOURCES + LANG + 'common/layer/alert_btn_collection.png" /></button>\
						<button class="btn ally"><img src="'+ RESOURCES + LANG + 'common/layer/alert_btn_ally.png" /></button>\
						<button class="btn shop"><img src="'+ RESOURCES + LANG + 'common/layer/alert_btn_shop.png" /></button>\
						<button class="btn cancel"><img src="'+ RESOURCES + LANG + 'common/layer/alert_btn_cancel2.png" /></button>\
						<button class="btn close"><img src="'+ RESOURCES + LANG + 'common/layer/alert_btn_close.png" /></button>\
						<button class="btn confirm"><img src="'+ RESOURCES + LANG + 'common/layer/alert_btn_confirm2.png" /></button>\
					</div>\
				</div>\
			</div>'),
			__message = $.$sprite.ADD($.$find(__alert, '.comment')),
			__btnConfirm = $.$sprite.ADD($.$find(__alert, 'button.confirm')),
			__btnCancel = $.$sprite.ADD($.$find(__alert, 'button.cancel')),
			__btnClose = $.$sprite.ADD($.$find(__alert, 'button.close')),
			__btnGuild = $.$sprite.ADD($.$find(__alert, 'button.ally')),
			__btnShop = $.$sprite.ADD($.$find(__alert, 'button.shop')),
			__btnGotoCollection = $.$sprite.ADD($.$find(__alert, 'button.collection')),
			__callback;

		function _open($text, $callback, $type){
			__message.attr('innerHTML', $text);
			__callback = $callback;

			__btnConfirm.style({display:'none'});
			__btnGuild.style({display:'none'});
			__btnShop.style({display:'none'});
			__btnCancel.style({display:'none'});
			__btnClose.style({display:'none'});
			__btnGotoCollection.style({display:'none'});

			if($type == 'guild'){
				__btnGuild.style({display:'inline-block'});
				__btnClose.style({display:'inline-block'});
			}else if($type == 'shop'){
				__btnShop.style({display:'inline-block'});
				__btnCancel.style({display:'inline-block'});
			}else if($type == 'notify'){
				__btnConfirm.style({display:'inline-block'});
			}else{
				if( typeof __callback == 'function' ) __btnCancel.style({display:'inline-block'});
				__btnConfirm.style({display:'inline-block'});
			}
			__alert.style({display:'block'});
		}
		function _loginGuide(){
			__message.attr('innerHTML', $TXT.common.alert.notLogin);
			__callback = function(){
				location.href = LOGINLINK;
			};

			__btnConfirm.style({display:'inline-block'});
			__btnShop.style({display:'none'});
			__btnGotoCollection.style({display:'none'});
			__btnGuild.style({display:'none'});
			__btnCancel.style({display:'none'});
			__btnClose.style({display:'none'});

			__alert.style({display:'block'});
		}
		function _guildGuide(){
			__message.attr('innerHTML', $TXT.common.alert.notGuild);

			__btnConfirm.style({display:'none'});
			__btnShop.style({display:'none'});
			__btnGotoCollection.style({display:'inline-block'});
			__btnGuild.style({display:'inline-block'});
			__btnCancel.style({display:'none'});
			__btnClose.style({display:'none'});

			__alert.style({display:'block'});
		}

		__btnConfirm.addEvent('click', function(){
			stage._clickAction(this, function(){
				__alert.style({display:'none'});
				if(typeof __callback == 'function') __callback.call();
			});
		});
		__btnCancel.addEvent('click', function(){
			stage._clickAction(this, function(){
				__alert.style({display:'none'});
				__callback = null;
			});
		});
		__btnClose.addEvent('click', function(){
			stage._clickAction(this, function(){
				__alert.style({display:'none'});
				__callback = null;
			});
		});
		__btnGotoCollection.addEvent('click', function(){
			stage._clickAction(this, function(){
				location.href = GAMELINK[0];
			});
		});
		__btnGuild.addEvent('click', function(){
			stage._clickAction(this, function(){
				// __alert.style({display:'none'});
				__callback = null;
				// 혈맹 가입 화면으로 이동
				stage._openPage(GUILDJOINLINK);
			});
		});
		__btnShop.addEvent('click', function(){
			stage._clickAction(this, function(){
				__alert.style({display:'none'});
				__callback = null;
				// 포인트샵으로 이동
				// location.href = POINTSHOPLINK;
				stage._openPage(POINTSHOPLINK);
			});
		});

		$.$init(function(){
			__alert.append( $.$find('.wrapper') ).style({display:'none'});

			stage.addEvent('RK_ALERT', function($w,$options){
				_open($options.text, $options.callback, $options.type);
			});
			stage.addEvent('RK_LOGIN', _loginGuide);
			stage.addEvent('RK_ALERT_GUILD', _guildGuide);

			// check login
			if(!LOGIN) _loginGuide();
		});
	})();


	// layer : loading ==========================================================================================
	(function(){
		var __loading = $.$sprite.ADD('div').attr('className','layer'), __timer;
		__loading.attr('innerHTML','<div class="dimmed"></div><img src="'+ RESOURCES +'common/loading.gif" class="loading" />');

		function _open(){
			__loading.style({display:'block'});
			clearTimeout(__timer);
			__timer = setTimeout(function(){
				__loading.style({display:'none'});
				stage.trigger('RK_ALERT', {
					text: $TXT.common.alert.badNetwork,
					callback: function(){
						location.reload();
					}
				});
			}, 5000);
		}
		function _close(){
			clearTimeout(__timer);
			__loading.style({display:'none'});
		}

		stage.addEvent('RK_LOADING', _open);
		stage.addEvent('RK_LOADING_COMPLETE', _close);

		$.$init(function(){
			__loading.append( $.$find('.wrapper') ).style({display:'none'});
		});
	})();

})(ncjs);