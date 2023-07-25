import { User, UserId, UserWithId, addNewUser, deleteUserById, editUserById } from '../store/users/slice';
import { useAppDispatch } from './store';

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const addUser = ({name, email, github}: User ) => {
        dispatch(addNewUser({name, email, github}));
    }

    //edit user

    const editUser = ({id, name, email, github}: UserWithId ) => {
        dispatch(editUserById({id, name, email, github}));
    }

    const removeUser = (id: UserId ) => {
        dispatch(deleteUserById(id));
    };

    return { addUser, removeUser, editUser };
}