import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generateRandomDate, isDateActive } from '../../helpers/date-helper';
import { fetchCampaigns } from '../../services/api/campaigns/campaigns';
import { campaignAdapter } from '../../utils/campaign-adapter/campaign-adapter';
import { Campaign, ExternalCampaign } from '../../utils/fake-data/fake-data';
import { resolveCampaignStatus } from './helper/campaign-status-helper';

type CampaignStatus = 'active' | 'inactive' | null;

export type CampaignState = {
  items: Campaign[];
  filteredItems: Campaign[];
  filter: {
    status: CampaignStatus;
    search: string;
    date: string[] | [];
  };
};

const initialState: CampaignState = {
  items: [],
  filteredItems: [],
  filter: {
    status: null,
    search: '',
    date: [],
  },
};

export const campaignsFetch = createAsyncThunk(
  'campaign/campaignsFetch',
  async () => {
    return await fetchCampaigns();
  }
);

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    // todo: filter logic should be implemented on backend
    campaignsApplyFilter: (state: CampaignState) => {
      let result: Campaign[] = [];

      if (state.filter.date.length) {
        const [start, end] = state.filter.date;

        result = state.items.filter((item) =>
          isDateActive([item.startDate, item.endDate], [start, end])
        );
      }

      if (state.filter.search) {
        result = (result.length ? result : state.items).filter((item) =>
          item.name.includes(state.filter.search)
        );
      }

      if (state.filter.status) {
        result = (result.length ? result : state.items).filter(
          (item) => item.status === state.filter.status
        );
      }

      state.filteredItems = result;
    },
    campaignsFilterByDate: (
      state: CampaignState,
      action: PayloadAction<string[]>
    ) => {
      state.filter.date = action.payload;
    },
    campaignsFilterByStatus: (
      state: CampaignState,
      action: PayloadAction<CampaignStatus>
    ) => {
      state.filter.status = action.payload;
    },
    campaignsFilterBySearch: (
      state: CampaignState,
      action: PayloadAction<string>
    ) => {
      state.filter.search = action.payload;
    },
    campaignsClearFilters: (state: CampaignState) => {
      state.filter.search = '';
      state.filter.date = [];
      state.filter.status = null;
    },
    campaignAppendExternalData: (
      state: CampaignState,
      action: PayloadAction<ExternalCampaign[]>
    ) => {
      state.items.unshift(...campaignAdapter(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(campaignsFetch.fulfilled, (state, action) => {
      const adapted = action.payload.map((item) => {
        return {
          ...item,
          startDate: generateRandomDate(item.startDate),
          endDate: generateRandomDate(item.endDate),
          budget: `$${item.budget}`,
          status: resolveCampaignStatus(item.endDate),
        };
      });

      state.items = adapted;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  campaignsFilterByDate,
  campaignsFilterByStatus,
  campaignsFilterBySearch,
  campaignsApplyFilter,
  campaignsClearFilters,
  campaignAppendExternalData,
} = campaignSlice.actions;

export default campaignSlice.reducer;
