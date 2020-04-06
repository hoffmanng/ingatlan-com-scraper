# ingatlan-com-scraper
Save ingatlan.com search results in json format.

This script is scraping search results of real estate website ingatlan-com. You can provide one or multiple search URLs as inputs, and the script will fetch all the search results of all the input URLs into json files. It will re-fetch all results every 24h into new json files.

## Requirements
- Node.js v10 or newer (https://nodejs.org/)
or
- Docker (https://www.docker.com/)

## How to install
1. Clone the repository

2. In the `ingatlan-com-scraper` folder Install the packages
```console
npm install
```

## How to use
1. Start the script
```console
node cron.js SEARCH_RESULT_URL1 [SEARCH_RESULT_URL2] [SEARCH_RESULT_URL3] 
```
A `SEARCH_RESULT_URL` looks like: https://ingatlan.com/lista/elado+lakas+ix-ker+25-m2-alatt

An example start command with two `SEARCH_RESULT_URL`s:
```console
node cron.js https://ingatlan.com/lista/elado+lakas+ix-ker+25-m2-alatt https://ingatlan.com/szukites/elado+lakas+debrecen+25-m2-alatt
```

## How it works
After the script has been started, a new folder, called `data` will be created. The result can be found inside.

The script is scraping the `SEARCH_RESULT_URL`s and creating json files in the `ingatlan-com-scraper/data/` folder. One folder is created for each `SEARCH_RESULT_URL`. Inside the folders the result is written in a json file. The name of the json file is the timestamp of the scrape. 

### Folder structure:
```console
data
  - elado+lakas+ix-ker+25-m2-alatt
    - [timestamp1].json
    - [timestamp2].json
    - ...
  - elado+lakas+debrecen+25-m2-alatt
    - [timestamp1].json
    - [timestamp2].json
    - ...
  - ...
```

This script is _not_ stopping. It will keep running and re-fetching the same search results into new json files every day at 12:00. To stop the script, press `CTRL + C`. 


## (Optional) Docker image
The script can be run in a docker container. 

To build and run the docker image locally use the following commands:
```console
docker build -t hoffmanng/ingatlan-com-scraper:latest .
```

To get the image from Docker Hub and run the image use the following commands:
```console
docker pull hoffmanng/ingatlan-com-scraper:latest
```

### (Optional) Run the docker image
To run the image use the following command:
```console
docker run -e SEARCH_URL=SEARCH_RESULT_URL1 -d -v $(pwd)/data:/usr/src/app/data hoffmanng/ingatlan-com-scraper:latest
```
A `SEARCH_RESULT_URL` looks like: https://ingatlan.com/lista/elado+lakas+ix-ker+25-m2-alatt

An example start command:
```console
docker run -e SEARCH_URL=https://ingatlan.com/lista/elado+lakas+ix-ker+25-m2-alatt -d -v $(pwd)/data:/usr/src/app/data hoffmanng/ingatlan-com-scraper:latest
```

The docker image will keep running until stopped manually. It will keep re-fetching the same search results into new json files every day at 12:00. 
