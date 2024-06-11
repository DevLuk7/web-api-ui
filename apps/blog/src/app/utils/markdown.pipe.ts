import { Pipe, PipeTransform } from '@angular/core';
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import Prism from 'prismjs';

@Pipe({
  standalone: true,
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  transform(value: any): any {
    const marked = new Marked(
      markedHighlight({
        langPrefix: 'language-',
        highlight(code, lang, info) {
          return Prism.highlight(code, (Prism.languages as any)[lang], lang);
        }
      })
    );
    return marked.parse(value);
  }
}
