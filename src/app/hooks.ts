import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { useEffect, useRef } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAnimationFrame = (callback: (arg0: ICallback) => void) => {
  const frame = useRef();
  const last = useRef(performance.now());
  const init = useRef(performance.now());

  const animate = () => {
    const now = performance.now();
    const time = (now - init.current) / 1000;
    const delta = (now - last.current) / 1000;
    callback({ time, delta });
    last.current = now;
    (frame as unknown as IFrame).current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    (frame as unknown as IFrame).current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame((frame as unknown as IFrame).current);
  });
};

interface ICallback {
  time: number;
  delta: number;
}

interface IFrame {
  current: number;
}
