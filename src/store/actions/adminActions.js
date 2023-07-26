import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

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