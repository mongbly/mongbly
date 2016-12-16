// L10N 적용 
var RK_RESOURCES = {
	data: 'http://rc.rk.plaync.com/minigame/',
	img: 'http://akstatic.plaync.com/RK/minigame/',
	// img: '../img/',
	lang: '_lang/ko/',
	common: {
		// 기본정보 (공유용)
		info: {
			gameName: '리니지 레드나이츠',
			url: 'http://rk.plaync.com/?rk=1180016', // 'https://goo.gl/P2CMtu',
			image: {
				link: 'http://akstatic.plaync.com/resource/rk/meta/rk_v1103.jpg',
				width: 750,
				height: 594
			},
			hashtags: 'Lineage, LineageRedKnights, RedKnights, 리니지, 리니지레드나이츠, 레드나이츠, 엔씨소프트'
		},
		// 경고 메시지
		alert: {
			// 로그인 하지 않았을 시
			notLogin: '로그인 하신 후 플레이 하실 수 있습니다.',
			// 혈맹 가입하지 않았을 시
			notGuild: '기사단 점령전과 레이스는 혈맹 가입이 필수입니다. <br>지금 바로 혈맹에 가입하세요! 물론 생성도 가능합니다!',
			// 네이트워크 상태 불량
			badNetwork: '네트워크 상태가 좋지 않습니다. <br>다시 시도해 주세요.',
			// 게임 기간 종료
			minigameEnd: '이벤트 기간이 종료되었습니다.'
		},
		// 랭킹
		ranking: {
			titRank:'순위',
			titGuildName:'혈맹이름',
			titPoint: ['총 보유 소환수', '누적 점령 점수', '누적 승점'],
			coinMsg:'최종 순위 50위까지 리니지 레드나이츠에서 사용 가능한 기사단 증표를 지급합니다.',
			guildInfo: '나의 혈맹 {{{guildName}}}의 랭킹은 {{{guildRank}}}위입니다.',
			collection: '보유 소환수 {{{count}}}개',
			occupation: '누적 점령 점수 {{{count}}}점',
			occupationReward: '예상 기사단 증표 : {{{myReward}}}개',
			race: '누적 승점 {{{count}}}점',
			notGuild: '가입한 혈맹이 없습니다. <span class="desc">지금 바로 혈맹에 가입하세요! 물론, 생성도 가능합니다!</span>'
		},
		// 공유하기
		share: {
			guild: '혈맹 대화방에 메시지가 공유되었습니다. <br>지금 대화방으로 이동할까요?',
			guildLink: 'http://www.plaync.com/',
			notGuild: '혈맹에 가입 후 사용하실 수 있습니다.',
			rewardTicket: '보상으로 소환티켓을 획득하였습니다.',
			rewardDagger: '보상으로 단검 {{{daggerCount}}}개를 획득하였습니다.'
		}
	},
	// 기사단 컬렉션
	collection: {
		// 소환수 정보
		monsterInfo: [
			{
				monsterName:"마리아",
				role	:"물리 딜러",
				skills:[
					{name:"마이티 볼트",detail:"적에게 강화 화살을 발사합니다. <br>생명력이 가장 낮은 대상을 우선 공격합니다.",link:"https://www.youtube.com/embed/ZWlpwvaXyp8"},
					{name:"리볼버",detail:"체력이 가장 낮은 적에게 석궁을 빠르게 6연사 합니다.",link:"https://www.youtube.com/embed/Laz-kE-KuUI"},
					{name:"",detail:"",link:""}
				],
				description:'생명력이 낮은 적을 공격하며¸ 뒤로 밀어낸다. <br>세 자매의 둘째로¸ 뛰어난 실력을 갖고 있다. <br>무서운게 없다는 듯 거침 없이 행동해 매번 단장에게 혼난다.',
				message01:'"칫- 귀찮아."',
				message02:'"이 정도는 기본 아냐?"',
				message03:'"놀라기엔 일러. <br>이제 시작이야."',
				condition01:'마리아의 표정이 예사롭지 않습니다. <br>무슨 일이든 잘 풀릴 것만 같은 하루입니다.',
				condition02:'평소의 마리아 모습 그대로입니다. <br>걱정할 필요가 없겠네요.',
				condition03:'쿨하기로 유명한 마리아가 <br>왠지 표정이 어두워 보입니다.'
			},
			{
				monsterName:"올가",
				role	:"마법 힐러",
				skills:[
					{name:"천상의 빛",detail:"아인하사드의 성스러운 빛으로 아군을 회복시킵니다.",link:"https://www.youtube.com/embed/KXdMkjoYfTw"},
					{name:"정의의 망치",detail:"정의의 망치로 적의 머리를 강타하여 스킬게이지를 소멸시킵니다.",link:"https://www.youtube.com/embed/ehYOLtn6Bbc"},
					{name:"신의 가호",detail:"빛의 힘을 이용해 생명력이 30% 이하인 아군에게 보호막을 겁니다.",link:"https://www.youtube.com/embed/FPiLWcvSJME"}
				],
				description:'동료들의 생명력 회복 및 해로운 효과를 제거한다. <br>세 자매의 첫째로¸ 마리아와는 정 반대의 성격을 갖고 있다. <br>차분하고 성숙하며 언제나 동료를 먼저 생각한다.',
				message01:'"아인하사드의 가호가 <br>함께 하길."',
				message02:'"당신을 도울 수 있어 영광이었습니다."',
				message03:'"아인하사드가 당신을 인도할 거예요."',
				condition01:'오늘의 올가는 <br>죽은 사람도 살려낼 기세입니다.',
				condition02:'올가는 여느 때처럼 <br>동료를 챙길 따름입니다.',
				condition03:'미소를 잃지 않던 올가도 <br>오늘만큼은 왠지 날이 서 있네요.'
			},
			{
				monsterName:"이리나",
				role	:"마법 딜러",
				skills:[
					{name:"엉덩방아 폭탄",detail:"가장 가까이 있는 적에게 던진 폭탄이 거대한 폭발을 일으켜 범위 내의 대상을 넘어뜨리고 스킬을 취소시킵니다. <br>스킬을 시전 중인 적을 우선 공격합니다.",link:"https://www.youtube.com/embed/C0FTjLKytkg"},
					{name:"느릿느릿 젤리",detail:"적들을 끈적끈적한 물질로 뒤덮어 공격 속도를 감소시킵니다.",link:"https://www.youtube.com/embed/VVJbMr6tzGI"},
					{name:"",detail:"",link:""}
				],
				description:'폭발을 일으켜 적의 공격을 방해한다. <br>세 자매의 막내로¸ 자신이 세상에서 제일 똑똑하다고 생각한다. <br>수제 포션을 한가득 가지고 다녀 힘겨워한다.',
				message01:'"아~ 너무 무거워..."',
				message02:'"하, 무거워. 포션이라도 하나 먹을까..."',
				message03:'"후... 포션은 무거울 수록 귀하다고!"',
				condition01:'흡족한 포션을 만든 이리나의 표정이 <br>무척 밝아 보이네요.',
				condition02:'이리나가 한가득 챙겨 나온 포션은 <br>오늘도 여전히 무겁네요.',
				condition03:'이리나가 평소와 달리 겸손합니다. <br>뭔가 위험한 신호네요.'
			},
			{
				monsterName:"스파토이",
				role	:"마법 탱커",
				skills:[
					{name:"방어 태세",detail:"전열을 가다듬어 아군이 받는 마법 피해를 줄입니다.",link:"https://www.youtube.com/embed/w6JdAWkN33M"},
					{name:"방패 강타",detail:"조악한 방패에 온 힘을 모아 적을 강타합니다.",link:"https://www.youtube.com/embed/qYgPt3dB9Yk"},
					{name:"",detail:"",link:""}
				],
				description:'마법으로부터 동료들을 보호한다. <br>해골 부대를 이끄는 대장이다. <br>본인의 부대에 대한 강한 자부심을 갖고 있다.',
				message01:'"흰 우유와 멸치만 있다면 우린 최강이야!"',
				message02:'"최강에 어울리는, 우리는 하얀색 깔맞춤 부대!"',
				message03:'"언데드는 죽음도 두렵지 않다! 이미 죽어봤으니까!"',
				condition01:'흰 우유와 멸치를 챙겼는지 <br>스파토이의 표정에 자신감이!!!',
				condition02:'스파토이는 무슨 생각중일까요? <br>속내가 궁금합니다.',
				condition03:'분명한 건 스파토이의 몸 상태가 <br>별로란 사실입니다.'

			},
			{
				monsterName:"흑기사",
				role	:"물리 탱커",
				skills:[
					{name:"배쉬",detail:"방패로 전방의 적들을 강하게 가격하여 뒤로 밀쳐내고 스킬을 취소시킵니다. <br>밀려난 적들은 기절할 수 있습니다.",link:"https://www.youtube.com/embed/o3NE8Lo_k-M"},
					{name:"리덕션 아머",detail:"자신의 몸 주위에 방패를 둘러 자신이 받는 모든 피해를 줄입니다.",link:"https://www.youtube.com/embed/EePUehgp4zE"},
					{name:"",detail:"",link:""}
				],
				description:'방패를 이용해 적을 밀어내며 공격을 봉쇄한다. <br>해적 시절부터 커츠와 함께 해온 단원으로 그에게 강한 유대를 느낀다. <br>커츠는 켄 라우헬을 위해¸ 흑기사는 커츠를 위해 목숨을 바친다.',
				message01:'"커츠님의 털 끝 하나도 건드릴 수 없다!"',
				message02:'"커츠 님이 걷는 그곳이 곧 <br>길이다."',
				message03:'"커츠 님의 깃발에 <br>내 삶을 걸었다!"',
				condition01:'바다를 누비던 시절처럼 <br>흑기사의 얼굴에 미소가 감도네요.',
				condition02:'흑기사는 평소처럼 커츠의 명령을 <br>묵묵히 기다리고 있군요.',
				condition03:'투구 속 흑기사의 표정은 필시 어두울 거예요. <br>느낌이 와요!'
			},
			{
				monsterName:"라미아",
				role	:"마법 딜러",
				skills:[
					{name:"꼬리 휩쓸기",detail:"적들에게 꼬리를 강하게 휘두릅니다.",link:"https://www.youtube.com/embed/ASFkcKZQdKM"},
					{name:"독 바르기", detail:"아군의 무기에 독을 발라 치명타 확률을 증가시킵니다.",link:"https://www.youtube.com/embed/9cBi_67EkmY"},
					{name:"죽음의 입맞춤",detail:"맹독의 구체를 날려 피해를 주고 중독시킵니다. <br>석화 상태인 적이 있을 시 발동합니다.",link:"https://www.youtube.com/embed/SMXIDii5-5w"}
				],
				description:'석화 상태의 적을 추적해 공격한다. <br>아름다운 연애를 꿈꾸며 호수에 놀러 온 남자를 유혹한다. <br>하지만 잘 되지 않는 듯 그녀는 늘 혼자다.',
				message01:'"어머~ 자기 너무 멋지다~"',
				message02:'"당신과 함께 아름다운 호수를 같이 걷고 싶어요."',
				message03:'"아름다운 호수를 바라보며 함께 식사할까요?"',
				condition01:'오늘의 라미아는 너무 아름답네요!',
				condition02:'라미아는 아름다운 사랑을 찾고 있습니다. <br>평소와 같네요.',
				condition03:'마음에 드는 사람이 없나 봐요. <br>라미아의 표정이 시무룩합니다.'
			},
			{
				monsterName:"늑대인간",
				role	:"물리 딜러",
				skills:[
					{name:"그림자 기습",detail:"그림자 속에 숨어들어 가장 멀리 떨어져 있는 적에게 기습 공격을 가합니다.",link:"https://www.youtube.com/embed/eFX1HB71_So"},
					{name:"사냥의 명수",detail:"사냥감을 향해 신속하고 정확하게 둔기를 휘두릅니다.",link:"https://www.youtube.com/embed/7jM1cx1V3mM"},
					{name:"",detail:"",link:""}
				],
				description:'민첩하게 적의 뒤를 파고들어 공격한다. <br>사경을 헤매던 시절¸ 라이칸슬로프에게 물려 늑대인간이 되어 목숨을 구한다. <br>은혜를 갚기 위해 여행 중.',
				message01:'"종족의 운명을 위해서라면."',
				message02:'"인간? 아니, <br>난 늑대인간이야."',
				message03:'"은혜를 갚는 것이야말로 라이칸슬로프족의 명예."',
				condition01:'은혜 갚을 자신이 생긴 늑대인간의 표정은 <br>이렇게나 밝군요!',
				condition02:'늑대인간은, <br>어제와 비슷한 하루를 보내는 중이네요.',
				condition03:'종족의 운명 때문일까요? <br>늑대인간의 부담이 커 보이네요.'
			},
			{
				monsterName:"드워프 검사",
				role	:"물리 딜탱",
				skills:[
					{name:"대지 가르기",detail:"검에 힘을 집중시켜 적들을 한꺼번에 베어 버립니다. <br>주요 능력치가 민첩인 대상에게 추가 피해를 줍니다.",link:"https://www.youtube.com/embed/PXdl5vIPIFg"},
					{name:"묵직한 한방",detail:"적에게 찌르기 공격을 가합니다. <br>주요 능력치가 민첩인 대상에게 추가 피해를 줍니다.",link:"https://www.youtube.com/embed/gv3FxithyfI"},
					{name:"",detail:"",link:""}
				],
				description:'앞에 있는 적을 크게 베어 공격한다. <br>최고의 대장장이 자리를 이벨빈에게 빼앗긴 후¸ <br>그를 뛰어넘기 위해 대륙을 여행하며 새로운 광물을 찾고 있다.',
				message01:'"최고의 대장장이는 나야!"',
				message02:'"흥! 내 제련 솜씨는 <br>계속 발전한다고!"',
				message03:'"내 무기야말로 세계 최고지. <br>이벨빈의 것이 아니라!"',
				condition01:'전설급 무기를 뽑아낸 드워프 검사의 기분? <br>당연 최고겠죠.',
				condition02:'드워프검사의 무기지만 <br>오늘은 그다지 특별하지 않군요.',
				condition03:'오늘따라 만들어진 무기도, <br>드워프검사의 기분도 꽝이네요.'
			},
			{
				monsterName:"킹 버그베어",
				role	:"물리 탱커",
				skills:[
					{name:"대지 무너뜨리기",detail:"엉덩방아로 지진을 일으켜 적들을 넘어뜨리고 스킬을 취소시킵니다.",link:"https://www.youtube.com/embed/vxLDJebU7I4"},
					{name:"몽둥이 휘두르기",detail:"자신의 무기를 깃털같이 가볍게 휘두릅니다.",link:"https://www.youtube.com/embed/S4PvcW5S8Zs"},
					{name:"",detail:"",link:""}
				],
				description:'강력한 지면 공격으로 적들을 쓰러트린다. <br>늑대인간에게 둘째가 죽은 후¸ 그들을 보면 참을 수 없는 분노를 느낀다. <br>지금은 막냇동생 "버그베어"를 지키는 것이 삶의 목표다.',
				message01:'"내 동생! 건들지 마!"',
				message02:'"늑대인간... 네 녀석들... 잊지 않겠다."',
				message03:'"막냇동생은 반드시 지켜 보이겠어."',
				condition01:'오늘은 과거의 킹 버그베어의 모습이군요. <br>즐거워 보입니다."',
				condition02:'킹 버그베어는 오늘도 평소처럼 <br>막냇동생을 챙기네요.',
				condition03:'늑대인간과 싸우기라도 했나요? <br>킹 버그베어가 지쳤네요.'
			},
			{
				monsterName:"세리아",
				role	:"물리 딜러",
				skills:[
					{name:"파괴의 화살",detail:"적의 머리를 향해 강력한 화살을 발사해 기절시킵니다.",link:"https://www.youtube.com/embed/J8menSkT_J0"},
					{name:"혼돈의 화살",detail:"적에게 혼돈의 기운을 담은 화살을 날립니다. <br>상태이상에 걸린 적이 있는 경우 해당 대상을 우선 공격하여 추가 피해를 줍니다.",link:"https://www.youtube.com/embed/TNN3jUZ6Qco"},
					{name:"",detail:"",link:""}
				],
				description:'화살을 발사해¸ 적에게 상처를 입힌 후 기절 시킨다. <br>어렸을 때 받은 암살 훈련으로 목소리를 내본 적이 거의 없다. <br>그 후유증으로 곁에 있어도 목소리가 잘 들리지 않는다.',
				message01:'"..렇지..아.."',
				message02:'"...짝...라...했...아..."',
				message03:'"미... 완...!"',
				condition01:"자세히 듣진 못했지만 <br>세리아가 좋다고 외쳤죠??",
				condition02:'"세리아의 목소리가 희미하게 들리는 걸 보니 <br>별일 없군요."',
				condition03:'"세리아의 작은 목소리가 듣고 싶네요. <br>무슨 일이 있나요?"'	
			},
			{
				monsterName:"오크 도끼병",
				role	:"물리 딜러",
				skills:[
					{name:"도끼 투척",detail:"거대 도끼를 적에게 날려 방어구를 파괴합니다. <br>대상의 물리 방어력을 감소시킵니다.",link:"https://www.youtube.com/embed/C0JQFlylAUk"},
					{name:"전장의 상처",detail:"거대 도끼로 적을 베어 출혈 피해를 줍니다.",link:"https://www.youtube.com/embed/QT1_SrTNRlM"},
					{name:"",detail:"",link:""}
				],
				description:'커다란 도끼로 방어구를 파괴해 출혈을 일으킨다. <br>호전적인 성격으로 싸움을 매우 즐긴다. <br>오르쿠스의 총애를 받고 있는 부하다.',
				message01:'"싸움을 입으로 하냐! 덤벼! 크륵크륵."',
				message02:'"싸우지 않는다면 살아갈 이유도 없지! 크륵크륵."',
				message03:'"싸우고, 이기고, 그리고 빼앗겠다. 크륵크륵."',
				condition01:'싸울 건수가 잡혔나 보군요. <br>오크 도끼병이 웃고 있어요!',
				condition02:'크륵크륵. <br>평소처럼 여전히 시끄러운 오크 도끼병입니다.',
				condition03:'지독히 평화로운 오늘이네요. <br>오크 도끼병...슬프겠어요...'
						 	 	
			},
			{
				monsterName:"돌 골렘",
				role	:"마법 탱커",
				skills:[
					{name:"화강암 방패",detail:"바위의 힘으로 몸을 단단하게 만듭니다. <br>아군이 받는 물리 피해를 줄입니다.",link:"https://www.youtube.com/embed/gREDDUGQjZM"},
					{name:"골렘의 포효",detail:"적들에게 크게 함성을 질러 피해를 입힙니다.",link:"https://www.youtube.com/embed/H8Poj-GM5VY"},
					{name:"",detail:"",link:""}
				],
				description:'단단한 몸과 마법으로 동료를 지킨다. <br>하딘이 만든 마지막 골렘. 다른 골렘들이 막내처럼 대한다. <br>그래서인지 애교가 많고 장난을 좋아한다.',
				message01:'"심심해! 나랑 놀자~"',
				message02:'"어? 형과 누나 골렘이 놀아준다고 했는데?"',
				message03:'"흥칫뿡! 놀아준다고 해놓고선!"',
				condition01:'놀아줄 친구가 생긴 것일까요? <br>돌 골렘이 싱글벙글이네요.',
				condition02:'돌 골렘은 친구를 찾고 있네요. <br>익숙한 풍경입니다.',
				condition03:'오늘은 아무도 없어요. <br>돌 골렘과 놀아줄 친구가...어쩌죠?'
			},
			{
				monsterName:"판",
				role	:"물리 딜러",
				skills:[
					{name:"세계수 가지",detail:"세계수의 가지로 만든 창을 적에게 던져 방어력을 무시한 피해를 줍니다.",link:"https://www.youtube.com/embed/7tjGMvgcMdE"},
					{name:"뿔 피리",detail:"뿔피리를 불어 아군의 공격 속도를 증가시킵니다.",link:"https://www.youtube.com/embed/V3uUvrhzaEE"},
					{name:"",detail:"",link:""}
				],
				description:'창을 던져 적의 방어를 무시하고 공격한다. <br>페어리 프린세스에게 가디언의 지식을 가르치고 있다. <br>최근 요정들이 갈기를 뜯어가 원형 탈모로 고생 중.',
				message01:'"어디 좋은 발모제 없나...?"',
				message02:'"M자 탈모만 고쳐준다면..."',
				message03:'"숲은 지켰지만 내 머리털은 못 지켰군."',
				condition01:'탈모 관련 꿀팁을 들었나요? <br>판의 얼굴에 웃음꽃이 피네요.',
				condition02:'탈모 방지 지압을 하는 판의 모습, <br>익숙 그 자체군요.',
				condition03:'탈모가 부쩍 심해진 눈치네요. <br>판의 얼굴이 굳어져 있어요.'
			},
			{
				monsterName:"페어리 프린세스",
				role	:"마법 딜러",
				skills:[
					{name:"수면 꽃가루",detail:"바람에 꽃가루를 실어 적들을 공격하고 잠재웁니다.",link:"https://www.youtube.com/embed/jj3msH_BZvg"},
					{name:"회복의 꽃",detail:"요정의 꽃을 피어올려 아군을 회복하고 해로운 효과를 제거합니다.",link:"https://www.youtube.com/embed/CJoe0iT3Tnc"},
					{name:"",detail:"",link:""}
				],
				description:'아름다운 꽃을 소환해 동료를 회복시킨다. <br>엄한 엄마가 아닌¸ 판에게 가디언의 지식을 배우는 중. <br>최근 그의 비밀을 알게 된 뒤 입이 간지럽다.',
				message01:'"글쎄요! 판 삼촌한테...! 히히~ 비밀이에용!"',
				message02:'"이런 장난은 좀 봐줘용~"',
				message03:'"히히. 오늘도 장난 성공율 100% 달성. 신난당~!"',
				condition01:'판을 골탕 먹인 페어리 프린세스가 <br>콧노래를 부르는 중!',
				condition02:'오늘도 어김없이 <br>페어리 프린세스가 장난칠 상대를 찾네요.',
				condition03:'허탕만 치는 하루군요. <br>페어리 프린세스, 속상하겠어요.'

			},
			{
				monsterName:"데몬",
				role	:"마법 딜러",
				skills:[
					{name:"업화의 불길",detail:"적들을 맹렬한 화염으로 감싸 화상 피해를 입힙니다.",link:"https://www.youtube.com/embed/dFhHfYOh19k"},
					{name:"지옥의 불꽃",detail:"주먹에 불꽃을 실어 적을 강타합니다. <br>약화 효과에 걸린 대상에게 추가 피해를 줍니다.",link:"https://www.youtube.com/embed/L9xBIH0chxc"},
					{name:"",detail:"",link:""}
				],
				description:'화염으로 적들을 감싸 화상을 입힌다. <br>인간에 의해 상아탑에 봉인되어 엄청난 분노를 품고 있다. <br>그의 봉인이 풀리는 날¸ 아덴은 위험에 빠지게 될 것이다.',
				message01:'"하찮은 놈들. 나를 봉인한 대가를 톡톡히 치르게 해주마!"',
				message02:'"봉인된 순간부터 줄곧 이날을 기다렸다. 각오해라!"',
				message03:'"내 불꽃은 인간들의 비명을 벗삼아 타오를 것이다."',
				condition01:'봉인된 과거를 지워버린 데몬의 표정은 <br>그야말로 맑음!',
				condition02:'봉인에서 풀려나 현실 적응 중인 데몬. <br>낫 배드군요.',
				condition03:'봉인된 기억으로 잠을 설친다는 데몬, <br>오늘이 그날이군요.'

			},
			{
				monsterName:"아이언 골렘",
				role	:"물리 탱커",
				skills:[
					{name:"에너지 버스트",detail:"강력한 폭발을 일으켜 적들에게 방어력을 무시한 피해를 줍니다.",link:"https://www.youtube.com/embed/_-6-sxNoR_A"},
					{name:"아이언 피스트",detail:"양 주먹에 에너지를 모아 적을 짓뭉게 버립니다.",link:"https://www.youtube.com/embed/1r8jsWwsM_M"},
					{name:"",detail:"",link:""}
				],
				description:'적의 방어력을 무시하고 광역 피해를 준다. <br>하딘과 이벨빈의 합작인 대륙 최초의 골렘. <br>책임감이 강해 다른 골렘들을 섬세하게 챙긴다.',
				message01:'"밖에 나가면 예의 바르게 행동해야 해~!"',
				message02:'"골렘의 품위를 지키는 걸 잊지 말렴."',
				message03:'"매너가 골렘을, 골렘답게 만든단다."',
				condition01:'동생들이 잘 따라줘서 <br>아이언 골렘의 기분이 좋아 보이네요.',
				condition02:'동생들 챙기느라 오늘도 <br>아이언 골렘은 바쁘군요.',
				condition03:'엇나가는 동생들 때문에 <br>아이언 골렘의 심기가 불편합니다."'			
			},
			{
				monsterName:"아이스맨",
				role	:"마법 딜러",
				skills:[
					{name:"애정 발산",detail:"아군을 사랑으로 감싸 회복시키고 모든 해로운 효과를 제거합니다.",link:"https://www.youtube.com/embed/Z2HGGEaVU0g"},
					{name:"고드름 발사",detail:"적에게 날카로운 얼음 쐐기를 날립니다.",link:"https://www.youtube.com/embed/ez7IdsNZAmY"},
					{name:"",detail:"",link:""}
				],
				description:'동료를 치유하며¸ 확률적으로 해로운 효과를 제거한다. <br>얼음여왕이 각성할 때 내뿜은 힘에 반응해 깨어난 뒤로 <br>자신을 깨운 강력한 힘이 사랑이라 믿고 있다.',
				message01:'"내 사랑으로¸ 여왕님의 고통이 조금이라도 덜어졌으면...!"',
				message02:'"여왕님, 내 심장을 뜨겁게 하는 건 당신 뿐입니다!"',
				message03:'"여왕님 난 당신의, 당신에 의한, 당신을 위해 존재합니다!"',
				condition01:'얼음여왕과의 데이트라도 잡혔나요? <br>아이스맨이 신났군요.',
				condition02:'얼음여왕의 사랑에 목마른 아이스맨은 <br>평소처럼 구애중...',
				condition03:'아이스맨이 지쳐 보이네요. <br>얼음여왕의 거절 때문이겠죠?'

			},
			{
				monsterName:"얼음여왕 시녀",
				role	:"마법 딜러",
				skills:[
					{name:"꽁꽁 고드름",detail:"적에게 꽁꽁 얼어붙은 고드름을 날려 빙결시킵니다. <br>후방 타입의 적이 있는 경우 대상을 우선 공격하여 무조건 빙결 시킵니다.",link:"https://www.youtube.com/embed/5_JDNJeCLis"},
					{name:"따뜻한 얼음차",detail:"따뜻한 얼음차를 대접하여 아군을 회복시킵니다.",link:"https://www.youtube.com/embed/nHiOeu_tkr0"},
					{name:"",detail:"",link:""}
				],
				description:'포근한 눈보라로 동료를 감싸¸ 상처를 치료한다. <br>언제나 얼음여왕을 보좌하는 충성스러운 시녀. <br>항상 우울해하는 여왕님을 즐겁게 해주기 위해 노력한다.',
				message01:'"여왕님¸ 오늘은 <br>날씨가 매우 좋아요. 산책 나가시겠어요?"',
				message02:'"여왕님, 오늘은 <br>기분 전환 겸 달콤한 디저트 어떠신가요?"',
				message03:'"여왕님, 오늘따라 <br>더 아름다우세요. 간만에 쇼핑 어떠세요?"',
				condition01:'여왕님이 미소에, <br>얼음여왕 시녀의 기분도 밝아졌네요.',
				condition02:'평소처럼 여왕님을 웃게 할 준비로 바쁜 <br>얼음여왕 시녀군요.',
				condition03:'여왕님의 미소를 보질 못해 속상한 얼음여왕 시녀, <br>어쩌죠?'

			},
			{
				monsterName:"네크로맨서",
				role	:"마법 딜러",
				skills:[
					{name:"영혼 소멸",detail:"스킬게이지가 가장 높은 적과 그 주변에 어둠의 마력을 폭발시켜 스킬게이지를 소멸시킵니다.",link:"https://www.youtube.com/embed/D54qgNL4FX4"},
					{name:"어둠의 마법진",detail:"어둠의 마법진을 소환해 적을 공격합니다.",link:"https://www.youtube.com/embed/mrlTwdBM9Cs"},
					{name:"",detail:"",link:""}
				],
				description:'전체 공격과 동시에 스킬 게이지를 감소 시킨다. <br>하딘의 조종을 받던 그는¸ 정신 지배가 끊어지자 소멸될 위기에 처한다. <br>생존을 위한 무의식은 어둠의 힘이 흘러나오는 상아탑에 이끌린다.',
				message01:'"힘... 강한 힘을..."',
				message02:'"그곳... 상아탑... 가야만..."',
				message03:'"필요하다... 힘... 더... 더..."',
				condition01:'네크로맨서는 힘을 얻을 자신이 생겼군요 <br>(그나마 밝은 표정...)',
				condition02:'상아탑밖에 모르는 바보, <br>네크로맨서는 오늘도 여전하네요.',
				condition03:'네크로맨서는 소멸에 대한 불안감을 <br>떨치지 못했네요.'

			},
			{
				monsterName:"메두사",
				role	:"물리 딜러",
				skills:[
					{name:"석화 눈빛",detail:"저주받은 눈빛으로 적을 석화시킵니다. <br>중앙 타입의 적이 있을 경우 해당 대상을 우선 공격합니다.",link:"https://www.youtube.com/embed/pNF72mWurKg"},
					{name:"맹독 칼날",detail:"가장 가까이 있는 적을 중심으로 주변에 맹독 칼날을 떨어뜨려 피해를 줍니다. <br>중앙 타입의 적이 있을 경우 해당 대상을 우선 공격합니다.",link:"https://www.youtube.com/embed/UIEjDqZZAdM"},
					{name:"",detail:"",link:""}
				],
				description:'시선을 마주친 생명체를 돌로 만든다. <br>친구와 눈싸움을 하며 놀고 싶지만 사람들은 그녀를 회피한다. <br>마을을 떠나 자신과 눈싸움을 해줄 친구를 찾아 여행 중이다.',
				message01:'"있잖아, 나랑 눈싸움하지 않을래?"',
				message02:'"나랑 놀고 싶으면, 눈만 마주치면 돼!"',
				message03:'"돌로 만들지 않을 테니 눈싸움 한 번만 해줘. 응?"',
				condition01:'메두사가 눈싸움 할 해골 친구를 발견했군요. <br>기쁘겠어요!',
				condition02:'오늘도 메두사는 혼자서 해골 친구를 찾는 중이군요.',
				condition03:'메두사는 눈싸움 친구를 찾는데 실패했군요. <br>실망했겠어요.'

			},
			{
				monsterName:"사이클롭스",
				role	:"물리 탱커",
				skills:[
					{name:"사이클롭스의 눈",detail:"무시무시한 외눈으로 적을 위협하고 공포에 빠트립니다.",link:"https://www.youtube.com/embed/Or-JS8KrOsk"},
					{name:"분노 강타",detail:"분노를 담아 몽둥이를 강하게 휘두릅니다.",link:"https://www.youtube.com/embed/PEvSax2LZTo"},
					{name:"",detail:"",link:""}
				],
				description:'적에게 공포심을 불러일으켜 행동 불능으로 만든다. <br>상냥하지만 외모만 보고 기피하는 사람이 많아 콤플렉스가 있다. <br>동료들과 한가로이 다과를 즐기는 게 소원이다.',
				message01:'"호¸ 홍차랑 과자 좋아해애?"',
				message02:'"아, 아니며언, 커... 커피는 어떨까아?"',
				message03:'"해... 해치지 않아. 티 타임, 같이 하자아."',
				condition01:'친구들과 다과를 즐길 수 있어 <br>기뻐 보이는 사이클롭스네요.',
				condition02:'늘 그렇듯 <br>함께 차를 마실 친구를 구하는 사이클롭스예요.',
				condition03:'이런.. <br>외모에 더욱 자신감을 잃어버린 사이클롭스예요.'
			},
			{
				monsterName:"코카트리스",
				role	:"마법 탱커",
				skills:[
					{name:"코카 빔",detail:"눈에서 엄청난 빔을 발사하여 적을 석화시킵니다.",link:"https://www.youtube.com/embed/8fGmOQ1SKGw"},
					{name:"마구 쪼기",detail:"적을 부리로 마구 쪼아 따끔한 공격을 가합니다.",link:"https://www.youtube.com/embed/7NicS8UePpk"},
					{name:"",detail:"",link:""}
				],
				description:'단단한 부리로 적에게 피해를 주며 석화시킨다. <br>그리폰 둥지에서 태어났지만 엄마와 모습이 다른 것을 깨닫는다. <br>이 사실에 충격을 받고 친부모를 찾아 여행한다.',
				message01:'＂아저씨! 우리 엄마 본 적 있어요?"',
				message02:'"전 그리폰이 아니라고요! 우리 엄마도요!"',
				message03:'"진짜 엄마를 꼭 찾고 말 거예요!"',
				condition01:'친부모에 대한 단서를 잡았나요? <br>코카트리스는 싱글벙글!',
				condition02:'친부모 찾아 삼만리. <br>코카트리스의 오늘도 평소대로네요.',
				condition03:'그리폰 둥지에서 외면 당한 기억 때문에 <br>코카트리스는 기분이 나빠졌어요.'
			},
			{
				monsterName:"인어",
				role	:"마법 힐러",
				skills:[
					{name:"생명의 찬가",detail:"아름다운 노래로 아군을 회복시킵니다.",link:"https://www.youtube.com/embed/_zOvgdG6tZg"},
					{name:"바다의 축복",detail:"마력의 노래를 불러 아군이 받는 모든 피해를 줄입니다.",link:"https://www.youtube.com/embed/-D2aDWxrA2I"},
					{name:"구원",detail:"생명력이 10% 이하인 아군에게 보호막을 겁니다.",link:"https://www.youtube.com/embed/sx6Ef3CoF7E"}
				],
				description:"생명력이 가장 낮은 동료를 우선 치료한다. <br>인간들은 '인어의 비늘이 강한 마력을 부여한다'는 소문만 믿고 <br>인어들을 학살했지만¸ 인어는 다정한 성품을 버리지 않았다.",
				message01:'"내 도움이 필요한가요?"',
				message02:'"난 믿어요. 인간에게도 무슨 사정이 있을 거예요."',
				message03:'"모두를 사랑하면 다 잘 될거예요. 그렇죠?"',
				condition01:'오랜만에 동족을 만나 <br>기쁨을 나누는 인어의 모습이네요.',
				condition02:'오늘도 인어는 도움이 필요한 친구를 찾습니다. <br>평소처럼요.',
				condition03:'동족이 희생당한 소식을 들은 인어... <br>슬퍼 보이네요.'

			},
			{
				monsterName:"서큐버스",
				role	:"마법 딜러",
				skills:[
					{name:"몽마의 낙인",detail:"적에게 몽마의 인장을 날려 공격합니다. <br>공격이 치명타로 적중 시 추가 피해를 줍니다.",link:"https://www.youtube.com/embed/6P-18UPOlEk"},
					{name:"매혹의 눈빛",detail:"적을 아름다운 미모로 유혹합니다. <br>매혹된 대상은 잠시 동안 아군을 돕습니다.",link:"https://www.youtube.com/embed/BlWbYG3YEW8"},
					{name:"",detail:"",link:""}
				],
				description:'고혹적인 외모로 상대를 현혹해 치명상을 입힌다. <br>아름다운 마족. <br>그녀의 매혹적인 목소리를 들으면 당신은 영원한 잠에 빠지게 될 것이다.',
				message01:'"누나가 놀아줄까? <br>이리 오렴."',
				message02:'"누나가 알아서 할게. <br>누나 믿지?"',
				message03:'"그러게. 누나만 믿으라고 했잖아. 그치?"',
				condition01:'대체 유혹한 인간을 어떻게 한 걸까요? <br>서큐버스의 미소가 짙어지네요.',
				condition02:'오늘도 서큐버스의 유혹은 성공이네요! <br>그런데 이게 평타라니?!',
				condition03:'서큐버스도 유혹에 실패할 때가 있군요. <br>바로 지금처럼요.'

			},
			{
				monsterName:"에틴",
				role	:"마법 탱커",
				skills:[
					{name:"오염성 액체",detail:"적들에게 오염된 액체를 뿜어 공격합니다.",link:"https://www.youtube.com/embed/X9O5BCIFciI"},
					{name:"발 구르기",detail:"발을 굴러 가뿐히 뛰어오릅니다. <br>자신의 마법 방어력을 증가시킵니다.",link:"https://www.youtube.com/embed/GVj19GpXDhI"},
					{name:"지면 강타",detail:"공격을 받으면 분노하여 확률적으로 반격합니다.",link:"https://www.youtube.com/embed/AgZrVQgIMtk"}
				],
				description:'마법 방어력을 강화해 자신을 보호한다. <br>용의 계곡에서 태어난 두 개의 머리¸ <br>하나의 몸을 갖고 있는 쌍둥이다.',
				message01:'좌 에틴: ＂바보야! 고기 그만 먹어! 금방 배부르잖아!＂ <br>우 에틴: ＂고기를 먹어야지! 채소 따위를 왜 먹는 거야?"',
				message02:'좌 에틴: "목감기라서 따뜻한 음료 마시라고 했잖아!" <br>우 에틴: "너야말로 아이스 아메리카노부터 치우시지!"',
				message03:'좌 에틴: "오늘 소개팅이라서 머리 손질하라고 했잖아!" <br>우 에틴: "너의 그 미친 가르마나 정리하고 말하시지!"',
				condition01:'오늘 에틴(좌)와 에틴(우)의 호흡이 잘 맞네요. <br>웬일이죠?',
				condition02:'그래도 이 정도면 에틴 쌍둥이 치곤 <br>무난하네요.',
				condition03:'오늘은 글렀네요. <br>에틴 쌍둥이들이 대판 싸우는 중이에요.'
			},
			{
				monsterName:"라바 골렘",
				role	:"물리 딜탱",
				skills:[
					{name:"화염 강타",detail:"스트레이트 펀치를 날려 적들을 뒤로 밀쳐내고 스킬을 취소시킵니다. <br>주요 능력치가 지능인 대상에게 추가 피해를 줍니다.",link:"https://www.youtube.com/embed/eoTcKGFPlwo"},
					{name:"화염 난타",detail:"주먹에 용암의 힘을 실어 적을 난타합니다. <br>주요 능력치가 지능인 대상에게 추가 피해를 줍니다.",link:"https://www.youtube.com/embed/Xz-sdA8CT28"},
					{name:"",detail:"",link:""}
				],
				description:"불타는 주먹으로 적을 날려 버린다. <br>이프리트에게 '세상을 구한 영웅' 이야기를 듣는 걸 좋아하며 <br>자신도 영웅이 되겠다는 뜨거운 꿈을 불태우고 있다.",
				message01:'"영웅은 패배하지 않아!"',
				message02:'"이프리트가 말했어. 세상을 구하는 자가, 바로 영웅이라고!"	',
				message03:'"포기는 없어! 난, 반드시 영웅이 될 테니까!"',
				condition01:'멘토 이프리트를 만나는 날, <br>라바 골렘은 잔뜩 설레는 중!',
				condition02:'영웅이 되고픈 라바 골렘은 평소처럼 훈련하네요. <br>아주 열정적으로!',
				condition03:'라바 골렘이 지쳐 보이네요. <br>영웅이 되는 길은 쉽지 않겠죠.'
			},
			{
				monsterName:"기사대장 카르고",
				role	:"물리 탱커",
				skills:[
					{name:"최후의 보루",detail:"불굴의 의지를 북돋아 아군의 상태이상 저항 확률을 증가시킵니다.",link:"https://www.youtube.com/embed/A73yRu51-WE"},
					{name:"기사의 의지",detail:"기사의 긍지를 담아 적을 강하게 찌릅니다.",link:"https://www.youtube.com/embed/wxgDIkyZ3Bc"},
					{name:"",detail:"",link:""}
				],
				description:'일정 시간 동안 동료의 상태 이상 저항력을 높인다. <br>엘모어 왕국과의 전쟁에 내보낼 군인을 훈련시키는 한편¸ <br>참전한 부하가 한 명도 돌아오지 못한 것에 의문을 품는다.',
				message01:'"제군들¸ 명예로운<br> 아덴 왕국의 기사가 된 걸 축하하네."',
				message02:'"기사는 오직 명예로움을 추구해야 한단 걸 잊지 말게나."',
				message03:'"아덴의 기사는, 오직 아덴 왕국만을 위해 살아가야 하네."',
				condition01:'기사대장 카르고는 <br>새내기 기사의 면면에 만족한 눈치네요.',
				condition02:'기사대장 카르고의 일상은 변함 없군요. <br>오늘도 마찬가지.',
				condition03:'기사대장 카르고가 기사들의 안위를 걱정하네요. <br>표정이 어둡습니다.'
			},
			{
				monsterName:"아시타지오",
				role	:"물리 탱커",
				skills:[
					{name:"용암 강타",detail:"마그마의 기운을 담아 강력한 어퍼컷을 날립니다.",link:"https://www.youtube.com/embed/gsN1ylcfPd0"},
					{name:"용암의 보호",detail:"끓어오르는 화염의 힘으로 자신의 물리 방어력을 증가시킵니다.",link:"https://www.youtube.com/embed/SvYWjxNVUBM"},
					{name:"복수의 불꽃",detail:"공격을 받으면 분노하여 적에게 반격을 가하고 물리 공격력을 감소시킵니다.",link:"https://www.youtube.com/embed/9_v23SeaL3I"}
				],
				description:'자신에게 가해지는 대미지를 감소시킨다. <br>몸 안에 마그마를 품고 태어나 항상 뜨거운 열기를 내뿜는다. <br>때문에 근처 마족들은 뭔가를 익혀 먹을 땐 항상 그의 몸을 사용한다.',
				message01:'"내 몸은 그릴이 아냐!"',
				message02:'"그릴이 아니라고 했지! 고기 어서 치워!"',
				message03:'"에휴... 포기를 모르네. 알겠어, 구울 거면 내 몫도 챙겨줘."',
				condition01:'아시타지오가 그릴 대신 몸을 내밀다니! <br>기분이 엄청 좋군요!',
				condition02:'아시타지오가 마족들과 티격태격하는 걸 보니 <br>정상입니다.',
				condition03:'아시타지오가 몸에 올려둔 고기를 내동댕이... <br>비상이에요!'
			},
			{
				monsterName:"제니스 퀸",
				role	:"마법 탱커",
				skills:[
					{name:"커스 포이즌",detail:"무작위로 선택한 적을 중심으로 독안개 지대를 형성하여 범위 피해를 주고<br> 확률적으로 침묵시킵니다. <br>대상의 주요 능력치가 지능인 경우 무조건 침묵시킵니다.",link:"https://www.youtube.com/embed/RPGU2kbssxw"},
					{name:"거미줄 덫",detail:"끈적한 거미줄로 적을 묶어 움직임을 둔화시킵니다. <br>대상의 공격 속도를 감소시킵니다.",link:"https://www.youtube.com/embed/WHzCh0hsi8E"},
					{name:"부식 독",detail:"공격을 받으면 확률적으로 부식 독을 발사하여 반격합니다.",link:"https://www.youtube.com/embed/WEX6YMRzThs"}
				],
				description:'마법 공격력을 약화시키는 독 안개를 뿌린다. <br>그림리퍼의 저주로 흉측한 외모가 된 고대 여왕은 <br>타인의 외모를 시기하며 아름다움을 앗아간다.',
				message01:'"그 아름다운 외모를 내놔!"',
				message02:'"너에게 그 미모는 결코 어울리지 않아."',
				message03:'"아름다움은 그에 걸맞은 내가 가져가겠어."',
				condition01:'빼앗은 아름다움이 마음에 든 제니스 퀸. <br>즐거워 보이네요.',
				condition02:'별다를 것 없군요. 제니스 퀸은  <br>아름다움 사냥 중이네요.',
				condition03:'여전히 아름다움에 목마른 제니스 퀸은 <br>울적해 보입니다.'
			},
			{
				monsterName:"시어",
				role	:"마법 딜러",
				skills:[
					{name:"섬멸 광선",detail:"적을 꿰뚫는 강력한 광선을 발사합니다.",link:"https://www.youtube.com/embed/3g4E1dRNOb0"},
					{name:"신비한 폭발",detail:"눈에 마력을 집중해 가장 가까이 있는 적과 그 주변 범위에 폭발을 일으킵니다. <br>상태이상에 걸린 적이 있을 경우 해당 대상을 우선 공격합니다.",link:"https://www.youtube.com/embed/oBAMirWykaU"},
					{name:"",detail:"",link:""}
				],
				description:'눈을 마주친 적을 공포에 빠트린다. <br>나이트발드의 왼쪽 눈으로 만들어진 마물이다. <br>진실되지 못한 자¸ 탐욕된 자 모두를 돌로 만든다.',
				message01:'"나는... 진실과 거짓을... 보는 자."',
				message02:'"오직... 진실...에만... <br>응할 것이다."	',
				message03:'"거짓...을 고한다면... <br>진실의... 철퇴...가."',
				condition01:'간만에 진실된 자를 만난 시어는, <br>왠지 유쾌해 보입니다.',
				condition02:'거짓 80%에 진실 20%... <br>시어의 눈에 비친 뻔한 일상입니다.',
				condition03:'시어는 거짓으로 가득한 모험자를 <br>상대하느라 지쳐 보입니다.'

			},
		],
		// 상단 소환수 보기 영역
		show: {
			choice: '{{{guildCount}}}명의 혈맹원이 게임으로 소환했습니다.',
			notMy: '아직 소환하지 못한 소환수입니다.',
			notGuild: '혈맹가입 시, 인게임 소환현황 확인가능!',
			reserve: '{{{monsterName}}} 소환!! <br>선택하신 소환수가 오픈 후 게임으로 직접 소환됩니다.',
			reserveChange: '{{{monsterName}}} 소환!!! <span class="desc">선택하신 소환수가 {{{beforeName}}} 대신 게임으로 직접 소환됩니다.</span>',
			reserveFail: '소환수 뽑기 3성에 달성하시면, <br>게임으로 직접 소환하실 수 있습니다.',
			reserveNotGuild: '소환이 완료되었습니다.'
		},
		// 뽑기 (컬렉션에 소환하기)
		pick: {
			pickBtn: '컬렉션 소환',
			ticketZero: '컬렉션 소환 티켓이 없습니다. <br>소환 티켓은 매일 밤 12시에 5장씩 자동충전됩니다.',
			monsterFull: '모든 소환수를 획득하셨습니다.',
			result1:'{{{monsterName}}} 소환!',
			result2:'{{{monsterName}}} 2성 달성!',
			result3:'{{{monsterName}}} 3성 달성!',
			first: '보너스 단검 지급! <span class="desc">첫 소환수 뽑기를 축하하며 보너스 단검 +250개를 지급하였습니다. <br>지금 포인트 샵에서 바로 단검을 사용해보세요.</span>',
			section: '{{{monsterCount}}}번째 소환수 획득 성공으로 +50단검을 함께 드립니다.',
			level: '소환수 3성 달성으로 +10단검을 추가로 드립니다.',
			reserveComplete: '소환이 완료되었습니다.',
			shareSnsTit : '레드나이츠 기사단 컬렉션 : {{{monsterName}}} 소환수 획득!',
			shareSnsImg : '',
			shareSnsDec : '기사단 컬렉션에서 {{{monsterName}}} 소환수를 획득하셨습니다. 사전등록 페이지에서 다양한 미니게임과 함께 레드나이츠의 개성있는 소환수들을 만나보실 수 있습니다!',
			shareSnsLast : '지금 바로 레드나이츠 사전등록에 참여하세요!',
			shareGuildTit : '레드나이츠 기사단 컬렉션 : {{{monsterName}}} 소환수 획득!',
			shareGuildDec : '{{{monsterName}}} 소환수를 만나보세요!'
		},
		detail: {
			shareMsg: '{{{monsterName}}}의 {{{skillName}}} 스킬을 공유하였습니다. 확인하려면 여기에! {{{skillLink}}}'
		}
	},
	// 기사단 점령전
	occupation: {
		landNames: ['말하는섬','글루디오','오크 숲','윈다우드','상아탑','아덴','하이네'],
		notice: {
			checking: '지금은 전투 결과를 확인하고 있습니다.',
			waiting: '지금은 전투 준비중입니다.'
		},
		insert: {
			shareSnsTit : '레드나이츠 기사단 점령전 : {{{landName}}}-{{{areaName}}} 침공 완료',
			shareSnsImg : '',
			shareSnsDec : '{{{landName}}}에서 치열한 전투가 펼쳐지고 있습니다! 점령전 승리를 위해서는 혈맹원들의 도움이 필요합니다.',
			shareSnsLast : '지금 바로 레드나이츠에 접속하세요!',
			shareGuildTit : '레드나이츠 기사단 점령전 : {{{landName}}}-{{{areaName}}} 침공 완료',
			shareGuildDec : '{{{landName}}}-{{{areaName}}} 거점에 소환수 {{{insertMy}}}명을 투입했습니다.'
		}
	},
	// 기사단 레이스
	race: {
		unit: '경기',
		selection: {
			hasMonster: ['미보유','보유'],
			complete: '출전 신청 완료',
			completeMsg : '출전 신청 완료 했습니다. <br> 신청 종료 후 경기 결과를 확인해주세요!',
			disable: '보유하신 소환수만 레이스에 신청할 수 있습니다.'
		},
		resultDetail: {
			title: '결과입니다.',
			time: '경기 시각',
			attendA: '{{{monsterName}}} 소환수가 {{{monsterRank}}}위를 기록했습니다.',
			attendB: '{{{monsterName}}} 소환수는 출전하지 못했습니다.',
			attendC: '이번 레이스에 참여하지 않았습니다.'
		},
		help: {
			shareSnsTit : '레드나이츠 기사단 레이스 : {{{monsterName}}} 소환수 선택!',
			shareSnsImg : '',
			shareSnsDec : '기사단 레이스에서 {{{monsterName}}} 소환수를 선택하셨습니다. 과연 이번 레이스에서는 1등을 차지할 수 있을까요? ',
			shareSnsLast : '지금 바로 레드나이츠에서 확인하세요!',
			shareGuildTit : '레드나이츠 기사단 레이스 : {{{monsterName}}} 소환수 선택!',
			shareGuildDec : '{{{monsterName}}} 소환수가 레이스에서 1등할 수 있도록 도와주세요!'
		}
	}
}