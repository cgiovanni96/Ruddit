import "reflect-metadata";
import * as dotenv from "dotenv";
import connection from "./app/server/connection";

dotenv.config();
const PORT: string = process.env.PORT || "3500";

void connection(true, PORT);
