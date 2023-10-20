from flask import Flask, request
import cv2
from pyzbar.pyzbar import decode
import base64
from PIL import Image
from io import BytesIO
import os
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

def read_barcode(image_path):
    """Reads the barcode from the image and returns the entry number"""
    # CODE TO READ BARCODE
    	
	# read the image in numpy array using cv2
    img = cv2.imread(image_path)
	
	# Decode the barcode image
    detectedBarcodes = decode(img)
	
	# If not detected then print the message
    if detectedBarcodes:
	
		# Traverse through all the detected barcodes in image
        for barcode in detectedBarcodes: 
		
			# Locate the barcode position in image
            (x, y, w, h) = barcode.rect
			
			# Put the rectangle in image using 
			# cv2 to highlight the barcode
            cv2.rectangle(img, (x-10, y-10),
						(x + w+10, y + h+10), 
						(255, 0, 0), 2)
			
            if barcode.data!="":
			
			# Print the barcode data
                alpha=barcode.data
                return str(alpha)[2:-1]
				#print(barcode.type)
				
	#Display the image
	#cv2.imshow("Image", img)
	#cv2.waitKey(0)
	#cv2.destroyAllWindows()



def delete_image(image_path):
    #Deletes the image from the file
    os.remove(image_path)


@app.route("/")
def hello():
    return "Hello World!"

@app.route("/scan", methods=["POST"])
def scan():
    entry_number = "123456789"
    image_path = "temp_image.jpg"
    # CODE TO FIND ENTRY NUMBER
    request.files.get("file").save(image_path)
    entry_number = read_barcode(image_path)
    delete_image(image_path)
    # CODE END
    if entry_number is None:
        return "No barcode found"
    return entry_number

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
