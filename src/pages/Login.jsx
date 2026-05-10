import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthInput from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { loginUser } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    try {
      const response = await loginUser(data);
      if (response.data.success) {
        login(response.data.data.token, null);
        navigate('/dashboard');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans">
      {/* Left Half - Hidden on mobile */}
      <div 
        className="hidden lg:flex w-1/2 flex-col justify-center items-center text-white p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #F5A623 0%, #F53B3B 100%)' }}
      >
        <div className="z-10 max-w-md text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">Plan your journey, not just your trip.</h1>
          <p className="text-lg opacity-90">Traveloop makes travel planning effortless.</p>
        </div>
        {/* Subtle decorative elements */}
        <div className="absolute w-64 h-64 bg-white opacity-10 rounded-full top-20 -left-20 mix-blend-overlay blur-2xl"></div>
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full bottom-20 -right-20 mix-blend-overlay blur-3xl"></div>
      </div>

      {/* Right Half - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fadeIn">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-2">Traveloop</h2>
            <p className="text-gray-500">Welcome back ✈️</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AuthInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoFocus={true}
              leftIcon={<Mail size={20} />}
              register={register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              error={errors.email?.message}
            />

            <div className="relative">
              <AuthInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                leftIcon={<Lock size={20} />}
                rightIcon={
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                }
                register={register('password', { required: 'Password is required' })}
                error={errors.password?.message}
              />
              <div className="absolute right-0 top-0 mt-1">
                <Link to="/forgot-password" className="text-amber-500 text-sm hover:text-amber-600 transition-colors font-medium">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <AuthButton 
              label="Sign In" 
              type="submit" 
              isLoading={isLoading} 
            />
            
            {apiError && (
              <p className="text-red-500 text-sm text-center mt-3 bg-red-50 py-2 rounded-lg">{apiError}</p>
            )}
          </form>

          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-amber-500 font-bold hover:text-amber-600 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
