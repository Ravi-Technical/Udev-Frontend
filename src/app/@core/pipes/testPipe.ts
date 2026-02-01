import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'impueExample',
    pure:false
})

export class impueExamplePipe implements PipeTransform {
    transform(items:string[]):string[] {
        console.log("Impure pipe works");
        return items.filter(item=>item.startsWith('A'));
    }  
} 