import express from "express";
import LinesManager from "./LinesManager";

export default function App(manager: LinesManager) {
  const app = express();

  app.get("/states", async (req, res) => {
    try {
      const lines = await manager.getLines();
      const nichandle = await manager.getNichandle();
      res.send({ nichandle, lines });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.put("/forward", async (req, res) => {
    try {
      await manager.setForward(req.query["line"], req.query["to"]);
      res.send({ ok: true });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.use(express.static("public"));
  return app;
}
