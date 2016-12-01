define(() => {
    function Encounter(type, damagePerHit, currenthealth, defense)	{
        this.type = type;
        this.damagePerHit = damagePerHit;
        this.currenthealth = currenthealth;
        this.defense = defense;
    }

    return {
        getHorde() {
            return [
                new Encounter('Orc', 15, 70, 10),
                new Encounter('Dragon', 20, 70, 5)
            ];
        }
    };
});
