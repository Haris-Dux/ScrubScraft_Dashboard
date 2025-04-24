import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAllOrdersAsync } from "../features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loaders";

const ViewOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const status = searchParams.get("status") || "All";

  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.isLoading);

  useEffect(() => {
    dispatch(getAllOrdersAsync({ status, page }));
  }, [dispatch, status, page]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOrderDetails = (id) => {
    navigate(`/admin/orderDetail/${id}`);
    window.scroll(0, 0);
  };

  const renderPaginationLinks = () => {
    const totalPages = orders?.totalPages;
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <li key={i}>
          <Link
            to={`/admin/view_orders?status=${status}&page=${i}`}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 ${
              i === page ? "bg-gray-600 text-white " : "hover:bg-gray-100"
            }`}
            onClick={() => dispatch(getAllOrdersAsync({ status, page: i }))}
          >
            {i}
          </Link>
        </li>
      );
    }
    return paginationLinks;
  };

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        dispatch(getAllOrdersAsync({ status: "All", search: searchQuery }));
      }, 500);
      return () => clearTimeout(timer);
    } else if (searchQuery !== undefined && searchQuery !== null) {
      dispatch(getAllOrdersAsync({ status, page }));
    }
  }, [dispatch, page, status, searchQuery]);

  const statusData = ["All", "Pending", "Delivered", "Dispatched", "Cancelled"];

  const handleStatusChange = (status) => {
    navigate(`/admin/view_orders?status=${status}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Delivered":
        return "text-green-500";
      case "Dispatched":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <>
      <section className="bg-[#E5E5E5] dark:bg-gray-900 min-h-screen py-8 sm:py-10">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-10">
          <>
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label className="sr-only" htmlFor="simple-search">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            fillRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        id="simple-search"
                        placeholder="search order Id"
                        type="search"
                        defaultValue={searchQuery}
                        onChange={handleSearch}
                      />
                    </div>
                  </form>
                </div>

                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  {/* DROPDOWN */}
                  <div ref={dropdownRef} className="relative">
                    <button
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      id="filterDropdownButton"
                      type="button"
                      onClick={toggleDropdown}
                    >
                      Sort By Status
                      <svg
                        aria-hidden="true"
                        className={`-mr-1 ml-1.5 w-5 h-5 transform ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div
                        className="absolute right-0 mt-3 w-48 py-3 bg-white rounded-lg shadow-lg dark:bg-gray-700"
                        id="filterDropdown"
                      >
                        <ul
                          aria-labelledby="filterDropdownButton"
                          className="text-sm"
                        >
                          {statusData.map((item) => (
                            <li
                              li
                              key={item}
                              value={item}
                              onClick={() => handleStatusChange(item)}
                              className="px-3 py-2.5 flex items-center text-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                  <Loader type="ball-beat" active={true} />
                </div>
              ) : (
                <>
                  {/* TABLES */}
                  <div className="overflow-x-auto min-h-screen">
                    <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-400">
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
                          
                        </tr>
                      </thead>
                      {orders?.orders?.length > 0 ? (
                        <tbody>
                          {orders?.orders?.map((data, index) => (
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
                              <td
                                className={`px-7 py-4 text-md font-medium ${getStatusColor(
                                  data?.orderProgress
                                )}`}
                              >
                                {data.orderProgress}
                              </td>
                             
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="7" className="text-center py-4">
                              <div className="playfair text-xl font-medium uppercase">
                                No Orders
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </>
              )}
            </div>

            {/* PAGINATION */}

            <div className="flex justify-center">
              <nav aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-8 py-10 text-sm">
                  <li>
                    {orders?.page > 1 ? (
                      <Link
                        to={`/admin/view_orders?status=${status}&page=${
                          page - 1
                        }`}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <button
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg cursor-not-allowed"
                        disabled
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                      </button>
                    )}
                  </li>
                  {renderPaginationLinks()}
                  <li>
                    {orders?.totalPages !== page ? (
                      <Link
                        to={`/admin/view_orders?status=${status}&page=${
                          page + 1
                        }`}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <button
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg cursor-not-allowed"
                        disabled
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </button>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </>
        </div>
      </section>
    </>
  );
};

export default ViewOrders;
