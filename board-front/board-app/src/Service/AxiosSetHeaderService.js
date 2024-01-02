import axios from 'axios';

const axiosWithAuth = () => {
  const instance = axios.create();

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      const jwtToken = localStorage.getItem('Authorization');
      if (jwtToken) {
        // 인증 헤더에 JWT 토큰을 추가
        config.headers['Authorization'] = `Bearer ${jwtToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosWithAuth;