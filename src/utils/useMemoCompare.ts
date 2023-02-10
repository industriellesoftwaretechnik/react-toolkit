import { useEffect } from 'react';
import { is } from './equals';

export default function useMemoCompare<T, R>(opts: {
  value: T,
  selector: (v: T) => R,
  compare?: (o1: R, o2: R) => boolean
}): R {
    const previousRef = useRef<R>();
    const previous = previousRef.current;
    const next = opts.selector(opts.value);
    const isEqual = (opts.compare ?? is)(previous, next);

    useEffect(() => {
      if (!isEqual) {
        previousRef.current = next;
      }
    });
    
    return isEqual ? previous : next;
}