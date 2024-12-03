import styles from './form1.module.css';
import { useState, useRef } from 'react';

export function Form1() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repass, setRepass] = useState('');
	const [error, setError] = useState(null);
	const subRef = useRef(null);
	const subOff = !!error;

	const erM = [
		'Адрес электронной почты в поле ниже не может превышать 30 знаков',
		'Неприемлемый email',
		'Пароль может содержать только буквы и цифры. Не менеее 6 и не более 20 знаков.',
		'Недопустимый ввод. Исправьте пароль.',
		'Неприемлемый пароль',
		'Пароли должны совпадать',
	];
	const onEmailChange = ({ target }) => {
		let error = null;
		setEmail(target.value);
		if (target.value.length > 30) error = erM[0];
		setError(error);
	};

	const emailBlur = () => {
		let error = null;
		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
			error = erM[1];
		setError(error);
	};

	const onPassChange = ({ target }) => {
		let error = null;
		setPassword(target.value);
		if (!/^[\p{N}\p{L}]{0,20}$/gmu.test(target.value)) error = erM[2];
		setError(error);
	};
	const passBlur = () => {
		let error = null;
		if (!/^[\p{N}\p{L}]{6,20}$/gmu.test(password)) error = erM[3];
		setError(error);
	};

	const onRepassChange = ({ target }) => {
		let error = null;
		setRepass(target.value);
		if (!/^[\p{N}\p{L}]{0,20}$/gmu.test(target.value)) error = erM[4];
		setError(error);
	};
	const repassBlur = () => {
		let error = null;
		repass === password ? subRef.current.focus() : (error = erM[5]);
		setError(error);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		console.log('e-', email, '\n', 'p1-', password, '\n', 'p2-', repass, error);
		setEmail('');
		setPassword('');
		setRepass('');
	};

	return (
		<form className={styles.login} onSubmit={onSubmit}>
			<h1>Пройдите регистрацию </h1>
			{(error === erM[0] || error === erM[1]) && (
				<div className={styles.error}>{error}</div>
			)}
			<input
				type="email"
				name="email"
				value={email}
				onChange={onEmailChange}
				onBlur={emailBlur}
				className={styles['login-input']}
				placeholder="Введите email"
				autoFocus="on"
				required={true}
				autoComplete="on"
			/>
			{(error === erM[2] || error === erM[3]) && (
				<div className={styles.error}>{error}</div>
			)}
			<input
				type="password"
				name="password"
				value={password}
				onChange={onPassChange}
				onBlur={passBlur}
				className={styles['login-input']}
				placeholder="Введите пароль"
				autoComplete="on"
			/>
			{(error === erM[4] || error === erM[5]) && (
				<div className={styles.error}>{error}</div>
			)}
			<input
				type="password"
				name="reppass"
				value={repass}
				onChange={onRepassChange}
				onBlur={repassBlur}
				className={styles['login-input']}
				placeholder="Повторите пароль"
				autoComplete="on"
			/>
			<button
				type="submit"
				className={styles['login-submit']}
				ref={subRef}
				disabled={subOff}
			>
				Зарегистрироваться
			</button>
		</form>
	);
}
