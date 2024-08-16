import { useForm } from 'react-hook-form';
import api from '../lib/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './Login.module.css'; // Importar el archivo CSS

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/users/sign_in', {
        user: {
          email: data.email,
          password: data.password,
        },
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.email);
      router.push('/products');
    } catch (err) {
      setError('Usuario o contraseña invalidos');
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className={styles.input}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        <button type="submit" className={styles.button}>Login</button>
        <button type="button" onClick={handleRegisterRedirect} className={styles.buttonSecondary}>Crear usuario</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}