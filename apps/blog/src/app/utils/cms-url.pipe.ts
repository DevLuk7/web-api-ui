import { Pipe, PipeTransform } from '@angular/core';
import { config } from '../app.config';

@Pipe({
    standalone: true,
    name: 'cmsUrl'
})

export class CMSUrlPipe implements PipeTransform {
    private readonly cmsUrl = config().cmsUrl;
    
    transform(value: string): string {
        if (value.startsWith('http')) {
            return value;
        }
        return `${this.cmsUrl}${value}`;
    }
}