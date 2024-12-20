import ErrorMessage from "./ErrorMessage.jsx";


const ServiceAndPolicyForm = ({
    cancellationPolicy,
    setCancellationPolicy,
    mealPlan,
    setMealPlan,
    allMealPlans,
    errors}) => {


    return (
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Chọn Dịch Vụ, Meal Plan & Chính Sách Hủy Phòng</h3>



            {/* Phần chọn chính sách hủy phòng */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chính sách hủy phòng</label>
                <div className="flex flex-wrap gap-2 mb-3">
                    <select
                        value={cancellationPolicy}
                        onChange={(e) => setCancellationPolicy(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="">Chọn chính sách hủy</option>
                        <option value="Miễn phí trước 24h">Miễn phí trước 24h</option>
                        <option value="Có phí trước 24h">Có phí trước 24h</option>
                        <option value="Không hoàn lại">Không hoàn lại</option>
                    </select>
                    <ErrorMessage message={errors.cancellationPolicy} />
                </div>
            </div>

            {/* Phần chọn meal plan */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn Meal Plan</label>
                <div className="flex flex-wrap gap-2 mb-3">
                    <select
                        value={mealPlan}
                        onChange={(e) => setMealPlan(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="">Chọn meal plan</option>
                        {allMealPlans.map((plan, index) => (
                            <option key={index} value={plan}>{plan}</option>
                        ))}
                    </select>
                    <ErrorMessage message={errors.mealPlan} />
                </div>
            </div>


        </div>
    );
};

export default ServiceAndPolicyForm;
