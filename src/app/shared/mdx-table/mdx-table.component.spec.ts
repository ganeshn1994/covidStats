import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdxTableComponent } from './mdx-table.component';

describe('MdxTableComponent', () => {
  let component: MdxTableComponent;
  let fixture: ComponentFixture<MdxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MdxTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
