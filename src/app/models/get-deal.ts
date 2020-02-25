export class GetDeal {
  brands?: '';
  businessNames?: '';
  count?: 0;
  dealIds?: any[] = [];
  dealPhase?: 'ADMIN';
  expiredStocks?: false;
  locations?: '';
  page: 1;
  pageSize: 10;
  productTypes?: '';
  showAllDeals?: true;
  showSmartDeal?: true;
  sortQuery?: '';
  status?: any = 'NEW';
  fromDate?: any;
  toDate?: any;
}
