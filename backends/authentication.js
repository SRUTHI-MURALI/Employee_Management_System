const fs = require("fs");
const googleAuth = require("google-auth-library");

// You can add more scopes according to your permission need.
// But in case you chang the scope, make sure you deleted the ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json file
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_DIR =
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
  "/.credentials/"; // the directory where we're going to save the token
const TOKEN_PATH = TOKEN_DIR + "mars-config.json"; // the file which will contain the token

class Authentication {
  authenticate() {
    return new Promise((resolve, reject) => {
      const credentials = this.getClientSecret();
      const authorizePromise = this.authorize(credentials);
      authorizePromise.then(resolve, reject);
    });
  }

  getClientSecret() {
    return require("./client_secret.json");
  }

  authorize(credentials) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    return new Promise((resolve, reject) => {
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          this.getNewToken(oauth2Client).then(
            oauth2ClientNew => {
              resolve(oauth2ClientNew);
            },
            err => {
              reject(err);
            }
          );
        } else {
          oauth2Client.credentials = JSON.parse(token);
          resolve(oauth2Client);
        }
      });
    });
  }

  getNewToken(oauth2Client, callback) {
    return new Promise((resolve, reject) => {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
      });
      resolve(authUrl);
    });
  }

  verifyCode(code) {
    const credentials = this.getClientSecret();
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    return new Promise((resolve, reject) => {
      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          console.log("Error while trying to retrieve access token", err);
          reject();
        }
        oauth2Client.credentials = token;
        this.storeToken(token);
        resolve(oauth2Client);
      });
    });
  }

  storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != "EEXIST") {
        console.log(err.message);
        // process.exit(1);
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), () => {
      console.log("Token stored to " + TOKEN_PATH);
    });
  }
}

module.exports = new Authentication();



// const express = require('express');
// const fs = require('fs');
// const googleAuth = require('google-auth-library');

// const app = express();
// const port = process.env.PORT || 3000;

// // Constants
// const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// const TOKEN_DIR = `${process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE}/.credentials/`;
// const TOKEN_PATH = `${TOKEN_DIR}mars-config.json`;

// // Authentication class
// class Authentication {
//   authenticate() {
//     return new Promise((resolve, reject) => {
//       const credentials = this.getClientSecret();
//       const authorizePromise = this.authorize(credentials);
//       authorizePromise.then(resolve, reject);
//     });
//   }

//   getClientSecret() {
//     return require('./client_secret.json');
//   }

//   authorize(credentials) {
//     const clientSecret = credentials.installed.client_secret;
//     const clientId = credentials.installed.client_id;
//     const redirectUrl = credentials.installed.redirect_uris[0];
//     const auth = new googleAuth();
//     const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//     return new Promise((resolve, reject) => {
//       // Check if we have previously stored a token.
//       fs.readFile(TOKEN_PATH, (err, token) => {
//         if (err) {
//           this.getNewToken(oauth2Client).then(
//             oauth2ClientNew => {
//               resolve(oauth2ClientNew);
//             },
//             err => {
//               reject(err);
//             }
//           );
//         } else {
//           oauth2Client.credentials = JSON.parse(token);
//           resolve(oauth2Client);
//         }
//       });
//     });
//   }

//   getNewToken(oauth2Client, callback) {
//     return new Promise((resolve, reject) => {
//       const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES
//       });
//       resolve(authUrl);
//     });
//   }

//   verifyCode(code) {
//     const credentials = this.getClientSecret();
//     const clientSecret = credentials.installed.client_secret;
//     const clientId = credentials.installed.client_id;
//     const redirectUrl = credentials.installed.redirect_uris[0];
//     const auth = new googleAuth();
//     const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//     return new Promise((resolve, reject) => {
//       oauth2Client.getToken(code, (err, token) => {
//         if (err) {
//           console.log('Error while trying to retrieve access token', err);
//           reject();
//         }
//         oauth2Client.credentials = token;
//         this.storeToken(token);
//         resolve(oauth2Client);
//       });
//     });
//   }

//   storeToken(token) {
//     try {
//       fs.mkdirSync(TOKEN_DIR);
//     } catch (err) {
//       if (err.code != 'EEXIST') {
//         console.log(err.message);
//         throw err;
//       }
//     }
//     fs.writeFile(TOKEN_PATH, JSON.stringify(token), () => {
//       console.log('Token stored to ' + TOKEN_PATH);
//     });
//   }
// }

// // Express route for authentication
// app.get('/auth', (req, res) => {
//   const auth = new Authentication();
//   auth.authenticate().then(
//     oauth2Client => {
//       res.send('Authentication successful!');
//     },
//     err => {
//       res.status(500).send('Authentication failed: ' + err);
//     }
//   );
// });

// // Express route for verifying code
// app.get('/verify-code', (req, res) => {
//   const auth = new Authentication();
//   const code = req.query.code;
//   if (!code) {
//     res.status(400).send('Code parameter is required');
//     return;
//   }
//   auth.verifyCode(code).then(
//     oauth2Client => {
//       res.send('Code verified successfully!');
//     },
//     err => {
//       res.status(500).send('Error verifying code: ' + err);
//     }
//   );
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
