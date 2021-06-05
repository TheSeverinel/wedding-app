import * as SQLite from "expo-sqlite";

import tables from "../constants/tables";

import dutiesJson from "../data/duties.json";
import spicyJson from "../data/spicy.json";
import surpriseJson from "../data/surprise.json";

const db = SQLite.openDatabase("wedding.db");

export const DBInit = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tables.forEach((table) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, UNIQUE(id, title));`,
          [],
          () => {
            resolve(null);
          },
          (_, err) => {
            reject(err);
            return false;
          }
        );
      });
    });
  });
};

export const DBAddGeneralData = () => {
  spicyJson.map((data) => {
    DBInsert("spicy", data);
  });
};

export const DBInsert = (table: string, data: any) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const signString = keys
    .reduce((string, _) => {
      return string + "?, ";
    }, "")
    .slice(0, -2);
  const keysString = keys.join(", ");

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${table} (${keysString}) VALUES (${signString});`,
        [...values],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const DBDelete = (table: string, id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${table} WHERE id=?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const DBFetch = (table: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${table}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};
