import { useEffect } from "react";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  selectEvents,
} from "@/store/slices/eventSlice";
import { useAppDispatch, useAppSelector } from "@/store/slices/store";

export const useEvents = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const addEvent = (event: {
    title: string;
    start: string;
    color?: string;
  }) => {
    dispatch(createEvent(event));
  };

  const deleteData = async (id: string) => {
    await dispatch(deleteEvent(id));
  };

  return {
    events,
    loading,
    error,
    addEvent,
    deleteData,
  };
};
