import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyBusinessService } from 'src/app/services';

@Component({
  selector: 'app-business-entity',
  templateUrl: './business-entity.component.html',
  styleUrls: ['./business-entity.component.css']
})
export class BusinessEntityComponent implements OnInit {
  selectedProductType: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private myBusinessService: MyBusinessService
  ) {
    this.selectedProductType = this.activatedRoute.snapshot.paramMap.get(
      'category'
    );

    this.myBusinessService.selectedProductType.next(this.selectedProductType);
  }

  ngOnInit() {
    console.log(this.selectedProductType);
  }
}
