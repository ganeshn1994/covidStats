import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdxImgUploadComponent } from './mdx-img-upload.component';

describe('MdxImgUploadComponent', () => {
  let component: MdxImgUploadComponent;
  let fixture: ComponentFixture<MdxImgUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdxImgUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdxImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
