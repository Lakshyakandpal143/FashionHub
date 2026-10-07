import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import register from '../assets/register2.avif'
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const { user, register: doRegister } = useAuth();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const redirect = params.get('redirect') || '/';

    if (user) return <Navigate to={redirect} replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        setSubmitting(true);
        try {
            await doRegister(name, email, password);
            toast.success('Account created');
            navigate(redirect, { replace: true });
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
                <form action="" onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl text-center font-medium pr-6'>FashionHub</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>Hey there!👋</h2>
                    <p className='text-center mb-6'>Create your account to start shopping.</p>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your Name' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your email address' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your password (min 6 characters)' required minLength={6} />
                    </div>
                    <div>
                        <button type='submit' disabled={submitting} className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50'>{submitting ? 'Creating account...' : 'Sign Up'}</button>
                        <p className='mt-6 text-center text-sm'>Already have an account?{" "}
                            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={register} alt="register account" className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default Register