export class ReadyForPickUp {
  awb_order_id?: string;
  count: number = 0;
  featureType: string = 'readyForPickup';
  fromDate?: string;
  inboundRunnerName?: string;
  pageSize: number = 30;
  retailerName?: string;
  riderDate?: string;
  status: string = 'READY_TO_PICKUP';
  stockistName?: string;
  toDate?: string;
  vendorType: string = 'GYPSY';
  page?: number = 1;
}
