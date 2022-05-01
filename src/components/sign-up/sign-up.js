import { 
    createUserAuthRequest, 
    createUserDataRequest,
    signInRequest,
    getUser 
} from '../../api/api-handlers';
import { ROUTES } from '../../shared/constants/routes';
import { setToken, setUser } from '../../shared/services/local-storage-service';

export const signUpHandler = () => {
    const firstNameInput = document.getElementById('firstNameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const birthInput = document.getElementById('birthInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput1 = document.getElementById('passwordInput1');
    const passwordInput2 = document.getElementById('passwordInput2');
    const signUpBtn = document.getElementById('signUpBtn');

    const userData = {
        firstName: '',
        lastName: '',
        birt: '',
        email: '',
        password_1: '',
        password_2: ''
    };

    firstNameInput.oninput = () => {
        userData.firstName = firstNameInput.value;
        checkFormValid();
    }

    lastNameInput.oninput = () => {
        userData.lastName = lastNameInput.value;
        checkFormValid();
    }

    birthInput.oninput = () => {
        userData.birt = birthInput.value;
        checkFormValid();
    }

    emailInput.oninput = () => {
        userData.email = emailInput.value;
        checkFormValid();
    }

    passwordInput1.oninput = () => {
        userData.password_1 = passwordInput1.value;
        checkFormValid();
    }

    passwordInput2.oninput = () => {
        userData.password_2 = passwordInput2.value;
        checkFormValid();
    }

    signUpBtn.onclick = async () => {     
        const { email, password_1: password } = userData;
        let authId = '';
        let userId = '';

        await createUserAuthRequest(userData)
            .then(response => authId = response.user.uid);
        await createUserDataRequest({...userData, authId})
            .then(res => userId = res.name);
        await signInRequest({email, password})
            .then(({ user: { accessToken } }) => setToken(accessToken))
            .catch(err => console.log('Invalid credentials'));
        await getUser(userId).then(res => {
            setUser(res);
            window.location.href = ROUTES.main;
        });
    }

    const checkFormValid = () => {
        const isFormValid = Object.values(userData).every(value => !!value);
        const isPasswordsEqual = userData.password_1 === userData.password_2;

        isFormValid && isPasswordsEqual ?
            signUpBtn.removeAttribute('disabled') :
            signUpBtn.setAttribute('disabled', true);
    }
    
}
