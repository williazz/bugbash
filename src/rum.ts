import { AwsRum, AwsRumConfig } from "aws-rum-web";

/** Update these constants */
const APPLICATION_ID: string = "<YOUR APP MONITOR ID>";
const ENDPOINT_URL = "<YOUR ENDPOINT URL>";
/** Update these constants */

try {
  const APPLICATION_VERSION: string = "1.0.0";
  const APPLICATION_REGION: string = "eu-west-1";
  const config: AwsRumConfig = {
    signing: false,
    sessionSampleRate: 1,
    sessionEventLimit: 0,
    endpoint: ENDPOINT_URL,
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false,
  };

  const awsRum: AwsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
  console.error("RUM failed to initialize", error);
}
