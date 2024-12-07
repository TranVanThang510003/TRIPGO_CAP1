import { useState } from 'react';

const ServiceAndPolicyForm = () => {
    const [services, setServices] = useState([]);
    const [cancellationPolicy, setCancellationPolicy] = useState('');
    const [mealPlan, setMealPlan] = useState('');
    const [allServices] = useState([
        'Bữa sáng',
        'Dịch vụ giặt ủi',
        'Dịch vụ đưa đón sân bay',
        'Spa & Massage',
        'Wi-Fi miễn phí',
    ]);

    const allMealPlans = [
        'Bữa sáng miễn phí',
        'Bữa sáng và bữa trưa',
        'Bữa sáng, bữa trưa và bữa tối',
        'Không bao gồm bữa ăn'
    ];

    const handleServiceChange = (event) => {
        const service = event.target.value;
        setServices((prevServices) =>
            prevServices.includes(service)
                ? prevServices.filter((s) => s !== service)
                : [...prevServices, service]
        );
    };


    return (
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Chọn Dịch Vụ, Meal Plan & Chính Sách Hủy Phòng</h3>

            {/* Phần chọn dịch vụ */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn dịch vụ</label>
                <div className="flex flex-wrap gap-2 mb-3">
                    {allServices.map((service, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                value={service}
                                onChange={handleServiceChange}
                                checked={services.includes(service)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">{service}</label>
                        </div>
                    ))}
                </div>
            </div>

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
                </div>
            </div>


        </div>
    );
};

export default ServiceAndPolicyForm;
