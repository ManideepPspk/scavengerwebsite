import {
  VIEW_BRANCH_DATA,
  VIEW_UNIQUEBRANCH_DATA,
  VIEW_AVAILABLE_BRANCHES,
  VIEW_UPDATED_NOTIFICATION,
  POST_BRANCH_DATA
} from "./types";

import BranchService from "../services/BranchService";


export const retrieveAllBranch = ( paramsData , callBack) => async (dispatch) => {
  try {
    const res = await BranchService.getBranch(paramsData);
    callBack(res.data);
    dispatch({
      type: VIEW_BRANCH_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    callBack({errorResponse: err});
      dispatch({
          type: VIEW_BRANCH_DATA,
          payload: { errorResponse: err},
      });
  }
};
export const retriveUniqueBranch = ( paramsData ) => async (dispatch) => {
  try {
    const res = await BranchService.getUniqueBranch(paramsData);
    dispatch({
      type: VIEW_UNIQUEBRANCH_DATA,
      payload: res.data,
    });
  } catch (err) {
      dispatch({
          type: VIEW_UNIQUEBRANCH_DATA,
          payload: { errorResponse: err},
      });
  }
};
export const getAvailableBranches = ( paramsData ,callBack ) => async (dispatch) => {
  try {
    const res = await BranchService.getAvailableBranches(paramsData);
    callBack(res.data);
    dispatch({
      type: VIEW_AVAILABLE_BRANCHES,
      payload: res.data,
    });
  } catch (err) {
      dispatch({
          type: VIEW_AVAILABLE_BRANCHES,
          payload: { errorResponse: err},
      });
  }
};
export const updatenotification = ( paramsData ,callBack ) => async (dispatch) => {
  try {
    const res = await BranchService.updatenotification(paramsData);
    callBack(res.data);
    dispatch({
      type: VIEW_UPDATED_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
      dispatch({
          type: VIEW_UPDATED_NOTIFICATION,
          payload: { errorResponse: err},
      });
  }
};
export const postBranch = ( paramsData ,callBack ) => async (dispatch) => {
  try {
    const res = await BranchService.postBranch(paramsData);
    callBack(res.data);
    dispatch({
      type: POST_BRANCH_DATA,
      payload: res.data,
    });
  } catch (err) {
      dispatch({
          type: POST_BRANCH_DATA,
          payload: { errorResponse: err},
      });
  }
};