/*
 * Copyright (c) 2021 65_7a
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const express = require("express");
const https = require('https');
const { sheetId, key } = require("./config.json");

const app = express();
const port = 3000;

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
 app.get("/spreadsheet", (req, res, next) => {
    const sheetId = "1_Ypmmq_mror0gBjxXqguNtd0rgQbJDMdjpK_BeZ4XQs"
    const key = "AIzaSyBACq3bX9dEQP0gCjDI3gOq3Fh6d5S_zu8";
    https.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${key}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          res.json(JSON.parse(data));
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
   });
});