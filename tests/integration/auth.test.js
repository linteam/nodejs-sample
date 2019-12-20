const { User } = require("../../models/user");
const { Genre } = require("../../models/genre");
const request = require("supertest"); //request gondermek icin.

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../index");
    token = new User().generateAuthToken();
  });
  afterEach(async () => {
    await Genre.remove({});
    await server.close();
  });

  let token;
  //Happy path'i yaziyorum. Olumsuz alternatifleri tanimlandigim genel degiskenleri
  //degistirerek veriyorum.
  const exec = () => {
    return request(server)
      .post("/api/genres") //istekleri genres'a yapiyoruz ama auth middleware'den gelecek cevaplar.
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  it("should return 401 if no token is provided", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
