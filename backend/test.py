import requests

url = 'http://localhost:5000/scan'

# Upload Image_working to the url
files = {'file': open('image_working.jpg', 'rb')}
r = requests.post(url, files=files)
print(r.text)
