import { PrimeNGConfig } from 'primeng/api';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'produtividade-controle';

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
      this.primengConfig.ripple = false;

      this.primengConfig.zIndex = {
        modal: 1100,    // dialog, sidebar
        overlay: 1000,  // dropdown, overlaypanel
        menu: 1000,     // overlay menus
        tooltip: 1100   // tooltip
    };

      this.primengConfig.setTranslation({
        accept: 'Sim',
        reject: 'Sair',
        monthNames : ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: 	['Jan', 'Fec', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNamesMin:	['Do', 'Se', 'Te', 'Qu', 'Qt', 'Se', 'Sa'],
        dayNamesShort:	['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNames:	['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
        dateFormat:	'dd/mm/yy',
        today: 'Hoje',
        clear: 'Limpar',
        isNot: 'Não'
        //translations
    });
  }
}
