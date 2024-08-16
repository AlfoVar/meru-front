import { useForm } from 'react-hook-form';
import api from '../lib/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './Login.module.css'; // Importar el archivo CSS

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirmation) {
      setError('Las contraseñas son diferentes');
      return;
    }

    try {
      await api.post('/users', {
        user: {
          email: data.email,
          password: data.password,
          password_confirmation: data.passwordConfirmation,
        },
      });
      router.push('/login');
    } catch (err) {
      setError('Failed to register');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="email"
          placeholder="Correo"
          {...register('email', { required: 'Correo obligatoria' })}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Contraseña"
          {...register('password', { required: 'Contraseña obligatorio' })}
          className={styles.input}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          {...register('passwordConfirmation', { required: 'Se requiere confirmación de contraseña' })}
          className={styles.input}
        />
        {errors.passwordConfirmation && <p className={styles.error}>{errors.passwordConfirmation.message}</p>}
        <button type="submit" className={styles.button}>Enviar registro</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handleLoginRedirect} className={styles.button}>Volver al Login</button>
    </div>
  );
}