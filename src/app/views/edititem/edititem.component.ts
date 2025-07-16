import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { ItemsService, Item } from '../../services/items.service';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule, NgbModalModule],
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EditItemComponent implements OnInit {
  @Input() item!: Item;

  title: string = '';
  description?: string;
  dateModel!: NgbDateStruct;
  startTime: string = '';
  endTime?: string;
  type: 'task' | 'event' = 'task';

  constructor(
    public activeModal: NgbActiveModal,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.type = this.item.type;
    this.title = this.item.title;
    this.description = this.item.description;
    const dt = new Date(this.item.date);
    this.dateModel = { year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate() };
    this.startTime = this.item.start_time || '';
    this.endTime = this.item.end_time || '';
  }

  save(): void {
    const date = `${this.dateModel.year}-${String(this.dateModel.month).padStart(2, '0')}-${String(this.dateModel.day).padStart(2, '0')}`;
    const updated: Item = {
      ...this.item,
      title: this.title,
      description: this.description,
      date: date,
      start_time: this.startTime,
      end_time: this.type === 'event' ? this.endTime : null
    };
    this.itemsService.update(this.item.id!, updated).subscribe(() => {
      this.activeModal.close('updated');
    });
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
