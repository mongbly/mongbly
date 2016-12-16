// L10N 적용 
var RK_RESOURCES = {
	data: 'http://opdev.rk.plaync.com/minigame/',
	img: 'http://akstatic.plaync.com/RK/minigame/',
	lang: '_lang/tw/',
	common: {
		// 기본정보 (공유용)
		info: {
			gameName: '天堂 Red Knights',
			url: 'http://asia.nc.com/rk/tw/?rk=2180016',
			image: {
				link: 'http://akstatic.plaync.com/resource/rk/meta/rk_v1103.jpg',
				width: 750,
				height: 594
			},
			hashtags: 'Lineage, LineageRedKnights, RedKnights, 天堂 Red Knights, NCSOFT'
		},
		// 경고 메시지
		alert: {
			// 로그인 하지 않았을 시
			notLogin: '登入後可以進行遊戲。',
			// 혈맹 가입하지 않았을 시
			notGuild: '加入血盟才能進行騎士團占領戰及賽跑。 <br>請立即加入血盟！ <br>當然您也可以自行創建！',
			// 네이트워크 상태 불량
			badNetwork: '網路狀態不穩，請重試。',
			// 게임 기간 종료
			minigameEnd: '活動期間已結束。'
		},
		// 랭킹
		ranking: {
			titRank:'排行',
			titGuildName:'血盟名稱',
			titPoint: ['持有召喚獸', '累積占領分數', '累積積分'],
			coinMsg:'發放可於Red Knights遊戲內使用的血盟硬幣給最終排名前50名的玩家。',
			guildInfo: '我的血盟{{{guildName}}}排名為第{{{guildRank}}}名。',
			collection: '持有召喚獸 : {{{count}}}名',
			occupation: '累積占領分數 {{{count}}}分',
			occupationReward: '預計騎士團的標誌：{{{myReward}}}個',
			race: '累積積分 {{{count}}}分',
			notGuild: '無加入的血盟。 <span class="desc">請立即加入血盟！當然您也可以自行創建！</span>'
		},
		// 공유하기
		share: {
			guild: '訊息已分享至血盟聊天室。<br>您現在要移動到聊天室嗎？',
			guildLink: 'http://www.plaync.com/',
			notGuild: '加入血盟後才可使用。',
			rewardTicket: '將發送召喚券作為獎勵。',
			rewardDagger: '將發送{{{daggerCount}}}把短劍作為獎勵。'
		}
	},
	// 기사단 컬렉션
	collection: {
		// 소환수 정보
		monsterInfo: [
			{
				monsterName:"瑪莉亞",
				role	:"物理輸出",
				skills:[
					{name:"強力箭弩",detail:"朝敵人射出強化箭。將魔力集中於箭的尖端，在最近的敵人及其周遭範圍引起爆炸。",link:"https://www.youtube.com/embed/ZWlpwvaXyp8"},
					{name:"六連矢",detail:"使用石弓對生命力最低的敵人發動快速6連射。",link:"https://www.youtube.com/embed/Laz-kE-KuUI"},
					{name:"", detail:"", link:""}
				],
				description:'攻擊生命力低落的敵人並推至後方。<br>三姐妹中的老二，擁有優越實力。<br>天不怕地不怕，行為大膽，所以每次都被團長罵。',
				message01:'「嘖－還真煩。」',
				message02:'「這點程度是最基本的吧？」',
				message03:'「別這麼快感到驚訝，現在才是開始。」',
				condition01:'「瑪莉亞的表情看起來不太一樣，感覺是任何事情都能順利解決的一天。」',
				condition02:'「瑪莉亞的樣子就跟平常一樣。不用擔心呢。」',
				condition03:'「以冷靜聞名的瑪莉亞，不知為何表情凝重。」'
			},
			{
				monsterName:"奧爾加",
				role	:"魔法補師",
				skills:[
					{name:"天光",detail:"以殷海薩的神聖光芒恢復我軍生命。",link:"https://www.youtube.com/embed/KXdMkjoYfTw"},
					{name:"正義之錘",detail:"以正義之錘強擊敵人的腦袋，消滅其技能值。",link:"https://www.youtube.com/embed/ehYOLtn6Bbc"},
					{name:"神的庇護",detail:"利用光之力量，為生命力30%以下的我軍罩上保護屏障。",link:"https://www.youtube.com/embed/FPiLWcvSJME"}
				],
				description:'恢復同伴的生命力及解除有害效果。<br>三姐妹中的老大，與瑪莉亞的個性截然相反。<br>冷靜又成熟，總是先想到同伴。',
				message01:'「願殷海薩的加護永隨。」',
				message02:'「能幫助您是我的榮幸。」',
				message03:'「殷海薩會引導您的。」',
				condition01:'「今天的奧爾加帶著就算是死人都要救活的氣勢。」',
				condition02:'「奧爾加不過是和往常一樣照顧同伴。」',
				condition03:'「從不失去笑容的奧爾加，今天不知怎地很銳利。」'
			},
			{
				monsterName:"伊莉娜",
				role	:"魔法輸出",
				skills:[
					{name:"炸彈投擲",detail:"朝最近的敵人丟擲炸彈，產生巨大爆炸，擊倒範圍內的對象，並中斷其技能。優先攻擊正在施展技能的敵人。",link:"https://www.youtube.com/embed/C0FTjLKytkg"},
					{name:"混濁凝結",detail:"用黏答答的物質覆蓋敵人全身，降低其攻速。",link:"https://www.youtube.com/embed/VVJbMr6tzGI"},
					{name:"", detail:"", link:""}
				],
				description:'引起爆炸，妨礙敵人攻擊。<br>三姐妹中的老么，覺得自己是全世界最聰明的人。<br>隨身攜帶滿滿的手工魔藥，覺得很吃力。',
				message01:'「啊～還真是重啊…」',
				message02:'「呼，好重，要不要喝一瓶魔藥…」',
				message03:'「呼…魔藥越重越珍貴！」',
				condition01:'「製作充分魔藥的伊莉娜看起來非常開朗。」',
				condition02:'「伊莉娜帶了滿滿的魔藥，今天還是很重。」',
				condition03:'「和平常不同，伊莉娜今天很謙虛，這是危險的信號。」'
			},
			{
				monsterName:"伊莉娜",
				role	:"魔法肉盾",
				skills:[
					{name:"防禦姿態",detail:"整頓前排之後，減少我軍受到的魔法傷害。",link:"https://www.youtube.com/embed/w6JdAWkN33M"},
					{name:"護盾強擊",detail:"將全身力量聚集於粗劣的護盾上，強擊敵人。",link:"https://www.youtube.com/embed/qYgPt3dB9Yk"},
					{name:"", detail:"", link:""}
				],
				description:'保護同伴免於魔法傷害。<br>率領骷髏部隊的隊長。<br>對自己的部隊非常自豪。',
				message01:'「只要有純牛奶和鯷魚，我們就是最強的！」',
				message02:'「我們是最強的白色部隊！」',
				message03:'"「不死族連死都不怕！因為已經死過了！」',
				condition01:'「史巴托的表情充滿信心，難道已經備好純牛奶和鯷魚了！？」',
				condition02:'「史巴托在想什麼呢？對他的心事感到好奇。」',
				condition03:'「可以確定的是，史巴托的身體狀況不好。」'

			},
			{
				monsterName:"黑騎士",
				role	:"物理肉盾",
				skills:[
					{name:"重擊",detail:"使用盾牌強擊前方敵人，擊退敵人並中斷其技能被擊退的敵人可能會暈眩",link:"https://www.youtube.com/embed/o3NE8Lo_k-M"},
					{name:"增幅防禦",detail:"盾牌圍繞於自身周圍，減少自己所受到的所有傷害。",link:"https://www.youtube.com/embed/EePUehgp4zE"},
					{name:"", detail:"", link:""}
				],
				description:'利用盾牌將敵人推開，封鎖攻擊。<br>從海盜時期就和克特一路走來的團員，團隊意識強烈。<br>克特為了反王肯恩獻上性命，黑騎士則為了克特犧牲奉獻。',
				message01:'「別想碰克特大人一根寒毛！」',
				message02:'「克特大人所經之處便是路。」',
				message03:'「為了克特大人的旗幟，賭上我的性命！」',
				condition01:'「黑騎士滿臉笑容，就像縱橫大海那時一樣。」',
				condition02:'「黑騎士一如往常默默地等待著克特的命令。」',
				condition03:'「頭盔下的黑騎士表情肯定很凝重，我能感覺到！」'
			},
			{
				monsterName:"蛇女",
				role	:"魔法輸出",
				skills:[
					{name:"尾擊",detail:"朝著敵人強力的揮動尾巴。",link:"https://www.youtube.com/embed/ASFkcKZQdKM"},
					{name:"塗毒武器", detail:"在我軍的武器上塗毒，增加其暴擊率。",link:"https://www.youtube.com/embed/9cBi_67EkmY"},
					{name:"死亡之吻",detail:"丟出有劇毒的球體，造成傷害並使敵人中毒若有石化狀態的敵人時會直接命中。",link:"https://www.youtube.com/embed/SMXIDii5-5w"}
				],
				description:'追擊處於石化狀態的敵人。 <br>夢想著談一場美好的戀愛而誘惑前來湖邊遊玩的男子。 <br>但似乎不太順利所以一直是單身。',
				message01:'「唉呀~你真是帥氣呀~」',
				message02:'「希望能與你一起在美麗的湖邊散步。」',
				message03:'「要一起眺望著美麗的湖景並共進佳餚嗎？」',
				condition01:'「今天的蛇女還真是美麗呀！」',
				condition02:'「蛇女正在尋找著美麗的愛情。和往常一樣。」',
				condition03:'「似乎沒有喜愛的對象。蛇女的表情不太高興。」'
			},
			{
				monsterName:"狼人",
				role	:"物理輸出",
				skills:[
					{name:"影子奇襲",detail:"躲進影子裡，對距離最遠的敵人施予奇襲攻擊。",link:"https://www.youtube.com/embed/eFX1HB71_So"},
					{name:"狩獵名將",detail:"朝著獵物迅速準確地揮動鈍器。",link:"https://www.youtube.com/embed/7jM1cx1V3mM"},
					{name:"", detail:"", link:""}
				],
				description:'敏捷地鑽入敵人後方並攻擊。<br>在絕境中掙扎時，被萊肯咬到而變成狼人。<br>幸運活了下來後，為了報恩踏上旅程。',
				message01:'「若是為了種族的命運。」',
				message02:'「人類？不，我是狼人。」',
				message03:'「報恩才是萊肯族的光榮。」',
				condition01:'「有信心能報恩的狼人，看起來是這麼地開朗啊！」',
				condition02:'「狼人過著和昨天相似的一天。」',
				condition03:'「是因為種族的命運嗎？狼人看起來壓力很大。」'
			},
			{
				monsterName:"侏儒劍士",
				role	:"物理輸出肉盾",
				skills:[
					{name:"劈砍大地",detail:"使力量集中於劍上，一口氣劈砍眾多敵人對主要能力值為敏捷的敵人造成追加傷害。",link:"https://www.youtube.com/embed/PXdl5vIPIFg"},
					{name:"沉重之擊",detail:"對敵人施加刺殺攻擊對主要能力值為敏捷的敵人造成追加傷害。",link:"https://www.youtube.com/embed/gv3FxithyfI"},
					{name:"", detail:"", link:""}
				],
				description:'大力砍擊前方的敵人。<br>被里佛賓奪去最優秀的鐵匠寶位之後，<br>為了超越他，在大陸旅行尋找新的礦物。',
				message01:'「最棒的鐵匠是我！」',
				message02:'「哼！我的精煉技術不斷精進！」',
				message03:'「我的武器才是全世界最強的。里佛賓的才不是！」',
				condition01:'「侏儒劍士如果獲得傳說級武器的話，心情肯定是超棒的啊。」',
				condition02:'「雖然是侏儒劍士的武器，但今天看起來沒那麼特別。」',
				condition03:'「今天製作的武器不好，侏儒劍士的心情也格外糟。」'
			},
			{
				monsterName:"食人妖精王",
				role	:"物理肉盾",
				skills:[
					{name:"摧毀大地",detail:"跌坐地面引起地震，使敵人倒地並中斷其技能。",link:"https://www.youtube.com/embed/vxLDJebU7I4"},
					{name:"揮舞武器",detail:"如羽毛般輕輕揮動自己的武器。",link:"https://www.youtube.com/embed/S4PvcW5S8Zs"},
					{name:"", detail:"", link:""}
				],
				description:'使用強力的地面攻擊擊倒敵人。<br>老二因狼人而死後，只要看到他們就會怒不可遏。<br>守護么弟\'食人妖精\'是現在的人生目標。',
				message01:'「別碰我的弟弟！」',
				message02:'「狼人…我不會…忘記你們的。」',
				message03:'「一定要守護么弟。」',
				condition01:'「今天是食人妖精王以往的樣貌呀，看起來很愉快。」 ',
				condition02:'「食人妖精王今天也一如往常地照顧么弟。」',
				condition03:'「食人妖精王累了，是和狼人打架了嗎？」'
			},
			{
				monsterName:"賽麗亞",
				role	:"物理輸出",
				skills:[
					{name:"破壞之箭",detail:"朝敵人的腦袋發射強力的箭矢，並使其暈眩",link:"https://www.youtube.com/embed/J8menSkT_J0"},
					{name:"混沌之箭",detail:"朝敵人射出蘊含混沌氣息的箭。有狀態異常的敵人時，優先攻擊該敵人，並造成追加傷害。",link:"https://www.youtube.com/embed/TNN3jUZ6Qco"},
					{name:"", detail:"", link:""}
				],
				description:'射箭使敵人受傷後暈眩。<br>因為小時候受過刺客訓練，所以幾乎不曾發出聲音。<br>因為那個後遺症，即使在身邊也聽不清楚他的聲音。',
				message01:'「…才沒…啦…」',
				message02:'「…你…不…動…啦…」',
				message03:'「任…完…！」',
				condition01:'「雖然沒聽清楚，但巡守似乎喊了\'心情好\'？？」',
				condition02:'「巡守的聲音聽起來很微弱，應該沒什麼事。」',
				condition03:'「想聽聽巡守的微弱聲音呢，發生什麼事了嗎？」'
			},
			{
				monsterName:"妖魔斧兵",
				role	:"物理輸出",
				skills:[
					{name:"投擲斧頭",detail:"朝敵人揮舞巨斧，破壞其防具降低敵人的物理防禦力。",link:"https://www.youtube.com/embed/C0JQFlylAUk"},
					{name:"戰場狂斬",detail:"用巨斧砍殺敵人，對其造成出血傷害。",link:"https://www.youtube.com/embed/QT1_SrTNRlM"},
					{name:"", detail:"", link:""}
				],
				description:'使用巨斧破壞防具，造成出血。<br>生性好戰，非常享受戰鬥。<br>是受烏勒庫斯寵愛的部下。',
				message01:'「戰鬥是靠耍嘴皮子的嗎！上吧！喀嘞喀嘞」',
				message02:'「不戰鬥就沒有活下去的理由了！喀嘞喀嘞。」',
				message03:'「戰鬥、獲勝、再搶走，喀嘞喀嘞。」',
				condition01:'「好像找到戰鬥的對象了。妖魔斧兵正在笑！」 ',
				condition02:'「喀嘞喀嘞，跟平常一樣吵鬧的妖魔斧兵。」 ',
				condition03:'「超級和平的今天，妖魔斧兵…要難過了…」'

			},
			{
				monsterName:"石頭高崙",
				role	:"魔法肉盾",
				skills:[
					{name:"花崗岩護盾",detail:"利用石頭的力量，使身體變得結實減少我軍受到的物理傷害。",link:"https://www.youtube.com/embed/gREDDUGQjZM"},
					{name:"高崙呼嚎",detail:"對敵人們放聲吶喊，使其受到傷害。",link:"https://www.youtube.com/embed/H8Poj-GM5VY"},
					{name:"", detail:"", link:""}
				],
				description:'使用強壯身軀和魔法保護同伴。<br>哈汀所製造的最後的高崙，其他高崙待他如老么。<br>不曉得是否因為如此，他很愛撒嬌和惡作劇。',
				message01:'「好無聊！和我玩吧～」',
				message02:'「咦？高崙哥哥、姐姐說要和我玩的呀？」',
				message03:'「不開心！說好要跟我玩的！」',
				condition01:'「有玩伴了嗎？石頭高崙笑盈盈的。」 ',
				condition02:'「石頭高崙在找朋友，這是熟悉的畫面。」',
				condition03:'「要和石頭高崙玩耍的朋友，今天一個也沒有…怎麼辦？」'
			},
			{
				monsterName:"潘",
				role	:"物理輸出",
				skills:[
					{name:"世界樹之力",detail:"以世界樹的樹枝所製成的槍投向敵人，給予忽略其防禦力的傷害。",link:"https://www.youtube.com/embed/7tjGMvgcMdE"},
					{name:"號角",detail:"吹起角笛，增加我軍攻速。",link:"https://www.youtube.com/embed/V3uUvrhzaEE"},
					{name:"", detail:"", link:""}
				],
				description:'丟擲長矛，無視敵人的防禦並攻擊。<br>教導精靈公主守衛的知識。<br>最近精靈們因為圓形禿很辛苦。',
				message01:'「沒有好的生髮水嗎…？」',
				message02:'「可以幫我解決Ｍ字型髮線的話...」',
				message03:'「守護了森林卻守不住我的頭髮。」',
				condition01:'「找到解決掉髮的訣竅了嗎？潘滿臉笑容。」',
				condition02:'「正在做防掉髮指壓的潘，再熟悉不過。」',
				condition03:'「感覺今天毛髮掉的更嚴重了，潘的表情很嚴肅。」'
			},
			{
				monsterName:"精靈公主",
				role	:"魔法輸出",
				skills:[
					{name:"沉睡花粉",detail:"在風中加入花粉來攻擊敵人，並使其沉睡。",link:"https://www.youtube.com/embed/jj3msH_BZvg"},
					{name:"恢復之花",detail:"精靈之花綻放，使我軍恢復並消除減益效果。",link:"https://www.youtube.com/embed/CJoe0iT3Tnc"},
					{name:"", detail:"", link:""}
				],
				description:'召喚美麗花朵來恢復同伴。<br>不是和嚴厲的母親學習守衛的知識，而是和潘學習。<br>最近知道他的秘密之後，很想說出去。',
				message01:'「就是啊！對潘叔叔來說…！嘻嘻～是秘密唷！」',
				message02:'「請原諒這種惡作劇～」',
				message03:'「嘻嘻，今天的惡作劇成功率也是100%，好開心～！」',
				condition01:'「耍了潘的精靈公主哼著歌！」',
				condition02:'「精靈公主今天也在找惡作劇的對象。」 ',
				condition03:'「徒勞無功的一天。精靈公主肯定很傷心。」'

			},
			{
				monsterName:"惡魔",
				role	:"魔法輸出",
				skills:[
					{name:"業火之焰",detail:"用猛烈的火焰包圍敵人，造成其火屬傷害。",link:"https://www.youtube.com/embed/dFhHfYOh19k"},
					{name:"地獄火花",detail:"在拳頭內引燃火花強擊敵人對被弱化的敵人造成追加傷害。",link:"https://www.youtube.com/embed/L9xBIH0chxc"},
					{name:"", detail:"", link:""}
				],
				description:'用火焰包圍敵人，造成火傷。<br>因為人類而被封印在象牙塔內，滿懷怒氣。<br>他的封印被解除的那天，亞丁將陷入危險。',
				message01:'「微不足道的傢伙，讓你們深刻體會到封印我的代價！」',
				message02:'「從被封印的那刻起，我就等著這一天。覺悟吧！」',
				message03:'「我的火焰伴隨人類的悲鳴熊熊燃燒。」',
				condition01:'「抹去被封印的過往，惡魔的表情實在很開朗！」',
				condition02:'「從封印中解除，正在熟悉現實的惡魔。還不錯嘛。」',
				condition03:'「因為被封印的回憶而睡不好的惡魔，今天就是那天啊。」'

			},
			{
				monsterName:"鋼鐵高崙",
				role	:"物理肉盾",
				skills:[
					{name:"冰之強擊",detail:"引起強力爆炸，無視敵人防禦力並給予傷害。",link:"https://www.youtube.com/embed/_-6-sxNoR_A"},
					{name:"酷寒",detail:"以寒氣包圍並攻擊敵人。",link:"https://www.youtube.com/embed/1r8jsWwsM_M"},
					{name:"", detail:"", link:""}
				],
				description:'無視敵人的防禦力，造成廣域傷害。<br>哈汀和里佛賓所共同製造的，大陸史上第一個高崙。<br>責任感強烈，細心照料著其他高崙。',
				message01:'「在外面要舉止得當～！」',
				message02:'「記得維持高崙的素質。」',
				message03:'「禮儀，成就不凡的高崙。」',
				condition01:'「因為弟弟們很聽話，鋼鐵高崙心情看起來很好。」',
				condition02:'「為了照顧妹妹，鋼鐵高崙今天也很忙碌。」',
				condition03:'「因為偏離正途的弟弟，鋼鐵高崙心神不寧。」'
			},
			{
				monsterName:"冰人",
				role	:"魔法輸出",
				skills:[
					{name:"冰原之心",detail:"以愛圍繞我軍，使我軍恢復生命並消除所有減益效果。",link:"https://www.youtube.com/embed/Z2HGGEaVU0g"},
					{name:"零度冰錐",detail:"朝敵人發射尖銳的冰楔。",link:"https://www.youtube.com/embed/ez7IdsNZAmY"},
					{name:"", detail:"", link:""}
				],
				description:'治癒同伴，以一定機率解除有害效果。<br>對冰之女王覺醒時所散發出的力量，有所反應而醒來後，<br>相信喚醒自己的強大力量就是愛。',
				message01:'「若是我的愛能減輕女王一絲的痛苦也好…！」',
				message02:'「女王大人，能讓我的心火熱跳動的只有您！」',
				message03:'「女王大人，我是依附於您，為您而生的存在！」',
				condition01:'「約好和冰之女王的約會了？冰人很開心呀。」',
				condition02:'「渴望冰之女王愛意的冰人，一如往常的求愛中…」',
				condition03:'「冰人看起來很累，是因為冰之女王拒絕了他吧？」'

			},
			{
				monsterName:"冰之女王侍女",
				role	:"魔法輸出",
				skills:[
					{name:"冰錐晶體",detail:"朝著敵人射出堅硬冰椎，使其凍結。有後排類型的敵人時，優先攻擊該敵人，並使其凍結。",link:"https://www.youtube.com/embed/5_JDNJeCLis"},
					{name:"溫暖的冰茶",detail:"獻上溫暖的冰茶，使我軍恢復生命。",link:"https://www.youtube.com/embed/nHiOeu_tkr0"},
					{name:"", detail:"", link:""}
				],
				description:'用溫暖的暴風雪包覆同伴，治療傷口。<br>無論何時，輔佐冰之女王的忠誠侍女。<br>努力讓總是憂鬱的女王大人開心。',
				message01:'「女王大人，今天天氣非常好呢。要不要去散步？」',
				message02:'「女王大人，今天要不要轉換一下心情，品嚐甜蜜的甜點呢？」',
				message03:'「女王大人，今天格外美麗動人，難得去逛街一下吧？」',
				condition01:'「因為女王大人的微笑，冰之女王侍女也變得開朗。」 ',
				condition02:'「跟平常一樣，忙著準備讓女王大人展開笑顏的冰之女王侍女。」',
				condition03:'「看不到女王的笑容而難過的冰之女王侍女，該怎麼辦？」'

			},
			{
				monsterName:"死靈法師",
				role	:"魔法輸出",
				skills:[
					{name:"靈魂消滅",detail:"在技能值最高的敵人及其周圍引爆黑暗魔力，消滅其技能值。",link:"https://www.youtube.com/embed/D54qgNL4FX4"},
					{name:"黑暗魔法陣",detail:"召喚黑暗魔法陣，攻擊敵人。",link:"https://www.youtube.com/embed/mrlTwdBM9Cs"},
					{name:"", detail:"", link:""}
				],
				description:'全體攻擊，同時減少技能值。<br>被哈汀操縱的他，一被切斷精神支配後，就陷入消滅的危機。<br>生存意識使他被散發黑暗力量的象牙塔所吸引。',
				message01:'「力量…強大的力量…」',
				message02:'「得去…象牙塔…那裡…」',
				message03:'「我需要…更…多…力量…」',
				condition01:'「死靈法師產生獲得力量的信心了（連開朗的表情…）」',
				condition02:'「只知道象牙塔的傻瓜，死靈法師今天還是一點也沒變。」',
				condition03:'「死靈法師無法擺脫會消滅的不安。」'

			},
			{
				monsterName:"梅杜莎",
				role	:"物理輸出",
				skills:[
					{name:"石化目光",detail:"利用受詛咒的目光使敵人石化優先攻擊中列的敵人",link:"https://www.youtube.com/embed/pNF72mWurKg"},
					{name:"劇毒之刃",detail:"以最靠近的敵人為中心，使其周遭降下劇毒之刃給予傷害優先攻擊中列的敵人",link:"https://www.youtube.com/embed/UIEjDqZZAdM"},
					{name:"",detail:"",link:""}
				],
				description:'將對上眼的生物變成石頭。 <br>想和朋友玩對看遊戲¸但大家都躲著她。 <br>離開村莊展開旅行¸尋找能和她玩對看遊戲的朋友。',
				message01:'「嘿，要不要跟我玩對看遊戲？」',
				message02:'「若是想跟我玩的話，就和我四目相接吧！」',
				message03:'「我不會把你變成石頭的，就和我玩對看遊戲吧。嗯？」',
				condition01:'「梅杜莎找到了可以一起玩對看遊戲的骷髏朋友了。真高興！」',
				condition02:'「梅杜莎今天也一個人在尋找著骷髏朋友。」',
				condition03:'「梅杜莎找尋對看遊戲的朋友失敗。真失望。」'

			},
			{
				monsterName:"獨眼巨人",
				role	:"物理肉盾",
				skills:[
					{name:"獨眼巨人之眼",detail:"以可怖至極的單眼威脅敵人，使其陷入恐怖。",link:"https://www.youtube.com/embed/Or-JS8KrOsk"},
					{name:"憤怒強擊",detail:"憤怒的晃動身體進行強襲。",link:"https://www.youtube.com/embed/PEvSax2LZTo"},
					{name:"", detail:"", link:""}
				],
				description:'使敵人恐懼，無法行動。<br>雖然很善良，但很多人看到他的外貌就迴避，因此感到自卑。<br>心願是和同伴悠閒地享受茶點。',
				message01:'「喜歡紅、紅茶和點心嗎？」',
				message02:'「不、不然，要不要喝咖…咖啡？」',
				message03:'「我…我不會害你。一起喝杯茶吧。」',
				condition01:'「因為可以和好友享受茶點，所以看起來很開心的獨眼巨人。」',
				condition02:'「總是找人一起喝茶的獨眼巨人。」',
				condition03:'「哎…對外貌更加沒信心的獨眼巨人。」'
			},
			{
				monsterName:"亞力安",
				role	:"魔法肉盾",
				skills:[
					{name:"亞力光束",detail:"眼中發射出刺眼的光芒，使敵人石化！",link:"https://www.youtube.com/embed/8fGmOQ1SKGw"},
					{name:"狂啄",detail:"用尖喙猛啄敵人，狠狠地攻擊！",link:"https://www.youtube.com/embed/7NicS8UePpk"},
					{name:"", detail:"", link:""}
				],
				description:'使用堅硬的喙，傷害敵人並使之石化。<br>雖然誕生於格利芬的巢穴之中，但發現自己的外貌和母親不同，<br>受到這個事實的打擊，因此而踏上尋找親生父母的旅程。',
				message01:'受到這個事實的打擊，踏上尋找親生父母的旅程。「大叔！你有看過我母親嗎？」',
				message02:'「我不是格利芬！我母親也不是！」',
				message03:'「一定要找到親生母親！」',
				condition01:'「找到關於親生父母的線索了嗎？亞力安眉開眼笑的！」',
				condition02:'「萬里尋親生父母，亞力安今天也一如往常。」',
				condition03:'「因為在格利芬巢穴沒人理睬的記憶，亞力安的心情變糟。」'
			},
			{
				monsterName:"人魚",
				role	:"魔法補師",
				skills:[
					{name:"生命的讚歌",detail:"以優美的歌曲使我軍恢復生命。",link:"https://www.youtube.com/embed/_zOvgdG6tZg"},
					{name:"海洋的祝福",detail:"唱起魔力之歌，減少我軍受到的所有傷害。",link:"https://www.youtube.com/embed/-D2aDWxrA2I"},
					{name:"救援",detail:"為生命力10%以下的我軍罩上保護屏障。",link:"https://www.youtube.com/embed/sx6Ef3CoF7E"}
				],
				description:"優先治療生命力最低的同伴。<br>人類深信「人魚的鱗片能賦予強大魔力」的傳聞，<br>因此而屠殺人魚，但人魚仍舊保持親切的個性。",
				message01:'「需要我的幫忙嗎？」',
				message02:'「我相信，人類一定也有什麼隱情。」',
				message03:'「喜愛大家的話，一切都會好的。對吧？」 ',
				condition01:'「人魚相隔許久見到同族並分享喜悅的樣子。」',
				condition02:'「人魚今天也在尋找需要幫忙的人，依然如故。」 	',
				condition03:'「人魚聽到同族被犧牲的消息…看起來很傷心。」'

			},
			{
				monsterName:"思克巴",
				role	:"魔法輸出",
				skills:[
					{name:"夢魔烙印",detail:"以夢魔之印飛向敵人，進行攻擊暴擊命中時，造成追加傷害。",link:"https://www.youtube.com/embed/6P-18UPOlEk"},
					{name:"魅惑之眼",detail:"以美麗的外貌魅惑敵人被魅惑的敵人會暫時幫助我軍。",link:"https://www.youtube.com/embed/BlWbYG3YEW8"},
					{name:"", detail:"", link:""}
				],
				description:'以令人心醉神迷的外貌蠱惑對方，造成致命傷。<br>美麗的魔族，若聽到她的魅惑嗓音，將永遠沉睡。',
				message01:'「誰來陪我玩？快來呀。」',
				message02:'「姐姐會看著辦，相信姐姐吧？」',
				message03:'「就是啊，不是叫我只相信姐姐嗎？對吧？」',
				condition01:'「到底對人類做了什麼誘惑？思克巴的笑意變深。」',
				condition02:'「思克巴今天也誘惑成功！但這只是基本的？！」',
				condition03:'「思克巴也有誘惑失敗的時候啊，就像現在。」'

			},
			{
				monsterName:"阿魯巴",
				role	:"魔法肉盾",
				skills:[
					{name:"惡毒液體",detail:"朝著敵人噴發受汙染的液體，進行攻擊。",link:"https://www.youtube.com/embed/X9O5BCIFciI"},
					{name:"震地襲",detail:"輕巧跳躍後重重落下地面增加自身的魔法防禦力。",link:"https://www.youtube.com/embed/GVj19GpXDhI"},
					{name:"地面強擊",detail:"受到攻擊時，因憤怒而有一定反擊機率。",link:"https://www.youtube.com/embed/AgZrVQgIMtk"}
				],
				description:'強化魔法防禦力，保護自己。<br>在龍之谷出生，雙頭共享一個身體的雙胞胎。',
				message01:'左阿魯巴：「傻瓜！別再吃肉了！一下就飽了啊！」 <br>右阿魯巴：「當然要吃肉！為什麼要吃蔬菜什麼的？」',
				message02:'左阿魯巴：「因為感冒，喉嚨不舒服，不是叫你喝熱飲嗎！」 <br>右阿魯巴：「你才應該先把美式咖啡喝光！」',
				message03:'左阿魯巴：「今天要聯誼，不是叫你修剪頭髮嗎！」 <br>右阿魯巴：「整理整理你那亂糟糟的髮線！」',
				condition01:'「今天阿魯巴（左）和阿魯巴（右）很有默契呢，這是怎麼回事？」',
				condition02:'「不過這種程度的話，阿魯巴雙胞胎算溫順了。」',
				condition03:'「今天糟了，阿魯巴雙胞胎吵得天翻地覆。」'
			},
			{
				monsterName:"熔岩高崙",
				role	:"物理輸出肉盾",
				skills:[
					{name:"火焰強擊",detail:"揮拳擊退敵人並中斷其技能對主要能力值為智力的敵人造成追加傷害。",link:"https://www.youtube.com/embed/eoTcKGFPlwo"},
					{name:"火焰亂打",detail:"使拳頭散發熔岩之力亂擊敵人對主要能力值為智力的敵人造成追加傷害。",link:"https://www.youtube.com/embed/Xz-sdA8CT28"},
					{name:"", detail:"", link:""}
				],
				description:"用燃燒的拳頭擊飛敵人。<br>伊弗利特喜歡聽「拯救世界的英雄」的故事，<br>自己也燃燒著成為英雄的炙烈夢想。",
				message01:'「英雄永不敗北！」',
				message02:'「伊弗利特說過，拯救世界的就是英雄！」',
				message03:'「絕不放棄！因為我一定會變成英雄！」',
				condition01:'「遇到導師伊弗利特的這天，熔岩高崙興奮不已！」',
				condition02:'「想變成英雄的熔岩高崙和平常一樣訓練，滿懷熱情！」',
				condition03:'「熔岩高崙看起來很累，成為英雄的路不好走吧。」'
			},
			{
				monsterName:"騎士隊長卡爾克",
				role	:"物理肉盾",
				skills:[
					{name:"最終堡壘",detail:"提高不屈的意志，增加我軍的狀態異常抵抗機率。",link:"https://www.youtube.com/embed/A73yRu51-WE"},
					{name:"騎士的意志",detail:"利用騎士的驕傲意志，強力刺殺敵人。",link:"https://www.youtube.com/embed/wxgDIkyZ3Bc"},
					{name:"", detail:"", link:""}
				],
				description:'特定時間內提升同伴的狀態異常抵抗力。<br>訓練派往艾爾摩王國之戰的軍人，<br>但參戰的部下一個也沒回來，對此感到懷疑。',
				message01:'「各位，恭喜你們成為光榮的亞丁王國騎士。」',
				message02:'「別忘記騎士只須追求名譽。」',
				message03:'「亞丁騎士必須只為亞丁王國而活。」',
				condition01:'「騎士隊長卡爾克對新手騎士的各方面都感到滿意。」',
				condition02:'「騎士隊長卡爾克千篇一律的日常生活，今天也一樣。」',
				condition03:'「騎士隊長卡爾克擔心騎士的安危，表情凝重。」'
			},
			{
				monsterName:"阿西塔基奧",
				role	:"物理肉盾",
				skills:[
					{name:"熔岩強擊",detail:"發動蘊含岩漿氣息的強力上鉤拳。",link:"https://www.youtube.com/embed/gsN1ylcfPd0"},
					{name:"熔岩守護",detail:"以沸騰的火焰力量，增加自身的物理防禦力。",link:"https://www.youtube.com/embed/SvYWjxNVUBM"},
					{name:"復仇火花",detail:"受攻擊時，因憤怒而向敵人反擊，並減少其物理攻擊力。",link:"https://www.youtube.com/embed/9_v23SeaL3I"}
				],
				description:'減少施加於自己的傷害。<br>體內天生帶有岩漿，總是散發出滾燙的熱氣。<br>因此，附近的魔族烤東西來吃的時候會使用他的身體。',
				message01:'「我的身體不是烤肉架！」',
				message02:'「我說了我不是烤肉架！把肉拿走！」',
				message03:'「哎唷…真不死心。知道啦，要烤的話就連我那份也烤。」',
				condition01:'「阿西塔基奧竟然拿出自己的身體當烤肉架！他心情很好呀！」',
				condition02:'「阿西塔基奧和魔族爭吵不休，看來很正常。」',
				condition03:'「阿西塔基奧甩掉放到身上的肉…緊急狀況！」'
			},
			{
				monsterName:"潔尼斯女王",
				role	:"魔法肉盾",
				skills:[
					{name:"詛咒劇毒",detail:"隨機選擇一個敵人為中心產生毒霧，造成範圍傷害，並有一定機率使其沉默。若敵人的主要能力值為智力，則將其沉默。",link:"https://www.youtube.com/embed/RPGU2kbssxw"},
					{name:"蛛網陷阱",detail:"以黏人的蜘蛛絲纏住敵人，使其行動變得遲緩降低敵人的攻速。",link:"https://www.youtube.com/embed/WHzCh0hsi8E"},
					{name:"腐蝕劇毒",detail:"受到攻擊時，有一定機率發射腐蝕劇毒來反擊。",link:"https://www.youtube.com/embed/WEX6YMRzThs"}
				],
				description:'散發弱化魔法攻擊力的毒霧。<br>外貌因鐮刀死神的詛咒變得醜陋的古代女王。<br>嫉妒他人的外貌，並奪走對方的美麗。',
				message01:'「交出你的美貌來！」',
				message02:'「你絕對不適合那個美貌。」',
				message03:'「我要奪走和她不相配的美麗。」',
				condition01:'「對奪來的美麗感到滿意的潔尼斯女王，看起來很愉快。」',
				condition02:'「似乎沒什麼特別的，潔尼斯女王正在尋找美麗。」',
				condition03:'「依然渴望美麗的潔尼斯女王，看起來悶悶不樂。」'
			},
			{
				monsterName:"幻象眼魔",
				role	:"魔法輸出",
				skills:[
					{name:"殲滅光線",detail:"發射穿透敵人的強力光線。",link:"https://www.youtube.com/embed/3g4E1dRNOb0"},
					{name:"魔能爆破",detail:"將魔力集中於眼中，在最近的敵人與周遭引起爆炸。有狀態異常的敵人時，優先攻擊該敵人。",link:"https://www.youtube.com/embed/oBAMirWykaU"},
					{name:"", detail:"", link:""}
				],
				description:'使對到眼的敵人陷入恐怖。<br>以騎士范德的左眼創造出的魔物。<br>把所有不誠實、貪婪的人變成石頭。',
				message01:'「我是…真實與謊言的…洞察者。」',
				message02:'「只會…對…真實…有所回應。」',
				message03:'「說…謊的話…真相的…嚴…懲。」',
				condition01:'「難得遇到誠實之者的幻象眼魔，不知怎地看起來很愉快。」',
				condition02:'「80%的謊言與20%的真實…是幻象眼魔的日常寫照。」',
				condition03:'「幻象眼魔對付滿口謊言的冒險家，看起來很累。」'

			},
		],
		// 상단 소환수 보기 영역
		show: {
			choice: '已召喚{{{guildCount}}}名血盟成員至遊戲。',
			notMy: '尚未召喚任何人',
			notGuild: '加入血盟時，可確認遊戲內召喚現況！',
			reserve: '{{{monsterName}}} 開放後，可以於遊戲內直接進行召喚。',
			reserveChange: '作為{{{beforeName}}}的替代，在{{{monsterName}}}開放後將可以於遊戲內直接進行召喚。',
			reserveFail: '若召喚獸達到3星時，<br>可以於遊戲內直接進行召喚。',
			reserveNotGuild: '已完成召喚。'
		},
		// 뽑기 (컬렉션에 소환하기)
		pick: {
			pickBtn: '召喚',
			ticketZero: '無收集召喚券。<br>收集召喚券在每天晚上23點時會自動補充5張。',
			monsterFull: '已獲得全部的召喚獸。',
			result1:'已召喚{{{monsterName}}}',
			result2:'{{{monsterName}}}升為2星了！',
			result3:'{{{monsterName}}}升為3星了！',
			first: '發放獎勵短劍! <span class="desc">恭喜您首次使用收集召喚券，獎勵短劍已發放。現在請到點數商店使用短劍！</span>',
			section: '第{{{monsterCount}}}次成功獲得召喚獸，發放+50把短劍！',
			level: '召喚獸達到3星，額外發放+10把短劍。',
			reserveComplete: '已完成召喚。',
			// shareMsg: '{{{monsterName}}} 을(를) 소환했습니다. {{{monsterName}}}은(는) {{{monsterRole}}} 입니다.',
			// shareMsgAdd: ' {{{monsterName}}}의 현재 예약 순위는 {{{monsterRank}}}위 입니다.',
			shareSnsTit : '天堂 Red Knights騎士團收集：{{{monsterName}}} 獲得召喚獸！',
			shareSnsImg : '',
			shareSnsDec : '已在騎士團收集中獲得 {{{monsterName}}} 召喚獸。 可在事前登錄頁面進行多樣迷你遊戲，與天堂 Red Knights各具不同魅力的召喚獸見面！',
			shareSnsLast : '請立即參與天堂 Red Knights事前登錄！',
			shareGuildTit : '天堂 Red Knights騎士團收集：獲得{{{monsterName}}}召喚獸！',
			shareGuildDec : '請和{{{monsterName}}}召喚獸見面吧！'
		},
		detail: {
			//shareMsg: '已分享{{{monsterName}}}的{{{skillName}}}技能。請在此確認！'
		}
	},
	// 기사단 점령전
	occupation: {
		landNames: ['說話之島','古魯丁','妖魔森林','風木','象牙塔','亞丁','海音'],
		notice: {
			checking: '目前正在確認戰鬥結果。',
			waiting: '目前正在準備戰鬥中。'
		},
		insert: {
			// shareSnsMsg: '{{{landName}}}에서 치열한 전투가 펼쳐지고 있습니다! 점령전 승리를 위해서는 혈맹원들의 도움이 필요합니다. 지금 바로 레드나이츠에 접속하세요!',
			// shareGuildMsg: '{{{landName}}} {{{areaName}}} 거점에 소환수 {{{insertMy}}}명을 투입했습니다. 거점을 확보할 수 있도록 점령전을 도와주세요!'
			shareSnsTit : 'Red Knights騎士團占領戰：{{{landName}}}-{{{areaName}}}進攻結束',
			shareSnsImg : '',
			shareSnsDec : '{{{landName}}} 內正展開激烈的戰鬥！ 為了贏得占領戰，需要血盟成員的幫忙。',
			sharesnsLast : '請即刻連上天堂 Red Knights！',
			shareGuildTit : 'Red Knights騎士團占領戰：{{{landName}}}-{{{areaName}}}進攻結束',
			shareGuildDec : '已在{{{landName}}}-{{{areaName}}}據點投入{{{insertMy}}}隻召喚獸。'
		}
	},
	// 기사단 레이스
	race: {
		unit: '競賽',
		selection: {
			hasMonster: ['未持有','持有'],
			complete: '參賽申請完畢！',
			completeMsg : '參賽申請完畢！ <br> 申請結束後請確認競賽結果！',
			disable: '只能使用已保有的召喚獸參加賽跑。'
		},
		resultDetail: {
			title: '結果。',
			time: '開始競賽',
			attendA: '{{{monsterName}}}參賽並創下第{{{monsterRank}}}名的記錄。',
			attendB: '{{{monsterName}}}無法參賽。',
			attendC: '未參與本次賽跑。'
		},
		help: {
			//shareSnsMsg : '기사단 레이스에서 {{{monsterName}}}을(를) 선택하셨습니다. 과연 이번 레이스에서는 1등을 차지할 수 있을까요? 지금 바로 레드나이츠에서 확인하세요!'
			shareSnsTit : '天堂 Red Knights騎士團賽跑 ： {{{monsterName}}} 選擇召喚獸！',
			shareSnsImg : '',
			shareSnsDec : '已在騎士團賽跑中選擇 {{{monsterName}}} 召喚獸。 這次是否能在賽跑中奪冠呢？',
			shareSnsLast : '請立即到天堂 Red Knights確認！',
			shareGuildTit : '天堂 Red Knights騎士團賽跑 ： 選擇{{{monsterName}}}召喚獸！',
			shareGuildDec : '請幫助{{{monsterName}}}召喚獸在賽跑中奪冠！'
		}
	}
}