import React, {Fragment} from 'react';
import moment from 'moment'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

export default class AirBnbPicker extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('uk');

    this.state = {
      startDate: this.props.startDate ? moment(this.props.startDate, 'DD.MM.YYYY') : null,
      endDate: this.props.endDate ? moment(this.props.endDate, 'DD.MM.YYYY') : null
    };
  }

  onDatesChange = ({startDate, endDate}) => {
    this.props.onPickerApply({
      startDate: startDate,
      endDate: endDate
    });
    this.setState({ startDate, endDate });
  }

  render() {
    return (
      <DateRangePicker
        initialVisibleMonth={this.props.initialVisibleMonth}
        disabled={this.props.disabled}
        onPrevMonthClick={this.props.getBlockedDates}
        onNextMonthClick={this.props.getBlockedDates}
        startDatePlaceholderText={this.props.startPlaceholder || 'Заїзд'}
        endDatePlaceholderText={this.props.endPlaceholder || 'Виїзд'}
        numberOfMonths={1}
        minimumNights={this.props.oneDay ? 0 : 1}
        startDate={this.state.startDate}
        startDateId="your_unique_start_date_id"
        endDate={this.state.endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.focusedInput}
        isOutsideRange={day => this.props.allowPastDates ? false : moment().diff(day) > 0}
        onFocusChange={focusedInput => this.setState({focusedInput})}
        isDayBlocked={this.state.focusedInput && this.state.focusedInput === 'endDate' ? day => false : this.props.isDayBlocked}
      />
    )
  }
}