export enum EventType {
  ONLINE = 'Remoto',
  PRESENTIAL = 'Presencial',
}

export type EventItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  date: string;
  hour: string;
  city: string;
  state: string;
  bannerUrl: string;
  url: string;
};
