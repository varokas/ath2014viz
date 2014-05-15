ATH2014 Visualization
========

This repo creates a visualization for ath2014 attendees based
on data in /data/attendees.csv.

See the visualization at: [http://varokas.github.io/ath2014viz/](http://varokas.github.io/ath2014viz/)


For Any Contributors
-----
Please send a pull request to /data/attendees.csv for any changes.

Note that if you want to try this locally, you need a simple file
server for ajax calls to work. PHP5.4+ local server is a good option
to go with. Assuming you are on latest OS X.

    php -S localhost:8000

For Staff
-----
To export new attendees list
1. Go to eventbrite page
2. click on "Event reports"
3. Report Type = "Survey Answers"
4. Show Columns > Last name, Firstname
5. Export to CSV
6. Use iconv to convert the messed up charset. Again assuming OS X or some kind of Unix.

Like this

    iconv -t utf8 report-20140514-204805.csv > attendees.csv
