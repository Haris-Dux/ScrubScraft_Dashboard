import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import Loader from "react-loaders";
import {
  createSizePicturesAsync,
  deleteSizePicturesAsync,
  getAllPicturesAsync,
} from "../features/Pictures";
import { IoMdAdd } from "react-icons/io";

const Pictures = () => {
  const dispatch = useDispatch();
  const { picturesData, isLoading, createLoading, deleteLoading } = useSelector(
    (state) => state.pictures
  );
  const [addModal, setIsAddModal] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormdata] = useState({
    file: null,
  });

  useEffect(() => {
    dispatch(getAllPicturesAsync());
  }, []);

  const openAddModal = () => {
    setIsAddModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeAddModal = () => {
    setIsAddModal(false);
    document.body.style.overflow = "auto";
    setFormdata({ file: null });
  };

  const handleChange = (e, fieldName) => {
    if (e.target.type === "file") {
      setFormdata({
        ...formData,
        [fieldName]: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const FormData2 = new FormData();
    FormData2.append("image", formData.file);
    dispatch(createSizePicturesAsync(FormData2)).then((res) => {
      if (res.payload.success) {
        closeAddModal();
        dispatch(getAllPicturesAsync());
      }
    });
  };

  const openDeleteModal = (id) => {
    setIsDeleteModal(true);
    setSelectedId(id);
    document.body.style.overflow = "hidden";
  };

  const closeDeleteModal = () => {
    setIsDeleteModal(false);
    document.body.style.overflow = "auto";
    setSelectedId("");
  };

  const handleDelete = () => {
    dispatch(deleteSizePicturesAsync({ id: selectedId })).then((res) => {
      if (res.payload.success) {
        closeDeleteModal();
        dispatch(getAllPicturesAsync());
      }
    });
  };

  return (
    <>
      <section>
        <div className="bg-[#E5E5E5] dark:bg-gray-900 mx-auto min-h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className=" flex justify-end items-center">
            <div>
              <IoMdAdd
                onClick={openAddModal}
                size={24}
                className="text-black cursor-pointer"
              />
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Loader type="ball-beat" active={true} />
            </div>
          ) : (
            <>
              <header className="flex justify-between items-center flex-wrap"></header>

              {picturesData?.length > 0 ? (
                <>
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {picturesData?.map((data) => (
                      <li className="w-full rounded-md border">
                        <img
                          onClick={() => handleUpdate(data?.id)}
                          src={data?.image?.downloadURL}
                          alt="Laptop"
                          className="h-[300px]  w-full rounded-t-md object-conatin"
                        />

                        <div className="flex mt-1 items-center p-2 gap-2 justify-center">
                          <button
                            onClick={() => openDeleteModal(data?.id)}
                            className="flex rounded-md items-center p-2 gap-2 justify-center text-xl cursor-pointer bg-red-500 text-white"
                          >
                            Delete
                            <MdOutlineDeleteOutline size={20} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="playfair text-xl flex justify-center font-medium uppercase w-full items-center  pt-32 ">
                  No Pictures
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {/* CREATE MODAL */}
      {addModal && (
        <div
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50"
        >
          <div className="relative py-4 px-3 w-full max-w-lg max-h-full bg-white rounded-md shadow dark:bg-gray-700">
            {/* ------------- HEADER ------------- */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Size Chart
              </h3>
              <button
                onClick={closeAddModal}
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
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-x-4">
                  {/* Name */}
                  {formData?.file && (
                    <div className="flex items-center justify-center w-full">
                      <label
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#7666CFborder-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
                        htmlFor="dropzone-file"
                      >
                        <img
                          src={URL.createObjectURL(formData.file)}
                          alt="Selected"
                          className="h-full object-contain"
                        />
                      </label>
                    </div>
                  )}

                  <div className="flex items-center justify-center w-full">
                    <label
                      className="flex flex-col items-center justify-center w-36 h-28 border-2 border-[#7666CF] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      htmlFor="dropzone-file"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-2">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          fill="none"
                          viewBox="0 0 20 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-[#DEC344] dark:text-gray-400">
                          <span className="font-semibold">Upload Image</span>
                        </p>
                      </div>
                      <input
                        className="hidden"
                        id="dropzone-file"
                        type="file"
                        onChange={(e) => handleChange(e, "file")}
                      />
                    </label>
                  </div>
                </div>

                {createLoading ? (
                  <div className="mx-auto flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-cente">
                    <Loader type="ball-beat" active={true} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="mx-auto flex justify-center items-center px-5 py-2.5 mt-2 sm:mt-6 text-sm font-medium text-center text-white bg-[#DEC344] rounded-lg hover:bg-[#614FC9]"
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <DeleteModal
          modalOpen={openDeleteModal}
          closeModal={closeDeleteModal}
          handleDelete={handleDelete}
          productId={selectedId}
          deleteLoading={deleteLoading}
        />
      )}
    </>
  );
};

export default Pictures;
