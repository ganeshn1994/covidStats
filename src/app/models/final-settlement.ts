export class FinalSettlement {
  count: number = 0;
  fromDate: string;
  invoiceNumber?: string;
  page: number = 1;
  pageSize: number = 30;
  retailerName?: string;
  status?: string = 'COMPLETED';
  stockistName?: string;
  toDate: string;
  value?: string;
}
