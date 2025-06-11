import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from '../../shared/date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit, OnDestroy {

  public displayedDate: Date = new Date();
  private dateSubscription!: Subscription;

  hours: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.dateSubscription = this.dateService.selectedDate$.subscribe(newDate => {
      this.displayedDate = newDate;
    });
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
