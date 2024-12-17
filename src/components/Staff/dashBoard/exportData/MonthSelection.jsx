// **Month Selection Component**
const MonthSelection = ({ months, selectedMonth, onMonthChange }) => (
    <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Chọn tháng:</label>
        <select
            value={selectedMonth || ""}
            onChange={(e) => onMonthChange(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">Tất cả các tháng</option>
            {months.map((month) => (
                <option key={month} value={month}>
                    {month}
                </option>
            ))}
        </select>
    </div>
);
export default MonthSelection;