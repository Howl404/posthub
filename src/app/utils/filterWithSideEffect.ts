import { Observable, UnaryFunction, pipe } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export function filterWithSideEffect<T>(
  predicate: (value: T) => boolean,
  sideEffect: (value: T) => void,
): UnaryFunction<Observable<T>, Observable<T>> {
  return pipe(
    tap((value: T) => {
      if (!predicate(value)) {
        sideEffect(value);
      }
    }),
    filter(predicate),
  );
}
