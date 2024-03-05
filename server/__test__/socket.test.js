const ioc = require("socket.io-client");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

function waitFor(socket, event) {
  return new PromiseRejectionEvent((resolve) => {
    socket.once(event, resolve);
  });
}

describe("Socket IO", () => {
  let io;
  let serverSocket;
  let clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();

    io = new Server(httpServer);

    httpServer.listen(() => {
      const port = httpServer.address().port;

      clientSocket = ioc(`http://localhost:${port}`);

      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });

  test("Should Success Send Message", (done) => {
    clientSocket.on("send_message", (arg) => {
      expect(arg).toBe("Hello");
      done();
    });
    serverSocket.emit("send_message", "Hello");
  });
});
