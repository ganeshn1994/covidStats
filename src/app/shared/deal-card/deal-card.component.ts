import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-deal-card',
  templateUrl: './deal-card.component.html',
  styleUrls: ['./deal-card.component.css']
})
export class DealCardComponent implements OnInit {
  dealSchemeForm: FormGroup;
  @Input() record: any;
  @Input() inputValue: string;
  @Input() title: string;
  isLoggedIn: any;

  constructor(
    private authenticateService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.dealSchemeForm = this.formBuilder.group({
      dealScheme: ['']
    });
    console.log('sc', this.record);
    this.isLoggedIn = this.authenticateService.isLoggedIn();
  }
}
