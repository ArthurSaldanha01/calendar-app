import { Component, OnDestroy, OnInit } from '@angular/core';
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

  // Injetamos o serviço no construtor
  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    // Nos inscrevemos para ouvir as mudanças de data
    this.dateSubscription = this.dateService.selectedDate$.subscribe(date => {
      this.displayedDate = date;
    });
  }

  ngOnDestroy(): void {
    // É crucial cancelar a inscrição para evitar vazamentos de memória
    this.dateSubscription.unsubscribe();
  }

  // Métodos que serão chamados pelos botões
  goToPreviousDay(): void {
    this.dateService.previousDay();
  }

  goToNextDay(): void {
    this.dateService.nextDay();
  }

  goToToday(): void {
    this.dateService.goToToday();
  }
}
