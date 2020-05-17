'use strict';
const {
    response,
    constants,
    mysqlDB,
    
} = require(`${rootDir}/utils`);
const helpers = require("../helpers");
const axios = require('axios');
const crypto = require('crypto');
const qs = require('qs');
var convert = require('xml-js');
const parseString = require('xml2js').parseString;
const workingKey ="abcde";
const xml= require('xml');
var httpBuildQuery = require('http-build-query');

const createPayment = async (req ,res) => {
    try {
        const apiPassword ='S3rgx9c3fFQ';
        const privateKey ='LgYC9NhnDba1xfp3r0RFBzeX';
        const TransactionId ='88'+await rand(1,9)+await rand(0,9)+await rand(0,9)+await rand(0,9)+await rand(0,9)+await rand(0,9);
        const stringConcat = (privateKey+apiPassword+TransactionId.trim()).trim();
        const TerminalPassword =crypto.createHash('sha256').update(apiPassword).digest('hex');
        const signature =crypto.createHash('sha256').update(stringConcat).digest('hex');
        //let TerminalPassword = await encrypt.encrypt128CBC(apiPassword,workingKey);
        //let signature = await encrypt.encrypt128CBC(stringConcat,workingKey);
        let params = {
            'MerchantId':'7000',
    
            'TerminalId':'30015',
    
            'TerminalPassword': TerminalPassword,
    
            'Signature':signature,
    
            'TransactionType':'EL001',
    
            'TransactionId': TransactionId,  // String Max = 10
    
            'CurrencyCode':'EUR',
    
            'TotalAmount':'10000', //Amount in Cents -  example For 120 use 12000
    
            'ProductDescription':'T-Shirt',  //String Min = 8
    
            'FirstName':"John",
    
            'LastName':'Smith',
    
            'CustomerIP':'http://localhost:3000/',
    
            'Phone':'37955452158',
    
            'Email':'client.email@email.com',
    
            'Street':'1street',
    
            'City':'Athens',
    
            'Region':'',
    
            'Country':'GR',
    
            'Zip':'518000',
    
            'ReturnUrl':'https://localhost:3000/return.php',
    
            'CallbackURL':'https://localhost:3000/callbackurl.php',        
    
            /* only for EL001  */
    
            'CardHolderName': 'John Smith',
    
            'CardNumber':'5123450000000008', 
    
            'CardExpireMonth':'05',
    
            'CardExpireYear':'21',
    
            'CardSecurityCode':'100', 
    
            'CardType':'MC',   //VI,MC,JC     
    
    
    
        };
        const propOwn = Object.getOwnPropertyNames(params);
        params = httpBuildQuery(params);
        //console.log("length",params)
        const config={
            headers : {
                'Content-type':'application/x-www-form-urlencoded',
    
            'Accept': 'application/x-www-form-urlencoded',
    
            'Connection': 'Keep-Alive',
    
            'Cache-Control': 'no-cache',
    
            'Pragma': 'no-cache',
    
            'User-Agent':  '',
    
            'Content-length':propOwn.length
            }
        };
        let url =' https://test.bennupay.com/acquiring.php';
        let res1 = await axios({
                method: 'post',
                url: url,
                headers : {
                'Content-type':'application/x-www-form-urlencoded',
    
            'Accept': 'application/x-www-form-urlencoded',
    
            'Connection': 'Keep-Alive',
    
            'Cache-Control': 'no-cache',
    
            'Pragma': 'no-cache',
    
            'User-Agent':  '',
    
            'Content-length':propOwn.length
            },
                //data: qs.stringify(params),
                data:params,

        });
        //  let responseJson = '';


        //     parseString(res1.data, {trim: true, explicitArray: false}, (err, result) => {

        //         responseJson = result;
        //         console.log(result);
        //         console.log(err);
        //     });
          //  console.log("ccc",responseJson);
        //const res = await axios.post(url,qs.stringify(params),config);
        let newres = await parseString1(res1.data);
       //let message = Buffer.from(newres['encodedMessage'],'base64');
       //console.log(newres['encodedMessage'])
       let message=Buffer.from(newres['encodedMessage'],'base64');
        let textmessage=message.toString('utf-8');
        console.log(textmessage);
        //let message = await encrypt.decrypt128CBC(newres['encodedMessage'],workingKey)
        let responseSignature = newres['signature'];
        let signature_key=(privateKey+apiPassword+TransactionId.trim()).trim();
        //let rmac = await encrypt.encrypt128CBC(signature_key,workingKey);
        ///let rmac = await getHash(message,);
        var hash = crypto.createHmac('sha256', signature_key).update(textmessage).digest('hex');

       var rmac = Buffer.from(hash).toString('base64');
       //console.log("res", rmac);
       //console.log("sig", responseSignature)
       let newData =helpers.data;
       //console.log("ccs",signature);
       res.type('application/xml');
       res.send(textmessage);
       
        //response.success(res, constants.SUCCESS_200.STATUS, "Bonus script run successfully!");
    } catch (error) {
        console.log("error",error);
    }

}

const formatXML = async (data) => {
    return jsonxml(data);

};

const rand = async(min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min)
}

const parseString1 = async(str)=> {
    let op =[];
   let pairs = str.split("&");
   for(let i=0;i<pairs.length;i++){
       let pair=pairs[i].trim().split("=");
       decodeURIComponent(pair);
     //console.log("ccd",pair[0],pair[1]);
       op[pair[0]]=pair[1].trim();
   }
   
return op; 

} 


const getHash = async(string,key)=>{
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(string); 
    return hmac.digest('hex'); 
};

module.exports = {
    createPayment
}
