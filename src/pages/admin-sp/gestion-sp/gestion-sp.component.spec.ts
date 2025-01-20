import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSPComponent } from './gestion-sp.component';

describe('GestionSPComponent', () => {
  let component: GestionSPComponent;
  let fixture: ComponentFixture<GestionSPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
