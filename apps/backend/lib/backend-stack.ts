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

    const lambdaOXWebsocket = new TransactionsNodejsFunction(
      this,
      "OXWebsocket",
      "ox-websocket.ts"
    );

    oxTable.grantReadWriteData(lambdaUserGet);
    oxTable.grantReadWriteData(lambdaConnectionGet);
    oxTable.grantReadWriteData(lambdaOXWebsocket);

    new apigatewayv2.WebSocketApi(this, "OX Websocket API", {
      defaultRouteOptions: {
        integration: new WebSocketLambdaIntegration(
          "OX WebSocket",
          lambdaOXWebsocket
        ),
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
