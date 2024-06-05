export enum EventType {
  ONLINE = 'online',
  PRESENTIAL = 'presential',
}

export type EventItem = {
  title: string;
  type: EventType;
  description: string;
  date: string;
  banner: string;
  bannerFile: File | null;
  url: string;
  city: {
    id: number;
    label: string;
  };
  state: {
    id: number;
    label: string;
  };
};
