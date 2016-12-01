define(() => {
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function rollDice(amount, sides) {
        let sum = 0;

        if (!amount || amount < 0) {
            amount = 1;
        }

        for (let i = 0; i < amount; i++) {
            sum += getRandomNumber(1, sides);
        }

        return sum;
    }

    return {
        d4(amount) {
            return rollDice(amount, 4);
        },
        d6(amount) {
            return rollDice(amount, 6);
        },
        d8(amount) {
            return rollDice(amount, 8);
        },
        d10(amount) {
            return rollDice(amount, 10);
        },
        d12(amount) {
            return rollDice(amount, 12);
        },
        d20(amount) {
            return rollDice(amount, 20);
        }
    };
});
