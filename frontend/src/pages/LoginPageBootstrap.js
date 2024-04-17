import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import GoogleLogin from "../components/GoogleLoginButton";
import './loginPage.css'

// ==============================|| Style ||============================== //
const pageStyles = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'red'

  };

  const loginBox = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
  };



// ==============================|| Login Page ||============================== //
const LoginPage = () => {
  const { user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target > 0){
        loginUser(e);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="container" style={pageStyles}>
        <div className="form-signin" style={loginBox}>
            <form onSubmit={handleSubmit}>
                <img className="mb-4" src="/logoVerde.png" alt="Logo" width="72" height="57" />
                <h2 className="h3 mb-3 fw-normal">Please sign in</h2>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            </form>
        </div>
    </div>
  );
};

export default LoginPage;

//   return (
//     <div className="text-center">
//       <main className="form-signin w-100 m-auto">
//         <form onSubmit={handleSubmit}>
//           <img className="mb-4" src="/logoVerde.png" alt="Logo" width="72" height="57" />
//           <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

//           <div className="form-floating">
//             <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
//             <label htmlFor="floatingInput">Email address</label>
//           </div>
//           <div className="form-floating">
//             <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
//             <label htmlFor="floatingPassword">Password</label>
//           </div>

//           <div className="checkbox mb-3">
//             <label>
//               <input type="checkbox" value="remember-me" /> Remember me
//             </label>
//           </div>
//           <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
//         </form>

//         <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
//         <GoogleLogin />
//       </main>
//     </div>
//   );
// };

// export default LoginPage;
