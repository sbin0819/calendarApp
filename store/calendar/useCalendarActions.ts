import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { calendarActions } from '.';

export default function useCalendarActions() {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(calendarActions, dispatch),
    [dispatch],
  );
}
