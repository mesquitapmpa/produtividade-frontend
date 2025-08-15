import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Item } from 'src/app/models/formResponse';
import { Ranking } from 'src/app/models/ranking';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {

  @Input() listRanking: Array<Ranking> = []
  @Input() loading: boolean = false
  @Output() updateEvent = new EventEmitter<Date[]>()
  @Output() selectEvent = new EventEmitter<Ranking>()

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  rangeDates?: Date[]

  minDate: Date = new Date()

  maxDate: Date = new Date()

  emptyMessage = "NADA ENCONTRADO"

  sortField: string = '';

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'PONTUAÇÃO ALTA PARA BAIXA', value: '!sum' },
      { label: 'PONTUAÇÃO BAIXA PARA ALTA', value: 'sum' },
    ];

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -6;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    //this.maxDate.setMonth(nextMonth);
    //this.maxDate.setFullYear(nextYear);
    this.rangeDates = [this.minDate, this.maxDate]

  }

  setSelectRanking(item:Ranking) {
    this.selectEvent.emit(item)
  }

  onClose() {

    let pass: Array<any> = []
    if (this.rangeDates){
      console.log(this.rangeDates)
      this.rangeDates.forEach(d => {
        pass.push(d)
      })
    }

    let buscar = !pass.includes(null) && (this.rangeDates?.length == 2)

    if (buscar) {
      console.log("buscar")
      this.updateEvent.emit(this.rangeDates)
    }
  }

  onClearClick() {
    this.rangeDates = [this.minDate, this.maxDate]
    this.updateEvent.emit(this.rangeDates)
  }

  onSortChange(event: any) {
    const value = event.value;
    console.log(value)

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
    console.log(this.sortField)
    console.log(this.sortOrder)
  }

  onFilter(dv: any, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

}
