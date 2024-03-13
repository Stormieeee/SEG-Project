from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
import random
import logging
from pydantic import BaseModel
from datetime import date, time

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from routes.index import user_router

app = FastAPI()
#Allows all origins, methods, and headers. Use with caution and only in development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],  # Allows all origins
    allow_credentials=True,
    allow_methods=[""],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define database connection settings
MYSQL_CONFIG = {
    "host": "127.0.0.1",
    "port": 8111,
    "user": "root",
    "password": "",
    "database": "roombookingsystem1"
}

# Dependency to establish database connection
def get_database_connection():
    connection = mysql.connector.connect(**MYSQL_CONFIG)
    return connection


############################################

def send_email(sender_email, receiver_email, password, subject, otp, smtp_server, smtp_port):
    # Create a multipart message and set headers
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject

    # Add body to email
    body = "You're OTP for login is as follows: " + str(otp)
    message.attach(MIMEText(body, 'plain'))

    # Connect to the SMTP server
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Upgrade the connection to TLS
    server.login(sender_email, password)

    # Send email
    server.send_message(message)

    # Close the connection
    server.quit()
########################################### WORKING

# Login
def generate_random_integer():
    return random.randint(10000, 99999)

class Login(BaseModel):
    user_id: str
    password: str

def user_login_check(db_connection, cursor, userID=None, password=None):
    query = "SELECT COUNT(*) FROM `user login` WHERE `User ID` = %s AND `Password` = %s"
    cursor.execute(query, (userID, password))
    if cursor.fetchone()[0] > 0:
        # Update OTP key if login is successful
        new_otp_key = generate_random_integer()  # Assuming you have a function to generate OTP keys
        query = "UPDATE `user login` SET `OTPKey` = %s WHERE `User ID` = %s"
        cursor.execute(query, (new_otp_key, userID))
        send_email ("segproject32@outlook.com", userID, "aquastorm797",'Room Booking System OTP', new_otp_key ,'smtp-mail.outlook.com',587 )
        db_connection.commit()  # Commit the transaction
        return True
    else:
        return False

@app.post("/login/")
def user_login(login: Login, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    if user_login_check(db_connection, cursor, userID=login.user_id, password=login.password):
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

########################################### WORKING

class Auth(BaseModel):
    user_id: str
    key: int

def authentication(db_connection, cursor, userID, key):
    query = "SELECT COUNT(*) FROM `User Login` WHERE `User ID` = %s AND `OTPKey` = %s"
    cursor.execute(query, (userID, key))
    if cursor.fetchone()[0] > 0:
        # Update OTP key if login is successful
        query = "UPDATE `user login` SET `LoggedIn` = %s WHERE `User ID` = %s"
        cursor.execute(query, (1, userID))
        db_connection.commit()  # Commit the transaction
        return True
    else:
        return False
    
@app.post("/authentication/")
def user_authentication(auth: Auth, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    if authentication(db_connection, cursor, userID=auth.user_id, key=auth.key):
        return {"message": "Authentication successful"}
    else:
        raise HTTPException(status_code=401, detail="Authentication failed")

########################################### WORKING

class Logout(BaseModel):
    user_id: str

def logging_out(db_connection, cursor, userID):
    try:
        # Update LoggedIn status to 0 indicating user is logged out
        query = "UPDATE `user login` SET `LoggedIn` = %s WHERE `User ID` = %s"
        cursor.execute(query, (0, userID))
        db_connection.commit()  # Commit the transaction
        return True
    except Exception as e:
        # Handle any exceptions that might occur during the process
        print(f"An error occurred: {e}")
        db_connection.rollback()  # Rollback the transaction in case of error
        return False
    
@app.post("/logout/")
def user_logout(logout: Logout, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    if logging_out(db_connection, cursor, userID=logout.user_id):
        return {"message": "User logged out successfully"}
    else:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
########################################### WORKING


class EditPassword(BaseModel):
    user_id: str
    new_password: str

#error
def update_password(db_connection, cursor, userID, new_password):
    query = "UPDATE `User Login` SET `Password` = %s WHERE `User ID` = %s"
    cursor.execute(query, (new_password, userID))
    db_connection.commit()

@app.post("/edit_password/")
def edit_user_password(edit_password: EditPassword, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    update_password(db_connection, cursor, userID=edit_password.user_id, new_password=edit_password.new_password)
    return {"message": "Password updated successfully"}


########################################### WORKING

class BookingRequest(BaseModel):
    user_id: str
    room_id: str
    description: str
    date: date
    start_time: time
    end_time: time

def create_booking_request(db_connection, cursor, userID, room_id, description, date, start_time, end_time):
    last_booking_id = 0
    query = "SELECT MAX(`Request ID`) AS last_booking_id FROM `Booking Request`"
    cursor.execute(query)
    result = cursor.fetchone()
    if result:
        last_booking_id = result[0]+1

    insert_request_query = "INSERT INTO `Booking Request` (`Request ID`, `User ID`, `Room ID`) VALUES (%s, %s, %s)"
    cursor.execute(insert_request_query, (last_booking_id, userID, room_id))
    #db_connection.commit()

    insert_description_query = "INSERT INTO `Booking Request Description` (`Request ID`, `Description`, `Date`, `Start Time`, `End Time`) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(insert_description_query, (last_booking_id, description, date, start_time, end_time))
    db_connection.commit()

@app.post("/booking_request/")
def create_booking(booking_request: BookingRequest, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    create_booking_request(
        db_connection,
        cursor,
        userID=booking_request.user_id,
        room_id=booking_request.room_id,
        description=booking_request.description,
        date=booking_request.date,
        start_time=booking_request.start_time.isoformat().split('.')[0],  # Convert time objects to ISO format strings
        end_time=booking_request.end_time.isoformat().split('.')[0]     # Convert time objects to ISO format strings
    )
    return {"message": "Booking request created successfully"}

########################################### WORKING

class RoomAvailabilityRequest(BaseModel):
    room_id: str
    date: date
    start_time: time
    end_time: time


def check_room_availability(cursor, room_id, date, start_time, end_time):
    query = "SELECT COUNT(*) FROM `Booking ID description` AS BID " \
            "INNER JOIN `Booking List` AS BL ON BID.`Booking ID` = BL.`Booking ID` " \
            "WHERE BL.`Room ID` = %s AND BID.`Date` = %s " \
            "AND ((BID.`Start Time` BETWEEN %s AND %s) OR (BID.`End Time` BETWEEN %s AND %s))"
    
    cursor.execute(query, (room_id, date, start_time, end_time, start_time, end_time))
    return cursor.fetchone()[0] == 0

@app.post("/check_room_availability/")
def check_room_availability_endpoint(request: RoomAvailabilityRequest, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    available = check_room_availability(
        cursor,
        request.room_id,
        request.date,
        request.start_time.isoformat().split('.')[0],  # Convert time objects to ISO format strings
        request.end_time.isoformat().split('.')[0]     # Convert time objects to ISO format strings
    )
    return {"available": available}







