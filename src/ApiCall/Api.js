import axiosConfig from "../axiosConfig";
export const _Get = async (URL, id, data) => {
  let response = await axiosConfig
    .get(`${URL}` + id, data)
    .then(res => res.data);
  return response;
};

export const _Post = async (URL, id, data) => {
  let response = await axiosConfig
    .get(`${URL}` + id, data)
    .then(res => res.data);
  return response;
};

export const _Put = async (URL, id, data) => {
  let response = await axiosConfig
    .get(`${URL}` + id, data)
    .then(res => res.data);
  return response;
};
export const _Delete = async (URL, id, data) => {
  let response = await axiosConfig
    .get(`${URL}` + id, data)
    .then(res => res.data);
  return response;
};
