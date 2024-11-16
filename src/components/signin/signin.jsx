import React, { useState } from 'react';
import Signinbg from '../../assets/img/sign_in.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/auth/authSlice';
import toast from 'react-hot-toast';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast
        .promise(dispatch(login({ email, password })).unwrap(), {
          loading: loading,
          success: <b>Successfully Signin!</b>,
          error: error,
        })
        .then(() => navigate('/'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-transform: none">
      <div className="bg-white rounded-[30px] justify-center shadow-xl py-8 px-12 w-full h-[500px] max-w-md relative overflow-hidden">
        <img
          src={Signinbg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-center mb-20">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-8 w-full opacity-75">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-3 border rounded focus:outline-none focus:border-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-8 w-full opacity-75 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                className="w-full px-4 py-3 border rounded focus:outline-none focus:border-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#F8C00B] text-white text-3xl py-2 mb-10 rounded-xl font-bold hover:bg-yellow-500 transition duration-200"
            >
              Sign In
            </button>
          </form>

          <Link to={'/signup'} className="text-[#f6f5f1] text-xl font-bold align-baseline">
            No Account? Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
