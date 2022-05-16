import * as apigatewayv2 from "@aws-cdk/aws-apigatewayv2-alpha";
import { WebSocketLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { Stack, StackProps } from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const oxTable = new dynamodb.Table(this, "OXGame", {
      partitionKey: {
        name: "PK",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: dynamodb.AttributeType.STRING,
      },
      tableName: "OXGame",
    });

    const lambdaUserGet = new TransactionsNodejsFunction(
      this,
      "UserGet",
      "user-get.ts"
    );

    const lambdaConnectionGet = new TransactionsNodejsFunction(
      this,
      "ConnectionGet",
      "connection-get.ts"
    );

    const lambdaRoomCreate = new TransactionsNodejsFunction(
      this,
      "RoomCreate",
      "room-create.ts"
    );

    const lambdaOXWebsocket = new TransactionsNodejsFunction(
      this,
      "OXWebSocket",
      "ox-websocket.ts"
    );

    oxTable.grantWriteData(lambdaUserGet);
    oxTable.grantWriteData(lambdaRoomCreate);
    oxTable.grantReadData(lambdaConnectionGet);
    oxTable.grantReadWriteData(lambdaOXWebsocket);

    const api = new apigatewayv2.WebSocketApi(this, "OX WebSocket API", {
      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "OX WebSocket Default",
          lambdaOXWebsocket
        ),
      },
      connectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "OX WebSocket Connect",
          lambdaOXWebsocket
        ),
      },
      disconnectRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "OX WebSocket Disconnect",
          lambdaOXWebsocket
        ),
      },
    });
    new apigatewayv2.WebSocketStage(this, "OX WebSocket API Prod", {
      webSocketApi: api,
      autoDeploy: true,
      stageName: "prod",
      throttle: {
        rateLimit: 100,
        burstLimit: 10,
      },
    });
  }
}

class TransactionsNodejsFunction extends NodejsFunction {
  constructor(scope: any, id: string, filename: string) {
    super(scope, id, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "handler",
      entry: path.resolve(__dirname, "lambda", filename),
    });
  }
}
