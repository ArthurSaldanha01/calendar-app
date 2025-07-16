import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheItemComponent } from './detalhe-item.component';

describe('DetalheItemComponent', () => {
  let component: DetalheItemComponent;
  let fixture: ComponentFixture<DetalheItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
