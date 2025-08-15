import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'listPercentualOf'
})
export class ListPercentualPipe implements PipeTransform {

  transform(items:any[] , item:number): any {
    ///console.log(items)
    let total = items.reduce((total: number, item: number) => Number(total) + Number(item));
    //console.log(total)

    return ((item/total)*100).toFixed(2); ;

  }

}
