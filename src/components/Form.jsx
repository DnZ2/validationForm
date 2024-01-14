import '../App.css';
import { useEffect, useRef, useState} from 'react';
import styles from '../app.module.css';

function useForm(initialValue){
	const [value, setState] = useState(initialValue)

	const setValue = (fieldName, newValue) =>{
		setState({...value, [fieldName]: newValue})
	}

	return {
		value,
		setValue
	}
}

export function Form() {
	const formFields = {
		email:'',
		password:'',
		confirmedPassword:'',
	}
	const {value, setValue} = useForm(formFields)
	const [emailError, setEmailError] = useState(null)
	const [passwordError, setPasswordError] = useState(null)
	const [confirmedError, setConfirmedError] = useState(null)

	const submitBtn = useRef(null)

	const {email, password, confirmedPassword} = value

	const onChange = ({target}) =>{
		setValue(target.name, target.value)
		let error = null
		let confirmPass = null

		if(target.name === 'email'){
			if(!/^.+@[\w]+\.[\w]+$/.test(target.value)){
				error = 'Неверный формат почты. Почта должна содержать локальную часть, символ "@", точку и доменное имя';
			}
			else if(!/^[\w._]+@[\w]+\.[\w]+$/.test(target.value)){
				error = 'Допустимые символы: буквы, цифры, точка и нижнее подчеркивание.';
			}
			else if(!/^.{0,20}@[\w]+\.[\w]+$/.test(target.value)){
				error = 'Количество символов до знака @ не должно превышать 20.';
			}

			setEmailError(error)
		}

		if(target.name === 'password'){
			if(!/^[A-Z]/.test(target.value)){
				error = 'Пароль должен начинаться с заглавной буквы.';
			}
			else if(!/^[A-Z][\w_]*$/.test(target.value)){
				error = 'Пароль может содержать буквы, цифры и нижнее подчеркивание.';
			}
			else if(target.value.length>20){
				error = 'Длина пароля не должна превышать 20 символов.';
			}
			setPasswordError(error)

			if(confirmedPassword !== target.value){
				confirmPass = 'Пароли не совпадают'
			}

			setConfirmedError(confirmPass)
		}

		if(target.name === 'confirmedPassword'){
			if(password !== target.value){
				confirmPass = 'Пароли не совпадают'
			}

			setConfirmedError(confirmPass)
		}
	}

	const onBlur = ({target}) =>{
		if(target.name === 'email'){
			if(target.value.length<7){
				setEmailError('Должно быть не менее 7 символов')
			}

		}
		if(target.name === 'password'){
			if(target.value.length<6){
				setPasswordError('Должно быть не менее 6 символов')
			}
		}
	}

	const onSubmit = (event) =>{
		event.preventDefault()
		console.log(value)
	}

	useEffect(()=>{
		if(!emailError||!passwordError||!confirmedError){
				submitBtn.current.focus()
		}
	},[emailError,passwordError,confirmedError])

	return (
		<form className={styles.form} onSubmit={onSubmit}>

			<input name='email' type="email" value={email}  placeholder='Почта' required onChange={onChange} onBlur={onBlur} className={styles.input}/>
			{emailError && <p className={styles.p}>{emailError}</p>}

			<input name='password' type="password" value={password} placeholder='Пароль' required onChange={onChange} onBlur={onBlur} className={styles.input}/>
			{passwordError && <p className={styles.p}>{passwordError}</p>}

			<input name='confirmedPassword' type="password" value={confirmedPassword} placeholder='Подтвердите пароль' required onChange={onChange} className={styles.input}/>
			{confirmedError && <p className={styles.p}>{confirmedError}</p>}

			<button ref={submitBtn} type='submit' className={styles.button} disabled={emailError||passwordError||confirmedError}>Создать аккаунт</button>
		</form>
	)
}
