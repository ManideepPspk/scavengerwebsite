import http from "../http-common";

const getBranch = async paramsData => {
  //const axios = await httpClient()
  console.log(paramsData)
  return http.post("/api/login", paramsData);
};

const getUniqueBranch = async paramsData => {
  //const axios = await httpClient()
  console.log(paramsData , "etwe")
  return http.post("/api/getuniquebranch", paramsData);
};
const getAvailableBranches = async paramsData => {
  //const axios = await httpClient()
  console.log(paramsData , "etwe")
  return http.put("/api/getAvailableBranchesmany", paramsData);
};
const updatenotification = async paramsData => {
  return http.put("/api/updatenotification" , paramsData)
}
const BranchService = {
  getBranch,
  getUniqueBranch,
  getAvailableBranches,
  updatenotification
};

export default BranchService;
