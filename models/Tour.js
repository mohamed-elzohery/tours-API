const { Schema, model }  = require('mongoose');

const tourSchema = new Schema({
        startLocation: {
          description: String,
          coordinates: [Number],
          address: String
        },
        ratingsAverage: {
            type: Number,
            max: 5
        },
        ratingsQuantity: Number,
        images: [String],
        startDates: [Date],
        name: String,
        duration: Number,
        maxGroupSize: Number,
        difficulty: {
            enum: ['Easy', 'Medium', 'Difficult'],
        },
        guides: [String],
        price: Number,
        summary: String,
        description: String,
        imageCover: String,
        locations: [
          {
            _id: Schema.Types.ObjectId,
            description: String,
            type: String,
            coordinates: [Number],
            day: Number
          }
        ],
        
},{ timestamps: true });

const Tour = model('Tour', tourSchema);

module.exports = Tour;