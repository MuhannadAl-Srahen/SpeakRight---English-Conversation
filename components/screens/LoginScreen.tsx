
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (name: string, gender: 'male' | 'female') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  const isFormValid = name.trim() !== '' && gender !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onLogin(name.trim(), gender!);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A233A]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#141B2D] rounded-2xl shadow-lg animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Welcome to SpeakRight</h1>
          <p className="mt-2 text-gray-400">Let's get you set up for success.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              What should we call you?
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 text-white bg-[#2B3855] border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-[#FFC107]"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-300">Choose your gender</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                  gender === 'male'
                    ? 'bg-[#FFC107] text-[#1A233A] ring-2 ring-offset-2 ring-offset-[#141B2D] ring-[#FFC107]'
                    : 'bg-[#2B3855] text-gray-300 hover:bg-[#394a6c]'
                }`}
              >
                <img src="https://avatar.iran.liara.run/public/boy" alt="Male" className="w-20 h-20 rounded-full bg-indigo-200 object-cover" />
                <span className="mt-2 font-semibold">Male</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                  gender === 'female'
                    ? 'bg-[#FFC107] text-[#1A233A] ring-2 ring-offset-2 ring-offset-[#141B2D] ring-[#FFC107]'
                    : 'bg-[#2B3855] text-gray-300 hover:bg-[#394a6c]'
                }`}
              >
                <img src="https://avatar.iran.liara.run/public/girl" alt="Female" className="w-20 h-20 rounded-full bg-pink-200 object-cover" />
                <span className="mt-2 font-semibold">Female</span>
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-black/80 bg-[#FFC107] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC107] disabled:bg-gray-500 disabled:cursor-not-allowed disabled:brightness-100"
            >
              Start Learning
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
