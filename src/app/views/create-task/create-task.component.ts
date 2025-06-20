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
  time: string = '12:00';

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  toggleType(): void {
    this.activeModal.dismiss();
    this.modalService.open(CreateEventComponent, {
      size: 'lg',
      backdrop: 'static'
    });
  }

  save(): void {
    const taskDate = new Date(
      this.dateModel.year,
      this.dateModel.month - 1,
      this.dateModel.day,
      +this.time.split(':')[0],
      +this.time.split(':')[1]
    );
    this.activeModal.close({
      title: this.title,
      description: this.description,
      date: taskDate
    });
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
