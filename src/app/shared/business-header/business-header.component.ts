import { Component, OnInit } from '@angular/core';
import {
  MyBusinessService,
  BaseService,
  AuthenticationService
} from 'src/app/services';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessEntityComponent } from 'src/app/components/business/business-entity/business-entity.component';

@Component({
  selector: 'app-business-header',
  templateUrl: './business-header.component.html',
  styleUrls: ['./business-header.component.css']
})
export class BusinessHeaderComponent implements OnInit {
  productTypes: any[] = [];
  selectedProductType: any;
  businessId: any = '';

  constructor(
    private myBusinessService: MyBusinessService,
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myBusinessService.selectedProductType.subscribe(data => {
      if (data) {
        this.selectedProductType = data;
      }
    });
    this.getProductTypes();
  }

  getProductTypes() {
    const placeType = localStorage.getItem('placeType');
    const productTypeQuery = {
      businessType: placeType,
      status: 'IN_PROCESS'
    };

    this.myBusinessService.getProductType(productTypeQuery).subscribe(data => {
      if (data && data.response && data.response.productTypes.length) {
        this.productTypes = [
          {
            name: 'All Products',
            img: '../../assets/img/box.png'
          }
        ];
        data.response.productTypes.forEach(ele => {
          ele = this.baseService.capitalizeFirstLetter(ele);
          if (ele === 'Ayurveda') {
            this.productTypes.push({
              name: ele,
              img: '../../assets/img/ayurvedic-bowl.png'
            });
          } else if (ele === 'Brand Pharma') {
            this.productTypes.push({
              name: ele,
              img: '../../assets/img/box2.png'
            });
          } else if (ele === 'Generics Pharma') {
            this.productTypes.push({
              name: ele,
              img: '../../assets/img/box.png'
            });
          } else if (ele === 'Otc') {
            this.productTypes.push({
              name: ele.toUpperCase(),
              img: '../../assets/img/otc.png'
            });
          } else if (ele === 'Fmcg') {
            this.productTypes.push({
              name: ele.toUpperCase(),
              img: '../../assets/img/box.png'
            });
          } else if (ele === 'Pet Supplies') {
            this.productTypes.push({
              name: ele,
              img: '../../assets/img/box.png'
            });
          } else if (ele === 'Cold Chain') {
            this.productTypes.push({
              name: ele,
              img: '../../assets/img/coldChainIcon.png'
            });
          } else {
            this.productTypes.push({
              name: ele,
              img: '../../assets/img/box.png'
            });
          }
        });
        this.productTypes = _.uniqBy(this.productTypes, e => {
          return e.name;
        });
      }
    });
  }

  selectProductType(type: any) {
    const placeType = localStorage.getItem('placeType');
    let entity = '';
    if (placeType === 'Pharmacy') {
      entity = 'retailer';
    } else if (placeType === 'MarketingCompany') {
      entity = 'marketing-company';
    } else if (placeType === 'Stockist') {
      entity = 'super-stockist';
    } else if (placeType === 'Distributor') {
      entity = 'stockist';
    }
    this.router.navigate([entity + '/deals/' + type.name]);
  }
}
