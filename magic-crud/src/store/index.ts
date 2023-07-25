import { configureStore, type Middleware} from "@reduxjs/toolkit";
import usersReducer, { UserWithId }  from './users/slice';
import {rollbackUser}  from './users/slice';
import { toast } from 'sonner';


const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()));
}

const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
    const { type, payload } = action;

    const previusState = store.getState();
    
    

    //Fase 1
    console.log({ type, payload})
    console.log({ action, state: store.getState() })
    next(action)

    if (type === 'users/addNewUser') {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            console.log(payload)
            toast.success(`User ${payload.name} created`);
        })
        .catch(err => {
            toast.error('Error creating user', err);
        }
        )
    }

    //edit user
    

    if (type === 'users/deleteUserById') {
        const userToRemove = previusState.users.find((user: UserWithId) => user.id === payload);

        fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
            method: 'DELETE'
            })
        .then(response => {
            console.log(response);
            if (response.ok) {
                console.log('ok');
                toast.success(`User ${payload} deleted`);
            }
        })
        .catch(err => {
            toast.error(`Error deleting user ${payload}`, err);
            if (userToRemove) {store.dispatch(rollbackUser(userToRemove))};
            toast.error('Error deleting user', err);
        }
        )
    }

    //Fase 2

}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;