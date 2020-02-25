import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnChanges {
  @Input() tabsData: any;
  @Input() defaultComponent: any;

  @Output() messageToEmit = new EventEmitter<string>();
  selectedComponent: any = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.defaultComponent && changes.defaultComponent.currentValue) {
      if (this.tabsData[0] && this.tabsData[0].componentLevel !== 'child') {
        this.router.navigate([this.router.url.split('#')[0]], {
          fragment: this.tabsData[0].name
        });
      }
      this.selectComponent(this.tabsData[0]);
      this.selectedComponent = this.tabsData[0];
    }
  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string) => {
      for (let i = 0; i < this.tabsData.length; i++) {
        if (this.tabsData[i].name === fragment) {
          this.selectComponent(this.tabsData[i]);
          this.selectedComponent = this.tabsData[i];
          break;
        }
      }
      if (!this.selectedComponent) {
        if (this.tabsData[0] && this.tabsData[0].componentLevel !== 'child') {
          this.router.navigate([this.router.url], {
            fragment: this.tabsData[0].name
          });
        }
        this.selectComponent(this.tabsData[0]);
        this.selectedComponent = this.tabsData[0];
      }
    });
  }

  selectComponent(data: any) {
    this.messageToEmit.emit(data);
    this.selectedComponent = data;
  }
}
