import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Chart, DatasetChartOptions, LegendItem } from 'chart.js';
import { UIChart } from 'primeng/chart';
import { Subject, takeUntil } from 'rxjs';
import { ProdResponse } from 'src/app/models/prodResponse';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-abordagens',
  templateUrl: './abordagens.component.html',
  styleUrls: ['./abordagens.component.scss'],
})
export class AbordagensComponent implements OnInit, OnDestroy {
  @Input() data?: ProdResponse;
  @Input() action?: number;
  @Input() tipo?: string;
  @Input() title?: string;
  @Input() description?: string;
  //@Output() updateEvent = new EventEmitter<Date[]>()

  rangeDates?: Date[];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  visitorChart: any;
  chartOptions: any;
  abordagemData: any[] = [];
  totalabordagens?: number = 0;
  list: any[] = [];
  colors: any[] = [];
  label: string[] = [];
  btls: string[] = ['14º BPM', '31º BPM', '32º BPM', '47º BPM'];

  private destroy$ = new Subject<void>(); // !memoryleak

  constructor(private homeService: HomeService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    console.log('init');
    this.initCharts(this.data);

    this.colors.push('--blue-500');
    this.colors.push('--red-500');
    this.colors.push('--green-500');
    this.colors.push('--cyan-500');
  }

  initCharts(data?: ProdResponse) {
    if (data) {
      //let label: string[] = [];
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      if (this.action == 1) {
        const keys = Object.keys(data.abordagens[0]) as Array<
          keyof typeof data.abordagens
        >;

        keys.forEach((key, index) => {
          if (index > 0 && index <= 4) {
            this.label.push(key as string);
          }
        });

        data.abordagens.forEach((el: any, index) => {
          let temp: any = [];
          if (index > 0) {
            const keys = Object.keys(data.abordagens[index]) as Array<
              keyof typeof data.abordagens
            >;
            keys.forEach((key, idx) => {
              if (idx > 0 && idx <= 4) {
                temp.push(Number(el[key]));
              }
            });
            let sum = temp.reduce((a: number, b: number) => a + b, 0);
            this.totalabordagens = sum;
            this.list.push(temp);
          }
        });
      } else if (Number(this.action) > 1) {
        const keys = Object.keys(data.prisoes[0]) as Array<keyof typeof data.prisoes>;
        keys.forEach((key, index) => {
          if (index == (Number(this.action) - 1)) {
            this.label.push(key as string);
          }
        });

        data.prisoes.forEach((el: any, index) => {
          let temp: any = [];
          if (index > 0) {
            const keys = Object.keys(data.prisoes[index]) as Array<
              keyof typeof data.prisoes
            >;
            keys.forEach((key, idx) => {
              if (idx == Number(this.action) - 1) {
                temp.push(Number(el[key]));
              }
            });
            let sum = temp.reduce((a: number, b: number) => a + b, 0);
            this.totalabordagens = sum;
            this.list.push(temp);
          }
        });
      }

      this.list.pop();

      this.visitorChart = {
        labels: this.label,
        datasets: [
          {
            label: '14º BPM',
            data: this.list[0],
            backgroundColor: getComputedStyle(document.body).getPropertyValue(
              '--blue-500'
            ),
            fill: true,
            barPercentage: 0.8,
            stepped: true,
          },
          {
            label: '31º BPM',
            data: this.list[1],
            backgroundColor: getComputedStyle(document.body).getPropertyValue(
              '--red-500'
            ),
            fill: true,
            barPercentage: 0.8,
            stepped: true,
          },
          {
            label: '32º BPM',
            data: this.list[2],
            backgroundColor: getComputedStyle(document.body).getPropertyValue(
              '--green-500'
            ),
            fill: true,
            barPercentage: 0.8,
            stepped: true,
          },
          {
            label: '47º BPM',
            data: this.list[3],
            backgroundColor: getComputedStyle(document.body).getPropertyValue(
              '--cyan-500'
            ),
            fill: true,
            barPercentage: 0.8,
            stepped: true,
          },
        ],
      };

      this.chartOptions = {
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            onClick: (e: any, legendItem: LegendItem, legend: any) => {
              //console.log(legendItem);
              const index: any = legendItem.datasetIndex;
              const ci: any = legend.chart as Chart;
              let total = 0;
              let alwals: any = [];
              const datasets = ci.data.datasets;

              this.totalabordagens = datasets[index].data.reduce(
                (total: any, item: any) => total + item
              );

              let alreadyHidden =
                ci.getDatasetMeta(index).hidden === null
                  ? false
                  : ci.getDatasetMeta(index).hidden;
              ci.data.datasets.forEach(function (e: LegendItem, i: number) {
                let meta: any = ci.getDatasetMeta(i);

                if (i !== index) {
                  if (!alreadyHidden) {
                    console.log('alreadyHidden1');
                    meta.hidden = meta.hidden === null ? !meta.hidden : null;
                  } else if (meta.hidden === null) {
                    console.log('alreadyHidden2');
                    meta.hidden = true;
                  }
                } else if (i === index) {
                  console.log('alreadyHidden3');
                  meta.hidden = null;
                }

                alwals.push(meta.hidden === null ? false : meta.hidden);
                console.log(alwals);
              });

              const count = alwals.filter((el: any, indice: any) => {
                if (el === false) {
                  return true;
                }
                return false;
              }).length;

              if (count == 4) {
                console.log('includes');
                data.abordagens.forEach((el: any, idc) => {
                  let temp: any = [];
                  if (idc > 0) {
                    const keys = Object.keys(data.abordagens[idc]) as Array<
                      keyof typeof data.abordagens
                    >;
                    keys.forEach((key, idx) => {
                      if (idx > 0 && idx <= 4) {
                        //console.log(key);
                        //console.log(el[key]);
                        temp.push(Number(el[key]));
                      }
                    });
                    let sum = temp.reduce((a: number, b: number) => a + b, 0);
                    //console.log(sum);
                    this.totalabordagens = sum;
                  }
                });
              }

              ci.update();

              //Chart.defaults.plugins.legend.onClick.call(ci, e, legendItem, legend);
            },
            labels: {
              generateLabels: (chart: Chart) => {
                const datasets = chart.data.datasets;

                let legends: LegendItem[] = [];
                for (let i = 0; i < datasets.length; i++) {
                  const meta = chart.getDatasetMeta(i);
                  let total: any = datasets[i].data.reduce(
                    (total: any, item: any) => total + item
                  );
                  legends.push({
                    text: `${datasets[i].label} (${total.toLocaleString()})`,
                    fillStyle: datasets[i].backgroundColor?.toString(),
                    datasetIndex: i,
                    strokeStyle: 'black',
                    hidden: !meta.visible,
                  });
                }

                return legends;
              },
              color: textColor,
            },
          },
        },
        responsive: true,
        hover: {
          mode: 'index',
        },
        scales: {
          y: {
            ticks: {
              color: textColor,
            },
            //min: 500,
            //max: 900
            //,
            grid: {
              display: false,
            },
          },
          x: {
            ticks: {
              color: textColor,
            },
            barPercentage: 0.5,
            grid: {
              display: false,
            },
          },
        },
      };
    }
  }
}
