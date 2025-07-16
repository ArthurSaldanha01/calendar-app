import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbDatepickerModule,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from '../create-event/create-event.component';
import { ItemsService, Item } from '../../services/items.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  title: string = '';
  description: string = '';
  dateModel!: NgbDateStruct;
  startTime: string = '';
  endTime: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private itemsService: ItemsService
  ) { }

  toggleType(): void {
    this.activeModal.dismiss();
    this.modalService.open(CreateEventComponent, {
      size: 'lg',
      backdrop: 'static'
    });
  }

  save(): void {
    const date = `${this.dateModel.year}-${this.dateModel.month.toString().padStart(2, '0')}-${this.dateModel.day.toString().padStart(2, '0')}`;

    const task: Item = {
      type: 'task',
      title: this.title,
      description: this.description,
      date: date,
      start_time: this.startTime,
      end_time: null
    };

    this.itemsService.create(task).subscribe({
      next: (result) => this.activeModal.close(result),
      error: (err) => alert('Erro ao criar tarefa!')
    });
  }



  close(): void {
    this.activeModal.dismiss();
  }
}
