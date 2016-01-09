/*
** Print and save Alexa's top sites in a specific country.
**
** Author       : Alireza Vahedi (@alirrreza)
** Mailto       : alirrreza@gmail.com
** Release date : Jan, 08, 2016
*/
var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var country = 'IR'; //Country name, Case sensitive
var file    = 'top500domains-'+country+'-'+Date.now()+'.txt';//Output will be saved in this file

alexa(0);

function alexa(pageNo){
  var url;
  if(pageNo==0){
    url='http://www.alexa.com/topsites/countries/'+country;
  }
  else if(pageNo<=21){
    url='http://www.alexa.com/topsites/countries;'+pageNo+'/'+country;
  }
  else{
    console.log('\n\nCrawling done.\n\n');
    return;
  }
  crawl(url,function(){
    alexa(pageNo+1);
  });
}

function crawl(url,callback){
  request(url,function(err,res,body){
    if(err){
      console.log('\n\nError while crawling page '+pageNo+' in alexa.\n\n');
      fs.appendFile(file,'\n\nError while crawling page '+pageNo+' in alexa.\n\n',function(err){
        if(err){
          console.log("Error While Appending to URL list file");
        }
      });
      callback();
    }
    else{
      var $ =cheerio.load(body);
      var topUrlString=$(".desc-paragraph").text();
      console.log(topUrlString);
      fs.appendFile(file,topUrlString,function(err){
        if(err){
          console.log("Error While Appending to URL list file");
        }
      });
      callback();
    }
  });
}