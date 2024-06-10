/*
//parte 1
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function usePrompt(message, when) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    const handlePopState = (event) => {
      if (!window.confirm(message)) {
        event.preventDefault();
        navigate(location.pathname, { replace: true });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [when, message, navigate, location]);

  return null;
}

export default usePrompt;
*/
//------------------------------------------------------------------
//parte 2
/*import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function usePrompt(message, when, onConfirm) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      onConfirm(); // Chama a função de confirmação antes de sair
      event.returnValue = message;
      return message;
    };

    const handlePopState = (event) => {
      if (!window.confirm(message)) {
        event.preventDefault();
        navigate(location.pathname, { replace: true });
      } else {
        onConfirm(); // Chama a função de confirmação ao voltar
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [when, message, navigate, location, onConfirm]);

  return null;
}

export default usePrompt;
*/
//parte 3
/*import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function usePrompt(message, when, onConfirm) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      onConfirm(); // Chama a função de confirmação antes de sair
      event.returnValue = message;
      return message;
    };

    const handlePopState = (event) => {
      if (!window.confirm(message)) {
        event.preventDefault();
        navigate(location.pathname, { replace: true });
      } else {
        onConfirm(); // Chama a função de confirmação ao voltar
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [when, message, navigate, location, onConfirm]);

  return null;
}

export default usePrompt;
*/
