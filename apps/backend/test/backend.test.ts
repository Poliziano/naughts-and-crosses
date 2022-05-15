import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { BackendStack } from "../lib/backend-stack";

let template: any;

beforeAll(() => {
  const app = new cdk.App();
  const stack = new BackendStack(app, "test");
  template = Template.fromStack(stack);
});

test("should be defined", () => {
  expect(template).toBeDefined();
});
