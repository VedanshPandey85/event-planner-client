import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent, updateEvent } from "../services/eventService";
import WeatherCard from "./WeatherCard";
import { Pencil, Trash2 } from "lucide-react";

function EventList() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((event) => event.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent({ ...event });
  };

  const handleUpdate = async () => {
    try {
      await updateEvent(editingEvent.id, editingEvent);
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id ? editingEvent : event
        )
      );
      setEditingEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      {events.map((event) => (
        <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            {editingEvent?.id === event.id ? (
              <div className="space-y-3 w-full">
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editingEvent.location}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                    className="p-2 border rounded"
                  />
                  <input
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, time: e.target.value })
                    }
                    className="p-2 border rounded"
                  />
                </div>
                <textarea
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingEvent(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-gray-600">{event.location}</p>
                  <p className="text-gray-600">
                    {event.date} at {event.time}
                  </p>
                  <p className="text-gray-600">{event.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
          <WeatherCard location={event.location} date={event.date} />
        </div>
      ))}
    </div>
  );
}

export default EventList;
