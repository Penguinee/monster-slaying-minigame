define(() => {
    class Monster {
        constructor(name, health, damagePerHit, defense) {
            this._name = name;
            this._currentHealth = health;
            this._maxHealth = health;
            this._damagePerHit = damagePerHit;
            this._defense = defense;
        }

        get health() {
            return this._currentHealth;
        }

        isInjured() {
            return this._currentHealth < this._maxHealth;
        }

        isDead() {
            return this._currentHealth === 0;
        }

        getHit(damage) {
            if (damage < this._defense) {
                return false;
            }

            this._currentHealth -= damage - this._defense;

            return true;
        }
	}

    return {
        getHorde() {
            return [
                new Monster('Orc', 70, 15, 10),
                new Monster('Dragon', 70, 20, 5)
            ];
        }
    };
});
