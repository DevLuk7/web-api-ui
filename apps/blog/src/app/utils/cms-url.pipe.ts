import { Pipe, PipeTransform } from '@angular/core';
import { config } from '../app.config';

@Pipe({
    standalone: true,
    name: 'cmsUrl'
})

export class CMSUrlPipe implements PipeTransform {
    private readonly cmsUrl = config().cmsUrl;
    
    transform(value: string): string {
        return `${this.cmsUrl}${value}`;
    }
}