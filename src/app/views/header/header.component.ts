import { Component, OnDestroy, OnInit, EventEmitter, Output, output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateService } from '../../shared/date.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  public displayedDate: Date = new Date();
  private dateSubscription!: Subscription;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.dateSubscription = this.dateService.selectedDate$.subscribe(date => {
      this.displayedDate = date;
    });
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }

  goToPreviousDay(): void {
    this.dateService.previousDay();
  }

  goToNextDay(): void {
    this.dateService.nextDay();
  }

  goToToday(): void {
    this.dateService.goToToday();
  }

  onToggleSidebar(): void{
    this.toggleSidebar.emit();
  }
}
