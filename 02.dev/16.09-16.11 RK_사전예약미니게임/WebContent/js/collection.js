(function ($){
	var $TXT = RK_RESOURCES;
	var DATALINK = $TXT.data;
	var RESOURCES = $TXT.img;
	var LANG = $TXT.lang;
	var ISMOTION = false;
	var MONSTERINFO = $TXT.collection.monsterInfo;

	// DATA CTRL
	(function(){
		
		function _getMonsterData($callback){
			stage._data({
				url: DATALINK + 'collection/monster',
				complete: function(res){
					stage.trigger('RK_COL_MONSTER_DATA', res);
					if( typeof $callback == 'function' ) $callback.call($callback, $res);
				}
			});
		}
		function _getPickResult($callback){
			stage.collectionPick = {
				isRoll:true,
				isOpen:false,
				result:{}
			};
			
			stage._data({
				url: DATALINK + 'collection/monster',
				method: 'post',
				complete: function(res){
					stage.collectionPick.result = res;
					getRank(stage.collectionPick.result);
				}
			});
			
			function getRank($data){
				stage._data({
					url: DATALINK + 'collection/monster/reservation',
					parameters: {id:$data.monsterId},
					complete: function(res){
						$data.rank = res;
						if(stage.collectionPick.isRoll || stage.collectionPick.isOpen) return;
						stage.trigger('RK_COL_MONSTER_PICK_RESULT_LATE', $data);
					}
				});
			}
		}
		function _getMonsterReservation($id,$callback){
			var sample = {monsterCount:0,monsterRank:null},
				level = stage.monsterList[$id-1].level;
			if( stage.hasGuild && level > 0 ){
				stage._data({
					url: DATALINK + 'collection/monster/reservation',
					parameters: {id:$id},
					complete: function(res){
						var response = res.monsterCount ? res : sample;
						stage.trigger('RK_COL_GUILD_RESERVE_DATA', response);
					}
				});
			}else{
				stage.trigger('RK_COL_GUILD_RESERVE_DATA', sample);
			}
		}
		function _setMonsterReservation($id,$callback){
			if( stage.monsterReservation == $id-1 ) return;
			var monster = MONSTERINFO;
			
			if( typeof stage.monsterReservation == 'number' ){
				_cancelMonsterReservation(stage.monsterReservation+1, set);
			}else{
				set();
			}

			function set(){
				stage.trigger('RK_LOADING');
				stage._data({
					url: DATALINK + 'collection/monster/reservation',
					method: 'post',
					parameters: {id:$id},
					complete: function(res){
						stage.monsterReservation = $id - 1;
						stage.trigger('RK_COL_RESERVATION_COMPLETE', res);
						stage.trigger('RK_LOADING_COMPLETE');
						if( typeof $callback == 'function' ) $callback.call($callback, res);
					}
				});
			}
		}
		function _cancelMonsterReservation($id,$callback){
			if(stage.monsterReservation != $id-1) return;

			stage.trigger('RK_LOADING');
			stage._data({
				url: DATALINK + 'collection/monster/reservation',
				method: 'delete',
				parameters: {id:$id},
				complete: function(res){
					stage.monsterReservation = null;
					stage.trigger('RK_COL_RESERVATION_COMPLETE', res);
					stage.trigger('RK_LOADING_COMPLETE');
					if( typeof $callback == 'function' ) $callback.call($callback, res);
				}
			});
		}

		stage.addEvent('RK_COL_MONSTER_SELECT', function($w,$monster){
			_getMonsterReservation( $monster.index + 1 );
		});
		stage.addEvent('RK_COL_RESERVATION_SET', function($w,$index){
			_setMonsterReservation( $index + 1 );
		});
		stage.addEvent('RK_COL_RESERVATION_REMOVE', function($w,$index){
			_cancelMonsterReservation( $index + 1 );
		});
		stage.addEvent('RK_COL_MONSTER_PICK', _getPickResult);
		stage.addEvent('RK_COL_MONSTER_PICK_COMPLETE', function(){
			stage.trigger('RK_USER');
		});
		// test
		stage.addEvent('RK_COL_TICKET_ADD', function(){
			stage.trigger('RK_USER');
		});

		stage.addEvent('RK_USER_COMPLETE', _getMonsterData);
	})();


	// SHOWWINDOW
	(function(){
		var __currentIndex, __container, __infoArea, __starArea, __btnReserve, __btnDetail, __name, __guildCount,
			__largeImage = $.$sprite.ADD('img').attr('className','image'),
			__monsterInfo = MONSTERINFO;

		function _render($w,$data){
			var monster = stage.currentMonster,
				star = '';

			for(var i=0; i<monster.level; i++){
				star += '<img src="'+ RESOURCES +'collection/show_character_star.png" />';
			}
			__starArea.attr('innerHTML', star);

			__name.attr('src',''+ RESOURCES + LANG + 'collection/monster/'+ monster.index +'/show_name.png');
			__largeImage.attr('src',''+ RESOURCES +'collection/monster/'+ monster.index +'/show_large.png').attr('className','image');
			__largeImage.attr('className','image ani_wave');
			__guildCount.attr('innerHTML', $TXT.collection.show.choice.replace(/{{{guildCount}}}/g,$data.monsterCount) );

			__btnDetail.style({display:'block'});
			__btnReserve.style({display:'block'}).alpha(1);

			if( monster.level == 0 ){
				__largeImage.attr('src',''+ RESOURCES +'collection/show_large_disable.png').attr('className','image');
				__name.attr('src',''+ RESOURCES +'collection/show_name_disable.png');
				__guildCount.attr('innerHTML', $TXT.collection.show.notMy);
				__btnDetail.style({display:'none'});
				__btnReserve.style({display:'none'});
			}

			if( monster.level > 0 && !stage.hasGuild ){
				__guildCount.attr('innerHTML', $TXT.collection.show.notGuild);
			}

			if( monster.level < 3 ){
				__btnReserve.alpha(0.3);
			}

			if( monster.index == stage.monsterReservation ){
				$.$sprite.ADD($.$find(__btnReserve,'img')).attr('src',''+ RESOURCES + LANG + 'collection/show_btn_reserve_on.png');
			}else{
				$.$sprite.ADD($.$find(__btnReserve,'img')).attr('src',''+ RESOURCES + LANG + 'collection/show_btn_reserve.png');
			}

			__infoArea.style({display:'block'});
		}
		function _toggleElite(){
			if( stage.currentMonster.level < 1 ) return;
			var url = __largeImage.attr('src'), key = '_elite';
			if( url.indexOf(key) > -1 ){
				url = url.replace(key,'');
			}else{
				url = url.replace('.png', key+'.png');
			}
			__largeImage.attr('src', url);
		}
		function _reserve($w,$index){
			// $index 가 들어올 경우 해단 소환수 예약
			var msg, action, index = $index;
			if(typeof index != 'number') index = stage.currentMonster.index;

			// 이벤트 기간 종료
			if(stage.MINIGAMEEND){
				stage.trigger('RK_ALERT', {text: $TXT.common.alert.minigameEnd});
				return;
			}

			if( stage.monsterReservation == index ){
				// 소환수 예약 취소하기
				// msg = __monsterInfo[index].monsterName + ' 예약을 취소하시겠습니까?';
				// action = function(){
				// 	stage.trigger('RK_COL_RESERVATION_REMOVE', index);
				// 	__guildCount.attr('innerHTML', parseInt(__guildCount.attr('innerHTML'))-1 + __selectMsg);
				// };
				return;
			}else{
				// 소환수 예약하기
				if( typeof stage.monsterReservation == 'number' ){
					msg = $TXT.collection.show.reserveChange.replace(/{{{beforeName}}}/g,__monsterInfo[stage.monsterReservation].monsterName).replace(/{{{monsterName}}}/g,__monsterInfo[index].monsterName);
				}else{
					msg = $TXT.collection.show.reserve.replace(/{{{monsterName}}}/g, __monsterInfo[index].monsterName);
				}
				action = function(){
					stage.trigger('RK_COL_RESERVATION_SET', index);
					if(stage.hasGuild){
						__guildCount.attr('innerHTML', $TXT.collection.show.choice.replace(/{{{guildCount}}}/g, parseInt(__guildCount.attr('innerHTML'))+1) );
					}else{
						__guildCount.attr('innerHTML', $TXT.collection.show.reserveNotGuild);
					}
				};
			};

			if( typeof $index != 'number' && stage.currentMonster.level < 3 ){
				msg = $TXT.collection.show.reserveFail;
				action = null;
			}

			stage.trigger('RK_ALERT', {
				text: msg,
				callback: action
			});
		}

		stage.addEvent('RK_COL_GUILD_RESERVE_DATA', _render);
		stage.addEvent('RK_COL_RESERVATION_COMPLETE', function($w,$data){
			if($data.result){
				var link = RESOURCES + LANG +'collection/show_btn_reserve.png';
				if( stage.currentMonster.index == stage.monsterReservation ) link = RESOURCES + LANG +'collection/show_btn_reserve_on.png';

				$.$sprite.ADD($.$find(__btnReserve,'img')).attr('src', link);
			}
		});

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.showwindow'));
			__infoArea = $.$sprite.ADD($.$find(__container, '.info')).style({display:'none'});
			__starArea = $.$sprite.ADD($.$find(__infoArea, '.stars'));
			__name = $.$sprite.ADD($.$find(__infoArea, '.name'));
			__guildCount = $.$sprite.ADD($.$find(__infoArea, '.ally .text'));
			__largeImage.append($.$find(__container,'.character'));
			__btnReserve = $.$sprite.ADD($.$find(__container,'.btn_reserve'));
			__btnDetail = $.$sprite.ADD($.$find(__container,'.btn_detail'));

			__largeImage.addEvent('click', _toggleElite);
			__btnReserve.addEvent('click', function(){
				if(ISMOTION) return;
				stage._clickAction(this, _reserve);
			});
			__btnDetail.addEvent('click', function(){
				if(ISMOTION) return;
				stage._clickAction(this);
				stage.trigger('RK_COL_DETAIL');
				BUFFLOG('btn_detail','monster_'+stage.currentMonster.index);
			});

			stage.addEvent('RK_COL_BTN_RESERVE', _reserve);
		});
	})();


	// monster list
	var Monster = function($index){
		var self = this;
		self.index = $index;
		self.level = 0;
		self.dom = $.$sprite.ADD('div');
		self.dom.attr('className', 'smn ani_new');
		self.image = $.$sprite.ADD('img').attr('className','icon image').attr('src',''+ RESOURCES +'collection/smn_icon_disable.png').append(self.dom);
		self.cover = $.$sprite.ADD('img').attr('className','icon cover').attr('src',''+ RESOURCES +'collection/smn_icon_cover.png').append(self.dom);
		self.starArea = $.$sprite.ADD('div').attr('className','stars').append(self.dom);
		$.$sprite.ADD('img').attr('src',''+ RESOURCES +'collection/smn_icon_size.png').append(self.dom);

		self.dom.addEvent('click', function(){
			if(ISMOTION) return;
			stage.index = self.index;
			stage.currentMonster = self;
			stage.trigger('RK_COL_MONSTER_SELECT', self);
			stage._sound('click');
			BUFFLOG('btn_summonlist','monster_'+self.index);
		});
	};
	Monster.prototype = {
		add: function($target){
			this.dom.append($target);
		},
		active: function(){
			this.image.attr('src',''+ RESOURCES +'collection/monster/'+ this.index +'/list_monster_on.png');
			this.cover.attr('src', ''+ RESOURCES +'collection/smn_icon_cover_on.png');
			this.star();
		},
		star: function(){
			if( this.level > 3 ) return; 
			$.$sprite.ADD('img').attr('className','ani_add').attr('src',''+ RESOURCES +'collection/smn_icon_star.png').append(this.starArea);
		},
		upgrade: function(){
			this.level++;
			if(this.level == 1) this.active();
			else this.star();
		},
		pick: function(){
			var self = this;
			self.level++;
			if(self.level == 1){
				self.active();
				self.dom.attr('className', 'smn ani_turn');
				setTimeout(function(){
					self.dom.attr('className', 'smn');
				}, 500);
			}else{
				self.star();
			}
		}
	};

	(function(){
		var __container, __isFirst = true,
			__selector = $.$sprite.ADD('img').attr('className','icon border ani_select').attr('src',''+ RESOURCES +'collection/smn_icon_border.png'),
			__checker = $.$sprite.ADD('img').attr('className','icon check').attr('src',''+ RESOURCES +'collection/smn_icon_check.png'),
			__reserveFlag = $.$sprite.ADD('img').attr('className','icon reserve ani_select').attr('src',''+ RESOURCES + LANG + 'collection/smn_icon_reserve.png'),
			__list = [], __firstShow, __isRolling = false;

		for(var i=0; i<30; i++){
			__list.push(new Monster(i));
		}

		function _setData($w, $data){
			stage.pickCounter = 0;
			$.$each($data, function($item,$i){
				var monster = __list[$i],
					diff = $item.level-monster.level;
				stage.pickCounter += $item.level;
				if( $item.reserved ){
					__reserveFlag.append(monster.dom);
					stage.monsterReservation = $i;
					__firstShow = monster;
				}
				if( diff == 0 ) return;
				for(var i=0; i<diff; i++) monster.upgrade();
				__firstShow = __firstShow || monster;
			});
			stage.monsterList = __list;

			if(stage.user.monster > 0 && __isFirst){
				_render();
			}
		}
		function _render(){
			var timer, counter = 0, delay = 20;			
			if(__isFirst){
				__isFirst = false;
				ISMOTION = true;
				(function add(){
					clearTimeout(timer);
					__list[counter].add(__container);
					counter++
					if(counter == __list.length){
						ISMOTION = false;
						if(__firstShow) __firstShow.dom.trigger('click');
						setTimeout(function(){
							$.$each(__list, function($item){
								$item.dom.attr('className','smn');
							});
						},300);
						return;
					}
					timer = setTimeout(add, delay);
				})();
			}else{
				$.$each(__list, function($monster){
					$monster.add(__container);
				});
			}

		}
		function _select($w,$elem){
			var target = $elem.dom;
			__selector.append(target);
			__checker.append(target);
		}
		function _reserve($w,$data){
			if($data.result){
				if( typeof stage.monsterReservation == 'number' ){
					__reserveFlag.append(__list[stage.monsterReservation].dom).style({display:'block'});
				}else{
					__reserveFlag.style({display:'none'});
				}
			}
		}
		function _pick($w,$data){
			__list[$data].pick();
			__list[$data].dom.trigger('click');
			stage._sound('add');
		}
		function _roll($w,$data){
			var timer, counter = 35, delay = 50,
				before = stage.currentMonster ? stage.currentMonster.index : 0, now;

			_setMonsterClass('ani_shake');
			stage._sound('rolling');
			(function fr(){
				clearTimeout(timer);
				$data = stage.collectionPick.result;
				now = counter < 3 && $data.monsterId ? $data.monsterId-1 : getNext(before);
				_select({}, __list[now]);
				before = now;
				counter--;
				if(counter < 5) delay += 100;
				if(counter == 0){
					stage.collectionPick.isRoll = false;
					if(!$data.monsterId) return;
					_setMonsterClass('');
					stage.trigger('RK_COL_LAYER_RESULT', $data);
				}else{
					timer = setTimeout(fr, delay);
				}
			})();

			function getNext($except){
				var output = parseInt(Math.random()*30);
				return output == $except ? getNext($except) : output;
			}
		}
		function _oneMoreRoll($w,$data){
			_select({}, __list[$data.monsterId-1]);
			setTimeout(function(){
				stage.trigger('RK_COL_LAYER_RESULT', $data);
				_setMonsterClass('');
			}, 500);
		}
		function _setMonsterClass($str){
			$str = ' ' + $str;
			$.$each(__list, function($mon){
				$mon.dom.attr('className', 'smn' + $str);
			});
		}

		stage.addEvent('RK_COL_MONSTER_DATA', _setData);
		stage.addEvent('RK_COL_MONSTER_SELECT', _select);
		stage.addEvent('RK_COL_MONSTER_PICK', _roll);
		stage.addEvent('RK_COL_MONSTER_PICK_RESULT_LATE', _oneMoreRoll);
		stage.addEvent('RK_COL_MONSTER_PICK_COMPLETE', _pick);
		stage.addEvent('RK_COL_RESERVATION_COMPLETE', _reserve);
		stage.addEvent('RK_COL_START', _render);

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.summonsList'));
		});
	})();

	// roulette
	(function(){
		var __container, __btnPick, __btnTicket, __btnTicketImg, __ticketCounter, __roulette = $.$sprite.ADD('div');

		function _render($w,$data){
			__ticketCounter = stage.user.ticket;
			_setTicketCounter(__ticketCounter);
			
			if(__ticketCounter == 0 && (typeof _isProfileKr != 'undefined' && _isProfileKr.toString() == 'true') ){
				__btnTicketImg.attr('src', RESOURCES + LANG + 'collection/container_pickArea_btn_ticket_on.png');
			}else{
				__btnTicketImg.attr('src', RESOURCES + LANG + 'collection/container_pickArea_btn_ticket.png');
			}
		}
		function _setTicketCounter($num){
			$.$sprite.ADD($.$find(__btnPick,'p')).attr('innerHTML', $TXT.collection.pick.pickBtn + '<span> x</span>');
			$.$sprite.ADD($.$find(__btnPick,'span.num')).attr('innerHTML', $num);
		}
		function _reduceCount($w,$data){
			_setTicketCounter(--__ticketCounter);
		}

		stage.addEvent('RK_USER_COMPLETE', _render);
		stage.addEvent('RK_COL_TICKET_UPDATE', _render);
		stage.addEvent('RK_COL_MONSTER_PICK', _reduceCount);

		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.container'));
			__btnPick = $.$sprite.ADD($.$find(__container, '.pickArea .btn_pick'));
			__btnTicket = $.$sprite.ADD($.$find(__container, '.pickArea .btn_ticket'));
			__btnTicketImg = $.$sprite.ADD($.$find(__btnTicket, 'img'));
			__roulette = $.$sprite.ADD('div').attr('className','roulette').append(__container);

			__btnPick.addEvent('click', function(){
				stage._clickAction(this, function(){
					// 이벤트 기간 종료
					if(stage.MINIGAMEEND){
						stage.trigger('RK_ALERT', {text: $TXT.common.alert.minigameEnd});
						return;
					}
					// 소환 티켓이 없는 경우
					if(__ticketCounter < 1){
						stage.trigger('RK_ALERT', {text: $TXT.collection.pick.ticketZero});
						return;
					}
					// 모두 소환한 경우
					if(stage.pickCounter >= 90){
						stage.trigger('RK_ALERT', {text: $TXT.collection.pick.monsterFull});
						return;
					}
					if(ISMOTION) return;
					ISMOTION = true;
					stage.trigger('RK_COL_MONSTER_PICK');
					BUFFLOG('btn_pick');
				});
			});
			__btnTicket.addEvent('click', function(){
				stage._clickAction(this, function(){
					if(ISMOTION) return;
					stage.trigger('RK_COL_LAYER_TICKET');
					BUFFLOG('btn_ticket');
				});
			});

			if(typeof _isProfileKr != 'undefined' && _isProfileKr.toString() == 'true'){
				__btnTicket.visible(true);
			}else{
				__btnTicket.visible(false);
			}
		});
	})();

	// RESULT
	(function(){
		var __pickIndex, __pickLevel, __pickRank, __container, __layer, __imageArea, __messageArea, __textAreaTitle, __textAreaDesc, __starArea, __daggerArea, __rankArea, __btnReserve, __monsterInfo = MONSTERINFO;

		function _open($w,$result){
			var starStr = '', lev = '';

			$result = stage.collectionPick.result;

			__pickIndex = $result.monsterId - 1;
			__pickLevel = $result.level;
			__pickRank = $result.rank.monsterRank;

			if(__pickLevel > 1) lev = '_v' + __pickLevel;			
			__imageArea.attr('src', RESOURCES + 'collection/monster/'+ __pickIndex + '/result_image.png');
			if(typeof _isProfileKr != 'undefined' && _isProfileKr.toString() == 'true'){
				__messageArea.attr('innerHTML', breakWord($TXT.collection.monsterInfo[__pickIndex]['message0' + __pickLevel]));
			}else{
				__messageArea.attr('innerHTML', $TXT.collection.monsterInfo[__pickIndex]['message0' + __pickLevel]);
			}
			__textAreaTitle.attr('innerHTML', $TXT.collection.pick['result' + __pickLevel].replace(/{{{monsterName}}}/g, $TXT.collection.monsterInfo[__pickIndex].monsterName));
			__textAreaDesc.attr('innerHTML', $TXT.collection.monsterInfo[__pickIndex].description);

			for(var i=0; i<__pickLevel; i++){
				starStr += '<img src="'+ RESOURCES +'collection/show_character_star.png" />';
			}
			__starArea.attr('innerHTML', starStr);

			__daggerArea.attr('innerHTML', '+' + $result.point + '');
			__rankArea.attr('innerHTML', __pickRank ? __pickRank + '' : '-');

			if(__pickLevel > 2){
				__btnReserve.style({display:'block'});
			}else{
				__btnReserve.style({display:'none'});
			}

			// TODO : 추가보상 확인  ====================================================================================================
			if(__pickLevel == 1){
				if(stage.user.monster == 0){
					// 첫 뽑기 보상
					stage.trigger('RK_ALERT', {
						text: $TXT.collection.pick.first,
						type: 'shop'
					});
				}
				if(stage.user.monster%5 == 4){
					// 5단위 추가 보상 
					stage.trigger('RK_ALERT', {
						text: $TXT.collection.pick.section.replace(/{{{monsterCount}}}/g, stage.user.monster+1)
					});
				}
			}
			if(__pickLevel == 3){
				// 3성 달성 보상
				stage.trigger('RK_ALERT', {
					text: $TXT.collection.pick.level
				});
				BUFFLOG('btn_reserve','monster_'+__pickIndex);
			}

			stage.collectionPick.isOpen = true;
			__container.style({display:'block'});
			__layer.attr('className', 'detailpop ani_new');
			setTimeout(function(){
				__layer.attr('className', 'detailpop');
			},300);

			// 국문에 word-break:break-word 적용
			function breakWord($str){
				var output = $str.replace(/ /gi, '</span> <span style="white-space:nowrap;">');
				return '<span style="white-space:nowrap;">'+ output + '</span>';
			}
		}
		function _shareSns(){
			var info = __monsterInfo[__pickIndex];
			stage._clickAction(this, function(){
				var tit, dec, msg, last, img;
				tit = $TXT.collection.pick.shareSnsTit.replace(/<br>/g, '').replace(/{{{monsterName}}}/g, info.monsterName);
				msg = info.monsterName + ' : ' + info.message01.replace(/<br>/g, '');
				dec = $TXT.collection.pick.shareSnsDec.replace(/<br>/g, '').replace(/{{{monsterName}}}/g, info.monsterName);
				last = $TXT.collection.pick.shareSnsLast; 
				img = RESOURCES + 'collection/monster/' + __pickIndex +'/share_image.jpg';
				
				stage.trigger('RK_SHARE_SNS', {$tit:tit, $msg:msg, $dec:dec, $last:last, $img:img});
				BUFFLOG('btn_sns_share','monster_'+__pickIndex);
			});
		}
		function _shareGuild(){
			var info = __monsterInfo[__pickIndex];
			stage._clickAction(this, function(){
				var tit, dec, monster;
				tit = $TXT.collection.pick.shareGuildTit.replace(/{{{monsterName}}}/g, info.monsterName);
				monster = info.description;
				dec = $TXT.collection.pick.shareGuildDec.replace(/<br>/g, '').replace(/{{{monsterName}}}/g, info.monsterName);
				
				stage.trigger('RK_SHARE_GUILD', {$tit:tit, $monster:monster, $dec:dec});
				BUFFLOG('btn_guild_share','monster_'+__pickIndex);
			});
		}
		function _reservation(){
			stage._clickAction(this);
			if( stage.monsterReservation == __pickIndex ){
				stage.trigger('RK_ALERT', {text: $TXT.collection.pick.reserveComplete});
				return;
			}
			stage.trigger('RK_COL_BTN_RESERVE', __pickIndex);
		}
		function _confirm(){
			stage._clickAction(this, function(){
				__container.style({display:'none'});
				ISMOTION = false;
				stage.trigger('RK_COL_MONSTER_PICK_COMPLETE', __pickIndex);
			});
		}

		stage.addEvent('RK_COL_LAYER_RESULT', _open);
		
		$.$init(function(){
			__container = $.$sprite.ADD($.$find('#layer_result'));
			__layer = $.$sprite.ADD($.$find(__container, '.detailpop'));
			__starArea = $.$sprite.ADD($.$find(__container, '.stars'));
			__imageArea = $.$sprite.ADD($.$find(__container, '.image img'));
			__messageArea = $.$sprite.ADD($.$find(__container, '.image .msg'));
			__textAreaTitle = $.$sprite.ADD($.$find(__container, '.text .title'));
			__textAreaDesc = $.$sprite.ADD($.$find(__container, '.text .detail'));
			__daggerArea = $.$sprite.ADD($.$find(__container, '.reward .dagger'));
			__rankArea = $.$sprite.ADD($.$find(__container, '.reward .rank'));
			__btnReserve = $.$sprite.ADD($.$find(__container, '.btnArea .reservation')).addEvent('click', _reservation);

			$.$sprite.ADD($.$find(__container, '.btnArea .sns')).addEvent('click', _shareSns);
			$.$sprite.ADD($.$find(__container, '.btnArea .guild')).addEvent('click', _shareGuild);
			$.$sprite.ADD($.$find(__container, '.btnArea .confirm')).addEvent('click', _confirm);
		});
	})(); 

	// DETAIL
	(function(){
		var __currentIndex, __skillIndex, __isOpen = false,
			__container, __selector = $.$sprite.ADD('img').attr('className','active').attr('src',''+ RESOURCES +'collection/detail_skill_active.png'),
			__btnTab = [], __mainView, __descTitle, __descDetail, __speechArea, __monsterInfo = MONSTERINFO;

		function _render($w,$index){
			__currentIndex = stage.index;
			
			__speechArea.attr('innerHTML', $TXT.collection.monsterInfo[__currentIndex].description);

			$.$each(__btnTab, function($item,$i){
				$item.attr('innerHTML', '<img src="'+ RESOURCES +'collection/monster/'+ __currentIndex +'/detail_skill_'+ $i +'_icon.png" />');
				$item.visible( __monsterInfo[__currentIndex].skills[$i].name != '' );
			});

			__isOpen = true;
			__container.style({display:'block'});
			_show(0);
		}
		function _close(){
			_clearView();
			__isOpen = false;
			__container.style({display:'none'});
		}
		function _show($skillNum){
			var videolink = __monsterInfo[__currentIndex].skills[$skillNum].link;
			videolink += '?showinfo=0&autoplay=1&controls=0&rel=0';
			__selector.append( __btnTab[$skillNum] );
			__mainView.attr('innerHTML','<iframe width="100%" height="100%" src="'+ videolink +'" frameborder="0" allowfullscreen></iframe>');
			__descTitle.attr('innerHTML', $TXT.collection.monsterInfo[__currentIndex].skills[$skillNum].name);
			__descDetail.attr('innerHTML', $TXT.collection.monsterInfo[__currentIndex].skills[$skillNum].detail);
			__skillIndex = $skillNum;
		}
		function _clearView(){
			if( !__isOpen ) return;
			__mainView.attr('innerHTML','');
		}
		function _shareSns(){
			var info = __monsterInfo[__currentIndex];
			stage._clickAction(this, function(){
				var tit, dec, msg, last, img;
				tit = $TXT.collection.pick.shareSnsTit.replace(/<br>/g, '').replace(/{{{monsterName}}}/g, info.monsterName);
				msg = info.monsterName + ' : ' + info.message01.replace(/<br>/g, '');
				dec = $TXT.collection.pick.shareSnsDec.replace(/<br>/g, '').replace(/{{{monsterName}}}/g, info.monsterName);
				last = $TXT.collection.pick.shareSnsLast; 
				img = RESOURCES + 'collection/monster/' + __currentIndex +'/share_image.jpg';
				
				stage.trigger('RK_SHARE_SNS', {$tit:tit, $msg:msg, $dec:dec, $last:last, $img:img});
				BUFFLOG('btn_sns_share','monster_'+stage.currentMonster.index);
			});
			_clearView();
		}
		function _shareGuild(){
			var info = __monsterInfo[__currentIndex];
			stage._clickAction(this, function(){
				var tit, dec, monster;
				tit = $TXT.collection.pick.shareGuildTit.replace(/<br>/g, '').replace(/{{{monsterName}}}/g, info.monsterName);
				monster = info.message01;
				dec = $TXT.collection.pick.shareGuildDec.replace(/<br>/g, '').replace(/{{{monsterName}}}/g, info.monsterName);
				
				stage.trigger('RK_SHARE_GUILD', {$tit:tit, $monster:monster, $dec:dec});
				BUFFLOG('btn_guild_share','monster_'+stage.currentMonster.index);
			});
			_clearView();
		}

		
		$.$init(function(){
			__container = $.$sprite.ADD($.$find('.container .detailView'));
			__speechArea = $.$sprite.ADD($.$find(__container, '.speech .comment'));
			__mainView = $.$sprite.ADD($.$find(__container, '.skills .video .mainView'));
			__descTitle = $.$sprite.ADD($.$find(__container, '.skills .desc .title'));
			__descDetail = $.$sprite.ADD($.$find(__container, '.skills .desc .detail'));

			for(var i=0; i<3; i++){
				var btn = $.$sprite.ADD('button').attr('className','btn_skill').append($.$find(__container, '.skills .video .iconSelect'));
				btn.index = i;
				btn.addEvent('click', function(){
					stage._clickAction(this);
					_show(this.index);
				});
				__btnTab.push( btn );
			}

			$.$sprite.ADD($.$find(__container, '.btnArea .sns')).addEvent('click', _shareSns);
			$.$sprite.ADD($.$find(__container, '.btnArea .guild')).addEvent('click', _shareGuild);
			$.$sprite.ADD($.$find(__container, '.btnArea .close')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});

			stage.addEvent('RK_COL_DETAIL', function($w,$index){
				if( __container.style('display') == 'block' ){
					_close();
				}else{
					_render($w,$index);
				}
			});
			// IE11C iFrame bug fix
			stage.addEvent('RK_ALERT', _clearView);
			stage.addEvent('RK_GUIDE', _clearView);
			stage.addEvent('RK_RANKING', _clearView);
		});
	})();

	// FIRST
	(function(){
		var cover, isStart = false;
		
		$.$init(function(){
			cover = $.$sprite.ADD($.$find('#layer_first')).addEvent('click', function(){
				if(!stage.user) return;
				if(isStart) return;
				isStart = true;
				cover.attr('className', 'layer ani_destroy');
				stage.trigger('RK_COL_START');
				setTimeout(function(){
					cover.style({display:'none'});
				}, 550);
			});
		});

		stage.addEvent('RK_USER_COMPLETE', function(){
			if( stage.user.monster > 0 ) return;
			cover.style({display:'block'});
		});
	})();

	// TICKET
	(function(){
		var __layer;

		function _open(){
			__layer.style({display:'block'});
		}
		function _close(){
			__layer.style({display:'none'});
			stage.trigger('RK_COL_TICKET_ADD');
		}


		$.$init(function(){
			__layer = $.$sprite.ADD($.$find('#layer_ticket'));
			$.$sprite.ADD($.$find(__layer, '.btnArea button')).addEvent('click', function(){
				stage._clickAction(this, _close);
			});

			$.$sprite.ADD($.$find(__layer, '.cont a')).addEvent('click', function(){
				var randomValue = Math.random().toString().replace('0.',''), url = this.attr('href');
				if(event.preventDefault){
					event.preventDefault();
				}else{
					event.returnValue = false;
				}
				stage._clickAction(this, function(){
					window.open(url + '&z=' + randomValue, '_blank');
				});
				BUFFLOG('btn_ticketgo');
			});

			stage.addEvent('RK_COL_LAYER_TICKET', _open);
		});
	})();
	
})(ncjs);