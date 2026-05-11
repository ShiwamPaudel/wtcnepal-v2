import serviceStationsContent from '@/content/serviceStations.json';

export interface ServiceStation {
  id: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  isHQ: boolean;
  mapLink: string;
}

export const serviceStations = serviceStationsContent.serviceStations as ServiceStation[];
