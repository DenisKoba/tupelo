import dayjs from 'dayjs';

import { DATE_FORMAT } from '../../helpers/date-helper';
import { resolveCampaignStatus } from '../../store/campaign-slice/helper/campaign-status-helper';
import { Campaign, ExternalCampaign } from '../fake-data/fake-data';

export function campaignAdapter(data: ExternalCampaign[]): Campaign[] {
  return data.map((item: ExternalCampaign) => ({
    key: item.id,
    name: item.name.toUpperCase(),
    startDate: dayjs(item.startDate).format(DATE_FORMAT),
    endDate: dayjs(item.endDate).format(DATE_FORMAT),
    status: resolveCampaignStatus(+new Date(item.endDate)),
    budget: `$${item.Budget}`,
  }));
}
