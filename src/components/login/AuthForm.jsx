import React from 'react';



const AuthForm = ({ title, onSubmit, children }) => {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h2 className="login-title">{title}</h2>
      {children}
    </form>
  );
};

export default AuthForm;

