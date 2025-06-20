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
  dateModel!: NgbDateStruct;
  time = '12:00';

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  toggleToTask(): void {
    this.activeModal.dismiss();
    this.modalService.open(CreateTaskComponent, {
      size: 'lg',
      backdrop: 'static'
    });
  }

  save(): void {
    const eventDate = new Date(
      this.dateModel.year,
      this.dateModel.month - 1,
      this.dateModel.day,
      +this.time.split(':')[0],
      +this.time.split(':')[1]
    );
    this.activeModal.close({ title: this.title, date: eventDate });
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
