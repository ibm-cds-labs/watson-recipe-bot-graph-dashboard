'use strict';

const express = require('express');
const cfenv = require('cfenv');
const dotenv = require('dotenv');
const GDS = require('ibm-graph-client');

const appEnv = cfenv.getAppEnv();
const app = express();

let snsApiUrl;
let snsApiKey;
let graphUrl;
let graphClient;

(function() {
    // load from .env
    dotenv.config();
    snsApiUrl = process.env.SNS_API_URL;
    if (snsApiUrl.endsWith('/')) {
        snsApiUrl = snsApiUrl.substring(0, snsApiUrl.length - 1);
    }
    snsApiKey = process.env.SNS_API_KEY;
    // create graph client
    let config;
    if (process.env.VCAP_SERVICES) {
        let vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        let graphService = 'IBM Graph';
        if (vcapServices[graphService] && vcapServices[graphService].length > 0) {
            config = vcapServices[graphService][0];
        }
    }
    graphUrl = process.env.GRAPH_API_URL || config.credentials.apiURL;
    graphUrl = graphUrl.substring(0, graphUrl.lastIndexOf('/') + 1) + process.env.GRAPH_ID;
    graphClient = new GDS({
        url: graphUrl,
        username: process.env.GRAPH_USERNAME || config.credentials.username,
        password: process.env.GRAPH_PASSWORD || config.credentials.password,
    });
    graphClient.session((error, token) => {
        graphClient.config.session = token;
    });
})();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index.ejs', {snsApiUrl: snsApiUrl, snsApiKey: snsApiKey});
});

app.get('/graph/:user', function(req, res) {
    let user = req.params.user;
    let query = `g.V().hasLabel("person").has("name", "${user}").union(outE().inV().hasLabel("ingredient"), outE().inV().hasLabel("cuisine"), outE().inV().outE().inV()).path()`;
    console.log('Querying graph: ' + query);
    graphClient.gremlin(`def g = graph.traversal(); ${query}`, (error, response) => {
        if (error) {
            res.send({success: false, error: error, data:[]});
        }
        else if (response.result && response.result.data && response.result.data.length > 0) {
            res.send({success: true, data:response.result.data});
        }
        else {
            res.send({success: true, data:[]});
        }
    });
});

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});
