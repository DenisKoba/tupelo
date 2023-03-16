import type { ColumnsType } from 'antd/es/table';
import random from 'random-words';
import React from 'react';

import { generateBudgetRange } from '../../helpers/budget-helper';
import { generateRandomId } from '../../helpers/id-helper';

export type ExternalCampaign = Pick<
  Campaign,
  'name' | 'startDate' | 'endDate'
> & { id: number; Budget: number };

export type CampaignFromServer = {
  key: React.Key;
  name: string;
  startDate: number;
  endDate: number;
  budget: number;
};

export type Campaign = {
  key: React.Key;
  name: string;
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  budget: string;
};

export const title: ColumnsType<Campaign> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
  },
];

export function fakeData(): CampaignFromServer {
  const [name] = random({ min: 5, max: 7 });
  // one year in ms
  const ms = 31556952000;
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  const inOneYear = timestamp + ms;

  return {
    key: generateRandomId(),
    name: name.toUpperCase(),
    startDate: timestamp,
    endDate: inOneYear,
    budget: generateBudgetRange(1000000),
  };
}
