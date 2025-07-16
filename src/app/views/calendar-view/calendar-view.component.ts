import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from '../../shared/date.service';
import { ItemsService, Item } from '../../services/items.service';
import { DetalheItemComponent } from '../detalhe-item/detalhe-item.component';
import { Subscription } from 'rxjs';
import { EditItemComponent } from '../edititem/edititem.component';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit, OnDestroy {

  @Input() searchTerm: string = '';

  public displayedDate: Date = new Date();
  private dateSubscription!: Subscription;

  hours: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  itemsOfDay: Item[] = [];

  constructor(
    private dateService: DateService,
    private itemsService: ItemsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dateSubscription = this.dateService.selectedDate$.subscribe(newDate => {
      this.displayedDate = newDate;
      this.loadItemsOfDay();
    });
    this.loadItemsOfDay();
  }

  loadItemsOfDay() {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateStr = `${this.displayedDate.getFullYear()}-${pad(this.displayedDate.getMonth() + 1)}-${pad(this.displayedDate.getDate())}`;
    this.itemsService.getByDate(dateStr).subscribe(data => {
      this.itemsOfDay = data;
    });
  }

  get filteredItems(): Item[] {
    if (!this.searchTerm) return this.itemsOfDay;
    const term = this.searchTerm.toLowerCase();
    return this.itemsOfDay.filter(item =>
      item.title.toLowerCase().includes(term) ||
      (item.description?.toLowerCase().includes(term) ?? false)
    );
  }

  getOverlappingGroup(item: Item): Item[] {
    const parse = (t: string | undefined) => t ? (Number(t.split(':')[0]) + Number(t.split(':')[1]) / 60) : 0;
    const sA = parse(item.start_time);
    const eA = item.end_time ? parse(item.end_time) : sA + 1;

    return this.filteredItems.filter(other => {
      if (other === item) return true;
      const sB = parse(other.start_time);
      const eB = other.end_time ? parse(other.end_time) : sB + 1;
      return sA < eB && eA > sB;
    }).sort((a, b) => (a.start_time || '').localeCompare(b.start_time || ''));
  }

  getEventStyle(item: Item) {
    const hourHeight = 60;
    const parse = (t: string | undefined) => t ? (Number(t.split(':')[0]) + Number(t.split(':')[1]) / 60) : 0;
    const startHour = parse(item.start_time);
    const endHour = item.end_time ? parse(item.end_time) : startHour + 1;
    const top = startHour * hourHeight;
    const height = Math.max((endHour - startHour) * hourHeight, hourHeight / 2);
    const overlapping = this.getOverlappingGroup(item);
    const index = overlapping.findIndex(it => it === item);
    const total = overlapping.length || 1;

    return {
      top: `${top}px`,
      height: `${height}px`,
      position: 'absolute',
      left: `calc(${index * (100 / total)}% + 8px)`,
      width: `calc(${100 / total}% - 16px)`,
      background: item.type === 'event' ? '#e9f3fc' : (item.completed ? '#e0f9e7' : '#fffbe8'),
      borderLeft: item.type === 'event'
        ? '4px solid #007bff'
        : (item.completed ? '4px solid #1abc9c' : '4px solid #ffc107'),
      borderRadius: '6px',
      padding: '6px 12px',
      boxShadow: '0 2px 6px rgba(40, 100, 200, 0.08)',
      zIndex: 2,
      opacity: item.type === 'task' && item.completed ? 0.7 : 1
    };
  }

  abrirModalDetalhe(item: Item): void {
    const modalRef = this.modalService.open(DetalheItemComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.item = item;
    modalRef.result.then(result => {
      if (result === 'excluido' || result === 'concluido') {
        this.loadItemsOfDay();
      }
      if (result && (result as any).acao === 'editar') {

        this.abrirModalEditar((result as any).item);
      }
    }).catch(() => {});
  }

  abrirModalEditar(item: Item): void {
    const modalRef = this.modalService.open(EditItemComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.item = item;
    modalRef.result.then(res => {
      if (res === 'updated') this.loadItemsOfDay();
    }).catch(() => {});
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
