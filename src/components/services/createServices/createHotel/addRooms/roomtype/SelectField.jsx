const SelectField = ({ label, value, onChange, options }) => (
    <div className="w-full sm:w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        >
            {options.map(option => (
                <option key={option} value={option}>{option || "Chọn loại giường"}</option>
            ))}
        </select>
    </div>
);

export default SelectField;
