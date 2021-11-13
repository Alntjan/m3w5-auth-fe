import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      // baseURL: `${process.env.REACT_APP_API_HOST}/auth`,
      baseURL: `/api/auth`,
      withCredentials: true,
      proxy: {
        host: process.env.REACT_APP_API_HOST,
      },
    });
  }

  signup = (username, password) => {
    return this.service.post(
      '/signup',
      { username, password },
      { withCredentials: true }
    );
  };

  login = (username, password) => {
    return this.service.post('/login', { username, password });
  };

  logout = () => {
    return this.service.post('/logout');
  };

  loggedin = () => {
    return this.service.get('/loggedin', { withCredentials: true });
  };
}

const authService = new AuthService();
export default authService;
