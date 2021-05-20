import { baseURL } from "../server";
import fetch from "common/fetch";

export const getAllAdmin = (page, Token) => fetch(baseURL + "/admin/user/all?page=" + page, "GET", {}, { Token });

export const addAdmin = (data, Token) => fetch(baseURL + "/admin/user/add", "POST", data, { Token });

export const deleteAdmin = (data, Token) => fetch(baseURL + "/admin/user/delete", "DELETE", data, { Token });