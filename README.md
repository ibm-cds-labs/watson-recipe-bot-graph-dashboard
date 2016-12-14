# Watson Recipe Bot Dashboard

The Watson Recipe Bot Dashboard is a web application that shows conversations with the 
[Watson Recipe Bot](https://github.com/ibm-cds-labs/watson-recipe-bot-python-graph) as they are happening in realtime.
Here is a sample screenshot of the dashboard:

![Watson Recipe Bot Dashboard](screenshots/dashboard1.png?rev=2&raw=true)

### Quick Reference

The following environment variables are required to run the application:

```
GRAPH_API_URL=https://ibmgraph-alpha.ng.bluemix.net/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/g
GRAPH_USERNAME=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
GRAPH_PASSWORD=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
GRAPH_ID=watson_recipe_bot
SNS_API_URL=http://my-simple-notification-service.mybluemix.net
SNS_API_KEY=demokey
```
We will show you how to configure the necessary services and retrieve these values in the instructions below:

### Prerequisites

The following prerequisites are required to run the dashboard:

1. A running instance of the [Watson Recipe Bot (with IBM Graph)](https://github.com/ibm-cds-labs/watson-recipe-bot-python-graph).
2. A running instance of the [Simple Notification Service](https://github.com/ibm-cds-labs/simple-notification-service).

To run locally you will need Node.js 4.3.2 or greater.

To push your application to Bluemix from your local development environment you will need the [Bluemix CLI and Dev Tools](https://console.ng.bluemix.net/docs/starters/install_cli.html).

Before continuing please follow the instructions for setting up the Watson Recipe Bot w/ IBM Graph and the Simple Notification Service,
including setting up the appropriate Bluemix services such as IBM Graph and RethinkDB.

### Running the Dashboard Locally

If you haven't already installed Node.js you can install it by following the instructions [here](https://nodejs.org/en/).

From the command-line cd into the watson-recipe-bot-graph-dashboard directory (clone it first if you haven't already):

```
git clone https://github.com/ibm-cds-labs/watson-recipe-bot-graph-dashboard
cd watson-recipe-bot-graph-dashboard
```
 
Install dependencies:

```
npm install
```

Copy the .env.template file included in the project to .env. This file will contain the environment variable definitions:

```
cp .env.template .env
```

Copy and paste the following values from the .env file in your Watson Recipe Bot:

```
GRAPH_API_URL=https://ibmgraph-alpha.ng.bluemix.net/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/g
GRAPH_USERNAME=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
GRAPH_PASSWORD=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

In the .env file enter the URL for the Simple Notification Service. If you deployed the SNS to Bluemix it will look something like this:
 
```
SNS_API_URL=http://my-simple-notification-service.mybluemix.net
```

If you are running the SNS locally it will look something like this:

```
SNS_API_URL=http://localhost:6016
```

Follow the instructions in the **SNS API Key** section below to generate an SNS API Key. When generating the key use **localhost** as the Hostname.
This is the hostname for the client that will be connecting to the SNS (which is this application, the dashboard).
In this case we are running the dashboard locally. Once you have an SNS API Key add it to the .env file like so:

```
SNS_API_KEY=jCkGirEfu2ItNv
```

Start the dashboard:

```
npm start
```

Note the URL for your dashboard in the output:

```
server starting on http://localhost:6015
```

Open this URL in your browser and follow the **Watson Recipe Bot Configuration** steps below.

### Deploying the Dashboard to Bluemix

Instructions coming soon!

### SNS API Key

Once you have the Simple Notification Service running you will need to generate an API key that will be used by the Watson Recipe Bot and the dashboard.

1. Go to the Simple Notification Service in your web browser (ex: http://my-simple-notification-service.mybluemix.net/)
2. Click **Adminstration** in the left nav.
3. Enter *Add a New Key* and enter the host name. If you are running the dashboard locally use *localhost*.
If you are running the dashboard in Bluemix use your Bluemix path (ex. *my-simple-notification-service.mybluemix.net*).  

    ![SNS](screenshots/sns_apikey1.png?rev=1&raw=true)

4. You should see your API key show up under **Existing Keys**: 

    ![SNS](screenshots/sns_apikey2.png?rev=1&raw=true)
    
5. Take note of the key. You will use this to set the SNS_API_KEY variable in the .env files for the dashboard and the Watson Recipe Bot.


### Watson Recipe Bot Configuration

Stop your Watson Recipe Bot application if it is running. Edit the .env file and add the following entries:

```
SNS_API_URL=http://my-simple-notification-service.mybluemix.net
SNS_API_KEY=jCkGirEfu2ItNv
```

Set **SNS_API_URL** to the URL for your Simple Notification Service and set **SNS_API_KEY** to the SNS key generated above.

Restart your Watson Recipe Bot and start chatting with sous-chef.

### How It Works


