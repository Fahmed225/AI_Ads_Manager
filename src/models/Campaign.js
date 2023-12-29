import e from 'express';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const adCampaignSchema = new Schema({
    title: { // title of campaign
        type: String,
        required: true
    },
    objective: { // objective of campaign
        type: String,
        required: true
    },
    targetAudience: { // target audience of campaign
        demographics: {
            ageRange: [Number],
            gender: String,
            locations: [String]
        },
        interests: [String], // interests of target audience e.g. sports, music, etc.
        behaviors: [String], // behaviors of target audience e.g. frequent travelers, etc.
        lookalikeAudiences: [String] // lookalike audiences of target audience e.g. people who like similar pages, etc.
    },
    budget: {
        type: Number,
        required: true
    },
    schedule: {
        startDate: Date,
        endDate: Date
    },
    adPlacement: [String],
    adCreative: {
        media: String,
        mediaType: String,
        text: String,
        callToAction: String
    },
    adFormat: String,
    adCopy: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const AdCampaign = mongoose.model('AdCampaign', adCampaignSchema);
export default AdCampaign;