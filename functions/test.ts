import { postgres } from "https://deno.land/x/postgresql@v2.0.0-beta.5/mod.js";

type respo = {
  response?: string;
  error?: string;
  message?: string;
}
type userInput = {
  first_name: string;
  last_name: string;
};

export async function InsertUser({ first_name, last_name }: userInput): Promise<respo> {
  const client = postgres({
    hostname: "localhost",
    database: "postgres",
    user: "postgres",
    password: "randomsecret",
    port: 5432,
  });
  const result = await client`INSERT INTO users(first_name, last_name) VALUES(${first_name}, ${last_name}) RETURNING *`;

  const response: {
    response?: string;
    error?: string;
    message?: string;
  } = {};

  if (result.rows.length > 0) {
    response.message = "User inserted successfully";
    response.response = result.rows[0];
  } else {
    response.error = "Unable to insert user";
  }

  return response;
};

export async function InsertTodo(user_id: string, todo: string): Promise<{
  response?: string;
  error?: string;
  message?: string;
} | {}> {
  const client = await postgres('postgresql://postgres:randomsecret@localhost:5432');
  const result = await client`INSERT INTO todos(user_id, todo) VALUES(${user_id}, ${todo}) RETURNING *`;

  const response: {
    response?: string;
    error?: string;
    message?: string;
  } = {};

  if (result.rows.length > 0) {
    response.message = "Todo inserted successfully";
    response.response = result.rows[0];
  } else {
    response.error = "Unable to insert todo";
  }

  return response;
}

export async function UpdateTodo(user_id: string, todo: string): Promise<{
  response?: string;
  error?: string;
  message?: string;
} | {}> {
  const client = await postgres('postgresql://postgres:randomsecret@localhost:5432');
  const result = await client`UPDATE todos SET todo=${todo} WHERE user_id=${user_id} RETURNING *`;

  const response: {
    response?: string;
    error?: string;
    message?: string;
  } = {};

  if (result.rows.length > 0) {
    response.message = "Todo updated successfully";
    response.response = result.rows[0];
  } else {
    response.error = "Unable to update todo";
  }

  return response;
};

export async function UpdateUser(id: string, first_name: string, last_name: string): Promise<{
  response?: string;
  error?: string;
  message?: string;
} | {}> {
  const client = await postgres('postgresql://postgres:randomsecret@localhost:5432');
  const result = await client
    `UPDATE users SET first_name=${first_name}, last_name=${last_name} WHERE id=${id} RETURNING *`
    ;

  const response: {
    response?: string;
    error?: string;
    message?: string;
  } = {};

  if (result.rows.length > 0) {
    response.message = "User updated successfully";
    response.response = result.rows[0];
  } else {
    response.error = "Unable to update user";
  }

  return response;
}

export async function DeleteTodo(user_id: string): Promise<{
  response?: string;
  error?: string;
  message?: string;
} | {}> {
  const client = await postgres('postgresql://postgres:randomsecret@localhost:5432');
  const result = await client
    `DELETE FROM todos WHERE user_id=${user_id} RETURNING *`;

  const response: {
    response?: string;
    error?: string;
    message?: string;
  } = {};

  if (result.rows.length > 0) {
    response.message = "Todo deleted successfully";
    response.response = result.rows[0];
  } else {
    response.error = "Unable to delete todo";
  }

  return response;
}

export async function DeleteUser(user_id: string): Promise<{
  response?: string;
  error?: string;
  message?: string;
} | {}> {
  const client = await postgres('postgresql://postgres:randomsecret@localhost:5432');
  const result = await client`DELETE FROM users WHERE id=${user_id} RETURNING *`;

  const response: {
    response?: string;
    error?: string;
    message?: string;
  } = {};

  if (result.rows.length > 0) {
    response.message = "User deleted successfully";
    response.response = result.rows[0];
  } else {
    response.error = "Unable to delete user";
  }

  return response;
}
