const LanguageSelector = ({ LANGUAGE, setLANGUAGE  }) => (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ hướng dẫn</label>
      <select
        value={LANGUAGE}
        onChange={(e) => setLANGUAGE(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>
    </div>
  );
  
  export default LanguageSelector;
  