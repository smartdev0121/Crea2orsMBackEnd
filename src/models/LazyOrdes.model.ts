import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

@Table({
  updatedAt: false,
})

class LazyOrders extends Model<LazyOrders> {
  @Column({
    allowNull: false,
  })
  maker_address: string;

  @Column({
     allowNull: false,
     type: DataType.INTEGER
  })
  nftId: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  amount: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  status: number;
}

export default LazyOrders;