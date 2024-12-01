import { useRouter } from 'vue-router';
export async function useNavigation(){
    const router = useRouter();

    function backButton(){
        router.go(-1);
    }

    function goHome(){
        router.push('/')
    }

    function passchange(){
        router.push('/pass-reset')
    }

    function goChangePasswordForm(){
        router.push('/pass-form')
    }

    function goQr(){
        router.push(`/class-list/`);
    }
    function goDatePage(){
        router.push('/date-list')
    }

      

      
    return {
        goHome,
        passchange,
        goChangePasswordForm,
        backButton, 
        goQr,
        goDatePage
    };
}