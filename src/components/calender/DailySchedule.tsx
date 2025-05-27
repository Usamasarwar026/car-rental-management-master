"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import timeGridDay from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { useEvents } from "@/hooks/useEvent";
import { COLORS } from "@/constants/colors";

const DailySchedule = () => {
  const { events, addEvent, deleteData } = useEvents();

  const handleDateClick = async (arg: DateClickArg) => {
    const title = prompt("Enter event title:");
    if (title) {
      addEvent({ title, start: arg.dateStr, color: COLORS.medium_sea_green });
    }
  };

  const handleEventClick = (eventClickInfo: EventClickArg) => {
    const action = confirm("Delete this event?");
    if (action) {
      const eventId = eventClickInfo.event.id;
      deleteData(eventId);
    }
  };

  return (
    <div className="dark:bg-charcoal_black bg-white p-5 max-sm:p-2 rounded-lg shadow-lg border border-gray-200 w-full max-w-4xl mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridWeek, timeGridDay, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        height="auto"
        headerToolbar={{
          right: "prev,next today",
          center: "title",
          left: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        titleFormat={{ year: "numeric", month: "long", day: "numeric" }}
      />

      <style jsx global>{`
        .fc-toolbar {
          background-color: ${COLORS.vivid_blue} !important;
          padding: 12px 15px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }

        .fc-button-group,
        .fc-button-group * {
          background-color: ${COLORS.light_sky_blue} !important;
          border-radius: 8px;
        }

        .fc-button {
          border: none !important;
        }
        .fc-today-button {
          display: none !important;
        }

        .dark .fc {
          color: white !important;
        }

        .dark .fc-button-group,
        .dark .fc-button-group * {
          background-color: ${COLORS.charcoal_dark} !important;
        }

        .dark .fc-button {
          color: white !important;
          background: ${COLORS.vivid_blue} !important;
        }

        .dark .fc-daygrid-day {
          color: white !important;
        }

        @media (max-width: 768px) {
          .fc-header-toolbar {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default DailySchedule;
