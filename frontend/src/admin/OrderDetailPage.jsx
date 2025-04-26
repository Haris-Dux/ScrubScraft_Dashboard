import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { getOrderByIdsync, updateOrdersAsync } from "../features/orderSlice";
import { IoEye } from "react-icons/io5";

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderByIdsync(id));
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [status, setSelectedStatus] = useState("");

  const dropdownRef = useRef(null);
  const selectedOrder = useSelector((state) => state.order.singleOrder);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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

  const handleMoveBack = () => {
    navigate(`/admin/view_orders`);
    window.scroll(0, 0);
  };
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    handleUpdateStatus(status);
  };
  const handleUpdateStatus = (status) => {
    const orderProgress = status;
    dispatch(updateOrdersAsync({ id, orderProgress }));
    setIsOpen(false);
  };

  const [customSizeModal, setCustomSizeModal] = useState(false);
  const [customSizeData, setCustomSizeData] = useState(null);

  const viewCustomSizeData = (data) => {
    setCustomSizeModal(true);
    setCustomSizeData(data);
  };

  const closeCustomSizeDataModal = () => {
    setCustomSizeModal(false);
    setCustomSizeData(null);
  };

  return (
    <>
      {selectedOrder &&
        selectedOrder?.map((data, index) => (
          <div
            key={index}
            className="bg-[#E5E5E5] dark:bg-gray-900 py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto min-h-screen"
          >
            <div className="flex justify-between item-start space-y-2 flex-col xl:flex-row">
              <div className="order_data flex gap-x-8">
                <div className="data">
                  <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Order #{data?.OrderID}
                  </h1>
                  <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                    Date : {new Date(data?.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div ref={dropdownRef} className="relative">
                  <button
                    className="w-full md:w-auto flex items-center justify-center py-2.5 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    id="filterDropdownButton"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    {status.length > 0 ? `${status}` : `${data.orderProgress}`}

                    <IoIosArrowDown
                      size={18}
                      className={`ml-2 transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
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
                        <li
                          onClick={() => handleStatusSelect("Pending")}
                          className="px-3 py-2.5 flex items-center text-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer"
                        >
                          Pending
                        </li>
                        <li
                          onClick={() => handleStatusSelect("Dispatched")}
                          className="px-3 py-2.5 flex items-center text-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer"
                        >
                          Dispatched
                        </li>
                        <li
                          onClick={() => handleStatusSelect("Delivered")}
                          className="px-3 py-2.5 flex items-center text-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer"
                        >
                          Delivered
                        </li>
                        <li
                          onClick={() => handleStatusSelect("Cancelled")}
                          className="px-3 py-2.5 flex items-center text-gray-900 dark:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer"
                        >
                          Cancelled
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* BACK TO ORDER PAGE BUTTON */}
              <div className="button">
                <button
                  onClick={handleMoveBack}
                  className="px-6 py-2 flex items-center gap-2 rounded-lg text-gray-800 dark:text-gray-300 hover:underline hover:underline-offset-4"
                >
                  <ChevronLeft size={20} /> Back
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-1 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-1 md:space-y-6 xl:space-y-8">
                {/* PRODUCTS BOX */}
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Customer’s Cart
                  </p>

                  {/* PRODUCTS 1 */}
                  {data?.items.map((items, i) => (
                    <div
                      key={i}
                      className="mt-4 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          alt="dress"
                          className="w-full hidden md:block"
                          src={items?.images?.primary?.downloadURL}
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-6 space-y-1 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-2">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            {items.name}
                          </h3>
                          <div className="flex justify-start items-start flex-col gap-1">
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 font-semibold text-gray-800">
                                Category:{" "}
                              </span>{" "}
                              {items.category}
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 font-semibold text-gray-800">
                                Product Code:{" "}
                              </span>{" "}
                              {items.product_code}
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 font-semibold text-gray-800">
                                Fabric:{" "}
                              </span>{" "}
                              {items.fabric_type}
                            </p>
                            {items.sizes && (
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 font-semibold text-gray-800">
                                  Size:{" "}
                                </span>{" "}
                                {items.sizes}
                              </p>
                            )}
                            {items.custom_size && (
                              <p className="text-sm dark:text-white flex items-center gap-1 justify-center leading-none text-gray-800">
                                <span className="dark:text-gray-400 font-semibold text-gray-800">
                                  Custom Size:{" "}
                                </span>{" "}
                                <IoEye
                                  onClick={() =>
                                    viewCustomSizeData(items.custom_size)
                                  }
                                  size={14}
                                  className="cursor-pointer"
                                />
                              </p>
                            )}
                            {items.cap && (
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 font-semibold text-gray-800">
                                  Cap:{" "}
                                </span>{" "}
                                Yes
                              </p>
                            )}
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 font-semibold text-gray-800">
                                Color:{" "}
                              </span>{" "}
                              {items.color}
                            </p>
                            {items?.name_engraving && (
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 font-semibold text-gray-800">
                                  Name Engraving:{" "}
                                </span>{" "}
                                {items?.name_engraving?.name} ({" "}
                                {items?.name_engraving?.position} )
                              </p>
                            )}
                            
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 font-semibold text-gray-800">
                                  Trouser Option:{" "}
                                </span>{" "}
                                {items?.trouserOptions ? items?.trouserOptions : "--"}
                              </p>
                            
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          {items?.sale_price ? (
                            <p className="text-base dark:text-white xl:text-lg leading-6">
                              Rs. {items?.sale_price}{" "}
                              <p className="text-red-300  line-through">
                                {" "}
                                Rs. {items?.price}
                              </p>
                            </p>
                          ) : (
                            <p className="text-base dark:text-white xl:text-lg leading-6">
                              Rs. {items?.price}{" "}
                            </p>
                          )}
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            {items?.quantity}
                          </p>

                          {items?.sale_price ? (
                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                              Rs. {items?.quantity * items?.sale_price}
                            </p>
                          ) : (
                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                              Rs. {items?.quantity * items?.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ORDER SUMMARY */}
                <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-1 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Summary
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-1 flex-col border-gray-200 border-b pb-4">
                      <div className="flex justify-between w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Subtotal
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          Rs. {data?.totalAmount}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                        Total
                      </p>
                      <p className="text-basedata?.delivery_instruction  dark:text-gray-300 font-semibold leading-4 text-gray-600">
                        Rs. {data?.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CUSTOMER DETAILS */}
              <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-4 md:p-4 xl:p-6 flex-col">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Customer Details
                </h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center w-full md:justify-start items-center space-x-2 py-4">
                      <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                        Name:
                      </p>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                          {data?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-1">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Phone Number
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {data?.phone}
                      </p>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-1 mt-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Email
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {data?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full items-stretch w-full flex-col ">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-1space-y-4  md:flex-row items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-1 mt-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {data?.address}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-1 mt-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          City
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {data?.city}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-1 mt-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Area
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {data?.area}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-1 mt-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Province
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {data?.province}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-1 mt-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Postal Code
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {data?.postal_code}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-1 mt-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Delivery Instruction
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {data?.delivery_instruction ? data?.delivery_instruction : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      {customSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button
              onClick={closeCustomSizeDataModal}
              className="absolute top-3 right-3 text-gray-800 p-2 rounded-full"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Custom Size Details</h2>
            <div className="flex gap-4">

              <div>
                <p className="text-gray-700 font-bold">Shirt Length:- {customSizeData.shirtLength}</p>
                <p className="text-gray-700 font-bold">Chest:- {customSizeData.chest}</p>
                <p className="text-gray-700 font-bold">Shoulder:- {customSizeData.shoulder}</p>
                <p className="text-gray-700 font-bold">Sleeve Length:- {customSizeData.sleeveLength}</p>
                <p className="text-gray-700 font-bold">Trouser Waist:- {customSizeData.trouserWaist}</p>
                <p className="text-gray-700 font-bold">Trouser Length:- {customSizeData.trouserLength}</p>
                <p className="text-gray-700 font-bold">Note:- {customSizeData.otherNote}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailPage;
