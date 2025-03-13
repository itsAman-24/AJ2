import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Auth({ onLogin }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    bloodGroup: 'O+',
    allergies: 'None',
    emergencyContact: '',
    role: 'Patient' // Default role for new signups
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (isLogin) {
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        onLogin(user);
        toast.success('Logged in successfully!');
        localStorage.setItem('currentRole', user.role); // Store role in localStorage
        navigate('/');
      } else {
        toast.error('Invalid credentials');
      }
    } else {
      if (users.some(user => user.email === formData.email)) {
        toast.error('Email already exists');
        return;
      }

      const newUser = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      onLogin(newUser);
      toast.success('Account created successfully!');
      localStorage.setItem('currentRole', newUser.role); // Store selected role
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 dark:text-white">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="input text-sm md:text-base"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm mb-2">Select Role</label>
                  <select
                    id="role"
                    name="role"
                    className="input text-sm md:text-base"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm mb-2">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input text-sm md:text-base"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input text-sm md:text-base"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn-primary w-full text-sm md:text-base">
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-600 hover:text-primary-700 text-sm md:text-base"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
