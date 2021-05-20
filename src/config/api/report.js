import { baseURL } from "../server";
import fetch from "common/fetch";

export const getAllReports = (page = 1, Token) => fetch(baseURL + "/admin/report/all?page=" + page, "GET", {}, { Token });

export const getReport = (id, Token) => fetch(baseURL + "/admin/report/info?id=" + id, "GET", {}, { Token });

export const setReportComplete = (report_id, Token) => fetch(baseURL + "/admin/report/update", "PUT", { report_id }, { Token });

export const getReportFile = (id, Token) => fetch(baseURL + "/admin/report/file?id=" + id, {}, { Token });