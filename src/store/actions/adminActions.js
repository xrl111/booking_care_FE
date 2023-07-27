import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService } from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });


// GENDER ACTION
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed());

            console.log('fetchGenderStart', e);
        }
    }


};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});


//POSITION ACTION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed());

            console.log('fetchPositionStart', e);
        }
    }


};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

//ROLE Actions
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })

            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed());

            console.log('fetchRoleStart', e);
        }
    }


};

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

//CREATE new user action
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Created new user successfully!!');
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                // toast.error();
                dispatch(createUserFailed());
            }

        } catch (e) {
            dispatch(createUserFailed());
            console.log('Save user fail', e);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {

                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }
            else {
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log(e)
        }
    }


};

export const fetchAllUsersSuccess = (UserData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: UserData
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Deleted user successfully!!");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("User deleted failed!!");
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log('Delete User Failed', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
}
)
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})