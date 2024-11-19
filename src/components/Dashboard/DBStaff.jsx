import ChartRevenue from "./ChartRevenue";
import Parameter from "./Parameter";
import Sidebar from "./Sidebar";

const DBStaff = () => {
  return (
    <div className="grid grid-cols-[1fr_5fr] h-screen bg-">
      <div className="bg-blue-500">
        <Sidebar />
      </div>
      <div>
        <div className="bg-slate-100 w-full h-[260px]">
          <Parameter />
        </div>
        <div className="mt-12">
          <h1 className="text-2xl ml-10">Doanh thu theo quỹ</h1>
          <ChartRevenue />
        </div>
      </div>
    </div>
  );
};

export default DBStaff;
