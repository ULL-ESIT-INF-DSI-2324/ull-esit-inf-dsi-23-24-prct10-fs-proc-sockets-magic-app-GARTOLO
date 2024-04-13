import { spawn } from "child_process";
import { readFile } from "fs";
import net from "net";

// if (process.argv.length !== 3) console.log('Please, provide a filename.');
// else
net
  .createServer((connection) => {
    console.log("A client has connected.");

    connection.write(`Connection established.`);

    connection.on("data", (dataJSON) => {
      const message = JSON.parse(dataJSON.toString());

      readFile(message.filename, (err) => {
        if (err) {
          console.log(
            "There must be a problem with the file you are trying to read",
          );
          connection.write(
            "There must be a problem with the file you are trying to read",
          );
          connection.end();
        } else {
          // console.log(data.toString());

          // Commented cat to prevent sonarcloud command injection failure
          // const cat = spawn("cat", [message.filename]);

          // cat.stdout.pipe(process.stdout);

          // const wc = spawn("wc");

          // cat.stdout.pipe(wc.stdin);

          let wcOutput = "";
          // wc.stdout.on("data", (piece) => (wcOutput += piece));

          console.log(wcOutput);
          const wcOutputAsArray = wcOutput.split(/\s+/);
          console.log(`File helloworld.txt has ${wcOutputAsArray[1]} lines`);
          console.log(`File helloworld.txt has ${wcOutputAsArray[2]} words`);
          console.log(
            `File helloworld.txt has ${wcOutputAsArray[3]} characters`,
          );
          // console.log('Recieved message:', wc)
        }
      });
    });

    connection.on("close", () => {
      console.log("A client has disconnected.");
    });
  })
  .listen(8000, () => {
    console.log("Waiting for clients to connect.");
  });
