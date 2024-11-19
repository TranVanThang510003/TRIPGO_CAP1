
const HeaderDashboard = () => {
  return (
    <header className="header flex items-center p-4 bg-gray-100">
      <div className="user-info flex items-center">
        <img
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col ml-3">
          <span className="text-base font-medium">Adam Joe</span>
          <span className="text-xs font-normal text-gray-500">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
