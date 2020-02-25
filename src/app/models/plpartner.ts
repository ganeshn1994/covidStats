export class Plpartner {
  awbNumberExists: boolean;
  barcodeId: string;
  businessUniqueId: string;
  entityType: string;
  fromDate: string;
  fromName: string;
  invoiceReferenceId: string;
  orderId: string;
  orderSource: string;
  orderStatus: object = [];
  page: number = 1;
  pageSize: number = 10;
  status: string;
  supplierUniqueId: string;
  toDate: string;
  toName: string;
  totalRecords: number = 0;
}
