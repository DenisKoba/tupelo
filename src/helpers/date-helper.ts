import dayjs from 'dayjs';

export const DATE_FORMAT = 'YYYY-MM-DD';

export function generateRandomDate(timestamp: number): string {
  return dayjs(timestamp).format(DATE_FORMAT);
}

function dateInMs(formattedDate: string | number): number {
  return +new Date(formattedDate);
}

export function isDateActive(
  campaignDateRange: string[],
  searchDateRange: string[]
): boolean {
  const [startCampaign, endCampaign] = campaignDateRange;
  const [startSearch, endSearch] = searchDateRange;

  return (
    dateInMs(startSearch) >= dateInMs(startCampaign) &&
    dateInMs(endSearch) <= dateInMs(endCampaign)
  );
}
