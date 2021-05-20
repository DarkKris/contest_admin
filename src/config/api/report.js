import { baseURL } from "../server";
import fetch from "common/fetch";

export const getAllReports = (page = 1, Token) => fetch(baseURL + "/admin/report/all?page=" + page, "GET", {}, { Token });

export const setReportComplete = (report_id, Token) => fetch(baseURL + "/admin/report/update", "PUT", { report_id }, { Token });