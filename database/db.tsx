import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("wedding.db");

const TABLES = ['spicy', 'duties', 'surprise'];

export const DBInit = () => {

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      TABLES.forEach(table => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL);`,
          [],
          () => {
            resolve(null);
            return true;
          },
          (_, err) => {
            reject(err);
            return false;
          }
        );
      });
      })
      
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
          return true;
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
          return true;
        },
        (_, err) => {
          reject(err);
          return false;
        }
			);
		});
	});
}

export const DBFetch = (table: string) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM ${table}`,
				[],
        (_, result) => {
          resolve(result);
          return true;
        },
        (_, err) => {
          reject(err);
          return false;
        }
			);
		});
	});
};