const _ = require("lodash");
const path = require("path");
const request = require("supertest");

const db = require("../../models");
const userApi = require("../../server/api/user");
const userListData = require("../fixtures/userListData.json");
const userDetailData = require("../fixtures/userDetailData.json");
const generalHelper = require("../../server/helpers/generalHelper");
const userCustomerDetailData = require("../fixtures/userCustomerDetailData.json");

let apiUrl;
let server;

let mockAllUser;
let mockUserDetail;
let mockUserCustomerDetail;

let getAllUser;
let getUserDetail;
let postUserRegister;
let patchUpdateUser;
let deleteUser;

let id;
let role;
let header;
let payload;
let imagePath;

describe("List", () => {
  beforeAll(() => {
    apiUrl = "/user";

    server = generalHelper.createTestServer("/user", userApi);

    header = {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLTEiLCJlbWFpbCI6ImZhaG1pQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiRmFobWkgRWZlbmR5Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA4MzU1ODQ2LCJleHAiOjE3MDg0NDIyNDZ9.A-vZS1iT0VRWpxeYvI-OIGrGy89sKlvZg_en_ExPwj4",
    };
  });

  afterAll(async () => {
    await server.close();
  });

  describe("POST User Register", () => {
    beforeEach(() => {
      payload = {
        email: "U2FsdGVkX1/zkKxmGTrsZ0nFKVWrrKSN0jwcjdeGCmU=", // john123@gmail.com
        fullName: "U2FsdGVkX1+1jXTSACFF/8Vq1cDgLKbd/IZ0/2oqI2o=", // John Doe
        password: "U2FsdGVkX1+2c9z0bjcubCIzGsbhMqur8Wqx2sAhhyA=", // john123
        confirmPassword: "U2FsdGVkX1+2c9z0bjcubCIzGsbhMqur8Wqx2sAhhyA=", // john123
        role: "admin",
      };

      getUserDetail = jest.spyOn(db.Users, "findOne");
      postUserRegister = jest.spyOn(db.Users, "create");
    });

    test("Should Return 201: POST Register Success", async () => {
      postUserRegister.mockResolvedValue("Success");

      await request(server)
        .post(`${apiUrl}/register`)
        .send(payload)
        .expect(201)
        .then((res) => expect(res.body.data).toBeTruthy());
    });

    test("Should Return 400: POST Register Failed Because Email Exist", async () => {
      getUserDetail.mockResolvedValue({
        email: "U2FsdGVkX1/zkKxmGTrsZ0nFKVWrrKSN0jwcjdeGCmU=",
      });
      postUserRegister.mockResolvedValue("Success");

      await request(server)
        .post(`${apiUrl}/register`)
        .send(payload)
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });

    test("Should Return 400: POST Request Failed Because Empty Payload", async () => {
      postUserRegister.mockResolvedValue("Failed");

      await request(server)
        .post(`${apiUrl}/register`)
        .send({})
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });
  });

  describe("POST User Login", () => {
    beforeEach(() => {
      payload = {
        email: "U2FsdGVkX1/vLZ8sctRiqnZwhYPzSbZ1RJYpL3/4qUU=", // fahmi@gmail.com
        password: "U2FsdGVkX19wJmBiuN/hcpO1CsGxXWs7VNfq4NdkLGI=", // fahmi123
      };
    });

    test("Should Return 200: POST Login Success", async () => {
      getUserDetail.mockResolvedValue(userDetailData);

      await request(server)
        .post(`${apiUrl}/login`)
        .send(payload)
        .expect(200)
        .then((res) => expect(res.body.message).toBe("Successfully Login"));
    });

    test("Should Return 400: POST Login Failed Because Email Not Found", async () => {
      getUserDetail.mockResolvedValue([]);

      payload = {
        ...payload,
        email: "U2FsdGVkX1/zkKxmGTrsZ0nFKVWrrKSN0jwcjdeGCmU=", // john123@gmail.com
      };

      await request(server)
        .post(`${apiUrl}/login`)
        .send(payload)
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });

    test("Should Return 400: POST Login Failed Because Invaid Password", async () => {
      getUserDetail.mockResolvedValue(userDetailData);

      payload = {
        ...payload,
        password: "U2FsdGVkX1+2c9z0bjcubCIzGsbhMqur8Wqx2sAhhyA=", // john123
      };

      await request(server)
        .post(`${apiUrl}/login`)
        .send(payload)
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });

    test("Should Return 400: POST Login Failed Because Empty Payload", async () => {
      await request(server)
        .post(`${apiUrl}/login`)
        .send({})
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });
  });

  describe("GET User List", () => {
    beforeEach(() => {
      mockAllUser = _.cloneDeep(userListData);
      getAllUser = jest.spyOn(db.Users, "findAll");

      role = "admin";
    });

    test("Should Return 200: GET All User Success", async () => {
      getAllUser.mockResolvedValue(mockAllUser);

      await request(server)
        .get(`${apiUrl}/list`)
        .expect(200)
        .then((res) => expect(res.body.data.length).toBe(3));
    });

    test("Should Return 404: GET All List Based on Role Success But Empty", async () => {
      getAllUser.mockResolvedValue([]);

      await request(server)
        .get(`${apiUrl}/list?role=${role}`)
        .expect(404)
        .then((res) => expect(res.body.error).toBe("Not Found"));
    });

    test("Should Return 404: GET All List Success But Empty", async () => {
      getAllUser.mockResolvedValue([]);

      await request(server)
        .get(`${apiUrl}/list`)
        .expect(404)
        .then((res) => expect(res.body.message).toBe("No user found!"));
    });
  });

  describe("GET User Detail", () => {
    beforeEach(() => {
      mockUserDetail = _.cloneDeep(userDetailData);
      getUserDetail = jest.spyOn(db.Users, "findOne");

      id = "9bfea02b-26df-458c-b383-8b76be623bb0";
    });

    test("Should Return 200: GET User Detail", async () => {
      getUserDetail.mockResolvedValue(mockUserDetail);

      await request(server)
        .get(`${apiUrl}/detail/${id}`)
        .expect(200)
        .then((res) => expect(res.body.data.id).toBe(id));
    });

    test("Should Return 404: GET User Detail Because User Not Found", async () => {
      getUserDetail.mockResolvedValue(null);

      await request(server)
        .get(`${apiUrl}/detail/1234567890`)
        .expect(404)
        .then((res) => expect(res.body.error).toBe("Not Found"));
    });
  });

  describe("PATCH Update User", () => {
    beforeEach(() => {
      id = "9bfea02b-26df-458c-b383-8b76be623bb0";
      imagePath = path.join(__dirname, "profile.jpg");
      payload = {
        fullName: "Fahmi Efendy Edited",
      };

      mockUserDetail = _.cloneDeep(userDetailData);
      getUserDetail = jest.spyOn(db.Users, "findOne");
      patchUpdateUser = jest.spyOn(db.Users, "update");
    });

    test("Should Return 201: PATCH Update User Success", async () => {
      getUserDetail.mockResolvedValue(mockUserDetail);
      patchUpdateUser.mockResolvedValue("Success");

      await request(server)
        .patch(`${apiUrl}/update/${id}`)
        .set(header)
        .field("fullName", payload.fullName)
        .attach("image", imagePath)
        .expect(200)
        .then((res) => expect(res.body.data).toBeTruthy());
    });

    test("Should Return 404: PATCH Update Failed Because User Not Found", async () => {
      getUserDetail.mockResolvedValue([]);
      patchUpdateUser.mockResolvedValue("Failed");

      id = "admin-1234567890";

      await request(server)
        .patch(`${apiUrl}/update/${id}`)
        .set(header)
        .field("fullName", payload.fullName)
        .attach("image", imagePath)
        .expect(404)
        .then((res) => expect(res.body.error).toBe("Not Found"));
    });

    test("Should Return 400: PATCH Update Failed Because Empty Payload", async () => {
      patchUpdateUser.mockResolvedValue("Failed");

      await request(server)
        .patch(`${apiUrl}/update/${id}`)
        .set(header)
        .send({})
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });

    test("Should Return 500: PATCH Update Failed Because Invalid MIME Type", async () => {
      getUserDetail.mockResolvedValue([]);
      patchUpdateUser.mockResolvedValue("Failed");

      imagePath = path.join(__dirname, "text.txt");

      await request(server)
        .patch(`${apiUrl}/update/${id}`)
        .set(header)
        .field("fullName", payload.fullName)
        .attach("image", imagePath)
        .expect(500);
    });

    test("Should Return 401: PATCH Update Failed Because Invalid Token", async () => {
      getUserDetail.mockResolvedValue([]);
      patchUpdateUser.mockResolvedValue("Failed");

      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLTEiLCJlbWFpbCI6ImZhaG1pQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiRmFobWkgRWZlbmR5Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA4MzYyNTc0LCJleHAiOjE3MDgzNjI1NzR9.SCnkwuCg7u-yH_jUBg0flqZRuOVqW2uyWpzodGaE-Vw", // Expired Token
      };

      await request(server)
        .patch(`${apiUrl}/update/${id}`)
        .set(header)
        .field("fullName", payload.fullName)
        .attach("image", imagePath)
        .expect(401)
        .then((res) =>
          expect(JSON.parse(res.error.text).error).toBe("Unauthorized")
        );
    });
  });

  describe("PATCH Change Password", () => {
    beforeEach(() => {
      id = "9bfea02b-26df-458c-b383-8b76be623bb0";
      payload = {
        oldPassword: "U2FsdGVkX1+7XUpI7gzp0gccUmdgtZo3DwjcFTn9NOA=", // fahmi123
        newPassword: "U2FsdGVkX18NXwyAj7KLzzfduPexfPx7ImUSpL64nEk=", // fahmi456
        confirmNewPassword: "U2FsdGVkX18NXwyAj7KLzzfduPexfPx7ImUSpL64nEk=", // fahmi456
      };
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLTEiLCJlbWFpbCI6ImZhaG1pQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiRmFobWkgRWZlbmR5Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA4MzU1ODQ2LCJleHAiOjE3MDg0NDIyNDZ9.A-vZS1iT0VRWpxeYvI-OIGrGy89sKlvZg_en_ExPwj4",
      };

      getUserDetail = jest.spyOn(db.Users, "findOne");
      patchUpdateUser = jest.spyOn(db.Users, "update");
    });

    test("Should Return 200: PATCH Change Password Success", async () => {
      getUserDetail.mockResolvedValue(userDetailData);
      patchUpdateUser.mockResolvedValue("Success");

      await request(server)
        .patch(`${apiUrl}/change-password/${id}`)
        .set(header)
        .send(payload)
        .expect(200)
        .then((res) =>
          expect(res.body.message).toBe("Successfully Change User's Password")
        );
    });

    test("Should Return 404: PATCH Change Password Failed Because User Not Found", async () => {
      getUserDetail.mockResolvedValue([]);
      patchUpdateUser.mockResolvedValue("Failed");

      await request(server)
        .patch(`${apiUrl}/change-password/${id}`)
        .set(header)
        .send(payload)
        .expect(404)
        .then((res) => expect(res.body.error).toBe("Not Found"));
    });

    test("Should Return 400: PATCH Change Password Failed Because Old Password Invalid", async () => {
      getUserDetail.mockResolvedValue(userDetailData);
      patchUpdateUser.mockResolvedValue("Failed");

      payload = {
        ...payload,
        oldPassword: "U2FsdGVkX18NXwyAj7KLzzfduPexfPx7ImUSpL64nEk=", // fahmi456
      };

      await request(server)
        .patch(`${apiUrl}/change-password/${id}`)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });

    test("Should Return 400: PATCH Change Password Failed Because Empty Payload", async () => {
      patchUpdateUser.mockResolvedValue("Failed");

      await request(server)
        .patch(`${apiUrl}/change-password/${id}`)
        .set(header)
        .send({})
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });
  });

  describe("DELETE User", () => {
    beforeEach(() => {
      id = "ca9ff788-cdbe-4d9a-8139-5e5308748758";

      mockUserCustomerDetail = _.cloneDeep(userCustomerDetailData);
      getUserDetail = jest.spyOn(db.Users, "findOne");
      deleteUser = jest.spyOn(db.Users, "destroy");
    });

    test("Should Return 200: DELETE User Success", async () => {
      getUserDetail.mockResolvedValue(mockUserCustomerDetail);
      deleteUser.mockResolvedValue("Success");

      await request(server)
        .delete(`${apiUrl}/delete/${id}`)
        .set(header)
        .expect(200)
        .then((res) => console.log(res.body));
    });

    test("Should Return 401: DELETE User Failed Because Unauthorized", async () => {
      getUserDetail.mockResolvedValue([]);
      deleteUser.mockResolvedValue("Failed");

      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNlbGxlci0xIiwiZW1haWwiOiJmYWhtaV9zZWxsZXJAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJGYWhtaSBFZmVuZHkiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzA4MzU3NjQwLCJleHAiOjE3MDg0NDQwNDB9.JrJ3tXqekFp7Qxw3ZWfCf-tSdbrZkmP4lZN0P3cpM-A", // fahmi_seller@gmail.com
      };

      await request(server)
        .delete(`${apiUrl}/delete/${id}`)
        .set(header)
        .expect(401)
        .then((res) => expect(res.body.error).toBe("Unauthorized"));
    });

    test("Should Return 404: DELETE User Failed Because User Not Found", async () => {
      getUserDetail.mockResolvedValue([]);
      deleteUser.mockResolvedValue("Failed");

      id = "customer-1234567890";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLTEiLCJlbWFpbCI6ImZhaG1pQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiRmFobWkgRWZlbmR5Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA4MzU1ODQ2LCJleHAiOjE3MDg0NDIyNDZ9.A-vZS1iT0VRWpxeYvI-OIGrGy89sKlvZg_en_ExPwj4", // fahmi@gmail.com
      };
      await request(server)
        .delete(`${apiUrl}/delete/${id}`)
        .set(header)
        .expect(400)
        .then((res) => expect(res.body.error).toBe("Bad Request"));
    });
  });
});
