import mongoose from 'mongoose';



const subscriptionschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the name of subscription"],
        trim: 2,
        minLenght: 2,
        maxLenght: 100,

    },

    price: {
        type: Number,
        required: [true, "subscription price required"],
        min: [0, "Minimum price should be greater than 0"],
    },

    currency: {
        type: String,
        enum: ["USD", "EUR", "OMR", "INR"],
        default: "INR",

    },

    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },

    category: {
        type: String,
        enum: ['sports', 'news', 'technology', 'lifestlye', 'cooking', 'entertainment', 'education', 'others'],
        required: [true, "please enter the category"],
    },

    paymentmethod: {
        type: String,
        required: [true, "please enter the payment method"],
        trim: true,
    },

    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
    },

    startdate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message : "start date must be in the past",
        }
    },

    renewaldate: {
        type: Date,
        
        validate: {
            validator: function (value) { return value > this.startdate },
            message: "renewal date must be in future",
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true,
    }
}, { timestamps: true });

// auto calculate the renewal date if not provided
subscriptionschema.pre('save', function (next) {
    if (!this.renewaldate) {
        const renewalperiods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewaldate = new Date();
        this.renewaldate.setDate(this.renewaldate.getDate() + renewalperiods[this.frequency]);
    }

    

    //auto update status if renewal date has passed
    if (this.renewaldate < new Date()) this.status = 'expired';

    next();
});

const subscription = mongoose.model('Subcription', subscriptionschema);

export default subscription;
