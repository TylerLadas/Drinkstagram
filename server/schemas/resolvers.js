const { User } = require('../models')
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')

            return userData;
            }
            throw new AuthenticationError('Not logged in!')
        },
        checkout: async (parent, args, context) => {
            const order = new Order({ drink: args.drinks });
            const { drink } = await order.populate('drink').execPopulate();
          }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
        },
        saveDrink: async (parent, args, context) => {
            if (context.user) {
                 const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedDrinks: args.input} },
                    { new: true}
                );
                return updatedUser
            }
            throw new AuthenticationError('Not logged in!')
        },
        removeDrink: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: {savedDrinks: { drinkId: args.drinkId} } },
                    { new: true }
                );
                return updatedUser
            }
            throw new AuthenticationError('Not logged in!')
        }
    }
};

module.exports = resolvers;