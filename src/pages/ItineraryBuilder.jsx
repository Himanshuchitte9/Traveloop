import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import PageHeader from '../components/shared/PageHeader';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';
import EmptyState from '../components/shared/EmptyState';
import StopCard from '../components/itinerary/StopCard';
import StopForm from '../components/itinerary/StopForm';
import AddActivityModal from '../components/itinerary/AddActivityModal';
import { useItinerary } from '../hooks/useItinerary';
import { useTrips } from '../hooks/useTrips';

export default function ItineraryBuilder() {
  const { tripId } = useParams();
  const { trips } = useTrips();
  const { stops, loading, handleReorder, handleAddStop, handleUpdateStop, handleDeleteStop, handleAddActivity, handleDeleteActivity } = useItinerary(tripId);

  const [tripName, setTripName] = useState('Loading...');
  const [isStopFormOpen, setIsStopFormOpen] = useState(false);
  const [isActivityFormOpen, setIsActivityFormOpen] = useState(false);
  const [editingStop, setEditingStop] = useState(null);
  const [activeStopId, setActiveStopId] = useState(null);

  useEffect(() => {
    if (trips && trips.length > 0) {
      const trip = trips.find(t => t.id === tripId);
      if (trip) setTripName(trip.name);
    }
  }, [trips, tripId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = stops.findIndex((stop) => stop.id === active.id);
      const newIndex = stops.findIndex((stop) => stop.id === over.id);
      const newOrder = arrayMove(stops, oldIndex, newIndex).map(s => s.id);
      handleReorder(newOrder);
    }
  };

  const openAddStop = () => {
    setEditingStop(null);
    setIsStopFormOpen(true);
  };

  const openEditStop = (stop) => {
    setEditingStop(stop);
    setIsStopFormOpen(true);
  };

  const openAddActivity = (stopId) => {
    setActiveStopId(stopId);
    setIsActivityFormOpen(true);
  };

  const saveStop = async (data) => {
    if (editingStop) {
      await handleUpdateStop(editingStop.id, data);
    } else {
      await handleAddStop(data);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#FAFAFA] pb-24 pt-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title={tripName}
          subtitle="Build your perfect itinerary"
          backPath="/my-trips"
          actionButton={
            <button 
              onClick={openAddStop}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Stop
            </button>
          }
        />

        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton type="card" count={3} />
          ) : stops.length === 0 ? (
            <EmptyState 
              title="No stops added yet"
              subtitle="Start building your itinerary by adding your first destination."
              actionLabel="Add First Stop"
              onAction={openAddStop}
            />
          ) : (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={stops.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {stops.map((stop, index) => (
                  <StopCard 
                    key={stop.id} 
                    stop={stop} 
                    index={index}
                    onAddActivity={openAddActivity}
                    onEdit={openEditStop}
                    onDelete={handleDeleteStop}
                    onDeleteActivity={handleDeleteActivity}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      <StopForm 
        isOpen={isStopFormOpen}
        onClose={() => setIsStopFormOpen(false)}
        stop={editingStop}
        onSave={saveStop}
      />

      <AddActivityModal 
        isOpen={isActivityFormOpen}
        onClose={() => setIsActivityFormOpen(false)}
        stopId={activeStopId}
        onSave={handleAddActivity}
      />
    </motion.div>
  );
}
