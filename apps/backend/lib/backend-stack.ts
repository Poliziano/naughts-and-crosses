import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as path from "path";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const transactionsTable = new dynamodb.Table(this, "OXGame", {
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

    const lambdaTransactionGet = new TransactionsNodejsFunction(
      this,
      "UserGet",
      "user-get.ts"
    );

    const lambdaTransactionCreate = new TransactionsNodejsFunction(
      this,
      "ConnectionGet",
      "connection-get.ts"
    );

    transactionsTable.grantReadData(lambdaTransactionGet);
    transactionsTable.grantWriteData(lambdaTransactionCreate);
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
