import React, { Component } from 'react';

import CalendarNav from '../components/CalendarNav';
import CalendarHeader from './CalendarHeader';
import CalendarMonth from './CalendarMonth';

class Calendar extends Component {
  render() {
    return (
      <div className="calendar">
        <CalendarNav />
        <CalendarHeader />
        <CalendarMonth />
      </div>
    );
  }
}

export default Calendar;
