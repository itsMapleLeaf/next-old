export class Message {
  date = new Date()

  constructor(
    public sender: string,
    public text: string,
    public type: 'normal' | 'lfrp' | 'admin' | 'system',
  ) {}
}
