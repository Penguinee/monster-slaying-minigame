require(['jquery', 'modules/dice', 'modules/hero', 'modules/monster', 'modules/lifecounter'], function($, dice, heroRepository, monsterRepository, lifecounter) {
    "use strict";

	var party   = heroRepository.getParty();
	var horde   = monsterRepository.getHorde();
	var hero;
	var monster;

	var $game         = $('.game');
	var $result       = $game.find('.result');
	var $hero         = $game.find('.hero');
	var $monster      = $game.find('.monster');
	var $dice         = $game.find('.dice');
	var $startButton  = $game.find('.startButton').prop('disabled', true);

// Type selection

	$game.on('change', '.heroSelect', function() {
		var userChoise = $(this).val();

		$.each(party, function(key, adventurer) {
			if (userChoise === adventurer._name) {
				hero = adventurer;
				heroRepository.showStats(hero);
				if (isGameReady()) {
					$startButton.prop('disabled', false);
				}
				return;
			}
		});

	});

	$game.on('change', '.monsterSelect', function() {
		var userChoise = $(this).val();

		$.each(horde, function(key, encounter) {
			if (userChoise === encounter._name) {
				monster = encounter;
				if (isGameReady()) {
					$startButton.prop('disabled', false);
				}
				return;
			}
		});

	});

// Start game

	$game.on('click', '.startButton', function(){
		lifecounter.update($hero, hero.health);
		lifecounter.update($monster, monster.health);
		$('.result-wrapper').show();
	});

	$('.hitButton').on('click', function() {
		monsterSlayer();
	});

	function isGameReady()
	{
		if (monster !== undefined && hero !== undefined) {
			return true;
		}
	}


// Dice functions

	function showDiceResult(dice)
	{
		var divs = '';

		for(var i = 1; i <= dice; i++) {
			divs += "<div class='dice__dot dice__" + dice + "'></div>";
		}

		$dice.html(divs);
		$dice.show();
	}

// main function for the game

	function monsterSlayer()
	{
		var resultDice = dice.d6();

		showDiceResult(resultDice);

		if (resultDice >= 5) {
			$result.html('BOOOM!! You hit the Monster!')
				.removeClass('result--red')
				.addClass('result--green');

			monster.getHit(hero._damagePerHit);
			lifecounter.update($monster, monster.health);
			lifecounter.checkIfFighterIsDead($monster, monster);
		}
		else {
			$result.html('Damn you missed it. The Monster hits you.')
				.removeClass('result--green')
				.addClass('result--red');

			hero.getHit(monster._damagePerHit);
			lifecounter.update($hero, hero.health);
			lifecounter.checkIfFighterIsDead($hero, hero);
		}
	}

	// health potion functions

	$game.on('click', '.healthPotion', function(e) {
		e.preventDefault();

		$(this).hide();
		hero.drinkHealthPotion();
		$hero.text(hero.health);
	});
});
