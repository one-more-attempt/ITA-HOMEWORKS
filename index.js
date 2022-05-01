// import { initializeApp } from 'firebase/app';
// import { 
//     getAuth, 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword 
// } from 'firebase/auth';

// import { FIREBASE_CONFIG, AUTH_URL, DB_URL } from './src/api/api-config';
// import './style.scss';

// const app = initializeApp(FIREBASE_CONFIG);
// const auth = getAuth();

// // createUserWithEmailAndPassword(auth, 'test4@mail.com', '123456')
// //   .then((userCredential) => {
// //     // Signed in 
// //     const user = userCredential.user;
// //     console.log(userCredential);
// //     // ...
// //   })
// //   .catch((error) => {
// //     const errorCode = error.code;
// //     const errorMessage = error.message;
// //     // ..
// //     console.log(error);
// //   });

// // setTimeout(() => {
// //     fetch(
// //         AUTH_URL,
// //         {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 // 'Access-Control-Allow-Origin': '*'
// //             },
// //             body: JSON.stringify({
// //                 email: 'test4@mail.com',
// //                 password: 'auerlhmkas'
// //             })
// //         }
// //     )
// //         .then(response => console.log(response))
// //         .catch(err =>  console.log('Err', err));
// // }, 3000);



// // signInWithEmailAndPassword(auth, 'test@mail.com', '123456789')
// //   .then((userCredential) => {
// //     // Signed in 
// //     const user = userCredential.user;
// //     console.log(user);
// //     // ...
// //   })
// //   .catch((error) => {
// //     const errorCode = error.code;
// //     const errorMessage = error.message;
// //   });

// // const createTodo = () => {
// //     fetch(
// //         `${DB_URL}/todos.json`,
// //         {
// //             method: 'POST',
// //             body: JSON.stringify({
// //                 title: 'My todo 4',
// //                 description: 'Do smth 4'
// //             })
// //         }
// //     )
// //         .then(response => response.json())
// //         .then(res => console.log('RESPONSE: ', res));
// // }

// // createTodo();

// const getTodos = () => {
//     fetch(
//         `${DB_URL}/todos.json`,
//         {
//             method: 'GET'
//         }
//     )
//         .then(res => res.json())
//         .then(response => {
//             console.log(response);
//             console.log(Object.keys(response));
//             const arr = 
//                 Object.keys(response)
//                 .map(todoId => ({...response[todoId], id: key }));
//         });
// }

// getTodos();

/*
    {
        -Mster51s35stg: {
            title: 'raaar',
            description: 'aergaerge'
        },
        -Mster51s35stg: {
            title: 'raaar',
            description: 'aergaerge'
        },
        -Mster51s35stg: {
            title: 'raaar',
            description: 'aergaerge'
        },
    }
*/

/*
    [
        {
            title: 'aergaerger',
            description: 'argaergerg',
            id: -Mster51s35stg
        },
        {
            title: 'aergaerger',
            description: 'argaergerg',
            id: -Mster51s35stg
        },
    ]
*/

// const updateTodo = () => {
//     fetch(
//         `${DB_URL}/todos/-MySljroeY-uiTK5xiq5.json`,
//         {
//             method: 'PUT',
//             body: JSON.stringify({
//                 // title: 'Updated title',
//                 // description: 'Updated description'
//                 testField: 'Hello world!!!'
//             })
//         }
//     );
// }   

// updateTodo();

// const deleteTodo = () => {
//     fetch(
//         `${DB_URL}/todos/-MySljroeY-uiTK5xiq5.json`,
//         {
//             method: 'DELETE'
//         }
//     );
// }

// deleteTodo();

//CRUD

import { PATHNAMES, ROUTES } from './src/shared/constants/routes.js';
import { signInHandler } from './src/components/sign-in/sign-in.js';
import { signUpHandler } from './src/components/sign-up/sign-up';
import { mainPageHandler } from './src/components/main/main';
import { getToken, getUser } from './src/shared/services/local-storage-service.js';
import './src/styles/style.scss';

const routerMap = new Map([
    [PATHNAMES.home, () => window.location.href = ROUTES.sign_in],
    [PATHNAMES.sign_in, () => signInHandler()],
    [PATHNAMES.sign_up, () => signUpHandler()],
    [PATHNAMES.main, () => {
        !getToken() && !getUser() ? window.location.href = ROUTES.sign_in : mainPageHandler();
    }]
]);

window.onload = () => {
    const pathname = window.location.pathname;

    routerMap.get(pathname)();
}
