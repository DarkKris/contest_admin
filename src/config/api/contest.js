import { baseURL } from "../server";
import fetch from "common/fetch";

export const addContestType = (data, Token) => fetch(baseURL + "/admin/type/add", "POST", data, { Token });

export const deleteContestType = (data, Token) => fetch(baseURL + "/admin/type/delete", "DELETE", data, { Token });

export const getContestList = (page = 1, Token) => fetch(baseURL + "/admin/type/file?page=" + page, "GET", {}, { Token });

export const getContestTypeList = (page = 1, Token) => fetch(baseURL + "/public/match-type?page=" + page, "GET", {}, { Token });