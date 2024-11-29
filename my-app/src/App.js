import styles from './App.module.css';
import { useState } from 'react';
import { useRef } from 'react';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repass, setRepass] = useState('');
	const [errorM, setErrorM] = useState(null);
	const myRef = useRef(null);
	const subOff = !email || !password || !repass || errorM;
	const valid = {
		emailRegexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		passRegexp: /^[\p{N}\p{L}_]{0,20}$/gmu,
	};
	const mes = {
		badpass:
			'Недопустимый ввод. Пароль может содержать любые буквы и цифры и только. Не менеее 6 и не более 20 знаков.',
		badmail: 'Неприемлемый адрес электронной почты',
		small: 'Пароль слишком короткий. Менее 6 символов',
		diff: 'Пароли должны совпадать',
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(
			'email-',
			email,
			'\n',
			'password_1-',
			password,
			'\n',
			'password_2-',
			repass,
			errorM,
		);
		setEmail('');
		setPassword('');
		setRepass('');
	};
	const emailBlur = () => {
		// let error = null;
		if (!valid.emailRegexp.test(email)) setErrorM(mes.badmail);
		// setErrorM(error);
	};

	const onPassChange = ({ target }) => {
		let error = null;
		// !valid.emailRegexp.test(email)
		// 	? (error = mes.badmail)
		// : // setErrorM(mes.badmail)
		setPassword(target.value);
		if (password && !valid.passRegexp.test(target.value)) error = mes.badpass;
		// setErrorM(mes.badpass);
		setErrorM(error);
	};
	const passBlur = () => {
		// if (password.length < 6) setErrorM(mes.small);
	};

	const onRepassChange = ({ target }) => {
		setRepass(target.value);
		if (!valid.passRegexp.test(target.value)) setErrorM(mes.badpass);
	};
	const repassBlur = () => {
		repass !== password ? setErrorM(mes.diff) : myRef.current.focus();
	};

	return (
		<>
			<form className={styles.login} onSubmit={onSubmit}>
				<h1>Пройдите регистрацию </h1>
				{errorM && <div className={styles.error}>{errorM}</div>}
				<input
					type="email"
					name="email"
					value={email}
					onChange={({ target }) => setEmail(target.value)}
					onBlur={emailBlur}
					className={styles['login-input']}
					placeholder="Введите email"
					autoFocus="on"
					required={true}
					autoComplete="on"
				/>
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
					ref={myRef}
					disabled={subOff}
					// style={{ display: !!passwordError ? 'none' : 'block' }}
				>
					Зарегистрироваться
				</button>
			</form>
		</>
	);
}

export default App;
