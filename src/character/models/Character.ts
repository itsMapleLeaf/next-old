export class Character {
  constructor(
    public name: string,
    public gender: string,
    public status: string,
    public statusMessage = '',
  ) {}
}
