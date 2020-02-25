export class OrderReturn {
  pageSize: number = 10;
  orderId: string;
  fromName: string;
  toName: string;
  fromDate: string;
  toDate: string;
  status: string;
  businessUniqueId: string;
  supplierUniqueId: string;
  page: number = 1;
  count: number = 0;
  totalRecords?: number;
}
