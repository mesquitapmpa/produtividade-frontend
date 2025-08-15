import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkifexistform',
})
export class CheckExistFormPipe implements PipeTransform {
  transform(item: any, type: string): boolean {
    let isExist = false;

    const keys = Object.keys(item.question) as Array<
      keyof typeof item.question
    >;
    keys.forEach((key) => {
      if (key === type) {
        isExist = true;
        let res = item.question[key]
      } else {
        isExist = false;
      }
    });
    //console.log(item);
    //console.log(isExist);
    return isExist;

    //textQuestion?: TextQuestion
    //choiceQuestion?: ChoiceQuestion
    //dateQuestion?: DateQuestion
  }
}
