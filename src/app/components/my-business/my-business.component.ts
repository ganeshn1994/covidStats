import { Component, OnInit } from '@angular/core';
import { ColumnSetting } from 'src/app/models/column-setting';
import { MyBusinessService } from 'src/app/services/my-business.service';
import { BaseService, AuthenticationService } from 'src/app/services';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  RouterModule
} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-business',
  templateUrl: './my-business.component.html',
  styleUrls: ['./my-business.component.css']
})
export class MyBusinessComponent implements OnInit {
  bussinessData = [];
  userData: any;

  dataSettings: ColumnSetting[] = [
    {
      primaryKey: 'name',
      header: 'Name'
    },
    {
      primaryKey: 'address',
      header: 'Address'
    }
  ];

  actions = [
    {
      action: 'view',
      type: 'text',
      class: 'fa fa-arrow-right'
    }
  ];

  tableSettings: any = {
    class: 'table table-hover',
    align: 'text-left',
    fontSize: 12
  };
  constructor(
    private myBusinessService: MyBusinessService,
    private baseService: BaseService,
    private authenticationService: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getMyBussinessData();
  }

  getMyBussinessData() {
    const myBusinessQuery = {
      isActive: true,
      userId: this.baseService.getUserId()
    };
    this.myBusinessService
      .getMyBusinessData(myBusinessQuery)
      .subscribe(data => {
        this.bussinessData = _.chain(data.response)
          .groupBy('placeType')
          .map((value, key) => ({ placeType: key, data: value }))
          .value();
      });
  }

  redirectToBusiness(event: any) {
    localStorage.setItem('selectedBusiness', event.id);
    this.authenticationService.setBusinessId(JSON.stringify(event.id));
    localStorage.setItem('placeType', event.placeType);
    let entity = '';
    if (event.placeType === 'Pharmacy') {
      entity = 'retailer';
    } else if (event.placeType === 'MarketingCompany') {
      entity = 'marketing-company';
    } else if (event.placeType === 'Stockist') {
      entity = 'super-stockist';
    } else if (event.placeType === 'Distributor') {
      entity = 'stockist';
    }
    this.route.navigate([entity + '/home/' + event.id]);
  }
}
