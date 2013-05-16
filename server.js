// Require the module
var blobloadServer = require('./blobload.js'),
    fs = require('fs');

// Some defaults
var validConfig = true;
var httpProtocol = "https";
var httpOptions = {};
var port = 8080;

// Check if port is passed through script arguments
if(process.argv[2])
{
    // Make sure it's a number and greater than 0
    if(isNaN(process.argv[2]) || process.argv[2] < 1)
    {
        console.log("Port has to be a number greater than 0. Value given: " + process.argv[2]);

        validConfig = false;
    }
    else
    {
        port = process.argv[2];
    }
}

// Check if HTTP protocol is passed through script arguments
if(process.argv[3])
{
    // Make sure it's a number and greater than 0
    if(process.argv[3] == "http" || process.argv[3] == "https")
    {
        httpProtocol = process.argv[3];
    }
    else
    {
        console.log("HTTP protocol must be http or https. Value given: " + process.argv[3]);

        validConfig = false;
    }
}

// Options key and cert are required for HTTPS
if(httpProtocol == "https")
{
    var options =
    {
        key: fs.readFileSync('/path/to/key'),
        cert: fs.readFileSync('/path/to/cert'),
        // uncomment if passphrase needed
        //passphrase: ""
    };

    if(options.key == undefined || options.cert == undefined)
    {
        console.log("Invalid HTTPS options, please check the configuration in " + process.argv[1]);

        validConfig = false;
    }
}

// Subscribe to the "serverStarted" event
blobloadServer.eventDispatcher.on("serverStarted", function()
{
    // Server has started
    console.log(httpProtocol.toUpperCase() + " server started on port " + port);
});

// Set up the server if the configuration is valid

if(validConfig)
{
    blobloadServer.setup(httpProtocol, options, port, 0, 0, 3, 10, null, null, null).start();
}
