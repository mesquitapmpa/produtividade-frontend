import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { Subject, takeUntil } from 'rxjs';
import { ProdResponse } from 'src/app/models/prodResponse';
import { GraphDataTransferService } from 'src/app/services/graph-data-transfer.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  rangeDates?: Date[];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  data?: ProdResponse
  private destroy$ = new Subject<void>(); // !memoryleak

  constructor(private homeService: HomeService, private graphDtService: GraphDataTransferService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 9;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate.setMonth(0);
    this.minDate.setDate(1);
    this.minDate.setFullYear(2022);
    //this.maxDate.setMonth(nextMonth);
    //this.maxDate.setFullYear(nextYear);
    this.rangeDates = [this.minDate, this.maxDate];

    if (this.graphDtService.getGraphData()?.key1) {
      this.data = this.graphDtService.getGraphData()?.key1
      this.rangeDates = this.graphDtService.getGraphData()?.key2
    } else {
      this.getProdCpr(this.rangeDates)
    }
  }

  updateData(date: Date[]) {
    this.data = undefined
    console.log(date)
    this.getProdCpr(date)
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
      if (this.rangeDates) {
        this.updateData(this.rangeDates)
      }
    }
  }

  onClearClick() {
    this.rangeDates = [this.minDate, this.maxDate];
    //this.updateEvent.emit(this.rangeDates)
    this.updateData(this.rangeDates)
  }


  getProdCpr(rangeDates: Date[]) {
    this.homeService
      .getInfoProdCpr(rangeDates)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            if (response.abordagens.length > 0) {
              this.data = response
              this.graphDtService.setGraphDatas(response, this.rangeDates!);
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }



}
