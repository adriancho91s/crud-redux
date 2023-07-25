import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


const DEFAULT_STATE = [
    {
        id: "1",
        name: "Adrián Gaitán",
        email: "holi@utp",
        github: "adriancho91s"
    },
    {
        id: "2",
        name: "Lena Whitehouse",
        email: "holi@utp",
        github: "lenawhitehouse"
    },
    {
        id: "3",
        name: "Phil Less",
        email: "holi@utp",
        github: "philess"
    },
    {
        id: "4",
        name: "John Camper",
        email: "holi@utp",
        github: "johncamper"
    }
];

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: UserId;
}



const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem('__redux__state__');
    if (persistedState) {
        return JSON.parse(persistedState).users;
    }
    return DEFAULT_STATE;
})();


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID();
            state.push({ id, ...action.payload });
        },
        editUserById: (state, action: PayloadAction<UserWithId>) => {
            const { id, ...userData } = action.payload;
            const userIndex = state.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                state[userIndex] = { id, ...userData };
            }
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter(user => user.id !== id);
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.find(user => user.id === action.payload.id);
            if (!isUserAlreadyDefined) {
                state.push(action.payload);
            }
        },
    },
}
);


export default usersSlice.reducer;

export const { addNewUser, deleteUserById, editUserById, rollbackUser } = usersSlice.actions;