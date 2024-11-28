import styles from './App.module.css';
import { useState } from 'react';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [reppass, setReppass] = useState('');
	const [passwordError, setPasswordError] = useState(null);

	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password, reppass });
	};
	const onPassChange = ({ target }) => {
		setPassword(target.value);
		let error = null;
		if (!/^[\p{Alpha}\p{Nd}_]*$/.test(target.value)) {
			error =
				'Недопустимые символы. Пароль может содержать только буквы, цифры, нижнее подчеркивание.';
		} else if (target.value.length > 15) {
			error = 'Допустимо не более 15 символов';
		}
		setPasswordError(error);
	};
	const onBlur = () => {
		if (password.length < 3) setPasswordError('Допустимо не менее 3 символов');
	};

	return (
		<>
			<form className={styles.login} onSubmit={onSubmit}>
				<h1>Пройдите регистрацию </h1>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<input
					type="email"
					name="email"
					value={email}
					onChange={({ target }) => setEmail(target.value)}
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
					onBlur={onBlur}
					className={styles['login-input']}
					placeholder="Введите пароль"
					autoComplete="on"
				/>
				<input
					type="password"
					name="reppass"
					value={reppass}
					onChange={({ target }) => setReppass(target.value)}
					className={styles['login-input']}
					placeholder="Повторите пароль"
					autoComplete="on"
				/>
				<button
					type="submit"
					className={styles['login-submit']}
					disabled={!!passwordError}
					// style={{ display: !!passwordError ? 'none' : 'block' }}
				>
					Зарегистрироваться
				</button>
			</form>
		</>
	);
}

export default App;
