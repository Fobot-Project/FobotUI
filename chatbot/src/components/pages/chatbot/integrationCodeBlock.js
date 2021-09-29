import { CopyBlock, googlecode } from "react-code-blocks";
import { Paper } from "@material-ui/core";
import React from "react";

export default function IntegrationCodeBlock(props) {
  const code = `<df-messenger
    intent="WELCOME"
    chat-title="test-bot"
    agent-id="726c85cc-ff28-494b-baaf-e439a6e65d09"
    user-id=\"${props.chatPath}\"
    language-code="en">
</df-messenger>`;
  return (
    <Paper elevation={3}>
      <CopyBlock
        language="javascript"
        text={code}
        codeBlock
        theme={googlecode}
        showLineNumbers={false}
        wrapLines
      />
    </Paper>
  );
}
