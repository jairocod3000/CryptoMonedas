import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMonedaComponent } from './detalle-moneda.component';

describe('DetalleMonedaComponent', () => {
  let component: DetalleMonedaComponent;
  let fixture: ComponentFixture<DetalleMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMonedaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
