define(() => ({

    update($fighter, health)		{
        let text = $fighter.text();

        if (text.length) {
            $fighter.text(`${text}, ${health}`);

            return;
        }

        $fighter.text(health);
    },

    checkIfFighterIsDead($fighter, fighter) {
        if (fighter.health <= 0) {
            $fighter.text('DEAD!');
            $('.hitButton').prop('disabled', true);
        }
    }
}));
