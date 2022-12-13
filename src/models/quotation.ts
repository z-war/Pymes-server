import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";
import { TransportDetail, Address, ContactDetail, Store, Client, Item, Attachment } from "./";

class Quotation extends Model {
  public id!: number;

  public quotationNo: string;
  public QuotationDate: Date;
  public subTitle: string;
  public status: string;
  public StoreId!: Store;
  public ClientId!: Client;
  public shippedFrom: Address[];
  public shippedTo: Address[];
  public transportDetail: TransportDetail[];
  public items: Item[];
  public amount: number;
  public tax: number;
  public discount: number;
  public termsAndConditions: string;
  public notes: string
  public attachments: Attachment[];
  public signature: string;
  public contactDetails: ContactDetail[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Quotation.init(
  {
    quotationNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Quotation Number is required.",
        },
      }
    },
    quotationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Quotation Date is required.",
        },
      }
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    StoreId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ClientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    termsAndConditions: {
      type: DataTypes.STRING, allowNull: true
    },
    notes: {
      type: DataTypes.STRING, allowNull: true
    },
    signature: {
      type: DataTypes.STRING, allowNull: true
    }
  },
  {
    sequelize,
  }
);

export default Quotation;
