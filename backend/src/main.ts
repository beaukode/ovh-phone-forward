import OvhClient from "./OvhClient";
import LinesManager from "./LinesManager";
import App from "./App";

const port = process.env["HTTP_PORT"] || 8080;
const appKey = "treQvljyq4MpqDbR";
const appSecret = "VlTFMKsJwXAA3YeKL6WNNP0KXX0UghCF";
const consumerKey = process.env["OVH_CONSUMER_KEY"] || undefined;

declare const module: any;

async function main() {
  const client = new OvhClient(appKey, appSecret, consumerKey);
  const manager = new LinesManager(client);
  const nichandle = await manager.getNichandle();
  console.log("Connected to NIChandle:", nichandle);

  const app = App(manager);
  const server = app.listen(port, () => {
    console.log(`Server ready at : http://localhost:${port}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

main();
