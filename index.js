const express = require("express");

const app = express();

app.use(express.json());

app.get("/HNG/api", (req, res)=>{
    const {slack_name, track} = req.query;
    const date = new Date();

    

    const data = {
        slack_name:slack_name,
        current_day: date.toLocaleString('en-us', {  weekday: 'long' }),
        utc_time: date.toISOString().replace(/.\d+Z$/g, "Z"),
        track:track,
        github_file_url: "https://github.com/chigozieokoroafor/HNGs1/blob/main/stage1/index.js",
        github_repo_url: "https://github.com/chigozieokoroafor/HNGs1",
        status_code:200
    }
    return res.send(data).status(200);
});

app.listen(10000, ()=>{

})