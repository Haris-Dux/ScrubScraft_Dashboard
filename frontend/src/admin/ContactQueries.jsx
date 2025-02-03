import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQueriesAsync } from "../features/contactSlice";
import Loader from "react-loaders";

const ContactQueries = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);

  // GETTING QUERIES
  const { queries, isLoading } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getAllQueriesAsync());
  }, []);

  const handleMsgShow = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuery(null);
    document.body.style.overflow = 'auto';

  };

  return (
    <>
      <section className="bg-gray-200 dark:bg-gray-900 p-3 sm:p-5 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-3">
          <div className="bg-white dark:bg-gray-800 relative shadow-md overflow-hidden">
            <h2 className="p-6 text-2xl font-semibold text-gray-700 dark:text-gray-100 tracking-wide">
              Contact Queries
            </h2>

            {/* ----------- TABLE ----------- */}
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader type="ball-beat" active={true} />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-md text-left text-gray-500 dark:text-gray-100">
                  <thead className="text-sm tracking-wide text-white uppercase bg-[#DEC344] ">
                    <tr>
                      <th className="px-4 py-4 border-r-[#DEC344]">Sr #</th>
                      <th className="px-4 py-4">Client Name</th>
                      <th className="px-4 py-4">Email</th>
                      <th className="px-4 py-4">Date</th>
                      <th className="px-4 py-4">Message</th>
                    </tr>
                  </thead>

                  <tbody>
                    {queries?.data?.map((data, index) => (
                      <tr
                        key={index}
                        onClick={() => handleMsgShow(data)}
                        className="border-b border-[#DEC344] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <th className="px-4 py-4 font-medium border-r border-[#DEC344] text-gray-900 dark:text-white">
                          {index + 1}
                        </th>
                        <td className="px-4 py-4">{data.name}</td>
                        <td className="px-4 py-4">{data.email}</td>
                        <td className="px-4 py-4">
                          {new Date(data?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4">
                          <p>
                            {data.message.length > 50
                              ? `${data.message.substring(0, 30)}...`
                              : data.message}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && selectedQuery && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            
            <p className="mt-4"><strong>Name:</strong> {selectedQuery.name}</p>
            <p className="mt-2"><strong>Email:</strong> {selectedQuery.email}</p>
            <p className="mt-2"><strong>Date:</strong> {new Date(selectedQuery?.createdAt).toLocaleDateString()}</p>
            <p className="mt-2"><strong>Message:</strong> {selectedQuery.message}</p>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactQueries;
