import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  let pipe: TimeAgoPipe;

  beforeEach(() => {
    pipe = new TimeAgoPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform date to less than a minute ago', () => {
    const now = new Date();
    const result = pipe.transform(now);
    expect(result).toBe('less than a minute ago');
  });

  it('should transform date to minutes ago', () => {
    const now = new Date();
    const minutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const result = pipe.transform(minutesAgo);
    expect(result).toBe('5 minutes ago');
  });

  it('should transform date to hours ago', () => {
    const now = new Date();
    const hoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const result = pipe.transform(hoursAgo);
    expect(result).toBe('2 hours ago');
  });

  it('should transform date to days ago', () => {
    const now = new Date();
    const daysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const result = pipe.transform(daysAgo);
    expect(result).toBe('3 days ago');
  });

  it('should transform date to weeks ago', () => {
    const now = new Date();
    const weeksAgo = new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000);
    const result = pipe.transform(weeksAgo);
    expect(result).toBe('2 weeks ago');
  });

  it('should transform date to months ago', () => {
    const now = new Date();
    const monthsAgo = new Date(now.getTime() - 3 * 30 * 24 * 60 * 60 * 1000);
    const result = pipe.transform(monthsAgo);
    expect(result).toBe('3 months ago');
  });

  it('should transform date to years ago', () => {
    const now = new Date();
    const yearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);
    const result = pipe.transform(yearsAgo);
    expect(result).toBe('2 years ago');
  });

  it('should use singular form for singular time units', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000);
    const result = pipe.transform(oneMinuteAgo);
    expect(result).toBe('1 minute ago');
  });
});
