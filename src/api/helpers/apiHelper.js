'use strict';


const {mysqlDB, constants} = require(`${rootDir}/utils`)
const Op = mysqlDB.Sequelize.Op;

const data ="<TransactionResponse xmlns='https://test.bennupay.com/acquiring.php'>"+
	"<ConfirmationNumber>10001011</ConfirmationNumber>"+
	"<TransactionId>r57657419</TransactionId>"+
	"<MerchantId>6004</MerchantId>"+
	"<TerminalId>60055</TerminalId>"+
	"<CurrencyCode>USD</CurrencyCode>"+
	"<TotalAmount>12000</TotalAmount>"+
	"<PaymentStatus>Approved</PaymentStatus>"+
	"<Code>1001</Code>"+
	"<Description>Transaction processed successfully.</Description>"+
	"<TxnTime>2011-11-27 23:35:16</TxnTime>"+
"</TransactionResponse>";

module.exports = {
   data
}
