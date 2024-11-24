import axios from 'axios';
import { useState } from 'react';

const useFetchTourDetails = (
  tourId,
  setPUCLIC_TOUR_NAME,
  setDESCRIPIONS_HIGHLIGHT,
  setPUCLIC_TOUR_TYPE,
  setDESCRIPTIONS,
  setLANGUAGE,
  setSchedules,
  setIMAGE,
  provinces
) => {
  const fetchTourDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/public-tours/${tourId}`
      );
      const tour = response.data.tour;

      setPUCLIC_TOUR_NAME(tour.name || '');
      setDESCRIPIONS_HIGHLIGHT(tour.highlights || '');
      setDESCRIPTIONS(tour.description || '');
      setPUCLIC_TOUR_TYPE(tour.tourTypeId || '');
      setLANGUAGE(tour.language || 'vi');
      setSchedules(Array.isArray(tour.schedules) ? tour.schedules : []);
      setIMAGE(tour.images || []);
    } catch (error) {
      console.error('Error fetching tour details:', error);
    }
  };

  return { fetchTourDetails };
};

export default useFetchTourDetails;
