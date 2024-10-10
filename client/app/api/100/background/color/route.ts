import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { NextResponse } from "next/server";

const PROTO_PATH = path.join(
  process.cwd(),
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawRgb = searchParams.get("rgb");
  console.log("rawRgb", rawRgb);
  const rgb = parseInt(rawRgb!, 16);

  return new Promise((resolve) => {
    const client = new backgroundColorProto.BackgroundColor(
      "localhost:50051",
      grpc.credentials.createInsecure()
    );

    client.ChangeBackgroundColor({ rgb: rgb }, (err: any, response: any) => {
      if (err) {
        resolve(
          NextResponse.json(
            { error: "Error connecting to gRPC server." },
            { status: 500 }
          )
        );
        return;
      }

      resolve(NextResponse.json(response));
    });
  });
}
