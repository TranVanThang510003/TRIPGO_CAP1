import MonthSelection from "./MonthSelection.jsx";

const TourSelection = ({ tours, selectedTour, onTourChange }) => (
    <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Chọn tour:</label>
        <select
            value={selectedTour || "all"}
            onChange={(e) => onTourChange(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="all">Tất cả các tour</option>
            {tours.map((tour) => (
                <option key={tour.tourName} value={tour.tourName}>
                    {tour.tourName}
                </option>
            ))}
        </select>
    </div>
);
export default TourSelection;