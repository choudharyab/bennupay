'use strict';
const {
    response,
    constants,
    mysqlDB
} = require(`${rootDir}/utils`);
const helpers = require("../helpers");
const axios = require('axios');
const crypto = require('crypto');
const qs = require('qs');
var convert = require('xml-js');

const createPayment = async (req ,res) => {
    try {
       
        let TransactionId ='88'+await rand(1,9)+await rand(0,9)+await rand(0,9)+await rand(0,9)+await rand(0,9)+await rand(0,9);
        let stringConcat = ('LgYC9NhnDba1xfp3r0RFBzeX'+'S3rgx9c3fFQ'+TransactionId.trim()).trim();
        let TerminalPassword =crypto.createHash('sha256').update('S3rgx9c3fFQ').digest('hex');
        let signature =crypto.createHash('sha256').update(stringConcat).digest('hex');

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
        const res = await axios.post(url,qs.stringify(params),config);
        let newres = await parseString(res.data);
       //console.log("ed",newres['encodedMessage']);
        let message = Buffer.from(newres['encodedMessage'],'base64');
        let textmessage=message.toString('utf-8');
        let responseSignature = newres['signature'];
        let signature_key=('LgYC9NhnDba1xfp3r0RFBzeX'+'S3rgx9c3fFQ'+TransactionId.trim()).trim();
        //let buf =Buffer(signature_key);
       // let rmac= crypto.createHmac('sha256',signature_key);
        //rmac.update(message).digest('hex');
        //let resignature =Buffer(crypto.createHmac('sha256').update(message,signature_key,true).digest('hex')).toString('hex');
      //  let buf =Buffer(resignature);
      //  let newbuf=buf.toString('base64')
      let rmac = await getHash(message,signature_key);
        if(rmac == responseSignature ){
           console.log("y")
       }
       console.log("res", rmac);
       console.log("sig", responseSignature)
       console.log("ccs",signature);
       var options = {compact: true, ignoreComment: true, spaces: 0};

       //let jsonmessage =  convert.xml2json(message);
       //let newText = newBase.toString('utf-8');
       console.log(textmessage);

        //response.success(res, constants.SUCCESS_200.STATUS, "Bonus script run successfully!");
    } catch (error) {
        console.log("error",error);
    }

}

const rand = async(min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min)
}

const parseString= async(str)=> {
   //console.log("cc",str);
   // $op = array(); 
    let op =[];
   //$pairs = explode("&", $str); 
   let pairs = str.split("&");
   for(let i=0;i<pairs.length;i++){
       let pair=pairs[i].trim().split("=");
     // console.log("ccd",pair[0],pair[1]);
       op[pair[0]]=pair[1].trim();
   }
   
  // console.log("my pairs",op);
   
//    foreach ($pairs as $pair) { 

//        list($k, $v) = array_map("urldecode", explode("=", trim($pair))); 

//        $op[$k] = $v; 

//    } 

   return op; 

} 


const getHash = async(string,key)=>{
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(string); 
    return hmac.digest('binary'); 
};

module.exports = {
    createPayment
}
