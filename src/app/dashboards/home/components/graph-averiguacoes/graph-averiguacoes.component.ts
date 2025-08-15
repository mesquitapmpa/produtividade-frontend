import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartDataset, LegendItem } from 'chart.js';
import { DatasetController } from 'chart.js/dist';
import { ProdAbordagens, ProdArmas, ProdPrisoes, ProdResponse } from 'src/app/models/prodResponse';

@Component({
  selector: 'app-graph-averiguacoes',
  templateUrl: './graph-averiguacoes.component.html',
  styleUrls: ['./graph-averiguacoes.component.scss'],
})
export class GraphAveriguacoesComponent implements OnInit {
  averiguacaoChart: any;
  averiguacaoChartOptions: any;
  @Input() title: string = '';
  @Input() data?: ProdResponse;
  @Input() action?: number;
  @Input() tipo?: string;
  list: any[] = [];
  colors: any[] = []
  label: string[] = [];
  total: number = 0

  ngOnInit(): void {
    this.initChart(this.data);
    this.colors.push('--blue-500')
    this.colors.push('--red-500')
    this.colors.push('--green-500')
    this.colors.push('--cyan-500')
  }


  initChart(data?: ProdResponse) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    if (data) {
      if (this.action! <=2)
          data.abordagens.forEach((el: ProdAbordagens, index) => {
        let temp: any = [];
        if (index > 0) {
          const keys = Object.keys(data.abordagens[index]) as Array<
            keyof typeof data.abordagens
          >;
          keys.forEach((key, idx) => {
            if (idx == 0) {
              this.label.push(el.BPM);
             if (this.action == 1) {
                temp.push(el['Casas de Show\n Averiguadas']);
              } else if (this.action == 2) {
                temp.push(el['Bares \nAveriguados']);
              }
            }
          });
          this.list.push(temp);
        }
      });
      else if (this.action! <= 6) {
        data.prisoes.forEach((el: ProdPrisoes, index) => {
          let temp: any = [];
          if (index > 0) {
            const keys = Object.keys(data.abordagens[index]) as Array<
              keyof typeof data.abordagens
            >;
            keys.forEach((key, idx) => {
              if (idx == 0) {
                this.label.push(el.BPM);
               if (this.action == 3) {
                  temp.push(el['Motos \nRecuperadas']);
                } else if (this.action == 4) {
                  temp.push(el['Veículos 4 Rodas\nRecuperados']);
                } else if (this.action == 5) {
                  temp.push(el['Foragidos\n Recapturados']);
                } else if (this.action == 6) {
                  temp.push(el['Cumprimento de \nmandado judicial']);
                }
              }
            });
            this.list.push(temp);
          }
        });
      }
      else if (this.action! >= 7) {
        data.prisoes.forEach((el: ProdPrisoes, index) => {
          let temp: any = [];
          if (index > 0) {
            const keys = Object.keys(data.prisoes[index]) as Array<keyof typeof data.prisoes>;
            keys.forEach((key, idx) => {
              if (idx == 0) {
                this.label.push(el.BPM);
               if (this.action == 8) {
                  temp.push(el['Arma de Fogo\n Caseira']);
                } else if (this.action == 9) {
                  temp.push(el['Arma de Fogo\n Industrial']);
                }
              }
            });
            this.list.push(temp);
          }
        });
      }

      this.label.pop();
      this.list.pop();

      this.total = this.list.reduce((total: number, item: number) => Number(total) + Number(item));

      this.averiguacaoChart = {
        labels: this.label,
        datasets: [
          {
            data: this.list,
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--red-400'),
              documentStyle.getPropertyValue('--green-400'),
              documentStyle.getPropertyValue('--cyan-400'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--red-500'),
              documentStyle.getPropertyValue('--green-500'),
              documentStyle.getPropertyValue('--cyan-500'),
            ],
            borderColor: 'black',
            fill: true,
            borderWidth: 1
          },
        ],
      };

      this.averiguacaoChartOptions = {
        plugins: {
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
                  strokeStyle: 'blue',
                  hidden: !meta.visible,
                });
              }

              return legends;
            },
            color: textColor,
          },
        },
      };

      this.averiguacaoChart.datasets[0].data.forEach((element:any, idx:number) => {
        //this.averiguacaoChart.datasets[0].data[idx].label = this.label[idx]
        //console.log(element)
        //console.log(this.label[idx])
        //console.log(idx)
      });
    }
  }
}
