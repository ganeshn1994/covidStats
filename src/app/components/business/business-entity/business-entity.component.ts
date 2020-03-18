import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private myBusinessService: MyBusinessService
  ) {
    this.activatedRoute.params.subscribe(data => {
      this.selectedProductType = data.category;
      this.myBusinessService.selectedProductType.next(data.category);
    });
  }

  ngOnInit() {
    console.log(this.selectedProductType);
  }
}
