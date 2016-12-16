// L10N 적용 
var RK_RESOURCES = {
	data: 'http://opdev.rk.plaync.com/minigame/',
	img: 'http://akstatic.plaync.com/RK/minigame/',
	lang: '_lang/sea/',
	common: {
		// 기본정보 (공유용)
		info: {
			gameName: 'Lineage Red Knights',
			url: 'http://asia.nc.com/rk/se/?rk=3180016',
			image: {
				link: 'http://akstatic.plaync.com/resource/rk/meta/rk_v1103.jpg',
				width: 750,
				height: 594
			},
			hashtags: 'Lineage, LineageRedKnights, RedKnights, NCSOFT'
		},
		// 경고 메시지
		alert: {
			// 로그인 하지 않았을 시
			notLogin: 'Please log in to play.',
			// 혈맹 가입하지 않았을 시
			notGuild: 'Try joining or creating a guild to play <br>the Guild Wars or participate in a Race!',
			// 네이트워크 상태 불량
			badNetwork: 'Poor network connectivity. <br>Please try again later.',
			// 게임 기간 종료
			minigameEnd: 'The event is closed.'
		},
		// 랭킹
		ranking: {
			titRank:'Rank',
			titGuildName:'Guild Name',
			titPoint: ['Pets', 'Siege Points', 'Total Points'],
			coinMsg:'Reach rank 50 or above to get the token of the knights you can use in the actual game!',
			guildInfo: '{{{guildName}}} has reached rank {{{guildRank}}}.',
			collection: 'Pets : {{{count}}}',
			occupation: 'Siege Points {{{count}}}',
			occupationReward: 'Estimated the token of the knights : {{{myReward}}}',
			race: 'Total Points : {{{count}}}',
			notGuild: 'You are not in a guild. <span class="desc">Try joining or creating a guild!</span>'
		},
		// 공유하기
		share: {
			guild: 'A message has been shared in guild chat. <br>Go to chat now?',
			guildLink: 'http://www.plaync.com/',
			notGuild: 'You need to be in a guild.',
			rewardTicket: 'You received Summon Tickets.',
			rewardDagger: 'You received {{{daggerCount}}} Daggers.'
		}
	},
	// 기사단 컬렉션
	collection: {
		// 소환수 정보
		monsterInfo: [
			{
				monsterName:"Maria",
				role	:"Melee Dealer",
				skills:[
					{name:"Mighty Bolt", detail:"Pushes back an enemy and cancels skill by shooting a powerful boltAttacks an enemy with the lowest HP first.", link:"https://www.youtube.com/embed/ZWlpwvaXyp8"},
					{name:"Revolver ", detail:"Shoots 6 crossbow bolts in quick succession, attacking the enemy with the lowest HP.", link:"https://www.youtube.com/embed/Laz-kE-KuUI"},
					{name:"", detail:"", link:""}
				],
				description:'Attacks and pushes back an enemy with the lowest HP. <br>Maria is the second-eldest amongst the three sisters. <br>She always gets told off because of her careless actions.',
				message01:'"Will you ever leave me alone?"',
				message02:'"This is just basics."',
				message03:'"Don\'t be surprised. It\'s just the beginning."',
				condition01:'"Maria looks determined. <br> It\'s going to be a great day for the team!"',
				condition02:'"Maria is always like that. There\'s nothing to be worried of."',
				condition03:'"Maria looks agitated. There must be something wrong."'
			},
			{
				monsterName:"Olga",
				role	:"Magic Healer",
				skills:[
					{name:"Heaven's Light", detail:"Heals allies with a holy light of Einhasad.", link:"https://www.youtube.com/embed/KXdMkjoYfTw"},
					{name:"Hammer of Justice", detail:"Slams an enemy with the Hammer of Justice, draining enemy's skill gauge.", link:"https://www.youtube.com/embed/ehYOLtn6Bbc"},
					{name:"God's Blessing", detail:"Shields an ally with an HP below 30% with the power of the holy light.", link:"https://www.youtube.com/embed/FPiLWcvSJME"}
				],
				description:'Attacks and pushes back an enemy with the lowest HP. <br> Maria is the second-eldest amongst the three sisters. <br>She always gets told off because of her careless actions.',
				message01:'"May the blessings of Einhasad be with you."',
				message02:'"It\'s been an honor to work with you."',
				message03:'"Einhasad will lead you to the right path."',
				condition01:'"Even the dead will come back alive <br> to see Olga\'s benevolent smile."',
				condition02:'"Olga is looking after her friends, as always."',
				condition03:'"Olga is a bit edgy today. She\'s definitely not smiling."'
			},
			{
				monsterName:"Irina",
				role	:"Magic Dealer",
				skills:[
					{name:"Knockback Bomb", detail:"Knocks back enemies and cancels their skills by throwing a bombAttacks a skill casting enemy first.", link:"https://www.youtube.com/embed/C0FTjLKytkg"},
					{name:"Sticky Jelly", detail:"Pours sticky stuff on the enemies to slow their Attack Speed.", link:"https://www.youtube.com/embed/VVJbMr6tzGI"},
					{name:"", detail:"", link:""}
				],
				description:'Causes explosions that hinders enemy attacks. <br>The youngest sister Irina thinks she is the smartest in the whole world. <br>Her bag is always heavy with all the handmade potions.',
				message01:'"My bag is too heavy..."',
				message02:'"Oh this is too heavy. Shall I drink everything up?"',
				message03:'"Yes, I know. Heavy potions are more precious."',
				condition01:'"Irina seems satisfied with her newly made potions today."',
				condition02:'"Irina\'s bag is heavy and full of potions as always."',
				condition03:'"Irina is polite today. And this is not a good sign."'
			},
			{
				monsterName:"Spartoi",
				role	:"Magic Dealer",
				skills:[
					{name:"Defense Formation", detail:"Braces up for battle to decrease incoming damage for allies.", link:"https://www.youtube.com/embed/w6JdAWkN33M"},
					{name:"Shield Attack", detail:"Attacks an enemy with a shoddy shield with all might.", link:"https://www.youtube.com/embed/qYgPt3dB9Yk"},
					{name:"", detail:"", link:""}
				],
				description:'Protects allies from magic attacks. <br>The captain of the skeleton army. <br>He is always very proud of his soldiers.',
				message01:'"Calcium makes me invincible!"',
				message02:'"We all look the same! How cool is that!"',
				message03:'"I\'m not afraid of death! I\'m an undead and I\'m already dead!"',
				condition01:'"Guess the Spartoi had milk and cheese for lunch!"',
				condition02:'"I wonder what Spartoi has in mind. Or if he even has the ability to think."',
				condition03:'"Spartoi is not feeling well today."'

			},
			{
				monsterName:"Black Knight",
				role	:"Melee Tanker",
				skills:[
					{name:"Bash", detail:"Pushes back enemies in front with the shield and cancels their skillsStuns pushed back enemies at a chance.", link:"https://www.youtube.com/embed/o3NE8Lo_k-M"},
					{name:"Strengthen Armor", detail:"Strengthens armor using the shield to reduce incoming damage.", link:"https://www.youtube.com/embed/EePUehgp4zE"},
					{name:"", detail:"", link:""}
				],
				description:'Pushes back an enemy with his shield, blocking all attacks. <br>The Black Knight has been with Kurtz since they were pirates. <br>He is ready to fight until death for Kurtz.',
				message01:'"You stay away from Lord Kurtz!"',
				message02:'"I will follow Kurtz till death."',
				message03:'"My life for Kurtz!"',
				condition01:'"The Black Knight seems happy, just like when he was out on the sea."',
				condition02:'"The Black Knight is waiting for Kurtz\'s orders."',
				condition03:'"I\'m sure the Black Knight is feeling gloomy. Look at his face under the helm!"'
			},
			{
				monsterName:"Ramia",
				role	:"Magic Dealer",
				skills:[
					{name:"Tail Sweep",detail:"Swings her tail strongly towards the enemy.",link:"https://www.youtube.com/embed/ASFkcKZQdKM"},
					{name:"Poisoned Weapon", detail:"Increases critical hit by putting poison on our army",link:"https://www.youtube.com/embed/9cBi_67EkmY"},
					{name:"Kiss of Death",detail:"Damages the enemy by throwing deadly poison. Activates if the enemy is petrified.",link:"https://www.youtube.com/embed/SMXIDii5-5w"}
				],
				description:'Attacks petrified enemies. <br>Seduces men who visit the lake¸ hoping for a steady relationship. <br>Unfortunately¸ it\'s not easy as it seems.',
				message01:'“Gosh! You look great!”',
				message02:'“I’d like to take a stroll around this beautiful lake with you.”',
				message03:'“How about a beautiful lakeside dinner tonight?”',
				condition01:'Today’s Ramia is too beautiful!',
				condition02:'Ramia is looking for romance, as always.',
				condition03:'Ramia couldn\'t find anyone attractive. She seems disappointed.'
			},
			{
				monsterName:"Werewolf",
				role	:"Melee Dealer",
				skills:[
					{name:"Shadow Attack", detail:"Hides in shadow and appears at the back of the enemy farthest away to deal damage.", link:"https://www.youtube.com/embed/eFX1HB71_So"},
					{name:"Master Hunter", detail:"Hurls a weapon at enemies with speed and precision to deal damage.", link:"https://www.youtube.com/embed/7jM1cx1V3mM"},
					{name:"", detail:"", link:""}
				],
				description:'Quickly moves back to the enemy to deal damage. <br>He once saved his life by getting bit by a Lycanthrope. <br>After becoming a werewolf, he is traveling to return the favor.',
				message01:'＂The fate of my kind is in my hands.＂',
				message02:'"Nah. I\'m not a human. I\'m a werewolf."',
				message03:'"Lycanthropes always return favors. That\'s what we do."',
				condition01:'"The Werewolf is happy to get a second chance to return the favor!"',
				condition02:'"Another typical day for the Werewolf."',
				condition03:'"Werewolf is feeling the burden that the fate of his race lies on him."'
			},
			{
				monsterName:"Dwarf Swordsman",
				role	:"Melee Hybrid",
				skills:[
					{name:"Fissure", detail:"Focuses strength on the sword to slash multiple enemies at onceDeals bonus damage to DEX enemies.", link:"https://www.youtube.com/embed/PXdl5vIPIFg"},
					{name:"Heavy Blow", detail:"Attacks an enemy with a deadly thrustDeals bonus damage to DEX enemies.", link:"https://www.youtube.com/embed/gv3FxithyfI"},
					{name:"", detail:"", link:""}
				],
				description:'Slashes the enemy in front. <br>He is traveling to discover a new mineral<br>so that he can beat the best Blacksmith of Aden, Ibelvin.',
				message01:'"I\'m the best Blacksmith, not him!"',
				message02:'"My crafting skill is getting better and better every day!"',
				message03:'"MY weapons are the best! Not the trash Ibelvin makes!"',
				condition01:'"The Dwarf Swordsman just crafted an Epic weapon. He must feel proud of himself."',
				condition02:'"The Dwarf Swordsman crafted a mediocre weapon today."',
				condition03:'"The Dwarf Swordsman crafted a bad one today. He\'s feeling low."'
			},
			{
				monsterName:"King Bugbear",
				role	:"Melee Tanker",
				skills:[
					{name:"Earth Wrecker", detail:"Falls hard on the ground to cause an earthquake that knocks back enemies and cancels their skills.", link:"https://www.youtube.com/embed/vxLDJebU7I4"},
					{name:"Swing Club", detail:"Swings a heavy club at an enemy as if it's feather-light.", link:"https://www.youtube.com/embed/S4PvcW5S8Zs"},
					{name:"", detail:"", link:""}
				],
				description:'Shakes the earth and knocks down enemies. <br>Hates werewolves since his second brother got killed by them. <br>His sole purpose of life is to protect his little brother Bugbear.',
				message01:'"Leave my brother alone!"',
				message02:'"Werewolves... You shall pay!"',
				message03:'"I will protect my little brother with my life!"',
				condition01:'"King Bugbear at his prime. He looks happy!" ',
				condition02:'"King Bugbear is looking after his little brother."',
				condition03:'"Did King Bugbear have a fight with an werewolf? He looks exhausted."'
			},
			{
				monsterName:"Seria",
				role	:"Melee Dealer",
				skills:[
					{name:"Arrow of Destruction", detail:"Shoots a powerful arrow in the head to stun the enemy.", link:"https://www.youtube.com/embed/J8menSkT_J0"},
					{name:"Chaotic Arrow", detail:"Attacks an enemy with an arrow infused with chaotic energyDeals bonus damage to enemies with status effect.", link:"https://www.youtube.com/embed/TNN3jUZ6Qco"},
					{name:"", detail:"", link:""}
				],
				description:"Shoots arrows to attack and stun an enemy. <br>She was not allowed to talk during her assassin training. <br>That's why she talks so quietly you can't even hear her properly.",
				message01:'"I\'m... That\'s..."',
				message02:'"D-don\'t you m-move!"',
				message03:'"M-m... c...!"',
				condition01:'"What was that? Didn\’t Seria just say she\'s happy?"',
				condition02:'"I can hear the Seria today. That\'s good."',
				condition03:'"I wonder what Seria just said. She\'s even quieter today."'
			},
			{
				monsterName:"Orc Axeman",
				role	:"Melee Dealer",
				skills:[
					{name:"Throwing Axe", detail:"Hurls a huge axe towards an enemy to destroy enemy's armorDecreases enemy's Defense.", link:"https://www.youtube.com/embed/C0JQFlylAUk"},
					{name:"Battle Wounds", detail:"Swings axe to inflict horrific wounds and cause Bleeding on an enemy.", link:"https://www.youtube.com/embed/QT1_SrTNRlM"},
					{name:"", detail:"", link:""}
				],
				description:"Breaks enemy's armor with a huge axe, bleeding the enemy. <br>He loves fights and battles due to his belligerent nature. <br>And Orcus favors him because of this.",
				message01:'"Stop talking and fight me!"',
				message02:'"Battle is the only purpose of my life!"',
				message03:'"I will fight you, and win! Give me everything you got!"',
				condition01:'"The Orc Axeman is excited over the thought of a brawl!"',
				condition02:'"The Orc Axeman is loud as always."',
				condition03:'"What a peaceful day today. Not a good day for the Orc Axeman."'

			},
			{
				monsterName:"Stone Golem",
				role	:"Magic Tanker",
				skills:[
					{name:"Granite Shield", detail:"Hardens body with the power of stonesDecreases incoming damage of allies.", link:"https://www.youtube.com/embed/gREDDUGQjZM"},
					{name:"Golem's Roar", detail:"Roars at the enemies to cause damage.", link:"https://www.youtube.com/embed/H8Poj-GM5VY"},
					{name:"", detail:"", link:""}
				],
				description:'Protects allies with his magic and strong body. <br> The very last golem Hardin has created. <br> He is a playful, energetic little brother to all other golems.',
				message01:'"Play with me! Pleeease?"',
				message02:'"Where\'s my brother and sister? They promised to play with me!"',
				message03:'"No! You promised to play with me!"',
				condition01:'"Stone Golem is smiling at you. He\'s glad to find a friend." ',
				condition02:'"Stone Golem is looking for a friend to play with."',
				condition03:'"There\'s no one to play with Stone Golem. What are we going to do?"'
			},
			{
				monsterName:"Faun",
				role	:"Melee Dealer",
				skills:[
					{name:"Yggdrasil Branch", detail:"Throws a spear made of Yggdrasil's branch at the enemyIgnores enemy's Defense.", link:"https://www.youtube.com/embed/7tjGMvgcMdE"},
					{name:"Faun's Flute", detail:"Plays the flute to increase Attack Speed of allies.", link:"https://www.youtube.com/embed/V3uUvrhzaEE"},
					{name:"", detail:"", link:""}
				],
				description:"Throws a spear that ignores enemy's Defense. <br>Currently teaching the Fairy Princess about how to be a proper Guardian. <br>He is worried about his hair loss because elves always pluck his hair out.",
				message01:'"Know any good hair-restorer?"',
				message02:'"Can you cure my hair loss?"',
				message03:'"I kept the forest safe. But couldn\'t stop my hair from falling."',
				condition01:'"Faun seems satisfied. Maybe he got some good advice about his hair condition."',
				condition02:'"Faun is diligently tending his hair."',
				condition03:'"Faun is depressed. The drain got clogged with hair again today."'
			},
			{
				monsterName:"Fairy Princess",
				role	:"Magic Dealer",
				skills:[
					{name:"Sleepy Pollen", detail:"Deals damage using pollen carried by a breeze and puts an enemy to sleep.", link:"https://www.youtube.com/embed/jj3msH_BZvg"},
					{name:"Healing Flower", detail:"Summons a flower that heals allies and removes debuff.", link:"https://www.youtube.com/embed/CJoe0iT3Tnc"},
					{name:"", detail:"", link:""}
				],
				description:"Summons a beautiful flower that heals allies. <br>She is learning about Guardians not from her strict mother, but Faun. <br>She knows Faun's secret, and is trying hard not to blurt it out.",
				message01:'"Listen! Fauns\' got... No. It\'s a secret!"',
				message02:'"I was just kidding!"',
				message03:'"Yay! 100% prank success rate! Again! Hahaha!"',
				condition01:'"Fairy Princess is humming joyfully. Her prank on Faun worked good."',
				condition02:'"As usual, Fairy Princess is looking for a target to prank." ',
				condition03:'"Fairy Princess\' pranks are not going well today."'

			},
			{
				monsterName:"Daemon",
				role	:"Magic Dealer",
				skills:[
					{name:"Flames of Hell", detail:"Covers enemies with hellfire to deal Burn damage.", link:"https://www.youtube.com/embed/dFhHfYOh19k"},
					{name:"Infernal Fire", detail:"Hits an enemy with a flaming fistDeals bonus damage to debuffed enemies.", link:"https://www.youtube.com/embed/L9xBIH0chxc"},
					{name:"", detail:"", link:""}
				],
				description:'Covers enemies with fire to cause Burns. <br>He is angry about being locked in the Ivory Tower by the humans. <br>When he is out, all hell will break loose.',
				message01:'"Pathetic humans. I\'ll make you pay for this!"',
				message02:'"I\'ve been waiting for this day since I was sealed in that damn tower..."',
				message03:'"My fire feeds on your pain and agony!"',
				condition01:'"The Daemon is happy to be freed from his seal!"',
				condition02:'"The Daemon is adjusting to the world. Take your time."',
				condition03:'"The Daemon didn\'t sleep well last night because of nightmares."'

			},
			{
				monsterName:"Iron Golem",
				role	:"Melee Tanker",
				skills:[
					{name:"Energy Burst", detail:"Causes a strong explosion to inflict damage to enemies, ignoring their Defense.", link:"https://www.youtube.com/embed/_-6-sxNoR_A"},
					{name:"Fist of Iron", detail:"Accumulates energy to smash an enemy with two hands.", link:"https://www.youtube.com/embed/1r8jsWwsM_M"},
					{name:"", detail:"", link:""}
				],
				description:"Ignores enemy's Defense and causes AoE damage. <br>The first golem of Aden that Hardin and Ibelvin have created together. <br>He's a responsible golem who looks after others.",
				message01:'"Manners, please!"',
				message02:'"We golems are graceful creatures. Do not debase yourself."',
				message03:'"Manner makes a golem. Be polite."',
				condition01:'"Iron Golem\'s little brothers and sisters have calmed down, finally."',
				condition02:'"Iron Golem is busy looking after her little brothers and sisters."',
				condition03:'"Iron Golem\'s little brothers and sisters are getting on her nerves."'
			},
			{
				monsterName:"Iceman",
				role	:"Magic Dealer",
				skills:[
					{name:"Array of Affection", detail:"Heals and removes debuff of allies with love.", link:"https://www.youtube.com/embed/Z2HGGEaVU0g"},
					{name:"Icicle Shot", detail:"Shoots a sharp icicle at an enemy.", link:"https://www.youtube.com/embed/ez7IdsNZAmY"},
					{name:"", detail:"", link:""}
				],
				description:'Heals allies and removes debuff at a chance. <br>The Iceman woke up by the coldness the Ice Queen emitted on her awakening. <br>He thinks it was the power of love that woke him up.',
				message01:'"I will save her with my love!"',
				message02:'"My Queen, you light up my heart!"',
				message03:'"I am here for you, my Queen. You\'re the reason of my life!"',
				condition01:'"Is Iceman going on a date with the Ice Queen? He seems thrilled."',
				condition02:'"Iceman is begging for the Ice Queen\'s love, as always."',
				condition03:'"What a dreary face. Iceman got dumped by the Ice Queen again."'

			},
			{
				monsterName:"Ice Queen's Handmaiden",
				role	:"Magic Dealer",
				skills:[
					{name:"Frozen Icicle", detail:"Shoots a frozen icicle freezes an enemy. Back row first.", link:"https://www.youtube.com/embed/5_JDNJeCLis"},
					{name:"Hot Iced Tea", detail:"Serves hot iced tea that recovers allies.", link:"https://www.youtube.com/embed/nHiOeu_tkr0"},
					{name:"", detail:"", link:""}
				],
				description:"Heals allies with a warm snow blizzard. <br>The Ice Queen's faithful handmaiden. <br>Wants to make her depressed Queen smile.",
				message01:'"It\'s a lovely day my Queen. Would you like to go for a walk?"',
				message02:'"How about some sweet dessert, my Queen?"',
				message03:'"You look great today, my Queen. Shall we go shopping today?"',
				condition01:'"Watching her Queen smile for a change makes the Handmaiden happy."',
				condition02:'"The Handmaiden is always thinking of a way to make her Queen smile."',
				condition03:'"The Handmaiden is sad because the Queen is sad. What could she do to make her smile?"'

			},
			{
				monsterName:"Necromancer",
				role	:"Magic Dealer",
				skills:[
					{name:"Soul Drain", detail:"Causes an explosion near the enemy with the highest skill gaugeDrains skill gauge of enemies within range.", link:"https://www.youtube.com/embed/D54qgNL4FX4"},
					{name:"Death Circle", detail:"Creates a circle of dark magic to attack an enemy.", link:"https://www.youtube.com/embed/mrlTwdBM9Cs"},
					{name:"", detail:"", link:""}
				],
				description:'Deals damage with an AoE attack and drains their skill gauge. <br>He almost disappeared when the mental control from Hardin stopped. <br>Attracted by the Darkness, his survival instinct led him to the Ivory Tower.',
				message01:'"Power... I want power!"',
				message02:'"Ivory Tower... I need to be there...!"',
				message03:'"Power... More power... I need more power..."',
				condition01:'"The Necromancer looks cheerful (in his own way) at the thought of gaining power."',
				condition02:'"All that the Necromancer thinks of is power. And the Ivory Tower."',
				condition03:'"The Necromancer is worried that he might disappear."'

			},
			{
				monsterName:"Medusa",
				role	:"Melee Dealer",
				skills:[
					{name:"Petrifying Beam",detail:"Petrifies an enemy with a cursing gaze. <br>Attacks enemies in the middle row first",link:"https://www.youtube.com/embed/pNF72mWurKg"},
					{name:"Poison Blade",detail:"Throws poisoned blades to enemies. <br>Attacks enemies in the middle row first",link:"https://www.youtube.com/embed/UIEjDqZZAdM"},
					{name:"",detail:"",link:""}
				],
				description:'Turns anyone who looks into her eyes to stone. <br>She wants to have a staring contest but people always turn her down. <br>She\'s looking for a friend who can look into her eyes.',
				message01:'“Hey, how about a staring match?”',
				message02:'“All you need to do is look into my eyes!”',
				message03:'“Could we do just one staring contest? I won’t turn you to stone!”',
				condition01:'Medusa has found a skeleton friend for a staring contest. Way to go!',
				condition02:'Medusa is looking for her skeleton friend, as always.',
				condition03:'Medusa couldn\'t find a staring contest buddy. She\'s disappointed.'

			},
			{
				monsterName:"Cyclops",
				role	:"Melee Tanker",
				skills:[
					{name:"Cyclops Eye", detail:"Threatens an enemy with the scary Cyclops eye and strikes fear in the enemy.", link:"https://www.youtube.com/embed/Or-JS8KrOsk"},
					{name:"Furious Strike", detail:"Swings club hard to damage an enemy.", link:"https://www.youtube.com/embed/PEvSax2LZTo"},
					{name:"", detail:"", link:""}
				],
				description:'Strikes fear, immobilizing the enemy. <br>The Cyclops is a kind creature, but people fear him because of his looks. <br>His only wish is to sit down and have a cup of tea with some friends.',
				message01:'"D-do you like black tea?"',
				message02:'"H-how about some coffee as well?"',
				message03:'"I-I won\'t hurt you. Have some t-tea with me, please?"',
				condition01:'"Cyclops\' wish finally came true. He\'s delighted to have tea time with his friends."',
				condition02:'"Cyclops wanders about to find friends to have tea with."',
				condition03:'"Oh no. Cyclops lost self-confidence. He hates his appearance."'
			},
			{
				monsterName:"Cockatrice",
				role	:"Magic Tanker",
				skills:[
					{name:"Cockatrice Beam", detail:"Fires a powerful beam to petrify an enemy!", link:"https://www.youtube.com/embed/8fGmOQ1SKGw"},
					{name:"Peck", detail:"Pecks on an enemy!", link:"https://www.youtube.com/embed/7NicS8UePpk"},
					{name:"", detail:"", link:""}
				],
				description:"로Deals damage with its beak and petrifies an enemy. <br>Cockatrice soon finds out he looks different from his sibling griffons. <br>He travels to find his true parents.",
				message01:'"Hey, have you seen my mom?"',
				message02:'"I tell you I\'m not a griffon! My mom\'s not a griffon too!"',
				message03:'"I will find my mom one day!"',
				condition01:'"Did Cockatrice hear a lead about his mother\'s whereabouts? He\'s cheerful today."',
				condition02:'"Cockatrice is still looking for his mother."',
				condition03:'"Cockatrice remembered how he was teased at the griffon\'s nest. He\'s angry."'
			},
			{
				monsterName:"Mermaid",
				role	:"Magic Healer",
				skills:[
					{name:"Vital Hymn", detail:"Heals allies with a heartwarming song.", link:"https://www.youtube.com/embed/_zOvgdG6tZg"},
					{name:"Ocean’s Blessings", detail:"Sings a magical song that immunes allies to all damages.", link:"https://www.youtube.com/embed/-D2aDWxrA2I"},
					{name:"Salvation", detail:"Shields an ally with an HP below 10%.", link:"https://www.youtube.com/embed/sx6Ef3CoF7E"}
				],
				description:"Heals an ally with the lowest HP. <br>Humans killed the mermaids believing that their scales have strong magic powers. <br>But the mermaid still didn't loose her faith for the world.",
				message01:'"Need my help?"',
				message02:'"I trust you. There must be a reason why humans are doing this to us."',
				message03:'"Love is the answer to everything, right?" ',
				condition01:'"The Mermaid is pleased to meet one of her own."',
				condition02:'"The warmhearted Mermaid is looking for people in need." ',
				condition03:'"Mermaid heard what happened to her people. She looks sad."'

			},
			{
				monsterName:"Succubus",
				role	:"Magic Dealer",
				skills:[
					{name:"Sigil of Succubus", detail:"Attacks an enemy with a sigil of Succubus <br>Deals bonus damage on critical hit.", link:"https://www.youtube.com/embed/6P-18UPOlEk"},
					{name:"Charming Eyes", detail:"Seduces an enemy with absolute beauty <br>Seduced enemy will help allies for a short time.", link:"https://www.youtube.com/embed/BlWbYG3YEW8"},
					{name:"", detail:"", link:""}
				],
				description:'Seduces the enemy with her beautiful looks, dealing powerful damage. <br>An attractive demon. Anyone who listens her voice<br>will be put to an endless sleep.',
				message01:'"Come to me, sweetie."',
				message02:'"I\'ll handle this. Trust me."',
				message03:'"I told you, I\'ll handle it. Trust me!"',
				condition01:'"What does Succubus do with the humans she seduced? She seems to be elated with joy."',
				condition02:'"The warmhearted Mermaid is looking for people in need." ',
				condition03:'"Even Succubus can sometimes fail to seduce people. Just like today."'

			},
			{
				monsterName:"Etin",
				role	:"Magic Tanker",
				skills:[
					{name:"Polluted Fluid", detail:"Attacks an enemy by covering the enemy with polluted fluid.", link:"https://www.youtube.com/embed/X9O5BCIFciI"},
					{name:"Stomp", detail:"Stomps and jumps highIncreases Magic Defense of self.", link:"https://www.youtube.com/embed/GVj19GpXDhI"},
					{name:"Earth Smash", detail:"Becomes furious when attacked and counters at a chance.", link:"https://www.youtube.com/embed/AgZrVQgIMtk"}
				],
				description:"Protects self with increased Magic Defense. <br>Twins with two heads and one body, <br>born in the Dragon's Valley.",
				message01:'"Left Etin: "Stop eating meat! It makes you full!" <br>"Right Etin: "I hate vegetables! Meat is the best!"',
				message02:'Left Etin: "I told you, drink hot tea when you\'re sick with a cold!" <br>"Right Etin: "What\'s that iced Americano in your hand then? Huh?"',
				message03:'Left Etin: "Do something with your hair! We\'re going on a blind date today, remember?" <br>"Right Etin: "How about we start with washing your greasy hair, stupid!"',
				condition01:'"Left Etin and Right Etin are not arguing today. Wonder what happened!"',
				condition02:'"The Etin twins are fighting again."',
				condition03:'"Not a good day for the Etin twins. This fight is going to hurt."'
			},
			{
				monsterName:"Lava Golem",
				role	:"Melee Hybrid",
				skills:[
					{name:"Lava Punch", detail:"Punches enemies to push back and cancel their skillsDeals bonus damage to INT enemies.", link:"https://www.youtube.com/embed/eoTcKGFPlwo"},
					{name:"Lava Strike", detail:"Strikes an enemy with magma energyDeals bonus damage to INT enemies.", link:"https://www.youtube.com/embed/Xz-sdA8CT28"},
					{name:"", detail:"", link:""}
				],
				description:"Knocks away the enemy with a flaming fist. <br>Likes to listen to stories of heroes from Ifrit. <br>Dreams to be a hero and save the world one day.",
				message01:'"A hero never dies."',
				message02:'"Ifrit told me, heroes are people who save the world!"',
				message03:'"I\'m going to be a hero! I\'ll never give up!"',
				condition01:'"Lava Golem is walking on air over the thought of meeting his mentor, Ifrit."',
				condition02:'"Lava Golem is training hard to be a hero!"',
				condition03:'"Lava Golem is tired. Maybe the training was to hard."'
			},
			{
				monsterName:"Knight Captain Kargo",
				role	:"Melee Tanker",
				skills:[
					{name:"Last Resort", detail:"Raises allies' spirits to increase their Status Effect Resist.", link:"https://www.youtube.com/embed/A73yRu51-WE"},
					{name:"Knight's Will", detail:"Performs a powerful thrust attack with a sword.", link:"https://www.youtube.com/embed/wxgDIkyZ3Bc"},
					{name:"", detail:"", link:""}
				],
				description:"Increases allies' Status Effect Resistance for a short amount of time. <br>As a Knight Captain, he trains young soldiers to make them ready for battle. <br>Wonders why not a single one of them came back alive.",
				message01:'"You are the knights of Aden. Be proud, soldiers!"',
				message02:'"Knights fight for honor. Don\'t forget that."',
				message03:'"We, the knights of Aden, must protect the kingdom at all cost."',
				condition01:'"Knight Captain Kargo seems satisfied with the new recruit."',
				condition02:'"Another typical day for Knight Captain Kargo."',
				condition03:'"Knight Captain Kargo is worried about his knights. Why are they not coming back?"'
			},
			{
				monsterName:"Asitaggio",
				role	:"Melee Tanker",
				skills:[
					{name:"Magma Smash", detail:"Trhows a powerful uppercut infused with magma’s energy", link:"https://www.youtube.com/embed/gsN1ylcfPd0"},
					{name:"Volcanic Protection", detail:"Increases Defense of self with the power of the volcanic fire", link:"https://www.youtube.com/embed/SvYWjxNVUBM"},
					{name:"Fire of Vengeance", detail:"Counters and decreases Attack Power of an enemy when attacked", link:"https://www.youtube.com/embed/9_v23SeaL3I"}
				],
				description:"Reduces damage received by enemy attacks. <br>Asitaggio's body always burns with heat because of the magma inside. <br>When the demons want to cook something, they use him to heat things up.",
				message01:'"Hey, I\'m not your barbecue grill!"',
				message02:'"I told you, I\'m not a barbecue grill! Stop that!"',
				message03:'"You never give up, do you? Alright then. Let me have some of that steak too."',
				condition01:'"Can\'t believe Asitaggio offered his body to grill steak! He must be in a extra good mood today."',
				condition02:'"Asitaggio is arguing with the demons about grilling steaks. As usual."',
				condition03:'"Asitaggio is angry! He threw the steak he was grilling on his body at the demons. Run!"'
			},
			{
				monsterName:"Zenith Queen",
				role	:"Magic Tanker",
				skills:[
					{name:"Curse Poison", detail:"Blankets random enemies with a poisonous fog and silences enemies at a chance. INT enemies are always silenced.", link:"https://www.youtube.com/embed/RPGU2kbssxw"},
					{name:"Spiderweb Trap", detail:"Binds an enemy’s limbs with sticky spiderwebs Decreases Attack Speed.", link:"https://www.youtube.com/embed/WHzCh0hsi8E"},
					{name:"Corrosive Poison", detail:"Spits corrosive poison to counter at a chance when attacked.", link:"https://www.youtube.com/embed/WEX6YMRzThs"}
				],
				description:'Blankets enemies with a poison fog that decreases Magic Attack. <br>The ancient queen, deformed by the curse of the Grim Reaper. <br>She hates anything beautiful.',
				message01:'"Give me your beauty!"',
				message02:'"That beauty should be mine!"',
				message03:'"I should be prettier than you."',
				condition01:'"The Zenith Queen is delighted over the new Essence of Beauty she stole."',
				condition02:'"A regular day for the Zenith Queen, who\'s out hunting for beautiful things."',
				condition03:'"The thought of her old beautiful self made the Zenith Queen sorrowful."'
			},
			{
				monsterName:"Seer",
				role	:"Magic Dealer",
				skills:[
					{name:"Destruction Beam", detail:"Shoots powerful laser beams to pierce through an enemy.", link:"https://www.youtube.com/embed/3g4E1dRNOb0"},
					{name:"Mystic Explosion", detail:"Concentrates all might on the eye to cause an explosion.", link:"https://www.youtube.com/embed/oBAMirWykaU"},
					{name:"", detail:"", link:""}
				],
				description:"Strikes fear in an enemy who catches his eye. <br>A demonic creature created using Knight Vald's left eyeball. <br>Turns untruthful and greedy people into stone.",
				message01:'"I can see through you... The truth... and lies..."',
				message02:'"Truth... Will... Save you..."',
				message03:'"You won\'t escape... punishment... for your lies..."',
				condition01:'"The Seer is glad to met a truthful person today, for a change."',
				condition02:'"The world is made up of 80% lies and 20% truth. The Seer sees it all."',
				condition03:'"The Seer had enough liars for today."'

			},
		],
		// 상단 소환수 보기 영역
		show: {
			choice: '{{{guildCount}}} members summoned this Pet.',
			notMy: 'No one summoned this pet yet.',
			notGuild: 'Join a guild to view the summon status!',
			reserve: 'You summoned {{{monsterName}}}! {{{monsterName}}} will be summoned to the actual game at launch.',
			reserveChange: 'You summoned <span style="white-space:nowrap">{{{monsterName}}}</span>!<br> <span style="white-space:nowrap">{{{monsterName}}}</span> will be summoned to the game instead of <span style="white-space:nowrap">{{{beforeName}}}</span>.',
			reserveFail: 'Upgrade your Pet to ★3 <br>to summon it in the actual game.',
			reserveNotGuild: 'Summon completed.'
		},
		// 뽑기 (컬렉션에 소환하기)
		pick: {
			pickBtn: 'Summon',
			ticketZero: 'You\'re out of Summon Tickets. <br>5 Summon Tickets will be recharged on 12 am.',
			monsterFull: 'You summoned all available pets.',
			result1:'You summoned {{{monsterName}}}!',
			result2:'{{{monsterName}}} upgraded to ★2!',
			result3:'{{{monsterName}}} upgraded to ★3!',
			first: 'Bonus Daggers! <span class="desc">Congratulations on your first summon! How about using your bonus Daggers in the Shop?</span>',
			section: 'You summoned {{{monsterCount}}} Pets! <br>Here are your +50 Daggers!',
			level: 'Here are your +10 Daggers <br>for upgrading your Pet to 3★!',
			reserveComplete: 'Summon completed.',
			// shareMsg: '{{{monsterName}}} 을(를) 소환했습니다. {{{monsterName}}}은(는) {{{monsterRole}}} 입니다.',
			// shareMsgAdd: ' {{{monsterName}}}의 현재 예약 순위는 {{{monsterRank}}}위 입니다.',
			shareSnsTit : 'Red Knights Pet Collection : You summoned {{{monsterName}}}!',
			shareSnsImg : '',
			shareSnsDec : 'You summoned {{{monsterName}}} in the Collection Visit the Pre-registration page to play minigames and meet the Pets from Lineage Red Knights!',
			shareSnsLast : 'Pre-register now!',
			shareGuildTit : 'Red Knights Pet Collection : You summoned {{{monsterName}}}!',
			shareGuildDec : 'Meet my new Pet, {{{monsterName}}}!'
		},
		detail: {
			shareMsg: 'You shared {{{monsterName}}}\'s {{{skillName}}} skill. Check it out! {{{skillLink}}}'
		}
	},
	// 기사단 점령전
	occupation: {
	landNames: ['Whispering Isle','Gludio','Orc Forest','Windawood','Ivory Tower','Aden','Heine'],
		notice: {
			checking: 'Checking the results for this session.',
			waiting: 'The next Siege session will begin at 9 am.'
		},
		insert: {
			// shareSnsMsg: '{{{landName}}}에서 치열한 전투가 펼쳐지고 있습니다! 점령전 승리를 위해서는 혈맹원들의 도움이 필요합니다. 지금 바로 레드나이츠에 접속하세요!',
			// shareGuildMsg: '{{{landName}}} {{{are다Name}}} 거점에 소환수 {{{insertMy}}}명을 투입했습니다. 거점을 확보할 수 있도록 점령전을 도와주세요!'
			shareSnsTit : 'Red Knights Guild Wars: Attacking {{{landName}}}-{{{areaName}}}!',
			shareSnsImg : '',
			shareSnsDec : 'Participate in a fierce guild war at {{{landName}}}! Your guild needs your help to take over the area.',
			shareSnsLast : 'Play Lineage Red Knights now!',
			shareGuildTit : 'Red Knights Guild Wars : Attacking {{{landName}}}-{{{areaName}}}!',
			shareGuildDec : 'Deployed {{{insertMy}}} in {{{landName}}}-{{{areaName}}}.'
		}
	},
	// 기사단 레이스
	race: {
		unit: '#',
		selection: {
			hasMonster: ['Not Owned','Owned'],
			complete: 'Application Complete',
			completeMsg : 'Application Complete! <br> You can check the results after the Race ends!',
			disable: 'You can only join the race using the Pets you own.'
		},
		resultDetail: {
			title: '\'s Race Results',
			time: 'Race Time',
			attendA: '{{{monsterName}}} participated and ranked {{{monsterRank}}}.',
			attendB: '{{{monsterName}}} couldn\'t participate in the Race.',
			attendC: 'You did not participate in this Race session.'
		},
		help: {
			//shareSnsMsg : '기사단 레이스에서 {{{monsterName}}}을(를) 선택하셨습니다. 과연 이번 레이스에서는 1등을 차지할 수 있을까요? 지금 바로 레드나이츠에서 확인하세요!'
			shareSnsTit : 'Red Knights Race : You selected {{{monsterName}}}!',
			shareSnsImg : '',
			shareSnsDec : 'You selected {{{monsterName}}}. Who will be the winner of the race?',
			shareSnsLast : 'Check out the results now in Lineage Red Knights!',
			shareGuildTit : 'Red Knights Race : You selected {{{monsterName}}}!',
			shareGuildDec : 'Help {{{monsterName}}} win the race!'
		}
	}
}