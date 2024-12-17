// **Week Selection Component**
import MonthSelection from "./MonthSelection.jsx";

const WeekSelection = ({ weeks, selectedWeek, onWeekChange }) => (
    <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Chọn tuần:</label>
        <select
            value={selectedWeek || ""}
            onChange={(e) => onWeekChange(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Tất cả các tuần</option>
            {weeks.map((week) => (
                <option key={week} value={`Tuần ${week}`}>
                    Tuần {week}
                </option>
            ))}
        </select>
    </div>
);
export default WeekSelection;