import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class SearchPipe implements PipeTransform {
    transform(items: any, args?: any): any {

        if(!items)return null;
        if(!args)return items;

        args = args.toLowerCase();

        return items.filter((item) => {
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    }
}