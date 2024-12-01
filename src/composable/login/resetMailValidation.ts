
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useNavigation } from '../../composable/navegationComposables';

export function validation(){
    const schema = yup.object({
        email: yup.string()
        .email('Email no es válido')
        .matches(/@(profesor.duoc.cl|duocuc.cl)$/, 'Email no es valido.')
        .required('Email no es valido.'),
    });

    const { errors, handleSubmit, defineField } = useForm({
        validationSchema: schema,
    });
    const { goChangePasswordForm } = useNavigation();
    const onSubmit  = handleSubmit(values => { 
        console.log(JSON.stringify(values))
        goChangePasswordForm()
    });
    const [email, emailAttrs] = defineField('email');

    return {
        onSubmit,
        email,
        emailAttrs,
        errors
    }
}