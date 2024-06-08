export enum EventType {
  ONLINE = 'Remoto',
  PRESENTIAL = 'Presencial',
}

export type EventItem = {
  title: string;
  type: EventType;
  description: string;
  date: string;
  banner: string;
  // bannerFile: File | null;
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
