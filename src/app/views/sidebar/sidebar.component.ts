import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepicker,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbDropdownModule,
  NgbModal,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DateService } from '../../shared/date.service';
import { CreateEventComponent } from '../create-event/create-event.component';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbModalModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('dp') datepicker!: NgbDatepicker;
  public selectedDateModel!: NgbDateStruct;
  private dateSubscription!: Subscription;

  constructor(
    private dateService: DateService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dateSubscription = this.dateService.selectedDate$
      .subscribe(date => {
        this.selectedDateModel = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        };
        setTimeout(() => this.datepicker?.navigateTo(this.selectedDateModel), 0);
      });
  }

  onDateSelect(dateStruct: NgbDateStruct): void {
    const jsDate = new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    this.dateService.setDate(jsDate);
  }

  onCreateEvent(): void {
    this.modalService.open(CreateEventComponent, { size: 'lg', backdrop: 'static' });
  }

  onCreateTask(): void {
    this.modalService.open(CreateTaskComponent, { size: 'lg', backdrop: 'static' });
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
