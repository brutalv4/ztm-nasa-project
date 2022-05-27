const supertest = require("supertest");
const testApp = supertest(require("../../app"));

describe("GET /launches", () => {
  test("it should respond with 200", async () => {
    await testApp.get("/launches").expect("Content-type", /json/).expect(200);
  });
});

describe("POST /launches", () => {
  const launchDate = "Jan 17, 2030";

  const launchWithoutDate = {
    mission: "ZTM155",
    rocket: "ZTM Experimental IS1",
    target: "Kepler-186 f",
  };

  const launchWithInvalidDate = {
    ...launchWithoutDate,
    launchDate: "hello",
  };

  const completeLaunch = {
    ...launchWithoutDate,
    launchDate,
  };

  const timeStamp = (date) => new Date(date).valueOf();

  test("it should respond with 201", async () => {
    await testApp
      .post("/launches")
      .send(completeLaunch)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toMatchObject(launchWithoutDate);
        expect(timeStamp(body.launchDate)).toBe(timeStamp(launchDate));
      });
  });

  test("it should respond with 400 and error", async () => {
    await testApp
      .post("/launches")
      .send(launchWithoutDate)
      .expect(400)
      .expect(({ body }) =>
        expect(body).toStrictEqual({
          error: "Missing required props: launchDate",
        })
      );
  });

  test("it should catch invalid date", async () => {
    await testApp
      .post("/launches")
      .send(launchWithInvalidDate)
      .expect(400)
      .expect(({ body }) =>
        expect(body).toStrictEqual({
          error: "Invalid launch date: hello",
        })
      );
  });
});

describe("DELETE /launches", () => {
  test("should first", () => {
    expect(true).toBe(true);
  });
});
