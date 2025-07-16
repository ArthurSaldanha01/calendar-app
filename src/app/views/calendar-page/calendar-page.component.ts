import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { ItemsService, Item } from '../../services/items.service';
import { DateService } from '../../shared/date.service';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    CalendarViewComponent
  ],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent {
  @Input() sidebarVisible = true;
  @Input() searchTerm = '';

  constructor(
    private itemsService: ItemsService,
    private dateService: DateService
  ) {}

  ngOnChanges() {
    if (this.searchTerm && this.searchTerm.trim().length >= 2) {
      const term = this.searchTerm.toLowerCase();
      this.itemsService.getAll().subscribe((items: Item[]) => {
        const match = items.find(item =>
          item.title.toLowerCase().includes(term) ||
          (item.description?.toLowerCase().includes(term) ?? false)
        );
        if (match) {
          this.dateService.setDate(new Date(match.date));
        }
      });
    }
  }
}
