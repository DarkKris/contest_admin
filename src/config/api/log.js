import { baseURL } from "../server";
import fetch from "common/fetch";

export const getSeverLog = Token => fetch(baseURL + "/admin/log/server", "GET", {}, { Token });

export const getErrorLog = Token => fetch(baseURL + "/admin/log/error", "GET", {}, { Token });
