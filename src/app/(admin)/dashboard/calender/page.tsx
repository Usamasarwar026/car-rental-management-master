import CalendarPicker from "@/components/calender/CalendarPicker";
import DailySchedule from "@/components/calender/DailySchedule";
import FilterBtn from "@/components/calender/FilterBtn";
import UpcomingEventsList from "@/components/calender/UpcomingEventsList";

const Calender = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
      <div className="flex flex-col gap-y-6">
        <h1
          className={`dark:text-pure_white text-charcoal_black text-2xl font-bold mb-1 lg:text-left`}
        >
          Calendar
        </h1>
        <CalendarPicker />
        <UpcomingEventsList />
      </div>

      <div>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
          <FilterBtn heading="Toyota" />
          <FilterBtn heading="Time" />
          <FilterBtn heading="Status" />
        </div>

        <DailySchedule />
      </div>
    </div>
  );
};

export default Calender;
