export class Picked {
  awb_order_id?: string;
  count: number = 0;
  featureType: string = 'picked';
  fromDate?: string;
  inboundRunnerName?: string;
  pageSize: number = 30;
  retailerName?: string;
  riderDate?: string;
  status: string = 'PICKED';
  stockistName?: string;
  toDate?: string;
  vendorType: string = 'GYPSY';
  page?: number = 1;
}
