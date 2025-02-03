import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createuserAsync } from "../features/authSlice";
import "./Auth.css";
import Loader from "react-loaders";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.login) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createuserAsync(formData)).then((res) => {
      if (res.payload) {
        navigate("/");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    });
  };

  return (
    <>
      <section
        id="signup"
       
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[100vh] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow shadow-slate-600 dark:border md:mt-14 sm:max-w-md xl:p-0">
            <div className="p-6  space-y-4 md:space-y-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    id="name"
                    name="name"
                    placeholder="name"
                    type="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="email"
                  >
                    Your email
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                {isLoading ? (
                     <div className="flex justify-center items-center  w-full px-5 text-center">
                     <Loader type="ball-beat" active={true} />
                   </div>
                  ) :  (<button
                  type="submit"
                  disabled={isLoading}
                  className={`flex justify-center items-center mx-auto text-white bg-[#DEC344] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  Sign Up
                </button>)}

               
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
