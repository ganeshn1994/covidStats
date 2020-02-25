import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdxPaginationComponent } from './mdx-pagination.component';

describe('MdxPaginationComponent', () => {
  let component: MdxPaginationComponent;
  let fixture: ComponentFixture<MdxPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MdxPaginationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdxPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
