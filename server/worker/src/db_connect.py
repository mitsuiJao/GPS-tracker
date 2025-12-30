import psycopg2
from psycopg2 import pool
import os

class ManageDB():
    def __init__(self):
        self.DBHOST = os.getenv("DB_HOST", "localhost")
        self.DBPORT = os.getenv("DB_PORT")
        self.USER = os.getenv("DB_USER")
        self.PASS = os.getenv("DB_PASS")
        self.DBNAME = os.getenv("DB_NAME")
        self.TABLE = os.getenv("DB_TABLE")
        self._connection = None
        self.pool = None

        self.init_pool()
        self.create_table_if_not_exists()

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

    def create_table_if_not_exists(self):
        conn = self.pool.getconn()
        try:
            cur = conn.cursor()
            sql = f"""
            CREATE TABLE IF NOT EXISTS {self.TABLE} (
                id SERIAL PRIMARY KEY,
                timestamp TIMESTAMPTZ NOT NULL,
                latitude DOUBLE PRECISION NOT NULL,
                longitude DOUBLE PRECISION NOT NULL
            );
            """
            cur.execute(sql)
            conn.commit()
            print(f"Table '{self.TABLE}' checked/created successfully.")
        except Exception as e:
            conn.rollback()
            print(f"Error creating table: {e}")
        finally:
            self.pool.putconn(conn)


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