import {
  VIEW_BRANCH_DATA,
  VIEW_UNIQUEBRANCH_DATA,
  VIEW_AVAILABLE_BRANCHES,
  VIEW_UPDATED_NOTIFICATION
} from "../actions/types";

const initialState = [];

const branchreducer = (branch, action) => {
  if( branch === undefined) {
    branch = initialState;
  }
  const { type, payload } = action;

  switch (type) {
   
    case VIEW_BRANCH_DATA:
      return {...branch,"viewAllbranch": payload };
      case VIEW_UNIQUEBRANCH_DATA:
      return {...branch,"viewUniquebranch": payload };
      case VIEW_AVAILABLE_BRANCHES:
      return {...branch,"viewavailablebranches":payload};
      case VIEW_UPDATED_NOTIFICATION:
        return {...branch,"updatednotification": payload};
    default:
      return branch;
  }
};

export default branchreducer;