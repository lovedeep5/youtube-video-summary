# youtube-video-summary

## Get the youtube video captions using URL (If captions available)

get youtube video caption from URL, integrate endpoint with your automation tool like zapier, integromate.

- End Point: /get-video-caption
- Method: GET
- Body Param: URL
- Bearer Token: For token send request to us: https://form.typeform.com/to/fYXsT8Ti
-

## Curl

`curl --location 'https://youtube-video-summary.onrender.com/get-video-caption' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [token]' \
--data '{
    "url": "https://www.youtube.com/watch?v=i5Q02YX2VTw"
}'`
