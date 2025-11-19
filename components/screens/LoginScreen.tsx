
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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-amber-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative w-full max-w-md p-10 space-y-8 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 animate-fade-in">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Welcome to
          </h1>
          <h2 className="text-4xl font-bold text-white">SpeakRight</h2>
          <p className="mt-3 text-lg text-slate-400">Let's get you set up for success.</p>
        </div>

        <form className="space-y-7" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="name" className="block text-base font-semibold text-slate-300">
              What should we call you?
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-5 py-4 text-white text-lg bg-slate-700/50 border-2 border-slate-600/50 rounded-xl shadow-inner placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 pointer-events-none"></div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-slate-300">Choose your gender</p>
            <div className="grid grid-cols-2 gap-5">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  gender === 'male'
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-amber-500/50 scale-105'
                    : 'bg-slate-700/50 hover:bg-slate-700/70 border-2 border-slate-600/50'
                }`}
              >
                <div className={`w-24 h-24 rounded-full p-1 ${gender === 'male' ? 'bg-white/20' : 'bg-slate-600/30'}`}>
                  <img 
                    src="https://avatar.iran.liara.run/public/boy" 
                    alt="Male" 
                    className="w-full h-full rounded-full object-cover shadow-lg" 
                  />
                </div>
                <span className={`mt-3 text-lg font-bold ${gender === 'male' ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  Male
                </span>
                {gender === 'male' && (
                  <div className="absolute top-3 right-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setGender('female')}
                className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  gender === 'female'
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-amber-500/50 scale-105'
                    : 'bg-slate-700/50 hover:bg-slate-700/70 border-2 border-slate-600/50'
                }`}
              >
                <div className={`w-24 h-24 rounded-full p-1 ${gender === 'female' ? 'bg-white/20' : 'bg-slate-600/30'}`}>
                  <img 
                    src="https://avatar.iran.liara.run/public/girl" 
                    alt="Female" 
                    className="w-full h-full rounded-full object-cover shadow-lg" 
                  />
                </div>
                <span className={`mt-3 text-lg font-bold ${gender === 'female' ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  Female
                </span>
                {gender === 'female' && (
                  <div className="absolute top-3 right-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`relative w-full overflow-hidden group py-4 px-6 rounded-xl text-xl font-bold transition-all duration-300 transform ${
                isFormValid
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Learning
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {isFormValid && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              )}
            </button>
          </div>
        </form>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};
