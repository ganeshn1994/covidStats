export class Orders {
  orderId?: string;
  fromName?: string;
  toName: string;
  status: string;
  fromDate: string;
  toDate: string;
  code?: string;
  coupon?: string;
  sources?: string;
  pageSize: number = 10;
  page: number = 1;
  totalRecords: number;
  invoiceReferenceId: string;
  orderSource: string;
  barcodeId: string;
  entityType: string;
  orderStatus?: any[];
  ordersStatus?: "";
  awbNumberExists: string;
  businessUniqueId?: string;
  supplierUniqueId?: string;
  id?: string;
}
