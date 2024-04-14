import net from "net";

if (process.argv.length !== 3) console.log("Please, provide a filename.");
else {
  const client = net.connect({ port: 8000 });
  const filename = process.argv[2];
  console.log("Filename:", filename);

  // wc -l lines, wc -m char, wc -w words

  const jsonData = JSON.stringify({ filename: filename });

  client.write(jsonData);

  client.on("data", (data) => {
    console.log(data.toString());
  });
}
