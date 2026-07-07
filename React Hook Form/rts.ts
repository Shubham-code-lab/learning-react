When the date range is set to "last month," we are making two API calls—one for last month's data and another for the previous month of last month's data.

The selected range for last month is:

Start time: 2025-03-01T00:00:00.000Z

End time: 2025-03-31T23:59:59.999Z

However, the previous range is incorrect. It should be from February 1 to February 28:

Start time: 2025-02-01T00:00:00.000Z

End time: 2025-02-28T23:59:59.999Z

This issue occurs because we are subtracting 31 days regardless of whether the previous month has 28, 30, or 31 days.


this is the code that calculate 
const granularityFromParams =
    params?.granularity === 'hour' ? 'hours' : 'days';
  const startDate = moment(params?.start)
    .subtract(params?.limit, granularityFromParams)
    .toISOString();
  const endDate = moment(params?.end)
    .subtract(params?.limit, granularityFromParams)
    .toISOString();


const getNoOfDataPointForGranularity: any = (
  label?: any,
  forAdvancedTrends = false,
) => {
  if (label === DateRangeTypes.YESTERDAY) {
    return 24;
  }

  if (
    [
      DateRangeTypes.LAST_7_DAYS,  
      DateRangeTypes.LAST_WEEK,  
      DateRangeTypes.WEEK_TO_DATE,  
    ].includes(label)
  ) {
    return 7;
  }

  if ([DateRangeTypes.LAST_30_DAYS].includes(label)) {
    return 30;  
  }

  if (
    [
      DateRangeTypes.LAST_MONTH    
      ,DateRangeTypes.MONTH_TO_DATE   
    ].includes(label)
  ) {
    return 31; 
  }

  if ([DateRangeTypes.LAST_90_DAYS].includes(label)) {
    return 90;   
  }

  if (
    [DateRangeTypes.LAST_QUARTER, DateRangeTypes.QUARTER_TO_DATE].includes(
      label,
    )
  ) {
    return 92;
  }

  if ([DateRangeTypes.YEAR_TO_DATE, DateRangeTypes.LAST_YEAR].includes(label)) {
    return 366;
  }

  if ([DateRangeTypes.CUSTOM_RANGE].includes(label)) {
    return -1;
  }

  return 7;
};