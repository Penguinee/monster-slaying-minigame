define(() => {
    class Hero {
        constructor(name, type, health, weapon, damagePerHit, defense) {
            this._name = name;
            this._type = type;
            this._currentHealth = health;
            this._maxHealth = health;
            this._weapon = weapon;
            this._damagePerHit = damagePerHit;
            this._defense = defense;
            this._healthPotions = 3;
        }

        get health() {
            return this._currentHealth;
        }
        get healthPotions() {
            return this._healthPotions;
        }

        getHit(damage) {
            if (damage < this._defense) {
                return false;
            }

            this._currentHealth -= damage - this._defense;

            return true;
        }

        isInjured() {
            return this._currentHealth < this._maxHealth;
        }

        isDead() {
            return this._currentHealth === 0;
        }

        hasHealthPotions() {
            return this._healthPotions > 0;
        }

        drinkHealthPotion() {
            if (!this.hasHealthPotions() || this.isDead()) {
                return false;
            }

            this._healthPotions--;
            this._currentHealth = this._maxHealth;

            return true;
        }
	}

    return {
        getParty() {
            return [
                new Hero('Hero 1', 'Warrior', 80, 'Sword', 15, 10),
                new Hero('Hero 2', 'Hunter', 50, 'Crossbow', 25, 0)
            ];
        },
        showStats(hero) {
            $('.weapon').html(hero.weapon);
            $('.health').html(hero.health);
            $('.damagePerHit').html(hero.damagePerHit);
            $('.defense').html(hero.defense);
            $('.type').html(hero.type);
        }
    };
});
