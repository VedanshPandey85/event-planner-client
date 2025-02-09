import React from "react";
import EventForm from "./componets/EventForm";
import EventList from "./componets/EventList";
import AlertBanner from "./componets/AlertBanner";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 text-indigo-900">
            Weather-Based Event Planner
          </h1>
          <p className="text-center text-slate-600 mb-12 text-lg">
            Plan your events with confidence using real-time weather insights
          </p>

          {/* <AlertBanner message="Weather alert: Rain expected for your event!" /> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
                Create New Event
              </h2>
              <EventForm />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-6">
                Upcoming Events
              </h2>
              <EventList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
