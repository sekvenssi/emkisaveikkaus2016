import moment from 'moment'

const addBeginninZeroIfNeeded = (value) => {
  return value.length === 1 ? value.replace (/^/,'0') : value
}

export const momentTime = (year, month, day, hour) => {
  const z = addBeginninZeroIfNeeded
  const ISO8601_Date = `${z(year)}-${z(month)}-${z(day)} ${z(hour)}`
  return moment(ISO8601_Date)
}

export const sortDates = (arrayOfDates) => {
  return arrayOfDates.sort(function(a, b) {
    return a.date.toDate() - b.date.toDate()
  });
}
