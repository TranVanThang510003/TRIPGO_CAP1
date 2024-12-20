import ErrorMessage from "../../ErrorMessage.jsx";

const InputField = ({ label, value, onChange, type = "text", errorMessage, autoFocus = false }) => (
    <div className="w-full sm:w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            autoFocus={autoFocus}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring 
                ${errorMessage ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-200"}`}
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
);

export default InputField;
