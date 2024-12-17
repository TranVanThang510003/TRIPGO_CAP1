// **Year Selection Component**
import MonthSelection from "./MonthSelection.jsx";

const YearSelection = ({ years, selectedYear, onYearChange }) => (
    <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Chọn năm:</label>
        <select
            value={selectedYear || ""}
            onChange={(e) => onYearChange(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Tất cả các năm</option>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    </div>
);
export default YearSelection;