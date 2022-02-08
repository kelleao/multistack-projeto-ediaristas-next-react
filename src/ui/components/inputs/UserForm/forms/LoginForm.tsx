import React from 'react';
import { LoginDate } from '../UserForm.style';
import { useFormContext } from 'react-hook-form';
import TextField from '../../TextField/TextField';
import Link from 'ui/components/navigation/Link/Link';

export const LoginForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <LoginDate>
            <TextField
                label={'E-mail'}
                type={'email'}
                {...register('login.email')}
                error={errors?.login?.email !== undefined}
                helperText={errors?.login?.email?.message}
            />
            <TextField
                label={'Senha'}
                type={'password'}
                {...register('login.password')}
                error={errors?.login?.password !== undefined}
                helperText={errors?.login?.password?.message}
            />

            <Link href={'/recuperar-senha'}>Esqueci minha senha</Link>
        </LoginDate>
    );
};
