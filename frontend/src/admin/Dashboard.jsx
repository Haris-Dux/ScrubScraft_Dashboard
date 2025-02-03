import { useNavigate } from "react-router-dom";
// import product from "./ProductData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersAsync } from "../features/orderSlice";
import {
  SalesStatisticsAsync,
  getOrderCountsByMonthsAsync,
  getOrderProgressAsync,
  monthlyOrdersAsync,
} from "../features/DashBoardSlice";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.product.isLoading);
  const salesData = useSelector((state) => state.dashboard.SalesStatistics);
  const ordersData = useSelector((state) => state.dashboard.monthlyOrders);
  const orderProgress = useSelector((state) => state.dashboard.OrderProgress);
  const monthlyOrdersData = useSelector(
    (state) => state.dashboard.OrdersByMonth
  );
  const orders = useSelector((state) => state.order.orders);

  const page = 1;
  const status = "Pending";

  useEffect(() => {
    dispatch(getAllOrdersAsync({ status, page }));
  }, [dispatch, status, page]);

  useEffect(() => {
    dispatch(SalesStatisticsAsync());
    dispatch(monthlyOrdersAsync());
    dispatch(getOrderProgressAsync());
    dispatch(getOrderCountsByMonthsAsync());
  }, []);

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );

  const chartData = {
    labels: ["Pending", "Delivered", "Dispatched", "Cancelled"],
    datasets: [
      {
        label: "%",
        data: [
          orderProgress?.Pending || 0,
          orderProgress?.Delivered || 0,
          orderProgress?.Dispatched || 0,
          orderProgress?.Cancelled || 0,
        ],
        backgroundColor: [
          "rgb(205, 120, 3)",
          "rgb(74, 165, 123)",
          "rgb(63, 131, 248)",
          "rgb(242, 82, 82)",
        ],
        borderColor: [
          "rgb(205, 120, 3)",
          "rgb(74, 165, 123)",
          "rgb(63, 131, 248)",
          "rgb(242, 82, 82)",
        ],
        borderWidth: 1,
        borderRadius: 5,
        spacing: 5,
        cutout: 0,
      },
    ],
  };

  const barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Orders",
        data: monthlyOrdersData ? Object.values(monthlyOrdersData) : [],
        backgroundColor: "rgb(222, 195, 68)",
        borderColor: "rgb(97, 79, 201)",
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  };

  const handleOrderPage = () => {
    navigate(`/admin/view_orders`);
    window.scroll(0, 0);
  };

  const handleOrderDetails = (id) => {
    navigate(`/admin/orderDetail/${id}`);
    window.scroll(0, 0);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex justify-center items-center min-h-screen">
            <Loader type="ball-beat" active={true} />
          </div>
        </>
      ) : (
        <>
          <section className="bg-[#E5E5E5] dark:bg-gray-900 min-h-screen py-8 sm:py-10 mx-auto max-w-screen-xl px-4 lg:px-10">
            {/* ------------ FIRST STATS BAR ------------*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-4">
              {/* FIRST BOX */}
              <div className="px-5 h-36 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex justify-between items-center">
                <div className="img">
                  <img
                    className="w-20"
                    src="../../public/Dollar Bag.png"
                    alt=""
                  />
                </div>

                <div className="stat_data">
                  <h3 className="text-gray-900 dark:text-gray-100 mt-1.5 text-md font-normal">
                    Total Sales
                  </h3>
                  <h2 className="text-gray-900 dark:text-gray-100 mt-1.5 text-2xl font-semibold">
                    {salesData?.totalSales}
                  </h2>
                  <p className="text-gray-900 mt-1.5 bg-[#DEC344] text-sm px-3 py-1 w-16 rounded-lg">
                    {salesData?.salesDifference}
                  </p>
                </div>
              </div>
              {/* SECOND BOX */}
              <div className="px-5 h-36 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex justify-between items-center">
                <div className="img">
                  <img
                    className="w-20"
                    src="../../public/Dollar Bag.png"
                    alt=""
                  />
                </div>

                <div className="stat_data">
                  <h3 className="text-gray-900 dark:text-gray-100 mt-1.5 text-md font-normal">
                    Last Month
                  </h3>
                  <h2 className="text-gray-900 dark:text-gray-100 mt-1.5 text-2xl font-semibold">
                    {salesData?.lastMonthSales}
                  </h2>
                </div>
              </div>
              {/* THIRD BOX */}
              <div className="px-5 h-36 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex justify-between items-center">
                <div className="img">
                  <img
                    className="w-20"
                    src="../../public/Dollar Bag.png"
                    alt=""
                  />
                </div>

                <div className="stat_data">
                  <h3 className="text-gray-900 dark:text-gray-100 mt-1.5 text-md font-normal">
                    This Month
                  </h3>
                  <h2 className="text-gray-900 dark:text-gray-100 mt-1.5 text-2xl font-semibold">
                    {salesData?.currentMonthSales}
                  </h2>
                </div>
              </div>
              {/* FORTH BOX */}
              <div className="px-5 h-36 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex justify-between items-center">
                <div className="img">
                  <img
                    className="w-20"
                    src="../../public/Shopping Bag.png"
                    alt=""
                  />
                </div>

                <div className="stat_data">
                  <h3 className="text-gray-900 dark:text-gray-100 mt-1.5 text-md font-normal">
                    Orders
                  </h3>
                  <h2 className="text-gray-900 dark:text-gray-100 mt-1.5 text-2xl font-semibold">
                    {ordersData?.TotalOrders}
                  </h2>
                  <p className="text-gray-900 mt-1.5 bg-[#DEC344] text-sm px-3 py-1 w-16 rounded-lg">
                    +{ordersData?.currentMonthOrders}
                  </p>
                </div>
              </div>
            </div>

            {/* ------------ SECOND STATS BAR ------------*/}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4">
              <div className="rounded-lg md:col-span-1 lg:col-span-4 xl:col-span-3">
                <div className="h-72 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 w-full p-4">
                  <Bar
                    data={barChartData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>

              <div className=" pt-5 lg:col-span-5 xl:col-span-1  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-400 dark:border-gray-700">
                <div>
                  <Doughnut data={chartData} options={{ responsive: true }} />
                </div>
              </div>
            </div>

            {/* TABLES */}
            <div className="mt-12 overflow-x-auto ">
              <div className=" header">
                <h2 className="playfair mb-3 text-2xl dark:text-gray-100 font-semibold uppercase tracking-wider">
                  Recent Orders
                </h2>
              </div>

              <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-100 tracking-wide border-b border-gray-400">
                  <tr>
                    <th className="px-5 py-4" scope="col">
                      Sr
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Order ID
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Date
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Phone
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Amount
                    </th>
                    <th className="px-7 py-4" scope="col">
                      Order Progress
                    </th>
                    <th className="px-7 py-4" scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-gray-50 dark:bg-gray-800">
                  {orders?.orders?.slice(0, 10).map((data, index) => (
                    <tr
                      key={index}
                      onClick={() => handleOrderDetails(data?.id)}
                      className="border-b dark:border-gray-700 cursor-pointer"
                    >
                      <th
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        scope="row"
                      >
                        {index + 1}
                      </th>
                      <td className="px-7 py-4">{data.OrderID}</td>
                      <td className="px-7 py-4">
                        {new Date(data?.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-7 py-4">{data.phone}</td>
                      <td className="px-7 py-4">{data.totalAmount}</td>
                      <td className="px-7 py-4 text-[#BB6D00]">
                        {data.orderProgress}
                      </td>
                      <td className="px-7 py-4 flex items-center justify-end"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AllProducts;
