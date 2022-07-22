import { ReactNode, useContext } from 'react';
import { CalendarProps, DateRangePicker, InputRange, Preview, RangeFocus, RangeKeyDict, Range, AriaLabelsShape, ClassNames, StaticRange, ScrollOptions } from 'react-date-range';
import es_ES from 'date-fns/locale/es';
import en_GB from 'date-fns/locale/en-GB';
import en_US from 'date-fns/locale/en-GB';
import ConfigProvider from 'antd/es/config-provider';

interface Props {
  /** default: none */
  className?: string | undefined;
  /**
   * Which range and step are focused. First value is index of ranges, second value
   * is which step on date range (startDate or endDate)
   *
   * default: `[0, 0]`
   */
  focusedRange?: RangeFocus | undefined;
  /** default: none */
  footerContent?: React.ReactNode | undefined;
  /** default: none */
  headerContent?: React.ReactNode | undefined;
  /** default: `defaultInputRanges` (defined and exported in package) */
  inputRanges?: InputRange[] | undefined;
  /** default: none */
  onChange?: ((rangesByKey: RangeKeyDict) => void) | undefined;
  /** default: none */
  onPreviewChange?: ((preview?: Date | Preview) => void) | undefined;
  /** default: `['#3d91ff', '#3ecf8e', '#fed14c']` */
  rangeColors?: string[] | undefined;
  /** default: [] */
  ranges?: Range[] | undefined;
  /**
   * Custom renderer function for static range labels
   *
   * default: none
   */
  renderStaticRangeLabel?: ((staticRange: StaticRange) => React.ReactNode) | undefined;
  /** default: `defaultStaticRanges` (defined and exported in package) */
  staticRanges?: StaticRange[] | undefined;
  /** default: `false` */
  moveRangeOnFirstSelection?: boolean;
  /** default: `false` */
  retainEndDateOnFirstSelection?: boolean;
  /**
     * Custom accessibility aria labels for elements
     *
     * default: `{}`
     */
  ariaLabels?: AriaLabelsShape | undefined;
  /** default: `forwards` */
  calendarFocus?: 'forwards' | 'backwards' | undefined;
  /**
   * Custom class names for elements
   *
   * default: `{}`
   */
  classNames?: ClassNames | undefined;
  /** default: `#3d91ff` */
  color?: string | undefined;
  /**
   * The currently selected date
   *
   * default: none
   */
  date?: Date | undefined;
  /** default: `MMM d, yyyy` */
  dateDisplayFormat?: string | undefined;
  /**
   * Custom renderer function for the calendar days
   *
   * default: none
   */
  dayContentRenderer?: ((date: Date) => React.ReactNode) | undefined;
  /** default: `d` */
  dayDisplayFormat?: string | undefined;
  /** default: `vertical` */
  direction?: 'vertical' | 'horizontal' | undefined;
  /** default: `[]` */
  disabledDates?: Date[] | undefined;
  /**
   * Custom function to determine if a day should be disabled
   *
   * default: `() => {}`
   */
  disabledDay?: ((date: Date) => boolean) | undefined;
  /** default: `date` */
  displayMode?: 'dateRange' | 'date' | undefined;
  /** default: `true` */
  dragSelectionEnabled?: boolean | undefined;
  /** default: `false` */
  editableDateInputs?: boolean | undefined;
  /** default: `Continuous` */
  endDatePlaceholder?: string | undefined;
  /** default: `false` */
  fixedHeight?: boolean | undefined;
  /**
   * Initial value for focused range. See `focusedRange` for usage
   *
   * default: none
   */
  initialFocusedRange?: RangeFocus | undefined;
  /**
   * default: `en-US` from `date-fns/locale`
   *
   * Complete list here: https://github.com/hypeserver/react-date-range/blob/next/src/locale/index.js
   */
  locale?: Locale | undefined;
  /** default: 20 years after the current date */
  maxDate?: Date | undefined;
  /** default: 100 years before the current date */
  minDate?: Date | undefined;
  /** default: `MMM yyyy` */
  monthDisplayFormat?: string | undefined;
  /** default: `1` */
  months?: number | undefined;
  /**
   * Custom renderer function for the month and year navigation section
   *
   * default: none
   */
  navigatorRenderer?:
  | ((
    currFocusedDate: Date,
    changeShownDate: (
      value: Date | number | string,
      mode?: 'set' | 'setYear' | 'setMonth' | 'monthOffset',
    ) => void,
    props: CalendarProps,
  ) => JSX.Element)
  | undefined;
  /** default: none */
  onRangeFocusChange?: ((newFocusedRange: RangeFocus) => void) | undefined;
  /** default: none */
  onShownDateChange?: ((date: Date) => void) | undefined;
  /** default: false */
  preventSnapRefocus?: boolean | undefined;
  /** default: none */
  preview?: Preview | undefined;
  /** default: `['#3d91ff', '#3ecf8e', '#fed14c']` */
  /**
   * Custom scroll options for various parts of the display
   *
   * default: `{ enabled: false }`
   */
  scroll?: ScrollOptions | undefined;
  /** default: true */ 
  showDateDisplay?: boolean | undefined;
  /** default: true */
  showMonthAndYearPickers?: boolean | undefined;
  /** default: true */
  showMonthArrow?: boolean | undefined;
  /** default: true */
  showPreview?: boolean | undefined;
  /** default: none */
  shownDate?: Date | undefined;
  /** default: `Early` */
  startDatePlaceholder?: string | undefined;
  /** default: none */
  updateRange?: ((newRange: Range) => void) | undefined;
  /** default: `E` */
  weekdayDisplayFormat?: string | undefined;

