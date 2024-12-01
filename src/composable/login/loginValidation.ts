import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '../../stores/authStore';

export function validation(){
    const router = useRouter();
    const authStore = useAuthStore();
    //Crear esquema 
    const schema = yup.object({
        email: yup.string()
        .email('Email no es válido')
        .matches(/@(profesor.duoc.cl|duocuc.cl)$/, 'Email no es valido.')
        .required('Email no es valido.'),
        password: yup.string()
        .min(8, 'La contraseña no es correcta')
        .required('La contraseña no es correcta')
        .matches(/[A-Z]/, 'La contraseña no es correcta.')
        .matches(/[°!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/, 'La contraseña no es correcta.'),
    });

    const {errors, handleSubmit, defineField} = useForm({
        validationSchema: schema,
    });
    const [email, emailAttrs] = defineField('email');
    const [password, passwordAttrs] = defineField('password');
/*
*    

*/
   const onSubmit = handleSubmit( async () => {
             const ok = await (await authStore).login(email.value, password.value);
        if(ok){
            router.push('/home-studen')
        }     
   });
    return {
        onSubmit,
        email,
        password,
        emailAttrs,
        passwordAttrs,
        errors
    }

}

export function passVisibility(){
    const isVisible = ref<boolean>(false);

    function toggleVisibility(){
        isVisible.value = !isVisible.value;
    }

    return {
        isVisible,
        toggleVisibility
    }
}