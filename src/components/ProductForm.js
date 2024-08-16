import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import api from '../lib/api';
import styles from './ProductForm.module.css'; // Crear un archivo CSS para estilos minimalistas

export default function ProductForm({ product = {} }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
    }
  });
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      if (product.id) {
        await api.put(`/api/products/${product.id}`, {
          product: { ...data, price: parseFloat(data.price) },
        });
      } else {
        await api.post("/api/products", {
          product: { ...data, price: parseFloat(data.price) },
        });
      }
      router.push("/products");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.id ? 'Editar Producto' : 'Agregar Producto'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          {...register('name', { required: 'El nombre es requerido' })}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        
        <textarea
          placeholder="Descripción"
          {...register('description', { required: 'Se necesita una Descripción' })}
          className={styles.textarea}
        />
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        
        <input
          type="text"
          placeholder="Precio"
          {...register('price', { required: 'Agregue el Precio', validate: value => !isNaN(value) || 'Deve ser un numero' })}
          className={styles.input}
        />
        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
        
        <button type="submit" className={styles.button}>Enviar</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}