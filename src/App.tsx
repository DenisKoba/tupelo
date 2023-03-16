import { Table, Select, DatePicker, Input, Switch } from 'antd';
import React, { ChangeEvent, useState } from 'react';

import { debounce } from './utils/debounce/debounce';
import {
  campaignsApplyFilter,
  campaignsClearFilters,
  campaignsFetch,
  campaignsFilterByDate,
  campaignsFilterBySearch,
  campaignsFilterByStatus,
} from './store/campaign-slice/campaign-slice';
import { useAppSelector } from './store/hooks/hooks';
import { RootState, store } from './store/store';
import { title } from './utils/fake-data/fake-data';

function App() {
  const [toggle, setToggle] = useState(false);
  const items = useAppSelector((state: RootState) => state.campaign.items);
  const filteredItems = useAppSelector(
    (state: RootState) => state.campaign.filteredItems
  );
  const [dateValue, setDateValue] = useState<unknown>(null);
  const [select, setSelect] = useState<'active' | 'inactive'>();
  const [search, setSearch] = useState<string>('');
  const isSearching = dateValue || select || search;

  function handleDateChange(data: unknown, dateString: string[]): void {
    setDateValue(data);
    store.dispatch(campaignsFilterByDate(dateString));
    store.dispatch(campaignsApplyFilter());
  }

  function handleStatusFilter(status: 'active' | 'inactive'): void {
    setSelect(status);
    store.dispatch(campaignsFilterByStatus(status));
    store.dispatch(campaignsApplyFilter());
  }

  function handleSearchFilter(event: ChangeEvent<HTMLInputElement>): void {
    store.dispatch(campaignsFilterBySearch(event.target.value));
    store.dispatch(campaignsApplyFilter());
  }

  function clearFilters(): void {
    setToggle(true);
    setDateValue(null);
    setSelect(undefined);
    setSearch('');
    store.dispatch(campaignsClearFilters());
    store.dispatch(campaignsApplyFilter());
    setTimeout(() => setToggle(false), 1000);
  }

  const debouncedSearch = debounce((event) => handleSearchFilter(event), 500);

  if (!items?.length) {
    store.dispatch(campaignsFetch());
  }

  return (
    <div className="App">
      <div
        style={{ display: 'flex', alignItems: 'center', padding: '20px 10px' }}
      >
        <DatePicker.RangePicker
          // @ts-expect-error: fix type
          value={dateValue}
          style={{ margin: '0 10px 0 0', width: '50%' }}
          allowClear={true}
          onChange={handleDateChange}
        />
        <Select
          style={{ margin: '0 10px 0 0' }}
          placeholder="Active mode"
          options={[{ value: 'active' }, { value: 'inactive' }]}
          value={select}
          onChange={handleStatusFilter}
        />
        <Input.Search
          style={{ margin: '0 10px 0 0' }}
          placeholder="Search by campaign name"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            debouncedSearch(event);
          }}
        />
        <Switch
          checked={toggle}
          checkedChildren="👌🏼"
          unCheckedChildren="🧹"
          onChange={clearFilters}
        />
      </div>
      {
        <Table
          columns={title}
          dataSource={isSearching ? filteredItems : items}
        />
      }
    </div>
  );
}

export default App;
