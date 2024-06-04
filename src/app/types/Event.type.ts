export type EventItem = {
  title: string;
  description: string;
  date: string;
  banner: string;
  bannerFile: string;
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
