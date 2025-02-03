import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteReviewsAsync,
  getAllReviewsAsync,
} from "../features/reviewSlice";
import { FaStar } from "react-icons/fa";
import Loader from "react-loaders";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} className="text-[#FFC209]" />);
  }
  return <div className="flex">{stars}</div>;
};

const Reviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.review);
  const reviews = useSelector((state) => state.review.reviews);

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(getAllReviewsAsync(page));
  }, [dispatch, page]);

  const handleDelete = (id) => {
    dispatch(deleteReviewsAsync({ id })).then((res) => {
      if (res.payload.message === "Review deleted successfully") {
        dispatch(getAllReviewsAsync(page));
      }
    });
  };

  const renderPaginationLinks = () => {
    const totalPages = reviews?.totalPages;
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <li key={i}>
          <Link
            to={`/admin/reviews?page=${i}`}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 ${
              i === page ? "bg-gray-600 text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => dispatch(getAllReviewsAsync({ page: i }))}
          >
            {i}
          </Link>
        </li>
      );
    }
    return paginationLinks;
  };

  return (
    <>
      <section className="bg-[#E5E5E5] dark:bg-gray-900 py-8 sm:py-10 mx-auto min-h-screen max-w-screen-xl px-4 lg:px-8">
        <div className="bg-white py-8 antialiased dark:bg-gray-800 md:py-16 rounded-lg">
          {isLoading ?    <div className="flex justify-center items-center py-10">
          <Loader type="ball-beat" active={true} />
        </div> : <div className="mx-auto px-6 2xl:px-6  ">
            {/* HEADER SECTION */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Reviews
              </h2>
              <div className="mt-2 flex items-center gap-2 sm:mt-0">
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({reviews?.totalReviews})
                </p>
              </div>
            </div>

            {/* PER STAR AVERAGE */}
            <div className="my-6 gap-8 sm:flex sm:items-start pb-5 md:my-4 border-b border-gray-400">
              <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
                <div className="flex items-center pl-2 gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    5
                  </p>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${
                          reviews?.totalReviews &&
                          reviews?.ratings &&
                          reviews?.ratings[5] !== 0
                            ? (reviews?.ratings[5] / reviews?.totalReviews) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700  dark:text-primary-500 sm:w-auto sm:text-left">
                    {reviews?.ratings && reviews?.ratings[5]}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </p>
                </div>
                <div className="flex items-center pl-2 gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    4
                  </p>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${
                          reviews?.totalReviews &&
                          reviews?.ratings &&
                          reviews?.ratings[4] !== 0
                            ? (reviews?.ratings[4] / reviews?.totalReviews) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700  dark:text-primary-500 sm:w-auto sm:text-left">
                    {reviews?.ratings && reviews?.ratings[4]}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </p>
                </div>
                <div className="flex items-center pl-2 gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    3
                  </p>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${
                          reviews?.totalReviews &&
                          reviews?.ratings &&
                          reviews?.ratings[3] !== 0
                            ? (reviews?.ratings[3] / reviews?.totalReviews) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 dark:text-primary-500 sm:w-auto sm:text-left">
                    {reviews?.ratings && reviews?.ratings[3]}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </p>
                </div>
                <div className="flex items-center pl-2 gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    2
                  </p>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${
                          reviews?.totalReviews &&
                          reviews?.ratings &&
                          reviews?.ratings[2] !== 0
                            ? (reviews?.ratings[2] / reviews?.totalReviews) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 dark:text-primary-500 sm:w-auto sm:text-left">
                    {reviews?.ratings && reviews?.ratings[2]}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </p>
                </div>
                <div className="flex items-center pl-2 gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    1
                  </p>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${
                          reviews?.totalReviews &&
                          reviews?.ratings &&
                          reviews?.ratings[1] !== 0
                            ? (reviews?.ratings[1] / reviews?.totalReviews) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 dark:text-primary-500 sm:w-auto sm:text-left">
                    {reviews?.ratings && reviews?.ratings[1]}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ALL REVIEWS SECTION */}
            <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
              {reviews?.reviewsWithNames?.map((data, index) => (
                <div
                  key={index}
                  className="gap-3 pt-6 pb-6 sm:flex sm:items-start"
                >
                  <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                    <div className="flex items-center gap-0.5">
                      <StarRating rating={data?.rating} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {data.name}
                      </p>
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {new Date(data?.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {data?.review}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(data?.id)}
                    className="text-red-500 font-medium hover:underline hover:underline-offset-4"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>}
        </div>
      </section>
      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 py-10 text-sm">
            <li>
              {reviews?.page > 1 ? (
                <Link
                  to={`/admin/reviews?page=${page - 1}`}
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
              {reviews?.totalPages !== page ? (
                <Link
                  to={`/admin/reviews?page=${page + 1}`}
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
      </div>{" "}
    </>
  );
};

export default Reviews;
