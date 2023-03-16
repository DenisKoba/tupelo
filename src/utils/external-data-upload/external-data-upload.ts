import { campaignAppendExternalData } from '../../store/campaign-slice/campaign-slice';
import { store } from '../../store/store';
import { ExternalCampaign } from '../fake-data/fake-data';

declare global {
  interface Window {
    addCampaigns: (data: ExternalCampaign[]) => void;
  }
}

export function addCampaigns(data: ExternalCampaign[]): void {
  store.dispatch(campaignAppendExternalData(data));
}

export function makeExternalDataUploaderPublic(): void {
  window.addCampaigns = addCampaigns || {};
}
