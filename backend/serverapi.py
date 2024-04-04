from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
import random
import logging
import string
from pydantic import BaseModel
#from datetime import date, time
#import datetime
from datetime import datetime, date, time, timedelta

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
    "port": 3307,
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
        send_otp(db_connection, cursor, userID)
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



class Otp(BaseModel):
    user_id: str

def send_otp(db_connection, cursor, userID):
    # Update OTP key if login is successful
    new_otp_key = generate_random_integer()
    query = "UPDATE `user login` SET `OTPKey` = %s WHERE `User ID` = %s"
    cursor.execute(query, (new_otp_key, userID))
    otpMessage = "You're OTP for login is as follows: " + str(new_otp_key)
    send_email("segproject32@outlook.com", userID, "aquastorm797", 'Room Booking System OTP', otpMessage, 'smtp-mail.outlook.com', 587)
    db_connection.commit()  # Commit the transaction
    return True

@app.post("/SendOTP/")
def otp_control(otp: Otp, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    if send_otp(db_connection, cursor, userID=otp.user_id):
        return {"message": "OTP sent"}
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


########################################### TESTING TO BE DONE

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




########################################### TESTING TO BE DONE

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




########################################### TESTING TO BE DONE

class userClass(BaseModel):
    UserID: str

def get_profile_details(db_connection, cursor, userID):
    get_details = """
        SELECT `user roles`.`Name` 
        FROM `users` 
        JOIN `user roles` ON `users`.`Role ID` = `user roles`.`Role ID`
        WHERE `users`.`User ID` = %s
    """ 
    cursor.execute(get_details, (userID,))
    role = cursor.fetchone()

    profile = (userID, role[0])

    return profile

@app.post("/get_profile_details/")
def get_profile(profile: userClass, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    prof =  get_profile_details(
            db_connection,
            cursor,
            userID=profile.UserID
            )
    return {"username": prof[0], "role": prof[1]}



########################################### TESTING TO BE DONE

#Uses userClass

def get_approving_role(db_connection, cursor, userID):
    get_details = """
        SELECT `user roles`.`Name` 
        FROM `users` 
        JOIN `user roles` ON `users`.`Role ID` = `user roles`.`Role ID`
        WHERE `users`.`User ID` = %s
    """ 
    cursor.execute(get_details, (userID,))
    
    role = cursor.fetchone()
    if role[0] in ["SAS Staff Member", "Property Manager"]:
        return True
    else:
        return False

@app.post("/check_approval_role/")
def check_approval_role(username: userClass, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    check =  get_approving_role(
            db_connection,
            cursor,
            userID=username.UserID
            )
    return (check)



########################################### TESTING TO BE DONE

#Uses userClass

def get_booking_r(db_connection, cursor, userID):
    # Assuming get_profile_details is imported or defined in the same module
    profile = get_profile_details(db_connection, cursor, userID)
    role = profile[1]

    if role == "Property Manager":
        sql_query = """
            SELECT `booking request`.`Request ID`, `booking request`.`Room ID`,
                   `booking request description`.`Date`, 
                   `booking request description`.`Start Time`, 
                   `booking request description`.`End Time`
            FROM `booking request`
            JOIN `booking request description` 
                ON `booking request`.`Request ID` = `booking request description`.`Request ID`
            WHERE `booking request description`.`End Time` > '17:00:00'
        """
    else:
        sql_query = """
            SELECT `booking request`.`Request ID`, `booking request`.`Room ID`,
                   `booking request description`.`Date`, 
                   `booking request description`.`Start Time`, 
                   `booking request description`.`End Time`
            FROM `booking request`
            JOIN `booking request description` 
                ON `booking request`.`Request ID` = `booking request description`.`Request ID`
            WHERE `booking request description`.`End Time` < '17:00:00'
        """
    
    cursor.execute(sql_query)

    # Fetch all rows of the result
    result = cursor.fetchall()
     # Convert start and end times to formatted time strings
    formatted_result = []
    for row in result:
        formatted_row = list(row)
        formatted_row[3] = str(row[3])
        if formatted_row[3] == "9:00:00":
            formatted_row[3] = "09:00:00"
        formatted_row[4] = str(row[4])
        formatted_result.append(formatted_row)

    return formatted_result



@app.post("/get_booking_requests_accepter/")
def get_booking_requests(username: userClass, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    check =  get_booking_r(
            db_connection,
            cursor,
            userID=username.UserID
            )
    return check


########################################### TESTING TO BE DONE


#4. ⁠get_request_details, which I will give u bookingId and need {requester: “email”, roomSpecific: {capacity: 5, purpose: [“Meeting”, Presentation”]}}
#Function name: get_request_details(BookingID)
#return: [user ID (email), user Role (student), capacity, purpose]
#syntax of {user_id: “actual email”, user_role: “student”…


class RequestDetails(BaseModel):
    bookingID: str

def get_request_details(db_connection, cursor, bookingID):
    query = """
    SELECT 
        `users`.`user ID` AS user_id,
        `user roles`.`name` AS user_role,
        `booking request description`.`capacity` AS request_capacity,
        `room`.`capacity` AS room_capacity,
        `booking request description`.`Description` AS request_description
    FROM 
        `booking request`
    JOIN 
        `users` ON `booking request`.`User ID` = `users`.`User ID`
    JOIN 
        `user roles` ON `users`.`Role ID` = `user roles`.`Role ID`
    JOIN 
        `booking request description` ON `booking request`.`Request ID` = `booking request description`.`Request ID`
    JOIN 
        `room` ON `booking request`.`Room ID` = `room`.`Room ID`
    WHERE 
        `booking request`.`Request ID` = %s

    """
    cursor.execute(query, (bookingID,))
    role = cursor.fetchone()

    return role


@app.post("/get_request_details_accepter/")
def get_request_dets(request: RequestDetails, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    details = get_request_details(db_connection, cursor, bookingID = request.bookingID)

    return {"user_id": details[0], "user_role": details[1], "request_capacity": details[2], "room_capacity": details[3], "description": details[4], }


########################################### TO BE tested


class HandleBooking(BaseModel): 
    action: str         #action is either "accept" or "decline"
    bookingID: str
    comment: str

def check_collision(db_connection, cursor, requestID):
    query = """
        SELECT br.`Room ID`, brd.`Date`, brd.`Start Time`, brd.`End Time`
        FROM `booking request` AS br
        JOIN `booking request description` AS brd ON br.`Request ID` = brd.`Request ID`
        WHERE br.`Request ID` = %s
    """
    cursor.execute (query, (requestID,))
    info = cursor.fetchone()

    room_id = info[0]
    date = info[1]
    start_time = info[2]
    end_time = info[3]

    #Get the availabilities of the different rooms (true = avaialable, false = not available)
    query1 = "SELECT COUNT(*) FROM `Booking ID description` AS BID " \
             "INNER JOIN `Booking List` AS BL ON BID.`Booking ID` = BL.`Booking ID` " \
             "WHERE BL.`Room ID` = %s AND BID.`Date` = %s " \
             "AND ((BID.`Start Time` BETWEEN %s AND %s) OR (BID.`End Time` BETWEEN %s AND %s))"

    cursor.execute(query1, (room_id, date, start_time, end_time, start_time, end_time))
    collision_count = cursor.fetchone()[0]
    if collision_count > 0:
                return False

    # If no collision found, return True
    return True


def accept_booking(db_connection, cursor, requestID, comment):

    if check_collision(db_connection, cursor, requestID) == False:
        return False

    #Has to create a new bookingRequestID which is unique.
    while True:
        # Generate a new bookingRequestID
        NewbookingID = generate_random_string()

        # Checking if the ID is pre-existing
        bookingIDCheck = "SELECT `Booking ID` FROM `booking list`"
        cursor.execute(bookingIDCheck)
        currentBookingIDS = cursor.fetchall()

        # Check if the bookingRequestID is in the currentRoomIDS
        if any(requestID in row for row in bookingIDCheck):
            print("Booking ID is in the current IDs. Generating a new ID.")     #Test print
        else:
            print("Booking ID is not in the current IDs.")                      #Test print
            break

    #New unique Booking ID named NewbookingID
    print (NewbookingID)        #Test print

    #Getting the data from the main tables for primary key purposes
    getDetails1 = ("""
        SELECT `User ID`, `Room ID`
        FROM `booking request`
        WHERE `Request ID` = %s;""")

    cursor.execute(getDetails1,(requestID,))
    details1 = cursor.fetchone()

    # Insert data into Booking List table
    insertDetails1 = ("""
        INSERT INTO `Booking List` (`Booking ID`, `User ID`, `Room ID`)
        VALUES (%s, %s, %s);""")
    cursor.execute(insertDetails1,(NewbookingID, details1[0], details1[1]))

    # Commit the transaction
    db_connection.commit()


    #Getting the dependant data from booking request description
    getDetails2 = ("""SELECT * FROM `booking request description` WHERE `Request ID` = %s;""")
    cursor.execute(getDetails2,(requestID,))
    details2 = cursor.fetchone()

    # Insert the data into booking id description
    insertDetails2 = ("""
        INSERT INTO `booking id description` (`Booking ID`, `Description`, `Date`, `Start Time`, `End Time` , `Capacity`, `Comment`)
        VALUES (%s, %s, %s, %s, %s, %s, %s);""")

    cursor.execute(insertDetails2,(NewbookingID, details2[1], details2[2], details2[3], details2[4], details2[5], comment))

    # Commit the transaction
    db_connection.commit()

    #Remove the data from Booking Requests as already handled

    delete1 = """
        DELETE FROM `booking request description`
        WHERE `Request ID` = %s
    """

    delete2 = """
        DELETE FROM `booking request`
        WHERE `Request ID` = %s
    """

    cursor.execute(delete1,(requestID,))
    cursor.execute(delete2,(requestID,))

    db_connection.commit()

    msg = "The booking request " + str(requestID) + " has been approved.\n" \
          "The ID of your booking has been updated to: " + str(NewbookingID) + "\n" \
          "Please view the Room Booking System Website for further details"
    send_email ("segproject32@outlook.com", details1[0], "aquastorm797",'Room Booking System OTP', msg ,'smtp-mail.outlook.com',587 )

    return True


def decline_booking(db_connection, cursor, requestID, comment):

    #Has to create a new Reject ID which is unique.
    while True:
        # Generate a new bookingRequestID
        NewbookingID = generate_random_string()

        # Checking if the ID is pre-existing
        RejectIDCheck = "SELECT `Reject ID` FROM `booking rejects`"
        cursor.execute(RejectIDCheck)
        currentRejectIDS = cursor.fetchall()

        # Check if the bookingRequestID is in the currentRoomIDS
        if any(NewbookingID in row for row in currentRejectIDS):
            print("Booking ID is in the current IDs. Generating a new ID.")     #Test print
        else:
            print("Booking ID is not in the current IDs.")                      #Test print
            break

    #New unique Booking ID named NewbookingID
    print (NewbookingID)        #Test print

    #Getting the data from the main tables for primary key purposes
    getDetails1 = ("""
        SELECT `User ID`, `Room ID`
        FROM `booking request`
        WHERE `Request ID` = %s;""")

    cursor.execute(getDetails1,(requestID,))
    details1 = cursor.fetchone()

    # Insert data into Booking List table
    insertDetails1 = ("""
        INSERT INTO `booking rejects` (`Reject ID`, `User ID`, `Room ID`)
        VALUES (%s, %s, %s);""")
    cursor.execute(insertDetails1,(NewbookingID, details1[0], details1[1]))

    # Commit the transaction
    db_connection.commit()


    #Getting the dependant data from booking request description
    getDetails2 = ("""SELECT * FROM `booking request description` WHERE `Request ID` = %s;""")
    cursor.execute(getDetails2,(requestID,))
    details2 = cursor.fetchone()

    # Insert the data into booking id description
    insertDetails2 = ("""
        INSERT INTO `booking rejects description` (`Reject ID`, `Description`, `Date`, `Start Time`, `End Time` , `Capacity`, `Comment`)
        VALUES (%s, %s, %s, %s, %s, %s, %s);""")

    cursor.execute(insertDetails2,(NewbookingID, details2[1], details2[2], details2[3], details2[4], details2[5], comment))

    #Remove the data from Booking Requests as already handled
    delete1 = """
        DELETE FROM `booking request description`
        WHERE `Request ID` = %s
    """

    delete2 = """
        DELETE FROM `booking request`
        WHERE `Request ID` = %s
    """

    cursor.execute(delete1,(requestID,))
    cursor.execute(delete2,(requestID,))

    db_connection.commit()
    
    msg = "The booking request " + str(requestID) + " has been declined.\n" \
          "The booking is now rejected, with ID: " + str(NewbookingID) + ". \n" \
          "The reason for the booking declined is: \n" + comment + "\n" \
          "Please view the Room Booking System Website for further details"
    send_email ("segproject32@outlook.com", details1[0], "aquastorm797",'Room Booking System OTP', msg ,'smtp-mail.outlook.com',587 )



@app.post("/handle_booking/")
def handle_booking(handling: HandleBooking, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    
    action = handling.action

    if action == "approve":
        if accept_booking(db_connection, cursor, handling.bookingID, handling.comment) == True:
            return {"Approval Complete"}
        else:
            return {"Collision"}
    else:
        decline_booking(db_connection, cursor, handling.bookingID, handling.comment)
        return {"Decline complete"}





#################################### TO BE TESTED
    
class HandleRequests(BaseModel):
    UserID: str
    checkType: str      #action is either "current" or "past"


#Supposed to take userID and return the current or past requests based on todays date. Current is > todays date, past is < todays date
def get_user_requests(b_connection, cursor, UserID, checkType):
    import datetime
    #Get todays date for checking
    today = datetime.date.today()
    formatted_date = today.strftime("%Y-%m-%d")

    print (formatted_date)

    if checkType == "current":
        sql_query1 = """
            SELECT `booking request`.`Request ID`, `booking request`.`Room ID`,
                   `booking request description`.`Date`,
                   `booking request description`.`Start Time`,
                   `booking request description`.`End Time`
            FROM `booking request`
            JOIN `booking request description`
            ON `booking request`.`Request ID` = `booking request description`.`Request ID`
            WHERE `booking request description`.`Date` > %s
            AND `booking request`.`User ID` = %s
        """

        sql_query2 = """
            SELECT `booking list`.`Booking ID`, `booking list`.`Room ID`,
                   `booking id description`.`Date`,
                   `booking id description`.`Start Time`,
                   `booking id description`.`End Time`
            FROM `booking list`
            JOIN `booking id description`
            ON `booking list`.`Booking ID` = `booking id description`.`Booking ID`
            WHERE `booking id description`.`Date` > %s
            AND `booking list`.`User ID` = %s
        """

        sql_query3 = """
            SELECT `booking rejects`.`Reject ID`, `booking rejects`.`Room ID`,
                   `booking rejects description`.`Date`,
                   `booking rejects description`.`Start Time`,
                   `booking rejects description`.`End Time`
            FROM `booking rejects`
            JOIN `booking rejects description`
            ON `booking rejects`.`Reject ID` = `booking rejects description`.`Reject ID`
            WHERE `booking rejects description`.`Date` > %s
            AND `booking rejects`.`User ID` = %s
        """

    else:
        sql_query1 = """
            SELECT `booking request`.`Request ID`, `booking request`.`Room ID`,
                   `booking request description`.`Date`,
                   `booking request description`.`Start Time`,
                   `booking request description`.`End Time`
            FROM `booking request`
            JOIN `booking request description`
            ON `booking request`.`Request ID` = `booking request description`.`Request ID`
            WHERE `booking request description`.`Date` < %s
            AND `booking request`.`User ID` = %s
        """

        sql_query2 = """
            SELECT `booking list`.`Booking ID`, `booking list`.`Room ID`,
                   `booking id description`.`Date`,
                   `booking id description`.`Start Time`,
                   `booking id description`.`End Time`
            FROM `booking list`
            JOIN `booking id description`
            ON `booking list`.`Booking ID` = `booking id description`.`Booking ID`
            WHERE `booking id description`.`Date` < %s
            AND `booking list`.`User ID` = %s
        """

        sql_query3 = """
            SELECT `booking rejects`.`Reject ID`, `booking rejects`.`Room ID`,
                   `booking rejects description`.`Date`,
                   `booking rejects description`.`Start Time`,
                   `booking rejects description`.`End Time`
            FROM `booking rejects`
            JOIN `booking rejects description`
            ON `booking rejects`.`Reject ID` = `booking rejects description`.`Reject ID`
            WHERE `booking rejects description`.`Date` < %s
            AND `booking rejects`.`User ID` = %s
        """        

    cursor.execute(sql_query1, (formatted_date,UserID))
    results1 = cursor.fetchall()
    results1_labeled = [row + ("Pending",) for row in results1]

    cursor.execute(sql_query2, (formatted_date,UserID))
    results2 = cursor.fetchall()
    results2_labeled = [row + ("Completed",)  for row in results2]

    cursor.execute(sql_query3, (formatted_date,UserID))
    results3 = cursor.fetchall()
    results3_labeled = [row + ("Rejected",)  for row in results3]    

    results = results1_labeled + results2_labeled + results3_labeled

    formatted_result = []

    for row in results:
        formatted_row = list(row)
        formatted_row[3] = str(row[3])
        if formatted_row[3] == "9:00:00":
            formatted_row[3] = "09:00:00"
        formatted_row[4] = str(row[4])
        formatted_result.append(formatted_row)

    return formatted_result

@app.post("/get_booking_requests_users/")
def get_booking_requests_users(handling: HandleRequests, db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    check = get_user_requests(
            db_connection,
            cursor,
            UserID=handling.UserID,
            checkType=handling.checkType
            )
    return check


#################################### TO BE COMPLETED & TESTED

	
def daily_bookingsR_clear(db_connection, cursor):
    # Get todays date and save locally for the clear
    today = datetime.now().date()

    # Calculate one day prior
    one_day_prior = today - timedelta(days=1)
    one_day_prior_str = one_day_prior.strftime('%Y-%m-%d')
    
    query = "SELECT `Request ID` FROM `booking request description` WHERE `Date` = %s"
    cursor.execute(query, (one_day_prior_str,))
    bookings_today = cursor.fetchall()  
    print (bookings_today)
    
    if bookings_today is not None:
        #Loop through and decline it 
        for request_id in bookings_today:
            decline_booking(db_connection, cursor, request_id[0], "Booking declined automatically as it's past the scheduled date.")

@app.post("/daily_bookingsR_clear/")
def get_booking_requests_users(db_connection: mysql.connector.connection.MySQLConnection = Depends(get_database_connection)):
    cursor = db_connection.cursor()
    daily_bookingsR_clear(db_connection,cursor)
    return {"Complete clearing"}

#Alt 3 for comment, Alt 4 for uncomment


