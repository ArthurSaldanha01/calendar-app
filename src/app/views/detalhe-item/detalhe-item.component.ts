import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsService, Item } from '../../services/items.service';

@Component({
  selector: 'app-detalhe-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe-item.component.html',
  styleUrls: ['./detalhe-item.component.css']
})
export class DetalheItemComponent {
  @Input() item!: Item;

  constructor(
    public activeModal: NgbActiveModal,
    private itemsService: ItemsService
  ) {}

  close(): void {
    this.activeModal.dismiss();
  }

  excluir(): void {
    if (!this.item.id) return;
    this.itemsService.delete(this.item.id).subscribe(() => {
      this.activeModal.close('excluido');
    });
  }

  concluir(): void {
    if (!this.item.id) return;
      this.itemsService.update(this.item.id, { ...this.item, completed: 1 }).subscribe(() => {
        this.activeModal.close('concluido');
      });
    }

  editar(): void {
    this.activeModal.close({ acao: 'editar', item: this.item });
  }
}
