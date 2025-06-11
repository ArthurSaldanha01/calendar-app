import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepicker, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DateService } from '../../shared/date.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ CommonModule, FormsModule, NgbDatepickerModule ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {

  @ViewChild('dp') datepicker!: NgbDatepicker;

  public selectedDateModel!: NgbDateStruct;
  private dateSubscription!: Subscription;

  constructor(private dateService: DateService) {}

  ngOnInit(): void {

    this.dateSubscription = this.dateService.selectedDate$.subscribe(dateFromService => {
      this.selectedDateModel = {
        year: dateFromService.getFullYear(),
        month: dateFromService.getMonth() + 1,
        day: dateFromService.getDate()
      };

      setTimeout(() => {
        if (this.datepicker) {
          this.datepicker.navigateTo(this.selectedDateModel);
        }
      }, 0);
    });
  }

  onDateSelect(dateStruct: NgbDateStruct): void {
    const jsDate = new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    this.dateService.setDate(jsDate);
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
