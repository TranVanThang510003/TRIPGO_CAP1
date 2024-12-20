const FacilitiesList = ({ facilitiesList, facilities, onChange }) => (
    <div className="w-full sm:w-1/2 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Chọn tiện nghi</label>
        <div className="flex flex-wrap gap-2">
            {facilitiesList.map(facility => (
                <div key={facility} className="flex items-center">
                    <input
                        type="checkbox"
                        value={facility}
                        checked={facilities.includes(facility)}
                        onChange={onChange}
                        className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">{facility}</label>
                </div>
            ))}
        </div>
    </div>
);

export default FacilitiesList;
