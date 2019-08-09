//Uncomment when using self-signed or otherwise incorrect certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var
   fs            = require('fs'),
   request       = require('request'),
   properties    = require('../util/properties'),
   queryString   = require('querystring'),
   colors = require('colors');

(function () {

   console.log("⚙ Läser in devProperties".cyan);
   var props = properties.getDevProperties();
   console.log(JSON.stringify(props).gray);

   console.log("⚙ Läser in manifest".cyan);
   var  manifest = properties.getManifest();
   console.info(JSON.stringify(manifest).grey);

   console.log("Skapar " + props.addonName.yellow + " på " + props.siteName.yellow);



//console.log('https://'+props.username+':'+props.password+'@'+props.domain+'/rest-api/1/0/'+queryString.escape(props.siteName)+'/Addon%20Repository/'+props.addonName+'/webAppImport');
console.log("⚙ Läser in formdata".cyan);
   var url = `https://${props.username}:${props.password}@${props.domain}/rest-api/1/0/${queryString.escape(props.siteName)}/Addon%20Repository/${props.addonName}/webAppImport`,
       formData = {
         file: fs.createReadStream(properties.DIST_DIR_PATH + '/' + manifest.id + '.zip')
      };

      console.info(JSON.stringify(formData).grey);

   if (process.argv[2] === 'force') {
      url += '?force=true';
      console.log("Använder force 🥊 💪  ".yellow);
   }

   console.log("Gör post 📧  till ".cyan + props.siteName.cyan);

   request.post({url: url, formData: formData}, (err, httpResponse, body) => {
      if (err) {
         return console.log(colors.error('Upload failed:', err));
      }

      if (httpResponse.statusCode === 200) {
         return console.log('Upload successful 🦄 🌈  ⭐  : \n', JSON.stringify(JSON.parse(body), null, 2).rainbow);
      }

      console.log('Upload failed: \n', JSON.stringify(JSON.parse(body), null, 2));
   });
})();