export class IncompleteOrders {
  pageSize: number = 5;
  page: number = 1;
  fromDate: string;
  toDate: string;
  businessName: string;
  couponCode ?:string;
  businessClaimNumber ?:string;
  businessUniqueId ?:string;
  supplierClaimNumber ?:string;
  supplierUniqueId ?:string;
  name ?: string;
}

export enum ModalTypes {
  edit,
  delete,
  update
}
