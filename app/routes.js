var News     = require('./models/News');
var Sources     = require('./models/Sources');
var requestify = require('requestify');
var constant = require('./../config/constants');

module.exports = function(app) {

	app.get('/', function(req, res) {
    	res.json({ message: 'hooray! welcome to our api!' });   
	});

	// app.get('/:source_id', function(req, res) {
    // 	var news_url = 'https://newsapi.org/v1/articles?source='+req.params.source_id+'&sortBy=latest&apiKey='+constant.news_api_key;
	// 	console.log(news_url);
	// 	requestify.get(news_url)
	// 		.then(function(response) {
	// 			res.send(response.getBody().articles);
	// 		}
	// 	);   
	// });

	app.route('/news')

    // create a news (accessed at POST http://localhost:8080/api/news)
    .post(function(req, res) {
        
        var news = new News();      
        news.name = req.body.name;  

        // save the news and check for errors
        news.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'News created!' });
        });
        
    })

	// get all news (accessed at GET http://localhost:8080/api/news)
	.get(function(req, res) {
        News.find(function(err, news) {
            if (err)
                res.send(err);

            res.json(news);
        });
    });

	app.route('/sources')

    // get all sources (accessed at GET http://localhost:8080/api/sources)
	.get(function(req, res) {
        Sources.find(function(err, sources) {
            if (err)
                res.send(err);

			if(sources.length <= 0) {
				requestify.get('https://newsapi.org/v1/sources?language=en')
					.then(function(response) {
						var sources_array = response.getBody().sources;
						var body = '';
						sources_array.forEach(function(element) {
							var source = new Sources();
							source.id = element.id;
							source.name = element.name;
							source.description = element.description;
							source.url = element.url;
							source.category = element.category;
							source.language = element.language;
							source.country = element.country;
							source.urlsToLogos = element.urlsToLogos;
							source.sortBysAvailable = element.sortBysAvailable;

							source.save(function(err) {
								if (err)
									res.send(err);

								body += "Added to DB, ";
							});
						}, this);
						
						res.send(body);
					}
				);

			} else {
				Sources.find(function(err, sources) {
					if (err)
						res.send(err);

					res.json(sources);
				});
			}

            
        });
    });

	app.route('/news/:source_id')

    // get the news with that source id (accessed at GET http://localhost:8080/api/news/:source_id)
    .get(function(req, res) {
		var news_url = 'https://newsapi.org/v1/articles?source='+req.params.source_id+'&sortBy=latest&apiKey='+constant.news_api_key;
		console.log(news_url);
		requestify.get(news_url)
			.then(function(response) {
				res.send(response.getBody().articles);
			}
		);
    });

};