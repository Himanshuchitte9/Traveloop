import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';
import AuthInput from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
import { registerUser } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  
  const isMatch = password && confirmPassword && password === confirmPassword;

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password
      });
      if (response.data.success) {
        login(response.data.data.token, null);
        navigate('/dashboard');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Server error occurred during registration');
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
        <div className="absolute w-64 h-64 bg-white opacity-10 rounded-full top-20 -left-20 mix-blend-overlay blur-2xl"></div>
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full bottom-20 -right-20 mix-blend-overlay blur-3xl"></div>
      </div>

      {/* Right Half - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fadeIn">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create your account</h2>
            <p className="text-gray-500">Start planning your dream trips</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AuthInput
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              autoFocus={true}
              leftIcon={<User size={20} />}
              register={register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <AuthInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              leftIcon={<Mail size={20} />}
              register={register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              error={errors.email?.message}
            />

            <AuthInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              leftIcon={<Lock size={20} />}
              rightIcon={
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              }
              register={register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
              error={errors.password?.message}
            />

            <AuthInput
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              leftIcon={<Lock size={20} />}
              rightIcon={
                isMatch ? <CheckCircle size={20} className="text-green-500" /> : null
              }
              register={register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              error={errors.confirmPassword?.message}
            />

            <AuthButton 
              label="Sign Up" 
              type="submit" 
              isLoading={isLoading} 
            />
            
            {apiError && (
              <p className="text-red-500 text-sm text-center mt-3 bg-red-50 py-2 rounded-lg">{apiError}</p>
            )}
          </form>

          <p className="text-center text-gray-600 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-500 font-bold hover:text-amber-600 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
