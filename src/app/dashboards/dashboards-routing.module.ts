import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'home', data: {breadcrumb: 'Home'}, loadChildren: () => import('./init/init.module').then(m => m.InitModule) },
        //{ path: 'dados', data: {breadcrumb: 'Dados'}, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
        { path: 'ranking', data: {breadcrumb: 'Ranking'}, loadChildren: () => import('./ranking/ranking.module').then(m => m.RankingModule) },
        { path: 'registros/novo', data: {breadcrumb: 'Registros'}, loadChildren: () => import('./registro/novo.registro/novo.registro.module').then(m => m.NovoRegistroModule) },
        { path: 'registros/edit/:id', data: {breadcrumb: 'Registros'}, loadChildren: () => import('./registro/novo.registro/novo.registro.module').then(m => m.NovoRegistroModule) },
        { path: 'registros/listar', data: {breadcrumb: 'Registros'}, loadChildren: () => import('./registro/listar.registro/registro.module').then(m => m.RegistroModule) },
        { path: 'cautelas/:function', data: {breadcrumb: 'Cautelas'}, loadChildren: () => import('./cautela/cautela.module').then(m => m.CautelaModule) },
        { path: 'armamentos/:function', data: {breadcrumb: 'Armamentos'}, loadChildren: () => import('./armamento/armamento.module').then(m => m.ArmamentoModule) },
        { path: 'images/:id/:model', data: {breadcrumb: 'Imagens'}, loadChildren: () => import('./images/images.module').then(m => m.ImagesModule) },
        { path: 'viewimages/:id/:model', data: {breadcrumb: 'Visualizar Imagens'}, loadChildren: () => import('./viewimages/viewimages.module').then(m => m.ViewimagesModule) },
        { path: 'parametros/:function', data: {breadcrumb: 'Parâmetros'}, loadChildren: () => import('./parametros/parametros.module').then(m => m.ParametrosModule) },
        //{ path: 'formularios', data: {breadcrumb: 'Formulários'}, loadChildren: () => import('./forms/forms-google/forms-google.module').then(m => m.FormsGoogleModule) },


    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }



