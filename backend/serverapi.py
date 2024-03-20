from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
import random
import logging
import string
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
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define database connection settings
MYSQL_CONFIG = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "rbms"
}

# Dependency to establish database connection
def get_database_connection():
    connection = mysql.connector.connect(**MYSQL_CONFIG)
    return connection

#Random 5 alphanumeric code
def generate_random_string():
    # Define the characters to choose from
    characters = string.ascii_letters + string.digits

    # Generate a random 5-character alphanumeric string
    random_string = ''.join(random.choice(characters) for _ in range(5))

    return random_string

#Random integer
def generate_random_integer():
    return random.randint(10000, 99999)

############################################ EMAIL - EDITED TO CHECK

def send_email(sender_email, receiver_email, password, subject, msg, smtp_server, smtp_port):
    # Create a multipart message and set headers
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject

    # Add body to email
    message.attach(MIMEText(msg, 'plain'))  # Changed from `message` to `body`

    # Connect to the SMTP server
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Upgrade the connection to TLS
    server.login(sender_email, password)

    # Send email
    server.send_message(message)

    # Close the connection
    server.quit()
########################################### USER LOGIN - WORKING

# Login


class Login(BaseModel):
    user_id: str
    password: str

def user_login_check(db_connection, cursor, userID=None, password=None):
    query = "SELECT COUNT(*) FROM `user login` WHERE `User ID` = %s AND `Password` = %s"
    cursor.execute(query, (userID, password))
    if cursor.fetchone()[0] > 0:
        # Update OTP key if login is successful
        new_otp_key = generate_random_integer() 
        query = "UPDATE `user login` SET `OTPKey` = %s WHERE `User ID` = %s"
        cursor.execute(query, (new_otp_key, userID))
        otpMessage = "You're OTP for login is as follows: " + str(new_otp_key)
        send_email("segproject32@outlook.com", userID, "aquastorm797", 'Room Booking System OTP', otpMessage, 'smtp-mail.outlook.com', 587)
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

########################################### AUTHENTICATION - WORKING

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

########################################### LOGOUT - WORKING

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
    
########################################### EDIT PASSWORD - WORKING


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


########################################### COMPLETE

class RoomAvailabilityRequest(BaseModel):
    userID: str
    capacity: int
    sec: str
    date: date
    start_time: time
    end_time: time

# Function to check room availability
def check_room_availability(cursor, userID, capacity, sec, date, start_time, end_time):
    #Get all the rooms from the sectio
    query = "SELECT `Room ID` FROM `Room` WHERE `Section` = %s;"
    cursor.execute(query, (sec,))

    rows = cursor.fetchall()

    #Get the availabilities of the different rooms (true = avaialable, false = not available)
    query1 = "SELECT COUNT(*) FROM `Booking ID description` AS BID " \
             "INNER JOIN `Booking List` AS BL ON BID.`Booking ID` = BL.`Booking ID` " \
             "WHERE BL.`Room ID` = %s AND BID.`Date` = %s " \
             "AND ((BID.`Start Time` BETWEEN %s AND %s) OR (BID.`End Time` BETWEEN %s AND %s))"

    availability_list = []      #Data stored in availability_list
    for row in rows:    
        room_id = row[0]
        cursor.execute(query1, (room_id, date, start_time, end_time, start_time, end_time))
        availability = cursor.fetchone()[0] == 0
        availability_list.append((room_id, availability))

    
    #Base color coding rooms based on available or not
    colored_availability_list = [(room_id, "green" if availability else "red") for room_id, availability in availability_list]

    #Get a list of all rooms where users can book
    rolecheck = "SELECT `role ID` from `users` where `User ID` = %s;"
    cursor.execute(rolecheck, (userID,))
    userRole = cursor.fetchall()
    role_id = userRole[0][0]    # Extracted  role

    #Only execute greyed out rooms if role is a student
    if role_id == 1:        #If student then only student access rooms will show
        query = "SELECT `Room ID` FROM `Room` WHERE `Section` = %s AND `StudentAccess` = %s ; "
        cursor.execute(query, (sec, 1))

        studentRooms = cursor.fetchall()

        student_room_ids = {room[0] for room in studentRooms}
        updated_availability_ids = {room[0] for room, _ in colored_availability_list}

        # Get the set of room IDs that are not in both lists
        ununioned_room_ids = updated_availability_ids.symmetric_difference(student_room_ids)

        # Create the final availability list using list comprehension
        final_availability_list = [
            (room_id, "grey" if room_id not in ununioned_room_ids else color)
            for room_id, color in colored_availability_list]
    else:
        final_availability_list = colored_availability_list
        

    #Change colors if the room is available but not suitable
    capacityCheck = "SELECT `Room ID` FROM `room` WHERE `Capacity` IS NOT NULL AND `Capacity` < %s;"
    cursor.execute(capacityCheck, (capacity,))
    noCapacityRooms = cursor.fetchall()
    no_capacity_room_ids = {room[0] for room in noCapacityRooms}

    final_availability_list1 = [
    (room_id, "yellow" if color == "green" and room_id in no_capacity_room_ids else color)
    for room_id, color in final_availability_list]
    
    #final print
    return final_availability_list1
    

# API endpoint to check room availability
@app.post("/check_room_availability/")
def check_room_availability_endpoint(request: RoomAvailabilityRequest, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    availability_list = check_room_availability(
        cursor,
        request.userID,
        request.capacity,
        request.sec,
        request.date,
        request.start_time.isoformat().split('.')[0],
        request.end_time.isoformat().split('.')[0]
    )
    return {"available": availability_list}




########################################### TO BE EDITED 

class BookingRequest(BaseModel):
    user_id: str
    room_id: str
    capacity: int
    description: str
    date: date
    start_time: time
    end_time: time

def create_booking_request(db_connection, cursor, userID, room_id, capacity, description, date, start_time, end_time):

    #Has to create a new bookingRequestID which is unique.
    while True:
        # Generate a new bookingRequestID
        bookingRequestID = generate_random_string()

        # Checking if the ID is pre-existing
        bookingRequestIDCheck = "SELECT `Request ID` FROM `booking request`"
        cursor.execute(bookingRequestIDCheck)
        currentRoomIDS = cursor.fetchall()

        # Check if the bookingRequestID is in the currentRoomIDS
        if any(bookingRequestID in row for row in currentRoomIDS):
            print("Booking Request ID is in the current room IDs. Generating a new ID.")
        else:
            print("Booking Request ID is not in the current room IDs.")
            break

    #Inserting into Booking Request table first as parent table
    insert_request_query = "INSERT INTO `Booking Request` (`Request ID`, `User ID`, `Room ID`) VALUES (%s, %s, %s)"
    cursor.execute(insert_request_query, (bookingRequestID, userID, room_id))
    db_connection.commit()

    insert_description_query = "INSERT INTO `Booking Request Description` (`Request ID`, `Description`, `Date`, `Start Time`, `End Time`, `capacity`) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(insert_description_query, (bookingRequestID, description, date, start_time, end_time, capacity))
    db_connection.commit()

    #Sending the confirmation email
    confirmMessage = (
        "You have sent in a booking request of ID: " +
        str(bookingRequestID) + "\n" +
        "Room ID:   " +
        str(room_id) + "\n" +
        "Booking Reason:   " +
        str(description) + "\n" +
        "Booking capacity:   " +
        str(capacity) + "\n" +
        "Date:   " +
        str(date) + "\n" +
        "Timing:   " +
        str(start_time) + "  :  " + str(end_time) + ".\nIf you did not make this booking, please check your account immediately.")

    send_email ("segproject32@outlook.com", userID, "aquastorm797",'Room Booking System OTP', confirmMessage ,'smtp-mail.outlook.com',587 )

@app.post("/booking_request/")
def create_booking(booking_request: BookingRequest, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    create_booking_request(
        db_connection,
        cursor,
        userID=booking_request.user_id,
        room_id=booking_request.room_id,
        capacity = booking_request.capacity,
        description=booking_request.description,
        date=booking_request.date,
        start_time=booking_request.start_time.isoformat().split('.')[0],  # Convert time objects to ISO format strings
        end_time=booking_request.end_time.isoformat().split('.')[0]     # Convert time objects to ISO format strings
    )
    return {"booking successful"}



