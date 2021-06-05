class SpicyCard {
  constructor(
    public id: Required<number>,
    public name: Required<string>,
    public description: Required<string>
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export default SpicyCard;
