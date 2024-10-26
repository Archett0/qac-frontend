import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // 从 localStorage 获取 token
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken); // 设置 token 到状态
    }
  }, []); // 在组件加载时执行

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>JWT Token:</p>
      <pre>{token ? token : 'No token found'}</pre> {/* 显示 Token */}
    </div>
  );
};

export default Dashboard;
