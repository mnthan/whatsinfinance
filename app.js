const request = require('request');
const cheerio = require('cheerio');
const bitcoinUrl = 'https://cryptonews.com/news/bitcoin-news/';
const ethereumUrl = 'https://cryptonews.com/news/ethereum-news/';
const link123 = [];
var linkabc = [];
var i;


const ethereumApi = request(ethereumUrl, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        var temp1 = [];
        $(".cn-news-grid ,.props ").each((i, el) => {
            // var link = $(el).find('.props').find('h4').text();
            var link = $(el).find("h4").find("a").attr('href');
            var temp3 = ('https://www.cryptonews.com' + link)
                // temp1.push(temp3);
                // -----------
            if (!Array.prototype.last) {
                Array.prototype.last = function() {
                    return this[this.length - 1];
                };
            };
            // -------------
            link123.push(temp3);
            var linkpage = link123.last();
            // console.log(linkpage);
            linkabc.push(linkpage);
        });


        for (i = 0; i < linkabc.length; i++) {
            var finallink = linkabc[i];

            request(finallink, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);

                    $('article').each((i, el) => {
                        var temp2 = { "title": "", "para": [], "image": "" }
                        var title = $(el).find('h1').text();
                        // console.log(title + "Getting data from api!!");
                        temp2.title = title;

                        var para = $(el).find('p').slice(0, 7).text();
                        // console.log(para.length);
                        temp2.para = para;
                        // console.log(temp2);
                        var imgLink = $(el).find('figure').find('img').attr('src');
                        temp2.image = imgLink;
                        // console.log(temp2);
                    });
                }
            });
        }


    }
});

module.exports = {ethereumApi};