export class CollectionHistory {
  awb_order_id?: string;
  count: number = 0;
  featureType: string = 'gypsy_collection_history';
  fromDate?: string;
  inboundRunnerName?: string;
  pageSize: number = 20;
  retailerName?: string;
  riderDate?: string;
  stockistName?: string;
  toDate?: string;
  vendorType: string = 'GYPSY';
  page?: number = 1;
  businessType?: '';
}
