import * as SQLite from "expo-sqlite";

import tables from "../constants/tables";

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
  surpriseJson.map((data) => {
    DBInsert("surprise", data);
  });
};

export const DBInsert = async (table: string, data: any) => {
  const title = data?.title;
  const keys = Object.keys(data);
  const values = Object.values(data);
  const signString = keys
    .reduce((string, _) => {
      return string + "?, ";
    }, "")
    .slice(0, -2);
  const keysString = keys.join(", ");
  const countResult: any = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT COUNT(*) FROM ${table} WHERE title=?;`,
        [title],
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
  const exists = countResult?.rows?._array?.[0]["COUNT(*)"];
  if (!exists) {
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
  }
  return null;
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

export const DBCycki = (table: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE ${table}`,
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

export const DBGetOne = async (table: string) => {
  const result: any = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id FROM ${table}`,
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
  const allTableIds = result?.rows?._array;
  const randomId =
    allTableIds[Math.floor(Math.random() * allTableIds.length)]?.id;
  if (randomId) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${table} WHERE id=?`,
          [randomId],
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
  }
  return null;
};
