import React from 'react';
import UserSidebar from './UserSidebar';

const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
      <div className="sidebar">
        <UserSidebar />
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default UserLayout;
