import { EventItem } from '../app/types/Event.type';

export const EVENT_MOCK: EventItem = {
  id: '1',
  title: 'Game Developer',
  type: 'Presencial',
  description:
    'Bem-vindo ao nosso evento de tecnologia, um encontro imperdível para entusiastas, profissionais e inovadores do setor! Este evento está repleto de atividades, apresentações e oportunidades que prometem enriquecer o conhecimento e expandir as redes de contato dos participantes.\n\nPalestras Inspiradoras\nRenomados especialistas e líderes do setor compartilharão suas visões sobre as últimas tendências e inovações tecnológicas. As palestras cobrirão uma ampla gama de tópicos, incluindo inteligência artificial, blockchain, computação em nuvem, cibersegurança, e muito mais. Prepare-se para insights valiosos e debates acalorados sobre o futuro da tecnologia.\n\nWorkshops Práticos\nParticipe de workshops interativos que oferecerão uma experiência prática com as tecnologias emergentes. Desde desenvolvimento de software até técnicas avançadas de análise de dados, os workshops são projetados para todos os níveis de habilidade, proporcionando uma oportunidade única de aprender e crescer.',
  date: '2025-12-09',
  hour: '09:20',
  city: 'Angra dos Reis',
  state: 'RJ',
  url: 'https://angular.dev/',
  bannerUrl:
    'https://www.proway.com.br/foto/png/blog/750/workshop-gratuito-game-developer.jpg',
  coupons: [
    {
      code: 'KIPPERDEV',
      discount: 20,
      validUntil: '2024-08-18T12:25:21.000+00:00',
    },
  ],
};

export const EVENTS_MOCK: EventItem[] = [EVENT_MOCK];

export const CREATE_EVENT_ERROR_RESPONSE_MOCK: {
  status: number;
  statusText: string;
} = {
  status: 422,
  statusText: 'Unprocessible entity',
};
