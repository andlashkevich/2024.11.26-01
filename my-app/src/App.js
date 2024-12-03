import Form1 from './Components';
import Form2 from './Components';
import styles from './App.module.css';
import { useRef } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldsScheme = yup.object().shape({
	email: yup
		.string()
		.required('Введите email')
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'Неприемлемый email',
		),

	password: yup
		.string()
		.required('Введите пароль')
		.matches(
			/^[\p{N}\p{L}]{6,20}$/gmu,
			'Недопустимый ввод. Пароль может содержать любые буквы и цифры и только. Не менеее 6 и не более 20 знаков.',
		),
	repass: yup
		.string()
		.required('Введите пароль ещё раз')
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});
function App() {
	const btnRef = useRef(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
			repass: '',
		},
		resolver: yupResolver(fieldsScheme),
	});

	const btnOff = errors.email && errors.password && errors.repass;
	const onBlur = () => {
		if (!btnOff) btnRef.current.focus();
	};

	const onSubmit = (formData) => {
		console.log(formData);
		reset();
	};

	return (
		<>
			<form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
				<h1>Пройдите регистрацию </h1>

				{errors.email?.message && (
					<p className={styles.error}>{errors.email?.message}</p>
				)}
				<input
					type="email"
					name="email"
					{...register('email')}
					className={styles['login-input']}
					placeholder="Введите email"
					autoFocus="on"
				/>
				{errors.password?.message && (
					<p className={styles.error}>{errors.password.message}</p>
				)}
				<input
					type="password"
					name="password"
					{...register('password')}
					className={styles['login-input']}
					placeholder="Введите пароль"
					autoComplete="on"
				/>
				{errors.repass?.message && (
					<p className={styles.error}>{errors.repass.message}</p>
				)}
				<input
					type="password"
					name="reppass"
					{...register('repass')}
					onBlur={onBlur}
					className={styles['login-input']}
					placeholder="Повторите пароль"
					autoComplete="on"
				/>
				<button
					type="submit"
					className={styles['login-submit']}
					ref={btnRef}
					disabled={btnOff}
				>
					Зарегистрироваться
				</button>
			</form>
		</>
	);
}

export default App;
