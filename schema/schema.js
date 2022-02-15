const {
  User,
  Card,
  Cart,
  Company,
  Account,
  Product,
  Order,
  Transaction
} = require('../models')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    account: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    address_zipCode: { type: GraphQLString },
    address_street: { type: GraphQLString },
    address_city: { type: GraphQLString },
    address_suite: { type: GraphQLString },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat },
    cards: {
      type: new GraphQLList(CardType),
      resolve(parent, args){
        return Card.findAll({where:{UserId: parent.id}})
      }
    },
    carts: {
      type: new GraphQLList(CartType),
      resolve(parent, args){
        return Cart.findAll({where:{UserId: parent.id}})
      }
    }
  })
})

const CardType = new GraphQLObjectType({
  name: 'Card',
  fields: () => ({
    id: { type: GraphQLID },
    cardCVV: { type: GraphQLString },
    cardNumber: { type: GraphQLString },
    user: { 
      type: UserType,
      resolve(parent, args){
        return User.findByPk(parent.UserId)
      }
    },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat }
  })
})

const CartType = new GraphQLObjectType({
  name: 'Cart',
  fields: () => ({
    id: { type: GraphQLID },
    user: { 
      type: UserType,
      resolve(parent, args){
        return User.findByPk(parent.UserId)
      } 
    },
    product: {
      type: ProductType,
      resolve(parent, args){
        return Product.findByPk(parent.ProductId)
      }
    },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat }
  })
})

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    service: { type: GraphQLString },
    address: { type: GraphQLString },
    phone: { type: GraphQLString },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat },
    accounts: {
      type: new GraphQLList(AccountType),
      resolve(parent, args){
        return Account.findAll({where: {CompanyId: parent.id}})
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args){
        return Product.findAll({ where: {CompanyId: parent.id}})
      }
    }
  })
})

const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: { type: GraphQLID },
    account: { type: GraphQLString },
    accountName: { type: GraphQLString },
    routingNumber: { type: GraphQLString },
    currencyName: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve(parent, args){
        return Company.findByPk(parent.CompanyId)
      }
    },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat }
  })
})

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    color: { type: GraphQLString },
    type: { type: GraphQLString },
    material: { type: GraphQLString },
    description: { type: GraphQLString },
    company: { 
      type: CompanyType,
      resolve(parent, args){
        return Company.findByPk(parent.CompanyId)
      }
    },
    carts: {
      type: new GraphQLList(ProductType),
      resolve(parent, args){
        return Cart.findAll({ where: {ProductId: parent.id}})
      }
    },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat }
  })
})

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    productInfo: { type: GraphQLString },
    user: { 
      type: UserType,
      resolve(parent, args){
        return User.findByPk(parent.UserId)
      } 
    },
    product: {
      type: ProductType,
      resolve(parent, args){
        return Product.findByPk(parent.ProductId)
      }
    },
    transaction: {
      type: TransactionType,
      resolve(parent, args){
        return Transaction.findByPk(parent.TransactionId)
      }
    },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat }
  })
})

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args){
        return Order.findAll({where: {id: parent.TransactionId}})
      }
    },
    createdAt: { type: GraphQLFloat },
    updatedAt: { type: GraphQLFloat }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return User.findByPk(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return User.findAll()
      }
    },
    card: {
      type: CardType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Card.findByPk(args.id)
      }
    },
    cards: {
      type: new GraphQLList(CardType),
      resolve(parent, args){
        return Card.findAll()
      }
    },
    cart: {
      type: CartType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Cart.findByPk(args.id)
      }
    },
    carts: {
      type: new GraphQLList(CartType),
      resolve(parent, args){
        return Cart.findAll()
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Company.findByPk(args.id)
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args){
        return Company.findAll()
      }
    },
    account: {
      type: AccountType,
      args: { id: {type: GraphQLID }},
      resolve(parent, args){
        return Account.findByPk(args.id)
      }
    },
    accounts: {
      type: new GraphQLList(AccountType),
      resolve(parent, args){
        return Account.findAll()
      }
    },
    product: {
      type: ProductType,
      args: { id: {type: GraphQLID }},
      resolve(parent, args){
        return Product.findByPk(args.id)
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args){
        return Product.findAll()
      }
    },
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Order.findByPk(args.id)
      }
    },
    orders: {
      type: new GraphQLList(CartType),
      resolve(parent, args){
        return Order.findAll()
      }
    },
    transaction: {
      type: TransactionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Transaction.findByPk(args.id)
      }
    },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(parent, args){
        return Transaction.findAll()
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        account: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        address_zipCode: { type: GraphQLString },
        address_street: { type: GraphQLString },
        address_city: { type: GraphQLString },
        address_suite: { type: GraphQLString },
      },
      resolve(parent, args){
        return User.create({
          account: args.account,
          name: args.name,
          email: args.email,
          address_zipCode: args.address_zipCode,
          address_street: args.address_street,
          address_city: args.address_city,
          address_suite: args.address_suite,
        })
      }
    },
    addCard: {
      type: CardType,
      args: {
        cardNumber: { type: new GraphQLNonNull(GraphQLString) },
        cardCVV: { type: new GraphQLNonNull(GraphQLString) },
        UserId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        return Card.create({
          cardNumber: args.cardNumber,
          cardCVV: args.cardCVV,
          UserId: args.UserId
        })
      }
    },
    addCart: {
      type: CartType,
      args: {
        UserId: { type: new GraphQLNonNull(GraphQLInt) },
        ProductId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args){
        return Cart.create({
          UserId: args.UserId,
          ProductId: args.ProductId
        })
      }
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        service: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args){
        return Company.create({
          name: args.name,
          service: args.service,
          address: args.address,
          phone: args.phone
        })
      }
    },
    addAccount: {
      type: AccountType,
      args: {
        account: { type: new GraphQLNonNull(GraphQLString) },
        accountName: { type: new GraphQLNonNull(GraphQLString) },
        routingNumber: { type: new GraphQLNonNull(GraphQLString) },
        currencyName: { type: new GraphQLNonNull(GraphQLString) },
        CompanyId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        return Account.create({
          account: args.account,
          accountName: args.accountName,
          routingNumber: args.routingNumber,
          currencyName: args.currencyName,
          CompanyId: args.CompanyId
        })
      }
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLString },
        type: { type: GraphQLString },
        material: { type: GraphQLString },
        description: { type: GraphQLString },
        CompanyId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        return Product.create({
          name: args.name,
          price: args.price,
          color: args.color,
          type: args.type,
          material: args.material,
          description: args.description,
          CompanyId: args.CompanyId
        })
      }
    },
    addOrder: {
      type: OrderType,
      args: {
        UserId: { type: new GraphQLNonNull(GraphQLID) },
        ProductId: { type: new GraphQLNonNull(GraphQLInt) },
        productInfo: { type: new GraphQLNonNull(GraphQLString) },
        TransactionId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        return Order.create({
          UserId: args.UserId,
          ProductId: args.ProductId,
          productInfo: args.productInfo,
          TransactionId: args.TransactionId
        })
      }
    },
    addTransaction: {
      type: TransactionType,
      args: {
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args){
        return Transaction.create({
          description: args.description
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})