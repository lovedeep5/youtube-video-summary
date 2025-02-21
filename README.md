# youtube-video-summary

## Get the youtube video captions using URL (If captions available)

get youtube video caption from URL, integrate endpoint with your automation tool like zapier, integromate.

- End Point: /get-video-caption
- Method: GET
- Body Param: URL
- Bearer Token: For token send request to us: https://form.typeform.com/to/fYXsT8Ti
-

## Curl to add video in the queue for caption processing.

`curl --location 'https://youtube-video-summary.onrender.com/process-video-caption' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [Repalce Your token here]' \
--data '{
    "url": "https://www.youtube.com/watch?v=i5Q02YX2VTw"
}'`

## Curl to get the video caption by queue ID (Queue id can be extracted from the above request)

`curl  -X GET \
  'http://localhost:3000/get-caption-by-queue-id' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: Bearer [Repalce Your token here]' \
  --header 'Content-Type: application/json' \
  --data-raw '{ "captionId": "7"}'`
