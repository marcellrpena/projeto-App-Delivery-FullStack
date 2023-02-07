import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../service/request';

function Register() {
  const userEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const MAX_PASSWORD_LENGTH = 6;
  const MAX_NAME_LENGTH = 12;

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(true);

  const register = async () => {
    try {
      await api.post.register({ name, email, password });
      const { data } = await api.post.login({ email, password });
      localStorage.setItem('user', JSON.stringify(data)).then(() => {
        navigate('/customer/products');
      });
      setIsLogged(true);
    } catch (error) {
      setIsLogged(false);
    }
  };

  return (
    <section
      style={ { minHeight: '100vh', backgroundColor: '#fafafa' } }
      className="d-flex align-items-center justify-content-center"
    >
      <form className="d-flex gap-3 flex-column">
        <h1 className="display-5 text-center">SIGN UP</h1>

        <div className="d-flex justify-content-center flex-column align-items-center">

          <label htmlFor="id" className="form-label">
            Name
            <input
              id="name"
              data-testid="common_register__input-name"
              className="form-control w-100"
              type="email"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
              placeholder="Seu Nome"
            />
            <p>mínimo 12 caracteres</p>
          </label>

          <label htmlFor="email" className="form-label">
            Email
            <input
              id="email"
              data-testid="common_register__input-email"
              className="form-control w-100"
              type="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              placeholder="E-mail"
            />
            <p>email válido: xxxx@xxxx.com</p>
          </label>

          <label htmlFor="password" className="form-label">
            Password
            <input
              id="password"
              data-testid="common_register__input-password"
              className="form-control w-100"
              type="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              placeholder="*******"
            />
            <p>mínimo 8 caracteres</p>
          </label>
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary w-100"
            data-testid="common_register__button-register"
            type="button"
            disabled={
              !(password.length >= MAX_PASSWORD_LENGTH
            && userEmail.test(email)
            && name.length >= MAX_NAME_LENGTH)
            }
            onClick={ () => register() }
          >
            CADASTRAR
          </button>
        </div>
        <div className="form-group">
          <button
            className="btn btn-secondary w-100"
            type="button"
            onClick={ () => navigate('/login') }
          >
            VOLTAR
          </button>
        </div>
        { !isLogged && (
          <h1 data-testid="common_register__element-invalid_register">
            INVALID USER OR EMAIL
          </h1>
        )}

      </form>
    </section>
  );
}

export default Register;
