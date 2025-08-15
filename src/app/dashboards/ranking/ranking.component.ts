import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Subject, takeUntil } from 'rxjs';
import { Ranking } from 'src/app/models/ranking';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // !memoryleak

  ranking: Ranking[] = [];

  registros: any[] = [];

  loading: boolean = false;

  item?: Ranking;

  sidebarVisible: boolean = false;

  minDate: Date = new Date();

  maxDate: Date = new Date();

  rangeDate: Date[] = [];

  fakeregistro: any[] | undefined;

  constructor(private rankingService: RankingService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 6;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.rangeDate = [this.minDate, this.maxDate];
    this.getRankingData(this.rangeDate);
    this.fakeregistro = Array.from({ length: 2 }).map((_, i) => `Item #${i}`);
  }

  updateRanking(date: Date[]) {
    console.log('chegou');
    console.log(date);
    this.rangeDate = date;
    this.getRankingData(date);
  }

  selectRanking(item: Ranking) {

    this.sidebarVisible = true;
    this.item = item;
    this.getRegistrosByIdpessoa(this.item.idpessoa, this.rangeDate);
  }

  getRankingData(rangeDate: Date[]) {
    this.loading = true;
    this.rankingService
      .getRanking(rangeDate)
      .pipe(takeUntil(this.destroy$)) // memory leak
      .subscribe({
        next: (response) => {
          if (response) {
            if (response.length > 0) {
              this.ranking = response;
              console.log(this.ranking);
            } else {
              this.ranking = [];
            }
            this.loading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.ranking = [];
        },
      });
  }

  hideDialog() {
    this.sidebarVisible = false;
  }

  getRegistrosByIdpessoa(idpessoa: number, rangeDates?: Date[]) {
    this.loading = true
    this.registros = [];

    setTimeout(() => {
      this.rankingService
        .getRankingByIdPessoa(idpessoa, rangeDates!)
        .pipe(takeUntil(this.destroy$)) // memory leak
        .subscribe({
          next: (response) => {
            if (response) {
              if (response.length > 0) {
                this.registros = response;
                console.log(this.registros);

              } else {
                this.registros = [];

              }
              this.loading = false
            }
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
            this.ranking = [];
          },
        });
    }, 1000);
  }
}
