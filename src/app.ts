import cors from "cors";
import * as express from "express";
import fs from "fs";
import ModelsInit, { User } from "./models"
import { CategoryRoutes } from "./routes/category";
import { ClientRoutes } from "./routes/client";
import { ProductRoutes } from "./routes/product";
import { StoreRoutes } from "./routes/store";
import { UserRoutes } from "./routes/user";
import { QuotationRoutes } from "./routes/quotation"
import { InvoiceRoutes } from "./routes/invoice";
import { AddressRoutes } from "./routes/address";
// tslint:disable-next-line: no-var-requires
require("dotenv").config();
// adding custom Request global typing.

declare global {
  namespace Express {
    interface Request {
      userId: number;
      storeId: number;
      activeStoreId: number;
      user: User;
    }
  }
}

class App {
  public app: express.Application;

  constructor() {
    this.app = express.default();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json({
      limit: "50mb"
    }))
    this.app.use(
      express.urlencoded({
        extended: true,
        limit: "50mb",
        parameterLimit: 100000,
      })
    );
    this.app.use(cors());
    ModelsInit()
  }

  public routes(): void {
    this.app.use("/api/users", new UserRoutes().router)
    this.app.use("/api/stores", new StoreRoutes().router)
    this.app.use("/api/products", new ProductRoutes().router)
    this.app.use("/api/category", new CategoryRoutes().router)
    this.app.use("/api/clients", new ClientRoutes().router)
    this.app.use("/api/quotations", new QuotationRoutes().router)
    this.app.use("/api/invoices", new InvoiceRoutes().router)
    this.app.use("/api/addresses", new AddressRoutes().router)

  }
}

export default new App().app;
