import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(
  __dirname,
  "../share/protos/background/color.proto"
);
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const descriptor = grpc.loadPackageDefinition(packageDefinition) as any;

const backgroundColorProto = descriptor["background"]["color"] as any;
const BackgroundColorService =
  backgroundColorProto.BackgroundColorService as grpc.ServiceClientConstructor;

function changeBackgroundColor(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>
) {
  callback(null, { ok: true, new_rgb: call.request.rgb });
}

function startServer() {
  const server = new grpc.Server();

  // console.log(backgroundColorProto);
  server.addService(backgroundColorProto.BackgroundColor.service, {
    ChangeBackgroundColor: changeBackgroundColor,
  });

  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`gRPC server running at http://127.0.0.1:${port}`);
    }
  );
}

startServer();
