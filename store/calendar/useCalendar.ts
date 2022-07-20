import { useSelector } from 'react-redux';
import type { RootState } from '../rootReducer';

export default function useCalendar() {
  return useSelector((state: RootState) => state.calendar);
}
