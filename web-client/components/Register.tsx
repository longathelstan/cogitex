import React, { useState } from 'react';
import { register } from '../services/api';
import { UserProfile } from '../types';

interface RegisterProps {
    onRegisterSuccess: (user: UserProfile) => void;
    onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }
        try {
            const data = await register({ name, email, password });
            const userProfile: UserProfile = {
                name: data.user.name,
                source: 'Direct',
                aiUsageFreq: 'Daily',
                criticalThinkingLevel: 3,
                dailyGoal: 'Learn',
                streak: 0,
                motivationScore: 75
            };
            onRegisterSuccess(userProfile);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Đăng ký thất bại');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Đăng ký Cognitex</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                            className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                            className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition"
                    >
                        Đăng ký
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-slate-600">
                    Đã có tài khoản?{' '}
                    <button onClick={onSwitchToLogin} className="text-primary-600 hover:underline">
                        Đăng nhập
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
