import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService, Item } from '../../services/items.service';

@Component({
  selector: 'app-minhas-tarefas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minhas-tarefas.component.html',
  styleUrls: ['./minhas-tarefas.component.css']
})
export class MinhasTarefasComponent implements OnInit {

  @Output() fechar = new EventEmitter<void>();

  tarefas: Item[] = [];
  carregando = false;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.carregando = true;
    const hoje = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateStr = `${hoje.getFullYear()}-${pad(hoje.getMonth() + 1)}-${pad(hoje.getDate())}`;
    this.itemsService.getByDate(dateStr).subscribe(items => {
      this.tarefas = items.filter(item => item.type === 'task');
      this.carregando = false;
    });
  }

  onFechar() {
    this.fechar.emit();
  }
}
