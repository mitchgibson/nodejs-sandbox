import http from "http";

const server = http.createServer((req, res) => {
    if (req.method === "GET") return get(req, res);

    if (req.method === "POST") return post(req, res);

    res.statusCode = 404;
    res.end("Not Found");
});

const get = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World! - GET");
};

const post = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    // return body received in json body
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        res.end(body);
    });
};

server.listen(3000, "localhost", () => {
    console.log("Server running on port 3000");
});
