import supertest from "supertest";
import api from "../api.js";
import "../config/database.js";

const request = supertest(api);

export default request;
