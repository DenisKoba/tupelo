import {
  CampaignFromServer,
  fakeData,
} from '../../../utils/fake-data/fake-data';

export function fetchCampaigns(): Promise<CampaignFromServer[]> {
  const campaigns: CampaignFromServer[] = [];

  for (let i = 0; i <= 100; i++) {
    campaigns.push(fakeData());
  }

  return Promise.resolve(campaigns);
}
