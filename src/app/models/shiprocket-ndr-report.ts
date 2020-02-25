export class ShiprocketNdrReport {
  count: number = 0;
  fromDate: string;
  invoiceNumber?: string;
  featureType: string = 'shipNDRReport';
  page: number = 1;
  pageSize: number = 30;
  retailerName?: string;
  status?: string = '';
  stockistName?: string;
  toDate: string;
  value?: string;
  vendorType: string = 'SHIP_ROCKET';
}
