import '../App.css';
import { useForm } from 'react-hook-form';
import styles from '../app.module.css';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRef, useEffect } from 'react';

const fieldsSchema = yup.object().shape({
    email: yup.string().matches(/^.+@[\w]+\.[\w]+$/, 'Неверный формат почты. Почта должна содержать локальную часть, символ "@", точку и доменное имя')
	.matches(/^[\w._]+@[\w]+\.[\w]+$/, 'Допустимые символы: буквы, цифры, точка и нижнее подчеркивание.').matches(/^.{0,20}@[\w]+\.[\w]+$/, 'Количество символов до знака @ не должно превышать 20.').min(7, 'Должно быть не менее 7 символов').required(),
    password: yup.string().matches(/^[A-Z]/, 'Пароль должен начинаться с заглавной буквы.').matches(/^[A-Z][\w_]*$/, 'Пароль может содержать буквы, цифры и нижнее подчеркивание.').max(20, 'Длина пароля не должна превышать 20 символов.').min(6, 'Должно быть не менее 6 символов').required(),
    confirmedPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required(),
  })

const onSubmit = (data) => console.log(data)

export function ReactHookForm() {

	const submitBtn = useRef(null)

	const {
		register,
		handleSubmit,
		formState: { errors }} = useForm({
		defaultValues:{
			email: '',
			password: '',
			confirmedPassword: '',
		},
		resolver: yupResolver(fieldsSchema)
	})

	const emailError = errors.email?.message
	const passwordError = errors.password?.message
	const confirmedError = errors.confirmedPassword?.message

	useEffect(()=>{
		if(!emailError||!passwordError||!confirmedError){
				submitBtn.current.focus()
		}
	},[emailError,passwordError,confirmedError])

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

			<input name='email' type="email" placeholder='Почта' {...register('email')} className={styles.input}/>
			{emailError && <p className={styles.p}>{emailError}</p>}

			<input name='password' type="password" placeholder='Пароль' {...register('password')} className={styles.input}/>
			{passwordError && <p className={styles.p}>{passwordError}</p>}

			<input name='confirmedPassword' type="password" placeholder='Подтвердите пароль' {...register('confirmedPassword')} className={styles.input}/>
			{confirmedError && <p className={styles.p}>{confirmedError}</p>}

			<button ref={submitBtn} type='submit' className={styles.button} disabled={!!emailError||!!confirmedError||!!passwordError}>Создать аккаунт</button>
		</form>
	)
}
