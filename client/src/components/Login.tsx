import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  console.log('여기 컴포넌트 보지 마세요');
  const [authing, setAuthing] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <div>
      <p>LoginPage</p>
      <button
        type="button"
        onClick={() => signInWithGoogle()}
        disabled={authing}
      >
        sign in with google
      </button>
    </div>
  );
}

export default Login;
