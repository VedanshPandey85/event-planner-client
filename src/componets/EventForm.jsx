import React, { useState } from "react";
import { createEvent } from "../services/eventService";
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  Type,
  FileText,
  Sparkles,
} from "lucide-react";

function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(formData);
    alert("Event created successfully!");
    setFormData({
      title: "",
      location: "",
      date: "",
      time: "",
      description: "",
      email: "",
    });
  };

  const InputWrapper = ({ label, children, icon: Icon }) => (
    <div className="relative group">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 group-focus-within:text-indigo-600 transition-colors duration-200">
        <Icon className="w-4 h-4 group-focus-within:text-indigo-600 transition-colors duration-200" />
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Create New Event</h2>
        </div>
        <p className="text-indigo-100 text-sm">
          Fill in the details to create your amazing event
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <InputWrapper label="Event Title" icon={Type}>
          <input
            type="text"
            placeholder="Enter a memorable title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-indigo-300"
            required
          />
        </InputWrapper>

        <InputWrapper label="Location" icon={MapPin}>
          <input
            type="text"
            placeholder="Where will it take place?"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-indigo-300"
            required
          />
        </InputWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWrapper label="Date" icon={Calendar}>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
              required
            />
          </InputWrapper>

          <InputWrapper label="Time" icon={Clock}>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
              required
            />
          </InputWrapper>
        </div>

        <InputWrapper label="Description" icon={FileText}>
          <textarea
            placeholder="What should attendees know about this event?"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-indigo-300"
            rows="4"
            required
          />
        </InputWrapper>

        <InputWrapper label="Your Email" icon={Mail}>
          <input
            type="email"
            placeholder="Where can we reach you?"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-indigo-300"
            required
          />
        </InputWrapper>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Create Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;
