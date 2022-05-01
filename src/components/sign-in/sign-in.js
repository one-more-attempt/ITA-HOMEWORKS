import { getUsers, signInRequest } from '../../api/api-handlers';
import { ROUTES } from '../../shared/constants/routes';
import { setToken, setUser } from '../../shared/services/local-storage-service';

export const signInHandler = () => {
    const signInBtn = document.getElementById('signInBtn');
    const passwordInput = document.getElementById('passwordInput');
    const emailInput = document.getElementById('emailInput');
    const userData = {
        email: '',
        password: ''
    }
    
    passwordInput.oninput = () => {
        userData.password = passwordInput.value;
        checkFormValid();
    }
    
    emailInput.oninput = () => {
        userData.email = emailInput.value;
        checkFormValid();
    }
    
    signInBtn.onclick = async () => {
        let userId = '';

        await signInRequest(userData)
            .then(({ user: { accessToken, uid } }) => {
                setToken(accessToken);
                userId = uid; 
            })
            .catch(err => console.log('Invalid credentials'));
        await getUsers()
            .then(response => {
                const users = 
                    Object.keys(response)
                    .map(userId => ({...response[userId], userId }));                
                const user = users.find(user => user.authId === userId);

                setUser(user);
                window.location.href = ROUTES.main;   
            });
    }
    
    const checkFormValid = () => {
        const isFormValid = Object.values(userData).every(value => !!value);
    
        isFormValid ?
            signInBtn.removeAttribute('disabled') :
            signInBtn.setAttribute('disabled', true);
    }
}
