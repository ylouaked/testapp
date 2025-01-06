import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecpopComponent } from './decpop.component';

describe('DecpopComponent', () => {
  let component: DecpopComponent;
  let fixture: ComponentFixture<DecpopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecpopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

