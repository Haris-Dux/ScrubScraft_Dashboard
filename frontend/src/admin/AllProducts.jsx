import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  deleteProductAsync,
  getAllProductsAsync,
} from "../features/productSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import Loader from "react-loaders";
import { FilterDropdown } from "./filter-dropdown";
import {
  getAllCategoriesAsync,
  getAllColorsAsync,
  getAllFabricsAsync,
} from "../features/ProductDetailsSlice(S,F,C)";
import { GrPowerReset } from "react-icons/gr";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productId, setProductId] = useState("");
  const dropdownRef = useRef(null);

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

  const { products, isLoading, deleteLoading } = useSelector(
    (state) => state.product
  );

  const [searchParams] = useSearchParams();
  const page = products.page;

  const [categoryOptions, setCategories] = useState([]);
  const [colorOptions, setColorsData] = useState([]);
  const [fabricOptions, setFabricData] = useState([]);

  const [filtersData, setFiltersData] = useState({
    category: "",
    color: "",
    fabric_type: "",
    size: "",
  });

  const handleUpdate = (id) => {
    navigate(`/admin/update_product/${id}`);
    window.scroll(0, 0);
  };

  const renderPaginationLinks = () => {
    const totalPages = products?.totalPages;
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <li key={i}>
          <Link
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 ${
              i === page ? "bg-gray-700 text-white" : "bg-white"
            }`}
            onClick={() =>
              dispatch(getAllProductsAsync({ filtersData, page: i }))
            }
          >
            {i}
          </Link>
        </li>
      );
    }
    return paginationLinks;
  };

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        dispatch(getAllProductsAsync({ name: searchQuery, filtersData , page}));
      }, 1500);
      return () => clearTimeout(timer);
    } else if (searchQuery !== undefined && searchQuery !== null) {
      dispatch(getAllProductsAsync({ filtersData,page }));
    }
  }, [dispatch, searchQuery ,filtersData,page]);

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (id) => {
    setModalOpen(true);
    setProductId(id);
  };

  // HANDLE DELETE
  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id)).then((res) => {
      if (res.payload.success) {
        dispatch(deleteProduct(id));
        setModalOpen(false);
      }
    });
  };

  useEffect(() => {
    dispatch(getAllCategoriesAsync()).then((res) => {
      if (res?.payload) {
        setCategories(res.payload.map((item) => item.name));
      }
    });

    dispatch(getAllColorsAsync()).then((res) => {
      if (res?.payload) {
        setColorsData(res.payload.map((item) => item.label));
      }
    });

    dispatch(getAllFabricsAsync()).then((res) => {
      if (res?.payload) {
        setFabricData(res.payload.map((item) => item.name));
      }
    });
  }, []);

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const onFilterChange = (field, value) => {
    setFiltersData({ ...filtersData, [field]: value });
  };

  const resetFilters = () => {
    setFiltersData({ size: "", color: "", fabric: "", category: "" });
  };

  return (
    <>
      <section>
        <div className="bg-[#E5E5E5] dark:bg-gray-900 mx-auto min-h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <>
            <header className="flex justify-between items-center mx-5">
              <div className="flex  gap-2 items-center justify-center">
                <FilterDropdown
                  label={filtersData.category || "Category"}
                  options={categoryOptions}
                  onSelect={(value) => onFilterChange("category", value)}
                />
                <FilterDropdown
                  label={filtersData.fabric_type || "Fabric"}
                  options={fabricOptions}
                  onSelect={(value) => onFilterChange("fabric_type", value)}
                />
                <FilterDropdown
                  label={filtersData.color || "Color"}
                  options={colorOptions}
                  onSelect={(value) => onFilterChange("color", value)}
                />
                <FilterDropdown
                  label={filtersData.size || "Size"}
                  options={sizeOptions}
                  onSelect={(value) => onFilterChange("size", value)}
                />
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-[#DEC344] border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                  <GrPowerReset size={18} />
                </button>
              </div>

              {/* Searh Bar */}

              <form className="max-w-sm w-full">
                <label
                  htmlFor="default-search"
                  className="text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-3 h-3 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    placeholder="Search By Name"
                    className="block w-full ps-10 p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#DEC344] focus:border-[#DEC344] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#DEC344] dark:focus:border-[#DEC344]"
                    defaultValue={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </form>
            </header>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-screen">
                <Loader type="ball-beat" active={true} />
              </div>
            ) : (
              <>
                {products?.productData?.length > 0 ? (
                  <>
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {products?.productData?.map((data) => (
                        <li className="w-[300px]  rounded-md border bg-gray-200">
                          <img
                            onClick={() => handleUpdate(data?.id)}
                            src={data?.images?.primary?.downloadURL}
                            alt="Laptop"
                            className="h-[250px] cursor-pointer w-full rounded-t-md object-cover"
                          />
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h1 className="inline-flex items-center text-lg font-semibold">
                                  {data?.name}
                                </h1>
                                <h6 className="inline-flex items-center text-lg font-semibold">
                                  ({data?.product_code})
                                </h6>
                              </div>
                              <button
                                onClick={() => openModal(data?.id)}
                                className="text-red-600 text-xl transform transition-transform hover:scale-150"
                              >
                                <MdOutlineDeleteOutline />
                              </button>
                            </div>
                            {data.sale_price > 0 ? (
                              <div className="flex items-center gap-x-2">
                                <h1 className="items-center text-lg font-semibold">
                                  Rs. {data?.sale_price}
                                </h1>
                                <h1 className="items-center line-through text-md font-semibold">
                                  {data?.price}
                                </h1>
                              </div>
                            ) : (
                              <h1 className="items-center text-lg font-semibold">
                                Rs. {data?.price}
                              </h1>
                            )}

                            <div className="mt-4">
                              <span className="mb-2 mr-2 inline-block rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-gray-900">
                                {data?.category}
                              </span>
                              <span className="mb-2 mr-2 inline-block rounded-full bg-white px-4 py-1 text-[11px] font-semibold text-gray-900">
                                {new Date(data?.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-center">
                      <nav aria-label="Page navigation example">
                        <ul className="flex items-center -space-x-px h-8 py-10 text-sm">
                          <li>
                      
                          </li>
                          {renderPaginationLinks()}
                        
                        </ul>
                      </nav>
                    </div>

                    <DeleteModal
                      modalOpen={modalOpen}
                      closeModal={closeModal}
                      handleDelete={handleDelete}
                      productId={productId}
                      deleteLoading={deleteLoading}
                    />
                  </>
                ) : (
                  <div className="playfair text-xl flex font-medium uppercase items-center  pt-10 ">
                    No Products
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </section>
    </>
  );
};

export default AllProducts;
