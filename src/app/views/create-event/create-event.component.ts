import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbModal,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ItemsService, Item } from '../../services/items.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModalModule
  ],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  title = '';
  description = '';
  dateModel!: NgbDateStruct;
  startTime = '';
  endTime = '';

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private itemsService: ItemsService
  ) {}

  toggleToTask(): void {
    this.activeModal.dismiss();
    this.modalService.open(CreateTaskComponent, {
      size: 'lg',
      backdrop: 'static'
    });
  }

  save(): void {
    const date = `${this.dateModel.year}-${this.dateModel.month.toString().padStart(2, '0')}-${this.dateModel.day.toString().padStart(2, '0')}`;

    const event: Item = {
      type: 'event',
      title: this.title,
      description: this.description,
      date: date,
      start_time: this.startTime,
      end_time: this.endTime
    };

    this.itemsService.create(event).subscribe({
      next: (result) => this.activeModal.close(result),
      error: (err) => alert('Erro ao criar evento!')
    });
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
