"use client"

import { differenceInDays, isPast, isSameDay, isWithinInterval, set } from "date-fns";
import { useReservation } from "./ReservationContext";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// CSS per affiancare i calendari
const calendarStyles = `
  .rdp {
    --rdp-columns: 2 !important;
  }
  
  .rdp-months {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 1rem !important;
    width: 100% !important;
  }
  
  .rdp-month {
    width: 100% !important;
    display: block !important;
  }
`;

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {

  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? {} : range;

  const { regularPrice, discount } = cabin
  const numNights = displayRange?.from && displayRange?.to
    ? differenceInDays(displayRange.to, displayRange.from)
    : 0;
  const cabinPrice = numNights * (regularPrice - discount);


  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  // console.log(bookedDates);

  return (
    <div className="flex flex-col justify-between">
      <style dangerouslySetInnerHTML={{ __html: calendarStyles }} />
      <div className="flex justify-center w-full h-80 overflow-hidden">
        <DayPicker
          className="pt-12 scale-[0.65]"
          mode="range"
          selected={displayRange}
          onSelect={(newRange) => { 
            // console.log("RANGE", newRange); 
            if (newRange === undefined) {
              // Doppio click sulla stessa data - mantieni il range corrente
              return;
            }
            setRange(newRange);
          }}
          min={minBookingLength + 1}
          max={maxBookingLength}
          startMonth={new Date()}
          endMonth={new Date(new Date().getFullYear() + 5, 11)}
          captionLayout="dropdown"
          numberOfMonths={2}
          disabled={(curDate) => isPast(curDate) || bookedDates.some((date) => isSameDay(date, curDate))}
        />
      </div>

      {range === undefined ? (
        <div className="px-8 py-4 bg-red-500 text-white text-center">
          <p className="font-semibold">⚠️ Please select two different dates for your reservation.</p>
        </div>
      ) : (
        <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
          <div className="flex items-baseline gap-6">
            <p className="flex gap-2 items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-2xl">${regularPrice - discount}</span>
                  <span className="line-through font-semibold text-primary-700">
                    ${regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-2xl">${regularPrice}</span>
              )}
              <span className="">/night</span>
            </p>
            {numNights ? (
              <>
                <p className="bg-accent-600 px-3 py-2 text-2xl">
                  <span>&times;</span> <span>{numNights}</span>
                </p>
                <p>
                  <span className="text-lg font-bold uppercase">Total</span>{" "}
                  <span className="text-2xl font-semibold">${cabinPrice}</span>
                </p>
              </>
            ) : null}
          </div>

          {range?.from || range?.to ? (
            <button
              className="border border-primary-800 py-2 px-4 text-sm font-semibold"
              onClick={() => { resetRange(); console.log("RANGE", range); }}
            >
              Clear
            </button>
          ) : null}
        </div>
      )}


    </div>
  );
}

export default DateSelector;
