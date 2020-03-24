import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: any;

  constructor(
    private toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit() {
  }
}
