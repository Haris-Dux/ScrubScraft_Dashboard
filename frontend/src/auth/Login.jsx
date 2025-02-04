import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../features/authSlice";
import Loader from 'react-loaders'
import "./Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user?.login) {
      navigate("/admin");
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(formData))
  };

  return (
    <>
      <section
        id="login"
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[100vh] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow shadow-slate-600 dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                ScrubScraft Admin Dashboard
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* EMAIL */}
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                {/* TOGGLE PASSWORD */}
                <div className="flex items-center justify-between">
                  {/* TOGGLE PASSWORD VISIBILITY */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          aria-describedby="remember"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0"
                          id="remember"
                          type="checkbox"
                          onChange={togglePasswordVisibility}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          className="text-gray-700 select-none cursor-pointer"
                          htmlFor="remember"
                        >
                          show password
                        </label>
                      </div>
                    </div>
                  </div>

                  <Link
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    to={"/sendOtp"}
                  >
                    Forgot password?
                  </Link>
                </div>
                

                {/* BUTTON */}
                {isLoading ? (
                     <div className="flex justify-center items-center  w-full px-5 text-center">
                     <Loader type="ball-beat" active={true} />
                   </div>
                  ) :  (<button
                  type="submit"
                  disabled={isLoading}
                  className={`flex justify-center items-center mx-auto text-white bg-[#DEC344] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  Sign in
                </button>)}
               
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
