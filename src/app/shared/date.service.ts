import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Isso o torna um singleton (só existe uma instância)
})
export class DateService {

  // 1. BehaviorSubject guarda a data atual e a emite para novos inscritos.
  //    Começa com a data de hoje.
  private readonly _selectedDate = new BehaviorSubject<Date>(new Date());

  // 2. Expomos a data como um Observable (somente para leitura).
  //    Os componentes vão "ouvir" este observable.
  readonly selectedDate$ = this._selectedDate.asObservable();

  constructor() { }

  // 3. Métodos públicos para manipular a data

  /** Retorna a data atual que está no serviço */
  getCurrentDate(): Date {
    return this._selectedDate.getValue();
  }

  /** Avança para o próximo dia */
  nextDay(): void {
    const currentDate = this.getCurrentDate();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    this._selectedDate.next(nextDate); // Emite a nova data para os ouvintes
  }

  /** Volta para o dia anterior */
  previousDay(): void {
    const currentDate = this.getCurrentDate();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    this._selectedDate.next(previousDate); // Emite a nova data
  }

  /** Define uma data específica */
  setDate(date: Date): void {
    this._selectedDate.next(date);
  }

  /** Volta para o dia de hoje */
  goToToday(): void {
    this._selectedDate.next(new Date());
  }
}
