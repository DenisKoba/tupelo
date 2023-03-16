export function resolveCampaignStatus(date: number): 'active' | 'inactive' {
  return date >= +new Date() ? 'active' : 'inactive';
}
