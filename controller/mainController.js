let AsyncError = require("./../utils/catchAsync");

exports.getHome = AsyncError(async function (req, res) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_home", {
      title: "Unihome | Maseno ",
      houses: [],
      nyawittaNumber: "10+",
      mabungoNumber: "20",
      SilwalNumber: "50",
      allLocation: "70",
    });
});
