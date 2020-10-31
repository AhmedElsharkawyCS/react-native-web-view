import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
export default function App() {
  const clientId = "";
  const html = `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: linear-gradient(180deg, #3d40ad 0%, #6b6ed7 100%);
      }
      .container {
        height: 100%;
        display: flex;
        margin-left: 20px;
        margin-right: 20px;
        overflow-y: scroll;
        justify-content: center;
        align-items: center;
      }
    </style>
    <script src="https://www.paypal.com/sdk/js?client-id=${clientId}"></script>
  </head>
  <body>
    <div class="container">
      <div id="paypal-button-container"></div>
    </div>
  </body>
</html>
`;
  const paypalScript = `
  // Render the PayPal button into #paypal-button-container
  window.paypal.Buttons({
      // Set up the transaction
      createOrder: function(data, actions) {
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: '0.01'
                  }
              }]
          });
      },
      // Finalize the transaction
      onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
              // Show a success message to the buyer
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
          });
      }
  }).render('#paypal-button-container');
  `;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ overflow: "scroll" }}
        source={{ html }}
        injectedJavaScript={paypalScript}
        originWhitelist={["*"]}
        mixedContentMode={"always"}
        thirdPartyCookiesEnabled={true}
        scrollEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabled={true}
      />
    </View>
  );
}
