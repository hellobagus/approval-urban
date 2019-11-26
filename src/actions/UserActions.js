import UserController from '../controllers/UserController';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  
  CHANGEPASS: 'CHANGEPASS',
  CHANGEPASS_REQUEST: 'CHANGEPASS_REQUEST',
  CHANGEPASS_ERROR: 'CHANGEPASS_ERROR',
  CHANGEPASS_SUCCESS: 'CHANGEPASS_SUCCESS',

  EDIT : 'EDIT'
};

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
});

const changePassRequest = () => ({
  type: actionTypes.CHANGEPASS_REQUEST,
});

const changePassError = error => ({
  type: actionTypes.CHANGEPASS_ERROR,
  error,
});

const changePassSuccess = user => ({
  type: actionTypes.CHANGEPASS_SUCCESS,
  user,
});

const editRequest = () => ({
  type: actionTypes.EDIT,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await UserController.login(email, password);
    dispatch(loginSuccess(user.Data));
  } catch (error) {
    dispatch(loginError(error));
  }
};

export const logout = () => (dispatch) => {
  UserController.logout();
  dispatch(logoutRequest());
};

export const saveProfile = (data) => async (dispatch) => {
  const res = await UserController.saveProfile(data);
  alert(res.Pesan)
  dispatch(editRequest());
};

export const changePass = (email,pass,conpass) => async (dispatch) => {
  dispatch(changePassRequest());
  try {
    const res = await UserController.changePassword(email,pass,conpass);
    alert(res.Pesan)
    dispatch(changePassSuccess(res.Data));
  } catch (error) {
    dispatch(changePassError(error));
  }
};