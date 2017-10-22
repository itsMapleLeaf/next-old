export class ChannelInfo {
  constructor(
    public type: 'public' | 'private',
    public id: string,
    public title: string,
    public userCount: number,
  ) {}
}
