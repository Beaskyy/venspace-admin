import Cookies from "js-cookie";

let token: string | undefined;
if (typeof window !== "undefined") {
  token = Cookies.get("token");
}
export default token;
