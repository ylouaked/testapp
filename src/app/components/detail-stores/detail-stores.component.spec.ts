import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStoresComponent } from './detail-stores.component';

describe('DetailStoresComponent', () => {
  let component: DetailStoresComponent;
  let fixture: ComponentFixture<DetailStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailStoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
