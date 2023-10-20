import sqlite3

conn = sqlite3.connect("Entry_Gate.db")
cur=conn.cursor()

# Rename column time_in to time_out and time_out to time_in
# cur.execute("ALTER TABLE entry_log RENAME COLUMN time_in TO time_out_t")
# cur.execute("ALTER TABLE entry_log RENAME COLUMN time_out TO time_in")
# cur.execute("ALTER TABLE entry_log RENAME COLUMN time_out_t TO time_out")

# delete all rows of table entry_log
# cur.execute("DELETE FROM entry_log")

conn.commit()
conn.close()