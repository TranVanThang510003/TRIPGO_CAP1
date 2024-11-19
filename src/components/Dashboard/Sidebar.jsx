const Sidebar = () => {
  return (
    <div className="w-64 h-[500px] bg-blue-500 text-white flex flex-col p-4">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4 hover:bg-blue-700 p-2 rounded">Chi Tiết</li>
         
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
