import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { HexColorPicker } from "react-colorful";
import {
  createCategoryAsync,
  createColorAsync,
  createFabricAsync,
  deleteCategoryAsync,
  deleteColorAsync,
  deleteFabricAsync,
  getAllCategoriesAsync,
  getAllColorsAsync,
  getAllFabricsAsync,
  updateCategoryAsync,
  updateColorAsync,
  updateFabricAsync,
} from "../features/ProductDetailsSlice(S,F,C)";
import Loader from "react-loaders";
import DeleteModal from "./DeleteModal";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModalOpen] = useState(false);
  const [updateModal, setUpdateModalOpen] = useState(false);
  const [tab, setSelectedTab] = useState("Categories");
  const [color, setColor] = useState("#b32aa9");
  const [Id, setId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (tab === "Categories") {
      dispatch(getAllCategoriesAsync());
    }
  }, [dispatch, tab]);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    setFormData({ name: "" });
  };

  const handleTabClick = (item) => {
    setSelectedTab(item);
    switch (true) {
      case item === "Categories":
        dispatch(getAllCategoriesAsync());
        break;

      case item === "Fabrics":
        dispatch(getAllFabricsAsync());
        break;

      case item === "Colors":
        dispatch(getAllColorsAsync());
        break;

      default:
        break;
    }
  };

  const tabDataHeadings = ["Categories", "Colors", "Fabrics"];

  const { tabData, loading, createLoading, deleteLoading } = useSelector(
    (state) => state.ProductDetails
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = formData.name;
    const colorData = {
      label: formData.name,
      value: color,
    };

    let action;
    switch (true) {
      case tab === "Categories":
        action = createCategoryAsync({ name });
        break;

      case tab === "Fabrics":
        action = createFabricAsync({ name });
        break;

      case tab === "Colors":
        action = createColorAsync(colorData);
        break;

      default:
        return;
    }

    dispatch(action).then((res) => {
      if (res.payload?.success) {
        closeModal();
      }
    });
  };

  const deleteModalOpen = (id) => {
    document.body.style.overflow = "hidden";
    setId(id);
    setDeleteModalOpen(true);
  };

  const deleteModalClose = () => {
    document.body.style.overflow = "auto";
    setDeleteModalOpen(false);
    setId("");
  };

  const handleDelete = async () => {
    let action;
    switch (true) {
      case tab === "Categories":
        action = deleteCategoryAsync({ id: Id });
        break;

      case tab === "Fabrics":
        action = deleteFabricAsync({ id: Id });
        break;

      case tab === "Colors":
        action = deleteColorAsync({ id: Id });
        break;

      default:
        return;
    }

    dispatch(action).then((res) => {
      if (res.payload?.success) {
        deleteModalClose();
      }
    });
  };

  const updateModalOpen = (data) => {
    document.body.style.overflow = "hidden";
    setId(data.id);
    setFormData({
      ...formData,
      name: data.name || data.label,
      value: data.value || "",
    });
    setUpdateModalOpen(true);
  };

  const updateModalClose = () => {
    document.body.style.overflow = "auto";
    setUpdateModalOpen(false);
    setId("");
    setFormData({
      name: "",
      value: "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { name: formData.name, id: Id };
    const colorData = {
      label: formData.name,
      value: formData.value,
      id: Id,
    };

    let action;
    switch (true) {
      case tab === "Categories":
        action = updateCategoryAsync(data);
        break;

      case tab === "Fabrics":
        action = updateFabricAsync(data);
        break;

      case tab === "Colors":
        action = updateColorAsync(colorData);
        break;

      default:
        return;
    }

    dispatch(action).then((res) => {
      if (res.payload?.success) {
        updateModalClose();
      }
    });
  };

  return (
    <>
      <>
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 mt-7 mb-0 mx-6 px-5 py-6 min-h-[70vh] rounded-lg">
          {/* -------------- HEADER -------------- */}

          {/* -------------- TABS -------------- */}
          <div className="tabs flex justify-between items-center my-3">
            <div className="tabs_button">
              {tabDataHeadings?.map((item) => (
                <button
                  key={item}
                  className={`px-5 py-2 mx-2 text-sm font-bold rounded-md ${
                    tab === item
                      ? "dark:bg-white bg-[#DEC344] dark:text-black text-white"
                      : ""
                  }`}
                  onClick={() => handleTabClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div>
              <IoMdAdd
                onClick={openModal}
                size={24}
                className="text-black cursor-pointer"
              />
            </div>
          </div>

          {/* -------------- TABLE -------------- */}

          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Loader type="ball-beat" active={true} />
            </div>
          ) : (
            <div className="relative overflow-x-auto mt-5 ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700  bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-6 py-3" scope="col">
                      Sr#
                    </th>

                    <th className="px-6 py-3" scope="col">
                      Name
                    </th>

                    <th
                      className="px-6 py-3 text-center font-medium"
                      scope="col"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tabData?.length > 0 ? (
                    tabData?.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          {item?.name || item?.label}
                          {tab === "Colors" && (
                            <span
                              className="value mx-3"
                              style={{ borderLeftColor: item.value }}
                            >
                              Color code is {item.value}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 flex items-center justify-center gap-3">
                          <MdModeEdit
                            onClick={() => updateModalOpen(item)}
                            size={20}
                            className="cursor-pointer text-blue-500"
                          />
                          <MdDeleteOutline
                            size={20}
                            className="cursor-pointer text-red-500"
                            onClick={() => deleteModalOpen(item.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-xl text-start">
                        No Data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </>

      {/* UPDATE MODAL */}
      {updateModal && (
        <div
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50"
        >
          <div className="relative py-4 px-3 w-full max-w-lg max-h-full bg-white rounded-md shadow dark:bg-gray-700">
            {/* ------------- HEADER ------------- */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update {tab}
              </h3>
              <button
                onClick={updateModalClose}
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* ------------- BODY ------------- */}
            <div className="p-4 md:p-5">
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      value={formData?.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-gray-300 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                    {tab === "Colors" && (
                      <div
                        className="value"
                        style={{ borderLeftColor: formData?.value }}
                      >
                        Current color is {formData?.value}
                      </div>
                    )}
                  </div>

                  {/* COLOR PICKER */}

                  {tab === "Colors" && (
                    <div>
                      <HexColorPicker
                        color={formData?.value}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            value: e,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>

                {createLoading ? (
                  <div className="w-36 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-cente">
                    <Loader type="ball-beat" active={true} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-36 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-center text-white bg-[#DEC344] rounded-lg hover:bg-[#614FC9]"
                  >
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50"
        >
          <div className="relative py-4 px-3 w-full max-w-lg max-h-full bg-white rounded-md shadow dark:bg-gray-700">
            {/* ------------- HEADER ------------- */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New {tab}
              </h3>
              <button
                onClick={closeModal}
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* ------------- BODY ------------- */}
            <div className="p-4 md:p-5">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-gray-300 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                    {tab === "Colors" && (
                      <div className="value" style={{ borderLeftColor: color }}>
                        Current color is {color}
                      </div>
                    )}
                  </div>

                  {/* COLOR PICKER */}

                  {tab === "Colors" && (
                    <div>
                      <HexColorPicker color={color} onChange={setColor} />
                    </div>
                  )}
                </div>

                {createLoading ? (
                  <div className="w-36 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-cente">
                    <Loader type="ball-beat" active={true} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-36 flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-center text-white bg-[#DEC344] rounded-lg hover:bg-[#614FC9]"
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <DeleteModal
          modalOpen={deleteModalOpen}
          closeModal={deleteModalClose}
          handleDelete={handleDelete}
          productId={Id}
          deleteLoading={deleteLoading}
        />
      )}
    </>
  );
};

export default ProductDetails;
