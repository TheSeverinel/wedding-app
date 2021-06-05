class SpicyCard {
  constructor(
    public id: Required<number>,
    public title: Required<string>,
    public description: Required<string>
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}

export default SpicyCard;