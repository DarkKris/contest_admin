import fetch from "common/fetch";
import { baseURL } from "../server";

export const getAllTeacher = (page, Token) => fetch(baseURL + "/admin/application/all?page=" + page, "GET", {}, { Token });

export const getTeacherFile = (uid, Token) => fetch(baseURL + "/admin/application/attachment?file-uid=" + uid, "GET", {}, { Token });

export const hanldeTeacherApply = (uid, agree, Token) => fetch(
  baseURL + "/admin/application/handle",
  "POST",
  {
    user_uid: uid,
    is_agree: agree
  },
  Token
);