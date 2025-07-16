import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private readonly _selectedDate = new BehaviorSubject<Date>(new Date());

  readonly selectedDate$ = this._selectedDate.asObservable();

  constructor() { }

  getCurrentDate(): Date {
    return this._selectedDate.getValue();
  }

  nextDay(): void {
    const currentDate = this.getCurrentDate();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    this._selectedDate.next(nextDate);
  }

  previousDay(): void {
    const currentDate = this.getCurrentDate();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    this._selectedDate.next(previousDate);
  }

  setDate(date: Date): void {
    this._selectedDate.next(date);
  }

  goToToday(): void {
    this._selectedDate.next(new Date());
  }
}
