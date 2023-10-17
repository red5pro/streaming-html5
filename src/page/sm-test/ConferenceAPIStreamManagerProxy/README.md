# Conference Chat

This example demonstrates multi-party communication using Red5 Pro and the Conference API.

The Conference Webapp and corresponding API was released in the 11.3.1 distribution. [11.3.1 Release Notes](https://www.red5.net/docs/releasenotes/red5pro-server-releasenotes/Release-11.3.1/). Along with installation instructions, it can be found in the `extras/` directory of the server distrubution.

## Basic Publisher

**Please refer to the [Basic Publisher Documentation](../publishStreamManagerProxy/README.md) to learn more about the basic setup of a publisher.**

## Basic Subscriber

**Please refer to the [Basic Subscriber Documentation](../subscribeStreamManagerProxy/README.md) to learn more about the basic setup of a subscriber.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**
- **[conference-subscriber.js](conference-subscriber.js)**
- **[conference-service.js](conference-service.js)**

# Setup

## Conference Webapp and API

You will first need to setup the `conference-api` webapp with your distribution in order to use this test.

You can find instructions on setting up the `conference-api` webapp and corresponding API service in the `extras/` directory of your server installation.

Once setup and the server is restarted, you can start using this test.

### Conference Setup

Once the `conference-api` webapp is setup and accessible, you can use the **Postman** scripts to setup a conference and use a **join token** to define in the UI.

In order to generate a Conference to join and a **join token** to use, you should run the following **Postman** requests:

1. Create ORGANIZER User
2. Verify User
3. Create Conference (using the newly verified user from steps #1 and #2).

Example of `POST` data for Step #3:

```json
{
  "displayName": "My Conference",
  "welcomeMessage": "Welcome to my conference! We\u0027re going to have a great time!",
  "thankYouMessage": "Thanks for joining, see you next time!",
  "location": "United States",
  "joinToken": "od3a-etmh-gc0n-osw2",
  "vipOkay": true
}
```

> It is important that the `joinToken` is in the 16 character format, delimited in groups of 4 characters by a dash `-`.

### Test Usage

Once a Conference is created and available in the system, you will use the `joinToken` for the **Join Token** input value to join a conference. You can distribute the `joinToken` to any other party you want to join and have a conference with!

#### Query Params

To make testing easier and have the possibility of the `conference-api` residing on a server distrubution other than the one that these testbeds are deployed on, the following query parameters can be used:

- `token` - the `joinToken` to use
- `socket` - the FQDN of the conference api endpoint websocket

e.g.,

```sh
?socket=wss://myred5conferenceserver..net/conference-api/1.0/ws/conference&token=od3a-etmh-gc0n-osw2
```
