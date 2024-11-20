/* eslint-disable react/prop-types */
import ErrorMessage from "./ErrorMessage";
const TourDetails = ({
    tourTypes,
    PUCLIC_TOUR_NAME,
    setPUCLIC_TOUR_NAME,
    PUCLIC_TOUR_TYPE,
    setPUCLIC_TOUR_TYPE,
    DESCRIPIONS_HIGHLIGHT,
    setDESCRIPIONS_HIGHLIGHT,
    DESCRIPTIONS,
    setDESCRIPTIONS,
    errors,
  }) => (
    <div className="grid grid-cols-2 gap-6">
      {/* Tour Name */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tên tour</label>
        <input
          type="text"
          value={PUCLIC_TOUR_NAME}
          onChange={(e) => setPUCLIC_TOUR_NAME(e.target.value)}
          placeholder="Tên tour"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <ErrorMessage message={errors.PUCLIC_TOUR_NAME} />
      </div>
  
      {/* Tour Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Loại tour</label>
        <select
          value={PUCLIC_TOUR_TYPE}
          onChange={(e) => setPUCLIC_TOUR_TYPE(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Chọn loại tour</option>
          {tourTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.PUCLIC_TOUR_NAME} />
      </div>
  
      {/* Tour Highlights */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Điểm nổi bật</label>
        <textarea
          value={DESCRIPIONS_HIGHLIGHT}
          onChange={(e) => setDESCRIPIONS_HIGHLIGHT(e.target.value)}
          placeholder="Điểm nổi bật"
          className="w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
        <ErrorMessage message={errors.DESCRIPIONS_HIGHLIGHT} />
      </div>
  
      {/* Tour Description */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
        <textarea
          value={DESCRIPTIONS}
          onChange={(e) => setDESCRIPTIONS(e.target.value)}
          placeholder="Mô tả chi tiết thông tin tour"
          className="w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
        <ErrorMessage message={errors.PUCLIC_TOUR_NAME} />
      </div>
    </div>
  );
  
  export default TourDetails;
  