export class UserAccess {
  pageSize: number = 10;
  page: number = 1;
  totalRecords: number = 0;
  status: string;
  emailId: string;
  name: string;
  clientCallLocation: string = 'userDetailsInAdmin';
  adminRole: boolean = true;
  username: any;
}
