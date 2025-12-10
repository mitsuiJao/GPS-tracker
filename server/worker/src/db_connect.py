import psycopg2
from psycopg2 import pool
import os

class ManageDB():
    def __init__(self):
        self.DBHOST = os.getenv("DB_HOST", "localhost")
        self.DBPORT = 5432
        self.USER = os.getenv("DB_USER")
        self.PASS = os.getenv("DB_PASS")
        self.DBNAME = "biketracker"
        self.TABLE = "sensor_data"
        self._connection = None
        self.pool = None

        self.init_pool()

    def init_pool(self):
        try:
            if self._connection is None:
                self.pool = pool.SimpleConnectionPool(
                    minconn=1,
                    maxconn=5,
                    host=self.DBHOST,
                    port=self.DBPORT,
                    dbname=self.DBNAME,
                    user=self.USER,
                    password=self.PASS
                )
                self._connection = 1


        except psycopg2.Error as e:
            print(f"DB connection error: {e}")
            raise

    def insertDB(self, latitude, longitude):
        conn = self.pool.getconn()
        
        try:
            cur = conn.cursor()
            sql = f"INSERT INTO {self.TABLE} (timestamp, latitude, longitude) VALUES (NOW(), %s, %s)"
            cur.execute(sql, (latitude, longitude))
            conn.commit()

        except Exception as e:
            conn.rollback()
            print(f"DBerror: {e}")
        finally:
            self.pool.putconn(conn)

DB = ManageDB()