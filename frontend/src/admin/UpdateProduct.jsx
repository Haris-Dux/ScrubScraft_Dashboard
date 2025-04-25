import { useEffect, useState } from "react";
import {
  getsingleProductAsync,
  updateProductAsync,
} from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "react-loaders";
import Select from "react-select";
import {
  getAllCategoriesAsync,
  getAllColorsAsync,
  getAllFabricsAsync,
} from "../features/ProductDetailsSlice(S,F,C)";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleProduct, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getsingleProductAsync(id));
  }, [id]);

  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    price: 0,
    sale_price: 0,
    product_code: "",
    category: "",
    colors: [],
    sizes: [],
    fabric_type: [],
    file: null,
    file2: null,
    file3: null,
    file4: null,
    latest: false,
    trouserOptions:[
      {
        selected:false,
        name:"trouser"
      },
      {
        selected:false,
        name:"jogerPent"
      }
    ]
  });

  const [categories, setCategories] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const [fabricData, setFabricData] = useState([]);
  const initiRow = { name: "", price: "" };

  useEffect(() => {
    if (singleProduct) {
      setFormdata((prevFormData) => ({
        ...prevFormData,
        name: singleProduct?.name || "",
        price: singleProduct?.price || 0,
        sale_price: singleProduct?.sale_price || 0,
        category: singleProduct?.category || "",
        quantity: singleProduct?.stock || 0,
        description: singleProduct?.description || "",
        latest: singleProduct?.latest,
        productId: singleProduct.id,
        product_code: singleProduct?.product_code,
        colors: singleProduct?.colors,
        sizes: singleProduct?.sizes,
        fabric_type: singleProduct?.fabric_type,
        trouserOptions:[
          {
            selected:singleProduct.trouserOptions[0].selected,
            name:"trouser",
          },
          {
            selected:singleProduct.trouserOptions[1].selected,
            name:"jogerPent",
          }
        ]
      }));
    }
  }, [singleProduct]);

  useEffect(() => {
    dispatch(getAllCategoriesAsync()).then((res) => {
      if (res?.payload) {
        setCategories(
          res.payload.map((item) => ({ value: item.name, label: item.name }))
        );
      }
    });

    dispatch(getAllColorsAsync()).then((res) => {
      if (res?.payload) {
        setColorsData(
          res.payload.map((item) => ({ value: item.value, label: item.label }))
        );
      }
    });

    dispatch(getAllFabricsAsync()).then((res) => {
      if (res?.payload) {
        setFabricData(
          res.payload.map((item) => ({ value: item.name, label: item.name }))
        );
      }
    });
  }, []);

  const handleChange = (e, fieldName) => {
    if (e.target.type === "file") {
      setFormdata({
        ...formdata,
        [fieldName]: e.target.files[0],
      });
    } else {
      setFormdata({
        ...formdata,
        [fieldName]: e.target.value,
      });
    }
  };

  const handleCheckChange = (event) => {
    const { name, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : event.target.value;

    setFormdata({
      ...formdata,
      [name]: newValue,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Only append fields that have been updated
    if (formdata.file) {
      formData.append("primary", formdata.file);
    }
    if (formdata.file2) {
      formData.append("image2", formdata.file2);
    }
    if (formdata.file3) {
      formData.append("image3", formdata.file3);
    }
    if (formdata.file4) {
      formData.append("image4", formdata.file4);
    }
    if (formdata.name !== singleProduct.name) {
      formData.append("name", formdata.name);
    }
    if (formdata.price !== singleProduct.price) {
      formData.append("price", formdata.price);
    }
    if (formdata.product_code !== singleProduct.product_code) {
      formData.append("product_code", formdata.product_code);
    }
    if (formdata.sale_price !== singleProduct.sale_price) {
      formData.append("sale_price", formdata.sale_price);
    }
    if (formdata.category !== singleProduct.category) {
      formData.append("category", formdata.category);
    }

    if (formdata.description !== singleProduct.description) {
      formData.append("description", formdata.description);
    }
    if (formdata.latest !== singleProduct.latest) {
      formData.append("latest", formdata.latest);
    }

    if (formdata.sizes !== singleProduct.sizes) {
      formData.append("sizes", JSON.stringify(formdata.sizes));
    }

    if (formdata.colors !== singleProduct.colors) {
      formData.append("colors", JSON.stringify(formdata.colors));
    }

    if (formdata.fabric_type !== singleProduct.fabric_type) {
      formData.append("fabric_type", JSON.stringify(formdata.fabric_type));
    }

    if (singleProduct) {
      formData.append("productId", formdata.productId);
    }

    if(formData.trouserOptions !== singleProduct.trouserOptions) {
      formData.append("trouserOptions", JSON.stringify(formdata.trouserOptions));
    }

    try {
      dispatch(updateProductAsync(formData)).then((res) => {
        if (res.payload.success) {
          setFormdata({
            name: "",
            description: "",
            price: 0,
            sale_price: 0,
            product_code: "",
            category: "",
            colors: [],
            sizes: [],
            fabric_type: [],
            file: null,
            file2: null,
            file3: null,
            file4: null,
            latest: false,
            trouserOptions:[
              {
                selected:false,
                name:"trouser"
              },
              {
                selected:false,
                name:"jogerPent"
              }
            ]
          });
          dispatch(getsingleProductAsync(id));
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const sizeData = [
    { value: "Xl", label: "Xl" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "L", label: "L" },
    { value: "XXL", label: "XXL" },
    { value: "M", label: "M" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? "#374151" : "#F9FAFB",
      borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB",
      color: state.isDisabled ? "#9CA3AF" : "#111827",
      fontSize: "0.875rem",
      borderRadius: "0.4rem",
      padding: "0.23rem",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827",
    }),
  };

  const handleAddKeyFabricRow = () => {
    setFormdata((prev) => ({
      ...prev,
      fabric_type: [...prev.fabric_type, initiRow],
    }));
  };

  const handleFabricRowChange = (e, index) => {
    const { value, name } = e.target;

    setFormdata((prev) => ({
      ...prev,
      fabric_type: prev.fabric_type.map((item, idx) =>
        idx === index ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleDeleteFabricRow = (index) => {
    setFormdata((prev) => ({
      ...prev,
      fabric_type: [...prev.fabric_type.filter((_, idx) => idx !== index)],
    }));
  };

  return (
    <>
      <section className="bg-[#E5E5E5] dark:bg-gray-900">
        <div className="py-8 px-18 sm:px-20 md:px-16 lg:px-14 mx-auto max-w-full lg:py-10">
          <h2 className="mb-5 playfair text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
            Update Product Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* NAME */}
              <div className="">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="name"
                >
                  Product Name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="name"
                  name="name"
                  placeholder="Type product name"
                  type="text"
                  value={formdata.name}
                  onChange={(e) =>
                    setFormdata({ ...formdata, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* PRICE */}
              <div className="w-full">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="price"
                  name="price"
                  placeholder="Price"
                  type="number"
                  value={formdata.price}
                  onChange={(e) =>
                    setFormdata({ ...formdata, price: e.target.value })
                  }
                  required
                />
              </div>

              {/* SALE PRICE */}
              <div className="w-full">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="sale_price"
                >
                  Sale Price
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="sale_price"
                  name="sale_price"
                  placeholder="Sale Price"
                  type="number"
                  value={formdata.sale_price}
                  onChange={(e) =>
                    setFormdata({ ...formdata, sale_price: e.target.value })
                  }
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="category"
                >
                  Category
                </label>
                <Select
                  name="category"
                  options={categories}
                  className="block custom-reactSelect w-full"
                  classNamePrefix="select"
                  styles={customStyles}
                  id="category"
                  value={categories.filter(
                    (category) => formdata.category === category.value
                  )}
                  onChange={(option) => {
                    setFormdata({
                      ...formdata,
                      category: option.value,
                    });
                  }}
                />
              </div>

              {/* PRODUCT CODE */}
              <div className="w-full">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="price"
                >
                  Product Code
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="product_code"
                  name="product_code"
                  placeholder="product_code"
                  type="text"
                  value={formdata.product_code}
                  onChange={(e) =>
                    setFormdata({ ...formdata, product_code: e.target.value })
                  }
                  required
                />
              </div>

              {/* COLORS */}
              <div>
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="colors"
                >
                  Colors
                </label>
                <Select
                  isMulti
                  name="colors"
                  options={colorsData}
                  className="block custom-reactSelect w-full"
                  classNamePrefix="select"
                  styles={customStyles}
                  value={formdata.colors}
                  onChange={(option) => {
                    setFormdata({
                      ...formdata,
                      colors: option.map((item) => item),
                    });
                  }}
                />
              </div>

              {/* SIZES */}
              <div>
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="sizes"
                >
                  Sizes
                </label>
                <Select
                  isMulti
                  name="size"
                  options={sizeData}
                  className="block custom-reactSelect w-full"
                  classNamePrefix="select"
                  styles={customStyles}
                  value={sizeData.filter((size) =>
                    formdata.sizes.includes(size.value)
                  )}
                  onChange={(option) => {
                    setFormdata({
                      ...formdata,
                      sizes: option.map((item) => item.value),
                    });
                  }}
                />
              </div>

              {/* Fabrics */}
              <div className="mb-4">
                <label className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">
                  Fabrics And Prices
                </label>

                {formdata.fabric_type.map((item, index) => (
                  <div
                    key={index}
                    className="flex item-center justify-center gap-2 "
                  >
                    <Select
                      type="text"
                      name="name"
                      options={fabricData}
                      value={fabricData.find(
                        (option) => option.value === item.name
                      )}
                      onChange={(selectedOption) =>
                        handleFabricRowChange(
                          {
                            target: {
                              name: "name",
                              value: selectedOption.value,
                            },
                          },
                          index
                        )
                      }
                      className="block custom-reactSelect mb-1 w-full"
                      classNamePrefix="select"
                      styles={customStyles}
                      required
                    />
                    <input
                      type="text"
                      name="price"
                      placeholder="Fabric price"
                      value={item.price}
                      onChange={(e) => handleFabricRowChange(e, index)}
                      className="bg-gray-50 border border-gray-300 mb-1 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                      required
                    />

                    {formdata?.fabric_type.length > 1 ? (
                      <MdDeleteOutline
                        size={40}
                        onClick={() => handleDeleteFabricRow(index)}
                        className="cursor-pointer text-red-600"
                      />
                    ) : (
                      <div className="w-[40px] h-[40px]"></div>
                    )}

                    {index === 0 ? (
                      <FaPlus
                        onClick={() => handleAddKeyFabricRow()}
                        size={40}
                        className=" cursor-pointer text-black"
                      />
                    ) : (
                      <div className="w-[40px] h-[40px]"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* DESC */}
              <div className="sm:col-span-2">
                <label
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  id="description"
                  placeholder="Your description here"
                  rows="3"
                  value={formdata.description}
                  onChange={(e) =>
                    setFormdata({ ...formdata, description: e.target.value })
                  }
                />
              </div>

               {/* LATEST PRODUCTS */}
            <div className="flex items-center py-4">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                defaultValue=""
                id="default-checkbox"
                type="checkbox"
                name="latest"
                checked={formdata.latest}
                onChange={handleCheckChange}
              />
              <label
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="default-checkbox"
              >
                Latest Products
              </label>
            </div>

            {/* TROUSER OPTIONS */}

            <div className="flex items-center gap-3">
              {/* TROUSER OPTION */}

              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                defaultValue=""
                id="default-checkbox"
                type="checkbox"
                name="latest"
                checked={formdata?.trouserOptions[0]?.selected}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    trouserOptions: formdata.trouserOptions.map((option) =>
                      option.name === "trouser"
                        ? { ...option, selected: e.target.checked }
                        : option
                    ),
                  })
                }
              />
              <label
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="default-checkbox"
              >
                Trouser
              </label>
          

              {/* JOGER OPTION */}

              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                defaultValue=""
                id="default-checkbox"
                placeholder="Enter Price"
                type="checkbox"
                name="latest"
                checked={formdata?.trouserOptions[1]?.selected}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    trouserOptions: formdata.trouserOptions.map((option) =>
                      option.name === "jogerPent"
                        ? { ...option, selected: e.target.checked }
                        : option
                    ),
                  })
                }
              />
              <label
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="default-checkbox"
              >
                Joger Pent
              </label>
            </div>

            </div>

           

            {/* IMAGES */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {/* FIRST IMAGE */}
              {singleProduct?.images && (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex flex-col py-2 items-center justify-center w-full h-64 border-2 border-[#6857CA] border-dashed rounded-lg  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <img
                      src={
                        formdata.file
                          ? URL.createObjectURL(formdata.file)
                          : singleProduct?.images?.primary?.downloadURL
                      }
                      alt="Product Image"
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        className="flex flex-col items-center justify-center w-full h-16 cursor-pointer"
                        htmlFor="dropzone-file"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mb-4 text-[#6857CA] dark:text-gray-400 hover:text-[#DEC344]"
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
                          <p className="pb-4 text-[#6857CA]">(Primary Image)</p>
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
                </div>
              )}

              {/* SECOND IMAGE */}
              {singleProduct?.images && (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex flex-col py-2 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <img
                      src={
                        formdata.file2
                          ? URL.createObjectURL(formdata.file2)
                          : singleProduct?.images?.image2?.downloadURL
                      }
                      alt="Product Image"
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        className="flex flex-col items-center justify-center w-full h-16 cursor-pointer"
                        htmlFor="dropzone-file-2"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mb-4 text-[#6857CA] dark:text-gray-400 hover:text-[#DEC344]"
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
                        </div>
                        <input
                          className="hidden"
                          id="dropzone-file-2"
                          type="file"
                          onChange={(e) => handleChange(e, "file2")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* THIRD IMAGE */}
              {singleProduct?.images && (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex flex-col py-2 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <img
                      src={
                        formdata.file3
                          ? URL.createObjectURL(formdata.file3)
                          : singleProduct?.images?.image3?.downloadURL
                      }
                      alt="Product Image"
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        className="flex flex-col items-center justify-center w-full h-16 cursor-pointer"
                        htmlFor="dropzone-file-3"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mb-4 text-[#6857CA] dark:text-gray-400 hover:text-[#DEC344]"
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
                        </div>
                        <input
                          className="hidden"
                          id="dropzone-file-3"
                          type="file"
                          onChange={(e) => handleChange(e, "file3")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* FOURTH IMAGE */}
              {singleProduct?.images && (
                <div className="flex flex-col items-center justify-center w-full relative">
                  <div className="flex flex-col py-2 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <img
                      src={
                        formdata.file4
                          ? URL.createObjectURL(formdata.file4)
                          : singleProduct?.images?.image4?.downloadURL
                      }
                      alt="Product Image"
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        className="flex flex-col items-center justify-center w-full h-16 cursor-pointer"
                        htmlFor="dropzone-file-4"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mb-4 text-[#6857CA] dark:text-gray-400 hover:text-[#DEC344]"
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
                        </div>
                        <input
                          className="hidden"
                          id="dropzone-file-4"
                          type="file"
                          onChange={(e) => handleChange(e, "file4")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="w-36 flex justify-center items-center px-2 py-2.5  text-sm font-medium text-center">
                <Loader type="ball-beat" active={true} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-36 flex justify-center items-center px-5 py-2.5  text-sm font-medium text-center text-white bg-[#DEC344] rounded-lg hover:bg-[#614FC9]"
              >
                Update product
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateProduct;
