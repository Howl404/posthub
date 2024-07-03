import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) {
      return 'less than a minute ago';
    }

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    let result = 'just now';

    Object.entries(intervals).forEach(([unit, secondsInUnit]) => {
      const counter = Math.floor(seconds / secondsInUnit);
      if (counter > 0 && result === 'just now') {
        result = `${counter} ${unit}${this.getPlural(counter)} ago`;
      }
    });

    return result;
  }

  private getPlural(counter: number): string {
    return counter > 1 ? 's' : '';
  }
}