  children?: ReactNode | undefined;
}
export const DatePicker = (props: Props) => {
  const {
    className,
    focusedRange,
    footerContent,
    headerContent,
    inputRanges,
    onChange,
    onPreviewChange,
    rangeColors,
    ranges,
    renderStaticRangeLabel,
    staticRanges,
    moveRangeOnFirstSelection,
    retainEndDateOnFirstSelection,
    months,
    weekdayDisplayFormat,
    direction,
    ariaLabels,
    showMonthAndYearPickers,
    calendarFocus,
    children,
    updateRange,
    showMonthArrow,
    classNames,
    color,
    date,
    dateDisplayFormat,
    dayContentRenderer,
    disabledDates,
    disabledDay,
    displayMode,
    minDate,
    maxDate,
    dragSelectionEnabled,
    editableDateInputs,
    endDatePlaceholder,
    initialFocusedRange,
    fixedHeight,
    monthDisplayFormat,
    navigatorRenderer,
    onRangeFocusChange,
    onShownDateChange,
    preventSnapRefocus,
    preview,
    scroll,
    showDateDisplay,
    shownDate,
    showPreview,
    startDatePlaceholder
  } = props;

  const locale: Locale = (() => {
    const localeT = useContext(ConfigProvider.ConfigContext)?.locale?.locale?.toUpperCase() ?? 'EN-GB';
    const parts = localeT.split(/[-_]/);
    switch (parts[0]) {
      default:
      case 'EN':
        switch (parts[1]) {
          default: return en_GB;
          case 'US': return en_US;
        }
      case 'ES': return es_ES;
    }
  })();

  return <DateRangePicker
    locale={locale}

    className={className}
    onChange={onChange}
    moveRangeOnFirstSelection={moveRangeOnFirstSelection}
    months={months}
    ranges={ranges}
    direction={direction}
    ariaLabels={ariaLabels}
    showMonthAndYearPickers={showMonthAndYearPickers}
    calendarFocus={calendarFocus}
    focusedRange={focusedRange}
    footerContent={footerContent}
    headerContent={headerContent}
    inputRanges={inputRanges}
    onPreviewChange={onPreviewChange}
    rangeColors={rangeColors}
    renderStaticRangeLabel={renderStaticRangeLabel}
    staticRanges={staticRanges}
    retainEndDateOnFirstSelection={retainEndDateOnFirstSelection}
    weekdayDisplayFormat={weekdayDisplayFormat}
    updateRange={updateRange}
    showMonthArrow={showMonthArrow}
    classNames={classNames}
    color={color}
    date={date}
    dateDisplayFormat={dateDisplayFormat}
    dayContentRenderer={dayContentRenderer}
    dayDisplayFormat={weekdayDisplayFormat}
    disabledDates={disabledDates}
    disabledDay={disabledDay}
    displayMode={displayMode}
    dragSelectionEnabled={dragSelectionEnabled}
    editableDateInputs={editableDateInputs}
    endDatePlaceholder={endDatePlaceholder}
    fixedHeight={fixedHeight}
    initialFocusedRange={initialFocusedRange}
    maxDate={maxDate}
    minDate={minDate}
    monthDisplayFormat={monthDisplayFormat}
    navigatorRenderer={navigatorRenderer}
    onRangeFocusChange={onRangeFocusChange}
    onShownDateChange={onShownDateChange}
    preventSnapRefocus={preventSnapRefocus}
    preview={preview}
    scroll={scroll}
    showDateDisplay={showDateDisplay}
    shownDate={shownDate}
    showPreview={showPreview}
    startDatePlaceholder={startDatePlaceholder}
  >
    {children}
  </DateRangePicker>;
};