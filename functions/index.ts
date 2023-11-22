import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
  hostname: "localhost",
  database: "postgres",
  port: 5432,
  user: "postgres",
  password: "randomsecret"
});

await client.connect();

type User = {
  first_name: string;
  last_name: string;
  id?: number;
};


type insertUserResponse = {
  success?: boolean;
  data?: any;
  error?: string;
};

export const InsertUser = async ({ first_name, last_name }: User) => {
  try {
    await client.connect();
  } catch (e) {
    console.log(e);
  }

  const result = await client.queryObject<User>(
    `INSERT INTO users(first_name, last_name) VALUES(${first_name}, ${last_name}) RETURNING *`
  );

  const response: insertUserResponse = {};

  if (result.rows.length > 0) {
    response.success = true;
    response.data = result.rows[0];
  } else {
    response.success = false;
    response.error = "Unable to insert user";
  }
};

type todo = {
  user_id: number;
  todo: string;
};

export const InsertTodo = async ({ user_id, todo }: todo) => {
  const result = await client.queryObject<todo>(
    `INSERT INTO todos(user_id, todo) VALUES(${user_id}, ${todo}) RETURNING *`
  );

  const response: insertUserResponse = {};

  if (result.rows.length > 0) {
    response.success = true;
    response.data = result.rows[0];
  } else {
    response.success = false;
    response.error = "Unable to insert todo";
  }
}

export const UpdateTodo = async ({ user_id, todo }: todo) => {
  const result = await client.queryObject<todo>(
    `UPDATE todos SET todo=${todo} WHERE user_id=${user_id} RETURNING *`,
  );

  const response: insertUserResponse = {};

  if (result.rows.length > 0) {
    response.success = true;
    response.data = result.rows[0];
  } else {
    response.success = false;
    response.error = "Unable to update todo";
  }
};

const UpdateUser = async ({ id, first_name, last_name }: User) => {
  const result = await client.queryObject<User>(
    `UPDATE users SET first_name=${first_name}, last_name=${last_name} WHERE id=${id} RETURNING *`,
  );

  const response: insertUserResponse = {};

  if (result.rows.length > 0) {
    response.success = true;
    response.data = result.rows[0];
  } else {
    response.success = false;
    response.error = "Unable to update user";
  }
}

export const DeleteTodo = async ({ user_id }: { user_id: number }) => {
  const result = await client.queryObject<todo>(
    `DELETE FROM todos WHERE user_id=${user_id} RETURNING *`
  );

  const response: insertUserResponse = {};

  if (result.rows.length > 0) {
    response.success = true;
    response.data = result.rows[0];
  } else {
    response.success = false;
    response.error = "Unable to delete todo";
  }
}

export const DeleteUser = async ({ user_id }: { user_id: number }) => {
  const result = await client.queryObject<User>(
    `DELETE FROM users WHERE id=${user_id} RETURNING *`
  );

  const response: insertUserResponse = {};

  if (result.rows.length > 0) {
    response.success = true;
    response.data = result.rows[0];
  } else {
    response.success = false;
    response.error = "Unable to delete user";
  }
}
