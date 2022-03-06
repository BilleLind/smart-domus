const { test } = require('tap')
const {build}  = require('../app.js')

test("sends string", async t => {
    const app = await build();
    const response = await app.inject({
        method: "GET",
        url: "/"
    })
    t.equal(response.statusCode, 200, ' returns status code 200')
})