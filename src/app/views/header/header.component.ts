import { Component, OnDestroy, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateService } from '../../shared/date.service';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MinhasTarefasComponent } from '../../views/minhas-tarefas/minhas-tarefas.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  public displayedDate: Date = new Date();
  private dateSubscription!: Subscription;
  @Output() toggleSidebar = new EventEmitter<void>();

  @ViewChild('switchTipo', { static: false }) switchTipo!: ElementRef<HTMLInputElement>;
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  constructor(
    private dateService: DateService,
    private modalService: NgbModal
  ) {}

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

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  openMinhasTarefas() {
    const modalRef = this.modalService.open(MinhasTarefasComponent, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.fechar.subscribe(() => {
      modalRef.close();

      setTimeout(() => {
        if (this.switchTipo) {
          this.switchTipo.nativeElement.checked = false;
        }
      });
    });
  }

  onSwitchTipo(event: any) {
    if (event.target.checked) {
      this.openMinhasTarefas();
    }
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.search.emit(term);
  }
}
