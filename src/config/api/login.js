import fetch from "common/fetch";
import { baseURL } from "../server";

export const adminLogin = data => fetch(baseURL + "/public/login/admin", "POST", data);

export const sendCaptcha = data => fetch(baseURL + "/public/captcha", "POST", data);