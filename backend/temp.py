import sqlite3

conn = sqlite3.connect("Entry_Gate.db")
cur=conn.cursor()

# Rename column time_in to time_out and time_out to time_in
# cur.execute("ALTER TABLE entry_log RENAME COLUMN time_in TO time_out_t")
# cur.execute("ALTER TABLE entry_log RENAME COLUMN time_out TO time_in")
# cur.execute("ALTER TABLE entry_log RENAME COLUMN time_out_t TO time_out")

# delete all rows of table entry_log
# cur.execute("DELETE FROM entry_log")

# Create table guest_log with columns name, phone, address, purpose of visit, time_in, time_out
# cur.execute("CREATE TABLE guest_log (Name TEXT, Phone TEXT, Address TEXT, Purpose TEXT, time_in TEXT, time_out TEXT)")

conn.commit()
conn.close()