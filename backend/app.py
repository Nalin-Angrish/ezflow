from flask import Flask, request
import cv2
from pyzbar.pyzbar import decode
import base64
from PIL import Image
from io import BytesIO
import os
from flask_cors import CORS
import sqlite3
from datetime import datetime

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
    # return "2023MEB1360"
    if entry_number is None:
        return "No barcode found"
    return entry_number

@app.route("/update_entry", methods=["POST"])
def update_entry():
    entry_number = request.get_json().get("entry_number")

    conn = sqlite3.connect("Entry_Gate.db")
    cur=conn.cursor()
    cur.execute(f'select *from student_data where Entry="{entry_number}"')
    a = cur.fetchone()
    if a is None:
        return "Invalid Entry Number"
    cur.execute(f'select * from entry_log where Entry_No="{entry_number}"')
    b = cur.fetchall()
    if len(b) != 0:
        a = b[-1]
        if a[4] == "NULL":
            cur.execute(f'UPDATE entry_log SET time_in = ? WHERE Entry_No = ? AND time_in = "NULL"', (datetime.strftime(datetime.now(),"%d-%m-%Y %H:%M:%S"), entry_number))
        else:
            cur.execute('insert into entry_log values(?,?,?,?,?)',(a[0],a[1],a[2],datetime.strftime(datetime.now(),'%d-%m-%Y %H:%M:%S'), "NULL"))
    else:
        cur.execute('insert into entry_log values(?,?,?,?,?)',(a[0], a[1], a[2], datetime.strftime(datetime.now(),'%d-%m-%Y %H:%M:%S'), "NULL"))

    conn.commit()
    conn.close()
    return "Updated "+str(entry_number)


@app.route("/guest_entry", methods=["POST"])
def guest_entry():
    name = request.get_json().get("name")
    phone = request.get_json().get("phone")
    address = request.get_json().get("address")
    purpose = request.get_json().get("purpose")

    conn = sqlite3.connect("Entry_Gate.db")
    cur=conn.cursor()
    cur.execute(f'select * from guest_log where Name="{name}"')
    a = cur.fetchall()
    if len(a) == 0 or a[-1][5] != "NULL":
        cur.execute('insert into guest_log values(?,?,?,?,?,?)',(name, phone, address, purpose, datetime.strftime(datetime.now(),'%d-%m-%Y %H:%M:%S'), "NULL"))
    else:
        cur.execute('UPDATE guest_log SET time_out = ? WHERE Name = ? AND time_out = "NULL"', (datetime.strftime(datetime.now(),"%d-%m-%Y %H:%M:%S"), name))

    conn.commit()
    conn.close()
    return "Updated Guest Entry"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
