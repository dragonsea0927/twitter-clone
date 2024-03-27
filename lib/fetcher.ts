import axios from "axios";

const fetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
};
export default fetcher;
