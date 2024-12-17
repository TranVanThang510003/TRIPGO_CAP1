// **Quarter Selection Component**
import MonthSelection from "./MonthSelection.jsx";

const QuarterSelection = ({ quarters, selectedQuarter, onQuarterChange }) => (
    <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Chọn quý:</label>
        <select
            value={selectedQuarter || ""}
            onChange={(e) => onQuarterChange(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Tất cả các quý</option>
            {quarters.map((quarter) => (
                <option key={quarter} value={quarter}>
                    {quarter}
                </option>
            ))}
        </select>
    </div>
);
export default QuarterSelection;