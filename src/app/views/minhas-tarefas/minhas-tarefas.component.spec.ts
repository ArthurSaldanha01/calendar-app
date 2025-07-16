import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasTarefasComponent } from './minhas-tarefas.component';

describe('MinhasTarefasComponent', () => {
  let component: MinhasTarefasComponent;
  let fixture: ComponentFixture<MinhasTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasTarefasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
