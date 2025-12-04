import React, { useState } from 'react';
import { login } from '../services/api';
import { UserProfile } from '../types';

interface LoginProps {
    onLoginSuccess: (user: UserProfile) => void;
    onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login({ email, password });
            // Adapt the user data from API to UserProfile type if needed
            // For now, we'll just pass the basic info and mock the rest or fetch it
            const userProfile: UserProfile = {
                name: data.user.name,
                // Default values for now as API doesn't return all these
                source: 'Direct',
                aiUsageFreq: 'Daily',
                criticalThinkingLevel: 3,
                dailyGoal: 'Learn',
                streak: 0,
                motivationScore: 75
            };
            onLoginSuccess(userProfile);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Đăng nhập thất bại');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Đăng nhập vào Cognitex</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition"
                    >
                        Đăng nhập
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-slate-600">
                    Chưa có tài khoản?{' '}
                    <button onClick={onSwitchToRegister} className="text-primary-600 hover:underline">
                        Đăng ký
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
